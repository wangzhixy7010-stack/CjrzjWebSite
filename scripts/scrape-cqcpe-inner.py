#!/usr/bin/env python3
"""Scrape cqcpe.cn inner pages into local JSON + download referenced assets."""

from __future__ import annotations

import hashlib
import json
import re
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse, parse_qs, urlencode, urlunparse

ORIGIN = "https://www.cqcpe.cn"
ROOT = Path("/Users/xg/Documents/CjrzjWebSite")
DATA = ROOT / "src/data/cqcpe"
CMS_PUBLIC = ROOT / "public/sites/www-cqcpe-cn-ccd5d01f/cms"
SHARED_IMG = ROOT / "public/sites/www-cqcpe-cn-ccd5d01f/shared/images"
UA = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
}

SEED_CATS = [
    235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248,
    249, 250, 251, 253, 254, 256, 258, 259, 260, 261, 263, 264, 265,
    266, 267, 268, 269, 275, 276, 287, 290, 291, 292, 293, 294, 295,
    46, 144, 160, 252, 255, 257, 296,
]


def fetch(url: str) -> tuple[str, str, dict[str, str]]:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=40) as res:
        headers = {k.lower(): v for k, v in res.headers.items()}
        raw = res.read()
        charset = "utf-8"
        ctype = headers.get("content-type", "")
        m = re.search(r"charset=([\w-]+)", ctype, re.I)
        if m:
            charset = m.group(1)
        html = raw.decode(charset, "replace")
        return res.geturl(), html, headers


def page_title(html: str) -> str:
    m = re.search(r"<title>([^<]+)</title>", html, re.I)
    return m.group(1).strip() if m else ""


def wechat_redirect(html: str) -> str | None:
    m = re.search(
        r'<meta[^>]+http-equiv=["\']refresh["\'][^>]+url=([^"\'>\s]+)',
        html,
        re.I,
    )
    if m:
        return m.group(1).strip()
    return None


class FragmentExtractor(HTMLParser):
    def __init__(self, start_class_tokens: tuple[str, ...]):
        super().__init__(convert_charrefs=False)
        self.start_class_tokens = start_class_tokens
        self.capture = False
        self.depth = 0
        self.chunks: list[str] = []
        self.found = False

    def handle_starttag(self, tag: str, attrs):
        attrs_d = dict(attrs)
        cls = attrs_d.get("class", "")
        tokens = set(cls.split())
        if not self.capture and tokens.intersection(self.start_class_tokens) and (
            ("padding7" in tokens and "main" in tokens)
            or ("nymain" in tokens)
        ):
            self.capture = True
            self.found = True
            self.depth = 1
            self.chunks.append(self.get_starttag_text() or "")
            return
        if self.capture:
            if tag not in {"br", "img", "meta", "link", "input", "hr", "source"}:
                self.depth += 1
            self.chunks.append(self.get_starttag_text() or "")

    def handle_startendtag(self, tag: str, attrs):
        if self.capture:
            self.chunks.append(self.get_starttag_text() or "")

    def handle_endtag(self, tag: str):
        if not self.capture:
            return
        self.chunks.append(f"</{tag}>")
        if tag not in {"br", "img", "meta", "link", "input", "hr", "source"}:
            self.depth -= 1
            if self.depth <= 0:
                self.capture = False

    def handle_data(self, data: str):
        if self.capture:
            self.chunks.append(data)

    def handle_entityref(self, name: str):
        if self.capture:
            self.chunks.append(f"&{name};")

    def handle_charref(self, name: str):
        if self.capture:
            self.chunks.append(f"&#{name};")


def extract_main(html: str) -> str:
    parser = FragmentExtractor(("padding7", "nymain"))
    try:
        parser.feed(html)
    except Exception:
        pass
    return "".join(parser.chunks)


def extract_banner(html: str) -> dict:
    title_m = re.search(
        r'<div class="nysjlmtitle">([^<]*)</div>', html
    )
    items = []
    block = re.search(
        r'<ul class="nysjlmul clearfix">(.*?)</ul>', html, re.S
    )
    if block:
        for m in re.finditer(
            r'<li class="([^"]*)">\s*<a href="([^"]*)"[^>]*>([^<]*)</a>',
            block.group(1),
        ):
            items.append(
                {
                    "on": "on" in m.group(1).split(),
                    "href": m.group(2),
                    "label": m.group(3).strip(),
                }
            )
    banner_img = re.search(
        r'<div class="nybannerimg"><img src="([^"]+)"', html
    )
    return {
        "title": title_m.group(1).strip() if title_m else "",
        "subnav": items,
        "image": banner_img.group(1) if banner_img else "/uploadfile/202507/01ef4d53d564985.jpg",
    }


def collect_ids(html: str) -> tuple[set[int], set[int], set[int]]:
    cats = {int(x) for x in re.findall(r"c=category&id=(\d+)", html)}
    shows = {int(x) for x in re.findall(r"c=show&id=(\d+)", html)}
    pages = {int(x) for x in re.findall(r"[?&]page=(\d+)", html)}
    return cats, shows, pages


def rewrite_html(html: str) -> str:
    html = html.replace("https://www.cqcpe.cn/index.php", "/index.php")
    html = html.replace("http://www.cqcpe.cn/index.php", "/index.php")
    html = html.replace("https://www.cqcpe.cn/uploadfile", "/uploadfile")
    html = html.replace("http://www.cqcpe.cn/uploadfile", "/uploadfile")
    html = html.replace("javascript:;", "#")
    html = html.replace("javscript:;", "#")
    return html


def asset_urls(html: str) -> set[str]:
    urls = set()
    for m in re.finditer(r'(?:src|href)=["\']([^"\']+)["\']', html):
        u = m.group(1)
        if u.startswith("/uploadfile/") or u.startswith("/static/default/"):
            urls.add(urljoin(ORIGIN, u))
        elif "cqcpe.cn/uploadfile/" in u or "cqcpe.cn/static/default/" in u:
            urls.add(u)
    for m in re.finditer(r'url\(["\']?([^"\')]+)["\']?\)', html):
        u = m.group(1)
        if u.startswith("/uploadfile/") or u.startswith("/static/default/"):
            urls.add(urljoin(ORIGIN, u))
    return urls


def local_path_for(url: str) -> Path:
    path = urlparse(url).path
    if path.startswith("/uploadfile/"):
        return CMS_PUBLIC / path.lstrip("/")
    if path.startswith("/static/default/web/img/"):
        return SHARED_IMG / Path(path).name
    if path.startswith("/static/default/images/"):
        return SHARED_IMG / Path(path).name
    if path.startswith("/static/default/"):
        return CMS_PUBLIC / path.lstrip("/")
    digest = hashlib.sha256(url.encode()).hexdigest()[:12]
    return CMS_PUBLIC / "misc" / f"{digest}{Path(path).suffix or '.bin'}"


def download_asset(url: str) -> None:
    dest = local_path_for(url)
    if dest.exists() and dest.stat().st_size > 0:
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers=UA)
    try:
        with urllib.request.urlopen(req, timeout=40) as res, dest.open("wb") as f:
            f.write(res.read())
    except Exception as exc:
        print("asset fail", url, exc)


def parse_category(cat_id: int, html: str, page: int) -> dict:
    banner = extract_banner(html)
    body = rewrite_html(extract_main(html))
    return {
        "kind": "category",
        "id": cat_id,
        "page": page,
        "title": page_title(html),
        "banner": banner,
        "html": body,
        "hasNymain": "nymain" in html,
        "hasNyxq": "nyxq.css" in html,
    }


def parse_show(show_id: int, html: str) -> dict:
    redirect = wechat_redirect(html)
    if redirect:
        return {
            "kind": "show",
            "id": show_id,
            "title": page_title(html) or f"文章 {show_id}",
            "redirect": redirect,
            "banner": extract_banner(html),
            "html": "",
            "hasNyxq": False,
        }
    banner = extract_banner(html)
    body = rewrite_html(extract_main(html))
    return {
        "kind": "show",
        "id": show_id,
        "title": page_title(html),
        "redirect": None,
        "banner": banner,
        "html": body,
        "hasNyxq": "nyxq.css" in html,
        "hasNymain": "nymain" in html,
    }


def main() -> None:
    DATA.mkdir(parents=True, exist_ok=True)
    CMS_PUBLIC.mkdir(parents=True, exist_ok=True)

    cat_pages: dict[str, dict] = {}
    show_pages: dict[str, dict] = {}
    seen_cats: set[tuple[int, int]] = set()
    pending_cats: list[tuple[int, int]] = [(i, 1) for i in SEED_CATS]
    pending_shows: set[int] = set()
    all_assets: set[str] = set()

    chrome = [
        f"{ORIGIN}/uploadfile/202507/7c57fc2c6957bcd.png",
        f"{ORIGIN}/uploadfile/202507/01ef4d53d564985.jpg",
        f"{ORIGIN}/static/default/web/img/nybannerbjimg.png",
        f"{ORIGIN}/static/default/web/img/wzxz02.png",
        f"{ORIGIN}/static/default/web/img/serch02.png",
        f"{ORIGIN}/static/default/web/img/timeico.png",
        f"{ORIGIN}/static/default/web/img/jtimg05.png",
        f"{ORIGIN}/static/default/web/img/jtimg06.png",
    ]
    all_assets.update(chrome)

    while pending_cats:
        cat_id, page = pending_cats.pop(0)
        key = (cat_id, page)
        if key in seen_cats:
            continue
        seen_cats.add(key)
        qs = urlencode({"c": "category", "id": cat_id, **({"page": page} if page > 1 else {})})
        url = f"{ORIGIN}/index.php?{qs}"
        try:
            _final, html, _ = fetch(url)
        except Exception as exc:
            print("cat fail", cat_id, page, exc)
            continue
        parsed = parse_category(cat_id, html, page)
        cat_pages[f"{cat_id}-{page}"] = parsed
        all_assets |= asset_urls(html)
        cats, shows, pages = collect_ids(html)
        pending_shows |= shows
        for cid in cats:
            if (cid, 1) not in seen_cats:
                pending_cats.append((cid, 1))
        for p in pages:
            if (cat_id, p) not in seen_cats:
                pending_cats.append((cat_id, p))
        print(f"cat {cat_id} p{page} shows+={len(shows)} pending_cats={len(pending_cats)} pending_shows={len(pending_shows)}", flush=True)

    shows_list = sorted(pending_shows)
    print("fetching", len(shows_list), "articles")

    def load_show(sid: int) -> tuple[int, dict | None, set[str]]:
        url = f"{ORIGIN}/index.php?c=show&id={sid}"
        try:
            _final, html, _ = fetch(url)
        except Exception as exc:
            print("show fail", sid, exc)
            return sid, None, set()
        parsed = parse_show(sid, html)
        return sid, parsed, asset_urls(html)

    with ThreadPoolExecutor(max_workers=6) as pool:
        futs = [pool.submit(load_show, sid) for sid in shows_list]
        for fut in as_completed(futs):
            sid, parsed, assets = fut.result()
            if parsed:
                show_pages[str(sid)] = parsed
                all_assets |= assets
                kind = "redirect" if parsed.get("redirect") else "html"
                print(f"show {sid} {kind}", flush=True)

    print("downloading", len(all_assets), "assets", flush=True)
    catalog = {
        "categories": cat_pages,
        "shows": show_pages,
        "counts": {"categories": len(cat_pages), "shows": len(show_pages), "assets": len(all_assets)},
    }
    (DATA / "catalog.json").write_text(json.dumps(catalog, ensure_ascii=False))
    print("wrote catalog before assets", DATA / "catalog.json", catalog["counts"], flush=True)

    with ThreadPoolExecutor(max_workers=6) as pool:
        list(pool.map(download_asset, sorted(all_assets)))

    print("done", catalog["counts"], flush=True)


if __name__ == "__main__":
    main()
