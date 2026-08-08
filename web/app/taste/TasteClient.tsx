"use client";

import { useMemo, useState } from "react";
import { TASTES, matchByTastes } from "@/lib/data";
import { CocktailCard, TabBar, TopBar } from "@/components/ui";

export default function TasteClient() {
  const [picks, setPicks] = useState<Set<string>>(new Set());

  const results = useMemo(() => matchByTastes(picks), [picks]);

  const toggle = (t: string) => {
    const next = new Set(picks);
    next.has(t) ? next.delete(t) : next.add(t);
    setPicks(next);
  };

  return (
    <div className="max-w-[440px] mx-auto relative z-[1] pb-24 min-h-screen">
      <TopBar />
      <div className="px-4.5 pt-4 page-anim">
        <h1 className="serif text-[20px] tracking-[1px]">按味道找酒</h1>
        <p className="text-[13px] text-[--muted] mb-3">多选你今晚想要的味道，结果实时排序 👇</p>

        <div className="flex gap-2 flex-wrap">
          {TASTES.map((t) => {
            const on = picks.has(t);
            return (
              <button
                key={t}
                onClick={() => toggle(t)}
                className={`rounded-full px-4 py-2 text-[13px] cursor-pointer border transition-all ${
                  on
                    ? "bg-[linear-gradient(145deg,var(--gold2),var(--gold))] text-[#1c1720] border-transparent font-bold"
                    : "bg-[--panel] border-[--line] text-[--muted]"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div className="mt-5">
          {picks.size === 0 ? (
            <div className="text-center text-[--muted] py-10 text-[14px]">
              ☝️ 先选你今晚想要的味道
              <br />
              <span className="text-[12px]">比如「清爽 + 低酒精」适合下午，「咖啡味 + 甜」适合饭后</span>
            </div>
          ) : (
            <>
              <div className="text-[13px] font-bold text-[--gold2] mb-2.5">
                匹配 {results.length} 杯，按契合度排序：
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                {results.map((c) => (
                  <CocktailCard key={c.id} c={c} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <TabBar active="/bar" />
    </div>
  );
}
