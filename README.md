# 重庆市规划展览馆网站

基于 Next.js 的官网产品工程（自 `https://www.cqcpe.cn` 克隆重建），用于本地开发、二开与部署。

## 快速开始

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 开发服务器 |
| `npm run build` | 生产构建 |
| `npm run start` | 启动生产服务 |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript 检查 |
| `npm run check` | lint + typecheck + build |

## 技术栈

- Next.js 16（App Router）+ React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui
- 可选：Docker / Vercel 部署

## 目录说明

```
src/app/                 路由页面
src/components/sites/    站点业务组件
public/sites/            图片、视频、静态 CSS/JS
docs/research/           克隆规格（对照，非运行时依赖）
docs/design-references/  截图对照
scripts/                 资源下载 / 抓取辅助脚本
```

## 再次克隆其他网站

克隆能力已装在**用户级**（不在本仓库）：

- Cursor skill：`~/.cursor/skills/clone-website/`
- Cursor 命令：`~/.cursor/commands/clone-website.md`
- Claude Code：`~/.claude/skills/clone-website/`

在任意工程中对 Agent 说「用 clone-website 克隆 \<url\>」即可，无需把 skill 提交进产品仓。

## License

MIT（继承原模板许可；站点内容版权归重庆市规划展览馆及相关权利方。）
