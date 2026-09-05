# Output Plan

## Target
- **Source URL:** https://www.cqcpe.cn/
- **Normalized origin:** `https://www.cqcpe.cn`
- **Normalized pathname:** `/`

## Isolation keys
- **app-root:** `.` (repository root)
- **site-key:** `www-cqcpe-cn-ccd5d01f` (SHA-256 of origin, first 8 hex)
- **page-key:** `root-8a5edab2` (SHA-256 of `/`, first 8 hex)

## Destination
- **Route:** `/` via `src/app/page.tsx`
- **Rationale:** First single-URL clone on an untouched template scaffold. Existing `src/app/page.tsx` is the placeholder ("Clone target not yet built") and may be replaced.

## Artifact roots
- Research: `docs/research/www-cqcpe-cn-ccd5d01f/root-8a5edab2/`
- Screenshots: `docs/design-references/www-cqcpe-cn-ccd5d01f/root-8a5edab2/`
- Components: `src/components/sites/www-cqcpe-cn-ccd5d01f/root-8a5edab2/`
- Shared components: `src/components/sites/www-cqcpe-cn-ccd5d01f/shared/`
- Assets: `public/sites/www-cqcpe-cn-ccd5d01f/root-8a5edab2/`
- Shared assets: `public/sites/www-cqcpe-cn-ccd5d01f/shared/`
- Downloader: `scripts/download-assets-www-cqcpe-cn-ccd5d01f-root-8a5edab2.mjs`

## Existing inventory (pre-clone)
- Routes: `src/app/page.tsx` (scaffold only), `src/app/_not-found` implicit
- Site components: none
- Research: `docs/research/INSPECTION_GUIDE.md` only
- Public assets: empty `.gitkeep` placeholders
- Collisions: none

## Shared foundation files that will change
- `src/app/layout.tsx` — fonts, lang, metadata for this single-site app
- `src/app/globals.css` — merge target design tokens
- `src/app/page.tsx` — replace scaffold with clone

## Multi-origin / multi-page
- Single origin, single homepage URL. No collision or layout-mix decision needed.
