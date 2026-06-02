import Constants from 'expo-constants';

// Android emulator: use 10.0.2.2 | Physical device: use your PC LAN IP
const API_BASE =
  process.env.EXPO_PUBLIC_API_URL ??
  Constants.expoConfig?.extra?.apiUrl ??
  'http://localhost:3001/api';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      message = body.message ?? body.error ?? message;
      if (Array.isArray(message)) message = message.join(', ');
    } catch {
      // ignore
    }
    throw new ApiError(message, response.status);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const api = {
  dashboard: {
    summary: () => request<DashboardSummary>('/dashboard/summary'),
  },
  customers: {
    list: (search?: string) =>
      request<Customer[]>(
        `/customers${search ? `?search=${encodeURIComponent(search)}` : ''}`,
      ),
    create: (data: CreateCustomerInput) =>
      request<Customer>('/customers', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      request<void>(`/customers/${id}`, { method: 'DELETE' }),
  },
  extinguishers: {
    list: (params?: { status?: string }) => {
      const query = new URLSearchParams();
      if (params?.status) query.set('status', params.status);
      const qs = query.toString();
      return request<Extinguisher[]>(`/extinguishers${qs ? `?${qs}` : ''}`);
    },
    create: (data: CreateExtinguisherInput) =>
      request<Extinguisher>('/extinguishers', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    deliver: (id: string) =>
      request<Extinguisher>(`/extinguishers/${id}/deliver`, {
        method: 'POST',
      }),
    return: (id: string) =>
      request<Extinguisher>(`/extinguishers/${id}/return`, { method: 'POST' }),
  },
  notifications: {
    list: () => request<Notification[]>('/notifications'),
  },
  escalations: {
    list: (status?: string) =>
      request<Escalation[]>(`/escalations${status ? `?status=${status}` : ''}`),
    reportToPolice: (id: string, notes?: string) =>
      request<Escalation>(`/escalations/${id}/report-to-police`, {
        method: 'POST',
        body: JSON.stringify({ notes }),
      }),
    update: (id: string, data: { status?: string; notes?: string }) =>
      request<Escalation>(`/escalations/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
  },
  compliance: {
    runChecks: () =>
      request<{ warnings: { processed: number }; escalations: { processed: number } }>(
        '/compliance/run-checks',
        { method: 'POST' },
      ),
  },
};

export type ExtinguisherStatus = 'ACTIVE' | 'DELIVERED' | 'RETURNED' | 'EXPIRED';
export type EscalationStatus = 'PENDING' | 'REPORTED' | 'RESOLVED';

export interface Customer {
  id: string;
  fullName: string;
  nationalId: string;
  email: string | null;
  phone: string;
  address: string | null;
  createdAt: string;
  _count?: { extinguishers: number };
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
  customer?: Pick<Customer, 'fullName' | 'nationalId' | 'phone'>;
}

export interface CreateExtinguisherInput {
  serialNumber: string;
  customerId: string;
  purchaseDate: string;
  expiryDate: string;
  type?: string;
  capacity?: string;
}

export interface Notification {
  id: string;
  type: string;
  message: string;
  sentAt: string;
  customer?: Pick<Customer, 'fullName'>;
  extinguisher?: Pick<Extinguisher, 'serialNumber'>;
}

export interface Escalation {
  id: string;
  reason: string;
  status: EscalationStatus;
  reportedAt: string | null;
  notes: string | null;
  createdAt: string;
  customer?: Pick<Customer, 'fullName' | 'nationalId' | 'phone'>;
  extinguisher?: Pick<Extinguisher, 'serialNumber' | 'expiryDate'>;
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
