import type { Metadata } from "next";
import TasteClient from "./TasteClient";

export const metadata: Metadata = {
  title: "按味道找鸡尾酒",
  description: "按口味偏好找酒：清爽、酸、甜、奶香、咖啡味、低酒精、高级经典…多选味道标签，实时匹配最合适的鸡尾酒。",
};

export default function TastePage() {
  return <TasteClient />;
}
