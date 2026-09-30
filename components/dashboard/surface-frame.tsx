import { cn } from "@xseeduy/ui/utils";

/** Inset panel radius; pairs with SurfaceFrame's --space-2 padding. */
export const FRAMED_PANEL =
  "rounded-[var(--radius-10)] border border-border-subtle bg-surface-default";

/** Subtle outer frame shared by dashboard cards. Not a core-ui component. */
export function SurfaceFrame({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-surface border border-border-subtle bg-surface-subtle p-[var(--space-2)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
