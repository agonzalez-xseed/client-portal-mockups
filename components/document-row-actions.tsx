"use client";

import type { SyntheticEvent } from "react";
import { DownloadSimpleIcon, EyeIcon } from "@xseeduy/icons";
import { Table } from "@xseeduy/ui/main";

function stopRowClick(event: SyntheticEvent) {
  event.stopPropagation();
}

function preventClick(event: SyntheticEvent) {
  event.preventDefault();
}

export function DocumentRowActions({ name }: { name: string }) {
  return (
    <Table.RowActions onClick={stopRowClick} onKeyDown={stopRowClick}>
      <Table.RowAction
        tone="tertiary"
        label="View"
        aria-label={`View ${name}`}
        onClick={preventClick}
      >
        <EyeIcon weight="duotone" aria-hidden />
      </Table.RowAction>
      <Table.RowAction
        tone="tertiary"
        label="Download"
        aria-label={`Download ${name}`}
        onClick={preventClick}
      >
        <DownloadSimpleIcon weight="duotone" aria-hidden />
      </Table.RowAction>
    </Table.RowActions>
  );
}
