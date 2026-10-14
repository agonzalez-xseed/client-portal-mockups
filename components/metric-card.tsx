import { MetricCard as CoreMetricCard } from "@xseeduy/ui/main";
import { cn } from "@xseeduy/ui/utils";

/**
 * Local override of core-ui's `MetricCard`: on mobile the value uses a smaller
 * type style. Targets core-ui's own data-slot, so it stays in sync with its markup.
 */
const MOBILE_VALUE = "max-md:[&_[data-slot=metric-card-value]>div]:text-h4";

export function MetricCard({
  className,
  ...props
}: React.ComponentProps<typeof CoreMetricCard>) {
  return <CoreMetricCard className={cn(MOBILE_VALUE, className)} {...props} />;
}
