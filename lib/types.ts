// 调酒指南数据层 —— 类型定义
export interface Ingredient {
  name: string;
  amt: string;
  note?: string;
}

export interface Cocktail {
  id: string;
  name: string;
  en: string;
  cat: string;
  base: string;
  level: string;
  abv: string;
  time: string;
  glass: string;
  emoji: string;
  color: string;
  photo: string;
  tags: string[];
  tools: string[];
  intro: string;
  ingredients: Ingredient[];
  steps: string[];
  video: string;
  story: string;
  lore?: string; // 酒语：这杯酒的浪漫传说与意象解读
  conv?: boolean;
}

export interface Story {
  id: string;
  tag: string;
  title: string;
  cover: string;
  excerpt: string;
  body?: string[];
}

export interface Spirit {
  name: string;
  en: string;
  emoji: string;
  note: string;
}

export interface StockItem {
  name: string;
  en: string;
  emoji: string;
}
