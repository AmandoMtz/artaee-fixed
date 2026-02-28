// src/api/client.ts
/// <reference types="vite/client" />
import type { User, CartItem, Order } from '../types';

const BASE = (import.meta.env.VITE_API_URL ?? '') + '/api';

function getToken(): string | null {
  try {
    const s = localStorage.getItem('artaee_auth');
    if (!s) return null;
    return JSON.parse(s).token ?? null;
  } catch { return null; }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) ?? {}),
  };

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Error del servidor');
  return data as T;
}

export const api = {
  register: (body: { full_name: string; email: string; password: string }) =>
    request<{ token: string; user: User }>('/auth/register', {
      method: 'POST', body: JSON.stringify(body)
    }),

  login: (body: { email: string; password: string }) =>
    request<{ token: string; user: User }>('/auth/login', {
      method: 'POST', body: JSON.stringify(body)
    }),

  me: () => request<User>('/auth/me'),

  createOrder: (body: { items: CartItem[]; notes?: string }) =>
    request<Order>('/orders', {
      method: 'POST', body: JSON.stringify(body)
    }),

  getOrders: () => request<Order[]>('/orders'),

  getOrder: (id: string) => request<Order>(`/orders/${id}`),
  sendMessage: (body: { name: string; email: string; message: string }) =>
  request<{ ok: boolean; message: string }>('/messages', {
    method: 'POST', body: JSON.stringify(body)
  }),
};
