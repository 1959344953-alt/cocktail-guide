import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cocktail-guide.vercel.app"),
  title: {
    default: "调酒指南 · 我们的身体不需要酒精，但灵魂需要！",
    template: "%s | 调酒指南",
  },
  description:
    "整合全网经典鸡尾酒配方与调酒教程，支持按味道找酒、按酒柜库存匹配可调配方，收录调酒故事与文化知识。零基础也能在家调出第一杯酒。",
  keywords: ["鸡尾酒", "调酒配方", "调酒教程", "Mojito", "Margarita", "尼格罗尼", "便利店调酒", "家庭调酒"],
  openGraph: {
    title: "调酒指南 · 我们的身体不需要酒精，但灵魂需要！",
    description: "整合全网经典鸡尾酒配方与调酒教程，按味道/酒柜找酒。",
    type: "website",
    locale: "zh_CN",
  },
};

export const viewport: Viewport = {
  themeColor: "#141018",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;700&family=Noto+Sans+SC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
