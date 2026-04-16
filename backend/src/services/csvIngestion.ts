/**
 * csvIngestion.ts
 *
 * Reads a CJ Affiliate product feed CSV, runs fiber analysis on each row,
 * and upserts qualifying products (>70% natural fiber) into the database.
 *
 * TODO: Map column names per-advertiser — CJ feeds are not standardised.
 *       The column mapping below covers the most common CJ field names.
 */

import { parse } from "csv-parse";
import fs from "fs";
import type { Database } from "better-sqlite3";
import { analyzeFibers } from "./fiberAnalysis";
import type { CJProductRow } from "../types/product";

// CJ column name variants → our canonical field
const MATERIAL_COLUMNS = [
  "material",
  "fabric",
  "fabric-content",
  "fabric content",
  "material-composition",
  "material composition",
  "fiber content",
  "fiber-content",
  "composition",
  "fabric_content",
  "material_composition",
];

const PRICE_COLUMNS = ["price", "sale-price", "sale_price", "retail-price", "retail_price"];

function extractField(row: CJProductRow, ...candidates: string[]): string {
  for (const key of candidates) {
    const val = row[key] ?? row[key.toLowerCase()] ?? row[key.replace(/-/g, "_")];
    if (val !== undefined && val !== "") return val;
  }
  return "";
}

function parsePrice(raw: string): number | null {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}

export interface IngestionResult {
  totalRows: number;
  importedRows: number;
  rejectedRows: number;
  errorRows: number;
  errors: string[];
}

export async function ingestCsvFile(
  db: Database,
  filePath: string,
  advertiserId: string
): Promise<IngestionResult> {
  const result: IngestionResult = {
    totalRows: 0,
    importedRows: 0,
    rejectedRows: 0,
    errorRows: 0,
    errors: [],
  };

  const upsert = db.prepare(`
    INSERT INTO products (
      advertiser_id, advertiser_name, sku, name, description,
      price, retail_price, sale_price, currency,
      image_url, buy_url, in_stock,
      material_raw, natural_percent, fiber_breakdown,
      updated_at
    ) VALUES (
      @advertiserId, @advertiserName, @sku, @name, @description,
      @price, @retailPrice, @salePrice, @currency,
      @imageUrl, @buyUrl, @inStock,
      @materialRaw, @naturalPercent, @fiberBreakdown,
      datetime('now')
    )
    ON CONFLICT(advertiser_id, sku) DO UPDATE SET
      name            = excluded.name,
      description     = excluded.description,
      price           = excluded.price,
      retail_price    = excluded.retail_price,
      sale_price      = excluded.sale_price,
      image_url       = excluded.image_url,
      buy_url         = excluded.buy_url,
      in_stock        = excluded.in_stock,
      material_raw    = excluded.material_raw,
      natural_percent = excluded.natural_percent,
      fiber_breakdown = excluded.fiber_breakdown,
      updated_at      = datetime('now')
  `);

  const rows: CJProductRow[] = await new Promise((resolve, reject) => {
    const collected: CJProductRow[] = [];
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, skip_empty_lines: true, trim: true }))
      .on("data", (row: CJProductRow) => collected.push(row))
      .on("error", reject)
      .on("end", () => resolve(collected));
  });

  const insertMany = db.transaction((rows: CJProductRow[]) => {
    for (const row of rows) {
      result.totalRows++;
      try {
        const materialRaw =
          extractField(row, ...MATERIAL_COLUMNS) ||
          extractField(row, "keywords"); // last resort — sometimes keywords mention material

        const analysis = analyzeFibers(materialRaw);

        if (!analysis.passesThreshold) {
          result.rejectedRows++;
          continue;
        }

        const priceRaw = extractField(row, ...PRICE_COLUMNS);
        const price = parsePrice(priceRaw) ?? 0;
        const retailPrice = parsePrice(extractField(row, "retail-price", "retail_price"));
        const salePrice = parsePrice(extractField(row, "sale-price", "sale_price"));

        upsert.run({
          advertiserId,
          advertiserName: extractField(row, "advertiser-name", "advertiser_name") || advertiserId,
          sku: extractField(row, "sku", "catalog-id", "catalog_id", "id") || `${advertiserId}-${result.totalRows}`,
          name: extractField(row, "name", "product-name", "title") || "Unnamed Product",
          description: extractField(row, "description", "long-description") || "",
          price,
          retailPrice,
          salePrice,
          currency: extractField(row, "currency") || "USD",
          imageUrl: extractField(row, "image-url", "image_url", "imageurl", "image") || "",
          buyUrl: extractField(row, "buy-url", "buy_url", "buyurl", "link") || "",
          inStock: extractField(row, "in-stock", "in_stock", "availability").toLowerCase() !== "no" ? 1 : 0,
          materialRaw,
          naturalPercent: analysis.naturalPercent,
          fiberBreakdown: JSON.stringify(analysis.fibers),
        });

        result.importedRows++;
      } catch (err) {
        result.errorRows++;
        result.errors.push(`Row ${result.totalRows}: ${(err as Error).message}`);
      }
    }
  });

  insertMany(rows);
  return result;
}
