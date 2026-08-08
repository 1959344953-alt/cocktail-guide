import type { Metadata } from "next";
import Link from "next/link";
import { COCKTAILS } from "@/lib/data";
import { CocktailCard, Section, TabBar, TopBar } from "@/components/ui";

export const metadata: Metadata = {
  title: "鸡尾酒配方库",
  description: "经典与现代鸡尾酒配方大全：尼格罗尼、莫吉托、玛格丽特、古典鸡尾酒等，附材料比例、步骤、视频教程与背后的故事。",
};

const BASES = ["全部", ...Array.from(new Set(COCKTAILS.map((c) => c.base)))];

export default function CocktailsPage() {
  return (
    <div className="max-w-[440px] mx-auto relative z-[1] pb-24 min-h-screen">
      <TopBar />
      <div className="px-4.5 pt-4 page-anim">
        <Section title="配方库" more="发布配方" moreHref="/publish" />
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2.5">
          {BASES.map((b) => (
            <a
              key={b}
              href={`/cocktails#${b}`}
              className="whitespace-nowrap border border-[--line] text-[--muted] bg-[--panel] rounded-full px-4 py-2 text-[13px] no-underline"
            >
              {b}
            </a>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          {COCKTAILS.map((c) => (
            <CocktailCard key={c.id} c={c} />
          ))}
        </div>
        <div className="mt-8 text-center text-[13px] text-[--muted]">
          <Link href="/convenience" className="text-[--gold2] no-underline">→ 还有便利店调酒专区</Link>
        </div>
      </div>
      <TabBar active="/cocktails" />
    </div>
  );
}
