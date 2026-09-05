"use client";

import { PAGE_ASSETS, SHARED_ASSETS, friendLinks } from "./content";

export function SiteFooter() {
  return (
    <div className="bqmain">
      <div className="wd">
        <div className="bqtop clearfix">
          <div className="bqtoplogo">
            <a href="/">
              <img
                src={`${PAGE_ASSETS}/images/footer-logo.png`}
                alt="重庆市规划展览馆"
              />
            </a>
          </div>
          <div className="bqtopbox clearfix">
            <ul className="bqnr clearfix">
              <li>地址：重庆市南岸区南滨路弹子石广场</li>
              <li>电话：023-63730777</li>
              <li>邮箱：cqsghzlg2005@163.com</li>
            </ul>
            <div className="bqwem">
              <span>
                <img src={`${PAGE_ASSETS}/images/wechat-qr.jpg`} alt="微信公众号" />
              </span>
              <h6>
                <img src={`${SHARED_ASSETS}/images/bqico01.png`} alt="" />
              </h6>
            </div>
          </div>
          <div className="bqtopright">
            <span>友情链接</span>
            <div className="cyljul">
              <h6>请选择</h6>
              <div className="cyljbox">
                <ul>
                  {friendLinks.map((link) => (
                    <li key={link.label}>
                      <a>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bqbottom clearfix">
          <p>版权所有 重庆市规划展览馆</p>
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
            渝ICP备14001723号-3
          </a>
          <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=50010302002400号"
            target="_blank"
            rel="noreferrer"
          >
            渝公网安备 50010302002400号
          </a>
        </div>
      </div>
    </div>
  );
}
