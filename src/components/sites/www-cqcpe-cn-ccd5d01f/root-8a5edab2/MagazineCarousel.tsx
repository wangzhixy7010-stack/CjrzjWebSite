"use client";

import { useEffect, useState } from "react";
import { magazines } from "./content";

export function MagazineCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % magazines.length);
    }, 2500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="boxwd fr">
      <div className="title clearfix">
        <h6>城市地理</h6>
        <a href={`/index.php?c=category&id=240`}>查看更多&gt;</a>
      </div>
      <div id="slideBox" className="csdlbox margin3">
        <div className="bd">
          <ul className="clearfix">
            {magazines.map((item, i) => (
              <li
                key={item.href}
                style={{ display: i === index ? "list-item" : "none" }}
              >
                <a href={item.href}>
                  <div className="csdlboximg">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="csdlboxnr">
                    <div className="csdlboxnrtitle clearfix">
                      <span>{item.title}</span>
                      <p />
                    </div>
                    <div className="csdlboxul clearfix">
                      <p>{item.sponsor}</p>
                      <p>{item.language}</p>
                      <p>{item.date}</p>
                    </div>
                    <h6 className="csdlboxckxq">查看详情</h6>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a
          className="prev"
          href="#prev"
          onClick={(event) => {
            event.preventDefault();
            setIndex((current) =>
              current === 0 ? magazines.length - 1 : current - 1,
            );
          }}
        />
        <a
          className="next"
          href="#next"
          onClick={(event) => {
            event.preventDefault();
            setIndex((current) => (current + 1) % magazines.length);
          }}
        />
      </div>
    </div>
  );
}
