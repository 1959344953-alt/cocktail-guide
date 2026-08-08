import Link from "next/link";
import type { Cocktail } from "@/lib/types";

export function PhotoIcon({
  url,
  size = "md",
  alt,
}: {
  url: string;
  size?: "sm" | "md" | "lg";
  alt?: string;
}) {
  const cls = size === "sm" ? "ph ph-sm" : size === "lg" ? "ph ph-lg" : "ph ph-md";
  return <span className={cls} style={{ backgroundImage: `url(${url})` }} role="img" aria-label={alt} />;
}

export function PhotoBg({ c, className, children }: { c: Cocktail; className?: string; children?: React.ReactNode }) {
  return (
    <div className={`ph-bg ${className || ""}`} style={{ backgroundImage: `linear-gradient(160deg, rgba(201,162,75,.16), rgba(16,10,18,.38)), url(${c.photo})` }}>
      {children}
    </div>
  );
}

export function CocktailCard({ c, horizontal }: { c: Cocktail; horizontal?: boolean }) {
  return (
    <Link href={`/cocktails/${c.id}`} className="block">
      {horizontal ? (
        <div className="rcard min-w-[210px]">
          <PhotoBg c={c} className="h-[120px] grid place-items-center text-[34px]">
            <span className="drop-shadow-[0_3px_8px_rgba(0,0,0,.6)]">{c.emoji}</span>
          </PhotoBg>
          <div className="p-3.5">
            <div className="serif text-[17px] leading-tight">{c.name}</div>
            <div className="text-[11px] tracking-[1px] text-[--gold2]">{c.en}</div>
            <div className="flex gap-2 mt-2.5 flex-wrap">
              <span className="tag g">{c.base}</span>
              <span className="tag">{c.level}</span>
              <span className="tag">{c.abv}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="gcard">
          <PhotoBg c={c} className="h-[96px] grid place-items-center text-[30px]">
            <span className="drop-shadow-[0_3px_8px_rgba(0,0,0,.6)]">{c.emoji}</span>
          </PhotoBg>
          <div className="p-3">
            <div className="serif text-[15px] leading-tight">{c.name}</div>
            <div className="text-[10px] tracking-[1px] text-[--gold2]">{c.en}</div>
            <div className="mt-1.5 text-[11px] text-[--muted]">
              {c.base} · {c.abv} · {c.level}
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}

export function Section({
  title,
  more,
  moreHref,
  children,
}: {
  title: string;
  more?: string;
  moreHref?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mt-6 mb-3.5">
      <div className="flex items-baseline justify-between">
        <h2 className="serif text-[20px] tracking-[1px]">{title}</h2>
        <div className="flex-1 h-px mx-3 mb-1 bg-gradient-to-r from-[--gold] to-transparent" />
        {more && moreHref && (
          <Link href={moreHref} className="text-[13px] text-[--gold2] no-underline">
            {more} ›
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

const TABS = [
  { href: "/", label: "首页" },
  { href: "/cocktails", label: "配方" },
  { href: "/bar", label: "酒柜" },
  { href: "/convenience", label: "便利店" },
  { href: "/stories", label: "故事" },
];

const TAB_PHOTOS: Record<string, string> = {
  "/": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=80&q=80&auto=format&fit=crop",
  "/cocktails": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=80&q=80&auto=format&fit=crop",
  "/bar": "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=140&q=80&auto=format&fit=crop",
  "/convenience": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=80&q=80&auto=format&fit=crop",
  "/stories": "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=80&q=80&auto=format&fit=crop",
};

export function TabBar({ active }: { active: string }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-30 grid grid-cols-5 px-1.5 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] bg-[rgba(20,16,24,.92)] backdrop-blur-md border-t border-[--line]">
      {TABS.map((t) => {
        const on = active === t.href;
        const isMid = t.href === "/bar";
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`flex flex-col items-center gap-1 py-1.5 text-[11px] no-underline ${on ? "text-[--gold2]" : "text-[--muted]"}`}
          >
            {isMid ? (
              <span
                className="ph w-[34px] h-[34px] border-[1.5px] -mt-3.5"
                style={{ backgroundImage: `url(${TAB_PHOTOS[t.href]})` }}
              />
            ) : (
              <span className="ph ph-sm" style={{ backgroundImage: `url(${TAB_PHOTOS[t.href]})` }} />
            )}
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function TopBar() {
  return (
    <header className="sticky top-0 z-20 bg-[rgba(20,16,24,.75)] backdrop-blur-md border-b border-[--line] px-4.5 pt-3.5 pb-3">
      <Link href="/" className="flex items-center gap-2.5 no-underline text-[--ink]">
        <span
          className="ph w-[30px] h-[30px] border-[1.2px]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=120&q=80&auto=format&fit=crop')" }}
        />
        <div>
          <h1 className="serif text-[19px] tracking-[2px] leading-none">调酒指南</h1>
          <small className="text-[10px] tracking-[3px] text-[--gold2]">THE MIXOLOGY ALMANAC</small>
        </div>
      </Link>
    </header>
  );
}
