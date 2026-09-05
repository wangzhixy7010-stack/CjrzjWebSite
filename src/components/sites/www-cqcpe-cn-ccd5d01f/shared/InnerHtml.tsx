"use client";

import { useEffect, useRef } from "react";

function initLcds(box: HTMLElement) {
  const tits = [...box.querySelectorAll<HTMLElement>(":scope > .hd li")];
  const panels = [...box.querySelectorAll<HTMLElement>(":scope > .bd > ul")];
  if (panels.length === 0) return;
  const show = (index: number) => {
    tits.forEach((el, i) => el.classList.toggle("on", i === index));
    panels.forEach((el, i) => {
      el.style.display = i === index ? "block" : "none";
    });
  };
  show(0);
  tits.forEach((el, index) => {
    el.style.cursor = "pointer";
    el.addEventListener("click", () => show(index));
  });
}

function initCarousel(box: HTMLElement, visible: number, autoPlay: boolean) {
  const items = [...box.querySelectorAll<HTMLElement>(":scope > .bd ul > li")];
  if (items.length === 0) return () => undefined;
  const dotsHost = box.querySelector(":scope > .hd ul") ?? box.querySelector(":scope > .hd");
  const vis = Math.max(1, Math.min(visible, items.length));
  const pages = Math.max(1, items.length - vis + 1);
  let index = 0;
  let timer: number | null = null;

  if (dotsHost && dotsHost.querySelectorAll("li").length === 0) {
    for (let i = 0; i < pages; i += 1) {
      const dot = document.createElement("li");
      dotsHost.appendChild(dot);
    }
  }
  const dots = [...box.querySelectorAll<HTMLElement>(":scope > .hd li")];

  const show = (next: number) => {
    index = ((next % pages) + pages) % pages;
    items.forEach((el, i) => {
      el.style.display = i >= index && i < index + vis ? "list-item" : "none";
    });
    dots.forEach((el, i) => el.classList.toggle("on", i === index));
  };

  const start = () => {
    if (!autoPlay || pages <= 1) return;
    stop();
    timer = window.setInterval(() => show(index + 1), 2500);
  };
  const stop = () => {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
  };

  const onPrevNext = (event: Event) => {
    event.preventDefault();
    const el = event.currentTarget as HTMLElement;
    show(el.classList.contains("prev") ? index - 1 : index + 1);
    start();
  };

  show(0);
  dots.forEach((el, i) => {
    el.style.cursor = "pointer";
    el.addEventListener("click", () => {
      show(i);
      start();
    });
  });
  const controls = [...box.querySelectorAll<HTMLElement>(".prev, .next")];
  controls.forEach((el) => el.addEventListener("click", onPrevNext));
  box.addEventListener("mouseenter", stop);
  box.addEventListener("mouseleave", start);
  start();
  return () => {
    stop();
    box.removeEventListener("mouseenter", stop);
    box.removeEventListener("mouseleave", start);
    controls.forEach((el) => el.removeEventListener("click", onPrevNext));
  };
}

export function InnerHtml({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    root.querySelectorAll<HTMLElement>(".lcdsbox").forEach(initLcds);
    const cleanups = [
      ...[...root.querySelectorAll<HTMLElement>(".ztylboxqh")].map((box) =>
        initCarousel(box, 2, true),
      ),
      ...[...root.querySelectorAll<HTMLElement>(".csdlbox")].map((box) =>
        initCarousel(box, 1, true),
      ),
    ];

    const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    }
    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [html]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
