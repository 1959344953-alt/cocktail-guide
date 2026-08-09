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
  type Substitute,
} from "@/lib/data";
import type { Cocktail, Ingredient } from "@/lib/types";
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

// 从价格字符串提取数字（估算用）
function priceNum(s: Substitute): number {
  const m = s.price.match(/≈?(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : 0;
}

// —— 购物小票 ——
function Receipt({
  selected,
  stock,
  subList,
  buyList,
}: {
  selected: Cocktail | null;
  stock: Set<string>;
  subList: { item: string; subs: Substitute[] }[];
  buyList: { item: string }[];
}) {
  const today = new Date();
  const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;
  const line = <div className="border-t border-dashed border-[#c9b98a] my-2" />;

  // 单杯模式：这杯酒缺的材料
  const cMissing = useMemo(() => (selected ? missingFor(selected, stock) : []), [selected, stock]);
  const cSubs = cMissing.filter((m) => hasSub(m));
  const cBuys = cMissing.filter((m) => !hasSub(m));
  const cHave = selected
    ? selected.ingredients
        .filter((i: Ingredient) => !["适量", "满杯"].includes(i.amt))
        .map((i: Ingredient) => i.name)
        .filter((n: string) => stock.has(n))
    : [];

  // 合计
  const subTotal = subList.reduce((sum, { subs }) => sum + priceNum(subs[0]), 0);
  const buyTotal = buyList.length * 50;
  const cSubTotal = cSubs.reduce((sum, m) => sum + priceNum(SUBSTITUTES[m][0]), 0);
  const cBuyTotal = cBuys.length * 50;

  const isSingle = !!selected;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[13px] font-bold text-[--gold2]">🧾 {isSingle ? `采购单 · ${selected!.name}` : "采购小票（汇总）"}</div>
        {isSingle && (
          <button
            onClick={() => {}}
            className="text-[11px] text-[--muted] underline underline-offset-2 cursor-pointer"
            data-back-to-all
          >
            返回汇总
          </button>
        )}
      </div>
      <div className="bg-[#f5efdf] text-[#3a3024] rounded-[6px] p-4 shadow-[0_8px_30px_rgba(0,0,0,.45)] font-mono text-[12px] leading-[1.7]">
        {/* 小票头 */}
        <div className="text-center border-b border-dashed border-[#c9b98a] pb-2 mb-2">
          <div className="font-bold text-[14px] tracking-[2px]">调 酒 指 南</div>
          <div className="text-[10px] text-[#8a7a5a]">MIXOLOGY ALMANAC · 采购单</div>
          <div className="text-[10px] text-[#8a7a5a]">
            {dateStr} · {isSingle ? selected!.name : "全部推荐"}
          </div>
        </div>

        {isSingle ? (
          <>
            {/* 单杯模式 */}
            {cHave.length > 0 && (
              <div className="text-[#8a7a5a] mb-1">已有: {cHave.join("、")} ✓</div>
            )}
            {cSubs.map((m) => (
              <div key={m} className="mb-1">
                <div className="flex justify-between">
                  <span className="font-bold">◎ {m}</span>
                  <span className="text-[#8a7a5a]">{SUBSTITUTES[m][0].price}</span>
                </div>
                <div className="pl-4 text-[#8a7a5a]">
                  → {SUBSTITUTES[m][0].name}
                  {SUBSTITUTES[m][1] ? <span className="ml-2">(备选: {SUBSTITUTES[m][1].name})</span> : null}
                </div>
              </div>
            ))}
            {cBuys.map((m) => (
              <div key={m} className="flex justify-between mb-0.5">
                <span className="font-bold">◎ {m}</span>
                <span className="text-[#8a7a5a]">≈50元/瓶</span>
              </div>
            ))}
            {cBuys.length > 0 && <div className="text-[10px] text-[#8a7a5a] pl-4">基酒可复用，调多杯更划算</div>}

            {cMissing.length === 0 ? (
              <div className="text-center py-4">
                <div className="text-[18px]">🎉</div>
                <div className="font-bold">材料都齐了，开调！</div>
                <div className="text-[10px] text-[#8a7a5a]">本单免费</div>
              </div>
            ) : (
              <>
                {line}
                <div className="flex justify-between font-bold text-[13px]">
                  <span>合计（参考）</span>
                  <span>≈ ¥{cSubTotal + cBuyTotal}</span>
                </div>
                <div className="text-[9px] text-[#8a7a5a] text-right">代替品按推荐项单价，基酒按瓶估算</div>
              </>
            )}
          </>
        ) : (
          <>
            {/* 汇总模式 */}
            {subList.length === 0 && buyList.length === 0 ? (
              <div className="text-center py-4">
                <div className="text-[18px]">🎉</div>
                <div className="font-bold">什么都不缺，开调吧！</div>
                <div className="text-[10px] text-[#8a7a5a]">本单免费</div>
              </div>
            ) : (
              <>
                {subList.map(({ item, subs }) => (
                  <div key={item} className="mb-1">
                    <div className="flex justify-between">
                      <span className="font-bold">◎ {item}</span>
                      <span className="text-[#8a7a5a]">{subs[0].price}</span>
                    </div>
                    <div className="pl-4 text-[#8a7a5a]">
                      → {subs[0].name}
                      {subs[1] ? <span className="ml-2">(备选: {subs[1].name})</span> : null}
                    </div>
                  </div>
                ))}
                {buyList.map(({ item }) => (
                  <div key={item} className="flex justify-between mb-0.5">
                    <span className="font-bold">◎ {item}</span>
                    <span className="text-[#8a7a5a]">≈50元/瓶</span>
                  </div>
                ))}
                {buyList.length > 0 && <div className="text-[10px] text-[#8a7a5a] pl-4">基酒可复用，调多杯更划算</div>}
                {line}
                <div className="flex justify-between font-bold text-[13px]">
                  <span>合计（参考）</span>
                  <span>≈ ¥{subTotal + buyTotal}</span>
                </div>
                <div className="text-[9px] text-[#8a7a5a] text-right">代替品按推荐项单价，基酒按瓶估算</div>
              </>
            )}
          </>
        )}

        <div className="text-center border-t border-dashed border-[#c9b98a] mt-2 pt-2 text-[10px] text-[#8a7a5a] tracking-[2px]">
          - - - 祝 调 酒 愉 快 - - -
        </div>
      </div>
    </div>
  );
}

// 酒卡片 + 采购按钮
function DrinkCard({ c, stock, onBuy }: { c: Cocktail; stock: Set<string>; onBuy: (c: Cocktail) => void }) {
  return (
    <div className="bg-[--panel] border border-[--line] rounded-[16px] overflow-hidden">
      <CocktailCard c={c} />
      <div className="px-3 pb-3 -mt-1">
        <button
          onClick={() => onBuy(c)}
          className="w-full text-[12px] no-underline rounded-[10px] py-1.5 bg-[rgba(201,162,75,.12)] border border-[--gold] text-[--gold2] cursor-pointer hover:bg-[rgba(201,162,75,.28)] transition-colors"
        >
          🧾 采购单
        </button>
      </div>
    </div>
  );
}

export default function BarClient() {
  const [stock, setStock] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Cocktail | null>(null);
  const groups = useMemo(() => buildMaterialGroups(), []);
  const tiers = useMemo(() => matchTiers(stock), [stock]);
  const resultRef = useRef<HTMLDivElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

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

  const reset = () => {
    setStock(new Set());
    setSelected(null);
  };

  const goResult = () => {
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const buyThis = (c: Cocktail) => {
    setSelected(c);
    // 滚动到小票
    requestAnimationFrame(() => {
      setTimeout(() => receiptRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    });
  };

  const backToAll = () => setSelected(null);

  const total = tiers.ok.length + tiers.simple.length + tiers.sub.length + tiers.near.length;

  // 汇总采购清单数据
  const shopping = useMemo(() => {
    const subList: { item: string; subs: Substitute[] }[] = [];
    const buyList: { item: string }[] = [];
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
            buyList.push({ item: m });
          }
        }
      });
    });
    return { subList, buyList };
  }, [stock]);

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
          点选你有的材料 → 看能调什么 → 点「采购单」看这杯要买啥 👇
        </p>

        <MaterialGrid title="酒类（基酒需购买）" icon="🍾" items={groups.spirits} stock={stock} onToggle={toggle} />
        <MaterialGrid title="辅料与饮料（🛍 有代替品）" icon="🍋" items={groups.extras} stock={stock} onToggle={toggle} />

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
                      <DrinkCard key={c.id} c={c} stock={stock} onBuy={buyThis} />
                    ))}
                  </div>
                </div>
              )}

              {tiers.simple.length > 0 && (
                <div className="mt-4">
                  <div className="text-[13px] font-bold mb-2.5 text-[var(--gold2)]">🛠 材料够，缺工具也能做（{tiers.simple.length}）</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 md:gap-5">
                    {tiers.simple.map((c) => (
                      <DrinkCard key={c.id} c={c} stock={stock} onBuy={buyThis} />
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
                          <button
                            onClick={() => buyThis(c)}
                            className="mt-1.5 w-full text-[12px] rounded-[10px] py-1.5 bg-[rgba(201,162,75,.12)] border border-[--gold] text-[--gold2] cursor-pointer hover:bg-[rgba(201,162,75,.28)] transition-colors"
                          >
                            🧾 采购单
                          </button>
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
                          <button
                            onClick={() => buyThis(c)}
                            className="mt-1.5 w-full text-[12px] rounded-[10px] py-1.5 bg-[rgba(201,162,75,.12)] border border-[--gold] text-[--gold2] cursor-pointer hover:bg-[rgba(201,162,75,.28)] transition-colors"
                          >
                            🧾 采购单
                          </button>
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

        {/* 采购小票 */}
        {stock.size > 0 && (
          <div ref={receiptRef} className="scroll-mt-[110px]" onClick={(e) => {
            const t = e.target as HTMLElement;
            if (t.dataset.backToAll !== undefined) backToAll();
          }}>
            <Receipt selected={selected} stock={stock} subList={shopping.subList} buyList={shopping.buyList} />
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
