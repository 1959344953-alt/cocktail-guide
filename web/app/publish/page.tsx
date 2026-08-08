import type { Metadata } from "next";
import PublishClient from "./PublishClient";

export const metadata: Metadata = {
  title: "发布配方",
  description: "上传你自己的鸡尾酒配方，与更多调酒爱好者分享。",
};

export default function PublishPage() {
  return <PublishClient />;
}
