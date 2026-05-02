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
  Flame,
  TrendingUp,
  Shield,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const stats = [
  { value: "10K+", label: "Audits Completed" },
  { value: "4.2", label: "Avg Starting Score" },
  { value: "7.8", label: "Avg After 30 Days" },
  { value: "100%", label: "Free Forever" },
];

const features = [
  {
    icon: Target,
    title: "Objective Scoring",
    desc: "Get rated /10 across 6 critical dimensions — looks, fitness, discipline, finance, social, and overall. Cold, data-driven, no ego protection.",
    color: "emerald",
  },
  {
    icon: Brain,
    title: "Psychological X-Ray",
    desc: "Our AI digs into behavioral patterns you don't even realize you have. Hidden coping mechanisms, self-sabotage loops, and blind spots — exposed.",
    color: "blue",
  },
  {
    icon: Zap,
    title: "30-Day Protocol",
    desc: "Not generic advice. A week-by-week, hyper-specific action plan designed around YOUR weaknesses. Execute or stay average.",
    color: "amber",
  },
  {
    icon: TrendingUp,
    title: "Future Projection",
    desc: "See two possible futures: what happens if you follow the protocol, and what happens if you stay the same. Reality hits different when it's written down.",
    color: "purple",
  },
  {
    icon: Shield,
    title: "Cultural Context",
    desc: "Built for the Indian grind. We understand UPI micro-spending, hostel food, parental pressure, and the hustle culture. No Western cookie-cutter advice.",
    color: "orange",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    desc: "Powered by advanced LLM intelligence. Every audit is unique, deeply personalized, and gets smarter with context. No two reports are the same.",
    color: "pink",
  },
];

const colorMap: Record<string, string> = {
  emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  orange: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  pink: "text-pink-500 bg-pink-500/10 border-pink-500/20",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center selection:bg-emerald-500/30 noise-overlay relative overflow-hidden">
      {/* Animated ambient orbs */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-emerald-500/8 blur-[180px] rounded-full pointer-events-none animate-float" />
      <div className="absolute top-[40%] right-[-5%] w-[400px] h-[400px] bg-teal-500/6 blur-[150px] rounded-full pointer-events-none animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none animate-float" style={{ animationDelay: "4s" }} />

      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-6 py-5 flex justify-between items-center z-10 relative">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <Activity className="w-7 h-7 text-emerald-500 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-emerald-500/20 blur-lg rounded-full" />
          </div>
          <span className="text-xl font-extrabold tracking-tighter text-white">
            LIFEMAXXER<span className="text-emerald-500">.AI</span>
          </span>
        </Link>
        <nav className="flex gap-3">
          <Link href="/audit">
            <Button variant="outline" className="border-gray-800 text-gray-300 hover:border-emerald-500/30 transition-all">
              Start Audit
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 w-full flex flex-col items-center relative z-10 px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mt-16 md:mt-28 mb-28 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-widest mb-8 backdrop-blur-sm">
              <Flame className="w-3.5 h-3.5" />
              100% Free · No Signup · Brutally Honest
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[1.05]">
              Stop lying<br className="hidden md:block" /> to yourself.{" "}
              <br />
              <span className="text-gradient">
                Look in the mirror.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              An elite, AI-powered evaluation of your looks, fitness, discipline,
              and finances. Get brutally honest scores and a strict 30-day
              transformation protocol. <span className="text-gray-300 font-medium">No paywalls. No sugarcoating.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/audit">
                <Button
                  variant="premium"
                  size="lg"
                  className="w-full sm:w-auto group text-base px-8"
                >
                  Start Your Free Audit
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <p className="text-xs text-gray-500">
                Takes 2 minutes. Prepare for reality.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Social Proof Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl mx-auto mb-28"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-panel rounded-2xl p-6 text-center stat-card"
              >
                <p className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* How It Works */}
        <section className="w-full max-w-5xl mx-auto mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">Three steps. Two minutes. One wake-up call.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Answer Honestly", desc: "Fill out a 5-section deep audit covering your physical state, habits, finances, social life, and goals. No faking allowed.", icon: "📝" },
              { step: "02", title: "AI Analyzes You", desc: "Our AI processes your data through behavioral psychology frameworks and returns a comprehensive, brutally honest assessment.", icon: "🧠" },
              { step: "03", title: "Get Your Protocol", desc: "Receive dimension scores, hidden psychological insights, prioritized fixes, and a custom 30-day action plan.", icon: "⚡" },
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative p-8 rounded-2xl bg-gray-900/30 border border-gray-800/50 backdrop-blur-sm group hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="absolute top-6 right-6 text-6xl font-black text-gray-900/80 select-none">{item.step}</div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Before & After */}
        <section className="w-full max-w-5xl mx-auto mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The Before & After
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">Which side are you on?</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-left hover:border-red-500/40 transition-colors"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full" />
              <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> Phase 1: Delusion
              </h3>
              <ul className="space-y-4 text-gray-400">
                {[
                  "6+ hours screen time daily",
                  "Relying on motivation, no systems",
                  "Bleeding money on micro-transactions",
                  '"I\'ll start on Monday" mindset',
                  "Comparing yourself to others constantly",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-red-500 text-lg">✕</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-left hover:border-emerald-500/40 transition-colors"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
              <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
                <Flame className="w-5 h-5" /> Phase 2: Locked In
              </h3>
              <ul className="space-y-4 text-gray-400">
                {[
                  "Deep work blocks. Zero distractions.",
                  "Lifting heavy 4x a week",
                  "High-value networking & building assets",
                  "Cold, objective self-awareness",
                  "Every rupee tracked, every minute counted",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-emerald-500 text-lg">✓</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="w-full max-w-6xl mx-auto mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You Get
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">Every audit includes all of this. For free. Forever.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => {
              const colors = colorMap[feature.color];
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-7 rounded-2xl bg-gray-900/40 border border-gray-800/50 backdrop-blur-sm hover:border-gray-700/80 transition-all duration-300 group stat-card"
                >
                  <div className={`mb-5 w-12 h-12 rounded-xl flex items-center justify-center border ${colors}`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-3xl mx-auto mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl border border-emerald-500/20 bg-linear-to-b from-emerald-500/5 to-transparent overflow-hidden"
          >
            <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Ready to face reality?
              </h2>
              <p className="text-gray-400 max-w-md mx-auto mb-8">
                Most people avoid the truth. The ones who don&#39;t are the ones who actually change. Which one are you?
              </p>
              <Link href="/audit">
                <Button variant="premium" size="lg" className="group text-base px-8">
                  Take The Audit Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="w-full py-8 border-t border-gray-900/50 text-center text-gray-600 text-sm relative z-10">
        <p>
          © {new Date().getFullYear()} LifeMaxxer AI. All rights reserved. Do the work.
        </p>
      </footer>
    </div>
  );
}
