<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 重庆市规划展览馆网站

本仓库是站点产品工程（由目标站 `https://www.cqcpe.cn` 克隆而来），用于后续二开与部署。  
网站克隆能力已安装到**用户级** skill，不在本仓库内：`~/.cursor/skills/clone-website/`。

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **UI:** shadcn/ui + Tailwind CSS v4
- **Deployment:** Vercel / Docker

## Commands

- `npm run dev` — 开发服务器
- `npm run build` — 生产构建
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript 检查
- `npm run check` — lint + typecheck + build

## Code Style

- TypeScript strict，禁止 `any`
- Named exports；组件 PascalCase；工具 camelCase
- Tailwind utility classes；移动端优先
- 2-space 缩进

## Project Structure

```
src/
  app/                 # 路由
  components/
    sites/www-cqcpe-cn-ccd5d01f/   # 站点组件
    ui/                # shadcn 基础组件
  lib/                 # 工具
  types/               # 类型
public/
  sites/www-cqcpe-cn-ccd5d01f/     # 静态资源
docs/
  research/            # 克隆时提取的规格（对照用）
  design-references/   # 截图对照
scripts/               # 资源下载 / 抓取脚本
```

## Notes

- 视觉改版前先对照 `docs/design-references/` 与现网；二开可逐步替换内容与路由。
- 需要再次克隆其他网站时，在任意目录对 Agent 说「用 clone-website 克隆 \<url\>」，会读取用户级 skill，不必把 skill 放回本仓。
