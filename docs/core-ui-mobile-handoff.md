# core-ui mobile handoff

Mobile rules and components validated in `client-portal-mockups` (branch
`mobile/adaptive-design`) that should move into `@xseeduy/ui` (core-ui).
Each section says what to build or change in core-ui, the exact styling the
portal settled on, and what the portal deletes once core-ui is bumped.

Baseline: `@xseeduy/ui` 1.30.0, tokens 2.5.0, Tailwind v4, base-ui 1.8.0.

## Global conventions

- **Breakpoint.** "Mobile" means below Tailwind `md` (48rem). Use CSS
  (`max-md:` / `md:hidden`) for layout switches. Only use JS where CSS can't
  reach (e.g. a popover anchor); the media query is `(max-width: 47.999rem)`
  so it lines up exactly with `max-md`.
- **Overrides target data-slots.** The portal styles core-ui internals through
  arbitrary variants on `data-slot`s
  (e.g. `[&_[data-slot=metric-card-value]>div]:text-h4`). Every rule below
  that does this should become a first-class responsive style in core-ui.
- **Safe area.** The app sets `viewport.viewportFit = "cover"` so fixed bottom
  UI can pad with `env(safe-area-inset-bottom)`. Document this as a
  requirement for consumers using `BottomNav`.
- **No shadows.** Elevation on mobile is done with framed pills and a scrim
  (`bg-surface-scrim`), same as desktop.

---

## 1. New component: `BottomNav`

Mobile primary navigation replacing `MenuBar` below `md`. A pill floating
above the bottom of the viewport, 3–5 destinations.

**API** (mirrors `MenuBar` so swapping is an import change):

```tsx
<BottomNav aria-label="Primary" className="md:hidden">
  <BottomNav.Item
    render={<Link href="/team" />}
    icon={<UsersIcon weight={active ? "fill" : "duotone"} />}
    active={active}
    tone="violet"
  >
    Team
  </BottomNav.Item>
</BottomNav>
```

- `BottomNav.Item` props: `icon`, `active?`, `tone?: BottomNavTone`,
  `render?` (element to render as, props merged), `children` (label).
- `BottomNavTone = "brand" | "info" | "success" | "warning" | "critical" | "violet" | "magenta" | "sky"`
  (same tone set as `MetricCard`).
- Emits `data-slot="bottom-nav" | "bottom-nav-track" | "bottom-nav-item"`,
  `data-active`, `data-tone`, `aria-current="page"` when active.

**Structure and styling**

- Outer `<nav>` (frame, always neutral):
  `fixed inset-x-[var(--space-8)] bottom-[calc(var(--space-12)+env(safe-area-inset-bottom))] z-[var(--z-sticky)] rounded-pill border border-border-subtle bg-surface-subtle p-[var(--space-2)]`.
- Inner `<ul data-slot="bottom-nav-track">`:
  `flex items-stretch gap-[var(--space-2)] rounded-pill border border-border-subtle bg-surface-default p-[var(--space-2)] transition-colors`.
- `<li>` per item: `flex min-w-0 basis-0 transition-[flex-grow]`; active
  `grow-[2.5]`, inactive `grow`.
- Item: `h-[var(--control-lg)] rounded-pill px-[var(--space-12)] text-label-sm`,
  icon `size-[var(--icon-md)]`.
- Label: always in the DOM (it's the accessible name); collapsed with a
  `grid-cols-[0fr]`/`opacity-0` → `grid-cols-[1fr]`/`opacity-100` transition,
  `pl-[var(--space-6)]`, truncated.
- Motion (width, label reveal, colours):
  `duration-[var(--duration-slow)] ease-spring motion-reduce:transition-none`.

**Tone behaviour** (the validated rule)

1. The outer frame is never coloured.
2. The **track** takes the selected tab's bold tone, keyed with `:has()`:
   `has-[[data-active][data-tone=violet]]:bg-surface-violet-bold has-[[data-active][data-tone=violet]]:border-border-violet`
   (`brand` uses `bg-surface-brand` / `border-border-brand`; the rest
   `bg-surface-{tone}-bold` / `border-border-{tone}`).
3. The **selected tab** becomes a plain `bg-surface-default text-text-primary`
   pill (white in light, dark in dark), icon `text-icon-primary`.
4. **Unselected tabs** on a toned track use the track's `text-on-{tone}`
   for both label and icon (not their own tone colour), and hover with
   `bg-surface-default/20`.
5. With no `tone`, the original neutral styles apply
   (active `bg-surface-selected`, idle `text-text-secondary` /
   `text-icon-secondary`, hover `bg-surface-hover`).

**Shell layout that goes with it**

- `MenuBar` gets `max-md:hidden`.
- The scroll container pads for the nav:
  `max-md:p-[var(--space-inset-lg)] max-md:pb-[calc(var(--space-80)+var(--space-inset-lg)+env(safe-area-inset-bottom))]`.
  Consider exposing this as a token or a shell helper.

Portal tones: Dashboard `brand`, Team `violet`, Metrics `sky`,
Collaterals `magenta`.

**Portal cleanup:** delete `components/bottom-nav.tsx`, import from core-ui.

---

## 2. New component: `AnnouncementBanner` (horizontal `MenuBarAnnouncement`)

On mobile there is no rail, so the rail announcement card is shown as a
full-width banner at the top of the dashboard.

**API**

```tsx
<AnnouncementBanner
  variant="leaf"            // MenuBarAnnouncementVariant
  eyebrow="Coming Soon"
  title="PTO View"
  description="View and Manage your Team's PTO Request"
  image={<img … />}         // optional, defaults to the rail's PTO calendar
  className="md:hidden"
/>
```

**Styling** (same visual language as `MenuBarAnnouncement`):

- Section: `flex w-full flex-col gap-[var(--space-6)] p-[var(--space-2)] rounded-surface border border-border-subtle`,
  variant surface + dot texture
  (`[background-size:var(--space-8)_var(--space-8)]`, radial dot at 14% of
  `--announcement-dot`).
  Variant map: leaf→success, sun→warning, rainbow→info, asterisk→sky,
  double-leaf→violet, bouncy-line→magenta (`bg-surface-{x}-subtle`,
  dot `--color-border-{x}`).
- Eyebrow row: brand mark (`text-mark-{variant}`, `size-[var(--icon-sm)]`) +
  `text-body-md text-text-secondary`, `px-[var(--space-6)] pt-[var(--space-4)]`.
- Body: `SurfaceFrame.Panel` laid out as a row,
  `flex-row items-center gap-[var(--space-inset-md)] p-[var(--space-inset-md)]`;
  image `w-[var(--space-112)] rounded-control`; title
  `text-body-lg-semibold`, description `text-body-md text-text-secondary`.

**Core-ui needs:** export the variant surfaces, marks and default image (or
have `MenuBarAnnouncement` accept `orientation="horizontal"`). The portal
copies all of them today, plus `public/menu-bar-announcement/pto-calendar.jpg`.

**Portal cleanup:** delete `components/announcement-banner.tsx` and the
copied image.

---

## 3. `Table` / `DataTable`: mobile card layout

Below `md`, tables render as stacked cards instead of a horizontal table.
Today this is a sibling component (`MobileDataCards`) rendered next to a
`hidden md:block` `DataTable`; in core-ui it should be built into `Table`
and `DataTable` so consumers pass one set of columns once.

**Card layout**

- One card per row, separated by `divide-y divide-border-subtle`, padding
  `px-[var(--space-inset-md)] py-[var(--space-inset-md)]`,
  `gap-[var(--space-stack-sm)]`.
- First visible field full width; remaining fields in a two-column grid
  (`grid-cols-2 gap-x-[var(--space-inline-md)] gap-y-[var(--space-stack-sm)]`).
- Each field: label `text-label-sm text-text-tertiary` (column header),
  value `text-body-md text-text-primary`. Cell markup built for a table cell
  is allowed to wrap: `min-w-0 break-words`, `.truncate` becomes wrapping,
  `.inline-flex` capped at `max-w-full`.
- **Action columns** (`id === "actions"`, or `fitContent` with no
  `accessor`) render full width at the bottom of the card. Inside the card,
  `Table.RowActions` (icon buttons) are hidden; the cell supplies full-width
  labelled buttons instead (see `DocumentRowActions` below).
- Search: shown only when `searchable` and more than 3 rows; `Input size="sm"`
  with a leading magnifier, in a bordered strip at the top.
- Pagination: `Pagination size="sm"`, centred, wrapping, in a bordered strip
  at the bottom; only when there is more than one page.
- Empty state: the same "No results found" (`MagnifyingGlassMinusIcon`) as
  `DataTable`, or the `empty` prop.
- Sort: `defaultSort` applies to the cards too (same compare as `DataTable`:
  empty last, numeric-aware, case-insensitive).

**Framing**

- Standalone table: `SurfaceFrame` > `SurfaceFramePanel` > cards (the same
  outer frame as desktop).
- Table nested inside another frame (`framed={false}` today): a single panel,
  `overflow-hidden rounded-[var(--radius-10)] border border-border-subtle bg-surface-default`.
  Cards must never sit directly on a dotted frame.

**Portal cleanup:** delete `components/mobile-data-cards.tsx`; remove the
`hidden md:block` wrappers and duplicate `MobileDataCards` calls in
`team-roster.tsx`, `documents-table.tsx` and `team/member-records.tsx`.

---

## 4. Rule: per-column mobile/desktop visibility

Columns choose where they appear. Applies to both `Table` and `DataTable`.

```ts
type DataTableColumn<T> = {
  // …existing
  /** Leave this field out of the mobile cards. Still feeds search and sort. */
  hideOnMobile?: boolean;
  /** Mobile-only column, e.g. a card's full-width "View" button. */
  hideOnDesktop?: boolean;
};
```

- `hideOnMobile`: the field is not rendered in the card, but still counts
  for search and sort.
- `hideOnDesktop`: `DataTable` skips the column on desktop (no header, no
  cell, not listed in the columns menu). The portal strips these with a
  `desktopColumns()` helper today; core-ui should do it internally.

**First uses (Team roster):**

- `hideOnMobile`: Country, Contract, Since, Rate.
- `hideOnDesktop`: a "View" column, rendered as a full-width action at the
  bottom of each card:

  ```tsx
  {
    id: "view", header: "View", fitContent: true, hideable: false,
    searchable: false, hideOnDesktop: true,
    cell: (row) => (
      <Button tone="tertiary" size="sm" className="w-full"
        render={<Link href={`/team/${row.id}`} />} nativeButton={false}>
        View<ArrowRightIcon />
      </Button>
    ),
  }
  ```

**Portal cleanup:** replace `MobileDataTableColumn<T>` with
`DataTableColumn<T>` and drop `desktopColumns()`.

---

## 5. Rule: row actions on mobile

Icon-only `Table.RowAction`s become full-width labelled buttons in the card.
Portal implementation (`components/document-row-actions.tsx`) renders both
and hides one per breakpoint:

- Desktop: `Table.RowActions` with `tone="tertiary"` icon buttons (View,
  Download), unchanged.
- Mobile: `flex w-full gap-[var(--space-inline-sm)]` row of
  `Button tone="tertiary" size="md" className="min-w-0 flex-1"` with icon +
  label, equal width.

**Core-ui:** `Table.RowAction` should render its label (from `aria-label` or
a `label` prop) as a full-width button inside mobile cards, so consumers
don't duplicate markup.

**Portal cleanup:** reduce `DocumentRowActions` to just `Table.RowActions`.

---

## 6. `PageHeaderPerson`: mobile popover

On mobile the account popover becomes a top action sheet.

- **Anchor:** the whole `PageHeader` (`closest("[data-slot=page-header]")`)
  instead of the avatar, `align="center"`. Desktop keeps
  `align="end"` on the avatar.
- **Width:** `max-md:w-[calc(var(--anchor-width)-var(--space-16))]`, i.e.
  full width with `--space-8` each side.
- **Motion:** slides down instead of scaling:
  `max-md:data-starting-style:scale-100 max-md:data-ending-style:scale-100 max-md:data-starting-style:-translate-y-[var(--space-8)] max-md:data-ending-style:-translate-y-[var(--space-8)]`.
- **Scrim:** a mobile-only backdrop behind it, same token and timing as
  `Sheet`:
  `fixed inset-0 z-[var(--z-overlay)] bg-surface-scrim md:hidden transition-opacity duration-[var(--duration-slow)] ease-standard`,
  `opacity-100` when open, `pointer-events-none opacity-0` when closed.
  Outside presses still reach the popover, which closes it.
- Panel content (identity, timezone and theme `SegmentedControl`s, logout)
  is unchanged from core-ui.

Tried and discarded: a bottom `Sheet` / action sheet, and a critical-subtle
logout button on mobile. Keep logout as the existing ghost button with
critical text.

**Core-ui needs:** export `EU_FLAG_SRC` (or the default timezone options);
the portal copies the flag to `public/page-header/eu-flag.png`. Ideally
`Popover.Content` gets a responsive "sheet from top" mode so other header
popovers can reuse it.

**Portal cleanup:** delete `components/page-header-person.tsx` and
`public/page-header/eu-flag.png`; import `PageHeaderPerson` from
`@xseeduy/ui/main` in `portal-shell.tsx`.

---

## 7. `MetricCard`: smaller value on mobile

- Value drops to `text-h4` below `md` (target:
  `[data-slot=metric-card-value] > div`). Layout stays stacked as on desktop.
- Tried and reverted: a side-by-side 70/30 layout with right-aligned values,
  muted unit suffixes ("yrs", "usd") and truncated descriptions.

**Portal cleanup:** delete `components/metric-card.tsx`; import `MetricCard`
from `@xseeduy/ui/main` in `app/(portal)/team/page.tsx` and
`app/(portal)/team/[id]/page.tsx`.

---

## 8. `Card`: optional description on mobile

Chart cards hide their header `Card.Description` below `md` (Team Growth,
Tenure Avg, Attrition). Footers and the Location card keep theirs.

**Core-ui:** a `Card.Description` prop such as `hideOnMobile`, matching the
column flag naming.

**Portal cleanup:** remove `CHART_DESCRIPTION` from
`components/dashboard/dashboard-cards.tsx`.

---

## 9. Rule: tables inside an eyebrow frame

Applies to desktop and mobile. When a table sits inside a dotted
`SurfaceFrame` with an eyebrow (the profile's Reports to, Documents and PTO
sections), there are no nested containers: dotted frame + eyebrow, then one
dark panel that is the table.

- The frame flattens the DataTable frame:
  `frameClassName="rounded-none border-0 bg-transparent p-0"`.
- The DataTable panel (`data-slot=data-table`) is `bg-surface-default p-0`
  (core-ui's default `bg-surface-subtle` blends into the dots).
- The `table-body` loses its own container:
  `rounded-none border-0 bg-transparent`.
- Mobile cards use the single nested panel from section 3.

**Core-ui:** this should be a variant, e.g. `<DataTable variant="embedded">`,
or automatic when the table is inside a `SurfaceFrame` with an eyebrow. That
likely means exporting the eyebrow too (see below).

**Portal cleanup:** remove `FLAT_FRAME` and `TABLE_PANEL` from
`components/team/member-records.tsx`.

---

## Also missing from core-ui (not mobile-specific)

Local replicas the portal keeps because core-ui doesn't export them:

- **`SurfaceEyebrow`**, used by `SubteamCard`. The portal copies it as
  `RecordSection` in `components/team/member-records.tsx` (dotted
  `SurfaceFrame` + icon + `text-body-md text-text-secondary` title).
- **`SUBTLE_DOTS`** is exported, but there is no frame variant that applies
  it, e.g. `<SurfaceFrame texture="dots">`.
- `CountryFlag`, `HeaderMetric`, the profile cover header.

## Bump checklist for the portal

1. Bump `@xseeduy/ui`.
2. Swap imports for `BottomNav`, `AnnouncementBanner`, `PageHeaderPerson`,
   `MetricCard`.
3. Delete the local overrides and copied assets listed above.
4. Collapse each `MobileDataCards` + `hidden md:block` `DataTable` pair into a
   single `DataTable`, keeping the `hideOnMobile` / `hideOnDesktop` flags.
5. Verify at 390px in light and dark: Dashboard, Team, a member profile,
   Collaterals, and the account popover.
