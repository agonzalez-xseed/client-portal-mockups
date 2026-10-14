"use client";

import type { SyntheticEvent } from "react";
import { DownloadSimpleIcon, EyeIcon } from "@xseeduy/icons";
import { Button } from "@xseeduy/ui/base";
import { Table } from "@xseeduy/ui/main";

function stopRowClick(event: SyntheticEvent) {
  event.stopPropagation();
}

function preventClick(event: SyntheticEvent) {
  event.preventDefault();
}

export function DocumentRowActions({ name }: { name: string }) {
  return (
    <>
      <Table.RowActions onClick={stopRowClick} onKeyDown={stopRowClick}>
        <Table.RowAction
          tone="tertiary"
          aria-label={`View ${name}`}
          onClick={preventClick}
        >
          <EyeIcon weight="duotone" aria-hidden />
        </Table.RowAction>
        <Table.RowAction
          tone="tertiary"
          aria-label={`Download ${name}`}
          onClick={preventClick}
        >
          <DownloadSimpleIcon weight="duotone" aria-hidden />
        </Table.RowAction>
      </Table.RowActions>
      <div
        className="flex w-full gap-[var(--space-inline-sm)] md:hidden"
        onClick={stopRowClick}
        onKeyDown={stopRowClick}
      >
        <Button
          type="button"
          tone="tertiary"
          size="md"
          className="min-w-0 flex-1"
          aria-label={`View ${name}`}
          onClick={preventClick}
        >
          <EyeIcon weight="duotone" aria-hidden />
          View
        </Button>
        <Button
          type="button"
          tone="tertiary"
          size="md"
          className="min-w-0 flex-1"
          aria-label={`Download ${name}`}
          onClick={preventClick}
        >
          <DownloadSimpleIcon weight="duotone" aria-hidden />
          Download
        </Button>
      </div>
    </>
  );
}
