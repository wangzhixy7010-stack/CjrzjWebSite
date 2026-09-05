import { redirect } from "next/navigation";
import {
  getCategoryPage,
  getShowPage,
  isSafeHttpUrl,
  rewriteInnerHtml,
  type CqcpeQuery,
} from "@/lib/cqcpe-catalog";
import { InnerBanner } from "./InnerBanner";
import { InnerHtml } from "./InnerHtml";
import { InnerShell } from "./InnerShell";
import { SearchResults } from "./SearchResults";

const EMPTY_BANNER = {
  title: "",
  subnav: [],
  image: "/uploadfile/202507/01ef4d53d564985.jpg",
};

function Missing({ title }: { title: string }) {
  return (
    <InnerShell>
      <InnerBanner banner={{ ...EMPTY_BANNER, title }} />
      <div className="main padding7">
        <div className="wd">
          <div className="nytitle">
            <span>
              <p>{title || "页面不存在"}</p>
            </span>
          </div>
        </div>
      </div>
    </InnerShell>
  );
}

export function InnerApp({ query }: { query: CqcpeQuery }) {
  if (query.c === "search") {
    return <SearchResults keyword={query.keyword} page={query.page} />;
  }

  if (query.c === "category") {
    const page = getCategoryPage(query.id, query.page);
    if (!page) return <Missing title="页面不存在" />;
    return (
      <InnerShell>
        <InnerBanner banner={page.banner} />
        <InnerHtml html={rewriteInnerHtml(page.html)} />
      </InnerShell>
    );
  }

  if (query.c === "show") {
    const page = getShowPage(query.id);
    if (!page) return <Missing title="页面不存在" />;
    if (page.redirect && isSafeHttpUrl(page.redirect)) {
      redirect(page.redirect);
    }
    return (
      <InnerShell>
        <InnerBanner banner={page.banner} />
        <InnerHtml html={rewriteInnerHtml(page.html)} />
      </InnerShell>
    );
  }

  return <Missing title="页面不存在" />;
}
