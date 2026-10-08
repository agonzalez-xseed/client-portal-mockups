"use client";

import {
  AirplaneTiltIcon,
  DownloadSimpleIcon,
  EyeIcon,
  FilePdfIcon,
  FilesIcon,
  UserCircleIcon,
} from "@xseeduy/icons";
import {
  Avatar,
  Badge,
  DataState,
  SurfaceFrame,
  type BadgeProps,
} from "@xseeduy/ui/base";
import {
  DataTable,
  Table,
  TeamMap,
  type DataTableColumn,
  type TeamMapMember,
  type SubteamPerson,
} from "@xseeduy/ui/main";
import { SUBTLE_DOTS } from "@xseeduy/ui/utils";
import { formatPtoRange, type PtoRecord, type PtoStatus } from "@/lib/team";

type DocumentRecord = { id: string; document: string; type: string; uploaded: string };
type ReportsToRecord = SubteamPerson & { subteam: string };

const DOCUMENT_COLUMNS: DataTableColumn<DocumentRecord>[] = [
  {
    id: "document",
    header: "Document",
    accessor: (row) => row.document,
    cell: (row) => (
      <span className="inline-flex min-w-0 items-center gap-[var(--space-inline-sm)]">
        <FilePdfIcon
          weight="duotone"
          className="size-[var(--icon-sm)] shrink-0 text-icon-secondary"
          aria-hidden
        />
        <span className="min-w-0 truncate text-text-primary">{row.document}</span>
      </span>
    ),
  },
  {
    id: "type",
    header: "Type",
    accessor: (row) => row.type,
    cell: (row) => <span className="text-text-secondary">{row.type}</span>,
  },
  {
    id: "uploaded",
    header: "Uploaded",
    accessor: (row) => row.uploaded,
    cell: (row) => <span className="text-text-secondary">{row.uploaded}</span>,
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
          aria-label={`View ${row.document}`}
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          <EyeIcon weight="duotone" aria-hidden />
        </Table.RowAction>
        <Table.RowAction
          tone="tertiary"
          aria-label={`Download ${row.document}`}
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

const PTO_STATUS_TONE: Record<PtoStatus, BadgeProps["tone"]> = {
  Approved: "success",
  Pending: "warning",
  Rejected: "critical",
};

const PTO_COLUMNS: DataTableColumn<PtoRecord>[] = [
  {
    id: "type",
    header: "Type",
    accessor: (row) => row.type,
    cell: (row) => <span className="text-text-primary">{row.type}</span>,
  },
  {
    id: "dates",
    header: "Dates",
    accessor: (row) => row.startIso,
    cell: (row) => <span className="text-text-secondary">{formatPtoRange(row)}</span>,
  },
  {
    id: "days",
    header: "Days",
    accessor: (row) => row.days,
    cell: (row) => (
      <span className="text-text-secondary">
        {row.days} {row.days === 1 ? "day" : "days"}
      </span>
    ),
  },
  {
    id: "status",
    header: "Status",
    accessor: (row) => row.status,
    align: "end",
    cell: (row) => (
      <Badge tone={PTO_STATUS_TONE[row.status]} variant="subtle" dot>
        {row.status}
      </Badge>
    ),
  },
];

const REPORTS_TO_COLUMNS: DataTableColumn<ReportsToRecord>[] = [
  {
    id: "name",
    header: "Name",
    accessor: (row) => row.name,
    cell: (row) => (
      <span className="inline-flex min-w-0 items-center gap-[var(--space-inline-sm)]">
        <Avatar
          size="sm"
          src={row.avatarSrc}
          alt={row.name}
          initials={row.initials}
        />
        <span className="min-w-0 truncate text-text-primary">{row.name}</span>
      </span>
    ),
  },
  {
    id: "role",
    header: "Role",
    accessor: (row) => row.role,
    cell: (row) => <span className="text-text-secondary">{row.role}</span>,
  },
  {
    id: "subteam",
    header: "Subteam",
    accessor: (row) => row.subteam,
    cell: (row) => <span className="text-text-secondary">{row.subteam}</span>,
  },
];

/** Flattens DataTable's own frame so the surrounding RecordSection frame is the only one. */
const FLAT_FRAME = "rounded-none border-0 bg-transparent p-0";/** Local copy of core-ui's SurfaceEyebrow (not exported), as used by SubteamCard. */
function RecordSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <SurfaceFrame className={`gap-[var(--space-6)] ${SUBTLE_DOTS}`}>
      <div className="flex items-center gap-[var(--space-inline-sm)] px-[var(--space-6)] pt-[var(--space-4)]">
        <span
          aria-hidden
          className="flex size-[var(--icon-sm)] shrink-0 items-center justify-center text-text-secondary [&_svg]:size-full"
        >
          {icon}
        </span>
        <h2 className="min-w-0 truncate text-body-md text-text-secondary">
          {title}
        </h2>
      </div>
      {children}
    </SurfaceFrame>
  );
}

export function MemberLocation({ member }: { member: TeamMapMember }) {
  return (
    <SurfaceFrame>
      <TeamMap members={[member]} className="rounded-[var(--radius-10)]" />
    </SurfaceFrame>
  );
}

export function MemberReportsTo({
  manager,
  subteam,
}: {
  manager: SubteamPerson;
  subteam: string;
}) {
  return (
    <RecordSection title="Reports to" icon={<UserCircleIcon weight="duotone" />}>
      <DataTable
        data={[{ ...manager, subteam }]}
        columns={REPORTS_TO_COLUMNS}
        getRowId={(row) => row.id}
        searchable={false}
        paginated={false}
        columnsMenu={false}
        frameClassName={FLAT_FRAME}
      />
    </RecordSection>
  );
}

export function MemberDocuments({
  memberId,
  memberName,
  since,
}: {
  memberId: string;
  memberName: string;
  since: string;
}) {
  const documents: DocumentRecord[] = [
    {
      id: `${memberId}-contract`,
      document: `Xseed Contract – ${memberName}.pdf`,
      type: "PDF",
      uploaded: since,
    },
  ];

  return (
    <RecordSection title="Documents" icon={<FilesIcon weight="duotone" />}>
      <DataTable
        data={documents}
        columns={DOCUMENT_COLUMNS}
        getRowId={(row) => row.id}
        searchable={false}
        paginated={false}
        columnsMenu={false}
        frameClassName={FLAT_FRAME}
        empty={<DataState size="sm" title="No documents on file." />}
      />
    </RecordSection>
  );
}

export function MemberPto({ records }: { records: PtoRecord[] }) {
  return (
    <RecordSection title="PTO" icon={<AirplaneTiltIcon weight="duotone" />}>
      <DataTable
        data={records}
        columns={PTO_COLUMNS}
        getRowId={(row) => row.id}
        searchable={false}
        paginated={false}
        columnsMenu={false}
        frameClassName={FLAT_FRAME}
        empty={<DataState size="sm" title="No time off taken yet." />}
      />
    </RecordSection>
  );
}
