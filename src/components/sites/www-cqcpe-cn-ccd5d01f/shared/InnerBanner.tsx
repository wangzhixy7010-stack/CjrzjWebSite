import type { InnerBanner as InnerBannerData } from "@/lib/cqcpe-catalog";
import { resolveSubnavHref, rewriteHref } from "@/lib/cqcpe-catalog";

const DEFAULT_BANNER = "/uploadfile/202507/01ef4d53d564985.jpg";
const BANNER_MASK = "/sites/www-cqcpe-cn-ccd5d01f/shared/images/nybannerbjimg.png";

export function InnerBanner({ banner }: { banner: InnerBannerData }) {
  const image = rewriteHref(banner.image || DEFAULT_BANNER) || DEFAULT_BANNER;
  return (
    <div className="nybanner">
      <div className="nybannerimg">
        <img src={image} alt="" />
      </div>
      <div className="nybannerbj">
        <img src={BANNER_MASK} alt="" />
      </div>
      <div className="nysjlm">
        <div className="wd">
          <div className="nysjlmtitle">{banner.title}</div>
          <ul className="nysjlmul clearfix">
            {banner.subnav.map((item) => (
              <li className={item.on ? "on" : undefined} key={`${item.label}-${item.href}`}>
                <a href={resolveSubnavHref(item.href)}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
