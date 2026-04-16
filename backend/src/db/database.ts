import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(__dirname, "../../data/shop.db");
const SCHEMA_PATH = path.join(__dirname, "schema.sql");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;

  // Ensure data directory exists
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

  _db = new Database(DB_PATH);

  // Apply schema (idempotent — uses CREATE IF NOT EXISTS)
  const schema = fs.readFileSync(SCHEMA_PATH, "utf-8");
  _db.exec(schema);

  return _db;
}

// Run this file directly to initialise the DB
if (require.main === module) {
  const db = getDb();
  console.log(`Database initialised at ${DB_PATH}`);
  db.close();
}
