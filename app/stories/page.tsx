import type { Metadata } from "next";
import { STORIES, SPIRITS, GLOSSARY } from "@/lib/data";
import { Section, TabBar, TopBar } from "@/components/ui";

export const metadata: Metadata = {
  title: "调酒故事与知识文化",
  description: "调酒科普（酸酒/高球/菲士/古典等术语）、鸡尾酒背后的故事、以及六大基酒图鉴。",
};

export default function StoriesPage() {
  return (
    <div className="max-w-[440px] md:max-w-[1024px] mx-auto relative z-[1] pb-24 md:pb-12 min-h-screen">
      <TopBar />
      <div className="px-4.5 pt-4 page-anim">
        <Section title="故事 · 知识 · 文化" />
        {STORIES.map((s) => (
          <details
            key={s.id}
            className="bg-[--panel] border border-[--line] rounded-[16px] p-4 mb-3.5 open:border-[--gold] transition-colors"
          >
            <summary className="flex gap-3.5 cursor-pointer list-none">
              <span className="text-[40px] flex-none">{s.cover}</span>
              <span>
                <span className="text-[11px] text-[--gold2] border border-[--gold] rounded-full px-2 py-0.5 inline-block mb-1.5">{s.tag}</span>
                <span className="serif text-[16px] block">{s.title}</span>
                <span className="text-[13px] text-[--muted]">{s.excerpt}</span>
              </span>
            </summary>
            <div className="mt-3 pt-3 border-t border-[--line]">
              {(s.body || []).map((p, i) => (
                <p key={i} className="text-[14px] text-[#a99e94] leading-[1.8] mb-2">
                  {p}
                </p>
              ))}
            </div>
          </details>
        ))}

        <Section title="调酒科普 · 入门术语" />
        <div className="md:grid md:grid-cols-2 md:gap-4">
          {GLOSSARY.map((g) => (
            <details
              key={g.term}
              className="bg-[--panel] border border-[--line] rounded-[16px] p-4 mb-3.5 open:border-[--gold] transition-colors md:mb-0"
            >
              <summary className="flex items-center gap-3 cursor-pointer list-none">
                <span className="text-[26px] flex-none">{g.emoji}</span>
                <span>
                  <span className="serif text-[16px] block">{g.term}</span>
                  <span className="text-[11px] tracking-[1px] text-[--gold2]">{g.en}</span>
                </span>
              </summary>
              <p className="mt-3 pt-3 border-t border-[--line] text-[13px] text-[#a99e94] leading-[1.8]">
                {g.desc}
              </p>
            </details>
          ))}
        </div>

        <Section title="基酒图鉴" />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5 md:gap-4">
          {SPIRITS.map((s) => (
            <div key={s.name} className="bg-[--panel] border border-[--line] rounded-[14px] py-3.5 px-1 text-center">
              <div className="text-[30px] leading-none">{s.emoji}</div>
              <div className="text-[13px] mt-1.5">{s.name}</div>
              <div className="text-[10px] text-[--muted] leading-tight mt-0.5">{s.note}</div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="/stories" />
    </div>
  );
}
