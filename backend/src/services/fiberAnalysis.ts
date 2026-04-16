/**
 * fiberAnalysis.ts
 *
 * Parses a material/fabric composition string and determines what percentage
 * is composed of natural fibers. Products with >70% natural fiber content
 * pass the threshold and are eligible for display.
 *
 * Handles common input formats, e.g.:
 *   "100% Cotton"
 *   "60% Cotton, 40% Polyester"
 *   "Shell: 80% Wool 20% Nylon; Lining: 100% Silk"
 *   "Cotton/Linen blend"                  ← no explicit percentages
 */

import type { FiberAnalysis, FiberEntry } from "../types/product";

export const NATURAL_FIBER_THRESHOLD = 70;

// Canonical natural fiber names
const NATURAL_FIBERS: ReadonlySet<string> = new Set([
  "cotton",
  "wool",
  "linen",
  "flax",       // alternate name for linen
  "silk",
  "hemp",
  "bamboo",
  "cashmere",
  "alpaca",
  "jute",
  "ramie",
  "modal",      // wood-pulp derived — treated as natural here; revisit if needed
  "lyocell",    // TENCEL — wood-pulp derived
  "tencel",
  "down",
  "angora",
  "mohair",
  "merino",     // variant of wool — matched via "wool" but listed for completeness
  "camel",      // camel hair
  "vicuna",
  "qiviut",
]);

// Tokens that unambiguously indicate synthetic fibers
const SYNTHETIC_FIBERS: ReadonlySet<string> = new Set([
  "polyester",
  "nylon",
  "acrylic",
  "spandex",
  "elastane",
  "lycra",
  "rayon",      // semi-synthetic — treated as synthetic here; revisit if needed
  "viscose",    // same as rayon
  "acetate",
  "polypropylene",
  "polyamide",
  "fleece",     // usually synthetic unless otherwise specified
  "microfiber",
  "microfibre",
]);

function isNatural(fiberName: string): boolean {
  const lower = fiberName.toLowerCase();
  // Direct match
  if (NATURAL_FIBERS.has(lower)) return true;
  // Substring match for compound names like "pima cotton", "merino wool"
  for (const nat of NATURAL_FIBERS) {
    if (lower.includes(nat)) return true;
  }
  return false;
}

function isSynthetic(fiberName: string): boolean {
  const lower = fiberName.toLowerCase();
  if (SYNTHETIC_FIBERS.has(lower)) return true;
  for (const syn of SYNTHETIC_FIBERS) {
    if (lower.includes(syn)) return true;
  }
  return false;
}

/**
 * Extract fiber entries from a composition string.
 *
 * Strategy:
 * 1. Find all "NN% FiberName" patterns.
 * 2. If no percentages found but fiber names present, treat as 100% unknown split.
 */
function extractFibers(text: string): FiberEntry[] {
  const entries: FiberEntry[] = [];

  // Pattern: optional spaces, a number (int or decimal), %, optional space, fiber name
  const pattern = /(\d+(?:\.\d+)?)\s*%\s*([A-Za-z][A-Za-z\s\-/]*?)(?=[,;/\n]|$|\d+\s*%)/gi;

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    const percent = parseFloat(match[1]);
    const name = match[2].trim().replace(/\s+/g, " ");
    if (name.length === 0 || percent < 0 || percent > 100) continue;
    entries.push({ name, percent, isNatural: isNatural(name) });
  }

  // Fallback: if no percentages but recognised fibers exist, flag for manual review
  if (entries.length === 0 && text.trim().length > 0) {
    const words = text.split(/[\s,;/&+]+/);
    for (const word of words) {
      if (word.length < 3) continue;
      if (isNatural(word)) {
        entries.push({ name: word, percent: 0, isNatural: true });
      } else if (isSynthetic(word)) {
        entries.push({ name: word, percent: 0, isNatural: false });
      }
    }
  }

  return entries;
}

export function analyzeFibers(materialText: string): FiberAnalysis {
  const raw = (materialText ?? "").trim();

  if (!raw) {
    return {
      naturalPercent: 0,
      syntheticPercent: 0,
      unknownPercent: 100,
      fibers: [],
      rawText: raw,
      passesThreshold: false,
    };
  }

  const fibers = extractFibers(raw);

  const totalExplicit = fibers.reduce((sum, f) => sum + f.percent, 0);
  const hasExplicitPercentages = totalExplicit > 0;

  let naturalPercent = 0;
  let syntheticPercent = 0;
  let unknownPercent = 0;

  if (hasExplicitPercentages) {
    for (const f of fibers) {
      if (f.isNatural) naturalPercent += f.percent;
      else syntheticPercent += f.percent;
    }
    // Anything unaccounted-for is unknown
    unknownPercent = Math.max(0, 100 - naturalPercent - syntheticPercent);
  } else if (fibers.length > 0) {
    // No percentages — can't determine composition reliably; mark as unknown
    unknownPercent = 100;
  } else {
    unknownPercent = 100;
  }

  return {
    naturalPercent: Math.min(100, naturalPercent),
    syntheticPercent: Math.min(100, syntheticPercent),
    unknownPercent: Math.min(100, unknownPercent),
    fibers,
    rawText: raw,
    passesThreshold: naturalPercent > NATURAL_FIBER_THRESHOLD,
  };
}
