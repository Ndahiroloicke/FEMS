"use client";

import { useEffect, useState } from "react";
import {
  PageHeader,
  Card,
  Button,
  Select,
  Alert,
  EmptyState,
} from "@/components/ui/primitives";
import { StatusBadge } from "@/components/ui/status-badge";
import { ReportToPoliceModal } from "@/components/escalations/report-to-police-modal";
import { api, type Escalation, type EscalationStatus } from "@/lib/api";
import { formatDate, formatDateTime } from "@/lib/utils";

export default function EscalationsPage() {
  const [escalations, setEscalations] = useState<Escalation[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [reportTarget, setReportTarget] = useState<Escalation | null>(null);
  const [reportNotes, setReportNotes] = useState("");
  const [submittingReport, setSubmittingReport] = useState(false);

  async function load(status?: string) {
    setLoading(true);
    setError("");
    try {
      setEscalations(await api.escalations.list(status || undefined));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load escalations");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openReportModal(escalation: Escalation) {
    setReportTarget(escalation);
    setReportNotes("");
    setSuccess("");
  }

  function closeReportModal() {
    if (submittingReport) return;
    setReportTarget(null);
    setReportNotes("");
  }

  async function confirmReportToPolice() {
    if (!reportTarget) return;
    setSubmittingReport(true);
    setError("");
    setSuccess("");
    try {
      await api.escalations.reportToPolice(
        reportTarget.id,
        reportNotes.trim() || undefined,
      );
      setReportTarget(null);
      setReportNotes("");
      setSuccess(
        `Case for ${reportTarget.customer?.fullName} marked as reported to police.`,
      );
      await load(statusFilter || undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update escalation");
    } finally {
      setSubmittingReport(false);
    }
  }

  async function handleResolve(id: string) {
    setError("");
    setSuccess("");
    try {
      await api.escalations.update(id, { status: "RESOLVED" });
      setSuccess("Escalation marked as resolved.");
      await load(statusFilter || undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resolve escalation");
    }
  }

  return (
    <>
      <PageHeader
        title="Police Escalations"
        description="Cases where expired extinguishers were not returned by customers"
      />

      {error && <Alert message={error} />}
      {success && <Alert message={success} type="success" />}

      <Card>
        <div className="border-b border-border px-6 py-4">
          <Select
            value={statusFilter}
            onChange={async (e) => {
              setStatusFilter(e.target.value);
              await load(e.target.value || undefined);
            }}
          >
            <option value="">All statuses</option>
            {(["PENDING", "REPORTED", "RESOLVED"] as EscalationStatus[]).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>

        {loading ? (
          <p className="px-6 py-8 text-sm text-muted">Loading escalations...</p>
        ) : escalations.length === 0 ? (
          <EmptyState message="No escalation cases. These are created when delivered extinguishers pass expiry without being returned." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-slate-50 text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Extinguisher</th>
                  <th className="px-6 py-3 font-medium">Reason</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Reported</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {escalations.map((esc) => (
                  <tr key={esc.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{esc.customer?.fullName}</p>
                      <p className="text-xs text-muted">{esc.customer?.nationalId}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p>{esc.extinguisher?.serialNumber}</p>
                      <p className="text-xs text-muted">
                        Expired{" "}
                        {esc.extinguisher?.expiryDate
                          ? formatDate(esc.extinguisher.expiryDate)
                          : "—"}
                      </p>
                    </td>
                    <td className="max-w-xs px-6 py-4 text-muted">{esc.reason}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={esc.status} kind="escalation" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted">
                      {esc.reportedAt ? formatDateTime(esc.reportedAt) : "—"}
                      {esc.notes && (
                        <p className="mt-1 max-w-[180px] truncate text-xs" title={esc.notes}>
                          {esc.notes}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {esc.status === "PENDING" && (
                          <Button
                            variant="danger"
                            className="px-2 py-1 text-xs"
                            onClick={() => openReportModal(esc)}
                          >
                            Report to police
                          </Button>
                        )}
                        {esc.status !== "RESOLVED" && (
                          <Button
                            variant="secondary"
                            className="px-2 py-1 text-xs"
                            onClick={() => handleResolve(esc.id)}
                          >
                            Mark resolved
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

      <ReportToPoliceModal
        escalation={reportTarget}
        open={reportTarget !== null}
        notes={reportNotes}
        submitting={submittingReport}
        onNotesChange={setReportNotes}
        onClose={closeReportModal}
        onConfirm={confirmReportToPolice}
      />
    </>
  );
}
