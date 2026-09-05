# Behaviors — 重庆市规划展览馆 homepage

## Scroll sweep
- Header does **not** change on scroll (stays absolute over the hero, then scrolls away with the banner).
- No scroll-triggered section animations on the homepage (wow.min.js loaded, unused).
- No sticky nav, no scroll-snap, no parallax library.

## Click sweep
- Exhibition tabs (`.zqylboxqh .hd li`): **click-driven**. Clicking `区县特色` sets `li.on` and shows the matching `.bd ul`. Confirmed via SuperSlide `jQuery(".zqylboxqh").slide()`.
- Magazine prev/next: SuperSlide `jQuery(".csdlbox").slide({mainCell:".bd ul",autoPlay:true})`.
- Customer service button `#csButton`: toggles `.cs-popup.show` (`transform: translateX(0); opacity:1; visibility:visible`, 0.3s). Iframe `https://www.zyautoservice.cn/qa/#/znkf1`.
- Language `<select class="sitebox">`: navigates to `/` or `/en/`.
- Search form GET `/?s=news&c=search&keyword=`.
- Friend links have **no href** — labels only.
- Mobile hamburger (≤1024px): shows `#header .menu` drawer.

## Hover sweep
- Nav item text `#fff` → `#deb863`, dropdown fades in 0.5s (`visibility/opacity/top`).
- Dropdown item hover: white text on `linear-gradient(90deg, #0081cc, #009591)`.
- Visit icons: background `rgba(0,0,0,0.1)` + `jumpImg` 2s translateY(-10px).
- Panorama / hall / news / promo images: `transform: scale(1.05)` over 0.5s.
- News/notice/magazine rows: same blue-teal gradient overlay, text turns white.
- Footer ICP links: `#fff` → `#f5f800`.
- Footer friend-link `h6:hover` arrow sprite offset.

## Time-driven
- Banner: `jQuery(".bannerindex").slide({mainCell:".bd ul",autoPlay:true})` — SuperSlide default `interTime: 2500`.
- Magazine carousel: same autoPlay.

## Responsive
- 1680 / 1550 / 1500 / 1440 / 1366 / 1210: type and padding scale down. At 1440 computed nav is **14px**.
- **1024px**: desktop `.navbox` hidden; hamburger `.topnav` shown; visit/panorama/exhibition/news columns stack to 100%.
- **700px**: search hidden; visit QR column stacks.
- **500px**: language hidden; QR column `display:none`; logo 215px.
