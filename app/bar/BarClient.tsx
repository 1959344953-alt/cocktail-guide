"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ALL_COCKTAILS,
  buildMaterialGroups,
  matchTiers,
  missingFor,
  SUBSTITUTES,
  hasSub,
  type StockMat,
} from "@/lib/data";
import { CocktailCard, TabBar, TopBar } from "@/components/ui";

function MaterialGrid({
  title,
  icon,
  items,
  stock,
  onToggle,
}: {
  title: string;
  icon: string;
  items: StockMat[];
  stock: Set<string>;
  onToggle: (n: string) => void;
}) {
  if (items.length === 0) return null;
  return (
    <>
      <div className="text-[13px] text-[--gold2] tracking-[1px] font-bold mt-4 mb-2.5">
        {icon} {title}
        <span className="text-[11px] text-[--muted] font-normal ml-2">
          已选 {items.filter((i) => stock.has(i.name)).length}/{items.length}
        </span>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5 md:gap-3">
        {items.map((s) => {
          const on = stock.has(s.name);
          const sub = hasSub(s.name);
          return (
            <button
              key={s.name}
              onClick={() => onToggle(s.name)}
              className={`rounded-[14px] py-2.5 px-1 text-center cursor-pointer transition-all border relative ${
                on
                  ? "border-[--gold] bg-[linear-gradient(160deg,#2b2030,#241d29)] shadow-[0_0_0_1px_var(--gold)_inset]"
                  : "bg-[--panel] border-[--line]"
              }`}
            >
              <div className="text-[26px] leading-none">{s.emoji}</div>
              <div className="text-[12px] mt-1 leading-tight">{s.name}</div>
              <div className="text-[10px] text-[--muted]">
                {sub ? "🛍 可代替" : `${s.need}款酒用到`}
              </div>
              {on && <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[--gold] text-[#1c1720] text-[10px] grid place-items-center font-bold">✓</div>}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default function BarClient() {
  const [stock, setStock] = useState<Set<string>>(new Set());
  const groups = useMemo(() => buildMaterialGroups(), []);
  const tiers = useMemo(() => matchTiers(stock), [stock]);
  const resultRef = useRef<HTMLDivElement>(null);

  // 持久化勾选状态
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bar-stock");
      if (saved) setStock(new Set(JSON.parse(saved)));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("bar-stock", JSON.stringify(Array.from(stock)));
    } catch {}
  }, [stock]);

  const toggle = (n: string) => {
    const next = new Set(stock);
    next.has(n) ? next.delete(n) : next.add(n);
    setStock(next);
  };

  const reset = () => setStock(new Set());

  // 跳转到结果区
  const goResult = () => {
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const total = tiers.ok.length + tiers.simple.length + tiers.sub.length + tiers.near.length;

  // —— 动态采购清单：基于当前缺的材料 ——
  const shopping = useMemo(() => {
    const subList: { item: string; subs: (typeof SUBSTITUTES)[string] }[] = [];
    const buyList: { item: string; usedIn: string[] }[] = [];
    const seenSub = new Set<string>();
    const seenBuy = new Set<string>();
    ALL_COCKTAILS.forEach((c) => {
      missingFor(c, stock).forEach((m) => {
        if (hasSub(m)) {
          if (!seenSub.has(m)) {
            seenSub.add(m);
            subList.push({ item: m, subs: SUBSTITUTES[m] });
          }
        } else {
          if (!seenBuy.has(m)) {
            seenBuy.add(m);
            buyList.push({ item: m, usedIn: [c.name] });
          } else {
            const b = buyList.find((x) => x.item === m);
            if (b && !b.usedIn.includes(c.name)) b.usedIn.push(c.name);
          }
        }
      });
    });
    return { subList, buyList };
  }, [stock]);

  const nothingMissing = shopping.subList.length === 0 && shopping.buyList.length === 0;

  return (
    <div className="max-w-[440px] md:max-w-[1024px] mx-auto relative z-[1] pb-24 md:pb-12 min-h-screen">
      <TopBar />
      <div className="px-4.5 pt-4 page-anim">
        <div className="flex items-center justify-between">
          <h1 className="serif text-[20px] tracking-[1px]">我的酒柜</h1>
          {stock.size > 0 && (
            <button onClick={reset} className="text-[12px] text-[--muted] underline underline-offset-2 cursor-pointer">
              清空
            </button>
          )}
        </div>
        <p className="text-[13px] text-[--muted] mb-3">
          点选你有的材料，哪怕只有一样也会给你推荐 👇
        </p>

        <MaterialGrid title="酒类（基酒需购买）" icon="🍾" items={groups.spirits} stock={stock} onToggle={toggle} />
        <MaterialGrid title="辅料与饮料（🛍 有代替品）" icon="🍋" items={groups.extras} stock={stock} onToggle={toggle} />

        {/* 看结果按钮：选完直接定位 */}
        {stock.size > 0 && (
          <div className="sticky top-[64px] z-10 mt-5 mb-1">
            <button
              onClick={goResult}
              className="w-full py-3 rounded-[14px] font-bold text-[14px] text-[#1c1720] cursor-pointer bg-[linear-gradient(145deg,var(--gold2),var(--gold))] shadow-[0_6px_20px_rgba(201,162,75,.3)]"
            >
              🎯 看我能调什么酒（{total} 款）↓
            </button>
          </div>
        )}

        {/* 结果区 */}
        <div ref={resultRef} className="scroll-mt-[130px]">
          {stock.size === 0 ? (
            <div className="text-center text-[--muted] py-10 text-[14px]">☝️ 先勾选你有的东西</div>
          ) : (
            <>
              {tiers.ok.length > 0 && (
                <div className="mt-4">
                  <div className="text-[13px] font-bold mb-2.5 text-[#8fd19a]">🍸 现在就能做（{tiers.ok.length}）</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 md:gap-5">
                    {tiers.ok.map((c) => (
                      <CocktailCard key={c.id} c={c} />
                    ))}
                  </div>
                </div>
              )}

              {tiers.simple.length > 0 && (
                <div className="mt-4">
                  <div className="text-[13px] font-bold mb-2.5 text-[var(--gold2)]">🛠 材料够，缺工具也能做（{tiers.simple.length}）</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 md:gap-5">
                    {tiers.simple.map((c) => (
                      <CocktailCard key={c.id} c={c} />
                    ))}
                  </div>
                </div>
              )}

              {tiers.sub.length > 0 && (
                <div className="mt-4">
                  <div className="text-[13px] font-bold mb-2.5 text-[#8fd19a]">🛍 用便利店代替品就能做（{tiers.sub.length}）</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 md:gap-5">
                    {tiers.sub.map((c) => (
                      <div key={c.id} className="bg-[--panel] border border-[--line] rounded-[16px] overflow-hidden">
                        <CocktailCard c={c} />
                        <div className="px-3 pb-3 -mt-1">
                          {missingFor(c, stock).map((m) => (
                            <div key={m} className="text-[11px] text-[--muted] mb-1.5">
                              <span className="text-[--ink]">{m}</span> → {SUBSTITUTES[m][0].name}
                              <small className="text-[--gold2]"> {SUBSTITUTES[m][0].price}</small>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tiers.near.length > 0 && (
                <div className="mt-4">
                  <div className="text-[13px] font-bold mb-2.5 text-[var(--muted)]">➕ 还差一点（{tiers.near.length}）</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 md:gap-5">
                    {tiers.near.map((c) => (
                      <div key={c.id} className="bg-[--panel] border border-[--line] rounded-[16px] overflow-hidden">
                        <CocktailCard c={c} />
                        <div className="px-3 pb-3 -mt-1">
                          <div className="text-[11px] text-[#e08a7a]">还差：{missingFor(c, stock).join("、")}</div>
                          <div className="text-[10px] text-[--muted] mt-0.5">对应采购清单 👇</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {total === 0 && (
                <div className="text-center text-[--muted] py-10 text-[14px]">还没凑出配方，再多勾几样试试？</div>
              )}
            </>
          )}
        </div>

        {/* —— 采购清单：缺啥、用啥代替、多少钱 —— */}
        {stock.size > 0 && (
          <div className="mt-6 bg-[linear-gradient(160deg,#2b2030,#191320)] border border-[--line] rounded-[16px] p-4">
            <div className="text-[14px] font-bold text-[--gold2] mb-1">🛒 采购清单</div>
            <div className="text-[11px] text-[--muted] mb-3">根据你勾的材料，还差这些——到便利店/超市一次买齐</div>

            {nothingMissing ? (
              <div className="text-[13px] text-[#8fd19a] text-center py-3">🎉 什么都不缺，开调吧！</div>
            ) : (
              <>
                {shopping.subList.length > 0 && (
                  <div className="mb-3">
                    <div className="text-[12px] font-bold text-[--ink] mb-2">🛍 可用代替品（便利店都有）</div>
                    <div className="space-y-2">
                      {shopping.subList.map(({ item, subs }) => (
                        <div key={item} className="flex items-start gap-2">
                          <span className="text-[12px] text-[--ink] flex-none w-16 pt-0.5">{item}</span>
                          <div className="flex flex-wrap gap-1.5">
                            {subs.slice(0, 3).map((s) => (
                              <span key={s.name} className="text-[11px] rounded-full bg-[rgba(201,162,75,.08)] border border-[rgba(201,162,75,.2)] px-2 py-1">
                                {s.name}
                                <small className="text-[--gold2] ml-1">{s.price}</small>
                                <small className="text-[--muted] ml-1">[{s.shops[0]}等]</small>
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {shopping.buyList.length > 0 && (
                  <div>
                    <div className="text-[12px] font-bold text-[--ink] mb-2">🍾 需购买（基酒/利口酒，无代替）</div>
                    <div className="space-y-1.5">
                      {shopping.buyList.map(({ item, usedIn }) => (
                        <div key={item} className="text-[12px]">
                          <span className="text-[--ink]">{item}</span>
                          <small className="text-[--muted] ml-2">用于：{usedIn.slice(0, 3).join("、")}{usedIn.length > 3 ? "等" : ""}</small>
                        </div>
                      ))}
                    </div>
                    <div className="text-[11px] text-[--muted] mt-2">基酒建议网购或酒类专营店，便利店一般没有。</div>
                  </div>
                )}
              </>
            )}

            <Link href="/convenience" className="mt-3 block text-center text-[13px] text-[--gold2] no-underline">
              🏪 便利店调酒专区（这些原料便利店都能买到）→
            </Link>
          </div>
        )}
      </div>
      <TabBar active="/bar" />
    </div>
  );
}
