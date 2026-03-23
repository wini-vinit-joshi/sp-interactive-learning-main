"use client";

import { useState } from "react";
import { Lock, PlayCircle } from "lucide-react";
import ImageBatchViewer from "@/components/ImageBatchViewer";
import AIFeedbackPanel from "@/components/AIFeedbackPanel";

const CATEGORIES = [
  { id: "exterior", label: "Exterior", locked: false },
  { id: "roof", label: "Roof", locked: true },
  { id: "garage", label: "Garage", locked: true },
  { id: "decks", label: "Decks, Balconies", locked: true },
  { id: "electrical", label: "Electrical", locked: true },
  { id: "plumbing", label: "Plumbing", locked: true },
];

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState("exterior");
  const [feedbackResult, setFeedbackResult] = useState(null);

  const handleAnalyze = async (remarks: string) => {
    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: activeCategory, batchId: "exterior_01", userRemarks: remarks })
      });
      const data = await response.json();
      setFeedbackResult(data);
    } catch (error) {
      console.error("Evaluation failed", error);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Category Navigation */}
      <div className="bg-white border-b sticky top-16 z-40 overflow-x-auto scrollbar-hide">
        <div className="container mx-auto max-w-7xl px-4 flex items-center space-x-2 py-4 min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => !cat.locked && setActiveCategory(cat.id)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                cat.locked 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-transparent' 
                  : activeCategory === cat.id 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {cat.locked && <Lock className="w-4 h-4" />}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content Area */}
          <div className="flex-1 space-y-12">
            
            {/* Video Section */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Exterior Inspection 101</h2>
              <p className="text-slate-600 mb-6">Learn the fundamentals of assessing siding, trim, and functional exterior elements.</p>
              <div className="relative aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-xl group border border-slate-200">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                <button className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-blue-600/90 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-transform group-hover:scale-110 shadow-lg shadow-blue-500/50">
                    <PlayCircle className="w-10 h-10 ml-1" />
                  </div>
                </button>
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                  <div>
                    <h3 className="font-bold text-lg">Module 1: Siding & Grading</h3>
                    <p className="text-sm text-slate-300">12:45 • Intermediate</p>
                  </div>
                  <div className="h-2 w-32 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-1/3 rounded-full"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Try with AI Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                    <span className="text-xl mr-2">🧪</span> Try with AI
                  </h2>
                  <p className="text-slate-600">Apply what you learned. Our AI Trainer will grade your remarks.</p>
                </div>
              </div>
              
              <ImageBatchViewer onAnalyze={handleAnalyze} />
              <AIFeedbackPanel result={feedbackResult} />
            </section>

          </div>
          
          {/* Right Sidebar (Optional Info/Stats) */}
          <div className="lg:w-80 hidden lg:block space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Exterior Module</span>
                    <span className="font-bold text-blue-600">35%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-[35%] rounded-full"></div>
                  </div>
                </div>
                <div className="text-sm text-slate-500 pt-2 border-t border-slate-100">
                  Complete 2 more interactive exercises to unlock the [Roof] module.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
