# VisitServices Specification

## Overview
- **Target file:** `src/components/sites/www-cqcpe-cn-ccd5d01f/root-8a5edab2/VisitServices.tsx`
- **Screenshot:** `docs/design-references/www-cqcpe-cn-ccd5d01f/root-8a5edab2/section-visit-exhibition.png`
- **Interaction model:** hover (icons jump, panorama scale); links click-out to origin

## DOM Structure
`.box01 > .cgfwbox (teal) + .qjmy (panorama 510px)`
`.cgfwbox > .cgfw (#009591) + .jjyy (QR)`

## Computed Styles (1440)
- Title 24px/30px #fff
- Times 32px/32px #fff; labels 14px
- Icon well border 1px #41b0ad, radius 20px
- Panorama 510×320

## States & Behaviors
- Icon hover: rgba(0,0,0,0.1) + jumpImg 2s
- Panorama hover: img scale 1.05 / 0.5s

## Assets
kgsj01–04.png, wechat-qr.jpg, qjmy01.jpg

## Text Content (verbatim)
参观服务 / 开馆时间 09:00 / 停止进馆 16:30 / 闭馆时间 17:00
免费向社会公众开放，每周一闭馆，节假日开馆时间以公告为准
参观须知 / 讲解预约 / 楼层总览 / 交通线路 / 微信公众号

## Responsive Behavior
- 1024: columns stack 100%
- 500: QR column hidden
