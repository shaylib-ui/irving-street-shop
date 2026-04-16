/**
 * API client — thin wrapper around fetch for the backend.
 * All functions are async and throw on non-2xx responses.
 */

import type { Product, ProductListResponse, ProductFilters } from "@/types/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

// ── Products ────────────────────────────────────────────────────────────────

export async function getProducts(
  filters: ProductFilters & { page?: number; pageSize?: number } = {}
): Promise<ProductListResponse> {
  const params = new URLSearchParams();
  if (filters.page)             params.set("page", String(filters.page));
  if (filters.pageSize)         params.set("pageSize", String(filters.pageSize));
  if (filters.search)           params.set("search", filters.search);
  if (filters.minNaturalPercent !== undefined)
    params.set("minNaturalPercent", String(filters.minNaturalPercent));
  if (filters.inStock !== undefined)
    params.set("inStock", String(filters.inStock));
  if (filters.advertiserId)     params.set("advertiserId", filters.advertiserId);
  if (filters.sortBy)           params.set("sortBy", filters.sortBy);
  if (filters.sortDir)          params.set("sortDir", filters.sortDir);

  const qs = params.toString();
  return request<ProductListResponse>(`/api/products${qs ? `?${qs}` : ""}`);
}

export async function getProduct(id: number | string): Promise<Product> {
  return request<Product>(`/api/products/${id}`);
}

// ── Admin ───────────────────────────────────────────────────────────────────

export interface ImportResult {
  importId: number;
  totalRows: number;
  importedRows: number;
  rejectedRows: number;
  errorRows: number;
  errors?: string[];
}

export async function importCsv(file: File, advertiserId: string): Promise<ImportResult> {
  const form = new FormData();
  form.append("file", file);
  form.append("advertiserId", advertiserId);
  const res = await fetch(`${BASE_URL}/api/admin/import`, { method: "POST", body: form });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Import failed ${res.status}: ${body}`);
  }
  return res.json();
}

export async function getImports(): Promise<unknown[]> {
  return request("/api/admin/imports");
}

export async function getStats(): Promise<{
  totalProducts: number;
  inStock: number;
  above70: number;
  above90: number;
  advertisers: number;
  avgNaturalPercent: number | null;
  lastImport: unknown;
}> {
  return request("/api/admin/stats");
}
