"use client";

import { useMemo, useState } from "react";
import { BAR_STOCK, matchTiers } from "@/lib/data";
import { CocktailCard, TabBar, TopBar } from "@/components/ui";

function StockGroup({ title, icon, items, stock, onToggle }: {
  title: string;
  icon: string;
  items: { name: string; en: string; emoji: string }[];
  stock: Set<string>;
  onToggle: (n: string) => void;
}) {
  return (
    <>
      <div className="text-[13px] text-[--gold2] tracking-[1px] font-bold mt-4 mb-2.5">
        {icon} {title}
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2.5 md:gap-3">
        {items.map((s) => {
          const on = stock.has(s.name);
          return (
            <button
              key={s.name}
              onClick={() => onToggle(s.name)}
              className={`rounded-[14px] py-3 px-1 text-center cursor-pointer transition-all border ${
                on
                  ? "border-[--gold] bg-[linear-gradient(160deg,#2b2030,#241d29)] shadow-[0_0_0_1px_var(--gold)_inset]"
                  : "bg-[--panel] border-[--line]"
              }`}
            >
              <div className="text-[30px] leading-none">{s.emoji}</div>
              <div className="text-[13px] mt-1.5">{s.name}</div>
              <div className="text-[10px] text-[--muted]">{s.en}</div>
              {on && <div className="absolute hidden" />}
            </button>
          );
        })}
      </div>
    </>
  );
}

function TierBlock({ title, color, list }: { title: string; color: string; list: ReturnType<typeof matchTiers>["ok"] }) {
  if (list.length === 0) return null;
  return (
    <div className="mt-4">
      <div className="text-[13px] font-bold mb-2.5" style={{ color }}>
        {title}（{list.length}）
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 md:gap-5">
        {list.map((c) => (
          <CocktailCard key={c.id} c={c} />
        ))}
      </div>
    </div>
  );
}

export default function BarClient() {
  const [stock, setStock] = useState<Set<string>>(new Set());
  const tiers = useMemo(() => matchTiers(stock), [stock]);

  const toggle = (n: string) => {
    const next = new Set(stock);
    next.has(n) ? next.delete(n) : next.add(n);
    setStock(next);
  };

  return (
    <div className="max-w-[440px] md:max-w-[1024px] mx-auto relative z-[1] pb-24 md:pb-12 min-h-screen">
      <TopBar />
      <div className="px-4.5 pt-4 page-anim">
        <h1 className="serif text-[20px] tracking-[1px]">我的酒柜</h1>
        <p className="text-[13px] text-[--muted] mb-3">
          勾选你现有的酒、辅料和工具，实时算出能调出什么 👇
        </p>

        <StockGroup title="基酒" icon="🍾" items={BAR_STOCK.spirits} stock={stock} onToggle={toggle} />
        <StockGroup title="辅料" icon="🍋" items={BAR_STOCK.extras} stock={stock} onToggle={toggle} />
        <StockGroup title="工具" icon="🥄" items={BAR_STOCK.tools} stock={stock} onToggle={toggle} />

        <div className="mt-5">
          {stock.size === 0 ? (
            <div className="text-center text-[--muted] py-10 text-[14px]">☝️ 先勾选你酒柜里有的东西</div>
          ) : (
            <>
              <TierBlock title="🍸 现在就能做" color="#8fd19a" list={tiers.ok} />
              <TierBlock title="🛠 材料够，缺工具也能做" color="var(--gold2)" list={tiers.simple} />
              <TierBlock title="➕ 只差一个材料" color="var(--muted)" list={tiers.near} />
              {tiers.ok.length + tiers.simple.length + tiers.near.length === 0 && (
                <div className="text-center text-[--muted] py-10 text-[14px]">还没凑出配方，再多勾几样试试？</div>
              )}
            </>
          )}
        </div>
      </div>
      <TabBar active="/bar" />
    </div>
  );
}
