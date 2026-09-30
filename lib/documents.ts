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
  {
    id: "onboarding-guide",
    name: "Onboarding Guide for New Team Members",
    category: "Guide",
    type: "PDF",
    size: "3.47 MB",
    sizeBytes: 3_470_000,
  },
  {
    id: "security-policy-2026",
    name: "Information Security Policy 2026",
    category: "Policy",
    type: "PDF",
    size: "1.12 MB",
    sizeBytes: 1_120_000,
  },
  {
    id: "engagement-model",
    name: "Xseed Engagement Model Overview",
    category: "Overview",
    type: "PDF",
    size: "4.86 MB",
    sizeBytes: 4_860_000,
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
