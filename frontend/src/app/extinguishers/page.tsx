"use client";

import { FormEvent, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  PageHeader,
  Card,
  Button,
  Input,
  Select,
  Alert,
  EmptyState,
} from "@/components/ui/primitives";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  api,
  type Customer,
  type Extinguisher,
  type CreateExtinguisherInput,
  type ExtinguisherStatus,
} from "@/lib/api";
import { formatDate } from "@/lib/utils";

const emptyForm: CreateExtinguisherInput = {
  serialNumber: "",
  customerId: "",
  purchaseDate: "",
  expiryDate: "",
  type: "",
  capacity: "",
};

export default function ExtinguishersPage() {
  const [extinguishers, setExtinguishers] = useState<Extinguisher[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [form, setForm] = useState<CreateExtinguisherInput>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadData(status?: string) {
    setLoading(true);
    setError("");
    try {
      const [extList, custList] = await Promise.all([
        api.extinguishers.list(status ? { status } : undefined),
        api.customers.list(),
      ]);
      setExtinguishers(extList);
      setCustomers(custList);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.extinguishers.create({
        ...form,
        type: form.type || undefined,
        capacity: form.capacity || undefined,
      });
      setForm(emptyForm);
      setShowForm(false);
      await loadData(statusFilter || undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register extinguisher");
    } finally {
      setSaving(false);
    }
  }

  async function handleAction(id: string, action: "deliver" | "return") {
    setError("");
    try {
      if (action === "deliver") await api.extinguishers.deliver(id);
      else await api.extinguishers.return(id);
      await loadData(statusFilter || undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed");
    }
  }

  return (
    <>
      <PageHeader
        title="Fire Extinguishers"
        description="Track sales, delivery status, and expiry dates"
        action={
          <Button onClick={() => setShowForm((v) => !v)}>
            <Plus className="h-4 w-4" />
            Register sale
          </Button>
        }
      />

      {error && <Alert message={error} />}

      {showForm && (
        <Card className="mb-6 p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">New extinguisher sale</h2>
          <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Serial number"
              required
              value={form.serialNumber}
              onChange={(e) => setForm({ ...form, serialNumber: e.target.value })}
            />
            <Select
              label="Customer"
              required
              value={form.customerId}
              onChange={(e) => setForm({ ...form, customerId: e.target.value })}
            >
              <option value="">Select customer</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.fullName} ({c.nationalId})
                </option>
              ))}
            </Select>
            <Input
              label="Purchase date"
              type="date"
              required
              value={form.purchaseDate}
              onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })}
            />
            <Input
              label="Expiry date"
              type="date"
              required
              value={form.expiryDate}
              onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
            />
            <Input
              label="Type"
              placeholder="e.g. ABC Dry Powder"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
            <Input
              label="Capacity"
              placeholder="e.g. 6kg"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            />
            <div className="flex gap-2 sm:col-span-2">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Register extinguisher"}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-border px-6 py-4">
          <Select
            value={statusFilter}
            onChange={async (e) => {
              setStatusFilter(e.target.value);
              await loadData(e.target.value || undefined);
            }}
          >
            <option value="">All statuses</option>
            {(["ACTIVE", "DELIVERED", "RETURNED", "EXPIRED"] as ExtinguisherStatus[]).map(
              (s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ),
            )}
          </Select>
        </div>

        {loading ? (
          <p className="px-6 py-8 text-sm text-muted">Loading extinguishers...</p>
        ) : extinguishers.length === 0 ? (
          <EmptyState message="No extinguishers registered yet." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-slate-50 text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-6 py-3 font-medium">Serial</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">Expiry</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {extinguishers.map((ext) => (
                  <tr key={ext.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-900">{ext.serialNumber}</td>
                    <td className="px-6 py-4">{ext.customer?.fullName ?? "—"}</td>
                    <td className="px-6 py-4 text-muted">{ext.type ?? "—"}</td>
                    <td className="px-6 py-4 text-muted">{formatDate(ext.expiryDate)}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={ext.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {ext.status === "ACTIVE" && (
                          <Button
                            variant="secondary"
                            className="px-2 py-1 text-xs"
                            onClick={() => handleAction(ext.id, "deliver")}
                          >
                            Mark delivered
                          </Button>
                        )}
                        {(ext.status === "ACTIVE" || ext.status === "DELIVERED") && (
                          <Button
                            variant="secondary"
                            className="px-2 py-1 text-xs"
                            onClick={() => handleAction(ext.id, "return")}
                          >
                            Mark returned
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}
