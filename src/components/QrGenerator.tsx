"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { Download, Copy, History, RotateCcw, Link as LinkIcon, Check } from "lucide-react";
import { toast } from "sonner";

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
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL (e.g., https://example.com)" }),
});

type HistoryItem = {
  url: string;
  timestamp: number;
};

export default function QrGenerator() {
  const [qrUrl, setQrUrl] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copying, setCopying] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  useEffect(() => {
    const savedHistory = localStorage.getItem("qr_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (url: string) => {
    const newItem = { url, timestamp: Date.now() };
    const updatedHistory = [newItem, ...history.filter((item) => item.url !== url)].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem("qr_history", JSON.stringify(updatedHistory));
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setQrUrl(values.url);
    saveToHistory(values.url);
    toast.success("QR Code Generated!");
  };

  const downloadPng = async () => {
    if (!qrRef.current) return;
    try {
      const dataUrl = await toPng(qrRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `qr-code-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Downloaded PNG successfully");
    } catch (err) {
      toast.error("Failed to download image");
    }
  };

  const copyToClipboard = async () => {
    if (!qrRef.current) return;
    setCopying(true);
    try {
      const dataUrl = await toPng(qrRef.current, { cacheBust: true, pixelRatio: 2 });
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy image");
    } finally {
      setTimeout(() => setCopying(false), 2000);
    }
  };

  const handleHistoryClick = (url: string) => {
    form.setValue("url", url);
    setQrUrl(url);
    toast.info("URL loaded from history");
  };

  return (
    <div className="w-full max-w-[95vw] mx-auto py-12 md:py-24 space-y-24">
      {/* Hero Header */}
      <div className="space-y-4">
        <h1 className="text-hero leading-[0.8] text-foreground transition-all duration-500">
          GENERATE QR <br /> CODES INSTANTLY
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground uppercase tracking-tight max-w-2xl">
          Enter any website link or URL below to create a high-quality SVG QR code for your business or personal use.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border-2 border-border">
        {/* Form Section */}
        <div className="bg-background p-8 md:p-12 space-y-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              <FormField
                control={form.control}
                name="url"
                render={({ field }: { field: any }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-lg uppercase tracking-widest text-muted-foreground bg-muted inline-block px-4 py-1">
                      Enter URL / link
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="HTTPS://OCTAIQ.COM"
                        className="h-24 text-2xl md:text-4xl font-bold border-b-2 border-t-0 border-x-0 border-border bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-muted rounded-none uppercase"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-primary font-bold uppercase tracking-tighter" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full h-20 text-2xl font-bold uppercase tracking-tighter transition-all hover:scale-[1.02] active:scale-[0.98] rounded-none"
              >
                Generate QR Code
              </Button>
            </form>
          </Form>

          {/* History Section */}
          {history.length > 0 && (
            <div className="pt-12 border-t-2 border-border space-y-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <History size={18} />
                <span className="uppercase text-sm tracking-widest font-bold">Recent Links</span>
              </div>
              <div className="space-y-2">
                {history.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleHistoryClick(item.url)}
                    className="w-full text-left p-4 border border-border hover:border-primary group transition-colors flex items-center justify-between"
                  >
                    <span className="truncate text-lg font-medium group-hover:text-primary transition-colors">
                      {item.url}
                    </span>
                    <RotateCcw size={16} className="text-muted-foreground group-hover:text-primary" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Display Section */}
        <div className="bg-muted p-8 md:p-12 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden group">
          {qrUrl ? (
            <div className="space-y-8 w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-500">
              <Card className="border-2 border-border bg-background p-8 aspect-square flex items-center justify-center group-hover:bg-primary transition-colors duration-500 rounded-none relative">
                 <div className="absolute top-4 left-4 text-muted-foreground group-hover:text-black transition-colors font-bold uppercase tracking-tighter text-xs">
                    QR Preview // Ready
                 </div>
                 <div ref={qrRef} className="bg-white p-4">
                  <QRCodeSVG
                    value={qrUrl}
                    size={280}
                    level="H"
                    includeMargin={false}
                  />
                </div>
              </Card>

              <div className="space-y-4">
                <div className="flex items-center gap-2 p-4 bg-background border-2 border-border group-hover:border-primary transition-colors">
                   <LinkIcon size={20} className="text-primary" />
                   <span className="truncate font-bold uppercase tracking-tighter text-sm">
                     {qrUrl}
                   </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={downloadPng}
                    variant="outline"
                    className="h-16 uppercase font-bold tracking-tighter border-2 hover:bg-foreground hover:text-black transition-all rounded-none gap-2"
                  >
                    <Download size={20} />
                    Download PNG
                  </Button>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    disabled={copying}
                    className="h-16 uppercase font-bold tracking-tighter border-2 hover:bg-foreground hover:text-black transition-all rounded-none gap-2"
                  >
                    {copying ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                    {copying ? "Copied" : "Copy Image"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6 max-w-sm">
                <div className="w-32 h-32 border-2 border-border bg-background mx-auto flex items-center justify-center text-muted border-dashed">
                  <RotateCcw size={48} className="animate-spin-slow opacity-20" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl text-muted-foreground">NOTHING TO SHOW</h3>
                    <p className="text-muted-foreground text-sm uppercase tracking-widest leading-tight">
                        Enter a valid URL to the left and hit the generate button to preview your QR code here.
                    </p>
                </div>
            </div>
          )}
          
          {/* Decorative Massive Number */}
          <div className="absolute -bottom-12 -right-12 text-[12rem] font-bold text-background/10 select-none pointer-events-none uppercase leading-none">
            01
          </div>
        </div>
      </div>
    </div>
  );
}
