import { format, parseISO } from "date-fns";

export function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  try {
    return format(parseISO(value), "dd MMM yyyy");
  } catch {
    return "—";
  }
}

export function formatDateTime(value: string | null | undefined) {
  if (!value) return "—";
  try {
    return format(parseISO(value), "dd MMM yyyy, HH:mm");
  } catch {
    return "—";
  }
}

/** Convert an ISO date string into a value usable by <input type="datetime-local">. */
export function toDateTimeLocal(value: string | null | undefined) {
  if (!value) return "";
  try {
    return format(parseISO(value), "yyyy-MM-dd'T'HH:mm");
  } catch {
    return "";
  }
}

/** Convert an ISO date string into a value usable by <input type="date">. */
export function toDateInput(value: string | null | undefined) {
  if (!value) return "";
  try {
    return format(parseISO(value), "yyyy-MM-dd");
  } catch {
    return "";
  }
}

/** Turn an enum-like value (SOME_VALUE) into a friendly label (Some value). */
export function formatEnum(value: string | null | undefined) {
  if (!value) return "—";
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function initials(firstName?: string, lastName?: string) {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "?";
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
