"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Brain,
  Target,
  Zap,
  ChevronRight,
  ShieldAlert,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center selection:bg-emerald-500/30">
      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex justify-between items-center z-10 relative">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-emerald-500" />
          <span className="text-xl font-bold tracking-tighter text-white">
            LIFEMAXXER<span className="text-emerald-500">.AI</span>
          </span>
        </div>
        <nav className="flex gap-4">
          <Link href="/audit">
            <Button variant="outline" className="border-gray-800 text-gray-300">
              <History className="w-4 h-4 mr-2" /> Past Reports
            </Button>
          </Link>
          <Link href="/audit">
            <Button variant="premium" className="hidden sm:inline-flex">
              Run Free Audit
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 w-full flex flex-col items-center justify-center relative z-10 px-6">
        {/* Background glow */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mt-20 md:mt-32 mb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-widest mb-8">
              <ShieldAlert className="w-4 h-4" />
              100% Free. Brutally Honest.
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Stop lying to yourself. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                Look in the mirror.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              An elite, AI-driven evaluation of your looks, discipline, and
              finances tailored for reality. Get your scores and a strict 30-day
              protocol. No paywalls. No sugarcoating.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/audit">
                <Button
                  variant="premium"
                  size="lg"
                  className="w-full sm:w-auto group"
                >
                  Start Your Audit{" "}
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <p className="text-xs text-gray-500 mt-2 sm:mt-0 sm:ml-4">
                Takes 2 minutes. Prepare for reality.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Narrative Section: Tanish's Journey */}
        <section className="w-full max-w-5xl mx-auto mb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="p-1 rounded-3xl bg-gradient-to-b from-gray-800 to-gray-950"
          >
            <div className="bg-gray-950 p-8 md:p-12 rounded-[22px] border border-gray-800/50 flex flex-col md:flex-row gap-10">
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Tanish's Journey
                </h2>

                <div className="space-y-6 text-gray-400 leading-relaxed text-sm">
                  <div>
                    <h3 className="text-emerald-500 font-bold mb-1 uppercase tracking-wide text-xs">
                      1. Starting Point
                    </h3>
                    <p>
                      I was an engineering student in India. I knew I had above
                      average potential, but my execution was incredibly
                      inconsistent. I struggled heavily with discipline, digital
                      distractions, and constantly comparing myself to my peers.
                      I had social awareness, but I wasn't leveraging it at all.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-red-400 font-bold mb-1 uppercase tracking-wide text-xs">
                      2. The Problem
                    </h3>
                    <p>
                      I knew my potential was high, but my actual results didn't
                      match. I had inconsistent gym habits, poor daily routines,
                      and average financial awareness. I fell into endless
                      cycles of high motivation followed by sudden drops,
                      repeating the same mistakes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-blue-400 font-bold mb-1 uppercase tracking-wide text-xs">
                      3. Turning Point
                    </h3>
                    <p>
                      The delusion broke when I realized that motivation is
                      completely useless without systems. I stopped relying on
                      feeling "hyped" and started focusing strictly on
                      discipline, rigid structure, and measurable, daily
                      improvement.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-emerald-400 font-bold mb-1 uppercase tracking-wide text-xs">
                      4. Transformation
                    </h3>
                    <p>
                      I locked in. I improved my physique and self-image
                      drastically. I became hyper-aware of my toxic habits and
                      behaviors. I built LifeMaxxer AI as the exact system I
                      needed to solve this problem for others.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-white font-bold mb-1 uppercase tracking-wide text-xs">
                      5. The Mission
                    </h3>
                    <p className="text-gray-300 font-medium">
                      To help young men stop lying to themselves. To provide
                      brutal clarity, uncompromising structure, and pure
                      direction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:w-1/3 flex flex-col items-center justify-center gap-4">
                <div className="w-full aspect-square rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 relative group">
                  <img
                    src="/images/tanish_founder_image.jpg"
                    alt="Tanish - Founder"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-bold text-lg">Tanish</p>
                    <p className="text-emerald-500 text-sm font-mono">
                      Creator, LifeMaxxer AI
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Transformation Section */}
        <section className="w-full max-w-5xl mx-auto mb-32 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">
            The Before & After
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group overflow-hidden rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-left">
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Phase 1: Delusion
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> 6+ hours screen time
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Relying on motivation,
                  no systems
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> Bleeding money on
                  micro-transactions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span> "I'll start on Monday"
                  mindset
                </li>
              </ul>
            </div>
            <div className="relative group overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-left">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">
                Phase 2: Locked In
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span> Deep work blocks.
                  Zero distractions.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span> Lifting heavy 4x a
                  week
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span> High-value
                  networking & building assets
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span> Cold, objective
                  self-awareness
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features / Pillars */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {[
            {
              icon: <Target className="w-8 h-8 text-emerald-500" />,
              title: "Objective Scoring",
              desc: "Get rated /10 across 5 critical dimensions of your life based on cold, hard data.",
            },
            {
              icon: <Brain className="w-8 h-8 text-emerald-500" />,
              title: "Psychological Audit",
              desc: "Our AI breaks down exactly what behavioral flaws are capping your potential.",
            },
            {
              icon: <Zap className="w-8 h-8 text-emerald-500" />,
              title: "30-Day Protocol",
              desc: "A custom, step-by-step daily roadmap designed to fix your weakest links immediately.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:border-emerald-500/50 transition-colors"
            >
              <div className="mb-4 bg-gray-950 w-16 h-16 rounded-xl flex items-center justify-center border border-gray-800">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="w-full py-8 border-t border-gray-900 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} LifeMaxxer AI. All rights reserved. Do
          the work.
        </p>
      </footer>
    </div>
  );
}
