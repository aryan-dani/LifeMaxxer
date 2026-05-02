"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { ScoreRing } from "@/components/ui/score-ring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, ArrowRight, Target, Share2, History, RotateCcw } from "lucide-react";

export default function Dashboard() {
  const { id } = useParams();
  const router = useRouter();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchReport() {
      if (supabase && typeof id === 'string') {
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .eq('id', id)
          .single();
        
        if (data) setReport(data);
        else console.error(error);
      } else {
        // Fallback mock data if DB isn't connected for demo purposes
        setReport({
          ai_response: {
            scores: { looks: 6.5, fitness: 4.0, discipline: 3.5, social: 7.0, finance: 5.5, overall: 5.3 },
            analysis: "You are coasting on basic potential. You have okay social skills and aren't completely broke, but your fitness is a joke and your discipline relies purely on fleeting motivation.",
            hidden_issues: [
              "You use doomscrolling as a coping mechanism for anxiety about the future.",
              "You mistake being 'busy' with your phone with actual productive work.",
              "You seek cheap dopamine instead of doing the hard, boring work."
            ],
            priorities: [
              "Eliminate processed sugar and start lifting 4x a week.",
              "Implement a strict 10 PM phone cutoff.",
              "Track every single rupee spent via UPI to realize how much you waste."
            ],
            thirty_day_protocol: {
              week1: ["Zero junk food. No Swiggy/Zomato.", "Lift weights 4x this week.", "Read 10 pages of a book daily."],
              week2: ["Add 30 min cardio.", "Start tracking expenses.", "No social media before 12 PM."],
              week3: ["Network with 2 ambitious individuals.", "Increase lifting weight by 5%."],
              week4: ["Review progress.", "Lock in the new identity."]
            },
            indian_context_advice: "Stop relying on hostel maggi and outside food. The cheap oil is destroying your testosterone. Also, your habit of paying ₹50 here and ₹100 there on UPI is bleeding your allowance dry.",
            future_projection: {
              if_followed: "In 6 months, you will be visibly leaner, financially stable, and operating with a locked-in mindset. People will notice the change.",
              if_ignored: "In 5 years, you will be exactly where you are now, just older, more tired, and full of regret watching your peers surpass you."
            }
          }
        });
      }
      setLoading(false);
    }
    fetchReport();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-emerald-500 font-mono animate-pulse">Retrieving your analysis...</div>;
  }

  if (!report) {
    return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-500">Report not found.</div>;
  }

  const { ai_response } = report;

  const handleShare = () => {
    const text = `I got rated ${ai_response.scores.overall}/10 by LifeMaxxer AI 💀\n\nFitness: ${ai_response.scores.fitness}/10\nFinance: ${ai_response.scores.finance}/10\n\nGet exposed: lifemaxxer.ai`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 md:p-12 selection:bg-emerald-500/30">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header & Actions */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-800 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Your Reality Check</h1>
            <p className="text-gray-400 mt-1">Brutally honest analysis of your current trajectory.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={handleShare} className="border-gray-800 hover:bg-gray-800">
              {copied ? <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" /> : <Share2 className="w-4 h-4 mr-2" />}
              {copied ? "Copied!" : "Share Score"}
            </Button>
            <Button variant="outline" onClick={() => router.push('/audit')} className="border-gray-800 hover:bg-gray-800">
              <RotateCcw className="w-4 h-4 mr-2" /> Re-Audit
            </Button>
          </div>
        </header>

        {/* Core Scores Section */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}>
              <Card className="flex flex-col items-center p-6 border-emerald-500/20 bg-emerald-500/5">
                <ScoreRing score={ai_response.scores.overall} size={100} label="OVERALL" color="#10b981" />
              </Card>
            </motion.div>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
              <Card className="flex flex-col items-center p-6 border-gray-800">
                <ScoreRing score={ai_response.scores.fitness} size={100} label="FITNESS" color={ai_response.scores.fitness < 5 ? "#ef4444" : "#f59e0b"} />
              </Card>
            </motion.div>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}>
              <Card className="flex flex-col items-center p-6 border-gray-800">
                <ScoreRing score={ai_response.scores.looks} size={100} label="LOOKS" color="#3b82f6" />
              </Card>
            </motion.div>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }}>
              <Card className="flex flex-col items-center p-6 border-gray-800">
                <ScoreRing score={ai_response.scores.discipline} size={100} label="DISCIPLINE" color={ai_response.scores.discipline < 5 ? "#ef4444" : "#8b5cf6"} />
              </Card>
            </motion.div>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }}>
              <Card className="flex flex-col items-center p-6 border-gray-800">
                <ScoreRing score={ai_response.scores.finance} size={100} label="FINANCE" color="#10b981" />
              </Card>
            </motion.div>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6 }}>
              <Card className="flex flex-col items-center p-6 border-gray-800">
                <ScoreRing score={ai_response.scores.social} size={100} label="SOCIAL" color="#ec4899" />
              </Card>
            </motion.div>
          </div>
        </section>

        <div className="space-y-12">
          {/* Deep Analysis & Hidden Issues */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2"><Target className="w-5 h-5 text-blue-400" /> Executive Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{ai_response.analysis}</p>
                {ai_response.indian_context_advice && (
                  <div className="mt-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <p className="text-sm text-orange-400 font-medium mb-1">Cultural Reality Check:</p>
                    <p className="text-gray-300 text-sm">{ai_response.indian_context_advice}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Hidden Psychological Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {ai_response.hidden_issues.map((issue: string, i: number) => (
                    <li key={i} className="flex gap-3 text-gray-300">
                      <span className="text-red-500 mt-1">✗</span> {issue}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Priorities */}
          <section>
            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Highest Leverage Priorities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {ai_response.priorities.map((priority: string, i: number) => (
                    <li key={i} className="flex gap-3 text-gray-300">
                      <span className="text-emerald-500 font-bold">{i+1}.</span> {priority}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 30-Day Plan */}
          <section>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">The 30-Day Protocol</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(ai_response.thirty_day_protocol).map(([week, tasks]: [string, any], index) => (
                <Card key={week} className="bg-gray-900 border-gray-800">
                  <CardHeader className="bg-gray-950/50 border-b border-gray-800 py-4">
                    <CardTitle className="text-sm font-mono text-emerald-500 uppercase">Week {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {tasks.map((task: string, i: number) => (
                        <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-gray-600" /> {task}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          {/* Future Projection */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950">
              <CardContent className="p-8">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">If You Do Nothing</h3>
                <p className="text-lg text-red-400/80 leading-relaxed italic">
                  "{ai_response.future_projection.if_ignored}"
                </p>
              </CardContent>
            </Card>
            <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 to-gray-950">
              <CardContent className="p-8">
                <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">If You Execute</h3>
                <p className="text-lg text-emerald-400 leading-relaxed italic">
                  "{ai_response.future_projection.if_followed}"
                </p>
              </CardContent>
            </Card>
          </section>
        </div>

      </div>
    </div>
  );
}
