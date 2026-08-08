import Link from "next/link";
import { COCKTAILS, STORIES } from "@/lib/data";
import { CocktailCard, Section, TabBar, TopBar, PhotoIcon } from "@/components/ui";

const QUICK = [
  { href: "/bar", label: "我的酒柜", photo: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=160&q=80&auto=format&fit=crop" },
  { href: "/taste", label: "按味道找", photo: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=160&q=80&auto=format&fit=crop" },
  { href: "/convenience", label: "便利店调酒", photo: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=160&q=80&auto=format&fit=crop" },
  { href: "/stories", label: "故事文化", photo: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=160&q=80&auto=format&fit=crop" },
];

export default function HomePage() {
  const hero = COCKTAILS[0]; // 尼格罗尼
  return (
    <div className="max-w-[440px] mx-auto relative z-[1] pb-24 min-h-screen">
      <TopBar />

      <div className="px-4.5 pt-4 page-anim">
        {/* Hero */}
        <div
          className="relative rounded-[16px] overflow-hidden border border-[--line] p-5 shadow-[0_10px_30px_rgba(0,0,0,.45)]"
          style={{ background: "linear-gradient(160deg,#2b2030,#191320)" }}
        >
          <div className="text-[11px] tracking-[4px] text-[--gold2]">OUR SOUL NEEDS IT</div>
          <h2 className="serif text-[26px] mt-2 mb-1.5 leading-[1.3]">
            我们的身体不需要酒精
            <br />
            但灵魂需要！
          </h2>
          <p className="text-[14px] text-[--muted]">今夜先从一杯{hero.name}开始。</p>
          <div className="flex gap-2 mt-4">
            <Link href={`/cocktails/${hero.id}`} className="cta">
              查看配方 →
            </Link>
            <Link href="/cocktails" className="cta ghost">
              全部配方
            </Link>
          </div>
          <div
            className="absolute -right-1 -bottom-2 w-[150px] h-[150px] rounded-full border-2 border-[--gold] opacity-90 bg-cover bg-center"
            style={{
              backgroundImage: `url(${hero.photo})`,
              boxShadow: "0 0 0 3px rgba(20,16,24,.6), 0 10px 30px rgba(0,0,0,.5)",
            }}
          />
        </div>

        {/* 快捷入口 */}
        <div className="grid grid-cols-4 gap-2.5 mt-4">
          {QUICK.map((q) => (
            <Link key={q.href} href={q.href} className="bg-[--panel] border border-[--line] rounded-[14px] pt-3 pb-2.5 text-center no-underline active:scale-95 transition-transform">
              <PhotoIcon url={q.photo} size="lg" />
              <span className="block text-[12px] text-[--muted] mt-1.5">{q.label}</span>
            </Link>
          ))}
        </div>

        {/* 热门配方 */}
        <Section title="热门配方" more="全部" moreHref="/cocktails">
          <div className="flex gap-3.5 overflow-x-auto no-scrollbar snap-x pb-1">
            {COCKTAILS.slice(0, 6).map((c) => (
              <CocktailCard key={c.id} c={c} horizontal />
            ))}
          </div>
        </Section>

        {/* 故事与文化 */}
        <Section title="故事与文化" more="更多" moreHref="/stories">
          {STORIES.slice(0, 2).map((s) => (
            <Link
              key={s.id}
              href="/stories"
              className="flex gap-3.5 bg-[--panel] border border-[--line] rounded-[16px] p-4 mb-3.5 no-underline text-[--ink] hover:border-[--gold] transition-colors"
            >
              <span className="text-[40px] flex-none">{s.cover}</span>
              <span>
                <span className="text-[11px] text-[--gold2] border border-[--gold] rounded-full px-2 py-0.5 inline-block mb-1.5">{s.tag}</span>
                <span className="serif text-[16px] block">{s.title}</span>
                <span className="text-[13px] text-[--muted]">{s.excerpt}</span>
              </span>
            </Link>
          ))}
        </Section>
      </div>

      <TabBar active="/" />
    </div>
  );
}
