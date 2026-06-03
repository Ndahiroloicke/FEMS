"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Search, Trash2 } from "lucide-react";
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
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { StatusBadge } from "@/components/ui/status-badge";
import { Pagination } from "@/components/ui/pagination";
import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import {
  api,
  ApiError,
  ROLES,
  type PageMeta,
  type Role,
  type User,
} from "@/lib/api";
import { formatEnum, initials } from "@/lib/utils";

const PAGE_SIZE = 10;

export default function UsersPage() {
  const { role, user: currentUser } = useAuth();
  const toast = useToast();
  const isAdmin = role === "ADMIN";

  const [items, setItems] = useState<User[]>([]);
  const [meta, setMeta] = useState<PageMeta | null>(null);
  const [page, setPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState<Role | "">("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.users.list({
        page,
        limit: PAGE_SIZE,
        role: roleFilter,
        search,
      });
      setItems(res.data);
      setMeta(res.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [page, roleFilter, search]);

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, load]);

  async function changeRole(target: User, newRole: Role) {
    setBusyId(target.id);
    try {
      await api.users.setRole(target.id, newRole);
      setItems((prev) => prev.map((u) => (u.id === target.id ? { ...u, role: newRole } : u)));
      toast.success("Role updated");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to update role");
    } finally {
      setBusyId(null);
    }
  }

  async function toggleStatus(target: User) {
    setBusyId(target.id);
    const next = !(target.isActive ?? true);
    try {
      await api.users.setStatus(target.id, next);
      setItems((prev) =>
        prev.map((u) => (u.id === target.id ? { ...u, isActive: next } : u)),
      );
      toast.success(next ? "User activated" : "User deactivated");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to update status");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.users.delete(deleteTarget.id);
      toast.success("User deleted");
      setDeleteTarget(null);
      if (items.length === 1 && page > 1) setPage((p) => p - 1);
      else await load();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to delete user");
    } finally {
      setDeleting(false);
    }
  }

  function applySearch(e: FormEvent) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  if (!isAdmin) {
    return (
      <>
        <PageHeader title="Users" />
        <Card>
          <EmptyState
            title="Access restricted"
            message="You don't have permission to manage users."
          />
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Users" description="Manage accounts, roles, and access" />

      <Card>
        <div className="flex flex-wrap items-end gap-3 border-b border-border px-6 py-4">
          <form onSubmit={applySearch} className="flex items-end gap-2">
            <div className="w-56">
              <Input
                label="Search"
                placeholder="Name or email"
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
              label="Role"
              value={roleFilter}
              onChange={(e) => {
                setPage(1);
                setRoleFilter(e.target.value as Role | "");
              }}
            >
              <option value="">All roles</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {formatEnum(r)}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {loading ? (
          <LoadingState message="Loading users…" />
        ) : error ? (
          <ErrorState message={error} onRetry={load} />
        ) : items.length === 0 ? (
          <EmptyState title="No users found" message="Try adjusting your filters." />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-slate-50 text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-6 py-3 font-medium">User</th>
                    <th className="px-6 py-3 font-medium">Role</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((u) => {
                    const isSelf = u.id === currentUser?.id;
                    const active = u.isActive ?? true;
                    return (
                      <tr key={u.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                              {initials(u.firstName, u.lastName)}
                            </span>
                            <div>
                              <p className="font-medium text-slate-900">
                                {u.firstName} {u.lastName}
                                {isSelf && (
                                  <span className="ml-2 text-xs font-normal text-muted">
                                    (you)
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-muted">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Select
                            value={u.role}
                            disabled={isSelf || busyId === u.id}
                            onChange={(e) => changeRole(u, e.target.value as Role)}
                            className="w-36"
                          >
                            {ROLES.map((r) => (
                              <option key={r} value={r}>
                                {formatEnum(r)}
                              </option>
                            ))}
                          </Select>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge
                            status={active ? "ACTIVE" : "OUT_OF_SERVICE"}
                            kind="extinguisher"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="secondary"
                              className="px-2.5 py-1 text-xs"
                              disabled={isSelf || busyId === u.id}
                              onClick={() => toggleStatus(u)}
                            >
                              {active ? "Deactivate" : "Activate"}
                            </Button>
                            <button
                              type="button"
                              disabled={isSelf}
                              onClick={() => setDeleteTarget(u)}
                              className="rounded-md p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination meta={meta} onPageChange={setPage} />
          </>
        )}
      </Card>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete user"
        message={`Are you sure you want to delete ${deleteTarget?.firstName} ${deleteTarget?.lastName}? This action cannot be undone.`}
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </>
  );
}
