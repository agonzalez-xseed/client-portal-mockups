"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";
import { DesktopIcon, MoonIcon, SignOutIcon, SunIcon } from "@xseeduy/icons";
import {
  Button,
  Divider,
  SegmentedControl,
  SurfaceFramePanel,
  type UiMode,
} from "@xseeduy/ui/base";
import {
  Popover,
  type PageHeaderPersonProps,
  type PageHeaderTimezoneOption,
} from "@xseeduy/ui/main";
import { cn } from "@xseeduy/ui/utils";

const DEFAULT_TIMEZONE_OPTIONS: PageHeaderTimezoneOption[] = [
  { value: "PST", label: "PST" },
  { value: "MST", label: "MST" },
  { value: "CST", label: "CST" },
  { value: "EST", label: "EST" },
  {
    value: "EU",
    label: "EU",
    tooltip: "European Union",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element -- decorative 16px flag
      <img
        src="/page-header/eu-flag.png"
        alt=""
        className="size-[var(--icon-sm)] shrink-0 rounded-pill"
      />
    ),
  },
];

/** Matches Tailwind's `max-md` so the anchor switch lines up with the CSS. */
const MOBILE_QUERY = "(max-width: 47.999rem)";

function subscribeMobile(onChange: () => void) {
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useIsMobile() {
  return useSyncExternalStore(
    subscribeMobile,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
}

function SettingRow({
  label,
  children,
}: {
  label: string;
  children: (labelId: string) => React.ReactNode;
}) {
  const labelId = useId();

  return (
    <div
      data-slot="page-header-person-setting"
      className="flex flex-col gap-[var(--space-stack-xs)] px-[var(--space-inset-xs)]"
    >
      <span id={labelId} className="text-body-sm text-text-secondary">
        {label}
      </span>
      {children(labelId)}
    </div>
  );
}

/**
 * Local override of core-ui's `PageHeaderPerson` (same props and panel). On
 * mobile the popover anchors to the whole PageHeader instead of the avatar,
 * so it drops down full width like a top action sheet.
 */
export function PageHeaderPerson({
  className,
  avatar,
  name,
  role,
  showMode: showModeProp,
  mode: modeProp,
  defaultMode = "system",
  onModeChange,
  modeLabel = "Theme",
  showTimezone = false,
  timezone: timezoneProp,
  defaultTimezone,
  onTimezoneChange,
  timezoneOptions = DEFAULT_TIMEZONE_OPTIONS,
  timezoneLabel = "Timezone",
  extraSettings,
  showLogout: showLogoutProp,
  onLogout,
  logoutLabel = "Log Out",
  ...props
}: PageHeaderPersonProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const [uncontrolledMode, setUncontrolledMode] = useState<UiMode>(defaultMode);
  const mode = modeProp ?? uncontrolledMode;
  const [uncontrolledTimezone, setUncontrolledTimezone] = useState(
    defaultTimezone ?? timezoneOptions[0]?.value,
  );
  const timezone = timezoneProp ?? uncontrolledTimezone;

  const showIdentity = Boolean(name || role);
  const showMode = showModeProp ?? Boolean(onModeChange);
  const showLogout = showLogoutProp ?? Boolean(onLogout);
  const showSettings = showTimezone || showMode || extraSettings != null;

  const selectMode = (next: UiMode) => {
    if (modeProp === undefined) setUncontrolledMode(next);
    onModeChange?.(next);
  };
  const selectTimezone = (next: string) => {
    if (timezoneProp === undefined) setUncontrolledTimezone(next);
    onTimezoneChange?.(next);
  };

  return (
    <div
      ref={rootRef}
      data-slot="page-header-person"
      className={cn("flex shrink-0 items-center", className)}
      {...props}
    >
      {/* Mobile-only scrim, same token and timing as core-ui's Sheet backdrop.
          Outside presses still reach the Popover, which closes it. */}
      <div
        aria-hidden
        className={cn(
          "fixed inset-0 z-[var(--z-overlay)] bg-surface-scrim md:hidden",
          "transition-opacity duration-[var(--duration-slow)] ease-standard motion-reduce:transition-none",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          aria-label={name ? `Open account menu for ${name}` : "Open account menu"}
          className={cn(
            "inline-flex shrink-0 rounded-[var(--radius-6)]",
            "focus-visible:[outline:2px_solid_var(--color-border-focus)] focus-visible:outline-offset-2",
          )}
        >
          {avatar}
        </Popover.Trigger>
        <Popover.Content
          align={isMobile ? "center" : "end"}
          anchor={
            isMobile
              ? () => rootRef.current?.closest("[data-slot=page-header]") ?? null
              : undefined
          }
          aria-label={name ? `${name} account` : "Account"}
          className={cn(
            "w-[var(--size-menu-wide)] rounded-surface border-border-subtle bg-surface-subtle p-[var(--space-2)]",
            "max-md:w-[calc(var(--anchor-width)-var(--space-16))]",
            "max-md:data-starting-style:scale-100 max-md:data-ending-style:scale-100",
            "max-md:data-starting-style:-translate-y-[var(--space-8)] max-md:data-ending-style:-translate-y-[var(--space-8)]",
          )}
        >
          <SurfaceFramePanel className="gap-[var(--space-stack-md)] p-[var(--space-inset-sm)]">
            {showIdentity && (
              <div
                data-slot="page-header-person-identity"
                className="flex min-w-0 flex-col gap-[var(--space-stack-xs)] px-[var(--space-inset-xs)] pt-[var(--space-2)]"
              >
                {name && (
                  <span className="truncate text-body-lg-semibold text-text-primary">
                    {name}
                  </span>
                )}
                {role && (
                  <span className="truncate text-caption text-text-tertiary">
                    {role}
                  </span>
                )}
              </div>
            )}
            {showIdentity && (showSettings || showLogout) && <Divider />}
            {showTimezone && (
              <SettingRow label={timezoneLabel}>
                {(labelId) => (
                  <SegmentedControl
                    aria-labelledby={labelId}
                    value={timezone}
                    onValueChange={selectTimezone}
                    fullWidth
                  >
                    {timezoneOptions.map((option) => (
                      <SegmentedControl.Item
                        key={option.value}
                        value={option.value}
                        tooltip={option.tooltip}
                      >
                        {option.icon}
                        {option.label}
                      </SegmentedControl.Item>
                    ))}
                  </SegmentedControl>
                )}
              </SettingRow>
            )}
            {showMode && (
              <SettingRow label={modeLabel}>
                {(labelId) => (
                  <SegmentedControl
                    aria-labelledby={labelId}
                    value={mode}
                    onValueChange={selectMode}
                    fullWidth
                  >
                    <SegmentedControl.Item value="system" icon={<DesktopIcon />} label="OS" />
                    <SegmentedControl.Item value="light" icon={<SunIcon />} label="Light" />
                    <SegmentedControl.Item value="dark" icon={<MoonIcon />} label="Dark" />
                  </SegmentedControl>
                )}
              </SettingRow>
            )}
            {extraSettings}
            {showSettings && showLogout && <Divider />}
            {showLogout && (
              <Popover.Close
                render={
                  <Button
                    type="button"
                    tone="ghost"
                    size="sm"
                    className="w-full justify-start text-text-critical hover:bg-surface-critical-subtle"
                    onClick={onLogout}
                  >
                    <SignOutIcon aria-hidden />
                    {logoutLabel}
                  </Button>
                }
              />
            )}
          </SurfaceFramePanel>
        </Popover.Content>
      </Popover>
    </div>
  );
}
