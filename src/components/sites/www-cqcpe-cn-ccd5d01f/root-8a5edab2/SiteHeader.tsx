"use client";

import { useEffect, useRef, useState } from "react";
import { navItems, ORIGIN, PAGE_ASSETS, SHARED_ASSETS } from "./content";

const CLOSE_DELAY_MS = 160;

export function SiteHeader({ variant = "home" }: { variant?: "home" | "inner" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState<string | null>(null);
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const logo =
    variant === "inner"
      ? "/uploadfile/202507/7c57fc2c6957bcd.png"
      : `${PAGE_ASSETS}/images/logo.png`;
  const langIcon =
    variant === "inner"
      ? `${SHARED_ASSETS}/images/wzxz02.png`
      : `${SHARED_ASSETS}/images/wzxz01.png`;
  const searchIcon =
    variant === "inner"
      ? `${SHARED_ASSETS}/images/serch02.png`
      : `${SHARED_ASSETS}/images/serch.png`;

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openItem = (label: string) => {
    clearCloseTimer();
    setOpenDesktop(label);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpenDesktop(null);
      closeTimerRef.current = null;
    }, CLOSE_DELAY_MS);
  };

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <>
      <div className="nav">
        <div className="mainwd">
          <div className="navlogo">
            <a href="/">
              <img src={logo} alt="重庆市规划展览馆" />
            </a>
          </div>
          <div className="navright">
            <div className="navrighttop clearfix">
              <div className="navrightbox">
                <img src={langIcon} alt="" />
                <select
                  className="sitebox"
                  defaultValue="/"
                  onChange={(event) => {
                    window.location.href = event.target.value;
                  }}
                >
                  <option value="/">中文</option>
                  <option value={`${ORIGIN}/en/`}>English</option>
                </select>
              </div>
              <div className="serch">
                <form
                  className="clearfix search-form"
                  action="/"
                  method="get"
                >
                  <input type="hidden" name="s" value="news" />
                  <input type="hidden" name="c" value="search" />
                  <input
                    type="text"
                    name="keyword"
                    autoComplete="off"
                    className="text"
                  />
                  <button type="submit" value="搜索" aria-label="搜索">
                    <img src={searchIcon} alt="" />
                  </button>
                </form>
              </div>
            </div>
            <div className="navbox clearfix" onMouseLeave={scheduleClose}>
              {navItems.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const isOpen = openDesktop === item.label;

                return (
                  <div
                    className={`navli${isOpen ? " is-open" : ""}`}
                    key={item.label}
                    onMouseEnter={() => {
                      if (hasChildren) openItem(item.label);
                      else {
                        clearCloseTimer();
                        setOpenDesktop(null);
                      }
                    }}
                  >
                    <div className={`navyjlm${isOpen ? " on" : ""}`}>
                      <a
                        href={item.href}
                        aria-haspopup={hasChildren ? "true" : undefined}
                        aria-expanded={hasChildren ? isOpen : undefined}
                      >
                        {item.label}
                      </a>
                    </div>
                    {hasChildren ? (
                      <div
                        className="nav_erji"
                        aria-hidden={!isOpen}
                        onMouseEnter={() => openItem(item.label)}
                      >
                        <ul className="xlul clearfix">
                          {item.children!.map((child) => (
                            <li key={child.label}>
                              <a href={child.href}>{child.label}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div id="header" className="topnav">
        <div className="menua fr">
          <a
            className="menu_btn"
            href="#menu"
            onClick={(event) => {
              event.preventDefault();
              setMenuOpen((open) => !open);
            }}
          >
            <img src={`${SHARED_ASSETS}/images/sjcd.png`} alt="菜单" />
          </a>
        </div>
        <div
          className="menu_bg"
          style={{ display: menuOpen ? "block" : "none" }}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className="menu"
          style={{
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            display: "block",
            transition: "transform 0.3s ease",
          }}
        >
          <ul className="nav_right">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.children?.length ? "#submenu" : item.href}
                  className={openMobile === item.label ? "active" : undefined}
                  onClick={(event) => {
                    if (!item.children?.length) return;
                    event.preventDefault();
                    setOpenMobile((current) =>
                      current === item.label ? null : item.label,
                    );
                  }}
                >
                  {item.label}
                </a>
                {item.children && openMobile === item.label ? (
                  <div className="ejlm" style={{ display: "block" }}>
                    {item.children.map((child) => (
                      <a key={child.label} href={child.href}>
                        {child.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
