import { PAGE_ASSETS, SHARED_ASSETS, visitIcons } from "./content";

export function VisitServices() {
  return (
    <div className="box01 clearfix">
      <div className="cgfwbox fl clearfix">
        <div className="cgfw fl">
          <div className="cgfwtitle">参观服务</div>
          <ul className="cgfwtime margin3 clearfix">
            <li>
              <p>开馆时间</p>
              <span>09:00</span>
            </li>
            <li>
              <p>停止进馆</p>
              <span>16:30</span>
            </li>
            <li>
              <p>闭馆时间</p>
              <span>17:00</span>
            </li>
          </ul>
          <div className="cgfwzysx">
            免费向社会公众开放，每周一闭馆，节假日开馆时间以公告为准
          </div>
          <ul className="cgfwico clearfix">
            {visitIcons.map((item) => (
              <li key={item.label}>
                <a href={item.href}>
                  <span>
                    <img src={item.icon} alt="" />
                  </span>
                  <p>{item.label}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="jjyy fr">
          <h6>讲解预约</h6>
          <span>
            <img src={`${PAGE_ASSETS}/images/wechat-qr.jpg`} alt="微信公众号" />
            <p>微信公众号</p>
          </span>
        </div>
      </div>
      <div className="qjmy fr">
        <a href="https://www.rxcn.net/v2.html">
          <img src={`${SHARED_ASSETS}/images/qjmy01.jpg`} alt="全景漫游" />
        </a>
      </div>
    </div>
  );
}
