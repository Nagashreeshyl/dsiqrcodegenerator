import MarqueeHeader from "@/components/MarqueeHeader";
import QrGenerator from "@/components/QrGenerator";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center selection:bg-primary selection:text-primary-foreground">
      <MarqueeHeader />
      
      <div className="absolute top-20 right-8 z-50">
        <ModeToggle />
      </div>

      <div className="w-full max-w-[1400px] px-4 md:px-8">
        <QrGenerator />
      </div>

      <footer className="w-full border-t-2 border-border py-12 px-8 bg-muted mt-auto">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4">
            <h3 className="text-4xl text-foreground">QR GENERATOR</h3>
            <p className="text-muted-foreground uppercase tracking-widest text-sm max-w-sm">
              Built for speed. Built for the web. Free forever. Vercel deployment ready.
            </p>
          </div>
          <div className="flex flex-col md:flex-end gap-2 text-right">
            <p className="text-muted-foreground uppercase tracking-widest text-xs">
              © 2026 QR GEN // PROTOTYPE V1.0
            </p>
            <p className="text-primary font-bold uppercase tracking-tighter text-lg underline decoration-2 underline-offset-4">
              Built by Naga Shreeshyl
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
