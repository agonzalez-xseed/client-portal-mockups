"use client";

import {
  DownloadSimpleIcon,
  EyeIcon,
  FilePdfIcon,
} from "@xseeduy/icons";
import { DataTable, Table, type DataTableColumn } from "@xseeduy/ui/main";
import { cn } from "@xseeduy/ui/utils";
import type { DocumentRow } from "@/lib/documents";
/**
 * Follows core-ui DataTable column patterns (see Data Table docs / stories):
 * accessor drives sort + search; cell only when display differs from the value.
 * Typography matches the Table specimen — primary for the lead field,
 * text-text-secondary for supporting fields.
 */
const categoryColumn: DataTableColumn<DocumentRow> = {
  id: "category",
  header: "Category",
  accessor: (row) => row.category ?? "",
  sortable: true,
  cell: (row) => <span className="text-text-secondary">{row.category}</span>,
};

const dateColumn: DataTableColumn<DocumentRow> = {
  id: "date",
  header: "Date",
  accessor: (row) => row.dateIso ?? "",
  sortable: true,
  cell: (row) => <span className="text-text-secondary">{row.date}</span>,
};

const buildColumns = (
  meta: DataTableColumn<DocumentRow>,
): DataTableColumn<DocumentRow>[] => [
  {
    id: "name",
    header: "Document",
    accessor: (row) => row.name,
    sortable: true,
    cell: (row) => (
      <span className="inline-flex min-w-0 items-center gap-[var(--space-inline-sm)]">
        <FilePdfIcon
          weight="duotone"
          className="size-[var(--icon-sm)] shrink-0 text-icon-secondary"
          aria-hidden
        />
        <span className="min-w-0 truncate text-text-primary">{row.name}</span>
      </span>
    ),
  },
  meta,
  {
    id: "type",
    header: "Type",
    accessor: (row) => row.type,
    sortable: true,
    cell: (row) => <span className="text-text-secondary">{row.type}</span>,
  },
  {
    id: "size",
    header: "Size",
    accessor: (row) => row.sizeBytes,
    sortable: true,
    cell: (row) => <span className="text-text-secondary">{row.size}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    align: "end",
    fitContent: true,
    hideable: false,
    searchable: false,
    cell: (row) => (
      <Table.RowActions
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <Table.RowAction
          tone="tertiary"
          aria-label={`View ${row.name}`}
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          <EyeIcon weight="duotone" aria-hidden />
        </Table.RowAction>
        <Table.RowAction
          tone="tertiary"
          aria-label={`Download ${row.name}`}
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          <DownloadSimpleIcon weight="duotone" aria-hidden />
        </Table.RowAction>
      </Table.RowActions>
    ),
  },
];

const CATEGORY_COLUMNS = buildColumns(categoryColumn);
const DATE_COLUMNS = buildColumns(dateColumn);

export function DocumentsTable({
  title,
  description,
  data,
  meta = "category",
  className,
}: {
  title: string;
  description?: string;
  data: DocumentRow[];
  /** Second column: the document category, or its date (newest first). */
  meta?: "category" | "date";
  className?: string;
}) {
  return (
    <section
      className={cn(
        "flex flex-col gap-[var(--space-stack-md)]",
        className
      )}
    >
      {/* DataTable has no title slot; weight matches Table.Title. */}
      <div className="flex flex-col gap-[var(--space-stack-xs)]">
        <h2 className="text-body-xl-semibold text-text-primary">{title}</h2>
        {description && (
          <p className="text-body-md text-text-secondary">{description}</p>
        )}
      </div>
      <DataTable
        data={data}
        columns={meta === "date" ? DATE_COLUMNS : CATEGORY_COLUMNS}
        defaultSort={
          meta === "date" ? { columnId: "date", direction: "desc" } : null
        }
        getRowId={(row) => row.id}
        searchPlaceholder="Search documents..."
        defaultPageSize={10}
      />
    </section>
  );
}
