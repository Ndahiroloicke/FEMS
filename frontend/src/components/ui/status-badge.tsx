import { cn } from "@/lib/utils";
import { formatEnum } from "@/lib/utils";
import type {
  ExtinguisherStatus,
  InspectionStatus,
  MaintenanceCondition,
} from "@/lib/api";

const extinguisherStyles: Record<ExtinguisherStatus, string> = {
  ACTIVE: "bg-green-50 text-green-800 border-green-200",
  EXPIRED: "bg-red-50 text-red-800 border-red-200",
  NEEDS_MAINTENANCE: "bg-amber-50 text-amber-800 border-amber-200",
  OUT_OF_SERVICE: "bg-slate-100 text-slate-700 border-slate-200",
};

const inspectionStyles: Record<InspectionStatus, string> = {
  PENDING: "bg-amber-50 text-amber-800 border-amber-200",
  SCHEDULED: "bg-blue-50 text-blue-800 border-blue-200",
  IN_PROGRESS: "bg-blue-50 text-blue-800 border-blue-200",
  COMPLETED: "bg-green-50 text-green-800 border-green-200",
  CANCELLED: "bg-slate-100 text-slate-600 border-slate-200",
  OVERDUE: "bg-red-50 text-red-800 border-red-200",
};

const conditionStyles: Record<MaintenanceCondition, string> = {
  GOOD: "bg-green-50 text-green-800 border-green-200",
  FAIR: "bg-blue-50 text-blue-800 border-blue-200",
  POOR: "bg-amber-50 text-amber-800 border-amber-200",
  DAMAGED: "bg-red-50 text-red-800 border-red-200",
  NEEDS_REPLACEMENT: "bg-red-50 text-red-800 border-red-200",
};

const roleStyles: Record<string, string> = {
  ADMIN: "bg-slate-900 text-white border-slate-900",
  INSPECTOR: "bg-blue-50 text-blue-800 border-blue-200",
  USER: "bg-slate-100 text-slate-700 border-slate-200",
};

type BadgeKind = "extinguisher" | "inspection" | "condition" | "role" | "result";

export function StatusBadge({
  status,
  kind = "extinguisher",
}: {
  status: string;
  kind?: BadgeKind;
}) {
  let styles: string | undefined;
  switch (kind) {
    case "inspection":
      styles = inspectionStyles[status as InspectionStatus];
      break;
    case "condition":
      styles = conditionStyles[status as MaintenanceCondition];
      break;
    case "role":
      styles = roleStyles[status];
      break;
    case "result":
      styles =
        status === "PASS"
          ? "bg-green-50 text-green-800 border-green-200"
          : status === "FAIL"
            ? "bg-red-50 text-red-800 border-red-200"
            : "bg-amber-50 text-amber-800 border-amber-200";
      break;
    default:
      styles = extinguisherStyles[status as ExtinguisherStatus];
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles ?? "bg-slate-50 text-slate-700 border-slate-200",
      )}
    >
      {formatEnum(status)}
    </span>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
  icon,
}: {
  label: string;
  value: number | string;
  hint?: string;
  tone?: "default" | "warning" | "danger" | "success";
  icon?: React.ReactNode;
}) {
  const toneStyles = {
    default: "text-slate-900",
    warning: "text-amber-700",
    danger: "text-red-700",
    success: "text-green-700",
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted">{label}</p>
        {icon && <span className="text-slate-400">{icon}</span>}
      </div>
      <p className={cn("mt-2 text-3xl font-semibold tracking-tight", toneStyles[tone])}>
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
