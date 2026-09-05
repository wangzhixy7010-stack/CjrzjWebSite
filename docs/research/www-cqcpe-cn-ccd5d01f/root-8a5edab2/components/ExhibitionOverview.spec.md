# ExhibitionOverview Specification

## Overview
- **Target file:** `src/components/sites/www-cqcpe-cn-ccd5d01f/root-8a5edab2/ExhibitionOverview.tsx`
- **Screenshot:** `docs/design-references/www-cqcpe-cn-ccd5d01f/root-8a5edab2/section-visit-exhibition.png`
- **Interaction model:** click-driven SuperSlide tabs (`jQuery(".zqylboxqh").slide()`)

## DOM Structure
`.box2 (#0081cc) > .box02bj (xtbj01.png) > .zqyltitle (vertical) + .zqylboxqh (.hd tabs + .bd panels)`

## Computed Styles (1440)
- Vertical title 24px #fff + 24px #52a3db, writing-mode vertical-rl
- Tab span 16px/45px #fff; `.on` uses jtimg04.png + 8px white dot + 150px line
- Caption bar rgba(0,0,0,0.5), 3-line clamp

## States & Behaviors
- Click tab: `li.on` + matching panel `display:block`
- Image hover scale 1.05; caption hover becomes blue-teal gradient

## Assets
xtbj01.png, jtimg04.png, hall-*.jpg (11 halls)

## Text Content (verbatim)
展厅一览 / Exhibition Overview
Tabs: 序厅, 区县特色, 自然山水, 历史人文, 专项规划, 战略定位, 总体规划, 国家战略, 国家重要的中心城市, 美丽重庆, 非遗传承

## Responsive Behavior
- 1024: title horizontal/centered; tabs 50% width grid
