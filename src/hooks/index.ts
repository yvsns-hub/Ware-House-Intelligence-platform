'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ApiResponse,
  Product,
  Order,
  WarehouseEmployee,
  WarehouseLocation,
  DashboardSummary,
  WeatherData,
  AIAnalysisResponse,
  ProductFilters,
  OrderFilters,
  CreateOrderDTO,
  UpdateOrderDTO,
  UpdateProductDTO,
  AIAnalysisRequest,
} from '../types';

// Generic Fetcher
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  const text = await res.text();
  let json: ApiResponse<T>;
  try {
    json = text ? JSON.parse(text) : { success: false, message: 'Empty response' };
  } catch {
    throw new Error(`Invalid JSON response from ${url}`);
  }

  if (!res.ok || !json.success) {
    throw new Error(json.error || json.message || `API request failed with status ${res.status}`);
  }

  return json.data as T;
}

// 1. Products Hooks
export function useProducts(filters: ProductFilters = {}) {
  const params = new URLSearchParams();
  if (filters.category) params.set('category', filters.category);
  if (filters.status) params.set('status', filters.status);
  if (filters.search) params.set('search', filters.search);
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters.sortBy) params.set('sortBy', filters.sortBy);
  if (filters.sortOrder) params.set('sortOrder', filters.sortOrder);

  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => apiFetch<Product[]>(`/api/products?${params.toString()}`),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => apiFetch<Product>(`/api/products/${id}`),
    enabled: !!id,
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductDTO }) =>
      apiFetch<Product>(`/api/products/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

// 2. Orders Hooks
export function useOrders(filters: OrderFilters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.priority) params.set('priority', filters.priority);
  if (filters.customerTier) params.set('customerTier', filters.customerTier);
  if (filters.search) params.set('search', filters.search);
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));

  return useQuery({
    queryKey: ['orders', filters],
    queryFn: () => apiFetch<Order[]>(`/api/orders?${params.toString()}`),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => apiFetch<Order>(`/api/orders/${id}`),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOrderDTO) =>
      apiFetch<Order>('/api/orders', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderDTO }) =>
      apiFetch<Order>(`/api/orders/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

// 3. Dashboard Summary Hook
export function useDashboardSummary() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => apiFetch<DashboardSummary>('/api/dashboard'),
    refetchInterval: 30000, // Refresh every 30s
  });
}

// 4. Employees & Locations Hooks
export function useEmployees(role?: string, shift?: string) {
  const params = new URLSearchParams();
  if (role) params.set('role', role);
  if (shift) params.set('shift', shift);

  return useQuery({
    queryKey: ['employees', role, shift],
    queryFn: () => apiFetch<WarehouseEmployee[]>(`/api/employees?${params.toString()}`),
  });
}

export function useLocations(zone?: string) {
  const params = new URLSearchParams();
  if (zone) params.set('zone', zone);

  return useQuery({
    queryKey: ['locations', zone],
    queryFn: () => apiFetch<WarehouseLocation[]>(`/api/locations?${params.toString()}`),
  });
}

// 5. Weather Hook
export function useWeather() {
  return useQuery({
    queryKey: ['weather'],
    queryFn: () =>
      apiFetch<{
        weather: WeatherData;
        impactAnalysis: {
          inboundRisk: string;
          coldStorageAlert: boolean;
          recommendation: string;
        };
      }>('/api/weather'),
    staleTime: 5 * 60 * 1000,
  });
}

// 6. AI Analysis Hook
export function useAIAnalyze() {
  return useMutation({
    mutationFn: (request: AIAnalysisRequest) =>
      apiFetch<AIAnalysisResponse>('/api/ai/analyze', {
        method: 'POST',
        body: JSON.stringify(request),
      }),
  });
}
