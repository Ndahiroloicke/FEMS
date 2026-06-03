"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import {
  PageHeader,
  Card,
  Button,
  Input,
  Select,
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/ui/primitives";
import { Modal } from "@/components/ui/modal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { StatusBadge } from "@/components/ui/status-badge";
import { Pagination } from "@/components/ui/pagination";
import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import {
  api,
  ApiError,
  EXTINGUISHER_STATUSES,
  EXTINGUISHER_TYPES,
  EXTINGUISHER_SIZES,
  type CreateExtinguisherInput,
  type FireExtinguisher,
  type FireExtinguisherDetail,
  type ExtinguisherStatus,
  type ExtinguisherType,
  type PageMeta,
} from "@/lib/api";
import { formatDate, formatDateTime, formatEnum, toDateInput } from "@/lib/utils";

const PAGE_SIZE = 10;

const emptyForm: CreateExtinguisherInput = {
  serialNumber: "",
  location: "",
  type: "WATER",
  size: "5lbs",
  installationDate: "",
  expiryDate: "",
  status: "ACTIVE",
};

export default function ExtinguishersPage() {
  const { role } = useAuth();
  const toast = useToast();
  const isAdmin = role === "ADMIN";

  const [items, setItems] = useState<FireExtinguisher[]>([]);
  const [meta, setMeta] = useState<PageMeta | null>(null);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<ExtinguisherStatus | "">("");
  const [typeFilter, setTypeFilter] = useState<ExtinguisherType | "">("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<FireExtinguisher | null>(null);
  const [form, setForm] = useState<CreateExtinguisherInput>(emptyForm);
  const [saving, setSaving] = useState(false);

  const [detail, setDetail] = useState<FireExtinguisherDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<FireExtinguisher | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.extinguishers.list({
        page,
        limit: PAGE_SIZE,
        status: statusFilter,
        type: typeFilter,
        search,
      });
      setItems(res.data);
      setMeta(res.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load extinguishers");
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, typeFilter, search]);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setFormOpen(true);
  }

  function openEdit(item: FireExtinguisher) {
    setEditing(item);
    setForm({
      serialNumber: item.serialNumber,
      location: item.location,
      type: item.type,
      size: item.size,
      installationDate: toDateInput(item.installationDate),
      expiryDate: toDateInput(item.expiryDate),
      status: item.status,
    });
    setFormOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await api.extinguishers.update(editing.id, form);
        toast.success("Extinguisher updated");
      } else {
        await api.extinguishers.create(form);
        toast.success("Extinguisher registered");
      }
      setFormOpen(false);
      await load();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to save extinguisher");
    } finally {
      setSaving(false);
    }
  }

  async function openDetail(id: string) {
    setDetailOpen(true);
    setDetailLoading(true);
    setDetail(null);
    try {
      setDetail(await api.extinguishers.get(id));
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to load details");
      setDetailOpen(false);
    } finally {
      setDetailLoading(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.extinguishers.delete(deleteTarget.id);
      toast.success("Extinguisher deleted");
      setDeleteTarget(null);
      if (items.length === 1 && page > 1) setPage((p) => p - 1);
      else await load();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to delete");
    } finally {
      setDeleting(false);
    }
  }

  function applySearch(e: FormEvent) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  return (
    <>
      <PageHeader
        title="Fire Extinguishers"
        description="Register and manage your extinguisher inventory"
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Register extinguisher
          </Button>
        }
      />

      <Card>
        <div className="flex flex-wrap items-end gap-3 border-b border-border px-6 py-4">
          <form onSubmit={applySearch} className="flex items-end gap-2">
            <div className="w-56">
              <Input
                label="Search"
                placeholder="Serial or location"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <Button type="submit" variant="secondary">
              <Search className="h-4 w-4" />
            </Button>
          </form>
          <div className="w-44">
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => {
                setPage(1);
                setStatusFilter(e.target.value as ExtinguisherStatus | "");
              }}
            >
              <option value="">All statuses</option>
              {EXTINGUISHER_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {formatEnum(s)}
                </option>
              ))}
            </Select>
          </div>
          <div className="w-44">
            <Select
              label="Type"
              value={typeFilter}
              onChange={(e) => {
                setPage(1);
                setTypeFilter(e.target.value as ExtinguisherType | "");
              }}
            >
              <option value="">All types</option>
              {EXTINGUISHER_TYPES.map((t) => (
                <option key={t} value={t}>
                  {formatEnum(t)}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {loading ? (
          <LoadingState message="Loading extinguishers…" />
        ) : error ? (
          <ErrorState message={error} onRetry={load} />
        ) : items.length === 0 ? (
          <EmptyState
            title="No extinguishers found"
            message="Try adjusting your filters or register a new extinguisher."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-slate-50 text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-6 py-3 font-medium">Serial</th>
                    <th className="px-6 py-3 font-medium">Location</th>
                    <th className="px-6 py-3 font-medium">Type</th>
                    <th className="px-6 py-3 font-medium">Size</th>
                    <th className="px-6 py-3 font-medium">Expiry</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((ext) => (
                    <tr key={ext.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-900">{ext.serialNumber}</td>
                      <td className="px-6 py-4">{ext.location}</td>
                      <td className="px-6 py-4 text-muted">{formatEnum(ext.type)}</td>
                      <td className="px-6 py-4 text-muted">{ext.size}</td>
                      <td className="px-6 py-4 text-muted">{formatDate(ext.expiryDate)}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={ext.status} kind="extinguisher" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => openDetail(ext.id)}
                            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => openEdit(ext)}
                            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => setDeleteTarget(ext)}
                              className="rounded-md p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination meta={meta} onPageChange={setPage} />
          </>
        )}
      </Card>

      {/* Create / Edit modal */}
      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Edit extinguisher" : "Register extinguisher"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Serial number"
            required
            value={form.serialNumber}
            onChange={(e) => setForm({ ...form, serialNumber: e.target.value })}
          />
          <Input
            label="Location"
            required
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <Select
            label="Type"
            required
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as ExtinguisherType })}
          >
            {EXTINGUISHER_TYPES.map((t) => (
              <option key={t} value={t}>
                {formatEnum(t)}
              </option>
            ))}
          </Select>
          <Select
            label="Size"
            required
            value={form.size}
            onChange={(e) => setForm({ ...form, size: e.target.value })}
          >
            {EXTINGUISHER_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
          <Input
            label="Installation date"
            type="date"
            required
            value={form.installationDate}
            onChange={(e) => setForm({ ...form, installationDate: e.target.value })}
          />
          <Input
            label="Expiry date"
            type="date"
            required
            value={form.expiryDate}
            onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
          />
          <Select
            label="Status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as ExtinguisherStatus })}
          >
            {EXTINGUISHER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {formatEnum(s)}
              </option>
            ))}
          </Select>
          <div className="flex gap-2 sm:col-span-2">
            <Button type="submit" loading={saving}>
              {editing ? "Save changes" : "Register"}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Detail modal */}
      <Modal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        title={detail ? `Extinguisher ${detail.serialNumber}` : "Extinguisher details"}
        size="lg"
      >
        {detailLoading ? (
          <LoadingState />
        ) : detail ? (
          <div className="space-y-6">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div>
                <dt className="text-muted">Location</dt>
                <dd className="font-medium text-slate-900">{detail.location}</dd>
              </div>
              <div>
                <dt className="text-muted">Type</dt>
                <dd className="font-medium text-slate-900">{formatEnum(detail.type)}</dd>
              </div>
              <div>
                <dt className="text-muted">Size</dt>
                <dd className="font-medium text-slate-900">{detail.size}</dd>
              </div>
              <div>
                <dt className="text-muted">Status</dt>
                <dd>
                  <StatusBadge status={detail.status} kind="extinguisher" />
                </dd>
              </div>
              <div>
                <dt className="text-muted">Installed</dt>
                <dd className="font-medium text-slate-900">
                  {formatDate(detail.installationDate)}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Expires</dt>
                <dd className="font-medium text-slate-900">{formatDate(detail.expiryDate)}</dd>
              </div>
            </dl>

            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-900">Inspections</h3>
              {detail.inspections && detail.inspections.length > 0 ? (
                <ul className="divide-y divide-border rounded-md border border-border">
                  {detail.inspections.map((ins) => (
                    <li
                      key={ins.id}
                      className="flex items-center justify-between px-4 py-2.5 text-sm"
                    >
                      <span className="text-slate-700">{formatDateTime(ins.scheduledAt)}</span>
                      <StatusBadge status={ins.status} kind="inspection" />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">No inspections recorded.</p>
              )}
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-900">Maintenance history</h3>
              {detail.maintenanceLogs && detail.maintenanceLogs.length > 0 ? (
                <ul className="divide-y divide-border rounded-md border border-border">
                  {detail.maintenanceLogs.map((log) => (
                    <li key={log.id} className="px-4 py-2.5 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700">{formatDate(log.actionDate)}</span>
                        <StatusBadge status={log.conditionNoted} kind="condition" />
                      </div>
                      <p className="mt-1 text-muted">{log.actionsTaken}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">No maintenance logs recorded.</p>
              )}
            </div>
          </div>
        ) : null}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete extinguisher"
        message={`Are you sure you want to delete ${deleteTarget?.serialNumber}? This action cannot be undone.`}
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </>
  );
}
