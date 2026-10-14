import type { AnnouncementVariant } from "@xseeduy/ui/base";
import type { BottomNavTone } from "@xseeduy/ui/main";

export type PortalNavItem = {
  href: string;
  label: string;
  icon: "dashboard" | "team" | "metrics" | "collaterals";
  /** Mobile bottom-nav colour. Non-status hues, so a tab never reads as success/warning/error. */
  tone: BottomNavTone;
};

export const PORTAL_NAV: PortalNavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard", tone: "brand" },
  { href: "/team", label: "Team", icon: "team", tone: "violet" },
  { href: "/metrics", label: "Metrics", icon: "metrics", tone: "sky" },
  { href: "/collaterals", label: "Collaterals", icon: "collaterals", tone: "magenta" },
];

export type PortalAnnouncement = {
  variant: AnnouncementVariant;
  eyebrow: string;
  title: string;
  description: string;
};

/**
 * The portal's announcement. The MenuBar shows it as a rail card on desktop and
 * the dashboard shows it as a banner on mobile; set to `null` to hide both.
 */
export const PORTAL_ANNOUNCEMENT: PortalAnnouncement | null = {
  variant: "sun",
  eyebrow: "Coming Soon",
  title: "PTO View",
  description: "View and Manage your Team's PTO Request",
};

export const isNavActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export function titleForPath(pathname: string): string {
  const match = PORTAL_NAV.find((item) => isNavActive(pathname, item.href));
  return match?.label ?? "Portal";
}
