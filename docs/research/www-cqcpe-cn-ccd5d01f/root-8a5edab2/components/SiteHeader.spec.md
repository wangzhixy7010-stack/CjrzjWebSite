# SiteHeader Specification

## Overview
- **Target file:** `src/components/sites/www-cqcpe-cn-ccd5d01f/root-8a5edab2/SiteHeader.tsx`
- **Screenshot:** `docs/design-references/www-cqcpe-cn-ccd5d01f/root-8a5edab2/desktop-1440-full.png`
- **Interaction model:** hover-driven dropdowns (desktop); click-driven drawer (≤1024px)

## DOM Structure
`.nav > .mainwd > .navlogo + .navright > .navrighttop (language+search) + .navbox (.navli × 8)`
Mobile twin: `#header.topnav` hamburger + `.menu` drawer.

## Computed Styles (1440)
- `.nav`: position absolute, z-index 2, padding 35px 0, gradient overlay
- `.navyjlm a`: 14px/45px, color #fff
- `.serch`: 250×36, 1px solid #fff, radius 5px
- Logo image: 466×60 source PNG

## States & Behaviors
- Hover nav: color #fff → #deb863, 0.5s; dropdown visibility/opacity 0.5s
- Dropdown item hover: gradient #0081cc → #009591, text #fff
- Language select navigates to ORIGIN `/` or `/en/`
- Search GET ORIGIN `/?s=news&c=search&keyword=`

## Assets
- `public/sites/www-cqcpe-cn-ccd5d01f/root-8a5edab2/images/logo.png`
- `public/sites/www-cqcpe-cn-ccd5d01f/shared/images/wzxz01.png`
- `public/sites/www-cqcpe-cn-ccd5d01f/shared/images/serch.png`
- `public/sites/www-cqcpe-cn-ccd5d01f/shared/images/sjcd.png`

## Text Content (verbatim)
参观服务 / 数字展馆 / 新闻动态 / 党群建设 / 博士后工作站 / 城市地理 / 文创作品 / 关于我们

## Responsive Behavior
- Desktop 1440: 8-item row, 14px
- 1024: `.navbox` hidden, hamburger shown
- 500: language hidden, logo 215px
