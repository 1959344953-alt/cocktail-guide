import type { Metadata } from "next";
import { STORIES, SPIRITS } from "@/lib/data";
import { Section, TabBar, TopBar } from "@/components/ui";

export const metadata: Metadata = {
  title: "调酒故事与知识文化",
  description: "鸡尾酒背后的故事：海明威与莫吉托、禁酒令如何催生现代鸡尾酒、为什么有的酒要摇有的要搅，以及六大基酒图鉴。",
};

export default function StoriesPage() {
  return (
    <div className="max-w-[440px] mx-auto relative z-[1] pb-24 min-h-screen">
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

        <Section title="基酒图鉴" />
        <div className="grid grid-cols-3 gap-2.5">
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
