"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Loader2, Target, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  { id: "physical", title: "Physical & Biology" },
  { id: "discipline", title: "Habits & Discipline" },
  { id: "wealth", title: "Wealth & Ambition" },
  { id: "social", title: "Social Value" },
  { id: "goals", title: "Your Objectives" }
];

export default function AuditPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // V2 Form State
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
        : [...p.badHabits, habit]
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
        // Save to local storage for history
        const history = JSON.parse(localStorage.getItem("lifemaxxer_history") || "[]");
        if (!history.includes(data.reportId)) {
          history.push(data.reportId);
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

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 selection:bg-emerald-500/30">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-2xl z-10">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Target className="w-6 h-6 text-emerald-500" />
            <span className="font-bold tracking-tight">Deep Audit</span>
          </div>
          <span className="text-gray-500 text-sm font-mono">
            Phase 0{currentStep + 1} / 0{steps.length}
          </span>
        </div>

        <Progress value={progressValue} className="mb-10 bg-gray-900" />

        <Card className="glass-panel border-gray-800">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {/* STEP 1: PHYSICAL */}
              {currentStep === 0 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Physical Foundation</h2>
                  <p className="text-gray-400 mb-6 text-sm">Don't lie. The AI will know if your metrics don't add up.</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Age</label>
                      <input type="number" placeholder="e.g. 21" className="w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" value={formData.age} onChange={(e) => updateForm("age", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Gender</label>
                      <select className="w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white focus:outline-none focus:border-emerald-500" value={formData.gender} onChange={(e) => updateForm("gender", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Height (cm)</label>
                      <input type="number" placeholder="e.g. 175" className="w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white focus:outline-none focus:border-emerald-500" value={formData.height} onChange={(e) => updateForm("height", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Weight (kg)</label>
                      <input type="number" placeholder="e.g. 75" className="w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white focus:outline-none focus:border-emerald-500" value={formData.weight} onChange={(e) => updateForm("weight", e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Diet Setup</label>
                    <select className="w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white focus:outline-none focus:border-emerald-500" value={formData.dietType} onChange={(e) => updateForm("dietType", e.target.value)}>
                      <option value="">Select...</option>
                      <option value="Hostel Mess">Hostel Mess / PG Food (Carb heavy)</option>
                      <option value="Home Cooked">Home Cooked (Balanced but high carb)</option>
                      <option value="Self Cooked Diet">Self Cooked (Tracking Macros)</option>
                      <option value="Zomato Dependent">Swiggy/Zomato Dependent</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: DISCIPLINE */}
              {currentStep === 1 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Habits & Discipline</h2>
                  <p className="text-gray-400 mb-6 text-sm">You are what you repeatedly do.</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Wake Up Time</label>
                      <input type="time" className="w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white focus:outline-none focus:border-emerald-500" value={formData.wakeUpTime} onChange={(e) => updateForm("wakeUpTime", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Screen Time (hrs)</label>
                      <select className="w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white focus:outline-none focus:border-emerald-500" value={formData.screenTime} onChange={(e) => updateForm("screenTime", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="< 2 hrs">&lt; 2 hrs</option>
                        <option value="3-5 hrs">3-5 hrs</option>
                        <option value="6-8 hrs">6-8 hrs</option>
                        <option value="8+ hrs">8+ hrs (Brain rot)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Vices & Distractions (Select all that apply)</label>
                    <div className="flex flex-wrap gap-2">
                      {["Insta/Reels", "Porn", "Video Games", "Junk Food", "Smoking/Vaping", "Binge Drinking"].map(habit => (
                        <button
                          key={habit}
                          onClick={() => toggleHabit(habit)}
                          className={`px-4 py-2 rounded-md text-sm transition-colors border ${formData.badHabits.includes(habit) ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-600'}`}
                        >
                          {habit}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: WEALTH */}
              {currentStep === 2 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Finance & Trajectory</h2>
                  <p className="text-gray-400 mb-6 text-sm">Cash flow equals optionality.</p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Monthly Income / Allowance (₹)</label>
                      <select className="w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white focus:outline-none focus:border-emerald-500" value={formData.income} onChange={(e) => updateForm("income", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Student (0)">Student / 0 Income</option>
                        <option value="Pocket Money (<5k)">Pocket Money (&lt;₹5k)</option>
                        <option value="₹10k - ₹30k">₹10k - ₹30k</option>
                        <option value="₹30k - ₹80k">₹30k - ₹80k</option>
                        <option value="₹80k+">₹80k+</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">UPI Spending Habits</label>
                      <select className="w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white focus:outline-none focus:border-emerald-500" value={formData.spendingHabits} onChange={(e) => updateForm("spendingHabits", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Frugal">Frugal (Track everything)</option>
                        <option value="Micro-leaks">Micro-leaks (Swiggy, Chai, Cabs)</option>
                        <option value="Reckless">Reckless (No idea where money goes)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: SOCIAL */}
              {currentStep === 3 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Social & Relationships</h2>
                  <p className="text-gray-400 mb-6 text-sm">Your network is your net worth.</p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Dating / Relationship Status</label>
                      <select className="w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white focus:outline-none focus:border-emerald-500" value={formData.datingLife} onChange={(e) => updateForm("datingLife", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Single & Struggling">Single (Struggling/Zero Matches)</option>
                        <option value="Single & Abundant">Single (Options)</option>
                        <option value="In a Relationship">In a Relationship</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Social Anxiety Level</label>
                      <select className="w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white focus:outline-none focus:border-emerald-500" value={formData.socialAnxiety} onChange={(e) => updateForm("socialAnxiety", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="High">High (Can't talk to strangers)</option>
                        <option value="Medium">Medium (Awkward but trying)</option>
                        <option value="Low">Low (Confident, good speaker)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: GOALS */}
              {currentStep === 4 && (
                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Your True Objective</h2>
                  <p className="text-gray-400 mb-6 text-sm">What do you actually want?</p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Primary Goal Right Now</label>
                      <select className="w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white focus:outline-none focus:border-emerald-500" value={formData.primaryGoal} onChange={(e) => updateForm("primaryGoal", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Physical Glow Up">Physical Glow Up (Aesthetics)</option>
                        <option value="Make Money">Make Money / Career</option>
                        <option value="Fix Mental Health">Fix Mental Health & Discipline</option>
                        <option value="Get a Partner">Attraction / Dating</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-md flex flex-col gap-2 text-red-400 text-sm">
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 shrink-0" />
                  <span className="font-bold">Analysis Failed</span>
                </div>
                <p className="text-gray-300 font-mono text-xs">{error}</p>
                <Button variant="outline" size="sm" onClick={handleSubmit} className="w-fit mt-2 border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300">
                  Retry Analysis
                </Button>
              </div>
            )}

            <div className="mt-10 flex justify-between">
              <Button 
                variant="ghost" 
                onClick={handlePrev} 
                disabled={currentStep === 0 || isSubmitting}
                className={currentStep === 0 ? "opacity-0" : ""}
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Back
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button variant="default" onClick={handleNext}>
                  Next <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button variant={error ? "destructive" : "premium"} onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
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
            className="mt-8 text-center text-emerald-400 text-sm font-mono flex flex-col items-center justify-center gap-2"
          >
            <Loader2 className="w-6 h-6 animate-spin mb-2 text-emerald-500" />
            <span className="animate-pulse">AI is parsing your data...</span>
            <span className="text-xs text-gray-500 animate-pulse delay-150">Comparing metrics against national averages...</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
