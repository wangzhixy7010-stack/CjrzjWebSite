import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

export type InnerSubnavItem = {
  on: boolean;
  href: string;
  label: string;
};

export type InnerBanner = {
  title: string;
  subnav: InnerSubnavItem[];
  image: string;
};

export type CategoryPage = {
  kind: "category";
  id: number;
  page: number;
  title: string;
  banner: InnerBanner;
  html: string;
  hasNymain: boolean;
  hasNyxq: boolean;
};

export type ShowPage = {
  kind: "show";
  id: number;
  title: string;
  redirect: string | null;
  banner: InnerBanner;
  html: string;
  hasNyxq: boolean;
  hasNymain?: boolean;
};

export type Catalog = {
  categories: Record<string, CategoryPage>;
  shows: Record<string, ShowPage>;
  counts: { categories: number; shows: number; assets: number };
};

export type CqcpeQuery = {
  c: string;
  id: number;
  page: number;
  s: string;
  keyword: string;
};

export type SearchHit = {
  id: number;
  title: string;
  date: string;
};

const HASH_PARENT: Record<number, number> = {
  243: 235,
  244: 235,
  245: 235,
  246: 235,
  247: 235,
  248: 235,
  252: 239,
  255: 240,
  257: 240,
  258: 242,
  259: 242,
  260: 242,
  264: 242,
  265: 242,
};

const EMPTY_CATALOG: Catalog = {
  categories: {},
  shows: {},
  counts: { categories: 0, shows: 0, assets: 0 },
};

let cachedCatalog: Catalog | null = null;
let cachedHits: SearchHit[] | null = null;
let cachedMtime = 0;

export function parseCqcpeSearchParams(
  sp: Record<string, string | string[] | undefined>,
): CqcpeQuery {
  const one = (key: string) => {
    const value = sp[key];
    return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
  };
  const page = Number(one("page") || 1);
  return {
    c: one("c"),
    id: Number(one("id") || 0),
    page: Number.isFinite(page) && page > 0 ? page : 1,
    s: one("s"),
    keyword: one("keyword"),
  };
}

export function getCatalog(): Catalog {
  const file = join(process.cwd(), "src/data/cqcpe/catalog.json");
  if (!existsSync(file)) {
    cachedCatalog = null;
    cachedHits = null;
    cachedMtime = 0;
    return EMPTY_CATALOG;
  }
  const mtime = statSync(file).mtimeMs;
  if (cachedCatalog && cachedMtime === mtime) return cachedCatalog;
  cachedMtime = mtime;
  cachedHits = null;
  cachedCatalog = JSON.parse(readFileSync(file, "utf8")) as Catalog;
  return cachedCatalog;
}

export function getCategoryPage(id: number, page: number): CategoryPage | null {
  const catalog = getCatalog();
  return catalog.categories[`${id}-${page}`] ?? catalog.categories[`${id}-1`] ?? null;
}

export function getShowPage(id: number): ShowPage | null {
  return getCatalog().shows[String(id)] ?? null;
}

export function rewriteHref(href: string): string {
  if (!href) return href;
  return href
    .replaceAll("https://www.cqcpe.cn/index.php", "/index.php")
    .replaceAll("http://www.cqcpe.cn/index.php", "/index.php")
    .replaceAll("https://www.cqcpe.cn", "")
    .replaceAll("http://www.cqcpe.cn", "");
}

export function resolveSubnavHref(href: string): string {
  const local = rewriteHref(href);
  const match = local.match(/[?&]id=(\d+)/);
  if (!match) return local;
  const id = Number(match[1]);
  const parent = HASH_PARENT[id];
  if (!parent) return local;
  return `/index.php?c=category&id=${parent}#show${id}`;
}

export function rewriteInnerHtml(html: string): string {
  return html
    .replaceAll("https://www.cqcpe.cn/index.php", "/index.php")
    .replaceAll("http://www.cqcpe.cn/index.php", "/index.php")
    .replaceAll("https://www.cqcpe.cn/uploadfile", "/uploadfile")
    .replaceAll("http://www.cqcpe.cn/uploadfile", "/uploadfile")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replaceAll("javascript:;", "#")
    .replaceAll("javscript:;", "#");
}

export function pageTitle(raw: string, fallback: string): string {
  const trimmed = raw.trim();
  return trimmed || fallback;
}

export function getSearchHits(): SearchHit[] {
  if (cachedHits) return cachedHits;
  const catalog = getCatalog();
  const byId = new Map<number, SearchHit>();
  const listRe =
    /c=show&id=(\d+)[\s\S]*?<span>([\s\S]*?)<\/span>\s*<p>(\d{4}-\d{2}-\d{2})<\/p>/g;
  for (const page of Object.values(catalog.categories)) {
    let match: RegExpExecArray | null;
    const html = page.html;
    listRe.lastIndex = 0;
    while ((match = listRe.exec(html))) {
      const id = Number(match[1]);
      const title = match[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
      byId.set(id, { id, title, date: match[3] });
    }
  }
  for (const show of Object.values(catalog.shows)) {
    if (byId.has(show.id)) continue;
    const dateMatch = show.html.match(/发布时间：(\d{4}-\d{2}-\d{2})/);
    const title = show.title.replace(/_重庆市规划展览馆$/, "").trim();
    byId.set(show.id, {
      id: show.id,
      title: title || `文章 ${show.id}`,
      date: dateMatch?.[1] ?? "",
    });
  }
  cachedHits = [...byId.values()].sort((a, b) => {
    if (a.date === b.date) return b.id - a.id;
    return a.date < b.date ? 1 : -1;
  });
  return cachedHits;
}

export function searchCatalog(keyword: string): SearchHit[] {
  const needle = keyword.trim().toLowerCase();
  if (!needle) return [];
  return getSearchHits().filter((hit) => hit.title.toLowerCase().includes(needle));
}

export function highlightKeyword(title: string, keyword: string): string {
  const needle = keyword.trim();
  if (!needle) return escapeHtml(title);
  const escaped = escapeHtml(title);
  const pattern = new RegExp(escapeRegExp(escapeHtml(needle)), "gi");
  return escaped.replace(
    pattern,
    (chunk) => `<font color="red"><strong>${chunk}</strong></font>`,
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function innerMetadataTitle(query: CqcpeQuery): string {
  if (query.c === "search") {
    const keyword = query.keyword.trim() || "搜索";
    return `${keyword}_重庆市规划展览馆`;
  }
  if (query.c === "category") {
    const page = getCategoryPage(query.id, query.page);
    return pageTitle(page?.title ?? "", "重庆市规划展览馆");
  }
  if (query.c === "show") {
    const page = getShowPage(query.id);
    return pageTitle(page?.title ?? "", "重庆市规划展览馆");
  }
  return "重庆市规划展览馆";
}

export function isSafeHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}
