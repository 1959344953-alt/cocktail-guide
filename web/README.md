# 调酒指南 Cocktail Guide

「我们的身体不需要酒精，但灵魂需要！」

整合全网经典鸡尾酒配方与调酒教程的静态网站。Next.js 16 + TypeScript + Tailwind，部署于 Vercel（免备案）。

## 功能

- 🍸 **配方库**：每杯酒独立 URL（/cocktails/negroni），SSG 预渲染，利于搜索引擎收录
- 🧪 **我的酒柜**：勾选现有酒/辅料/工具，三档匹配（现在能做 / 只差一个材料 / 材料够缺工具也能做）
- 👅 **按味道找**：清爽、酸、甜、奶香、咖啡味…多选实时排序
- 🏪 **便利店调酒**：走进便利店就能调出的微醺
- 📜 **故事文化**：鸡尾酒背后的故事与基酒图鉴
- ✍️ **发布配方**：提交你自己的配方（当前本地保存）

## 开发

```bash
npm install
npm run dev      # 本地开发 http://localhost:3000
npm run build    # 生产构建
npm start        # 生产运行
```

数据都在 `lib/data.ts`，加配方只改这一个文件。

## 部署

推到 GitHub 后，在 [vercel.com](https://vercel.com) 导入仓库即可自动部署，无需备案。
