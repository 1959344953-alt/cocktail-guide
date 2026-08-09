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
    story: "1919 年佛罗伦萨，Camillo Negroni 伯爵嫌美式鸡尾酒太温和，让调酒师把苏打水换成金酒。金酒是烈性的执念，味美思是温柔的妥协，金巴利是放不下的苦涩——三种材料等量对冲、互不相让，正如一段势均力敌的爱情。伯爵大概没想到，这场「调烈一点」的任性，定义了整个鸡尾酒世界的审美。",
    lore: "一段势均力敌的爱情。",
  },
  {
    id: "margarita", name: "玛格丽特", en: "Margarita", cat: "经典", base: "龙舌兰",
    level: "简单", abv: "22%", time: "4 分钟", glass: "玛格丽特杯", emoji: "🧂",
    color: "#7FB069", tags: ["酸", "甜", "清爽", "适合新手"],
    photo: "https://images.pexels.com/photos/35087284/pexels-photo-35087284.jpeg?w=800&h=600&fit=crop",
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
    story: "流传最广的版本里，1940 年代的墨西哥，一位调酒师在打猎时误杀了挚爱的女友 Margarita，从此用她的名字命名这杯酒。酒液代表心里的痛苦，柠檬汁是喉头的酸楚，杯沿的细盐是流不尽的眼泪——致那份逝去的爱情。故事的真相已不可考，但每一杯咸酸交织的玛格丽特，都在替某个失恋的人喝下这口遗憾。",
    lore: "致那份逝去的爱情。",
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
    story: "莫吉托起源于古巴哈瓦那，远祖是 16 世纪水手们治疗坏血病的草药酒。真正让它封神的是海明威——他在哈瓦那住了二十年，每天去 La Bodeguita 喝一杯，还留下涂鸦「我的莫吉托在 La Bodeguita」。薄荷是夏天的入场券，青柠是清晨的清醒剂，朗姆酒是成年人藏在杯底的自由——这杯酒替所有想逃去海边的人，先逃了。",
    lore: "替所有想逃去海边的人，先逃了。",
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
    story: "1880 年代的肯塔基赛马俱乐部，挑剔的绅士们嫌新式鸡尾酒花哨，要求调酒师「用老办法调一杯」——威士忌、糖、苦精，仅此而已。糖是平淡日常里的一点甜，苦精是生活教会你的那点苦。它像一段不花哨的关系：不需要花言巧语，但每一口都掷地有声。",
    lore: "不需要花言巧语，但每一口都掷地有声。",
  },
  {
    id: "godfather", name: "教父", en: "Godfather", cat: "经典", base: "威士忌",
    level: "中等", abv: "28%", time: "5 分钟", glass: "古典杯", emoji: "🥃",
    color: "#8A5A2B", tags: ["杏仁", "威士忌主导", "烟熏", "高级经典"],
    photo: "https://images.pexels.com/photos/9566383/pexels-photo-9566383.jpeg?w=800&h=600&fit=crop",
    tools: ["量酒器", "吧勺", "古典杯"],
    intro: "威士忌的醇厚遇上杏仁力娇酒的甜香，烟雾缭绕，如教父般沉稳有力。",
    ingredients: [
      { name: "威士忌", amt: "45ml", note: "苏格兰威士忌风味最佳" },
      { name: "杏仁力娇酒", amt: "15ml" },
      { name: "肉桂棒", amt: "1根", note: "熏杯用，这一环节不可省略" },
      { name: "大冰块", amt: "1块" },
    ],
    steps: [
      "点燃肉桂棒，用火焰熏香古典杯内壁（肉桂熏杯，不可省略）",
      "杯中放入大冰块",
      "倒入威士忌与杏仁力娇酒",
      "搅拌至冰凉，肉桂棒装饰",
    ],
    video: "https://www.bilibili.com/",
    story: "1972 年《教父》上映，马龙·白兰度用沙哑的嗓音说出「我会给他一个无法拒绝的提议」。这杯以苏格兰威士忌为底、杏仁力娇酒调和的酒，恰如教父本人：威士忌的烈度不容拒绝，杏仁的甜香让你甘愿沉沦，肉桂熏杯升起的那缕烟，是他指尖雪茄的余韵——一杯下肚，你便成了他的家人。",
    lore: "我会给他一个无法拒绝的提议。",
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
    story: "大都会兴起于 1980 年代的纽约，真正让它成为都市文化符号的是《欲望都市》里 Carrie 失恋后点的那一杯。伏特加是都市人的清醒，蔓越莓汁是心口那抹绯红，青柠是尖锐的刺痛——粉色不是浪漫，是把眼泪调成鸡尾酒的颜色。喝完这杯，明天照常上班。",
    lore: "粉色不是浪漫，是把眼泪调成鸡尾酒的颜色。",
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
    story: "19 世纪的水手远航时带着柠檬和烈酒——柠檬防坏血病，烈酒壮胆，两者加糖摇匀，就是最早的酸酒，威士忌酸正是这个家族的教科书。威士忌是海上的风暴，柠檬是咸风里的清醒，糖浆是远方灯塔的光；蛋白摇出的绵密泡沫浮在杯顶，像风暴过后的海面，终于平静。",
    lore: "风暴过后，海面终于平静。",
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
    story: "1980 年代的伦敦，一位名模走进酒吧，对调酒师说：「给我一杯能让我清醒，又让我微醺的酒。」于是浓缩咖啡、伏特加、咖啡力娇酒被摇进同一杯——咖啡的苦是生活的真相，伏特加是短暂的逃离，糖浆是自欺欺人的甜。这杯深夜咖啡因与酒精的混合物，从此成为都市夜归人的心照不宣。",
    lore: "让我清醒，也让我微醺。",
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
    story: "1888 年，新奥尔良的金菲士风靡全城，酒吧门口排起长队，店家不得不雇几十个人专门摇酒。金酒是南方午后的热风，柠檬是遮阳伞下的光斑，气泡是期待里的小小雀跃——喝一口，好像整个夏天都值得原谅。",
    lore: "喝一口，好像整个夏天都值得原谅。",
  },
  {
    id: "pinacolada", name: "椰林飘香", en: "Pina Colada", cat: "经典", base: "朗姆酒",
    level: "简单", abv: "15%", time: "5 分钟", glass: "飓风杯", emoji: "🍍",
    color: "#F2E3C6", tags: ["椰香", "热带", "甜", "低酒精", "适合新手"],
    photo: "https://images.pexels.com/photos/10986589/pexels-photo-10986589.jpeg?w=800&h=600&fit=crop",
    tools: ["摇壶", "滤冰器", "飓风杯"],
    intro: "椰奶与菠萝的甜润热带风情，一口仿佛置身加勒比海滩。",
    ingredients: [
      { name: "白朗姆酒", amt: "45ml" },
      { name: "椰奶", amt: "60ml" },
      { name: "菠萝汁", amt: "90ml" },
      { name: "菠萝角", amt: "1块", note: "装饰用" },
    ],
    steps: [
      "雪克杯加冰，倒入所有材料",
      "摇匀约 15 秒",
      "滤入装满碎冰的飓风杯",
      "菠萝角与樱桃装饰",
    ],
    video: "https://www.bilibili.com/",
    story: "1954 年，波多黎各的调酒师把这杯献给世界：白朗姆、椰奶、菠萝汁摇出热带甜润，1979 年的神曲《Escape》又把它唱进所有人心里。椰奶是加勒比的白沙滩，菠萝是赤道线上最甜的太阳——它不装深沉、不卖惨，就是坦坦荡荡的快乐，不需要理由。",
    lore: "坦坦荡荡的快乐，不需要理由。",
  },
  {
    id: "cubalibre", name: "自由古巴", en: "Cuba Libre", cat: "经典", base: "朗姆酒",
    level: "超简单", abv: "12%", time: "2 分钟", glass: "高球杯", emoji: "🥤",
    color: "#3B2A1A", tags: ["可乐", "甜", "清爽", "适合新手"],
    photo: "https://images.pexels.com/photos/13614748/pexels-photo-13614748.jpeg?w=800&h=600&fit=crop",
    tools: ["吧勺", "高球杯"],
    intro: "朗姆酒与可乐的经典组合，加一片青柠，是酒吧入门第一杯。",
    ingredients: [
      { name: "白朗姆酒", amt: "50ml" },
      { name: "可乐", amt: "120ml", note: "最后补入，避免过度搅拌消泡" },
      { name: "青柠", amt: "1/4个", note: "挤汁后投入杯中" },
    ],
    steps: [
      "高球杯加满冰块",
      "挤入青柠汁，投入青柠角",
      "倒入朗姆酒",
      "补满可乐，轻搅",
    ],
    video: "https://www.bilibili.com/",
    story: "1900 年，古巴独立战争胜利在望，人们把朗姆酒倒进可乐，举杯高呼「Cuba Libre」（自由的古巴）。可乐是黑色的沉默，朗姆酒是压抑了太久的呐喊，青柠是眼角那滴没掉下来的泪——这杯看似随意的组合，承载的是整个殖民时代的向往。有些自由，是喝出来的。",
    lore: "有些自由，是喝出来的。",
  },
  {
    id: "singaporesling", name: "新加坡司令", en: "Singapore Sling", cat: "经典", base: "金酒",
    level: "进阶", abv: "20%", time: "6 分钟", glass: "飓风杯", emoji: "🌸",
    color: "#E8A0B4", tags: ["果香", "粉红", "热带", "进阶"],
    photo: "https://images.pexels.com/photos/5116860/pexels-photo-5116860.jpeg?w=800&h=600&fit=crop",
    tools: ["摇壶", "滤冰器", "飓风杯"],
    intro: "金酒为底、粉红果香绵长的传奇长饮，新加坡莱佛士酒店的百年招牌。",
    ingredients: [
      { name: "金酒", amt: "30ml" },
      { name: "樱桃白兰地", amt: "15ml" },
      { name: "菠萝汁", amt: "60ml" },
      { name: "青柠汁", amt: "15ml" },
      { name: "石榴糖浆", amt: "10ml", note: "没有可用红石榴汁替代" },
      { name: "苏打水", amt: "适量" },
    ],
    steps: [
      "雪克杯加冰，倒入金酒、樱桃白兰地、果汁与糖浆",
      "摇匀约 15 秒",
      "滤入加冰飓风杯",
      "补苏打水，橙皮与樱桃装饰",
    ],
    video: "https://www.bilibili.com/",
    story: "1915 年，新加坡莱佛士酒店 Long Bar，一位女士想喝一杯「像日落一样温柔的酒」，调酒师于是调制了这杯粉红色长饮。金酒是白天的体面，石榴糖浆是黄昏的暧昧，菠萝汁续上热带永不落幕的夏天——它替所有矜持的人，先醉了。",
    lore: "替所有矜持的人，先醉了。",
  },
  {
    id: "longislandicedtea", name: "长岛冰茶", en: "Long Island Iced Tea", cat: "现代", base: "伏特加",
    level: "进阶", abv: "28%", time: "4 分钟", glass: "高球杯", emoji: "🧊",
    color: "#8A6A3B", tags: ["烈", "甜", "冰茶感", "酒感强", "进阶"],
    photo: "https://images.pexels.com/photos/10883347/pexels-photo-10883347.jpeg?w=800&h=600&fit=crop",
    tools: ["量酒器", "吧勺", "高球杯"],
    intro: "五款烈酒混出的「冰茶」，喝起来像茶，后劲却大得惊人。",
    ingredients: [
      { name: "伏特加", amt: "15ml" },
      { name: "金酒", amt: "15ml" },
      { name: "朗姆酒", amt: "15ml" },
      { name: "龙舌兰", amt: "15ml" },
      { name: "君度力娇酒", amt: "15ml" },
      { name: "柠檬汁", amt: "25ml" },
      { name: "可乐", amt: "适量", note: "调出冰茶色泽" },
    ],
    steps: [
      "高球杯加满冰块",
      "依次倒入五种烈酒与君度",
      "挤入柠檬汁",
      "补满可乐至冰茶色，柠檬片装饰",
    ],
    video: "https://www.bilibili.com/",
    story: "1970 年代纽约长岛，有人把伏特加、金酒、朗姆、龙舌兰、君度五种烈酒倒进同一杯，再用可乐伪装成冰茶的颜色——看着人畜无害，实则一杯顶五杯。它像一段表面风平浪静的关系，内里早已暗流涌动：你以为是温柔，其实是烈性。",
    lore: "你以为是温柔，其实是烈性。",
  },
  {
    id: "screwdriver", name: "螺丝起子", en: "Screwdriver", cat: "经典", base: "伏特加",
    level: "超简单", abv: "12%", time: "2 分钟", glass: "高球杯", emoji: "🍊",
    color: "#F2A33C", tags: ["橙香", "甜", "清爽", "适合新手"],
    photo: "https://images.pexels.com/photos/1351750/pexels-photo-1351750.jpeg?w=800&h=600&fit=crop",
    tools: ["吧勺", "高球杯"],
    intro: "伏特加与橙汁的极简组合，一杯阳光色的清醒与微醺。",
    ingredients: [
      { name: "伏特加", amt: "45ml" },
      { name: "橙汁", amt: "120ml", note: "冰镇橙汁口感最佳" },
      { name: "橙片", amt: "1片", note: "装饰用" },
    ],
    steps: [
      "高球杯加满冰块",
      "倒入伏特加",
      "补满冰镇橙汁",
      "轻搅，橙片装饰",
    ],
    video: "https://www.bilibili.com/",
    story: "1949 年《时代》杂志首次记载：在伊朗油田工作的美国石油工人，把伏特加和橙汁倒进杯子，手边没有吧勺，随手抄起一把螺丝刀搅拌——酒因此得名 Screwdriver。橙汁是阳光下最诚实的甜，伏特加是藏在甜里的烈性，一杯下肚，仿佛沙漠里的工棚都亮了起来。",
    lore: "有些清醒，是用螺丝刀搅出来的。",
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
    story: "养乐多是童年的味道，伏特加是成年的入口。当童年的甜撞上成年的烈，就是这杯便利店里的养乐多特调——零门槛的制作，装着的却是成年人最复杂的心事。小时候想快点长大，长大后想回到小时候。",
    lore: "小时候想快点长大，长大后想回到小时候。",
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
    story: "冰红茶是学生时代的夏夜，威士忌是工作后的凌晨。把两者倒进同一杯，就是成年人最诚实的自白：我还想保留一点甜，但我已经尝过生活的烈。拧开瓶盖的那一下，是忙碌生活里难得的喘息。",
    lore: "我还想保留一点甜，但我已经尝过生活的烈。",
  },
  {
    id: "cv-irishcarbomb", name: "爱尔兰汽车人炸弹", en: "Irish Carbomb", cat: "便利店", base: "威士忌",
    level: "超简单", abv: "12%", time: "2 分钟", glass: "冰杯", emoji: "🍺", color: "#C9A24B", conv: true,
    tags: ["麦香", "咖啡感", "便利店", "酒感强"],
    photo: "https://images.pexels.com/photos/1612175/pexels-photo-1612175.jpeg?w=800&h=600&fit=crop",
    tools: ["吸管"],
    intro: "凯撒黄油啤酒遇上尊美醇威士忌——便利店版爱尔兰经典，一口下去麦香与咖啡感炸开。",
    ingredients: [
      { name: "凯撒黄油啤酒", amt: "1罐", note: "便利店啤酒区可买到；用黄油啤酒风味最正" },
      { name: "尊美醇威士忌", amt: "50ml", note: "小瓶装即可，爱尔兰威士忌风味最佳" },
      { name: "柠檬片", amt: "2片" },
      { name: "冰块", amt: "满杯" },
    ],
    steps: ["冰杯加满冰块", "挤入柠檬片提香", "倒入整罐凯撒黄油啤酒", "缓慢注入尊美醇威士忌，轻微搅拌"],
    video: "https://www.douyin.com/",
    story: "爱尔兰经典「汽车炸弹」的便利店版本：尊美醇威士忌沉进黄油啤酒，一口闷下——像一场勇敢的坠落。黄油啤酒的甜是温柔的假象，威士忌的烈是真实的底色。这杯酒教你的不是喝酒，是：有些事，趁热。",
    lore: "有些事，趁热。",
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

// 调酒科普：常见术语解释
export const GLOSSARY: { term: string; en: string; emoji: string; desc: string }[] = [
  { term: "酸酒", en: "Sour", emoji: "🍋",
    desc: "「烈酒 + 柠檬/青柠汁 + 糖」的铁三角结构，代表作威士忌酸。酸负责锋利，糖负责平衡，烈酒负责灵魂。所有酸酒的祖先，是水手们防坏血病的柠檬加烈酒。" },
  { term: "高球", en: "Highball", emoji: "🥤",
    desc: "「烈酒 + 大量碳酸饮料（苏打水/可乐/姜汁啤酒）+ 高身杯」的长饮结构。酒占比低、气泡足，适合慢喝。金汤力、自由古巴、莫吉托都属于这个大家族。" },
  { term: "菲士", en: "Fizz", emoji: "🫧",
    desc: "「酸酒 + 苏打水」的变体，最后补入气泡水让酒体轻盈绵密。金菲士是代表——摇出泡沫，注入气泡，像一杯会冒泡的柠檬汽水，但藏着金酒的骨架。" },
  { term: "古典", en: "Old Fashioned", emoji: "🥃",
    desc: "最原始的鸡尾酒结构：烈酒 + 糖 + 苦精，不加果汁不加气泡。它定义了「鸡尾酒」这个词的本义——简单到极致，也讲究到极致。" },
  { term: "马天尼杯型", en: "Martini Glass", emoji: "🍸",
    desc: "V 形高脚杯，杯口大、杯身浅。专为纯饮和短饮设计——酒量少，但喝得快，香气在杯口集中。马天尼、大都会、浓缩咖啡马天尼都用它。" },
  { term: "古典杯", en: "Rocks Glass", emoji: "🥃",
    desc: "矮胖厚底杯，专为加冰慢饮设计。冰块在宽杯底缓慢融化，酒体逐渐稀释、风味层层展开。Old Fashioned、尼格罗尼、教父都住在这里。" },
  { term: "短饮 vs 长饮", en: "Short / Long Drink", emoji: "⏳",
    desc: "短饮（Short）酒量大、冰块少，3-5 口喝完，如马天尼、古典；长饮（Long）酒量小、兑碳酸饮料，可以喝半小时，如莫吉托、金汤力。选哪杯，取决于你想聊多久。" },
  { term: "摇 vs 搅", en: "Shake / Stir", emoji: "🥄",
    desc: "含果汁、蛋白、奶油的配方要「摇」——剧烈震荡混入空气，口感绵密、快速稀释；纯烈酒配方要「搅」——慢慢降温，保持酒体清澈顺滑。温度一样，风味却天壤之别。" },
  { term: "直调", en: "Build", emoji: "🧊",
    desc: "直接在饮用杯里逐层加材料，不摇不搅，靠冰块自行混合。Highball 类（金汤力、自由古巴）全是直调——简单到零门槛，是酒吧新手的第一个技能。" },
  { term: "装饰", en: "Garnish", emoji: "🍊",
    desc: "杯口的橙皮、柠檬片、薄荷不只是好看——橙皮的油脂喷洒在酒面上，是香气的最后一层。装饰是调酒师的签名，也是这杯酒对你说的话。" },
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
