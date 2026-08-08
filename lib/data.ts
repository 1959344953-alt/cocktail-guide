import type { Cocktail, Story, Spirit, StockItem } from "./types";

const u = (id: string) => `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`;

export const COCKTAILS: Cocktail[] = [
  {
    id: "negroni", name: "尼格罗尼", en: "Negroni", cat: "经典", base: "金酒",
    level: "简单", abv: "24%", time: "3 分钟", glass: "古典杯", emoji: "🍊",
    color: "#B5321E", tags: ["苦甜平衡", "草本", "酒感强", "高级经典"],
    photo: "https://images.pexels.com/photos/14387131/pexels-photo-14387131.jpeg?w=800&h=600&fit=crop",
    tools: ["量酒器", "吧勺", "古典杯"],
    intro: "苦甜平衡的意大利开胃酒，等比三杯，永不出错。",
    ingredients: [
      { name: "金酒", amt: "30ml" },
      { name: "甜味美思", amt: "30ml" },
      { name: "金巴利", amt: "30ml" },
      { name: "橙皮", amt: "1片", note: "装饰用；没有可用柠檬皮替代" },
    ],
    steps: [
      "古典杯中加满大冰块",
      "依次倒入金酒、甜味美思、金巴利",
      "搅拌 20 秒至冰凉",
      "以橙皮卷装饰，挤出橙油于杯口",
    ],
    video: "https://www.bilibili.com/",
    story: "1919 年佛罗伦萨，Camillo Negroni 伯爵嫌美式鸡尾酒太温和，让调酒师把苏打水换成金酒，从此诞生。",
  },
  {
    id: "margarita", name: "玛格丽特", en: "Margarita", cat: "经典", base: "龙舌兰",
    level: "简单", abv: "22%", time: "4 分钟", glass: "玛格丽特杯", emoji: "🧂",
    color: "#7FB069", tags: ["酸", "甜", "清爽", "适合新手"],
    photo: "https://images.pexels.com/photos/6428258/pexels-photo-6428258.jpeg?w=800&h=600&fit=crop",
    tools: ["量酒器", "摇壶", "滤冰器", "玛格丽特杯"],
    intro: "咸口杯沿、酸甜清爽，最受欢迎的龙舌兰鸡尾酒。",
    ingredients: [
      { name: "龙舌兰", amt: "45ml" },
      { name: "君度力娇酒", amt: "20ml" },
      { name: "青柠", amt: "20ml", note: "可作青柠汁，也可切片装饰；没有时可少量用柠檬替代" },
      { name: "细盐", amt: "适量", note: "杯沿蘸盐用，可选" },
    ],
    steps: [
      "杯沿抹青柠、蘸细盐",
      "雪克杯加冰，倒入所有材料",
      "摇匀约 15 秒",
      "滤入冰镇玛格丽特杯，青柠片装饰",
    ],
    video: "https://www.bilibili.com/",
    story: "关于命名众说纷纭，最动人的版本是调酒师为纪念一位意外离世的爱人 Margarita 而调制。",
  },
  {
    id: "mojito", name: "莫吉托", en: "Mojito", cat: "经典", base: "朗姆酒",
    level: "简单", abv: "13%", time: "6 分钟", glass: "高球杯", emoji: "🌿",
    color: "#4FA96B", tags: ["清爽", "酸", "甜", "低酒精", "适合新手"],
    photo: "https://images.pexels.com/photos/4051220/pexels-photo-4051220.jpeg?w=800&h=600&fit=crop",
    tools: ["捣棒", "吧勺", "高球杯"],
    intro: "薄荷与青柠的夏日灵魂，海明威的最爱。",
    ingredients: [
      { name: "朗姆酒", amt: "45ml" },
      { name: "青柠", amt: "25ml", note: "可切片装饰；没有时可用柠檬替代" },
      { name: "薄荷", amt: "8片", note: "轻拍后使用，避免过度捣碎发苦" },
      { name: "糖浆", amt: "15ml" },
      { name: "苏打水", amt: "适量", note: "最后补入，避免搅拌过度消泡" },
      { name: "冰块", amt: "满杯" },
    ],
    steps: [
      "杯中放薄荷、糖浆、青柠汁，轻捣出香",
      "加满碎冰",
      "倒入朗姆酒，补苏打水",
      "搅拌，薄荷束装饰",
    ],
    video: "https://www.bilibili.com/",
    story: "起源于古巴哈瓦那，据传由 16 世纪治疗坏血病的草药酒演变而来。",
  },
  {
    id: "oldfashioned", name: "古典鸡尾酒", en: "Old Fashioned", cat: "经典", base: "威士忌",
    level: "中等", abv: "32%", time: "4 分钟", glass: "古典杯", emoji: "🥃",
    color: "#A15C2E", tags: ["威士忌主导", "微甜", "酒感强", "高级经典"],
    photo: "https://images.pexels.com/photos/8346712/pexels-photo-8346712.jpeg?w=800&h=600&fit=crop",
    tools: ["量酒器", "吧勺", "古典杯"],
    intro: "鸡尾酒的鼻祖，威士忌、糖、苦精的极简艺术。",
    ingredients: [
      { name: "威士忌", amt: "60ml" },
      { name: "糖浆", amt: "10ml" },
      { name: "安高天娜苦精", amt: "2抖", note: "没有可省略，风味会简单一些" },
      { name: "橙皮", amt: "1片", note: "装饰用" },
    ],
    steps: [
      "古典杯中加糖浆与苦精",
      "放入大冰块",
      "倒威士忌，搅拌 30 秒",
      "橙皮挤油、装饰",
    ],
    video: "https://www.bilibili.com/",
    story: "1880 年代肯塔基赛马俱乐部，客人要「用老办法调一杯」，Old Fashioned 由此得名。",
  },
  {
    id: "cosmopolitan", name: "大都会", en: "Cosmopolitan", cat: "经典", base: "伏特加",
    level: "简单", abv: "20%", time: "3 分钟", glass: "马天尼杯", emoji: "🩷",
    color: "#C6185C", tags: ["果香", "酸", "甜", "粉红"],
    photo: "https://images.pexels.com/photos/8800263/pexels-photo-8800263.jpeg?w=800&h=600&fit=crop",
    tools: ["量酒器", "摇壶", "滤冰器", "马天尼杯"],
    intro: "粉红色的都市女郎，《欲望都市》带火全球。",
    ingredients: [
      { name: "伏特加", amt: "40ml" },
      { name: "君度力娇酒", amt: "15ml" },
      { name: "蔓越莓汁", amt: "30ml" },
      { name: "青柠", amt: "15ml", note: "没有时可用柠檬替代" },
    ],
    steps: [
      "雪克杯加冰，倒入所有材料",
      "摇匀约 12 秒",
      "滤入冰镇马天尼杯",
      "橙皮或青柠装饰",
    ],
    video: "https://www.bilibili.com/",
    story: "1980 年代兴起，因剧集 Sex and the City 中 Carrie 手持一杯而成为都市文化符号。",
  },
  {
    id: "whiskeysour", name: "威士忌酸", en: "Whiskey Sour", cat: "经典", base: "威士忌",
    level: "中等", abv: "23%", time: "5 分钟", glass: "古典杯", emoji: "🍋",
    color: "#D9A441", tags: ["酸", "甜", "绵密", "进阶"],
    photo: "https://images.pexels.com/photos/14161977/pexels-photo-14161977.jpeg?w=800&h=600&fit=crop",
    tools: ["量酒器", "摇壶", "滤冰器", "古典杯"],
    intro: "酸甜绵密带蛋白泡沫，酸酒家族的教科书。",
    ingredients: [
      { name: "威士忌", amt: "50ml" },
      { name: "柠檬", amt: "25ml" },
      { name: "糖浆", amt: "15ml" },
      { name: "蛋白", amt: "1个", note: "没有可省略，口感会薄一些" },
    ],
    steps: [
      "所有材料先干摇（不加冰）打发蛋白",
      "加冰再摇匀",
      "滤入古典杯",
      "苦精点缀泡沫、樱桃装饰",
    ],
    video: "https://www.bilibili.com/",
    story: "19 世纪水手为防坏血病随身带柠檬与烈酒，酸酒配方由此在航海时代流传。",
  },
  {
    id: "espressomartini", name: "浓缩咖啡马天尼", en: "Espresso Martini", cat: "现代", base: "伏特加",
    level: "中等", abv: "18%", time: "4 分钟", glass: "马天尼杯", emoji: "☕",
    color: "#3B2417", tags: ["咖啡味", "甜", "奶香", "饭后"],
    photo: "https://images.pexels.com/photos/3407778/pexels-photo-3407778.jpeg?w=800&h=600&fit=crop",
    tools: ["量酒器", "摇壶", "滤冰器", "马天尼杯"],
    intro: "「让我清醒，也让我微醺」，深夜咖啡因的浪漫。",
    ingredients: [
      { name: "伏特加", amt: "40ml" },
      { name: "咖啡力娇酒", amt: "20ml" },
      { name: "浓缩咖啡", amt: "30ml", note: "没有浓缩机可用高浓度速溶冲兑" },
      { name: "糖浆", amt: "10ml" },
    ],
    steps: [
      "雪克杯加冰，倒入所有材料",
      "用力摇匀打出泡沫层",
      "滤入冰镇马天尼杯",
      "三颗咖啡豆装饰",
    ],
    video: "https://www.bilibili.com/",
    story: "1980 年代伦敦，一位名模对调酒师说「给我一杯能让我清醒又微醺的酒」，于是有了它。",
  },
  {
    id: "ginfizz", name: "金菲士", en: "Gin Fizz", cat: "经典", base: "金酒",
    level: "简单", abv: "14%", time: "4 分钟", glass: "高球杯", emoji: "🫧",
    color: "#8FC1D4", tags: ["清爽", "酸", "气泡", "低酒精"],
    photo: "https://images.pexels.com/photos/12902691/pexels-photo-12902691.jpeg?w=800&h=600&fit=crop",
    tools: ["量酒器", "摇壶", "滤冰器", "高球杯"],
    intro: "气泡绵柔、清新解腻的金酒长饮。",
    ingredients: [
      { name: "金酒", amt: "45ml" },
      { name: "柠檬", amt: "20ml" },
      { name: "糖浆", amt: "15ml" },
      { name: "苏打水", amt: "适量", note: "最后补入，避免消泡" },
    ],
    steps: [
      "金酒、柠檬汁、糖浆加冰摇匀",
      "滤入高球杯",
      "补满苏打水",
      "柠檬片装饰",
    ],
    video: "https://www.bilibili.com/",
    story: "1888 年新奥尔良风靡一时，酒吧曾雇数十人轮流摇酒以满足排队人潮。",
  },
];

export const CONVENIENCE: Cocktail[] = [
  {
    id: "cv-yakult", name: "养乐多特调", en: "Yakult Sour", cat: "便利店", base: "伏特加",
    level: "超简单", abv: "8%", time: "1 分钟", glass: "随行杯", emoji: "🥛", color: "#E8A33D", conv: true,
    tags: ["酸甜", "便利店", "零失败"], photo: "https://images.pexels.com/photos/4975373/pexels-photo-4975373.jpeg?w=800&h=600&fit=crop",
    tools: ["吸管"],
    intro: "便利店三件套：养乐多+柠檬味汽水+一小瓶伏特加，酸甜到停不下来。",
    ingredients: [
      { name: "养乐多", amt: "2瓶" },
      { name: "小瓶伏特加", amt: "100ml" },
      { name: "柠檬味汽水", amt: "适量", note: "超市/便利店任意柠檬味汽水均可" },
      { name: "冰块", amt: "满杯" },
    ],
    steps: ["杯中加满冰块", "倒入养乐多与伏特加", "补满柠檬味汽水", "轻轻搅拌即可"],
    video: "https://www.douyin.com/",
    story: "便利店调酒的入门款，几乎零失败。",
  },
  {
    id: "cv-icetea", name: "微醺冰红茶", en: "Boozy Iced Tea", cat: "便利店", base: "威士忌",
    level: "超简单", abv: "10%", time: "1 分钟", glass: "随行杯", emoji: "🧋", color: "#B5732E", conv: true,
    tags: ["甜", "茶香", "便利店", "零失败"], photo: "https://images.pexels.com/photos/8619612/pexels-photo-8619612.jpeg?w=800&h=600&fit=crop",
    tools: [],
    intro: "一瓶冰红茶配一小瓶威士忌，午后办公室的秘密快乐。",
    ingredients: [
      { name: "瓶装冰红茶", amt: "1瓶" },
      { name: "小瓶威士忌", amt: "50ml" },
      { name: "柠檬片", amt: "1片" },
    ],
    steps: ["冰红茶倒出三分之一", "补入威士忌", "放柠檬片，摇匀", "冰镇后饮用"],
    video: "https://www.douyin.com/",
    story: "便利店调酒的代表作，简单到只要会拧瓶盖就能做。",
  },
];

export const ALL_COCKTAILS: Cocktail[] = [...COCKTAILS, ...CONVENIENCE];

export const TASTES = ["清爽", "酸", "甜", "苦甜平衡", "奶香", "咖啡味", "果香", "气泡", "酒感强", "低酒精", "适合新手", "高级经典"];

export const BAR_STOCK: { spirits: StockItem[]; extras: StockItem[]; tools: StockItem[] } = {
  spirits: [
    { name: "伏特加", en: "Vodka", emoji: "💧" },
    { name: "金酒", en: "Gin", emoji: "🌲" },
    { name: "朗姆酒", en: "Rum", emoji: "🌴" },
    { name: "龙舌兰", en: "Tequila", emoji: "🌵" },
    { name: "威士忌", en: "Whisky", emoji: "🌾" },
    { name: "白兰地", en: "Brandy", emoji: "🍇" },
  ],
  extras: [
    { name: "柠檬", en: "Lemon", emoji: "🍋" },
    { name: "青柠", en: "Lime", emoji: "🍈" },
    { name: "糖浆", en: "Syrup", emoji: "🍯" },
    { name: "苏打水", en: "Soda", emoji: "🫧" },
    { name: "薄荷", en: "Mint", emoji: "🌿" },
    { name: "咖啡力娇酒", en: "Kahlua", emoji: "☕" },
    { name: "君度", en: "Cointreau", emoji: "🍊" },
    { name: "蔓越莓汁", en: "Cranberry", emoji: "🍒" },
  ],
  tools: [
    { name: "摇壶", en: "Shaker", emoji: "🥤" },
    { name: "量酒器", en: "Jigger", emoji: "🥉" },
    { name: "吧勺", en: "Spoon", emoji: "🥄" },
    { name: "滤冰器", en: "Strainer", emoji: "⏳" },
    { name: "捣棒", en: "Muddler", emoji: "🌡️" },
    { name: "古典杯", en: "Rocks", emoji: "🥃" },
  ],
};

export const STORIES: Story[] = [
  { id: "s1", tag: "人物", title: "海明威与他的五杯莫吉托", cover: "🌿",
    excerpt: "「我的莫吉托在 La Bodeguita，我的达伊基里在 El Floridita。」一句涂鸦，成就两家传奇酒吧。",
    body: ["1950 年代，海明威在古巴住了 20 年，几乎每天泡在哈瓦那的两家酒吧。", "La Bodeguita del Medio 的墙上至今挂着他手写的句子：My mojito in La Bodeguita, my daiquiri in El Floridita。", "据说他一晚能喝五杯莫吉托——也正因如此，这两杯酒成了古巴的灵魂名片。"] },
  { id: "s2", tag: "文化", title: "禁酒令：地下酒吧如何催生现代鸡尾酒", cover: "🚪",
    excerpt: "1920 年代美国，劣质私酒逼出了调酒师用果汁与糖浆「掩味」的智慧，经典配方由此爆发。",
    body: ["1920-1933 年，美国全面禁酒，但喝酒的人没有消失，只是转入地下。", "地下酒吧（Speakeasy）出售的私酒品质粗糙，调酒师不得不大量使用果汁、糖浆和苦精来掩盖杂味。", "这种「将错就错」反而催生了 Sidecar、Alexander 等无数经典，鸡尾酒文化就此爆发。"] },
  { id: "s3", tag: "知识", title: "为什么有的酒要摇，有的酒要搅？", cover: "🧊",
    excerpt: "含果汁蛋白的要摇出泡沫与稀释，纯烈酒的要搅以保持清澈——一字之差，风味天壤。",
    body: ["含果汁、蛋白、奶油的配方要「摇」（shake），剧烈震荡带出空气，口感绵密，也更快稀释。", "纯烈酒配方（如 Old Fashioned、Negroni）要「搅」（stir），慢慢降温而不破坏酒体清澈与顺滑。", "两者温度一致时，风味却有天壤之别——这正是调酒的玄妙所在。"] },
];

export const SPIRITS: Spirit[] = [
  { name: "金酒", en: "Gin", emoji: "🌲", note: "杜松子主导，草本清冽" },
  { name: "伏特加", en: "Vodka", emoji: "💧", note: "纯净无味，百搭画布" },
  { name: "朗姆酒", en: "Rum", emoji: "🌴", note: "甘蔗糖蜜，热带甜香" },
  { name: "龙舌兰", en: "Tequila", emoji: "🌵", note: "龙舌兰草，土壤气息" },
  { name: "威士忌", en: "Whiskey", emoji: "🌾", note: "谷物橡木，烟熏醇厚" },
  { name: "白兰地", en: "Brandy", emoji: "🍇", note: "水果蒸馏，圆润温暖" },
];

// 装饰性材料（缺了不影响做）
export const DECOR_ITEMS = ["橙皮", "细盐", "冰块", "蛋白", "薄荷", "柠檬片"];

// 三档匹配逻辑
export interface TierResult {
  ok: Cocktail[];
  simple: Cocktail[];
  near: Cocktail[];
}

export function matchTiers(stock: Set<string>, list: Cocktail[] = ALL_COCKTAILS): TierResult {
  const tiers: TierResult = { ok: [], near: [], simple: [] };
  list.filter((c) => !c.conv).forEach((c) => {
    const need = c.ingredients.filter((i) => !DECOR_ITEMS.includes(i.name) && !["适量", "满杯"].includes(i.amt));
    const have = need.filter((i) => stock.has(i.name));
    const missing = need.length - have.length;
    const toolsOk = (c.tools || []).every((t) => stock.has(t));
    if (missing === 0 && toolsOk) tiers.ok.push(c);
    else if (missing === 0) tiers.simple.push(c);
    else if (missing === 1) tiers.near.push(c);
  });
  return tiers;
}

export function matchByTastes(picks: Set<string>, list: Cocktail[] = ALL_COCKTAILS): Cocktail[] {
  return list
    .map((c) => ({ c, n: c.tags.filter((t) => picks.has(t)).length }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n)
    .map((x) => x.c);
}
