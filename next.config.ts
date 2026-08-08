import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 纯静态导出，可托管到腾讯云 COS / 阿里云 OSS / 任意静态服务器
  images: { unoptimized: true }, // 静态导出时禁用图片优化（照片来自 Unsplash 外链，无影响）
};

export default nextConfig;
