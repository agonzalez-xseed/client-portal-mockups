import { DocumentsTable } from "@/components/documents-table";
import {
  GENERAL_DOCUMENTS,
  LEGAL_DOCUMENTS,
  REPORT_DOCUMENTS,
} from "@/lib/documents";

export default function CollateralsPage() {
  return (
    <div className="flex flex-col gap-[var(--space-stack-xl)]">
      <DocumentsTable
        title="General Documents"
        description="Available to all clients."
        data={GENERAL_DOCUMENTS}
      />
      <DocumentsTable
        title="Reports"
        description="Reports prepared for your account."
        data={REPORT_DOCUMENTS}
        meta="date"
      />
      <DocumentsTable
        title="Legal"
        description="Contracts and legal documents for your account."
        data={LEGAL_DOCUMENTS}
        meta="date"
      />
    </div>
  );
}
