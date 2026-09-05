# HeroBanner Specification

## Overview
- **Target file:** `src/components/sites/www-cqcpe-cn-ccd5d01f/root-8a5edab2/HeroBanner.tsx`
- **Screenshot:** `docs/design-references/www-cqcpe-cn-ccd5d01f/root-8a5edab2/desktop-1440-full.png`
- **Interaction model:** time-driven SuperSlide `autoPlay:true`, interTime 2500ms

## DOM Structure
`.banner > #slideBox.bannerindex > .bd > ul > li > img`

## Computed Styles
- Container ~1425×698 at 1440 viewport
- img: width 100%, height 100%, object-fit cover, transition 0.5s

## States & Behaviors
- Alternate two 1920×940 JPEGs every 2500ms (fade/display toggle matching SuperSlide)

## Assets
- `banner-01.jpg`, `banner-02.jpg` under page asset root

## Text Content
N/A (photographic hero)

## Responsive Behavior
- Full-bleed at all widths; height follows image aspect via object-fit cover
