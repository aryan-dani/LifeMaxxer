"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { ScoreRing } from "@/components/ui/score-ring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Target,
  Share2,
  RotateCcw,
  Activity,
  Download,
  Flame,
  Eye,
  EyeOff,
} from "lucide-react";

const scoreColors: Record<string, string> = {
  overall: "#10b981",
  fitness: "#ef4444",
  looks: "#3b82f6",
  discipline: "#8b5cf6",
  finance: "#f59e0b",
  social: "#ec4899",
};

function getScoreColor(score: number, baseColor: string): string {
  if (score < 4) return "#ef4444";
  if (score < 6) return "#f59e0b";
  return baseColor;
}

export default function Dashboard() {
  const { id } = useParams();
  const router = useRouter();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showIssues, setShowIssues] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      let found = false;

      // 1. Try Supabase first
      if (supabase && typeof id === "string") {
        const { data, error } = await supabase
          .from("reports")
          .select("*")
          .eq("id", id)
          .single();

        if (data) {
          setReport(data);
          found = true;
        } else {
          console.log("Supabase fetch failed, trying localStorage:", error);
        }
      }

      // 2. Try localStorage fallback
      if (!found && typeof id === "string") {
        try {
          const reports = JSON.parse(
            localStorage.getItem("lifemaxxer_reports") || "{}",
          );
          if (reports[id]) {
            setReport(reports[id]);
            found = true;
          }
        } catch (e) {
          console.error("localStorage parse error:", e);
        }
      }

      // 3. Fallback mock data for demo
      if (!found) {
        setReport({
          ai_response: {
            scores: {
              looks: 6.5,
              fitness: 4.0,
              discipline: 3.5,
              social: 7.0,
              finance: 5.5,
              overall: 5.3,
            },
            analysis:
              "You are coasting on basic potential. You have okay social skills and aren't completely broke, but your fitness is a joke and your discipline relies purely on fleeting motivation. You keep telling yourself you'll start next week, but next week never comes.",
            hidden_issues: [
              "You use doomscrolling as a coping mechanism for anxiety about the future.",
              "You mistake being 'busy' with your phone for actual productive work.",
              "You seek cheap dopamine instead of doing the hard, boring work that matters.",
            ],
            priorities: [
              "Eliminate processed sugar and start lifting 4x a week.",
              "Implement a strict 10 PM phone cutoff — no exceptions.",
              "Track every single rupee spent via UPI to realize how much you waste.",
            ],
            thirty_day_protocol: {
              week1: [
                "Zero junk food. No Swiggy/Zomato.",
                "Lift weights 4x this week.",
                "Read 10 pages of a book daily.",
              ],
              week2: [
                "Add 30 min cardio.",
                "Start tracking expenses.",
                "No social media before 12 PM.",
              ],
              week3: [
                "Network with 2 ambitious individuals.",
                "Increase lifting weight by 5%.",
                "Journal 5 minutes every night.",
              ],
              week4: [
                "Review all progress objectively.",
                "Lock in the new identity.",
                "Plan the next 30 days.",
              ],
            },
            indian_context_advice:
              "Stop relying on hostel maggi and outside food. The cheap oil is destroying your testosterone. Also, your habit of paying ₹150 here and ₹100 there on UPI is bleeding your allowance dry. Start cooking basic meals and use YNAB or Walnut to track every transaction.",
            future_projection: {
              if_followed:
                "In 6 months, you will be visibly leaner, financially stable, and operating with a locked-in mindset. People will notice the change and start asking what happened.",
              if_ignored:
                "In 5 years, you will be exactly where you are now, just older, more tired, and full of regret watching your peers surpass you.",
            },
          },
        });
      }

      setLoading(false);
    }
    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <Activity className="w-10 h-10 text-emerald-500 animate-spin" />
          <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
        </div>
        <p className="text-emerald-500 font-mono animate-pulse">
          Retrieving your analysis...
        </p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-4">
        <AlertTriangle className="w-10 h-10 text-red-500" />
        <p className="text-red-400 font-medium">Report not found.</p>
        <Link href="/audit">
          <Button variant="outline">Take New Audit</Button>
        </Link>
      </div>
    );
  }

  const { ai_response } = report;

  const handleShare = () => {
    const text = `I got rated ${ai_response.scores.overall}/10 by LifeMaxxer AI 💀\n\nFitness: ${ai_response.scores.fitness}/10\nLooks: ${ai_response.scores.looks}/10\nDiscipline: ${ai_response.scores.discipline}/10\nFinance: ${ai_response.scores.finance}/10\nSocial: ${ai_response.scores.social}/10\n\nGet exposed: lifemaxxer.ai`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const overallScore = ai_response.scores.overall;
  const scoreVerdict =
    overallScore >= 8
      ? "Elite"
      : overallScore >= 6
        ? "Above Average"
        : overallScore >= 4
          ? "Mediocre"
          : "Critical";
  const verdictColor =
    overallScore >= 8
      ? "text-emerald-400"
      : overallScore >= 6
        ? "text-blue-400"
        : overallScore >= 4
          ? "text-amber-400"
          : "text-red-400";

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 selection:bg-emerald-500/30 relative noise-overlay overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-[-5%] right-[10%] w-[500px] h-[500px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 p-6 md:p-10">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Header & Actions */}
          <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-3"
              >
                <Activity className="w-4 h-4 text-emerald-500" />
                <span className="font-bold tracking-tight text-white">
                  LIFEMAXXER<span className="text-emerald-500">.AI</span>
                </span>
              </Link>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                Your Reality Check
              </h1>
              <p className="text-gray-500 mt-1 flex items-center gap-2">
                Verdict:{" "}
                <span className={`font-bold ${verdictColor}`}>
                  {scoreVerdict}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 print:hidden">
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="border-gray-800 hover:border-emerald-500/30"
              >
                <Download className="w-4 h-4 mr-2" />
                Save PDF
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="border-gray-800 hover:border-emerald-500/30"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />
                ) : (
                  <Share2 className="w-4 h-4 mr-2" />
                )}
                {copied ? "Copied!" : "Share Score"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const text = `I got rated ${ai_response.scores.overall}/10 by LifeMaxxer AI 💀\n\nFitness: ${ai_response.scores.fitness}/10\nLooks: ${ai_response.scores.looks}/10\nDiscipline: ${ai_response.scores.discipline}/10\nFinance: ${ai_response.scores.finance}/10\nSocial: ${ai_response.scores.social}/10\n\nGet exposed: lifemaxxer.ai`;
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
                    "_blank",
                  );
                }}
                className="border-gray-800 hover:border-[#1DA1F2]/30 hover:text-[#1DA1F2] transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-2 fill-current"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
                Post to X
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/audit")}
                className="border-gray-800 hover:border-emerald-500/30"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Re-Audit
              </Button>
            </div>
          </header>

          {/* Core Scores Section */}
          <section>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(ai_response.scores).map(
                ([key, score]: [string, any], index) => (
                  <motion.div
                    key={key}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <Card
                      className={`flex flex-col items-center p-5 stat-card ${
                        key === "overall"
                          ? "border-emerald-500/30 bg-emerald-500/5"
                          : "border-gray-800/50 bg-gray-900/30"
                      }`}
                    >
                      <ScoreRing
                        score={score}
                        size={90}
                        label={key.toUpperCase()}
                        color={getScoreColor(
                          score,
                          scoreColors[key] || "#10b981",
                        )}
                      />
                    </Card>
                  </motion.div>
                ),
              )}
            </div>
          </section>

          <div className="space-y-8">
            {/* Deep Analysis & Hidden Issues */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-gray-800/50 bg-gray-900/30 h-full">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-400" /> Executive
                      Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">
                      {ai_response.analysis}
                    </p>
                    {ai_response.indian_context_advice && (
                      <div className="mt-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                        <p className="text-sm text-orange-400 font-medium mb-1 flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5" /> Cultural Reality
                          Check
                        </p>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {ai_response.indian_context_advice}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-red-500/20 bg-red-500/5 h-full">
                  <CardHeader>
                    <CardTitle className="text-red-400 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" /> Hidden Issues
                      </span>
                      <button
                        onClick={() => setShowIssues(!showIssues)}
                        className="text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showIssues ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {showIssues ? (
                      <ul className="space-y-4">
                        {ai_response.hidden_issues.map(
                          (issue: string, i: number) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className="flex gap-3 text-gray-300"
                            >
                              <span className="text-red-500 mt-0.5 shrink-0 font-bold">
                                ✕
                              </span>{" "}
                              {issue}
                            </motion.li>
                          ),
                        )}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm italic">
                        Hidden — click the eye icon to reveal.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* Priorities */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-emerald-500/20 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-emerald-400 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Highest Leverage
                    Priorities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {ai_response.priorities.map(
                      (priority: string, i: number) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          className="flex gap-3 text-gray-300"
                        >
                          <span className="text-emerald-500 font-bold shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-sm">
                            {i + 1}
                          </span>{" "}
                          {priority}
                        </motion.li>
                      ),
                    )}
                  </ul>
                </CardContent>
              </Card>
            </motion.section>

            {/* 30-Day Protocol */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                <Flame className="w-5 h-5 text-orange-500" /> The 30-Day
                Protocol
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(ai_response.thirty_day_protocol).map(
                  ([week, tasks]: [string, any], index) => (
                    <motion.div
                      key={week}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <Card className="bg-gray-900/30 border-gray-800/50 h-full stat-card">
                        <CardHeader className="bg-gray-950/30 border-b border-gray-800/50 py-4">
                          <CardTitle className="text-sm font-mono text-emerald-500 uppercase flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center text-xs">
                              {index + 1}
                            </span>
                            Week {index + 1}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-5">
                          <ul className="space-y-3">
                            {tasks.map((task: string, i: number) => (
                              <li
                                key={i}
                                className="text-sm text-gray-400 flex items-start gap-2"
                              >
                                <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gray-600" />{" "}
                                {task}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ),
                )}
              </div>
            </motion.section>

            {/* Future Projection */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <Card className="border-gray-800/50 bg-linear-to-br from-red-950/10 to-gray-950">
                <CardContent className="p-8">
                  <h3 className="text-sm font-bold text-red-500/60 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> If You Do Nothing
                  </h3>
                  <p className="text-lg text-red-400/80 leading-relaxed italic">
                    &quot;{ai_response.future_projection.if_ignored}&quot;
                  </p>
                </CardContent>
              </Card>
              <Card className="border-emerald-500/20 bg-linear-to-br from-emerald-950/10 to-gray-950">
                <CardContent className="p-8">
                  <h3 className="text-sm font-bold text-emerald-500/60 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> If You Execute
                  </h3>
                  <p className="text-lg text-emerald-400 leading-relaxed italic">
                    &quot;{ai_response.future_projection.if_followed}&quot;
                  </p>
                </CardContent>
              </Card>
            </motion.section>

            {/* Bottom CTA */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="text-center pt-4 pb-8 print:hidden"
            >
              <p className="text-gray-500 text-sm mb-4">
                Your move. The protocol is in your hands.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="premium"
                  size="lg"
                  onClick={() => router.push("/audit")}
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Take Another Audit
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" /> Share Results
                </Button>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
