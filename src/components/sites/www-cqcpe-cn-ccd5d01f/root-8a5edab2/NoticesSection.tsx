import { notices } from "./content";

export function NoticesSection() {
  return (
    <div className="boxwd fl">
      <div className="title clearfix">
        <h6>通知公告</h6>
        <a href={`/index.php?c=category&id=250`}>查看更多&gt;</a>
      </div>
      <ul className="dqjsul margin3 clearfix">
        {notices.map((item) => (
          <li key={item.href}>
            <a href={item.href}>
              <span>{item.title}</span>
              <p>{item.date}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
