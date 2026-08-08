import type { Metadata } from "next";
import BarClient from "./BarClient";

export const metadata: Metadata = {
  title: "我的酒柜 - 按现有材料匹配鸡尾酒",
  description: "勾选你家里现有的酒、辅料和工具，实时算出能调出哪些鸡尾酒：现在能做、只差一个材料、材料够但缺工具也能做。",
};

export default function BarPage() {
  return <BarClient />;
}
