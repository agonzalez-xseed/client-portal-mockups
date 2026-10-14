import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  ClockIcon,
  CurrencyDollarIcon,
  GlobeHemisphereWestIcon,
  UsersThreeIcon,
} from "@xseeduy/icons/ssr";
import { Avatar, Button, CountryFlag } from "@xseeduy/ui/base";
import { MetricCard, ProfileHeader } from "@xseeduy/ui/main";
import {
  MemberDocuments,
  MemberLocation,
  MemberPto,
  MemberReportsTo,
} from "@/components/team/member-records";
import { MemberStatusBadge } from "@/components/team/member-status-badge";
import { MemberTimeShift } from "@/components/team/member-time-shift";
import {
  TEAM_ROSTER,
  formatRate,
  formatTenure,
  getMember,
  managerFor,
  ptoHistoryFor,
  toMapMember,
} from "@/lib/team";

export function generateStaticParams() {
  return TEAM_ROSTER.map((member) => ({ id: member.id }));
}

export default async function TeamMemberPage({
  params,
}: PageProps<"/team/[id]">) {
  const { id } = await params;
  const member = getMember(id);
  if (!member) notFound();

  const { manager, subteam } = managerFor(member);

  return (
    <div className="flex flex-col gap-[var(--space-stack-md)]">
      <ProfileHeader
        className="-mx-[var(--space-inset-xl)] -mt-[var(--space-inset-xl)]"
        action={
          <Button
            tone="utility"
            size="sm"
            render={<Link href="/team" />}
            nativeButton={false}
          >
            <ArrowLeftIcon aria-hidden />
            Back to team
          </Button>
        }
        avatar={
          <Avatar
            size="xl"
            shape="square"
            src={member.avatarSrc}
            alt={member.name}
          />
        }
        name={member.name}
        badge={<MemberStatusBadge status={member.contract} />}
        meta={
          <>
            {member.role} ·
            <CountryFlag code={member.countryCode} />
            <span className="text-text-primary">
              {member.city}, {member.country}
            </span>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-[var(--space-stack-md)] md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          tone="info"
          icon={<ClockIcon weight="duotone" />}
          title="Tenure"
          description={`Started ${member.since}`}
          value={formatTenure(member.sinceIso)}
        />
        <MetricCard
          tone="success"
          icon={<CurrencyDollarIcon weight="duotone" />}
          title="Current rate"
          description="Monthly rate"
          value={formatRate(member.rate)}
        />
        <MetricCard
          tone="violet"
          icon={<GlobeHemisphereWestIcon weight="duotone" />}
          title="Time shift"
          description={`${member.city} · ${member.gmt}`}
          value={<MemberTimeShift member={member} />}
        />
        <MetricCard
          tone="brand"
          icon={<UsersThreeIcon weight="duotone" />}
          title="Subteam"
          description={`Led by ${manager.name}`}
          value={subteam}
          truncateValue
        />
      </div>

      <MemberLocation member={toMapMember(member)} />
      <MemberReportsTo manager={manager} subteam={subteam} />
      <MemberDocuments
        memberId={member.id}
        memberName={member.name}
        since={member.since}
      />
      <MemberPto records={ptoHistoryFor(member)} />
    </div>
  );
}
