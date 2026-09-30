"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  BookOpenIcon,
  ChartLineUpIcon,
  SquaresFourIcon,
  UsersIcon,
} from "@xseeduy/icons";
import { Avatar, type UiMode } from "@xseeduy/ui/base";
import {
  MenuBar,
  PageHeader,
  PageHeaderPerson,
  PageHeaderTitle,
  useMenuBar,
} from "@xseeduy/ui/main";
import { PORTAL_NAV, titleForPath } from "./portal-nav";

const NAV_ICONS = {
  dashboard: SquaresFourIcon,
  team: UsersIcon,
  metrics: ChartLineUpIcon,
  collaterals: BookOpenIcon,
} as const;

const PORTAL_USER = {
  name: "Alex Stone",
  role: "Client Admin",
  initials: "AS",
} as const;

function BrandHeader() {
  const { collapsed } = useMenuBar();

  return (
    <MenuBar.Header>
      {!collapsed && (
        <Link
          href="/collaterals"
          className="min-w-0 truncate pl-[var(--space-6)] text-h6 text-text-primary no-underline"
        >
          Xseed
        </Link>
      )}
      <MenuBar.Trigger className={collapsed ? undefined : "ml-auto"} />
    </MenuBar.Header>
  );
}

function AccountMenu() {
  const { theme, setTheme } = useTheme();
  const mode: UiMode =
    theme === "light" || theme === "dark" || theme === "system"
      ? theme
      : "system";

  return (
    <PageHeaderPerson
      name={PORTAL_USER.name}
      role={PORTAL_USER.role}
      mode={mode}
      onModeChange={setTheme}
      onLogout={() => {
        // Mock portal — logout is inert for now.
      }}
      avatar={
        <Avatar
          size="sm"
          shape="square"
          alt={PORTAL_USER.name}
          initials={PORTAL_USER.initials}
        />
      }
    />
  );
}

export function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = titleForPath(pathname);

  return (
    <div className="flex h-full min-h-0">
      <MenuBar
        className="shrink-0"
        announcement={{
          variant: "sun",
          action: { label: "Visit Roadmap" },
          className: "p-[var(--space-2)]",
        }}
      >
        <BrandHeader />
        <MenuBar.Content>
          <MenuBar.Group>
            {PORTAL_NAV.map((item) => {
              const Icon = NAV_ICONS[item.icon];
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <MenuBar.Item
                  key={item.href}
                  render={<Link href={item.href} />}
                  icon={<Icon weight="duotone" />}
                  active={active}
                >
                  {item.label}
                </MenuBar.Item>
              );
            })}
          </MenuBar.Group>
        </MenuBar.Content>
      </MenuBar>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <PageHeader>
          <PageHeaderTitle>{title}</PageHeaderTitle>
          <AccountMenu />
        </PageHeader>
        <div className="min-h-0 flex-1 overflow-y-auto bg-surface-page p-[var(--space-inset-xl)]">
          {children}
        </div>
      </div>
    </div>
  );
}
