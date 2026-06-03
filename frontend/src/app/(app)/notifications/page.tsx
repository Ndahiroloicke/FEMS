"use client";

import { useCallback, useEffect, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import {
  PageHeader,
  Card,
  Button,
  Select,
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/ui/primitives";
import { Pagination } from "@/components/ui/pagination";
import { NOTIFICATIONS_UPDATED_EVENT } from "@/components/layout/sidebar";
import { useToast } from "@/components/providers/toast-provider";
import { api, ApiError, type Notification, type PageMeta } from "@/lib/api";
import { formatDateTime, cn } from "@/lib/utils";

const PAGE_SIZE = 10;

type ReadFilter = "all" | "unread" | "read";

function notifyUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(NOTIFICATIONS_UPDATED_EVENT));
  }
}

export default function NotificationsPage() {
  const toast = useToast();
  const [items, setItems] = useState<Notification[]>([]);
  const [meta, setMeta] = useState<PageMeta | null>(null);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<ReadFilter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [markingAll, setMarkingAll] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.notifications.list({
        page,
        limit: PAGE_SIZE,
        isRead: filter === "all" ? undefined : filter === "read",
      });
      setItems(res.data);
      setMeta(res.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, [page, filter]);

  useEffect(() => {
    load();
  }, [load]);

  async function markRead(id: string) {
    try {
      await api.notifications.markRead(id);
      setItems((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
      notifyUpdated();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to mark as read");
    }
  }

  async function markAllRead() {
    setMarkingAll(true);
    try {
      await api.notifications.markAllRead();
      toast.success("All notifications marked as read");
      notifyUpdated();
      await load();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to mark all as read");
    } finally {
      setMarkingAll(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Notifications"
        description="Expiry reminders and system alerts"
        action={
          <Button variant="secondary" onClick={markAllRead} loading={markingAll}>
            <CheckCheck className="h-4 w-4" />
            Mark all read
          </Button>
        }
      />

      <Card>
        <div className="flex flex-wrap items-end gap-3 border-b border-border px-6 py-4">
          <div className="w-44">
            <Select
              label="Show"
              value={filter}
              onChange={(e) => {
                setPage(1);
                setFilter(e.target.value as ReadFilter);
              }}
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </Select>
          </div>
        </div>

        {loading ? (
          <LoadingState message="Loading notifications…" />
        ) : error ? (
          <ErrorState message={error} onRetry={load} />
        ) : items.length === 0 ? (
          <EmptyState title="No notifications" message="You're all caught up." />
        ) : (
          <>
            <ul className="divide-y divide-border">
              {items.map((n) => (
                <li
                  key={n.id}
                  className={cn(
                    "flex items-start gap-4 px-6 py-4",
                    !n.isRead && "bg-blue-50/40",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      n.isRead ? "bg-slate-100 text-slate-400" : "bg-blue-100 text-blue-600",
                    )}
                  >
                    <Bell className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-800">{n.message}</p>
                    <p className="mt-1 text-xs text-muted">{formatDateTime(n.createdAt)}</p>
                  </div>
                  {!n.isRead && (
                    <button
                      type="button"
                      onClick={() => markRead(n.id)}
                      className="shrink-0 text-xs font-medium text-slate-600 hover:text-slate-900"
                    >
                      Mark read
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <Pagination meta={meta} onPageChange={setPage} />
          </>
        )}
      </Card>
    </>
  );
}
