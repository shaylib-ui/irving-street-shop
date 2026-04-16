-- Irving Street Shop — SQLite schema

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- ─── Products ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id                INTEGER  PRIMARY KEY AUTOINCREMENT,
  advertiser_id     TEXT     NOT NULL,
  advertiser_name   TEXT     NOT NULL DEFAULT '',
  sku               TEXT     NOT NULL,
  name              TEXT     NOT NULL,
  description       TEXT     NOT NULL DEFAULT '',
  price             REAL     NOT NULL DEFAULT 0,
  retail_price      REAL,
  sale_price        REAL,
  currency          TEXT     NOT NULL DEFAULT 'USD',
  image_url         TEXT     NOT NULL DEFAULT '',
  buy_url           TEXT     NOT NULL DEFAULT '',
  in_stock          INTEGER  NOT NULL DEFAULT 1,  -- boolean: 0 or 1
  material_raw      TEXT     NOT NULL DEFAULT '',
  natural_percent   REAL     NOT NULL DEFAULT 0,
  fiber_breakdown   TEXT     NOT NULL DEFAULT '[]', -- JSON
  created_at        TEXT     NOT NULL DEFAULT (datetime('now')),
  updated_at        TEXT     NOT NULL DEFAULT (datetime('now')),

  UNIQUE(advertiser_id, sku)
);

CREATE INDEX IF NOT EXISTS idx_products_natural_percent ON products(natural_percent);
CREATE INDEX IF NOT EXISTS idx_products_in_stock        ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_advertiser_id   ON products(advertiser_id);
CREATE INDEX IF NOT EXISTS idx_products_name            ON products(name);

-- ─── Feed ingestion log ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS feed_imports (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  filename        TEXT    NOT NULL,
  advertiser_id   TEXT,
  total_rows      INTEGER NOT NULL DEFAULT 0,
  imported_rows   INTEGER NOT NULL DEFAULT 0,  -- passed fiber threshold
  rejected_rows   INTEGER NOT NULL DEFAULT 0,  -- below threshold
  error_rows      INTEGER NOT NULL DEFAULT 0,  -- parse failures
  status          TEXT    NOT NULL DEFAULT 'pending', -- pending|complete|error
  error_message   TEXT,
  started_at      TEXT    NOT NULL DEFAULT (datetime('now')),
  completed_at    TEXT
);
