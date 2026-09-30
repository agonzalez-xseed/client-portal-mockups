import * as Flags from "country-flag-icons/react/3x2";
import { cn } from "@xseeduy/ui/utils";

type FlagComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * Circled country flag. Temporary override until core-ui exports one; uses
 * the same country-flag-icons set core-ui's TeamMap renders internally.
 */
export function CountryFlag({
  code,
  className,
}: {
  /** ISO 3166-1 alpha-2, e.g. "UY". */
  code: string;
  className?: string;
}) {
  const Flag = (Flags as unknown as Record<string, FlagComponent | undefined>)[
    code.toUpperCase()
  ];
  if (!Flag) return null;

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-[var(--icon-sm)] shrink-0 items-center justify-center overflow-hidden rounded-full",
        "border border-border-subtle",
        className
      )}
    >
      <Flag className="h-full w-auto max-w-none shrink-0" />
    </span>
  );
}
