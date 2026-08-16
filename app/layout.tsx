import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://samyukthdharmarajan.vercel.app"),
  title: {
    default: "Samyukth Dharmarajan | Portfolio",
    template: "%s | Samyukth Dharmarajan",
  },
  description:
    "Portfolio of Samyukth Dharmarajan, an Associate Software Engineer specializing in frontend development, React, Next.js, and TypeScript.",
  keywords: [
    "Samyukth Dharmarajan",
    "Software Engineer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Samyukth Dharmarajan" }],
  creator: "Samyukth Dharmarajan",
  icons: {
    icon: "/images/favicon_logo_rounded.png",
  },
  verification: {
    google: "8FfBGIJWqEY9gsAxm1AJQmOUtRZISBv2Av_TP5Ocr2Y",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samyukthdharmarajan.vercel.app",
    title: "Samyukth Dharmarajan | Portfolio",
    description:
      "Portfolio of Samyukth Dharmarajan, an Associate Software Engineer specializing in frontend development, React, Next.js, and TypeScript.",
    siteName: "Samyukth Dharmarajan Portfolio",
    images: [
      {
        url: "/images/favicon_logo.jpg",
        width: 1200,
        height: 630,
        alt: "Samyukth Dharmarajan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samyukth Dharmarajan | Portfolio",
    description:
      "Portfolio of Samyukth Dharmarajan, an Associate Software Engineer specializing in frontend development.",
    images: ["/images/favicon_logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
