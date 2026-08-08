import type { Metadata } from "next";
import { CONVENIENCE } from "@/lib/data";
import { CocktailCard, Section, TabBar, TopBar } from "@/components/ui";

export const metadata: Metadata = {
  title: "便利店调酒 - 用便利店材料调出微醺",
  description: "便利店调酒配方合集：养乐多特调、微醺冰红茶等，走进任何一家便利店就能调出的微醺，附材料清单与步骤。",
  keywords: "便利店调酒,养乐多特调,微醺冰红茶,家庭调酒",
};

export default function ConveniencePage() {
  return (
    <div className="max-w-[440px] mx-auto relative z-[1] pb-24 min-h-screen">
      <TopBar />
      <div className="px-4.5 pt-4 page-anim">
        <Section title="便利店调酒" />
        <p className="text-[13px] text-[--muted] mb-4">走进任何一家便利店，就能调出的微醺。</p>
        <div className="grid grid-cols-2 gap-3.5">
          {CONVENIENCE.map((c) => (
            <CocktailCard key={c.id} c={c} />
          ))}
        </div>
        <div className="mt-8 bg-[--panel] border border-[--line] rounded-[16px] p-4 text-[13px] text-[--muted]">
          💡 <b className="text-[--gold2]">小贴士：</b>
          便利店调酒的关键是「小瓶装烈酒」——伏特加、威士忌、朗姆酒都有 50-100ml 的小瓶装，买齐三种，能解锁大部分配方。
        </div>
      </div>
      <TabBar active="/convenience" />
    </div>
  );
}
