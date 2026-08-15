import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Samyukth Dharmarajan",
  description: "Samyukth Dharmarajan's Portfolio",
  icons: {
    icon: "/images/favicon_logo_rounded.png",
  },
};

import { Navbar } from "@/components/ui/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, "antialiased h-full")}>
      <body className="min-h-full flex flex-col font-sans text-slate-100 bg-slate-950">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
