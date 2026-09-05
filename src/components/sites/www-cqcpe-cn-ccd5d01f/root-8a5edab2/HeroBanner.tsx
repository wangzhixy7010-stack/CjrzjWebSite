"use client";

import { useEffect, useState } from "react";
import { banners } from "./content";

export function HeroBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % banners.length);
    }, 2500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="banner">
      <div id="slideBox" className="bannerindex">
        <div className="bd">
          <ul>
            {banners.map((src, i) => (
              <li
                key={src}
                style={{ display: i === index ? "list-item" : "none" }}
              >
                <img src={src} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
