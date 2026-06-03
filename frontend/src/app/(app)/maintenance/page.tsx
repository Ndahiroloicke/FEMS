"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  PageHeader,
  Card,
  Button,
  Input,
  Select,
  EmptyState,
  ErrorState,
} from "@/components/ui/primitives";
import { Modal, Textarea } from "@/components/ui/modal";
import { StatusBadge } from "@/components/ui/status-badge";
import { Pagination } from "@/components/ui/pagination";
import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import {
  api,
  ApiError,
  MAINTENANCE_CONDITIONS,
  type CreateMaintenanceInput,
  type FireExtinguisher,
  type Inspection,
  type MaintenanceCondition,
  type MaintenanceLog,
  type PageMeta,
} from "@/lib/api";
import { formatDate, formatEnum } from "@/lib/utils";

const PAGE_SIZE = 10;

interface FormErrors {
  extinguisherId?: string;
  actionDate?: string;
  actionsTaken?: string;
}

function TableSkeleton() {
  return (
    <div className="divide-y divide-border">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-4">
          <div className="h-4 w-28 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-48 animate-pulse rounded bg-slate-100" />
          <div className="ml-auto h-6 w-16 animate-pulse rounded-full bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export default function MaintenancePage() {
  const { role } = useAuth();
  const toast = useToast();
  const canManage = role === "ADMIN" || role === "INSPECTOR";

  const [items, setItems] = useState<MaintenanceLog[]>([]);
  const [meta, setMeta] = useState<PageMeta | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [extinguishers, setExtinguishers] = useState<FireExtinguisher[]>([]);
  const [inspections, setInspections] = useState<Inspection[]>([]);

  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<{
    extinguisherId: string;
    actionsTaken: string;
    actionDate: string;
    conditionNoted: MaintenanceCondition;
    inspectionId: string;
  }>({
    extinguisherId: "",
    actionsTaken: "",
    actionDate: "",
    conditionNoted: "GOOD",
    inspectionId: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.maintenance.list({ page, limit: PAGE_SIZE });
      setItems(res.data);
      setMeta(res.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load maintenance logs");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!canManage) return;
    api.extinguishers
      .list({ limit: 100, page: 1 })
      .then((res) => setExtinguishers(res.data))
      .catch(() => { /* ignore */ });
    api.inspections
      .list({ limit: 100, page: 1, status: "COMPLETED" })
      .then((res) => setInspections(res.data))
      .catch(() => { /* ignore */ });
  }, [canManage]);

  function openForm() {
    setForm({
      extinguisherId: "",
      actionsTaken: "",
      actionDate: "",
      conditionNoted: "GOOD",
      inspectionId: "",
    });
    setFormErrors({});
    setFormOpen(true);
  }

  function validateForm(): boolean {
    const next: FormErrors = {};
    if (!form.extinguisherId) next.extinguisherId = "Select an extinguisher";
    if (!form.actionDate) next.actionDate = "Action date is required";
    if (!form.actionsTaken.trim()) next.actionsTaken = "Actions taken is required";
    else if (form.actionsTaken.trim().length < 10)
      next.actionsTaken = "Please provide at least 10 characters";
    setFormErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;
    setSaving(true);
    try {
      const payload: CreateMaintenanceInput = {
        extinguisherId: form.extinguisherId,
        actionsTaken: form.actionsTaken,
        actionDate: new Date(form.actionDate).toISOString(),
        conditionNoted: form.conditionNoted,
        inspectionId: form.inspectionId || undefined,
      };
      await api.maintenance.create(payload);
      toast.success("Maintenance logged");
      setFormOpen(false);
      setPage(1);
      await load();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to log maintenance");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Maintenance"
        description="Record maintenance actions performed on extinguishers"
        action={
          canManage ? (
            <Button onClick={openForm}>
              <Plus className="h-4 w-4" />
              Log maintenance
            </Button>
          ) : undefined
        }
      />

      <Card>
        {loading ? (
          <TableSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={load} />
        ) : items.length === 0 ? (
          <EmptyState
            title="No maintenance logs"
            message="Maintenance actions you record will appear here."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-6 py-3 font-medium">Extinguisher</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Actions taken</th>
                    <th className="px-6 py-3 font-medium">Condition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((log) => (
                    <tr key={log.id} className="transition-colors hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {log.extinguisher?.serialNumber ?? "—"}
                        {log.extinguisher?.location && (
                          <span className="block text-xs font-normal text-slate-400">
                            {log.extinguisher.location}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{formatDate(log.actionDate)}</td>
                      <td className="max-w-md px-6 py-4 text-slate-700">{log.actionsTaken}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={log.conditionNoted} kind="condition" />
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

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title="Log maintenance">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Extinguisher"
            value={form.extinguisherId}
            error={formErrors.extinguisherId}
            onChange={(e) => {
              setForm({ ...form, extinguisherId: e.target.value });
              if (formErrors.extinguisherId)
                setFormErrors((p) => ({ ...p, extinguisherId: undefined }));
            }}
          >
            <option value="">Select an extinguisher</option>
            {extinguishers.map((ext) => (
              <option key={ext.id} value={ext.id}>
                {ext.serialNumber} — {ext.location}
              </option>
            ))}
          </Select>
          <Input
            label="Action date"
            type="date"
            value={form.actionDate}
            error={formErrors.actionDate}
            onChange={(e) => {
              setForm({ ...form, actionDate: e.target.value });
              if (formErrors.actionDate) setFormErrors((p) => ({ ...p, actionDate: undefined }));
            }}
          />
          <Select
            label="Condition noted"
            value={form.conditionNoted}
            onChange={(e) =>
              setForm({ ...form, conditionNoted: e.target.value as MaintenanceCondition })
            }
          >
            {MAINTENANCE_CONDITIONS.map((c) => (
              <option key={c} value={c}>
                {formatEnum(c)}
              </option>
            ))}
          </Select>
          <Select
            label="Related inspection (optional)"
            value={form.inspectionId}
            onChange={(e) => setForm({ ...form, inspectionId: e.target.value })}
          >
            <option value="">None</option>
            {inspections.map((ins) => (
              <option key={ins.id} value={ins.id}>
                {ins.extinguisher?.serialNumber ?? "Inspection"} —{" "}
                {formatDate(ins.scheduledAt)}
              </option>
            ))}
          </Select>
          <Textarea
            label="Actions taken"
            value={form.actionsTaken}
            error={formErrors.actionsTaken}
            onChange={(e) => {
              setForm({ ...form, actionsTaken: e.target.value });
              if (formErrors.actionsTaken)
                setFormErrors((p) => ({ ...p, actionsTaken: undefined }));
            }}
          />
          <div className="flex gap-2">
            <Button type="submit" loading={saving} disabled={saving}>
              Log maintenance
            </Button>
            <Button type="button" variant="secondary" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
