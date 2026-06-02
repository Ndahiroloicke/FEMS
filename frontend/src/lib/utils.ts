import { format, parseISO } from "date-fns";

export function formatDate(value: string) {
  return format(parseISO(value), "dd MMM yyyy");
}

export function formatDateTime(value: string) {
  return format(parseISO(value), "dd MMM yyyy, HH:mm");
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
