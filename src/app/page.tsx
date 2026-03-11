import QrGenerator from "@/components/QrGenerator";
import MarqueeHeader from "@/components/MarqueeHeader";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-accent selection:text-accent-foreground">
      {/* Brutalist Header */}
      <div className="border-b-2 border-border">
        <div className="container mx-auto max-w-[95vw] px-6 py-6 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Version 2.0.0</span>
            <span className="text-2xl font-black uppercase tracking-tighter">DS_ID_GENERATOR</span>
          </div>
          <ModeToggle />
        </div>
      </div>

      <MarqueeHeader />
      
      <QrGenerator />

      {/* High Energy Brutalist Footer */}
      <footer className="border-t-4 border-border bg-accent text-accent-foreground py-24 md:py-48 overflow-hidden relative">
        <div className="container mx-auto max-w-[95vw] px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end">
            <div className="space-y-12">
              <h3 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none italic">
                DS_SYS <br />
                GEN_05
              </h3>
              <p className="text-xl md:text-2xl font-bold uppercase tracking-tight leading-none max-w-xl">
                A relentless typographic experiment in visual identification. Built with Next.js 15 and unwavering kinetic energy.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 text-sm md:text-lg font-black uppercase tracking-tighter">
              <div className="space-y-4">
                <p className="text-black/40">Technical</p>
                <ul className="space-y-2">
                  <li>Next.js 15</li>
                  <li>Scalable QR</li>
                  <li>Kinetic UI</li>
                  <li>Space Grotesk</li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-black/40">Architect</p>
                <p className="text-3xl font-black border-b-4 border-black inline-block">Naga Shreeshyl</p>
              </div>
            </div>
          </div>

          <div className="mt-48 flex justify-between items-center border-t-2 border-black/20 pt-12">
            <p className="text-xs md:text-sm font-black uppercase tracking-[0.5em]">
              © ALL RIGHTS RES // 2026 // DS_LABS
            </p>
            <div className="h-4 w-24 bg-black" />
          </div>
        </div>

        {/* Massive Decorative Background Text */}
        <div className="absolute -bottom-24 -left-12 text-[25rem] font-black text-black/5 select-none pointer-events-none leading-none uppercase">
          KINETIC
        </div>
      </footer>
    </main>
  );
}
