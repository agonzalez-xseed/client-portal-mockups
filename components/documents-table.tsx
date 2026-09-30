"use client";

import {
  DownloadSimpleIcon,
  EyeIcon,
  FilePdfIcon,
} from "@xseeduy/icons";
import { DataTable, Table, type DataTableColumn } from "@xseeduy/ui/main";
import { cn } from "@xseeduy/ui/utils";
import type { DocumentRow } from "@/lib/documents";
import {
  FRAMED_PANEL,
  SurfaceFrame,
} from "@/components/dashboard/surface-frame";

/**
 * Follows core-ui DataTable column patterns (see Data Table docs / stories):
 * accessor drives sort + search; cell only when display differs from the value.
 * Typography matches the Table specimen — primary for the lead field,
 * text-text-secondary for supporting fields.
 */
const columns: DataTableColumn<DocumentRow>[] = [
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
  {
    id: "category",
    header: "Category",
    accessor: (row) => row.category,
    sortable: true,
    cell: (row) => (
      <span className="text-text-secondary">{row.category}</span>
    ),
  },
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

/**
 * DataTable has no toolbar size prop and renders Columns / search at md.
 * Mirrors core-ui Button and Input size="sm" (the search input keeps its
 * leading-icon left padding, so only the right side changes).
 */
const COMPACT_TOOLBAR = cn(
  "[&_[data-slot=table-filters]_button]:h-[var(--control-sm)]",
  "[&_[data-slot=table-filters]_button]:px-[var(--space-inset-sm)]",
  "[&_[data-slot=table-search]>div]:h-[var(--control-sm)]",
  "[&_[data-slot=table-search]_input]:pr-[var(--space-inset-sm)]",
);

export function DocumentsTable({
  title,
  description,
  data,
  framed = false,
  className,
}: {
  title: string;
  description?: string;
  data: DocumentRow[];
  /** Wraps the table in the dashboard SurfaceFrame; DataTable becomes the inset panel. */
  framed?: boolean;
  className?: string;
}) {
  const table = (
    <DataTable
      data={data}
      columns={columns}
      getRowId={(row) => row.id}
      searchPlaceholder="Search documents..."
      defaultPageSize={10}
      className={
        framed
          ? // Important: DataTable's own rounded-surface otherwise wins; bg overrides FRAMED_PANEL.
            cn(
              FRAMED_PANEL,
              "rounded-[var(--radius-10)]! bg-surface-subtle!",
              COMPACT_TOOLBAR,
            )
          : undefined
      }
    />
  );

  return (
    <section
      className={cn(
        "flex flex-col gap-[var(--space-stack-md)]",
        className
      )}
    >
      {/*
        Titles stay outside DataTable — the component already owns the Table
        shell (surface-subtle frame + bordered surface-default body). Title
        weight matches Table.Title from @xseeduy/ui/main.
      */}
      <div className="flex flex-col gap-[var(--space-stack-xs)]">
        <h2 className="text-body-xl-semibold text-text-primary">{title}</h2>
        {description && (
          <p className="text-body-md text-text-secondary">{description}</p>
        )}
      </div>
      {framed ? <SurfaceFrame>{table}</SurfaceFrame> : table}
    </section>
  );
}
