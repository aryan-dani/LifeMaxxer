import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LifeMaxxer AI | Brutally Honest Life Audit",
  description:
    "The most honest AI-powered self-improvement tool. Get brutally honest scores across looks, fitness, discipline, finance, and social life. Plus a custom 30-day transformation protocol. 100% free.",
  keywords: [
    "life audit",
    "self improvement",
    "AI life coach",
    "discipline",
    "fitness score",
    "personal development",
    "30 day challenge",
  ],
  authors: [{ name: "LifeMaxxer AI" }],
  openGraph: {
    title: "LifeMaxxer AI | Brutally Honest Life Audit",
    description:
      "Stop lying to yourself. Get rated /10 across 6 life dimensions by AI. Free forever.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, "dark h-full antialiased")}
    >
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-50">
        {children}
      </body>
    </html>
  );
}
