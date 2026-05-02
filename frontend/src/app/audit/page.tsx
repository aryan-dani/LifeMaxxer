"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Loader2,
  Target,
  AlertTriangle,
  Activity,
  Dumbbell,
  Clock,
  Wallet,
  Users,
  Crosshair,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  { id: "physical", title: "Physical & Biology", icon: Dumbbell, color: "emerald" },
  { id: "discipline", title: "Habits & Discipline", icon: Clock, color: "purple" },
  { id: "wealth", title: "Wealth & Ambition", icon: Wallet, color: "amber" },
  { id: "social", title: "Social Value", icon: Users, color: "blue" },
  { id: "goals", title: "Your Objectives", icon: Crosshair, color: "red" },
];

const badHabitOptions = [
  "Doom-Scrolling",
  "Smoking / Vaping",
  "Binge Eating Junk",
  "Excessive Gaming",
  "Porn Addiction",
  "Alcohol / Substances",
  "Procrastination",
  "Late Night Phone Use",
];

const selectClasses =
  "w-full bg-gray-950 border border-gray-800 rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all hover:border-gray-700";

export default function AuditPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    bodyFat: "",
    dietType: "",
    wakeUpTime: "",
    screenTime: "",
    consistencyLevel: "",
    badHabits: [] as string[],
    income: "",
    spendingHabits: "",
    savings: "",
    sideHustle: "",
    confidenceLevel: "",
    friendsCount: "",
    datingLife: "",
    socialAnxiety: "",
    primaryGoal: "",
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  };

  const updateForm = (key: string, value: string | string[]) => {
    setFormData((p) => ({ ...p, [key]: value }));
  };

  const toggleHabit = (habit: string) => {
    setFormData((p) => ({
      ...p,
      badHabits: p.badHabits.includes(habit)
        ? p.badHabits.filter((h) => h !== habit)
        : [...p.badHabits, habit],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.reportId) {
        // Save complete report to localStorage so dashboard can display it
        // even without Supabase
        if (data.reportData) {
          const reports = JSON.parse(
            localStorage.getItem("lifemaxxer_reports") || "{}"
          );
          reports[data.reportId] = {
            ai_response: data.reportData,
            user_data: formData,
            created_at: new Date().toISOString(),
          };
          localStorage.setItem("lifemaxxer_reports", JSON.stringify(reports));
        }

        // Save to history
        const history = JSON.parse(
          localStorage.getItem("lifemaxxer_history") || "[]"
        );
        if (!history.includes(data.reportId)) {
          history.unshift(data.reportId);
          localStorage.setItem("lifemaxxer_history", JSON.stringify(history));
        }

        router.push(`/dashboard/${data.reportId}`);
      } else {
        throw new Error(data.error || "Failed to generate report.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const progressValue = ((currentStep + 1) / steps.length) * 100;
  const StepIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 selection:bg-emerald-500/30 relative noise-overlay overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/8 blur-[150px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-2xl z-10">
        {/* Top nav */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors text-sm">
            <Activity className="w-4 h-4 text-emerald-500" />
            <span className="font-bold tracking-tight text-white">LIFEMAXXER<span className="text-emerald-500">.AI</span></span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <StepIcon className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-lg">{steps[currentStep].title}</span>
              <p className="text-xs text-gray-500">Deep Audit</p>
            </div>
          </div>
          <span className="text-gray-500 text-sm font-mono bg-gray-900 px-3 py-1 rounded-lg border border-gray-800">
            {currentStep + 1} / {steps.length}
          </span>
        </div>

        {/* Step indicators */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                i <= currentStep ? "bg-emerald-500" : "bg-gray-800"
              }`}
            />
          ))}
        </div>

        <Card className="glass-panel border-gray-800/50">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {/* STEP 1: PHYSICAL */}
              {currentStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Physical & Biology</h2>
                    <p className="text-gray-500 text-sm">Your body is the foundation. Be honest about where you are.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Age</label>
                      <select className={selectClasses} value={formData.age} onChange={(e) => updateForm("age", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="16-18">16-18</option>
                        <option value="18-21">18-21</option>
                        <option value="21-25">21-25</option>
                        <option value="25-30">25-30</option>
                        <option value="30+">30+</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Gender</label>
                      <select className={selectClasses} value={formData.gender} onChange={(e) => updateForm("gender", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-Binary">Non-Binary</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Height (cm)</label>
                      <select className={selectClasses} value={formData.height} onChange={(e) => updateForm("height", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="<160cm">&lt;160 cm</option>
                        <option value="160-170cm">160-170 cm</option>
                        <option value="170-180cm">170-180 cm</option>
                        <option value="180cm+">180+ cm</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Body Fat %</label>
                      <select className={selectClasses} value={formData.bodyFat} onChange={(e) => updateForm("bodyFat", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Lean (<15%)">Lean (&lt;15%)</option>
                        <option value="Athletic (15-20%)">Athletic (15-20%)</option>
                        <option value="Average (20-25%)">Average (20-25%)</option>
                        <option value="Overweight (25%+)">Overweight (25%+)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Diet Type</label>
                    <select className={selectClasses} value={formData.dietType} onChange={(e) => updateForm("dietType", e.target.value)}>
                      <option value="">Select...</option>
                      <option value="Clean (Meal Prep/Home Cooked)">Clean (Meal Prep / Home Cooked)</option>
                      <option value="Mixed (Some junk, some healthy)">Mixed (Some junk, some healthy)</option>
                      <option value="Trash (Fast food, Swiggy/Zomato daily)">Trash (Fast food, Swiggy/Zomato daily)</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: DISCIPLINE */}
              {currentStep === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Habits & Discipline</h2>
                    <p className="text-gray-500 text-sm">Your daily routine defines your trajectory.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Wake Up Time</label>
                      <select className={selectClasses} value={formData.wakeUpTime} onChange={(e) => updateForm("wakeUpTime", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Before 6 AM">Before 6 AM</option>
                        <option value="6-8 AM">6-8 AM</option>
                        <option value="8-10 AM">8-10 AM</option>
                        <option value="After 10 AM">After 10 AM</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Daily Screen Time</label>
                      <select className={selectClasses} value={formData.screenTime} onChange={(e) => updateForm("screenTime", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="<2 hours">&lt;2 hours</option>
                        <option value="2-4 hours">2-4 hours</option>
                        <option value="4-6 hours">4-6 hours</option>
                        <option value="6+ hours">6+ hours (addicted)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Consistency Level</label>
                    <select className={selectClasses} value={formData.consistencyLevel} onChange={(e) => updateForm("consistencyLevel", e.target.value)}>
                      <option value="">Select...</option>
                      <option value="Robot Mode">Robot Mode (Never miss a day)</option>
                      <option value="Decent">Decent (Mostly consistent)</option>
                      <option value="Inconsistent">Inconsistent (Motivated for 3 days then quit)</option>
                      <option value="Non-Existent">Non-Existent (No routine at all)</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-400">Bad Habits (select all that apply)</label>
                    <div className="grid grid-cols-2 gap-2">
                      {badHabitOptions.map((habit) => (
                        <button
                          key={habit}
                          type="button"
                          onClick={() => toggleHabit(habit)}
                          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                            formData.badHabits.includes(habit)
                              ? "bg-red-500/15 border border-red-500/30 text-red-400"
                              : "bg-gray-900/50 border border-gray-800 text-gray-400 hover:border-gray-700"
                          }`}
                        >
                          {formData.badHabits.includes(habit) ? "✕ " : ""}{habit}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: WEALTH */}
              {currentStep === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Wealth & Ambition</h2>
                    <p className="text-gray-500 text-sm">Money is a tool. How are you wielding it?</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Monthly Income / Allowance</label>
                      <select className={selectClasses} value={formData.income} onChange={(e) => updateForm("income", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Student (0)">Student / 0 Income</option>
                        <option value="Pocket Money (<5k)">Pocket Money (&lt;₹5k)</option>
                        <option value="₹10k - ₹30k">₹10k - ₹30k</option>
                        <option value="₹30k - ₹80k">₹30k - ₹80k</option>
                        <option value="₹80k+">₹80k+</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">UPI Spending Habits</label>
                      <select className={selectClasses} value={formData.spendingHabits} onChange={(e) => updateForm("spendingHabits", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Frugal">Frugal (Track everything)</option>
                        <option value="Micro-leaks">Micro-leaks (Swiggy, Chai, Cabs)</option>
                        <option value="Reckless">Reckless (No idea where money goes)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Side Hustle / Skill Building</label>
                      <select className={selectClasses} value={formData.sideHustle} onChange={(e) => updateForm("sideHustle", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Active Side Hustle">Active Side Hustle (Freelancing, Content, etc.)</option>
                        <option value="Learning Skills">Learning Skills (No income yet)</option>
                        <option value="Nothing">Nothing (Just consuming)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: SOCIAL */}
              {currentStep === 3 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Social & Relationships</h2>
                    <p className="text-gray-500 text-sm">Your network is your net worth.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Dating / Relationship Status</label>
                      <select className={selectClasses} value={formData.datingLife} onChange={(e) => updateForm("datingLife", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Single & Struggling">Single (Struggling / Zero Matches)</option>
                        <option value="Single & Abundant">Single (Options)</option>
                        <option value="In a Relationship">In a Relationship</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Social Anxiety Level</label>
                      <select className={selectClasses} value={formData.socialAnxiety} onChange={(e) => updateForm("socialAnxiety", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="High">High (Can&apos;t talk to strangers)</option>
                        <option value="Medium">Medium (Awkward but trying)</option>
                        <option value="Low">Low (Confident, good speaker)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Close Friends (Real ones)</label>
                      <select className={selectClasses} value={formData.friendsCount} onChange={(e) => updateForm("friendsCount", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="0-1">0-1 (Loner)</option>
                        <option value="2-4">2-4 (Solid circle)</option>
                        <option value="5+">5+ (Large network)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: GOALS */}
              {currentStep === 4 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Your True Objective</h2>
                    <p className="text-gray-500 text-sm">What do you actually want? Be real with yourself.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Primary Goal Right Now</label>
                      <select className={selectClasses} value={formData.primaryGoal} onChange={(e) => updateForm("primaryGoal", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Physical Glow Up">Physical Glow Up (Aesthetics)</option>
                        <option value="Make Money">Make Money / Career</option>
                        <option value="Fix Mental Health">Fix Mental Health & Discipline</option>
                        <option value="Get a Partner">Attraction / Dating</option>
                        <option value="All of the Above">All of the Above</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Confidence Level</label>
                      <select className={selectClasses} value={formData.confidenceLevel} onChange={(e) => updateForm("confidenceLevel", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Very Low">Very Low (Can&apos;t look people in the eye)</option>
                        <option value="Low">Low (Quiet, reserved)</option>
                        <option value="Average">Average (Normal)</option>
                        <option value="High">High (Own the room)</option>
                      </select>
                    </div>
                  </div>

                  {/* Final motivational text */}
                  <div className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <p className="text-xs text-emerald-400/80 leading-relaxed">
                      ⚡ You&#39;re about to receive the most honest assessment of your life. 
                      Our AI will analyze every dimension and give you a custom 30-day protocol. 
                      No sugarcoating. No participation trophies. Just the truth.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex flex-col gap-2 text-red-400 text-sm">
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 shrink-0" />
                  <span className="font-bold">Analysis Failed</span>
                </div>
                <p className="text-gray-300 font-mono text-xs">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSubmit}
                  className="w-fit mt-2 border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                >
                  Retry Analysis
                </Button>
              </div>
            )}

            <div className="mt-10 flex justify-between">
              <Button
                variant="ghost"
                onClick={handlePrev}
                disabled={currentStep === 0 || isSubmitting}
                className={currentStep === 0 ? "opacity-0 pointer-events-none" : ""}
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Back
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button variant="default" onClick={handleNext}>
                  Next <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  variant={error ? "destructive" : "premium"}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...
                    </>
                  ) : error ? (
                    <>
                      Retry <Target className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Generate Deep Report <Target className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center text-emerald-400 text-sm font-mono flex flex-col items-center justify-center gap-3"
          >
            <div className="relative">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
            </div>
            <span className="animate-pulse">AI is parsing your data...</span>
            <span className="text-xs text-gray-500 animate-pulse">
              Comparing metrics against behavioral baselines...
            </span>
            <span className="text-xs text-gray-600 animate-pulse" style={{ animationDelay: "0.5s" }}>
              This may take 15-30 seconds
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
