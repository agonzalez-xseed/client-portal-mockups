import {
  AttritionCard,
  LocationCard,
  TeamGrowthCard,
  TenureCard,
} from "@/components/dashboard/dashboard-cards";
import { SubteamCard } from "@/components/dashboard/subteam-card";
import { DocumentsTable } from "@/components/documents-table";
import { SUBTEAMS } from "@/lib/dashboard";
import { GENERAL_DOCUMENTS } from "@/lib/documents";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-[var(--space-stack-md)]">
      <TeamGrowthCard />
      <div className="grid grid-cols-1 gap-[var(--space-stack-md)] lg:grid-cols-4">
        <TenureCard />
        <AttritionCard />
        <LocationCard className="lg:col-span-2" />
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
          {SUBTEAMS.map((team) => (
            <SubteamCard key={team.id} {...team} />
          ))}
        </div>
      </section>
      <DocumentsTable
        title="Collaterals"
        data={GENERAL_DOCUMENTS}
        framed
        className="pt-[var(--space-32)]"
      />
    </div>
  );
}
