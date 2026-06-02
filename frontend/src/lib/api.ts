const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      message = body.message ?? body.error ?? message;
      if (Array.isArray(message)) message = message.join(", ");
    } catch {
      // ignore parse errors
    }
    throw new ApiError(message, response.status);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const api = {
  dashboard: {
    summary: () => request<DashboardSummary>("/dashboard/summary"),
  },
  customers: {
    list: (search?: string) =>
      request<Customer[]>(`/customers${search ? `?search=${encodeURIComponent(search)}` : ""}`),
    get: (id: string) => request<CustomerDetail>(`/customers/${id}`),
    create: (data: CreateCustomerInput) =>
      request<Customer>("/customers", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: Partial<CreateCustomerInput>) =>
      request<Customer>(`/customers/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/customers/${id}`, { method: "DELETE" }),
  },
  extinguishers: {
    list: (params?: { status?: string; customerId?: string; expiringWithinDays?: number }) => {
      const query = new URLSearchParams();
      if (params?.status) query.set("status", params.status);
      if (params?.customerId) query.set("customerId", params.customerId);
      if (params?.expiringWithinDays)
        query.set("expiringWithinDays", String(params.expiringWithinDays));
      const qs = query.toString();
      return request<Extinguisher[]>(`/extinguishers${qs ? `?${qs}` : ""}`);
    },
    get: (id: string) => request<ExtinguisherDetail>(`/extinguishers/${id}`),
    create: (data: CreateExtinguisherInput) =>
      request<Extinguisher>("/extinguishers", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: Partial<CreateExtinguisherInput>) =>
      request<Extinguisher>(`/extinguishers/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
    deliver: (id: string) =>
      request<Extinguisher>(`/extinguishers/${id}/deliver`, { method: "POST" }),
    return: (id: string) =>
      request<Extinguisher>(`/extinguishers/${id}/return`, { method: "POST" }),
    delete: (id: string) => request<void>(`/extinguishers/${id}`, { method: "DELETE" }),
  },
  notifications: {
    list: (customerId?: string) =>
      request<Notification[]>(
        `/notifications${customerId ? `?customerId=${customerId}` : ""}`,
      ),
  },
  escalations: {
    list: (status?: string) =>
      request<Escalation[]>(`/escalations${status ? `?status=${status}` : ""}`),
    reportToPolice: (id: string, notes?: string) =>
      request<Escalation>(`/escalations/${id}/report-to-police`, {
        method: "POST",
        body: JSON.stringify({ notes }),
      }),
    update: (id: string, data: { status?: string; notes?: string }) =>
      request<Escalation>(`/escalations/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
  },
  compliance: {
    runChecks: () =>
      request<{ warnings: { processed: number }; escalations: { processed: number } }>(
        "/compliance/run-checks",
        { method: "POST" },
      ),
  },
};

export type ExtinguisherStatus = "ACTIVE" | "DELIVERED" | "RETURNED" | "EXPIRED";
export type EscalationStatus = "PENDING" | "REPORTED" | "RESOLVED";
export type NotificationType = "EXPIRY_WARNING" | "POLICE_ESCALATION";

export interface Customer {
  id: string;
  fullName: string;
  nationalId: string;
  email: string | null;
  phone: string;
  address: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: { extinguishers: number };
}

export interface CustomerDetail extends Omit<Customer, "_count"> {
  extinguishers: Extinguisher[];
  _count?: { notifications: number; escalations: number };
}

export interface CreateCustomerInput {
  fullName: string;
  nationalId: string;
  email?: string;
  phone: string;
  address?: string;
}

export interface Extinguisher {
  id: string;
  serialNumber: string;
  type: string | null;
  capacity: string | null;
  purchaseDate: string;
  expiryDate: string;
  status: ExtinguisherStatus;
  customerId: string;
  customer?: Pick<Customer, "id" | "fullName" | "nationalId" | "phone">;
  createdAt: string;
  updatedAt: string;
}

export interface ExtinguisherDetail extends Extinguisher {
  customer: Customer;
  notifications: Notification[];
  escalations: Escalation[];
}

export interface CreateExtinguisherInput {
  serialNumber: string;
  customerId: string;
  purchaseDate: string;
  expiryDate: string;
  type?: string;
  capacity?: string;
  status?: ExtinguisherStatus;
}

export interface Notification {
  id: string;
  type: NotificationType;
  channel: string;
  message: string;
  sentAt: string;
  customerId: string;
  extinguisherId: string;
  customer?: Pick<Customer, "fullName" | "phone" | "email">;
  extinguisher?: Pick<Extinguisher, "serialNumber" | "expiryDate">;
}

export interface Escalation {
  id: string;
  reason: string;
  status: EscalationStatus;
  reportedAt: string | null;
  resolvedAt: string | null;
  notes: string | null;
  customerId: string;
  extinguisherId: string;
  createdAt: string;
  updatedAt: string;
  customer?: Pick<Customer, "fullName" | "nationalId" | "phone">;
  extinguisher?: Pick<Extinguisher, "serialNumber" | "expiryDate">;
}

export interface DashboardSummary {
  totalCustomers: number;
  totalExtinguishers: number;
  activeExtinguishers: number;
  deliveredExtinguishers: number;
  expiringSoon: number;
  expiredNotReturned: number;
  pendingEscalations: number;
  recentNotifications: Notification[];
}
