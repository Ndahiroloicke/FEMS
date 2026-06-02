import { cn } from "@/lib/utils";
import type { EscalationStatus, ExtinguisherStatus } from "@/lib/api";

const extinguisherStyles: Record<ExtinguisherStatus, string> = {
  ACTIVE: "bg-blue-50 text-blue-800 border-blue-200",
  DELIVERED: "bg-amber-50 text-amber-800 border-amber-200",
  RETURNED: "bg-green-50 text-green-800 border-green-200",
  EXPIRED: "bg-red-50 text-red-800 border-red-200",
};

const escalationStyles: Record<EscalationStatus, string> = {
  PENDING: "bg-amber-50 text-amber-800 border-amber-200",
  REPORTED: "bg-red-50 text-red-800 border-red-200",
  RESOLVED: "bg-green-50 text-green-800 border-green-200",
};

export function StatusBadge({
  status,
  kind = "extinguisher",
}: {
  status: string;
  kind?: "extinguisher" | "escalation";
}) {
  const styles =
    kind === "escalation"
      ? escalationStyles[status as EscalationStatus]
      : extinguisherStyles[status as ExtinguisherStatus];

  return (
    <span
      className={cn(
        "inline-flex rounded border px-2 py-0.5 text-xs font-medium",
        styles ?? "bg-slate-50 text-slate-700 border-slate-200",
      )}
    >
      {status.replace("_", " ")}
    </span>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: number | string;
  hint?: string;
  tone?: "default" | "warning" | "danger";
}) {
  const toneStyles = {
    default: "text-slate-900",
    warning: "text-amber-700",
    danger: "text-red-700",
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className={cn("mt-2 text-3xl font-semibold tracking-tight", toneStyles[tone])}>
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
