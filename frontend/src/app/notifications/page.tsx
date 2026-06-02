"use client";

import { useEffect, useState } from "react";
import { PageHeader, Card, Alert, EmptyState } from "@/components/ui/primitives";
import { api, type Notification } from "@/lib/api";
import { formatDateTime } from "@/lib/utils";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        setNotifications(await api.notifications.list());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load notifications");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <>
      <PageHeader
        title="Notifications"
        description="Expiry warnings and escalation messages sent to customers"
      />

      {error && <Alert message={error} />}

      <Card>
        {loading ? (
          <p className="px-6 py-8 text-sm text-muted">Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <EmptyState message="No notifications have been sent yet. Run compliance checks from the dashboard." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-slate-50 text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Extinguisher</th>
                  <th className="px-6 py-3 font-medium">Message</th>
                  <th className="px-6 py-3 font-medium">Sent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {notifications.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium">
                        {n.type.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">{n.customer?.fullName ?? "—"}</td>
                    <td className="px-6 py-4 text-muted">{n.extinguisher?.serialNumber ?? "—"}</td>
                    <td className="max-w-md px-6 py-4 text-muted">{n.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted">
                      {formatDateTime(n.sentAt)}
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
