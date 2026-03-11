"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { QRCodeSVG } from "qrcode.react";
import * as htmlToImage from "html-to-image";
import { toast } from "sonner";
import { Download, Copy, History, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  url: z.string().url({ message: "ENTER A VALID URL" }),
});

export default function QrGenerator() {
  const [qrValue, setQrValue] = useState<string>("");
  const [history, setHistory] = useState<any[]>([]);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("qr_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setQrValue(values.url);
    const newHistory = [values.url, ...history.filter(h => (typeof h === 'string' ? h : h.url) !== values.url)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem("qr_history", JSON.stringify(newHistory));
    toast.success("QR GENERATED", {
      className: "bg-accent text-accent-foreground font-black uppercase tracking-wider rounded-none border-none",
    });
  };

  const downloadPng = async () => {
    if (!qrRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(qrRef.current, {
        backgroundColor: "#FFFFFF",
        width: 1024,
        height: 1024,
        style: {
          padding: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }
      });
      const link = document.createElement("a");
      link.download = `qr-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("PNG SAVED");
    } catch (err) {
      toast.error("DOWNLOAD FAILED");
    }
  };

  const copyToClipboard = async () => {
    if (!qrRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(qrRef.current, { backgroundColor: "#FFFFFF" });
      const blob = await (await fetch(dataUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      toast.success("COPIED TO CLIPBOARD");
    } catch (err) {
      toast.error("COPY FAILED");
    }
  };

  return (
    <div className="w-full max-w-[95vw] mx-auto py-24 space-y-32">
      {/* Hero / Input Section */}
      <section className="space-y-12">
        <h1 className="text-hero leading-[0.8] font-black uppercase tracking-tighter transition-all duration-500">
          GENERATE QR <br /> CODES INSTANTLY
        </h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 max-w-4xl">
            <FormField
              control={form.control}
              name="url"
              render={({ field }: { field: any }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-sm md:text-lg uppercase tracking-widest text-muted-foreground bg-muted inline-block px-4 py-1">
                    Input Link / URI
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="HTTPS://EXAMPLE.COM" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-accent font-bold" />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full font-black text-3xl h-24">
              GENERATE NOW
            </Button>
          </form>
        </Form>
      </section>

      {/* Result Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border-2 border-border">
        {qrValue ? (
          <div className="bg-background p-12 flex flex-col items-center justify-center space-y-12 min-h-[600px] hover:bg-accent group transition-colors duration-300">
            <div className="space-y-8 w-full max-w-md">
               <div className="bg-white p-8 inline-block shadow-none border-2 border-border group-hover:border-black transition-colors">
                  <div ref={qrRef} className="bg-white">
                    <QRCodeSVG 
                      value={qrValue} 
                      size={280}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
               </div>
               
               <div className="space-y-4">
                  <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-black">Target URL</p>
                  <p className="text-lg md:text-xl font-bold break-all group-hover:text-black transition-colors">{qrValue}</p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button onClick={downloadPng} variant="outline" className="h-16 border-2 group-hover:border-black group-hover:text-black">
                    <Download className="mr-2 h-5 w-5" />
                    DOWNLOAD PNG
                  </Button>
                  <Button onClick={copyToClipboard} variant="outline" className="h-16 border-2 group-hover:border-black group-hover:text-black">
                    <Copy className="mr-2 h-5 w-5" />
                    COPY IMAGE
                  </Button>
               </div>
            </div>
            
            <div className="absolute top-8 left-8 text-[12rem] font-bold text-white/5 select-none pointer-events-none group-hover:text-black/5 leading-none">
              01
            </div>
          </div>
        ) : (
          <div className="bg-background p-12 flex flex-col items-center justify-center space-y-12 min-h-[600px] relative overflow-hidden">
            <div className="text-center space-y-6">
                <div className="w-48 h-48 border-4 border-dashed border-border flex items-center justify-center">
                  <RotateCcw size={64} className="text-muted opacity-20 animate-spin-slow" />
                </div>
                <h3 className="text-4xl font-black text-muted-foreground uppercase tracking-tighter">Waiting for Input</h3>
            </div>
            <div className="absolute -bottom-12 -right-12 text-[15rem] font-bold text-white/[0.03] select-none pointer-events-none leading-none">
              NULL
            </div>
          </div>
        )}

        {/* History Section */}
        <div className="bg-muted p-12 space-y-12 relative overflow-hidden min-h-[600px]">
          <div className="space-y-8 relative z-10">
            <div className="flex items-center gap-4">
              <History className="h-8 w-8 text-accent" />
              <h2 className="text-4xl font-black uppercase tracking-tighter">Recent Archive</h2>
            </div>
            
            <div className="grid gap-4">
              {history.map((item, i) => {
                const url = typeof item === 'string' ? item : item.url;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setQrValue(url);
                      form.setValue("url", url);
                    }}
                    className="w-full text-left p-8 border-2 border-border bg-background hover:bg-accent hover:border-accent group transition-all duration-300 flex items-center justify-between"
                  >
                    <span className="text-2xl font-bold truncate group-hover:text-black transition-colors uppercase tracking-tight">
                      {url.replace(/^https?:\/\//, '').split('/')[0]}
                    </span>
                    <span className="text-muted-foreground group-hover:text-black transition-colors">→</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="absolute -bottom-24 -left-12 text-[18rem] font-bold text-background/20 select-none pointer-events-none leading-none">
            ARCH
          </div>
        </div>
      </div>
    </div>
  );
}
