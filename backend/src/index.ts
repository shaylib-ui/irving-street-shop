import express from "express";
import cors from "cors";
import { getDb } from "./db/database";
import productsRouter from "./routes/products";
import adminRouter from "./routes/admin";

const app = express();
const PORT = parseInt(process.env.PORT ?? "3001", 10);

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:3000" }));
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────────────────
app.use("/api/products", productsRouter);
app.use("/api/admin", adminRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", ts: new Date().toISOString() });
});

// ── Start ──────────────────────────────────────────────────────────────────
getDb(); // initialise DB on startup
app.listen(PORT, () => {
  console.log(`Irving Street backend running on http://localhost:${PORT}`);
});
