// Mirror of backend types — keep in sync or replace with a shared package

export interface FiberEntry {
  name: string;
  percent: number;
  isNatural: boolean;
}

export interface Product {
  id: number;
  advertiserId: string;
  advertiserName: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  retailPrice: number | null;
  salePrice: number | null;
  currency: string;
  imageUrl: string;
  buyUrl: string;
  inStock: boolean;
  materialRaw: string;
  naturalPercent: number;
  fiberBreakdown: string; // JSON string of FiberEntry[]
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ProductFilters {
  search?: string;
  minNaturalPercent?: number;
  inStock?: boolean;
  advertiserId?: string;
  sortBy?: "price" | "name" | "naturalPercent" | "createdAt";
  sortDir?: "asc" | "desc";
}
