import { ChartLineUpIcon } from "@xseeduy/icons/ssr";
import { DataState } from "@xseeduy/ui/base";

export default function MetricsPage() {
  return (
    <DataState
      title="Metrics mockup coming soon"
      description="Delivery and performance metrics will live here."
      media={<ChartLineUpIcon weight="duotone" aria-hidden />}
    />
  );
}
