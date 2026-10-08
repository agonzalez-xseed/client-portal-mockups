export type DocumentRow = {
  id: string;
  name: string;
  category?: string;
  /** Display date, e.g. "Sep 29, 2026". */
  date?: string;
  /** ISO date used for sorting. */
  dateIso?: string;
  type: string;
  size: string;
  sizeBytes: number;
};

export const GENERAL_DOCUMENTS: DocumentRow[] = [
  {
    id: "handbook-2026",
    name: "Client Handbook 2026",
    category: "Handbook",
    type: "PDF",
    size: "10.21 MB",
    sizeBytes: 10_210_000,
  },
];

export const REPORT_DOCUMENTS: DocumentRow[] = [
  {
    id: "gravyty-q2-2026",
    name: "Gravyty | Q2 2026 Quarter Report by Xseed",
    date: "Sep 25, 2025",
    dateIso: "2025-09-25",
    type: "PDF",
    size: "1.63 MB",
    sizeBytes: 1_630_000,
  },
  {
    id: "gravyty-q1-2026",
    name: "Gravyty | Q1 2026 Quarter Report by Xseed",
    date: "Sep 25, 2025",
    dateIso: "2025-09-25",
    type: "PDF",
    size: "2.18 MB",
    sizeBytes: 2_180_000,
  },
];

function legal(id: string, name: string, size: string, sizeBytes: number): DocumentRow {
  return { id, name, date: "Sep 29, 2026", dateIso: "2026-09-29", type: "PDF", size, sizeBytes };
}

export const LEGAL_DOCUMENTS: DocumentRow[] = [
  legal("sow-8", "SOW 8 Xseed US scale and growth Gravyty", "0.25 MB", 250_000),
  legal("sow-7", "SOW 7 Xseed US scale and growth Gravyty", "0.25 MB", 250_000),
  legal("sow-6", "SOW 6 Xseed US scale and growth Gravyty (1)", "0.25 MB", 250_000),
  legal("sow-5-amendment-2", "Amendment 2 to SOW 5 Gravyty Inc Resource Replacement", "0.18 MB", 180_000),
  legal("sow-5-amendment-1", "Amendment 1 to SOW 5 Gravyty Inc Extension of Allocation End Date (1)", "0.16 MB", 160_000),
  legal("sow-5", "SOW 5 Xseed US scale and growth Gravyty", "1.08 MB", 1_080_000),
  legal("sow-4-drupal", "Xseed US Engineering Services SOW Nr.4 Gravyty Drupal 01.12.2026", "0.32 MB", 320_000),
  legal("sow-4", "Gravity Xseed US scale and growth SOW 4", "1.08 MB", 1_080_000),
  legal("sow-3", "SOW 3 Xseed US scale and growth Gravyty", "2.12 MB", 2_120_000),
  legal("sow-2", "SOW 2 Xseed US scale and growth Gravyty", "2.12 MB", 2_120_000),
  legal("sow-1", "SOW 1 Xseed US scale and growth Gravyty", "2.12 MB", 2_120_000),
];
