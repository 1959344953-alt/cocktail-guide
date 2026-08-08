"use client";

import { useState } from "react";
import { TabBar, TopBar } from "@/components/ui";

const inputCls =
  "w-full bg-[--bg2] border border-[--line] text-[--ink] rounded-xl px-3.5 py-3 text-[15px] outline-none focus:border-[--gold]";
const labelCls = "block text-[13px] text-[--muted] mt-4 mb-1.5 font-medium";

export default function PublishClient() {
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 接入 Supabase 后改为真实提交；当前演示本地保存
    try {
      const list = JSON.parse(localStorage.getItem("my-recipes") || "[]");
      list.push({ name, at: new Date().toISOString() });
      localStorage.setItem("my-recipes", JSON.stringify(list));
    } catch {}
    setDone(true);
  };

  if (done) {
    return (
      <div className="max-w-[440px] mx-auto relative z-[1] pb-24 min-h-screen">
        <TopBar />
        <div className="px-4.5 pt-16 text-center page-anim">
          <div className="text-[56px]">🍸</div>
          <h1 className="serif text-[22px] mt-3">配方已收到！</h1>
          <p className="text-[14px] text-[--muted] mt-2">我们审核后会把它加入配方库，让更多人调出这一杯。</p>
          <button className="cta mt-6" onClick={() => setDone(false)}>
            再发一个
          </button>
        </div>
        <TabBar active="/cocktails" />
      </div>
    );
  }

  return (
    <div className="max-w-[440px] mx-auto relative z-[1] pb-24 min-h-screen">
      <TopBar />
      <div className="px-4.5 pt-4 page-anim">
        <h1 className="serif text-[20px] tracking-[1px]">发布配方</h1>
        <p className="text-[13px] text-[--muted] mb-2">把你得意的那一杯写下来，分享给更多人。</p>
        <form onSubmit={submit}>
          <label className={labelCls}>配方名称</label>
          <input className={inputCls} required placeholder="例如：夜航船特调" value={name} onChange={(e) => setName(e.target.value)} />

          <label className={labelCls}>基酒</label>
          <input className={inputCls} required placeholder="例如：金酒" />

          <label className={labelCls}>一句话简介</label>
          <input className={inputCls} placeholder="它喝起来是什么感觉？" />

          <label className={labelCls}>配料（每行一个，如「金酒 30ml」）</label>
          <textarea className={`${inputCls} min-h-[90px] resize-y`} placeholder={"金酒 30ml\n甜味美思 30ml\n…"} />

          <label className={labelCls}>制作步骤（每行一步）</label>
          <textarea className={`${inputCls} min-h-[90px] resize-y`} placeholder={"1. 古典杯中加满大冰块\n2. …"} />

          <label className={labelCls}>视频链接（选填）</label>
          <input className={inputCls} placeholder="B站 / 抖音 链接" />

          <label className={labelCls}>背后的故事（选填）</label>
          <textarea className={`${inputCls} min-h-[70px] resize-y`} placeholder="这杯酒有什么来历或你的心情？" />

          <button type="submit" className="w-full mt-5 rounded-[14px] py-3.5 text-[15px] font-bold cursor-pointer bg-[linear-gradient(145deg,var(--gold2),var(--gold))] text-[#1c1720] border-0">
            发布配方
          </button>
          <p className="text-[12px] text-[--muted] text-center mt-3">
            当前为演示版（本地保存）。接入数据库后即可公开展示。
          </p>
        </form>
      </div>
      <TabBar active="/cocktails" />
    </div>
  );
}
