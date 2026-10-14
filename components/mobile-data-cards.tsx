"use client";

import { useMemo, useState, type ReactNode } from "react";
import { MagnifyingGlassIcon, MagnifyingGlassMinusIcon } from "@xseeduy/icons";
import { Input, SurfaceFrame, SurfaceFramePanel } from "@xseeduy/ui/base";
import {
  Pagination,
  type DataTableColumn,
  type DataTableSort,
} from "@xseeduy/ui/main";
import { cn } from "@xseeduy/ui/utils";

/**
 * `DataTableColumn` plus mobile-only options. Pass the same columns to
 * `DataTable` (desktop) and `MobileDataCards` (mobile).
 */
export type MobileDataTableColumn<T> = DataTableColumn<T> & {
  /** Leave this field out of the mobile cards. The column still feeds search and sort. */
  hideOnMobile?: boolean;
  /** Mobile-only column (e.g. a card's "View" button). Drop it with `desktopColumns`. */
  hideOnDesktop?: boolean;
};

/** The columns to hand to the desktop `DataTable`. */
export function desktopColumns<T>(
  columns: MobileDataTableColumn<T>[],
): DataTableColumn<T>[] {
  return columns.filter((column) => !column.hideOnDesktop);
}

/** Cell markup is built for a table cell. Let it wrap inside the card width. */
const CELL_WRAP =
  "min-w-0 break-words [&_.inline-flex]:max-w-full [&_.truncate]:overflow-visible [&_.truncate]:whitespace-normal [&_.truncate]:text-clip";

function isActionColumn<T>(column: DataTableColumn<T>) {
  return column.id === "actions" || (column.fitContent === true && column.accessor == null);
}

function headerLabel(header: ReactNode, id: string) {
  return typeof header === "string" ? header : id;
}

function FieldCell<T>({ column, row }: { column: DataTableColumn<T>; row: T }) {
  return (
    <div className="flex min-w-0 flex-col gap-[var(--space-stack-xs)]">
      <span className="text-label-sm text-text-tertiary">
        {headerLabel(column.header, column.id)}
      </span>
      <div className={cn(CELL_WRAP, "text-body-md text-text-primary")}>
        {column.cell
          ? column.cell(row)
          : column.accessor
            ? String(column.accessor(row) ?? "")
            : null}
      </div>
    </div>
  );
}

function compareValues(left: unknown, right: unknown) {
  const leftEmpty = left == null || left === "";
  const rightEmpty = right == null || right === "";
  if (leftEmpty && rightEmpty) return 0;
  if (leftEmpty) return 1;
  if (rightEmpty) return -1;
  if (typeof left === "number" && typeof right === "number") return left - right;
  return String(left).localeCompare(String(right), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function sortRows<T>(rows: T[], columns: DataTableColumn<T>[], sort: DataTableSort | null) {
  if (!sort) return rows;
  const column = columns.find((entry) => entry.id === sort.columnId);
  if (!column?.accessor) return rows;
  const direction = sort.direction === "asc" ? 1 : -1;
  return [...rows].sort(
    (left, right) =>
      compareValues(column.accessor!(left), column.accessor!(right)) * direction,
  );
}

export function MobileDataCards<T>({
  data,
  columns,
  getRowId,
  searchPlaceholder = "Search…",
  searchable = true,
  paginated = true,
  defaultPageSize = 10,
  defaultSort = null,
  framed = true,
  empty,
}: {
  data: T[];
  columns: MobileDataTableColumn<T>[];
  getRowId: (row: T) => string;
  searchPlaceholder?: string;
  searchable?: boolean;
  paginated?: boolean;
  defaultPageSize?: number;
  defaultSort?: DataTableSort | null;
  /** Drop the outer frame when the list already sits inside one. */
  framed?: boolean;
  empty?: ReactNode;
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const visible = columns.filter((column) => !column.hideOnMobile);
  const fields = visible.filter((column) => !isActionColumn(column));
  const actions = visible.filter(isActionColumn);
  const showSearch = searchable && data.length > 3;

  const filtered = useMemo(() => {
    const sorted = sortRows(data, columns, defaultSort);
    const query = search.trim().toLowerCase();
    if (!searchable || !query) return sorted;
    return sorted.filter((row) =>
      columns.some((column) => {
        if (isActionColumn(column) || column.searchable === false || !column.accessor) {
          return false;
        }
        const value = column.accessor(row);
        return value != null && String(value).toLowerCase().includes(query);
      }),
    );
  }, [columns, data, defaultSort, search, searchable]);

  const pageTotal = paginated
    ? Math.max(1, Math.ceil(filtered.length / defaultPageSize))
    : 1;
  const safePage = Math.min(page, pageTotal);
  const pageRows = paginated
    ? filtered.slice((safePage - 1) * defaultPageSize, safePage * defaultPageSize)
    : filtered;

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  const emptyContent = empty ?? (
    <div className="flex flex-col items-center justify-center gap-[var(--space-stack-sm)] px-[var(--space-inset-md)] py-[var(--space-inset-xl)] text-center">
      <MagnifyingGlassMinusIcon
        weight="duotone"
        className="size-[var(--icon-xl)] text-icon-tertiary"
      />
      <p className="text-body-md text-text-secondary">No results found</p>
    </div>
  );

  const content = (
    <>
      {showSearch && (
        <div className="border-b border-border-subtle p-[var(--space-inset-sm)]">
          <Input
            size="sm"
            value={search}
            placeholder={searchPlaceholder}
            aria-label="Search table"
            onChange={(event) => handleSearch(event.target.value)}
            leadingAdornment={<MagnifyingGlassIcon weight="duotone" />}
          />
        </div>
      )}

      {pageRows.length === 0 ? (
        emptyContent
      ) : (
        <div className="divide-y divide-border-subtle">
          {pageRows.map((row) => (
            <div
              key={getRowId(row)}
              className="flex flex-col gap-[var(--space-stack-sm)] px-[var(--space-inset-md)] py-[var(--space-inset-md)]"
            >
              {fields[0] && <FieldCell column={fields[0]} row={row} />}
              {fields.length > 1 && (
                <div className="grid grid-cols-2 gap-x-[var(--space-inline-md)] gap-y-[var(--space-stack-sm)]">
                  {fields.slice(1).map((column) => (
                    <FieldCell key={column.id} column={column} row={row} />
                  ))}
                </div>
              )}
              {actions.map((column) => (
                <div
                  key={column.id}
                  className="w-full [&_[data-slot=table-row-actions]]:hidden"
                >
                  {column.cell?.(row)}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {paginated && filtered.length > defaultPageSize && (
        <Pagination
          page={safePage}
          count={pageTotal}
          onPageChange={setPage}
          size="sm"
          className="w-full flex-wrap justify-center gap-[var(--space-inline-sm)] border-t border-border-subtle px-[var(--space-inset-sm)] py-[var(--space-inset-sm)]"
        >
          <Pagination.Content>
            <Pagination.Previous />
            <Pagination.Pages />
            <Pagination.Next />
          </Pagination.Content>
        </Pagination>
      )}
    </>
  );

  // Same outer frame + inner panel as core-ui's Table on desktop.
  return framed ? (
    <SurfaceFrame className="md:hidden">
      <SurfaceFramePanel>{content}</SurfaceFramePanel>
    </SurfaceFrame>
  ) : (
    // Inside another frame: a single default-surface panel, like SurfaceFramePanel.
    <div className="overflow-hidden rounded-[var(--radius-10)] border border-border-subtle bg-surface-default md:hidden">
      {content}
    </div>
  );
}
