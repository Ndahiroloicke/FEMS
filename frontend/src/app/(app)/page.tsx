"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ClipboardCheck,
  Flame,
  ArrowRight,
  CalendarDays,
} from "lucide-react";
import { PageHeader, Card, ErrorState, LoadingState } from "@/components/ui/primitives";
import { StatCard } from "@/components/ui/status-badge";
import { api, type ReportSummary } from "@/lib/api";
import { formatEnum } from "@/lib/utils";

function DistributionBars({
  data,
  emptyLabel,
}: {
  data: Record<string, number>;
  emptyLabel: string;
}) {
  const entries = Object.entries(data ?? {});
  const max = Math.max(1, ...entries.map(([, v]) => v));

  if (entries.length === 0) {
    return <p className="px-6 py-6 text-sm text-muted">{emptyLabel}</p>;
  }

  return (
    <div className="space-y-3 px-6 py-5">
      {entries.map(([key, value]) => (
        <div key={key}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-medium text-slate-700">{formatEnum(key)}</span>
            <span className="text-muted">{value}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-800"
              style={{ width: `${(value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const quickLinks = [
  { href: "/extinguishers", label: "Manage extinguishers", icon: Flame },
  { href: "/inspections", label: "Schedule inspections", icon: ClipboardCheck },
  { href: "/reports", label: "View reports", icon: CalendarDays },
];

export default function DashboardPage() {
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setSummary(await api.reports.summary());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your fire extinguisher fleet and compliance status"
      />

      {loading ? (
        <LoadingState message="Loading dashboard…" />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : summary ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total extinguishers"
              value={summary.totalExtinguishers}
              icon={<Flame className="h-5 w-5" />}
            />
            <StatCard
              label="Active inspections"
              value={summary.activeInspections}
              icon={<ClipboardCheck className="h-5 w-5" />}
            />
            <StatCard
              label="Expired"
              value={summary.expiredCount}
              tone={summary.expiredCount > 0 ? "danger" : "default"}
              icon={<AlertTriangle className="h-5 w-5" />}
            />
            <StatCard
              label="Registered this month"
              value={summary.registeredThisMonth}
              hint={`${summary.registeredToday} today · ${summary.registeredThisYear} this year`}
            />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Card>
              <div className="border-b border-border px-6 py-4">
                <h2 className="text-sm font-semibold text-slate-900">By status</h2>
              </div>
              <DistributionBars data={summary.byStatus} emptyLabel="No status data yet." />
            </Card>
            <Card>
              <div className="border-b border-border px-6 py-4">
                <h2 className="text-sm font-semibold text-slate-900">By type</h2>
              </div>
              <DistributionBars data={summary.byType} emptyLabel="No type data yet." />
            </Card>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {quickLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between rounded-lg border border-border bg-surface p-5 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                <span className="flex items-center gap-3 text-sm font-medium text-slate-800">
                  <Icon className="h-5 w-5 text-slate-500" />
                  {label}
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
