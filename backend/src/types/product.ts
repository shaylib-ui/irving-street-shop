// Raw row from a CJ Affiliate product feed CSV
export interface CJProductRow {
  // CJ standard fields — actual column names vary by advertiser
  "advertiser-id"?: string;
  "advertiser-name"?: string;
  "buy-url"?: string;
  "catalog-id"?: string;
  currency?: string;
  description?: string;
  "image-url"?: string;
  "in-stock"?: string;
  "isbn"?: string;
  manufacturer?: string;
  "manufacturer-id"?: string;
  name?: string;
  price?: string;
  "retail-price"?: string;
  "sale-price"?: string;
  sku?: string;
  "upc"?: string;
  keywords?: string;
  // Material/fabric field — CJ feeds use various column names
  material?: string;
  fabric?: string;
  "fabric-content"?: string;
  "material-composition"?: string;
  [key: string]: string | undefined; // catch-all for advertiser custom columns
}

// Parsed fiber analysis result
export interface FiberAnalysis {
  naturalPercent: number;       // 0–100
  syntheticPercent: number;     // 0–100
  unknownPercent: number;       // percent that couldn't be parsed
  fibers: FiberEntry[];
  rawText: string;
  passesThreshold: boolean;     // naturalPercent > 70
}

export interface FiberEntry {
  name: string;
  percent: number;
  isNatural: boolean;
}

// Product as stored in the database
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

// Paginated product list response
export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Query params for GET /products
export interface ProductQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  minNaturalPercent?: number;
  inStock?: boolean;
  advertiserId?: string;
  sortBy?: "price" | "name" | "naturalPercent" | "createdAt";
  sortDir?: "asc" | "desc";
}
