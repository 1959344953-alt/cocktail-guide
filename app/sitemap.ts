import type { MetadataRoute } from "next";
import { ALL_COCKTAILS } from "@/lib/data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://cocktail-guide-nu.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/cocktails", "/bar", "/taste", "/convenience", "/stories", "/publish"].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const cocktailPages = ALL_COCKTAILS.map((c) => ({
    url: `${BASE}/cocktails/${c.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...cocktailPages];
}
