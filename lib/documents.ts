export type DocumentRow = {
  id: string;
  name: string;
  category: string;
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

export const YOUR_DOCUMENTS: DocumentRow[] = [
  {
    id: "gravyty-q1-2026",
    name: "Gravyty | Q1 2026 Quarter Report by Xseed",
    category: "Report",
    type: "PDF",
    size: "2.18 MB",
    sizeBytes: 2_180_000,
  },
  {
    id: "gravyty-q2-2026",
    name: "Gravyty | Q2 2026 Quarter Report by Xseed",
    category: "Report",
    type: "PDF",
    size: "1.69 MB",
    sizeBytes: 1_690_000,
  },
];
