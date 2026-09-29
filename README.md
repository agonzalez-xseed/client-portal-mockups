# Client Portal Mockups

Mockups to explore client portal improvement ideas, built with the Xseed design system (`@xseeduy/ui`, `@xseeduy/tokens`, `@xseeduy/icons`).

## Setup

Packages are published to GitHub Packages. Authenticate once per machine:

```bash
gh auth refresh -h github.com -s read:packages
npm config set //npm.pkg.github.com/:_authToken="$(gh auth token)"
```

Then install and run:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — `/` redirects to Collaterals.

## Routes

| Path | Status |
| --- | --- |
| `/collaterals` | Full mock (General + Your Documents tables) |
| `/dashboard` | Placeholder |
| `/team` | Placeholder |
| `/metrics` | Placeholder |

## Notes

- Shell is composed `MenuBar` + `PageHeader` (not `AdminShell`).
- Document view/download actions are inert placeholders — no real PDFs yet.
