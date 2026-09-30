import { Avatar } from "@xseeduy/ui/base";
import { cn } from "@xseeduy/ui/utils";
import type { Subteam, SubteamPerson } from "@/lib/dashboard";
import { FRAMED_PANEL, SurfaceFrame } from "./surface-frame";

/**
 * Subteam card from the Brand Playbook (Figma 843:139). Not a core-ui
 * component — composed from core-ui Avatar and tokens only.
 */
export function SubteamCard({ name, members, lead }: Subteam) {
  return (
    <SurfaceFrame>
      <div
        className={cn(
          FRAMED_PANEL,
          "flex flex-1 flex-col gap-[var(--space-12)] overflow-clip",
        )}
      >
        <div className="px-[var(--space-12)] pt-[var(--space-8)]">
          <h3 className="text-subheading-sm text-text-primary">{name}</h3>
        </div>

        <PersonRow
          person={lead}
          className="px-[var(--space-12)]"
        />

        <ReportsToDivider
          label={`Team Reporting to ${lead.name.split(" ")[0]}`}
          className="px-[var(--space-12)]"
        />

        {/* flex-1 keeps panel bottoms aligned when teams differ in size. */}
        <ul className="grid flex-1 grid-cols-2 content-start gap-[var(--space-16)] bg-surface-subtle p-[var(--space-12)]">
          {members.map((member) => (
            <li key={member.id} className="min-w-0">
              <PersonRow person={member} />
            </li>
          ))}
        </ul>
      </div>
    </SurfaceFrame>
  );
}

function PersonRow({
  person,
  className,
}: {
  person: SubteamPerson;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-[var(--space-6)]",
        className,
      )}
    >
      <Avatar
        size="lg"
        shape="square"
        src={person.avatarSrc}
        alt={person.name}
        initials={person.initials}
        className="shrink-0"
      />
      <div className="flex min-w-0 flex-col gap-[var(--space-stack-xs)]">
        <p className="truncate text-body-md text-text-secondary">
          {person.name}
        </p>
        <p className="truncate text-caption text-text-tertiary">
          {person.role}
        </p>
      </div>
    </div>
  );
}

/** Dashed connector with end dots and a centered chip label. */
function ReportsToDivider({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="separator"
      aria-label={label}
      className={cn("flex items-center py-[var(--space-4)]", className)}
    >
      <span
        aria-hidden
        className="size-[var(--space-6)] shrink-0 rounded-full bg-border-default"
      />
      <span
        aria-hidden
        className="h-0 flex-1 border-t border-dashed border-border-default"
      />
      <span className="shrink-0 rounded-[var(--radius-4)] bg-surface-subtle px-[var(--space-6)] py-[var(--space-2)] text-note text-text-tertiary">
        {label}
      </span>
      <span
        aria-hidden
        className="h-0 flex-1 border-t border-dashed border-border-default"
      />
      <span
        aria-hidden
        className="size-[var(--space-6)] shrink-0 rounded-full bg-border-default"
      />
    </div>
  );
}
