"use client";

import { ShieldAlert } from "lucide-react";
import type { Escalation } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { Modal, Textarea, Button } from "@/components/ui/modal";

export function ReportToPoliceModal({
  escalation,
  open,
  notes,
  submitting,
  onNotesChange,
  onClose,
  onConfirm,
}: {
  escalation: Escalation | null;
  open: boolean;
  notes: string;
  submitting: boolean;
  onNotesChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!escalation) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Report to police"
      description="Record that this case has been escalated to law enforcement."
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={submitting}>
            {submitting ? "Submitting..." : "Confirm police report"}
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3">
          <div className="flex gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
            <div className="text-sm text-amber-900">
              <p className="font-medium">What this action does</p>
              <p className="mt-1 text-amber-800/90">
                This marks the escalation as reported in the system, saves the timestamp and your
                notes, and logs an internal notification. Staff use this record to track that police
                were informed — the app does not automatically contact police on your behalf.
              </p>
            </div>
          </div>
        </div>

        <dl className="grid gap-3 rounded-md border border-border bg-slate-50 p-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">Customer</dt>
            <dd className="mt-1 font-medium text-slate-900">{escalation.customer?.fullName}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">National ID</dt>
            <dd className="mt-1 text-slate-900">{escalation.customer?.nationalId}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">Phone</dt>
            <dd className="mt-1 text-slate-900">{escalation.customer?.phone ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">Extinguisher</dt>
            <dd className="mt-1 font-medium text-slate-900">
              {escalation.extinguisher?.serialNumber}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">Expiry date</dt>
            <dd className="mt-1 text-slate-900">
              {escalation.extinguisher?.expiryDate
                ? formatDate(escalation.extinguisher.expiryDate)
                : "—"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">Case reason</dt>
            <dd className="mt-1 text-slate-700">{escalation.reason}</dd>
          </div>
        </dl>

        <Textarea
          label="Staff notes (optional)"
          hint="e.g. police station contacted, officer name, reference number, or follow-up details."
          placeholder="Officer contacted at Kigali Central Station, ref #12345..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
        />
      </div>
    </Modal>
  );
}
