import { createWriteStream } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSET_ROOT = path.join(
  ROOT,
  "public/sites/www-cqcpe-cn-ccd5d01f/root-8a5edab2",
);
const SHARED_ROOT = path.join(
  ROOT,
  "public/sites/www-cqcpe-cn-ccd5d01f/shared",
);

const assets = [
  // Shared chrome
  ["https://www.cqcpe.cn/static/default/web/img/wzxz01.png", "shared", "images/wzxz01.png"],
  ["https://www.cqcpe.cn/static/default/web/img/serch.png", "shared", "images/serch.png"],
  ["https://www.cqcpe.cn/static/default/web/img/sjcd.png", "shared", "images/sjcd.png"],
  ["https://www.cqcpe.cn/static/default/web/img/kgsj01.png", "shared", "images/kgsj01.png"],
  ["https://www.cqcpe.cn/static/default/web/img/kgsj02.png", "shared", "images/kgsj02.png"],
  ["https://www.cqcpe.cn/static/default/web/img/kgsj03.png", "shared", "images/kgsj03.png"],
  ["https://www.cqcpe.cn/static/default/web/img/kgsj04.png", "shared", "images/kgsj04.png"],
  ["https://www.cqcpe.cn/static/default/web/img/qjmy01.jpg", "shared", "images/qjmy01.jpg"],
  ["https://www.cqcpe.cn/static/default/web/img/xtbj01.png", "shared", "images/xtbj01.png"],
  ["https://www.cqcpe.cn/static/default/web/img/jtimg01.png", "shared", "images/jtimg01.png"],
  ["https://www.cqcpe.cn/static/default/web/img/jtimg02.png", "shared", "images/jtimg02.png"],
  ["https://www.cqcpe.cn/static/default/web/img/jtimg03.png", "shared", "images/jtimg03.png"],
  ["https://www.cqcpe.cn/static/default/web/img/jtimg04.png", "shared", "images/jtimg04.png"],
  ["https://www.cqcpe.cn/static/default/web/img/cjhtbj01.jpg", "shared", "images/cjhtbj01.jpg"],
  ["https://www.cqcpe.cn/static/default/images/znzs.png", "shared", "images/znzs.png"],
  ["https://www.cqcpe.cn/static/default/web/img/bqico01.png", "shared", "images/bqico01.png"],
  ["https://www.cqcpe.cn/static/default/web/img/newyear.jpg", "page", "images/newyear.jpg"],
  // Logo & banners
  ["https://www.cqcpe.cn/uploadfile/202507/0a0e8ce4e3d107e.png", "page", "images/logo.png"],
  ["https://www.cqcpe.cn/uploadfile/202507/c3889f9d34931a8.png", "page", "images/footer-logo.png"],
  ["https://www.cqcpe.cn/uploadfile/202507/f6d82e6ce4c191f.jpg", "page", "images/banner-01.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202507/b0907ec5c63fff2.jpg", "page", "images/banner-02.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202507/2adbdcbebe794cd.jpg", "page", "images/wechat-qr.jpg"],
  // Exhibition overview
  ["https://www.cqcpe.cn/uploadfile/202507/60f8e3c4624e72f.jpg", "page", "images/hall-xuting.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202507/6485ef6be9b11e6.jpg", "page", "images/hall-quxian.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202507/995e8295acb4.jpg", "page", "images/hall-shanshui.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202507/adde3627a41fd16.jpg", "page", "images/hall-lishi.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202507/880ab3fad72075.jpg", "page", "images/hall-zhuanxiang.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202508/e26b0c45c222291.jpg", "page", "images/hall-zhanlue.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202508/23331f27d4f477.jpg", "page", "images/hall-zongti.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202508/c34275d8589bf2f.jpg", "page", "images/hall-guojia.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202508/19efe09a0cfcc21.jpg", "page", "images/hall-zhongxin.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202508/ebff46fa90de25f.jpg", "page", "images/hall-meili.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202508/09e980057a0940.jpg", "page", "images/hall-feiyi.jpg"],
  // News / science / magazine / promo
  ["https://www.cqcpe.cn/uploadfile/202608/17191da465799a3.png", "page", "images/news-featured.png"],
  ["https://www.cqcpe.cn/uploadfile/202608/e2b9f0eb9b45727.jpg", "page", "images/science-01.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202608/f01920bbb78e9a1.png", "page", "images/science-02.png"],
  ["https://www.cqcpe.cn/uploadfile/202608/d3203414287c4eb.jpg", "page", "images/mag-188.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202607/f3275afa1aaf1e0.jpg", "page", "images/mag-187.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202606/60bf4d31329cf2e.jpg", "page", "images/mag-186.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202605/dcbc1cadd3f2ed0.jpg", "page", "images/mag-185.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202604/c21ac1da4aeefc6.jpg", "page", "images/mag-184.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202507/1b7ca32db9b7e4a.jpg", "page", "images/promo-postdoc.jpg"],
  ["https://www.cqcpe.cn/uploadfile/202507/317f02e49a9986d.png", "page", "images/promo-creative.png"],
  ["https://www.cqcpe.cn/uploadfile/202507/index-video.png", "page", "images/video-poster.png"],
];

const videos = [
  [
    "https://www.cqcpe.cn/uploadfile/ueditor/video/202211/1669108985cfd082.mp4",
    "page",
    "videos/intro.mp4",
  ],
];

async function download(url, dest) {
  await mkdir(path.dirname(dest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${res.status} ${url}`);
  }
  if (!res.body) {
    throw new Error(`empty body ${url}`);
  }
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
}

async function run() {
  const results = [];
  const queue = [...assets, ...videos];
  const concurrency = 4;
  let i = 0;

  async function worker() {
    while (i < queue.length) {
      const idx = i++;
      const [url, ns, rel] = queue[idx];
      const dest = path.join(ns === "shared" ? SHARED_ROOT : ASSET_ROOT, rel);
      try {
        await download(url, dest);
        results.push({ url, dest: dest.replace(ROOT + "/", ""), ok: true });
        console.log("ok", rel);
      } catch (err) {
        results.push({ url, dest: dest.replace(ROOT + "/", ""), ok: false, error: String(err) });
        console.error("fail", rel, err);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  await writeFile(
    path.join(ROOT, "docs/research/www-cqcpe-cn-ccd5d01f/root-8a5edab2/ASSET_MANIFEST.json"),
    JSON.stringify(results, null, 2),
  );
  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.error(`Failed ${failed.length}/${results.length}`);
    process.exitCode = 1;
  } else {
    console.log(`Downloaded ${results.length} assets`);
  }
}

run();
