import type { ReactNode } from "react";
import { CloudIcon, CodeIcon, PaletteIcon } from "@xseeduy/icons/ssr";
import { SubteamCard } from "@xseeduy/ui/main";
import {
  AttritionCard,
  LocationCard,
  TeamGrowthCard,
  TenureCard,
} from "@/components/dashboard/dashboard-cards";
import { SUBTEAMS } from "@/lib/dashboard";

const SUBTEAM_ICONS: Record<string, ReactNode> = {
  frontend: <CodeIcon weight="duotone" />,
  "backend-devops": <CloudIcon weight="duotone" />,
  "design-qa": <PaletteIcon weight="duotone" />,
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-[var(--space-stack-md)]">
      <TeamGrowthCard />
      <div className="grid grid-cols-1 gap-[var(--space-stack-md)] lg:grid-cols-2">
        <TenureCard />
        <AttritionCard />
        <LocationCard frameClassName="lg:col-span-2" />
      </div>
      <section
        aria-labelledby="sub-teams-title"
        className="flex flex-col gap-[var(--space-stack-md)] pt-[var(--space-32)]"
      >
        <h2
          id="sub-teams-title"
          className="text-body-xl-semibold text-text-primary"
        >
          Sub Teams
        </h2>
        <div className="grid grid-cols-1 gap-[var(--space-stack-md)] lg:grid-cols-3">
          {SUBTEAMS.map(({ id, ...team }) => (
            <SubteamCard key={id} icon={SUBTEAM_ICONS[id]} {...team} />
          ))}
        </div>
      </section>
    </div>
  );
}
