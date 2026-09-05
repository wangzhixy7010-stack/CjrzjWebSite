# Page Topology — 重庆市规划展览馆 homepage

Source: https://www.cqcpe.cn/
Viewport reference: 1440×900, page height 3413px, content width `.wd` = 90% (1282.5px)

## Layers
1. Overlay header `.nav` — `position:absolute; top:0; z-index:2;` over the hero. Gradient `linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)`, padding 35px 0 (24px nav links at 1440).
2. Hero `.banner` / `.bannerindex` — full-bleed image slider, height ~698px at 1440.
3. Hidden mobile drawer `#header.topnav` — `display:none` above 1024px.
4. Flow content `.main.padding7` — padding 30px 0 at ≤1500px.
5. Footer `.bqmain` — `background:#0081cc`, padding 40px 0 30px.
6. Floating customer-service widget — `position:fixed; right:20px; bottom:20px; z-index:9999`.

## Sections (top → bottom)
| Order | Name | Selector | Interaction |
|---|---|---|---|
| 1 | SiteHeader | `.nav` + `#header` | hover dropdowns; click language/search; mobile hamburger |
| 2 | HeroBanner | `.bannerindex` | time-driven SuperSlide autoPlay 2500ms |
| 3 | VisitServices | `.box01` | hover icon jump; panorama image scale |
| 4 | ExhibitionOverview | `.box2` | click-driven SuperSlide tabs |
| 5 | NewsSections | `.box3` | hover gradient on cards/lists |
| 6 | Notices + Magazine | `.box4` | magazine autoPlay + prev/next |
| 7 | BottomFeatures | `.box5` | hover image scale; video autoplay |
| 8 | SiteFooter | `.bqmain` | hover friend-link dropdown |
| 9 | CustomerService | `.customer-service` | click toggle iframe popup |

No Lenis / Locomotive. Native document scroll. No scroll-snap. WOW.js is loaded on the source but no `.wow` nodes are present on the homepage.
