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
  LoadingState,
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
      .catch(() => {
        /* ignore */
      });
    api.inspections
      .list({ limit: 100, page: 1, status: "COMPLETED" })
      .then((res) => setInspections(res.data))
      .catch(() => {
        /* ignore */
      });
  }, [canManage]);

  function openForm() {
    setForm({
      extinguisherId: "",
      actionsTaken: "",
      actionDate: "",
      conditionNoted: "GOOD",
      inspectionId: "",
    });
    setFormOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
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
          <LoadingState message="Loading maintenance logs…" />
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
                <thead className="border-b border-border bg-slate-50 text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-6 py-3 font-medium">Extinguisher</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Actions taken</th>
                    <th className="px-6 py-3 font-medium">Condition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {log.extinguisher?.serialNumber ?? "—"}
                        {log.extinguisher?.location && (
                          <span className="block text-xs font-normal text-muted">
                            {log.extinguisher.location}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-muted">{formatDate(log.actionDate)}</td>
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
            required
            value={form.extinguisherId}
            onChange={(e) => setForm({ ...form, extinguisherId: e.target.value })}
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
            required
            value={form.actionDate}
            onChange={(e) => setForm({ ...form, actionDate: e.target.value })}
          />
          <Select
            label="Condition noted"
            required
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
            required
            value={form.actionsTaken}
            onChange={(e) => setForm({ ...form, actionsTaken: e.target.value })}
          />
          <div className="flex gap-2">
            <Button type="submit" loading={saving}>
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
