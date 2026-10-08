"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import { Select } from "@xseeduy/ui/base";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@xseeduy/ui/chart";
import { Card, TeamMap } from "@xseeduy/ui/main";
import { cn } from "@xseeduy/ui/utils";
import {
  ACTIVE_HEADCOUNT,
  ATTRITION_RATE,
  DEPARTURES,
  HEADCOUNT,
  TEAM_MEMBERS,
  TENURE_AVG_MONTHS,
  TENURE_BUCKETS,
  TOTAL_MEMBERS,
} from "@/lib/dashboard";
import { CountryFlag } from "@/components/country-flag";
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatMonth(iso: string) {
  const [year, month] = iso.split("-");
  return `${MONTHS[Number(month) - 1]} '${year.slice(2)}`;
}

function formatMonthLong(iso: string) {
  const [year, month] = iso.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

const YEAR_OPTIONS = {
  all: "All years",
  "2026": "2026",
  "2025": "2025",
  "2024": "2024",
};

const growthConfig = {
  headcount: { label: "Team size", color: "var(--chart-1)" },
} satisfies ChartConfig;

const tenureConfig = {
  members: { label: "Members", color: "var(--chart-2)" },
} satisfies ChartConfig;

const attritionConfig = {
  departures: { label: "Departures", color: "var(--chart-1)" },
} satisfies ChartConfig;

const AXIS_PROPS = {
  tickLine: false,
  axisLine: false,
  tickMargin: 8,
} as const;

/** core-ui Card has no headline-metric slot; plain markup on DS type tokens. */
function HeaderMetric({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex h-[var(--control-sm)] shrink-0 items-center gap-[var(--space-inline-xs)] rounded-[var(--radius-6)] bg-surface-muted px-[var(--space-inline-sm)]">
      <span className="text-body-md text-text-secondary">{label}:</span>
      <span className="text-body-md-semibold text-text-primary">{value}</span>
    </div>
  );
}

const HEADER_ROW =
  "flex-row items-start justify-between gap-[var(--space-inline-md)] pt-[var(--space-8)] pr-[var(--space-8)]";

const FOOTER_TEXT = "text-body-sm";

export function TeamGrowthCard() {
  const [year, setYear] = useState<string>("all");

  const data = useMemo(
    () =>
      year === "all"
        ? HEADCOUNT
        : HEADCOUNT.filter((point) => point.month.startsWith(year)),
    [year],
  );

  const quarterTicks = data
    .map((point) => point.month)
    .filter((month) => ["01", "04", "07", "10"].includes(month.slice(5)));

  const range = `${formatMonthLong(data[0].month)} – ${formatMonthLong(data[data.length - 1].month)}`;

  return (
    <Card>
      <Card.Header className={HEADER_ROW}>
        <div className="flex min-w-0 flex-col gap-[var(--space-stack-xs)]">
          <Card.Title>Team Growth</Card.Title>
          <Card.Description>Cumulative headcount · {range}</Card.Description>
        </div>
        <div className="flex shrink-0 items-start gap-[var(--space-6)]">
          <Select.Root
            items={YEAR_OPTIONS}
            value={year}
            onValueChange={(value) => setYear(value ?? "all")}
          >
            <Select.Trigger size="sm" aria-label="Year" className="w-[7.5rem]">
              <Select.Value />
            </Select.Trigger>
            <Select.Popup>
              {Object.entries(YEAR_OPTIONS).map(([value, label]) => (
                <Select.Item key={value} value={value}>
                  {label}
                </Select.Item>
              ))}
            </Select.Popup>
          </Select.Root>
          <HeaderMetric value={ACTIVE_HEADCOUNT} label="Active" />
        </div>
      </Card.Header>
      <Card.Content className="pt-[var(--space-12)]">
        <ChartContainer
          config={growthConfig}
          className="aspect-auto h-[13rem] w-full"
        >
          <LineChart
            data={data}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              ticks={quarterTicks}
              tickFormatter={formatMonth}
              {...AXIS_PROPS}
            />
            <YAxis
              domain={[0, 20]}
              ticks={[0, 5, 10, 15, 20]}
              {...AXIS_PROPS}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => formatMonth(String(label))}
                />
              }
            />
            <ReferenceLine
              y={ACTIVE_HEADCOUNT}
              stroke="var(--color-border-strong)"
              strokeDasharray="4 4"
            />
            <Line
              dataKey="headcount"
              type="monotone"
              stroke="var(--color-headcount)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </Card.Content>
      <Card.Footer>
        <Card.Description className={FOOTER_TEXT}>
          Dashed line indicates current active headcount ({ACTIVE_HEADCOUNT}).
        </Card.Description>
      </Card.Footer>
    </Card>
  );
}

export function TenureCard() {
  return (
    <Card>
      <Card.Header className={HEADER_ROW}>
        <div className="flex min-w-0 flex-col gap-[var(--space-stack-xs)]">
          <Card.Title>Tenure Avg</Card.Title>
          <Card.Description>
            Distribution of months on the team
          </Card.Description>
        </div>
        <HeaderMetric value={`${TENURE_AVG_MONTHS} mo`} label="Avg tenure" />
      </Card.Header>
      <Card.Content className="flex-1 pt-[var(--space-12)]">
        <ChartContainer
          config={tenureConfig}
          className="aspect-auto h-[15rem] w-full"
        >
          <BarChart
            data={TENURE_BUCKETS}
            margin={{ top: 8, right: 0, left: -24, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="bucket" {...AXIS_PROPS} />
            <YAxis domain={[0, 12]} ticks={[0, 3, 6, 9, 12]} {...AXIS_PROPS} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="members"
              fill="var(--color-members)"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </Card.Content>
      <Card.Footer>
        <Card.Description className={FOOTER_TEXT}>
          Across {TOTAL_MEMBERS} members (active + inactive)
        </Card.Description>
      </Card.Footer>
    </Card>
  );
}

export function AttritionCard() {
  const total = DEPARTURES.reduce((sum, row) => sum + row.departures, 0);
  const first = DEPARTURES[0].month;
  const last = DEPARTURES[DEPARTURES.length - 1].month;

  return (
    <Card>
      <Card.Header className={HEADER_ROW}>
        <div className="flex min-w-0 flex-col gap-[var(--space-stack-xs)]">
          <Card.Title>Attrition</Card.Title>
          <Card.Description>Monthly departures over time</Card.Description>
        </div>
        <HeaderMetric
          value={`${total} (${Math.round(ATTRITION_RATE * 100)}%)`}
          label="Attrition"
        />
      </Card.Header>
      <Card.Content className="flex-1 pt-[var(--space-12)]">
        <ChartContainer
          config={attritionConfig}
          className="aspect-auto h-[15rem] w-full"
        >
          <BarChart
            data={DEPARTURES}
            margin={{ top: 8, right: 0, left: -24, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" interval={2} {...AXIS_PROPS} />
            <YAxis
              domain={[0, 4]}
              ticks={[0, 1, 2, 3, 4]}
              allowDecimals={false}
              {...AXIS_PROPS}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="departures"
              fill="var(--color-departures)"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </Card.Content>
      <Card.Footer>
        <Card.Description className={FOOTER_TEXT}>
          Monthly departures · {first} – {last}
        </Card.Description>
      </Card.Footer>
    </Card>
  );
}

export function LocationCard({
  frameClassName,
}: {
  frameClassName?: string;
}) {
  const byCountry = useMemo(() => {
    const counts = new Map<string, { code?: string; count: number }>();
    for (const member of TEAM_MEMBERS) {
      const country = member.country ?? "Unknown";
      const entry = counts.get(country) ?? {
        code: member.countryCode,
        count: 0,
      };
      entry.count += 1;
      counts.set(country, entry);
    }
    return [...counts.entries()]
      .map(([country, entry]) => ({ country, ...entry }))
      .sort((a, b) => b.count - a.count);
  }, []);

  return (
    <Card frameClassName={frameClassName}>
      <Card.Header className={HEADER_ROW}>
        <div className="flex min-w-0 flex-col gap-[var(--space-stack-xs)]">
          <Card.Title>Location</Card.Title>
          <Card.Description>
            {TEAM_MEMBERS.length} members across {byCountry.length} countries
          </Card.Description>
        </div>
        <HeaderMetric value={byCountry.length} label="Countries" />
      </Card.Header>
      <Card.Content className="flex flex-1 flex-col p-0">
        <TeamMap members={TEAM_MEMBERS} className="border-0" />
      </Card.Content>
      <Card.Footer>
        <Card.Description
          className={cn(
            FOOTER_TEXT,
            "flex flex-wrap items-center gap-x-[var(--space-inline-sm)] gap-y-[var(--space-stack-xs)]",
          )}
        >
          {byCountry.map(({ country, code, count }, index) => (
            <span
              key={country}
              className="inline-flex items-center gap-[var(--space-inline-sm)]"
            >
              {index > 0 && <span aria-hidden>·</span>}
              {code && <CountryFlag code={code} />}
              {country} {count}
            </span>
          ))}
        </Card.Description>
      </Card.Footer>
    </Card>
  );
}
