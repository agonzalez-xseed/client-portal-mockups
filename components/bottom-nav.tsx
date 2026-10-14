"use client";

import { cloneElement, isValidElement } from "react";
import { cn } from "@xseeduy/ui/utils";

/**
 * Mobile primary navigation: a pill floating above the bottom of the viewport.
 * Local override until core-ui ships one; mirrors MenuBar's API so the swap is
 * an import change. Meant for 3–5 destinations. Built like core-ui's segmented
 * Tabs (a framed pill around a pill track) since the system has no shadows.
 */
function BottomNav({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      data-slot="bottom-nav"
      className={cn(
        "fixed inset-x-[var(--space-8)] z-[var(--z-sticky)]",
        "bottom-[calc(var(--space-12)+env(safe-area-inset-bottom))]",
        "rounded-pill border border-border-subtle bg-surface-subtle p-[var(--space-2)]",
        className,
      )}
      {...props}
    >
      <ul
        data-slot="bottom-nav-track"
        className={cn(
          "flex items-stretch gap-[var(--space-2)] rounded-pill border border-border-subtle bg-surface-default p-[var(--space-2)]",
          "transition-colors",
          MOTION,
          TRACK_TONE,
        )}
      >
        {children}
      </ul>
    </nav>
  );
}

/** Same tones as core-ui MetricCard, so a colour reads the same across the system. */
export type BottomNavTone =
  | "brand"
  | "info"
  | "success"
  | "warning"
  | "critical"
  | "violet"
  | "magenta"
  | "sky";

/**
 * The tab track takes the selected tab's bold surface, matched with CSS
 * :has(). Full class strings, since Tailwind can't see interpolated names.
 */
const TRACK_TONE = [
  "has-[[data-active][data-tone=brand]]:bg-surface-brand has-[[data-active][data-tone=brand]]:border-border-brand",
  "has-[[data-active][data-tone=info]]:bg-surface-info-bold has-[[data-active][data-tone=info]]:border-border-info",
  "has-[[data-active][data-tone=success]]:bg-surface-success-bold has-[[data-active][data-tone=success]]:border-border-success",
  "has-[[data-active][data-tone=warning]]:bg-surface-warning-bold has-[[data-active][data-tone=warning]]:border-border-warning",
  "has-[[data-active][data-tone=critical]]:bg-surface-critical-bold has-[[data-active][data-tone=critical]]:border-border-critical",
  "has-[[data-active][data-tone=violet]]:bg-surface-violet-bold has-[[data-active][data-tone=violet]]:border-border-violet",
  "has-[[data-active][data-tone=magenta]]:bg-surface-magenta-bold has-[[data-active][data-tone=magenta]]:border-border-magenta",
  "has-[[data-active][data-tone=sky]]:bg-surface-sky-bold has-[[data-active][data-tone=sky]]:border-border-sky",
];

/**
 * Unselected tabs sit on the coloured track, so they use the track's
 * `text-on-*` (dark or light per theme) instead of the neutral greys. The
 * :has() ancestor match keeps it keyed to the selected tab, not this one.
 */
const IDLE_ON_TRACK = [
  "[[data-slot=bottom-nav-track]:has([data-active][data-tone=brand])_&]:text-text-on-brand",
  "[[data-slot=bottom-nav-track]:has([data-active][data-tone=info])_&]:text-text-on-info",
  "[[data-slot=bottom-nav-track]:has([data-active][data-tone=success])_&]:text-text-on-success",
  "[[data-slot=bottom-nav-track]:has([data-active][data-tone=warning])_&]:text-text-on-warning",
  "[[data-slot=bottom-nav-track]:has([data-active][data-tone=critical])_&]:text-text-on-critical",
  "[[data-slot=bottom-nav-track]:has([data-active][data-tone=violet])_&]:text-text-on-violet",
  "[[data-slot=bottom-nav-track]:has([data-active][data-tone=magenta])_&]:text-text-on-magenta",
  "[[data-slot=bottom-nav-track]:has([data-active][data-tone=sky])_&]:text-text-on-sky",
];

type BottomNavItemProps = {
  icon: React.ReactNode;
  active?: boolean;
  /** While this tab is selected, the tab track takes this colour and the tab becomes a plain default-surface pill. */
  tone?: BottomNavTone;
  /** Element to render as, typically a framework `Link`; its props are merged. */
  render?: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  children: React.ReactNode;
};

/** Shared timing for the tab's width, label reveal and colour. */
const MOTION =
  "duration-[var(--duration-slow)] ease-spring motion-reduce:transition-none";

function BottomNavItem({
  icon,
  active,
  tone,
  render,
  children,
}: BottomNavItemProps) {
  const className = cn(
    "flex h-[var(--control-lg)] w-full min-w-0 items-center justify-center rounded-pill px-[var(--space-12)]",
    "text-label-sm text-text-secondary no-underline",
    "transition-colors",
    MOTION,
    "hover:bg-surface-hover hover:text-text-primary",
    "focus-visible:[outline:2px_solid_var(--color-border-focus)] focus-visible:-outline-offset-2",
    active
      ? tone
        ? "bg-surface-default text-text-primary hover:bg-surface-default"
        : "bg-surface-selected text-text-primary hover:bg-surface-selected"
      : [
          IDLE_ON_TRACK,
          "[[data-slot=bottom-nav-track]:has([data-active][data-tone])_&]:hover:bg-surface-default/20",
        ],
  );

  const content = (
    <>
      <span
        aria-hidden
        className={cn(
          "flex shrink-0 items-center justify-center [&_svg]:size-[var(--icon-md)]",
          "transition-colors",
          MOTION,
          active ? "text-icon-primary" : ["text-icon-secondary", IDLE_ON_TRACK],
        )}
      >
        {icon}
      </span>
      {/* Stays in the DOM when collapsed so it remains the link's accessible name. */}
      <span
        className={cn(
          "grid min-w-0 transition-[grid-template-columns,opacity]",
          MOTION,
          active ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0",
        )}
      >
        <span className="min-w-0 overflow-hidden">
          <span className="block truncate whitespace-nowrap pl-[var(--space-6)]">
            {children}
          </span>
        </span>
      </span>
    </>
  );

  const itemProps = {
    "data-slot": "bottom-nav-item",
    "data-active": active || undefined,
    "data-tone": tone,
    "aria-current": active ? ("page" as const) : undefined,
    className,
  };

  return (
    <li
      className={cn(
        "flex min-w-0 basis-0 transition-[flex-grow]",
        MOTION,
        active ? "grow-[2.5]" : "grow",
      )}
    >
      {isValidElement(render) ? (
        cloneElement(render, {
          ...itemProps,
          className: cn(className, render.props.className),
          children: content,
        })
      ) : (
        <button type="button" {...itemProps}>
          {content}
        </button>
      )}
    </li>
  );
}

const BottomNavNamespace = Object.assign(BottomNav, { Item: BottomNavItem });

export { BottomNavNamespace as BottomNav };
