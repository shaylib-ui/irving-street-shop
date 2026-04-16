/**
 * GET /api/products        — paginated product list with filters
 * GET /api/products/:id    — single product detail
 */

import { Router, Request, Response } from "express";
import { getDb } from "../db/database";
import type { ProductQuery } from "../types/product";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  // TODO: implement full query/filter/pagination
  // Placeholder — returns first 20 products that pass the fiber threshold
  const db = getDb();

  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const pageSize = Math.min(100, parseInt(req.query.pageSize as string) || 20);
  const offset = (page - 1) * pageSize;

  const search = (req.query.search as string | undefined)?.trim();
  const minNatural = parseFloat(req.query.minNaturalPercent as string) || 70;
  const inStock = req.query.inStock === "true" ? 1 : req.query.inStock === "false" ? 0 : null;
  const advertiserId = req.query.advertiserId as string | undefined;
  const sortBy = (req.query.sortBy as string) || "createdAt";
  const sortDir = (req.query.sortDir as string)?.toLowerCase() === "asc" ? "ASC" : "DESC";

  const allowedSortColumns: Record<string, string> = {
    price: "price",
    name: "name",
    naturalPercent: "natural_percent",
    createdAt: "created_at",
  };
  const orderCol = allowedSortColumns[sortBy] ?? "created_at";

  let where = "WHERE natural_percent > @minNatural";
  const params: Record<string, unknown> = { minNatural, pageSize, offset };

  if (search) {
    where += " AND (name LIKE @search OR description LIKE @search)";
    params.search = `%${search}%`;
  }
  if (inStock !== null) {
    where += " AND in_stock = @inStock";
    params.inStock = inStock;
  }
  if (advertiserId) {
    where += " AND advertiser_id = @advertiserId";
    params.advertiserId = advertiserId;
  }

  const total = (db.prepare(`SELECT COUNT(*) AS n FROM products ${where}`).get(params) as { n: number }).n;

  // Note: column name is interpolated only from an allowlist above — no injection risk
  const products = db
    .prepare(`SELECT * FROM products ${where} ORDER BY ${orderCol} ${sortDir} LIMIT @pageSize OFFSET @offset`)
    .all(params);

  res.json({
    products,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
});

router.get("/:id", (req: Request, res: Response) => {
  const db = getDb();
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(product);
});

export default router;
