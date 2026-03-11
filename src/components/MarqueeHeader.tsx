"use client";

import Marquee from "react-fast-marquee";

export default function MarqueeHeader() {
  return (
    <div className="w-full border-b-2 border-border bg-accent py-4 overflow-hidden">
      <Marquee speed={80} gradient={false} autoFill>
        <div className="flex items-center gap-12 text-accent-foreground font-bold text-3xl px-6">
          <span className="uppercase tracking-tighter">Generate QR Codes Instantly</span>
          <span className="text-4xl">//</span>
          <span className="uppercase tracking-tighter">Zero Error</span>
          <span className="text-4xl">//</span>
          <span className="uppercase tracking-tighter">Deploy Ready</span>
          <span className="text-4xl">//</span>
          <span className="uppercase tracking-tighter">Next.js 15</span>
          <span className="text-4xl">//</span>
        </div>
      </Marquee>
    </div>
  );
}
