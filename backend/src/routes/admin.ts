/**
 * POST /api/admin/import   — upload & process a CJ product feed CSV
 * GET  /api/admin/imports  — list previous import runs
 * GET  /api/admin/stats    — database summary stats
 */

import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { getDb } from "../db/database";
import { ingestCsvFile } from "../services/csvIngestion";

const router = Router();

const UPLOAD_DIR = path.join(__dirname, "../../data/uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const stamp = Date.now();
    cb(null, `${stamp}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV files are accepted"));
    }
  },
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
});

router.post("/import", upload.single("file"), async (req: Request, res: Response) => {
  // TODO: add authentication/API key check before production
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const advertiserId = (req.body.advertiserId as string | undefined)?.trim() || "unknown";

  const db = getDb();
  const importRecord = db
    .prepare(
      `INSERT INTO feed_imports (filename, advertiser_id, status, started_at)
       VALUES (?, ?, 'pending', datetime('now'))`
    )
    .run(req.file.originalname, advertiserId);

  const importId = importRecord.lastInsertRowid;

  try {
    const result = await ingestCsvFile(db, req.file.path, advertiserId);

    db.prepare(
      `UPDATE feed_imports
       SET status = 'complete', total_rows = ?, imported_rows = ?,
           rejected_rows = ?, error_rows = ?, completed_at = datetime('now')
       WHERE id = ?`
    ).run(result.totalRows, result.importedRows, result.rejectedRows, result.errorRows, importId);

    res.json({ importId, ...result });
  } catch (err) {
    const msg = (err as Error).message;
    db.prepare(
      `UPDATE feed_imports SET status = 'error', error_message = ?, completed_at = datetime('now') WHERE id = ?`
    ).run(msg, importId);

    res.status(500).json({ error: msg, importId });
  }
});

router.get("/imports", (_req: Request, res: Response) => {
  const db = getDb();
  const imports = db
    .prepare("SELECT * FROM feed_imports ORDER BY started_at DESC LIMIT 50")
    .all();
  res.json(imports);
});

router.get("/stats", (_req: Request, res: Response) => {
  const db = getDb();
  const stats = {
    totalProducts: (db.prepare("SELECT COUNT(*) AS n FROM products").get() as { n: number }).n,
    inStock: (db.prepare("SELECT COUNT(*) AS n FROM products WHERE in_stock = 1").get() as { n: number }).n,
    above70: (db.prepare("SELECT COUNT(*) AS n FROM products WHERE natural_percent > 70").get() as { n: number }).n,
    above90: (db.prepare("SELECT COUNT(*) AS n FROM products WHERE natural_percent > 90").get() as { n: number }).n,
    advertisers: (db.prepare("SELECT COUNT(DISTINCT advertiser_id) AS n FROM products").get() as { n: number }).n,
    avgNaturalPercent: (db.prepare("SELECT AVG(natural_percent) AS v FROM products WHERE natural_percent > 0").get() as { v: number | null }).v,
    lastImport: db.prepare("SELECT * FROM feed_imports ORDER BY started_at DESC LIMIT 1").get(),
  };
  res.json(stats);
});

export default router;
