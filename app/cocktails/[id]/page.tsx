import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_COCKTAILS } from "@/lib/data";
import { TabBar, TopBar, PhotoBg } from "@/components/ui";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return ALL_COCKTAILS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const c = ALL_COCKTAILS.find((x) => x.id === id);
  if (!c) return {};
  return {
    title: `${c.name}（${c.en}）鸡尾酒配方与调制教程`,
    description: `${c.name} ${c.en}：材料 ${c.ingredients.map((i) => i.name).join("、")}，酒精 ${c.abv}，难度 ${c.level}，制作时间 ${c.time}。附步骤、视频教程与背后的故事。`,
    keywords: [c.name, c.en, "鸡尾酒配方", "调酒教程", c.base].join(","),
    openGraph: {
      title: `${c.name} ${c.en} - 鸡尾酒配方`,
      description: c.intro,
      images: [c.photo],
      type: "article",
    },
  };
}

export default async function CocktailDetailPage({ params }: Props) {
  const { id } = await params;
  const c = ALL_COCKTAILS.find((x) => x.id === id);
  if (!c) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: `${c.name} (${c.en})`,
    description: c.intro,
    image: c.photo,
    recipeCategory: c.cat,
    recipeCuisine: "鸡尾酒",
    cookTime: c.time,
    recipeYield: "1 杯",
    recipeIngredient: c.ingredients.map((i) => `${i.name} ${i.amt}`),
    recipeInstructions: c.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, text: s })),
  };

  return (
    <div className="max-w-[440px] md:max-w-[1024px] mx-auto relative z-[1] pb-24 md:pb-12 min-h-screen">
      <TopBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="page-anim">
        {/* 头图 —— 手机全宽 / PC 左侧半宽 */}
        <div className="relative md:hidden">
          <PhotoBg c={c} className="h-[200px] border-b border-[--line]" />
          <Link
            href={c.conv ? "/convenience" : "/cocktails"}
            className="absolute top-3.5 left-3.5 w-[38px] h-[38px] rounded-full grid place-items-center bg-[rgba(0,0,0,.4)] border border-[--line] text-[18px] no-underline"
            aria-label="返回"
          >
            ‹
          </Link>
        </div>

        <div className="md:grid md:grid-cols-[380px_1fr] md:gap-8 md:px-8 md:pt-8">
          {/* PC 左侧：图 + 信息 */}
          <div>
            <div className="hidden md:block relative">
              <PhotoBg c={c} className="h-[420px] rounded-[20px] border border-[--line]" />
              <Link
                href={c.conv ? "/convenience" : "/cocktails"}
                className="absolute top-3.5 left-3.5 w-[38px] h-[38px] rounded-full grid place-items-center bg-[rgba(0,0,0,.4)] border border-[--line] text-[18px] no-underline"
                aria-label="返回"
              >
                ‹
              </Link>
            </div>
            {/* 视频按钮（PC 侧边） */}
            <a
              href={c.video}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-3 mt-4 bg-[linear-gradient(160deg,#2b2030,#191320)] border border-[--line] rounded-[16px] px-4 py-3.5 no-underline text-[--ink]"
            >
              <span className="w-11 h-11 rounded-full bg-[--wine] grid place-items-center text-[18px]">▶</span>
              <b className="text-[14px]">看调制视频</b>
            </a>
          </div>

          {/* 右侧内容 */}
          <div className="px-4.5 pt-3 md:px-0 md:pt-0">
            <h1 className="serif text-[26px] md:text-[34px] leading-tight">{c.name}</h1>
            <div className="text-[12px] tracking-[2px] text-[--gold2] mb-2.5">{c.en}</div>
            <div className="flex gap-2 flex-wrap mb-3">
              <span className="tag g">{c.base}</span>
              <span className="tag">{c.level}</span>
              <span className="tag">{c.abv}</span>
              <span className="tag">⏱ {c.time}</span>
              <span className="tag">🥃 {c.glass}</span>
            </div>
            <div className="flex gap-1.5 flex-wrap mb-2.5">
              {c.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-[14px] md:text-[16px] text-[#5a5a56] leading-[1.8]">{c.intro}</p>

            {/* PC 双栏：配料 + 步骤 */}
            <div className="md:grid md:grid-cols-2 md:gap-5 md:mt-4">
              <div className="bg-[--panel] border border-[--line] rounded-[16px] p-4 mt-4 md:mt-0">
                <h2 className="serif text-[16px] text-[--gold2] mb-3">🍹 配料</h2>
                {c.ingredients.map((i) => (
                  <div key={i.name} className="flex justify-between py-2 border-b border-dashed border-[--line] last:border-0">
                    <span>
                      {i.name}
                      {i.note && <small className="block text-[11px] text-[--muted]">{i.note}</small>}
                    </span>
                    <span className="text-[--gold2]">{i.amt}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[--panel] border border-[--line] rounded-[16px] p-4 mt-4 md:mt-0">
                <h2 className="serif text-[16px] text-[--gold2] mb-3">📝 步骤</h2>
                {c.steps.map((s, i) => (
                  <div key={i} className="flex gap-3 py-2">
                    <span className="w-6 h-6 flex-none rounded-full bg-gradient-to-br from-[--gold2] to-[--gold] text-[#1c1720] font-bold grid place-items-center text-[13px]">
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 手机视频按钮 */}
            <div className="flex gap-2.5 mt-4 md:hidden">
              <a
                href={c.video}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center gap-3 bg-[linear-gradient(160deg,#2b2030,#191320)] border border-[--line] rounded-[16px] px-4 py-3.5 no-underline text-[--ink]"
              >
                <span className="w-11 h-11 rounded-full bg-[--wine] grid place-items-center text-[18px]">▶</span>
                <b className="text-[14px]">看调制视频</b>
              </a>
            </div>

            {/* 酒语 */}
            {c.lore && (
              <div className="bg-[linear-gradient(160deg,#2b2030,#191320)] border border-[--gold] rounded-[16px] p-4 mt-4">
                <h2 className="serif text-[16px] text-[--gold2] mb-3">🥃 酒语</h2>
                <p className="text-[14px] text-[#e6d9c3] leading-[1.9]">{c.lore}</p>
              </div>
            )}

            {/* 故事 */}
            <div className="bg-[--panel] border border-[--line] rounded-[16px] p-4 mt-4 mb-8 md:mb-4">
              <h2 className="serif text-[16px] text-[--gold2] mb-3">📜 背后的故事</h2>
              <p className="text-[14px] text-[#a99e94] leading-[1.8]">{c.story}</p>
            </div>
          </div>
        </div>
      </div>
      <TabBar active={c.conv ? "/convenience" : "/cocktails"} />
    </div>
  );
}
