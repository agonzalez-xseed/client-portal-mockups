export type PortalNavItem = {
  href: string;
  label: string;
  icon: "dashboard" | "team" | "metrics" | "collaterals";
};

export const PORTAL_NAV: PortalNavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/team", label: "Team", icon: "team" },
  { href: "/metrics", label: "Metrics", icon: "metrics" },
  { href: "/collaterals", label: "Collaterals", icon: "collaterals" },
];

export function titleForPath(pathname: string): string {
  const match = PORTAL_NAV.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );
  return match?.label ?? "Portal";
}
