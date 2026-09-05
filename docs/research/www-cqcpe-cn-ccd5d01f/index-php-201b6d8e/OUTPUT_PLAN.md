# Output Plan — inner pages

## Target
- **Source origin:** `https://www.cqcpe.cn`
- **Primary pathname:** `/index.php` (query-string routed CMS)
- **Search pathname:** `/` and `/index.php` with `s=news&c=search`

## Isolation keys
- **app-root:** `.` (same Next.js app as the homepage clone)
- **site-key:** `www-cqcpe-cn-ccd5d01f`
- **page-key:** `index-php-201b6d8e` (SHA-256 of `/index.php`, first 8 hex)

## Destination routes
- `/index.php?c=category&id=&page=` → `src/app/index.php/page.tsx`
- `/index.php?c=show&id=` → same route
- `/index.php?s=news&c=search&keyword=&page=` → same route
- `/?s=news&c=search&keyword=` → `src/app/page.tsx` search branch (do not replace homepage)

## Out of scope
- English site `/en/`
- External panorama `https://www.rxcn.net/v2.html`
- WeChat article bodies (keep source meta-refresh / redirect)

## Artifact roots
- Research: `docs/research/www-cqcpe-cn-ccd5d01f/index-php-201b6d8e/`
- Shared components: `src/components/sites/www-cqcpe-cn-ccd5d01f/shared/`
- Catalog: `src/data/cqcpe/catalog.json`
- CMS assets: `public/sites/www-cqcpe-cn-ccd5d01f/cms/`
- Shared images: `public/sites/www-cqcpe-cn-ccd5d01f/shared/`

## Shared foundation
- `next.config.ts` — rewrite `/uploadfile/*` and `/static/default/*` to isolated public dirs
- Homepage `SiteHeader` / footer / customer service reused; inner variant uses white nav + inner logos
- Homepage nav/content hrefs retargeted to local `/index.php?...`
