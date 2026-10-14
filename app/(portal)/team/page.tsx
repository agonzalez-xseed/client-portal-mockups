import { BriefcaseIcon, HourglassMediumIcon, UsersIcon } from "@xseeduy/icons/ssr";
import { MetricCard } from "@xseeduy/ui/main";
import { TeamRoster } from "@/components/team/team-roster";
import { TEAM_ROSTER } from "@/lib/team";

export default function TeamPage() {
  const fullTime = TEAM_ROSTER.filter((m) => m.contract === "Full Time").length;

  return (
    <div className="flex flex-col gap-[var(--space-stack-md)]">
      <div className="grid grid-cols-1 gap-[var(--space-stack-md)] md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          tone="info"
          icon={<UsersIcon weight="duotone" />}
          title="Total employees"
          description="Everyone from Xseed"
          value={TEAM_ROSTER.length}
        />
        <MetricCard
          tone="success"
          icon={<BriefcaseIcon weight="duotone" />}
          title="Full-time"
          description="Team members on a full-time contract."
          value={fullTime}
        />
        <MetricCard
          tone="violet"
          icon={<HourglassMediumIcon weight="duotone" />}
          title="Team Tenure"
          description="Average time on the team"
          value="2.4 yrs"
        />
      </div>
      <TeamRoster members={TEAM_ROSTER} />
    </div>
  );
}
