import { scienceItems, unitFeatured, unitList } from "./content";

export function NewsSections() {
  return (
    <div className="box3 clearfix">
      <div className="boxwd fl">
        <div className="title clearfix">
          <h6>单位动态</h6>
          <a href={`/index.php?c=category&id=287`}>查看更多&gt;</a>
        </div>
        <div className="boxnew margin3">
          <a className="clearfix" href={unitFeatured.href}>
            <h6>
              <img src={unitFeatured.image} alt="" />
            </h6>
            <div className="boxnewnr">
              <span>{unitFeatured.title}</span>
              <p>{unitFeatured.date}</p>
            </div>
          </a>
        </div>
        <ul className="boxnewul clearfix">
          {unitList.map((item) => (
            <li key={item.href}>
              <a className="clearfix" href={item.href}>
                <span>{item.title}</span>
                <p>{item.date}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="boxwd fr clearfix">
        <div className="title clearfix">
          <h6>科普活动</h6>
          <a href={`/index.php?c=category&id=251`}>查看更多&gt;</a>
        </div>
        {scienceItems.map((item, index) => (
          <div className={index === 0 ? "kpwd fl" : "kpwd fr"} key={item.href}>
            <div
              className={
                index === 0 ? "kphdbox margin3" : "kphdbox kphdbd margin3"
              }
            >
              <a href={item.href}>
                <h5>
                  <img src={item.image} alt="" />
                </h5>
                <div className="kphdboxnr">
                  <span>{item.title}</span>
                  <p>{item.excerpt}</p>
                  <h6>{item.date}</h6>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
