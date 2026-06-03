"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Eye, Pencil, Plus, Search, Trash2, UserCog } from "lucide-react";
import {
  PageHeader,
  Card,
  Button,
  Input,
  Select,
  EmptyState,
  ErrorState,
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
  type User,
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

interface FormErrors {
  serialNumber?: string;
  location?: string;
  size?: string;
  installationDate?: string;
  expiryDate?: string;
}

function TableSkeleton() {
  return (
    <div className="divide-y divide-border">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-4">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-32 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-20 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-16 animate-pulse rounded bg-slate-100" />
          <div className="ml-auto h-6 w-16 animate-pulse rounded-full bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export default function ExtinguishersPage() {
  const { role } = useAuth();
  const toast = useToast();
  const isAdmin = role === "ADMIN";
  const isUser = role === "USER";

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
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  const [detail, setDetail] = useState<FireExtinguisherDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<FireExtinguisher | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [assignTarget, setAssignTarget] = useState<FireExtinguisher | null>(null);
  const [assignUserId, setAssignUserId] = useState<string>("");
  const [assigning, setAssigning] = useState(false);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [assignError, setAssignError] = useState("");

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

  function validateForm(): boolean {
    const next: FormErrors = {};
    if (!form.serialNumber.trim()) next.serialNumber = "Serial number is required";
    if (!form.location.trim()) next.location = "Location is required";
    else if (form.location.trim().length < 3) next.location = "Location must be at least 3 characters";
    if (!EXTINGUISHER_SIZES.includes(form.size as typeof EXTINGUISHER_SIZES[number]))
      next.size = "Select a valid size";
    if (!form.installationDate) next.installationDate = "Installation date is required";
    if (!form.expiryDate) next.expiryDate = "Expiry date is required";
    else if (form.installationDate && form.expiryDate <= form.installationDate)
      next.expiryDate = "Expiry must be after installation date";
    setFormErrors(next);
    return Object.keys(next).length === 0;
  }

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setFormErrors({});
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
    setFormErrors({});
    setFormOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;
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

  async function openAssign(ext: FireExtinguisher) {
    // Block assignment for broken extinguishers
    if (ext.status === "OUT_OF_SERVICE" || ext.status === "NEEDS_MAINTENANCE") {
      toast.error(
        `Cannot assign a ${ext.status === "OUT_OF_SERVICE" ? "out-of-service" : "extinguisher needing maintenance"} unit. Fix it first.`
      );
      return;
    }
    setAssignTarget(ext);
    setAssignUserId(ext.ownerId ?? "");
    setAssignError("");
    setUsersLoading(true);
    try {
      // Always fetch fresh, filter to USER role only
      const res = await api.users.list({ limit: 200, role: "USER" });
      setUsersList(res.data.filter((u) => u.isActive !== false));
    } catch (err) {
      setAssignError(err instanceof ApiError ? err.message : "Failed to load users");
      setUsersList([]);
    } finally {
      setUsersLoading(false);
    }
  }

  async function handleAssign(overrideOwnerId?: string | null) {
    if (!assignTarget) return;
    setAssigning(true);
    const ownerId = overrideOwnerId !== undefined ? overrideOwnerId : assignUserId || null;
    try {
      await api.extinguishers.assign(assignTarget.id, { ownerId });
      toast.success(ownerId ? "Owner assigned successfully" : "Owner unassigned successfully");
      setAssignTarget(null);
      await load();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to assign owner");
    } finally {
      setAssigning(false);
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
        description={
          isUser
            ? "Showing extinguishers assigned to you."
            : "Register and manage your extinguisher inventory"
        }
        action={
          !isUser ? (
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4" />
              Register extinguisher
            </Button>
          ) : undefined
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
          <TableSkeleton />
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
                <thead className="border-b border-border bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
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
                    <tr key={ext.id} className="transition-colors hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{ext.serialNumber}</td>
                      <td className="px-6 py-4">{ext.location}</td>
                      <td className="px-6 py-4 text-slate-500">{formatEnum(ext.type)}</td>
                      <td className="px-6 py-4 text-slate-500">{ext.size}</td>
                      <td className="px-6 py-4 text-slate-500">{formatDate(ext.expiryDate)}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={ext.status} kind="extinguisher" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => openDetail(ext.id)}
                            className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {!isUser && (
                            <button
                              type="button"
                              onClick={() => openEdit(ext)}
                              className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                              title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                          )}
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => openAssign(ext)}
                              className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                              title="Assign owner"
                            >
                              <UserCog className="h-4 w-4" />
                            </button>
                          )}
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => setDeleteTarget(ext)}
                              className="rounded-md p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
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
            value={form.serialNumber}
            error={formErrors.serialNumber}
            onChange={(e) => {
              setForm({ ...form, serialNumber: e.target.value });
              if (formErrors.serialNumber) setFormErrors((p) => ({ ...p, serialNumber: undefined }));
            }}
          />
          <Input
            label="Location"
            value={form.location}
            error={formErrors.location}
            onChange={(e) => {
              setForm({ ...form, location: e.target.value });
              if (formErrors.location) setFormErrors((p) => ({ ...p, location: undefined }));
            }}
          />
          <Select
            label="Type"
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
            value={form.size}
            error={formErrors.size}
            onChange={(e) => {
              setForm({ ...form, size: e.target.value });
              if (formErrors.size) setFormErrors((p) => ({ ...p, size: undefined }));
            }}
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
            value={form.installationDate}
            error={formErrors.installationDate}
            onChange={(e) => {
              setForm({ ...form, installationDate: e.target.value });
              if (formErrors.installationDate)
                setFormErrors((p) => ({ ...p, installationDate: undefined }));
            }}
          />
          <Input
            label="Expiry date"
            type="date"
            value={form.expiryDate}
            error={formErrors.expiryDate}
            onChange={(e) => {
              setForm({ ...form, expiryDate: e.target.value });
              if (formErrors.expiryDate) setFormErrors((p) => ({ ...p, expiryDate: undefined }));
            }}
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
            <Button type="submit" loading={saving} disabled={saving}>
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
          <div className="space-y-3 py-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 w-full animate-pulse rounded bg-slate-100" />
            ))}
          </div>
        ) : detail ? (
          <div className="space-y-6">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div>
                <dt className="text-slate-400">Location</dt>
                <dd className="font-medium text-slate-900">{detail.location}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Type</dt>
                <dd className="font-medium text-slate-900">{formatEnum(detail.type)}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Size</dt>
                <dd className="font-medium text-slate-900">{detail.size}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Status</dt>
                <dd>
                  <StatusBadge status={detail.status} kind="extinguisher" />
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">Installed</dt>
                <dd className="font-medium text-slate-900">
                  {formatDate(detail.installationDate)}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">Expires</dt>
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
                <p className="text-sm text-slate-400">No inspections recorded.</p>
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
                      <p className="mt-1 text-slate-400">{log.actionsTaken}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400">No maintenance logs recorded.</p>
              )}
            </div>
          </div>
        ) : null}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete extinguisher?"
        message="This cannot be undone."
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />

      {/* Assign Owner modal */}
      <Modal
        open={Boolean(assignTarget)}
        onClose={() => { setAssignTarget(null); setAssignError(""); }}
        title="Assign Extinguisher Owner"
      >
        <div className="space-y-4">
          {/* Extinguisher info */}
          {assignTarget && (
            <div className="rounded-lg border border-border bg-slate-50 px-4 py-3 text-sm">
              <p className="font-medium text-slate-900">{assignTarget.serialNumber}</p>
              <p className="text-slate-500">{assignTarget.location} · <StatusBadge status={assignTarget.status} kind="extinguisher" /></p>
            </div>
          )}

          {/* Current owner */}
          {assignTarget?.owner ? (
            <p className="text-sm text-slate-600">
              Currently assigned to:{" "}
              <span className="font-medium text-slate-900">
                {assignTarget.owner.firstName} {assignTarget.owner.lastName}
              </span>{" "}
              <span className="text-slate-400">({assignTarget.owner.email})</span>
            </p>
          ) : (
            <p className="text-sm text-slate-400">No owner currently assigned.</p>
          )}

          {/* Error loading users */}
          {assignError && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{assignError}</p>
          )}

          {/* User dropdown */}
          <Select
            label="Assign to user"
            value={assignUserId}
            onChange={(e) => setAssignUserId(e.target.value)}
            disabled={usersLoading || !!assignError}
          >
            {usersLoading ? (
              <option>Loading users…</option>
            ) : (
              <>
                <option value="">— Unassigned —</option>
                {usersList.length === 0 && !assignError && (
                  <option disabled>No active users found</option>
                )}
                {usersList.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.firstName} {u.lastName} ({u.email})
                  </option>
                ))}
              </>
            )}
          </Select>

          <div className="flex gap-2">
            <Button
              loading={assigning}
              disabled={assigning || usersLoading || !!assignError}
              onClick={() => handleAssign()}
            >
              Save
            </Button>
            {assignTarget?.owner && (
              <Button
                variant="secondary"
                disabled={assigning}
                onClick={() => handleAssign(null)}
              >
                Unassign
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => { setAssignTarget(null); setAssignError(""); }}
              disabled={assigning}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
