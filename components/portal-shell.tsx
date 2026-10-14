"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenIcon,
  ChartLineUpIcon,
  SquaresFourIcon,
  UsersIcon,
} from "@xseeduy/icons";
import { useTheme } from "next-themes";
import { Avatar, type UiMode } from "@xseeduy/ui/base";
import {
  MenuBar,
  PageHeader,
  PageHeaderPerson,
  PageHeaderTitle,
  useMenuBar,
  type PageHeaderPersonProps,
} from "@xseeduy/ui/main";
import { USER_TIMEZONES, type UserTimezone } from "@/lib/team";
import { UserTimezoneProvider, useUserTimezone } from "@/lib/user-timezone";
import { BottomNav } from "./bottom-nav";
import {
  PORTAL_ANNOUNCEMENT,
  PORTAL_NAV,
  isNavActive,
  titleForPath,
} from "./portal-nav";

const PORTAL_USER = {
  name: "Alex Stone",
  role: "Client Admin",
  initials: "AS",
  avatarSrc: "https://randomuser.me/api/portraits/men/85.jpg",
} as const;

const isUserTimezone = (value: string): value is UserTimezone =>
  value in USER_TIMEZONES;

function AccountMenu() {
  const { theme, setTheme } = useTheme();
  const { zone, setZone } = useUserTimezone();
  const mode: UiMode =
    theme === "light" || theme === "dark" || theme === "system"
      ? theme
      : "system";

  const props: PageHeaderPersonProps = {
    avatar: (
      <Avatar
        size="sm"
        shape="square"
        src={PORTAL_USER.avatarSrc}
        alt={PORTAL_USER.name}
        initials={PORTAL_USER.initials}
      />
    ),
    name: PORTAL_USER.name,
    role: PORTAL_USER.role,
    showTimezone: true,
    timezone: zone,
    onTimezoneChange: (value) => {
      if (isUserTimezone(value)) setZone(value);
    },
    showMode: true,
    mode,
    onModeChange: setTheme,
    onLogout: () => {
      // Mock portal — logout is inert for now.
    },
  };

  return <PageHeaderPerson {...props} />;
}

const NAV_ICONS = {
  dashboard: SquaresFourIcon,
  team: UsersIcon,
  metrics: ChartLineUpIcon,
  collaterals: BookOpenIcon,
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

export function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = titleForPath(pathname);

  return (
    <UserTimezoneProvider>
      <div className="flex h-full min-h-0">
        <MenuBar
          className="shrink-0 max-md:hidden"
          announcement={
            PORTAL_ANNOUNCEMENT ? { ...PORTAL_ANNOUNCEMENT, action: false } : false
          }
        >
          <BrandHeader />
          <MenuBar.Content>
            <MenuBar.Group>
              {PORTAL_NAV.map((item) => {
                const Icon = NAV_ICONS[item.icon];

                return (
                  <MenuBar.Item
                    key={item.href}
                    render={<Link href={item.href} />}
                    icon={<Icon weight="duotone" />}
                    active={isNavActive(pathname, item.href)}
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
          <div
            key={pathname}
            className="page-enter min-h-0 flex-1 overflow-y-auto bg-surface-page p-[var(--space-inset-xl)] max-md:p-[var(--space-inset-lg)] max-md:pb-[calc(var(--space-80)+var(--space-inset-lg)+env(safe-area-inset-bottom))]"
          >
            {children}
          </div>
        </div>
      </div>

      <BottomNav aria-label="Primary" className="md:hidden">
        {PORTAL_NAV.map((item) => {
          const Icon = NAV_ICONS[item.icon];
          const active = isNavActive(pathname, item.href);

          return (
            <BottomNav.Item
              key={item.href}
              render={<Link href={item.href} />}
              icon={<Icon weight={active ? "fill" : "duotone"} />}
              active={active}
              tone={item.tone}
            >
              {item.label}
            </BottomNav.Item>
          );
        })}
      </BottomNav>
    </UserTimezoneProvider>
  );
}
