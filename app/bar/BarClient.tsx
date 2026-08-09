"use client";

import { useEffect, useMemo, useState } from "react";
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
import { CocktailCard, TabBar, TopBar } from "@/components/ui";

// 购买链接（各平台搜索）
function buyLinks(name: string) {
  const q = encodeURIComponent(name);
  return [
    { label: "淘宝", icon: "🛒", url: `https://s.taobao.com/search?q=${q}` },
    { label: "京东", icon: "🛍", url: `https://search.jd.com/Search?keyword=${q}` },
    { label: "美团外卖", icon: "🥡", url: `https://waimai.meituan.com/search/${q}` },
  ];
}

function SubChips({ name }: { name: string }) {
  const subs = SUBSTITUTES[name];
  if (!subs?.length) return null;
  return (
    <div className="mt-1.5 flex flex-wrap gap-1">
      {subs.slice(0, 2).map((s) => (
        <span key={s.name} className="text-[11px] rounded-full bg-[rgba(201,162,75,.1)] border border-[rgba(201,162,75,.25)] px-2 py-0.5">
          {s.name}
          {s.price ? <small className="text-[--muted] ml-1">{s.price}</small> : null}
        </span>
      ))}
    </div>
  );
}

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

  // 还差材料统计（near 层需购买 + sub 层可代替）
  const missingCounts = useMemo(() => {
    const map = new Map<string, number>();
    tiers.near.forEach((c) => missingFor(c, stock).forEach((m) => map.set(m, (map.get(m) || 0) + 1)));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [tiers, stock]);

  const total = tiers.ok.length + tiers.simple.length + tiers.sub.length + tiers.near.length;

  // 推荐模式：只选一样也有推荐（全部层都算推荐）
  const hasAny = stock.size > 0;

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
          点选你有的材料（已自动从全部配方汇总），实时算出能调出什么 👇
        </p>

        <MaterialGrid title="酒类（基酒不可代替）" icon="🍾" items={groups.spirits} stock={stock} onToggle={toggle} />
        <MaterialGrid title="辅料与饮料（🛍 可代替）" icon="🍋" items={groups.extras} stock={stock} onToggle={toggle} />

        <div className="mt-5">
          {!hasAny ? (
            <div className="text-center text-[--muted] py-10 text-[14px]">☝️ 先勾选你有的东西——哪怕只有一样，也能给你推荐</div>
          ) : (
            <>
              {tiers.ok.length > 0 && (
                <div className="mt-2">
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
                              {m} → <SubChips name={m} />
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
                          <div className="text-[11px] text-[#e08a7a] mb-1.5">还差：{missingFor(c, stock).join("、")}</div>
                          <div className="flex flex-wrap gap-1.5">
                            {missingFor(c, stock).map((m) =>
                              buyLinks(m).slice(0, 2).map((b) => (
                                <a
                                  key={b.label}
                                  href={b.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] no-underline border border-[--line] rounded-full px-2 py-0.5 text-[--gold2] hover:border-[--gold] transition-colors"
                                >
                                  {b.icon} 买{m}
                                </a>
                              ))
                            )}
                          </div>
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

        {/* 便利店代替品指南 */}
        <div className="mt-6 bg-[linear-gradient(160deg,#2b2030,#191320)] border border-[--line] rounded-[16px] p-4">
          <div className="text-[13px] font-bold text-[--gold2] mb-1">🏪 便利店代替品指南</div>
          <div className="text-[11px] text-[--muted] mb-3">没有专业材料？这些便利店饮料都能代替（基酒除外）</div>
          <div className="space-y-2.5">
            {groups.extras.filter((m) => hasSub(m.name)).map((m) => (
              <div key={m.name} className="flex items-start gap-2">
                <span className="text-[12px] text-[--ink] flex-none w-16">{m.name}</span>
                <div className="flex flex-wrap gap-1.5">
                  {SUBSTITUTES[m.name].map((s: Substitute) => (
                    <span key={s.name} className="text-[11px] rounded-full bg-[rgba(201,162,75,.08)] border border-[rgba(201,162,75,.2)] px-2 py-1">
                      {s.name}
                      {s.brand ? <small className="text-[--muted]">·{s.brand}</small> : null}
                      <small className="text-[--gold2] ml-1">{s.price}</small>
                      <small className="text-[--muted] ml-1">[{s.shops.join("/")}]</small>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <a
            href="https://uri.amap.com/search?keyword=便利店"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-[12px] border border-[--gold] py-2.5 text-[13px] font-bold text-[--gold2] no-underline hover:bg-[rgba(201,162,75,.08)] transition-colors"
          >
            📍 打开地图找最近的便利店（高德）
          </a>
        </div>

        {/* 缺的基酒：一键采购 */}
        {missingCounts.length > 0 && (
          <div className="mt-4 bg-[--panel] border border-[--line] rounded-[16px] p-4">
            <div className="text-[13px] font-bold text-[--gold2] mb-1">🛒 还差这些（需购买）</div>
            <div className="text-[11px] text-[--muted] mb-2.5">点平台直接搜索下单</div>
            <div className="flex flex-wrap gap-1.5">
              {missingCounts.map(([m, n]) => (
                <span key={m} className="inline-flex items-center gap-1 border border-[--line] rounded-full pl-2.5 pr-1 py-1 text-[12px]">
                  {m}
                  <small className="text-[10px] text-[--muted]">缺{n}杯</small>
                  {buyLinks(m).map((b) => (
                    <a
                      key={b.label}
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] no-underline rounded-full px-1.5 py-0.5 bg-[rgba(201,162,75,.12)] text-[--gold2] hover:bg-[rgba(201,162,75,.25)] transition-colors"
                    >
                      {b.icon}
                    </a>
                  ))}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link href="/convenience" className="mt-4 block text-center text-[13px] text-[--gold2] no-underline">
          🏪 去便利店调酒专区看看 →
        </Link>
      </div>
      <TabBar active="/bar" />
    </div>
  );
}
