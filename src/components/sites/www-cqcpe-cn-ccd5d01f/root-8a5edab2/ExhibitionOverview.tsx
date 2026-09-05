"use client";

import { useState } from "react";
import { halls } from "./content";

export function ExhibitionOverview() {
  const [active, setActive] = useState(0);

  return (
    <div className="box2 margin3 clearfix">
      <div className="box02bj clearfix">
        <div className="zqyltitle fl">
          <span>展厅一览</span>
          <p>Exhibition Overview</p>
        </div>
        <div className="zqylbox fr">
          <div className="slideTxtBox zqylboxqh clearfix">
            <div className="hd">
              <ul>
                {halls.map((item, index) => (
                  <li
                    key={item.id}
                    className={index === active ? "on" : undefined}
                    onClick={() => setActive(index)}
                  >
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bd">
              {halls.map((item, index) => (
                <ul
                  key={item.id}
                  className="clearfix"
                  style={{ display: index === active ? "block" : "none" }}
                >
                  <li>
                    <a href={item.href}>
                      <span>
                        <img src={item.image} alt={item.name} />
                      </span>
                      {item.description ? (
                        <div className="zqylfont">
                          <p>{item.description}</p>
                        </div>
                      ) : (
                        <div className="zqylfont">
                          <p />
                        </div>
                      )}
                    </a>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
