"use client";

import {
  AsteriskMark,
  BouncyLineMark,
  DoubleLeafMark,
  LeafMark,
  RainbowMark,
  SunMark,
} from "@xseeduy/icons";
import { SurfaceFrame, type MenuBarAnnouncementVariant } from "@xseeduy/ui/base";
import { cn } from "@xseeduy/ui/utils";

/**
 * Horizontal, full-width form of core-ui's MenuBarAnnouncement for layouts
 * without a rail (mobile). Local override: replicates the announcement's
 * variant background, dot texture, brand mark, eyebrow and image, none of
 * which core-ui exports.
 */
const VARIANT_SURFACE: Record<MenuBarAnnouncementVariant, string> = {
  leaf: "bg-surface-success-subtle [--announcement-dot:var(--color-border-success)]",
  sun: "bg-surface-warning-subtle [--announcement-dot:var(--color-border-warning)]",
  rainbow: "bg-surface-info-subtle [--announcement-dot:var(--color-border-info)]",
  asterisk: "bg-surface-sky-subtle [--announcement-dot:var(--color-border-sky)]",
  "double-leaf": "bg-surface-violet-subtle [--announcement-dot:var(--color-border-violet)]",
  "bouncy-line": "bg-surface-magenta-subtle [--announcement-dot:var(--color-border-magenta)]",
};

const MARKS: Record<MenuBarAnnouncementVariant, React.ReactNode> = {
  leaf: <LeafMark className="text-mark-leaf" />,
  sun: <SunMark className="text-mark-sun" />,
  rainbow: <RainbowMark className="text-mark-rainbow" />,
  asterisk: <AsteriskMark className="text-mark-asterisk" />,
  "double-leaf": <DoubleLeafMark className="text-mark-double-leaf" />,
  "bouncy-line": <BouncyLineMark className="text-mark-bouncy-line" />,
};

/** Copy of core-ui's default announcement image (inlined, not exported there). */
const DEFAULT_IMAGE = (
  // eslint-disable-next-line @next/next/no-img-element -- decorative, fixed-size asset; mirrors core-ui's <img>
  <img src="/menu-bar-announcement/pto-calendar.jpg" alt="" width={640} height={395} />
);

export function AnnouncementBanner({
  variant = "leaf",
  eyebrow,
  image = DEFAULT_IMAGE,
  title,
  description,
  className,
}: {
  variant?: MenuBarAnnouncementVariant;
  eyebrow: React.ReactNode;
  /** Graphic left of the text. Decorative. Defaults to the rail card's PTO calendar. */
  image?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      data-slot="announcement-banner"
      data-variant={variant}
      className={cn(
        "flex w-full flex-col gap-[var(--space-6)] p-[var(--space-2)]",
        "rounded-surface border border-border-subtle",
        "[background-size:var(--space-8)_var(--space-8)]",
        "[background-image:radial-gradient(circle,color-mix(in_srgb,var(--announcement-dot)_14%,transparent)_1px,transparent_1px)]",
        VARIANT_SURFACE[variant],
        className,
      )}
    >
      <div className="flex items-center gap-[var(--space-inline-sm)] px-[var(--space-6)] pt-[var(--space-4)]">
        <span
          aria-hidden
          className="flex size-[var(--icon-sm)] shrink-0 items-center justify-center [&_svg]:size-full"
        >
          {MARKS[variant]}
        </span>
        <p className="min-w-0 truncate text-body-md text-text-secondary">{eyebrow}</p>
      </div>
      <SurfaceFrame.Panel className="flex-row items-center gap-[var(--space-inset-md)] p-[var(--space-inset-md)]">
        <div
          aria-hidden
          className="w-[var(--space-112)] shrink-0 overflow-hidden rounded-control [&_img]:block [&_img]:h-auto [&_img]:w-full"
        >
          {image}
        </div>
        <div className="flex min-w-0 flex-col gap-[var(--space-stack-xs)]">
          <h3 className="text-body-lg-semibold text-text-primary">{title}</h3>
          <p className="text-body-md text-text-secondary">{description}</p>
        </div>
      </SurfaceFrame.Panel>
    </section>
  );
}
