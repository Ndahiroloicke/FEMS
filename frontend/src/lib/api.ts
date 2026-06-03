const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export const TOKEN_KEY = "fems_token";
export const USER_KEY = "fems_user";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/* ------------------------------------------------------------------ */
/* Token / user storage helpers                                        */
/* ------------------------------------------------------------------ */

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function setStoredUser(user: User) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}

/* ------------------------------------------------------------------ */
/* Core request helper                                                 */
/* ------------------------------------------------------------------ */

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const method = options?.method ?? "GET";
  const hasBody = options?.body !== undefined && options?.body !== null;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options?.headers as Record<string, string> | undefined),
  };

  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let body = options?.body;
  if ((method === "POST" || method === "PATCH" || method === "PUT") && !hasBody) {
    body = "{}";
    headers["Content-Type"] = "application/json";
  } else if (hasBody) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    method,
    body,
    headers,
    cache: "no-store",
  });

  if (response.status === 401) {
    clearAuth();
    if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
      window.location.href = "/login";
    }
    throw new ApiError("Your session has expired. Please sign in again.", 401);
  }

  const text = await response.text();

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      if (text) {
        const parsed = JSON.parse(text) as {
          message?: string | string[];
          error?: string;
        };
        const raw = parsed.message ?? parsed.error ?? message;
        message = Array.isArray(raw) ? raw.join(", ") : String(raw);
      }
    } catch {
      if (text) message = text.slice(0, 200);
    }
    throw new ApiError(message, response.status);
  }

  if (response.status === 204 || !text.trim()) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}

function buildQuery(params?: Record<string, string | number | boolean | undefined>): string {
  if (!params) return "";
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "" && value !== null) {
      query.set(key, String(value));
    }
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

/* ------------------------------------------------------------------ */
/* File download helper (report exports)                               */
/* ------------------------------------------------------------------ */

export async function downloadFile(path: string, fallbackName = "report"): Promise<void> {
  const token = getToken();
  const response = await fetch(`${API_BASE}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store",
  });

  if (response.status === 401) {
    clearAuth();
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new ApiError("Your session has expired. Please sign in again.", 401);
  }

  if (!response.ok) {
    let message = `Download failed (${response.status})`;
    try {
      const parsed = (await response.json()) as { message?: string | string[]; error?: string };
      const raw = parsed.message ?? parsed.error ?? message;
      message = Array.isArray(raw) ? raw.join(", ") : String(raw);
    } catch {
      /* keep default message */
    }
    throw new ApiError(message, response.status);
  }

  const disposition = response.headers.get("Content-Disposition") ?? "";
  const match = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(disposition);
  const filename = match ? decodeURIComponent(match[1]) : fallbackName;

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

/* ------------------------------------------------------------------ */
/* Types & enums                                                       */
/* ------------------------------------------------------------------ */

export type Role = "ADMIN" | "INSPECTOR" | "USER";

export const ROLES: Role[] = ["ADMIN", "INSPECTOR", "USER"];

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type ExtinguisherType = "WATER" | "CO2" | "FOAM" | "DRY_CHEMICAL";
export const EXTINGUISHER_TYPES: ExtinguisherType[] = ["WATER", "CO2", "FOAM", "DRY_CHEMICAL"];

export type ExtinguisherSize = "2.5lbs" | "5lbs" | "9lbs" | "12lbs";
export const EXTINGUISHER_SIZES: ExtinguisherSize[] = ["2.5lbs", "5lbs", "9lbs", "12lbs"];

export type ExtinguisherStatus =
  | "ACTIVE"
  | "EXPIRED"
  | "NEEDS_MAINTENANCE"
  | "OUT_OF_SERVICE";
export const EXTINGUISHER_STATUSES: ExtinguisherStatus[] = [
  "ACTIVE",
  "EXPIRED",
  "NEEDS_MAINTENANCE",
  "OUT_OF_SERVICE",
];

export interface FireExtinguisher {
  id: string;
  serialNumber: string;
  location: string;
  type: ExtinguisherType;
  size: string;
  installationDate: string;
  expiryDate: string;
  status: ExtinguisherStatus;
  ownerId?: string | null;
  owner?: Pick<User, "id" | "firstName" | "lastName" | "email"> | null;
  createdAt: string;
  updatedAt: string;
}

export interface FireExtinguisherDetail extends FireExtinguisher {
  inspections?: Inspection[];
  maintenanceLogs?: MaintenanceLog[];
}

export type InspectionStatus =
  | "PENDING"
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "OVERDUE";
export const INSPECTION_STATUSES: InspectionStatus[] = [
  "PENDING",
  "SCHEDULED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "OVERDUE",
];

export type InspectionResult = "PASS" | "FAIL" | "PASS_WITH_NOTES";
export const INSPECTION_RESULTS: InspectionResult[] = ["PASS", "FAIL", "PASS_WITH_NOTES"];

export interface Inspection {
  id: string;
  extinguisherId: string;
  scheduledAt: string;
  completedAt: string | null;
  status: InspectionStatus;
  result: InspectionResult | null;
  notes: string | null;
  inspectorId: string | null;
  scheduledBy?: Pick<User, "id" | "firstName" | "lastName" | "email"> | null;
  inspector?: Pick<User, "id" | "firstName" | "lastName" | "email"> | null;
  extinguisher?: Pick<FireExtinguisher, "id" | "serialNumber" | "location" | "type"> | null;
  createdAt: string;
  updatedAt: string;
}

export type MaintenanceCondition =
  | "GOOD"
  | "FAIR"
  | "POOR"
  | "DAMAGED"
  | "NEEDS_REPLACEMENT";
export const MAINTENANCE_CONDITIONS: MaintenanceCondition[] = [
  "GOOD",
  "FAIR",
  "POOR",
  "DAMAGED",
  "NEEDS_REPLACEMENT",
];

export interface MaintenanceLog {
  id: string;
  extinguisherId: string;
  actionsTaken: string;
  actionDate: string;
  conditionNoted: MaintenanceCondition;
  inspectionId: string | null;
  extinguisher?: Pick<FireExtinguisher, "id" | "serialNumber" | "location"> | null;
  createdAt: string;
  updatedAt?: string;
}

export interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  type?: string;
  extinguisherId?: string | null;
  createdAt: string;
}

export interface PageMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Page<T> {
  data: T[];
  meta: PageMeta;
}

export interface ReportSummary {
  totalExtinguishers: number;
  byStatus: Record<string, number>;
  byType: Record<string, number>;
  registeredToday: number;
  registeredThisMonth: number;
  registeredThisYear: number;
  activeInspections: number;
  expiredCount: number;
}

export interface StockReportPoint {
  period: string;
  count: number;
}

export interface InspectionStatusReport {
  byStatus: Record<string, number>;
  total?: number;
}

/* ------------------------------------------------------------------ */
/* Input payload types                                                 */
/* ------------------------------------------------------------------ */

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface CreateExtinguisherInput {
  serialNumber: string;
  location: string;
  type: ExtinguisherType;
  size: string;
  installationDate: string;
  expiryDate: string;
  status?: ExtinguisherStatus;
}

export interface CreateInspectionInput {
  extinguisherId: string;
  scheduledAt: string;
  inspectorId?: string;
  notes?: string;
}

export interface UpdateInspectionInput {
  status?: InspectionStatus;
  result?: InspectionResult;
  notes?: string;
  inspectorId?: string;
}

export interface CreateMaintenanceInput {
  extinguisherId: string;
  actionsTaken: string;
  actionDate: string;
  conditionNoted: MaintenanceCondition;
  inspectionId?: string;
}

/* ------------------------------------------------------------------ */
/* API surface                                                         */
/* ------------------------------------------------------------------ */

export const api = {
  auth: {
    register: (data: RegisterInput) =>
      request<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify(data) }),
    login: (data: LoginInput) =>
      request<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify(data) }),
    logout: () => request<void>("/auth/logout", { method: "POST" }),
    forgotPassword: (email: string) =>
      request<{ message?: string }>("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
    resetPassword: (token: string, newPassword: string) =>
      request<{ message?: string }>("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, newPassword }),
      }),
  },

  users: {
    me: () => request<User>("/users/me"),
    updateMe: (data: { firstName?: string; lastName?: string; email?: string }) =>
      request<User>("/users/me", { method: "PATCH", body: JSON.stringify(data) }),
    changePassword: (data: { currentPassword: string; newPassword: string }) =>
      request<{ message?: string }>("/users/me/password", {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    list: (params?: { page?: number; limit?: number; role?: Role | ""; search?: string }) =>
      request<Page<User>>(`/users${buildQuery(params)}`),
    setRole: (id: string, role: Role) =>
      request<User>(`/users/${id}/role`, { method: "PATCH", body: JSON.stringify({ role }) }),
    setStatus: (id: string, isActive: boolean) =>
      request<User>(`/users/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ isActive }),
      }),
    delete: (id: string) => request<void>(`/users/${id}`, { method: "DELETE" }),
  },

  extinguishers: {
    create: (data: CreateExtinguisherInput) =>
      request<FireExtinguisher>("/extinguishers", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    list: (params?: {
      page?: number;
      limit?: number;
      status?: ExtinguisherStatus | "";
      type?: ExtinguisherType | "";
      search?: string;
    }) => request<Page<FireExtinguisher>>(`/extinguishers${buildQuery(params)}`),
    get: (id: string) => request<FireExtinguisherDetail>(`/extinguishers/${id}`),
    update: (id: string, data: Partial<CreateExtinguisherInput>) =>
      request<FireExtinguisher>(`/extinguishers/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    assign: (id: string, data: { ownerId: string | null }) =>
      request<FireExtinguisher>(`/extinguishers/${id}/assign`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    delete: (id: string) => request<void>(`/extinguishers/${id}`, { method: "DELETE" }),
  },

  inspections: {
    create: (data: CreateInspectionInput) =>
      request<Inspection>("/inspections", { method: "POST", body: JSON.stringify(data) }),
    list: (params?: {
      page?: number;
      limit?: number;
      status?: InspectionStatus | "";
      extinguisherId?: string;
      inspectorId?: string;
    }) => request<Page<Inspection>>(`/inspections${buildQuery(params)}`),
    get: (id: string) => request<Inspection>(`/inspections/${id}`),
    update: (id: string, data: UpdateInspectionInput) =>
      request<Inspection>(`/inspections/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    delete: (id: string) => request<void>(`/inspections/${id}`, { method: "DELETE" }),
  },

  maintenance: {
    create: (data: CreateMaintenanceInput) =>
      request<MaintenanceLog>("/maintenance", { method: "POST", body: JSON.stringify(data) }),
    list: (params?: { page?: number; limit?: number; extinguisherId?: string }) =>
      request<Page<MaintenanceLog>>(`/maintenance${buildQuery(params)}`),
    get: (id: string) => request<MaintenanceLog>(`/maintenance/${id}`),
  },

  reports: {
    summary: () => request<ReportSummary>("/reports/summary"),
    stock: (period: "daily" | "monthly" | "yearly" = "monthly") =>
      request<StockReportPoint[]>(`/reports/stock${buildQuery({ period })}`),
    inspectionStatus: () => request<InspectionStatusReport>("/reports/inspection-status"),
    expired: (params?: { page?: number; limit?: number }) =>
      request<Page<FireExtinguisher>>(`/reports/expired${buildQuery(params)}`),
    maintenanceHistory: (params?: {
      extinguisherId?: string;
      page?: number;
      limit?: number;
    }) => request<Page<MaintenanceLog>>(`/reports/maintenance-history${buildQuery(params)}`),
    export: (params: { report: "extinguishers" | "inspections" | "maintenance" | "expired"; format: "csv" | "pdf" }) =>
      downloadFile(`/reports/export${buildQuery(params)}`, `${params.report}-report.${params.format}`),
  },

  notifications: {
    list: (params?: { page?: number; limit?: number; isRead?: boolean }) =>
      request<Page<Notification>>(`/notifications${buildQuery(params)}`),
    markRead: (id: string) =>
      request<Notification>(`/notifications/${id}/read`, { method: "PATCH" }),
    markAllRead: () => request<void>("/notifications/read-all", { method: "PATCH" }),
  },
};
