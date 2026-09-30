import { DocumentsTable } from "@/components/documents-table";
import { GENERAL_DOCUMENTS, YOUR_DOCUMENTS } from "@/lib/documents";

export default function CollateralsPage() {
  return (
    <div className="flex flex-col gap-[var(--space-stack-xl)]">
      <DocumentsTable
        title="General Documents"
        description="Available to all clients."
        data={GENERAL_DOCUMENTS}
      />
      <DocumentsTable
        title="Your Documents"
        description="Documents assigned specifically to your account."
        data={YOUR_DOCUMENTS}
      />
    </div>
  );
}
