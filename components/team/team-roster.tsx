"use client";

import Link from "next/link";
import { useMemo } from "react";
import { SquaresFourIcon, TableIcon } from "@xseeduy/icons";
import { Avatar, Badge } from "@xseeduy/ui/base";
import {
  DataTable,
  STATUS_TONE,
  Tabs,
  TeamMemberCard,
  type DataTableColumn,
} from "@xseeduy/ui/main";
import { CountryFlag } from "@/components/country-flag";
import {
  formatRate,
  formatTimeShift,
  utcOffset,
  type TeamRosterMember,
  type UserTimezone,
} from "@/lib/team";
import { useUserTimezone } from "@/lib/user-timezone";

const buildColumns = (
  zone: UserTimezone,
): DataTableColumn<TeamRosterMember>[] => [
  {
    id: "member",
    header: "Member",
    accessor: (row) => row.name,
    sortable: true,
    hideable: false,
    cell: (row) => (
      <span className="inline-flex min-w-0 items-center gap-[var(--space-inline-sm)]">
        <Avatar size="sm" src={row.avatarSrc} alt={row.name} />
        <Link
          href={`/team/${row.id}`}
          className="min-w-0 truncate text-body-md-semibold text-text-primary transition-colors duration-[var(--duration-fast)] ease-standard hover:text-text-link active:text-text-link-hover"
        >
          {row.name}
        </Link>
      </span>
    ),
  },
  {
    id: "role",
    header: "Role",
    accessor: (row) => row.role,
    sortable: true,
    cell: (row) => <span className="text-text-secondary">{row.role}</span>,
  },
  {
    id: "country",
    header: "Country",
    accessor: (row) => row.country,
    sortable: true,
    cell: (row) => (
      <span className="inline-flex items-center gap-[var(--space-inline-sm)] text-text-secondary">
        <CountryFlag code={row.countryCode} />
        {row.country}
      </span>
    ),
  },
  {
    id: "contract",
    header: "Contract",
    accessor: (row) => row.contract,
    sortable: true,
    cell: (row) => (
      <Badge tone={STATUS_TONE[row.contract]} variant="subtle">
        {row.contract}
      </Badge>
    ),
  },
  {
    id: "since",
    header: "Since",
    accessor: (row) => row.sinceIso,
    sortable: true,
    cell: (row) => <span className="text-text-secondary">{row.since}</span>,
  },
  {
    id: "timeShift",
    header: "Time Shift",
    accessor: (row) => utcOffset(row),
    sortable: true,
    cell: (row) => (
      <span className="text-text-secondary">{formatTimeShift(row, zone)}</span>
    ),
  },
  {
    id: "rate",
    header: "Rate",
    accessor: (row) => row.rate,
    sortable: true,
    align: "end",
    cell: (row) => (
      <span className="text-text-secondary">{formatRate(row.rate)}</span>
    ),
  },
];

export function TeamRoster({ members }: { members: TeamRosterMember[] }) {
  const { zone } = useUserTimezone();
  const columns = useMemo(() => buildColumns(zone), [zone]);

  return (
    <Tabs defaultValue="table" size="sm" className="pt-[var(--space-32)]">
      <div className="flex items-center justify-between gap-[var(--space-inline-md)]">
        <h2 className="text-body-xl-semibold text-text-primary">Xseed Team</h2>
        <Tabs.List variant="segmented">
          <Tabs.Trigger value="table" aria-label="Table view">
            <TableIcon />
          </Tabs.Trigger>
          <Tabs.Trigger value="grid" aria-label="Grid view">
            <SquaresFourIcon />
          </Tabs.Trigger>
        </Tabs.List>
      </div>
      <Tabs.Content value="table">
        <DataTable
          data={members}
          columns={columns}
          getRowId={(row) => row.id}
          searchPlaceholder="Search team..."
          defaultPageSize={10}
        />
      </Tabs.Content>
      <Tabs.Content value="grid">
        <ul className="grid grid-cols-1 gap-[var(--space-stack-md)] md:grid-cols-2 xl:grid-cols-3">
          {members.map((member) => (
            <li key={member.id} className="min-w-0">
              <TeamMemberCard
                name={member.name}
                href={`/team/${member.id}`}
                role={member.role}
                location={member.country}
                flag={<CountryFlag code={member.countryCode} />}
                timeShift={formatTimeShift(member, zone)}
                since={member.since}
                rate={formatRate(member.rate)}
                status={member.contract}
                avatarSrc={member.avatarSrc}
              />
            </li>
          ))}
        </ul>
      </Tabs.Content>
    </Tabs>
  );
}
