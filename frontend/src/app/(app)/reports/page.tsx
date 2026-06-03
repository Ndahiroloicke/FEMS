"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";
import {
  PageHeader,
  Card,
  Button,
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/ui/primitives";
import { StatCard, StatusBadge } from "@/components/ui/status-badge";
import { Pagination } from "@/components/ui/pagination";
import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import {
  api,
  ApiError,
  downloadFile,
  type FireExtinguisher,
  type InspectionStatusReport,
  type MaintenanceLog,
  type PageMeta,
  type ReportSummary,
} from "@/lib/api";
import { formatDate, formatEnum } from "@/lib/utils";

const PAGE_SIZE = 10;

type ReportType = "extinguishers" | "inspections" | "maintenance" | "expired";

const exportReports: { key: ReportType; label: string }[] = [
  { key: "extinguishers", label: "Extinguishers" },
  { key: "inspections", label: "Inspections" },
  { key: "maintenance", label: "Maintenance" },
  { key: "expired", label: "Expired" },
];

export default function ReportsPage() {
  const { role } = useAuth();
  const isUser = role === "USER";
  const toast = useToast();

  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [inspectionStatus, setInspectionStatus] = useState<InspectionStatusReport | null>(null);
  const [topLoading, setTopLoading] = useState(true);
  const [topError, setTopError] = useState("");

  const [expired, setExpired] = useState<FireExtinguisher[]>([]);
  const [expiredMeta, setExpiredMeta] = useState<PageMeta | null>(null);
  const [expiredPage, setExpiredPage] = useState(1);
  const [expiredLoading, setExpiredLoading] = useState(true);

  const [history, setHistory] = useState<MaintenanceLog[]>([]);
  const [historyMeta, setHistoryMeta] = useState<PageMeta | null>(null);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyLoading, setHistoryLoading] = useState(true);

  const [downloading, setDownloading] = useState<string | null>(null);

  const loadTop = useCallback(async () => {
    setTopLoading(true);
    setTopError("");
    try {
      const [s, i] = await Promise.all([
        api.reports.summary(),
        api.reports.inspectionStatus(),
      ]);
      setSummary(s);
      setInspectionStatus(i);
    } catch (err) {
      setTopError(err instanceof Error ? err.message : "Failed to load reports");
    } finally {
      setTopLoading(false);
    }
  }, []);

  const loadExpired = useCallback(async () => {
    setExpiredLoading(true);
    try {
      const res = await api.reports.expired({ page: expiredPage, limit: PAGE_SIZE });
      setExpired(res.data);
      setExpiredMeta(res.meta);
    } catch {
      /* surfaced via section empty state */
    } finally {
      setExpiredLoading(false);
    }
  }, [expiredPage]);

  const loadHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const res = await api.reports.maintenanceHistory({
        page: historyPage,
        limit: PAGE_SIZE,
      });
      setHistory(res.data);
      setHistoryMeta(res.meta);
    } catch {
      /* surfaced via section empty state */
    } finally {
      setHistoryLoading(false);
    }
  }, [historyPage]);

  useEffect(() => {
    loadTop();
  }, [loadTop]);
  useEffect(() => {
    loadExpired();
  }, [loadExpired]);
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  async function handleExport(report: ReportType, format: "csv" | "pdf") {
    const key = `${report}-${format}`;
    setDownloading(key);
    try {
      await downloadFile(
        `/reports/export?report=${report}&format=${format}`,
        `${report}-report.${format}`,
      );
      toast.success(`${formatEnum(report)} ${format.toUpperCase()} downloaded`);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Export failed");
    } finally {
      setDownloading(null);
    }
  }

  return (
    <>
      <PageHeader
        title={isUser ? "My Reports" : "Reports"}
        description={
          isUser
            ? "Summaries and records for your assigned extinguishers only"
            : "Summaries, exports, and compliance records"
        }
      />

      {/* Summary */}
      {topLoading ? (
        <LoadingState message="Loading reports…" />
      ) : topError ? (
        <ErrorState message={topError} onRetry={loadTop} />
      ) : (
        <>
          {summary && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Total extinguishers" value={summary.totalExtinguishers} />
              <StatCard label="Active inspections" value={summary.activeInspections} />
              <StatCard
                label="Expired"
                value={summary.expiredCount}
                tone={summary.expiredCount > 0 ? "danger" : "default"}
              />
              <StatCard label="Registered this year" value={summary.registeredThisYear} />
            </div>
          )}

          {inspectionStatus && (
            <Card className="mt-6">
              <div className="border-b border-border px-6 py-4">
                <h2 className="text-sm font-semibold text-slate-900">Inspection status</h2>
              </div>
              <div className="flex flex-wrap gap-6 px-6 py-5">
                {Object.entries(inspectionStatus.byStatus ?? {}).length === 0 ? (
                  <p className="text-sm text-muted">No inspection data.</p>
                ) : (
                  Object.entries(inspectionStatus.byStatus).map(([status, count]) => (
                    <div key={status} className="flex items-center gap-3">
                      <StatusBadge status={status} kind="inspection" />
                      <span className="text-lg font-semibold text-slate-900">{count}</span>
                    </div>
                  ))
                )}
              </div>
            </Card>
          )}
        </>
      )}

      {/* Exports */}
      <Card className="mt-6">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-sm font-semibold text-slate-900">Export reports</h2>
          <p className="mt-0.5 text-xs text-muted">Download records as CSV or PDF.</p>
        </div>
        <div className="grid gap-4 px-6 py-5 sm:grid-cols-2 lg:grid-cols-4">
          {exportReports.map(({ key, label }) => (
            <div key={key} className="rounded-lg border border-border p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-800">
                <FileText className="h-4 w-4 text-slate-400" />
                {label}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="flex-1 px-2 py-1.5 text-xs"
                  loading={downloading === `${key}-csv`}
                  onClick={() => handleExport(key, "csv")}
                >
                  <Download className="h-3.5 w-3.5" />
                  CSV
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1 px-2 py-1.5 text-xs"
                  loading={downloading === `${key}-pdf`}
                  onClick={() => handleExport(key, "pdf")}
                >
                  <Download className="h-3.5 w-3.5" />
                  PDF
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Expired list */}
      <Card className="mt-6">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-sm font-semibold text-slate-900">Expired extinguishers</h2>
        </div>
        {expiredLoading ? (
          <LoadingState />
        ) : expired.length === 0 ? (
          <EmptyState
            title="None expired"
            message={
              isUser
                ? "None of your assigned extinguishers are expired."
                : "No expired extinguishers on record."
            }
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-slate-50 text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-6 py-3 font-medium">Serial</th>
                    <th className="px-6 py-3 font-medium">Location</th>
                    <th className="px-6 py-3 font-medium">Type</th>
                    <th className="px-6 py-3 font-medium">Expired on</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {expired.map((ext) => (
                    <tr key={ext.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-900">{ext.serialNumber}</td>
                      <td className="px-6 py-4">{ext.location}</td>
                      <td className="px-6 py-4 text-muted">{formatEnum(ext.type)}</td>
                      <td className="px-6 py-4 text-muted">{formatDate(ext.expiryDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination meta={expiredMeta} onPageChange={setExpiredPage} />
          </>
        )}
      </Card>

      {/* Maintenance history */}
      <Card className="mt-6">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-sm font-semibold text-slate-900">Maintenance history</h2>
        </div>
        {historyLoading ? (
          <LoadingState />
        ) : history.length === 0 ? (
          <EmptyState
            title="No history"
            message={
              isUser
                ? "No maintenance records for your assigned extinguishers."
                : "No maintenance records found."
            }
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
                  {history.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {log.extinguisher?.serialNumber ?? "—"}
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
            <Pagination meta={historyMeta} onPageChange={setHistoryPage} />
          </>
        )}
      </Card>
    </>
  );
}
