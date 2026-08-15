import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Samyukth Dharmarajan",
  description: "Samyukth Dharmarajan's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(geistMono.variable, "antialiased h-full")}>
      <body className="min-h-full flex flex-col font-mono text-slate-100 bg-slate-950">
        {children}
      </body>
    </html>
  );
}
