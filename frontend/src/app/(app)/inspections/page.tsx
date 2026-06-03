"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { CalendarPlus, Pencil } from "lucide-react";
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
import { Textarea } from "@/components/ui/modal";
import { StatusBadge } from "@/components/ui/status-badge";
import { Pagination } from "@/components/ui/pagination";
import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import {
  api,
  ApiError,
  INSPECTION_RESULTS,
  INSPECTION_STATUSES,
  type CreateInspectionInput,
  type FireExtinguisher,
  type Inspection,
  type InspectionResult,
  type InspectionStatus,
  type PageMeta,
  type User,
} from "@/lib/api";
import { formatDateTime, formatEnum, toDateTimeLocal } from "@/lib/utils";

const PAGE_SIZE = 10;

export default function InspectionsPage() {
  const { role } = useAuth();
  const toast = useToast();
  const canManage = role === "ADMIN" || role === "INSPECTOR";
  const isAdmin = role === "ADMIN";

  const [items, setItems] = useState<Inspection[]>([]);
  const [meta, setMeta] = useState<PageMeta | null>(null);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<InspectionStatus | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [extinguishers, setExtinguishers] = useState<FireExtinguisher[]>([]);
  const [inspectors, setInspectors] = useState<User[]>([]);

  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleForm, setScheduleForm] = useState<{
    extinguisherId: string;
    scheduledAt: string;
    inspectorId: string;
    notes: string;
  }>({ extinguisherId: "", scheduledAt: "", inspectorId: "", notes: "" });
  const [saving, setSaving] = useState(false);

  const [editing, setEditing] = useState<Inspection | null>(null);
  const [editForm, setEditForm] = useState<{
    status: InspectionStatus;
    result: InspectionResult | "";
    notes: string;
    inspectorId: string;
  }>({ status: "SCHEDULED", result: "", notes: "", inspectorId: "" });
  const [updating, setUpdating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.inspections.list({
        page,
        limit: PAGE_SIZE,
        status: statusFilter,
      });
      setItems(res.data);
      setMeta(res.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load inspections");
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  // Load reference data for the schedule modal once.
  useEffect(() => {
    if (!canManage) return;
    api.extinguishers
      .list({ limit: 100, page: 1 })
      .then((res) => setExtinguishers(res.data))
      .catch(() => {
        /* ignore */
      });
    if (isAdmin) {
      api.users
        .list({ limit: 100, page: 1, role: "INSPECTOR" })
        .then((res) => setInspectors(res.data))
        .catch(() => {
          /* ignore */
        });
    }
  }, [canManage, isAdmin]);

  function openSchedule() {
    setScheduleForm({ extinguisherId: "", scheduledAt: "", inspectorId: "", notes: "" });
    setScheduleOpen(true);
  }

  async function handleSchedule(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: CreateInspectionInput = {
        extinguisherId: scheduleForm.extinguisherId,
        scheduledAt: new Date(scheduleForm.scheduledAt).toISOString(),
        inspectorId: scheduleForm.inspectorId || undefined,
        notes: scheduleForm.notes || undefined,
      };
      await api.inspections.create(payload);
      toast.success("Inspection scheduled");
      setScheduleOpen(false);
      setPage(1);
      await load();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to schedule inspection");
    } finally {
      setSaving(false);
    }
  }

  function openEdit(inspection: Inspection) {
    setEditing(inspection);
    setEditForm({
      status: inspection.status,
      result: inspection.result ?? "",
      notes: inspection.notes ?? "",
      inspectorId: inspection.inspectorId ?? "",
    });
  }

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setUpdating(true);
    try {
      await api.inspections.update(editing.id, {
        status: editForm.status,
        result: editForm.result || undefined,
        notes: editForm.notes || undefined,
        inspectorId: editForm.inspectorId || undefined,
      });
      toast.success("Inspection updated");
      setEditing(null);
      await load();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to update inspection");
    } finally {
      setUpdating(false);
    }
  }

  function inspectorName(inspection: Inspection) {
    if (inspection.inspector) {
      return `${inspection.inspector.firstName} ${inspection.inspector.lastName}`;
    }
    return "Unassigned";
  }

  return (
    <>
      <PageHeader
        title="Inspections"
        description="Schedule and track fire extinguisher inspections"
        action={
          canManage ? (
            <Button onClick={openSchedule}>
              <CalendarPlus className="h-4 w-4" />
              Schedule inspection
            </Button>
          ) : undefined
        }
      />

      <Card>
        <div className="flex flex-wrap items-end gap-3 border-b border-border px-6 py-4">
          <div className="w-48">
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => {
                setPage(1);
                setStatusFilter(e.target.value as InspectionStatus | "");
              }}
            >
              <option value="">All statuses</option>
              {INSPECTION_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {formatEnum(s)}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {loading ? (
          <LoadingState message="Loading inspections…" />
        ) : error ? (
          <ErrorState message={error} onRetry={load} />
        ) : items.length === 0 ? (
          <EmptyState
            title="No inspections found"
            message="Schedule an inspection to get started."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-slate-50 text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-6 py-3 font-medium">Extinguisher</th>
                    <th className="px-6 py-3 font-medium">Scheduled</th>
                    <th className="px-6 py-3 font-medium">Inspector</th>
                    <th className="px-6 py-3 font-medium">Result</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    {canManage && <th className="px-6 py-3 text-right font-medium">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((ins) => (
                    <tr key={ins.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {ins.extinguisher?.serialNumber ?? "—"}
                        {ins.extinguisher?.location && (
                          <span className="block text-xs font-normal text-muted">
                            {ins.extinguisher.location}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-muted">{formatDateTime(ins.scheduledAt)}</td>
                      <td className="px-6 py-4 text-muted">{inspectorName(ins)}</td>
                      <td className="px-6 py-4">
                        {ins.result ? (
                          <StatusBadge status={ins.result} kind="result" />
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={ins.status} kind="inspection" />
                      </td>
                      {canManage && (
                        <td className="px-6 py-4">
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => openEdit(ins)}
                              className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                              title="Update"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination meta={meta} onPageChange={setPage} />
          </>
        )}
      </Card>

      {/* Schedule modal */}
      <Modal
        open={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        title="Schedule inspection"
      >
        <form onSubmit={handleSchedule} className="space-y-4">
          <Select
            label="Extinguisher"
            required
            value={scheduleForm.extinguisherId}
            onChange={(e) =>
              setScheduleForm({ ...scheduleForm, extinguisherId: e.target.value })
            }
          >
            <option value="">Select an extinguisher</option>
            {extinguishers.map((ext) => (
              <option key={ext.id} value={ext.id}>
                {ext.serialNumber} — {ext.location}
              </option>
            ))}
          </Select>
          <Input
            label="Scheduled date & time"
            type="datetime-local"
            required
            value={scheduleForm.scheduledAt}
            onChange={(e) => setScheduleForm({ ...scheduleForm, scheduledAt: e.target.value })}
          />
          {isAdmin && (
            <Select
              label="Inspector (optional)"
              value={scheduleForm.inspectorId}
              onChange={(e) =>
                setScheduleForm({ ...scheduleForm, inspectorId: e.target.value })
              }
            >
              <option value="">Unassigned</option>
              {inspectors.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.firstName} {u.lastName}
                </option>
              ))}
            </Select>
          )}
          <Textarea
            label="Notes (optional)"
            value={scheduleForm.notes}
            onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
          />
          <div className="flex gap-2">
            <Button type="submit" loading={saving}>
              Schedule
            </Button>
            <Button type="button" variant="secondary" onClick={() => setScheduleOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Update modal */}
      <Modal
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title="Update inspection"
        description={editing?.extinguisher?.serialNumber}
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          <Select
            label="Status"
            value={editForm.status}
            onChange={(e) =>
              setEditForm({ ...editForm, status: e.target.value as InspectionStatus })
            }
          >
            {INSPECTION_STATUSES.map((s) => (
              <option key={s} value={s}>
                {formatEnum(s)}
              </option>
            ))}
          </Select>
          <Select
            label="Result"
            value={editForm.result}
            onChange={(e) =>
              setEditForm({ ...editForm, result: e.target.value as InspectionResult | "" })
            }
          >
            <option value="">No result yet</option>
            {INSPECTION_RESULTS.map((r) => (
              <option key={r} value={r}>
                {formatEnum(r)}
              </option>
            ))}
          </Select>
          {isAdmin && (
            <Select
              label="Inspector"
              value={editForm.inspectorId}
              onChange={(e) => setEditForm({ ...editForm, inspectorId: e.target.value })}
            >
              <option value="">Unassigned</option>
              {inspectors.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.firstName} {u.lastName}
                </option>
              ))}
            </Select>
          )}
          <Textarea
            label="Notes"
            value={editForm.notes}
            onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
          />
          <div className="flex gap-2">
            <Button type="submit" loading={updating}>
              Save changes
            </Button>
            <Button type="button" variant="secondary" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
