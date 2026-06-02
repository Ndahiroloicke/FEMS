"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { PageHeader, Card, Button, Alert } from "@/components/ui/primitives";
import { StatCard } from "@/components/ui/status-badge";
import { api, type DashboardSummary } from "@/lib/api";
import { formatDateTime } from "@/lib/utils";

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [runningChecks, setRunningChecks] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadSummary() {
    setLoading(true);
    setError("");
    try {
      setSummary(await api.dashboard.summary());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  async function runComplianceChecks() {
    setRunningChecks(true);
    setError("");
    setSuccess("");
    try {
      const result = await api.compliance.runChecks();
      setSuccess(
        `Checks complete: ${result.warnings.processed} expiry warning(s), ${result.escalations.processed} escalation(s) processed.`,
      );
      await loadSummary();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Compliance check failed");
    } finally {
      setRunningChecks(false);
    }
  }

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of customers, extinguishers, and compliance status"
        action={
          <Button onClick={runComplianceChecks} disabled={runningChecks}>
            <RefreshCw className={`h-4 w-4 ${runningChecks ? "animate-spin" : ""}`} />
            Run compliance checks
          </Button>
        }
      />

      {error && <Alert message={error} />}
      {success && <Alert message={success} type="success" />}

      {loading ? (
        <p className="text-sm text-muted">Loading dashboard...</p>
      ) : summary ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total customers" value={summary.totalCustomers} />
            <StatCard label="Total extinguishers" value={summary.totalExtinguishers} />
            <StatCard
              label="Expiring soon"
              value={summary.expiringSoon}
              tone="warning"
              hint="Within warning window"
            />
            <StatCard
              label="Pending escalations"
              value={summary.pendingEscalations}
              tone={summary.pendingEscalations > 0 ? "danger" : "default"}
              hint="Require police follow-up"
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <StatCard label="Active" value={summary.activeExtinguishers} />
            <StatCard label="Delivered" value={summary.deliveredExtinguishers} />
            <StatCard
              label="Expired & not returned"
              value={summary.expiredNotReturned}
              tone={summary.expiredNotReturned > 0 ? "danger" : "default"}
            />
          </div>

          <Card className="mt-8">
            <div className="border-b border-border px-6 py-4">
              <h2 className="text-sm font-semibold text-slate-900">Recent notifications</h2>
            </div>
            {summary.recentNotifications.length === 0 ? (
              <p className="px-6 py-8 text-sm text-muted">No notifications sent yet.</p>
            ) : (
              <ul className="divide-y divide-border">
                {summary.recentNotifications.map((notification) => (
                  <li key={notification.id} className="px-6 py-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {notification.customer?.fullName ?? "Unknown customer"}
                        </p>
                        <p className="mt-1 text-sm text-muted">{notification.message}</p>
                      </div>
                      <span className="text-xs text-muted">
                        {formatDateTime(notification.sentAt)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="border-t border-border px-6 py-3">
              <Link href="/notifications" className="text-sm font-medium text-slate-700 hover:text-slate-900">
                View all notifications →
              </Link>
            </div>
          </Card>
        </>
      ) : null}
    </>
  );
}
