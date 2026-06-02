"use client";

import { FormEvent, useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import {
  PageHeader,
  Card,
  Button,
  Input,
  Alert,
  EmptyState,
} from "@/components/ui/primitives";
import { api, type Customer, type CreateCustomerInput } from "@/lib/api";
import { formatDate } from "@/lib/utils";

const emptyForm: CreateCustomerInput = {
  fullName: "",
  nationalId: "",
  phone: "",
  email: "",
  address: "",
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<CreateCustomerInput>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadCustomers(query?: string) {
    setLoading(true);
    setError("");
    try {
      setCustomers(await api.customers.list(query));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load customers");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    await loadCustomers(search || undefined);
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.customers.create({
        ...form,
        email: form.email || undefined,
        address: form.address || undefined,
      });
      setForm(emptyForm);
      setShowForm(false);
      await loadCustomers(search || undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create customer");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete customer ${name}? This will also remove their extinguishers.`)) return;
    setError("");
    try {
      await api.customers.delete(id);
      await loadCustomers(search || undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete customer");
    }
  }

  return (
    <>
      <PageHeader
        title="Customers"
        description="Register buyers and manage contact details"
        action={
          <Button onClick={() => setShowForm((v) => !v)}>
            <Plus className="h-4 w-4" />
            Add customer
          </Button>
        }
      />

      {error && <Alert message={error} />}

      {showForm && (
        <Card className="mb-6 p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">New customer</h2>
          <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Full name"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
            <Input
              label="National ID"
              required
              value={form.nationalId}
              onChange={(e) => setForm({ ...form, nationalId: e.target.value })}
            />
            <Input
              label="Phone"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              label="Address"
              className="sm:col-span-2"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <div className="flex gap-2 sm:col-span-2">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save customer"}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <div className="border-b border-border px-6 py-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search by name, ID, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
            />
            <Button type="submit" variant="secondary">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </form>
        </div>

        {loading ? (
          <p className="px-6 py-8 text-sm text-muted">Loading customers...</p>
        ) : customers.length === 0 ? (
          <EmptyState message="No customers found. Register your first customer above." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-slate-50 text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">National ID</th>
                  <th className="px-6 py-3 font-medium">Phone</th>
                  <th className="px-6 py-3 font-medium">Extinguishers</th>
                  <th className="px-6 py-3 font-medium">Registered</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-900">{customer.fullName}</td>
                    <td className="px-6 py-4 text-muted">{customer.nationalId}</td>
                    <td className="px-6 py-4 text-muted">{customer.phone}</td>
                    <td className="px-6 py-4">{customer._count?.extinguishers ?? 0}</td>
                    <td className="px-6 py-4 text-muted">{formatDate(customer.createdAt)}</td>
                    <td className="px-6 py-4">
                      <Button
                        variant="ghost"
                        className="px-2 py-1 text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(customer.id, customer.fullName)}
                      >
                        Delete
                      </Button>
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
