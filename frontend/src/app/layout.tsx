import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "LifeMaxxer AI | Elite Life Optimization",
  description: "The most addictive self-improvement AI system. Get your brutally honest scores and a 30-day transformation roadmap.",
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
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-50">{children}</body>
    </html>
  );
}
