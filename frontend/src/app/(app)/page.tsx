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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { PageHeader, Card, ErrorState } from "@/components/ui/primitives";
import { StatCard } from "@/components/ui/status-badge";
import {
  api,
  type ReportSummary,
  type StockReportPoint,
  type InspectionStatusReport,
} from "@/lib/api";
import { formatEnum } from "@/lib/utils";
import { cn } from "@/lib/utils";

const PIE_COLORS: Record<string, string> = {
  SCHEDULED: "#0f172a",
  IN_PROGRESS: "#475569",
  COMPLETED: "#94a3b8",
  OVERDUE: "#dc2626",
  CANCELLED: "#cbd5e1",
  PENDING: "#f59e0b",
};

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
      <div className="mt-3 h-8 w-16 animate-pulse rounded bg-slate-100" />
      <div className="mt-2 h-3 w-20 animate-pulse rounded bg-slate-100" />
    </div>
  );
}

function SkeletonChart() {
  return (
    <div className="space-y-3 px-6 py-5">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-6 w-full animate-pulse rounded bg-slate-100" />
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
  const [stockData, setStockData] = useState<StockReportPoint[]>([]);
  const [inspectionStatus, setInspectionStatus] = useState<InspectionStatusReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [sum, stock, insStatus] = await Promise.all([
        api.reports.summary(),
        api.reports.stock("monthly"),
        api.reports.inspectionStatus(),
      ]);
      setSummary(sum);
      setStockData(stock);
      setInspectionStatus(insStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(t);
    }
  }, [loading]);

  const pieData = inspectionStatus
    ? Object.entries(inspectionStatus.byStatus).map(([name, value]) => ({ name, value }))
    : [];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your fire extinguisher fleet and compliance status"
      />

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : loading ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Card><SkeletonChart /></Card>
            <Card><SkeletonChart /></Card>
          </div>
        </>
      ) : summary ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              <StatCard
                key="total"
                label="Total extinguishers"
                value={summary.totalExtinguishers}
                icon={<Flame className="h-5 w-5" />}
              />,
              <StatCard
                key="inspections"
                label="Active inspections"
                value={summary.activeInspections}
                icon={<ClipboardCheck className="h-5 w-5" />}
              />,
              <StatCard
                key="expired"
                label="Expired"
                value={summary.expiredCount}
                tone={summary.expiredCount > 0 ? "danger" : "default"}
                icon={<AlertTriangle className="h-5 w-5" />}
              />,
              <StatCard
                key="month"
                label="Registered this month"
                value={summary.registeredThisMonth}
                hint={`${summary.registeredToday} today · ${summary.registeredThisYear} this year`}
              />,
            ].map((card, i) => (
              <div
                key={i}
                className={cn(
                  "transition-all duration-300",
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                )}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {card}
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Stock over time bar chart */}
            <div
              className={cn(
                "transition-all duration-300",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
              )}
              style={{ transitionDelay: "280ms" }}
            >
              <Card>
                <div className="border-b border-border px-6 py-4">
                  <h2 className="text-sm font-semibold text-slate-900">
                    Extinguishers registered per month
                  </h2>
                </div>
                {stockData.length > 0 ? (
                  <div className="px-4 py-5">
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={stockData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <XAxis
                          dataKey="period"
                          tick={{ fontSize: 11, fill: "#94a3b8" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: "#94a3b8" }}
                          axisLine={false}
                          tickLine={false}
                          allowDecimals={false}
                        />
                        <Tooltip
                          contentStyle={{
                            fontSize: 12,
                            borderColor: "#e2e8f0",
                            borderRadius: 6,
                          }}
                        />
                        <Bar dataKey="count" fill="#0f172a" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="px-6 py-6 text-sm text-slate-400">No stock data yet.</p>
                )}
              </Card>
            </div>

            {/* Inspection status pie chart */}
            <div
              className={cn(
                "transition-all duration-300",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
              )}
              style={{ transitionDelay: "340ms" }}
            >
              <Card>
                <div className="border-b border-border px-6 py-4">
                  <h2 className="text-sm font-semibold text-slate-900">Inspections by status</h2>
                </div>
                {pieData.length > 0 ? (
                  <div className="px-4 py-5">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((entry) => (
                            <Cell
                              key={entry.name}
                              fill={PIE_COLORS[entry.name] ?? "#94a3b8"}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            fontSize: 12,
                            borderColor: "#e2e8f0",
                            borderRadius: 6,
                          }}
                          formatter={(value, name) => [value, formatEnum(String(name))]}
                        />
                        <Legend
                          formatter={(value) => formatEnum(String(value))}
                          iconSize={8}
                          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="px-6 py-6 text-sm text-slate-400">No inspection data yet.</p>
                )}
              </Card>
            </div>
          </div>

          <div
            className={cn(
              "mt-6 grid gap-4 sm:grid-cols-3 transition-all duration-300",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            )}
            style={{ transitionDelay: "400ms" }}
          >
            {quickLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between rounded-lg border border-border bg-surface p-5 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
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
