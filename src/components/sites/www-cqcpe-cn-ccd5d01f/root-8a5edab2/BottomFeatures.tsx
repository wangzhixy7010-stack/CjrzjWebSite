import { PAGE_ASSETS, aboutText } from "./content";

export function BottomFeatures() {
  return (
    <div className="box5 margin3 clearfix">
      <ul className="cjhtbox fl clearfix">
        <li>
          <a href={`/index.php?c=category&id=239`}>
            <img src={`${PAGE_ASSETS}/images/promo-postdoc.jpg`} alt="博士后工作站" />
          </a>
        </li>
        <li>
          <a href={`/index.php?c=category&id=241`}>
            <img src={`${PAGE_ASSETS}/images/promo-creative.png`} alt="文创作品" />
          </a>
        </li>
      </ul>
      <div className="bshgzz fl">
        <div className="bshgzzbox">
          <div className="bshgzzboxtitle">单位概况</div>
          <div className="bshgzzboxnr">{aboutText}</div>
          <a
            className="bshgzzboxxq"
            href={`/index.php?c=category&id=242#show258`}
          >
            查看详情
          </a>
        </div>
      </div>
      <div className="sp fl">
        <div className="title clearfix">
          <h6>视频</h6>
          <a href={`/index.php?c=category&id=276`}>查看更多</a>
        </div>
        <div className="spbox margin3">
          <video
            className="edui-upload-video vjs-default-skin video-js"
            src={`${PAGE_ASSETS}/videos/intro.mp4`}
            poster={`${PAGE_ASSETS}/images/video-poster.png`}
            controls
            autoPlay
            muted
            playsInline
          />
        </div>
      </div>
    </div>
  );
}
