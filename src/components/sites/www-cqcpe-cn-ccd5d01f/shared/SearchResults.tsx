import {
  highlightKeyword,
  searchCatalog,
} from "@/lib/cqcpe-catalog";
import { InnerBanner } from "./InnerBanner";
import { InnerShell } from "./InnerShell";

const PAGE_SIZE = 20;

function paginationItems(total: number, page: number, keyword: string) {
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE) || 1);
  const current = Math.min(Math.max(page, 1), pages);
  const encoded = encodeURIComponent(keyword);
  const hrefFor = (target: number) =>
    `/index.php?s=news&c=search&keyword=${encoded}${target > 1 ? `&page=${target}` : ""}`;
  const items: { label: string; href?: string; on?: boolean }[] = [
    { label: `共${total}条` },
  ];
  const start = Math.max(1, Math.min(current, Math.max(1, pages - 2)));
  const end = Math.min(pages, start + 2);
  for (let i = start; i <= end; i += 1) {
    items.push(
      i === current
        ? { label: String(i), on: true }
        : { label: String(i), href: hrefFor(i) },
    );
  }
  if (current < pages) {
    items.push({ label: ">", href: hrefFor(current + 1) });
    items.push({ label: ">>", href: hrefFor(pages) });
  }
  return items;
}

export function SearchResults({
  keyword,
  page,
}: {
  keyword: string;
  page: number;
}) {
  const hits = searchCatalog(keyword);
  const pages = Math.max(1, Math.ceil(hits.length / PAGE_SIZE) || 1);
  const current = Math.min(Math.max(page, 1), pages);
  const slice = hits.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const pager = paginationItems(hits.length, current, keyword);

  return (
    <InnerShell>
      <InnerBanner banner={{ title: "", subnav: [], image: "/uploadfile/202507/01ef4d53d564985.jpg" }} />
      <div className="main padding7">
        <div className="wd">
          <div className="nytitle">
            <span>
              <p>搜索结果</p>
            </span>
          </div>
          <ul className="tzggboxul margin3 clearfix">
            {slice.map((hit) => (
              <li key={hit.id}>
                <a href={`/index.php?c=show&id=${hit.id}`}>
                  <h6 />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightKeyword(hit.title, keyword),
                    }}
                  />
                  <p>{hit.date}</p>
                </a>
              </li>
            ))}
          </ul>
          <ul className="pagination fyul margin3">
            {pager.map((item, index) => (
              <li
                className={item.on ? "on" : undefined}
                key={`${item.label}-${index}`}
              >
                {item.href ? <a href={item.href}>{item.label}</a> : <a>{item.label}</a>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </InnerShell>
  );
}
