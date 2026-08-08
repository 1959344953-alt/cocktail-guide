import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-[440px] mx-auto min-h-screen grid place-items-center text-center px-6">
      <div>
        <div className="text-[64px]">🥃</div>
        <h1 className="serif text-[24px] mt-4">这杯酒调不出来</h1>
        <p className="text-[14px] text-[--muted] mt-2">页面不存在，可能被喝光了。</p>
        <Link href="/" className="cta mt-6 no-underline">
          回到首页
        </Link>
      </div>
    </div>
  );
}
