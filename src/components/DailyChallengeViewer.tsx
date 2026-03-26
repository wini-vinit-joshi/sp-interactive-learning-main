import { useState } from "react";
import { Search, ChevronRight, CheckCircle, AlertTriangle, AlertCircle, Sparkles, AlertOctagon } from "lucide-react";
import { API_BASE_URL } from "@/config";

export interface CategoryImage {
  id: string;
  problem_url: string;
  solution_url: string;
}

interface DailyChallengeViewerProps {
  challengeId: string;
  images: CategoryImage[];
  onComplete: () => void;
}

interface FeedbackData {
  feedback: string;
  missed_issues: string[];
  score: number;
}

export default function DailyChallengeViewer({ challengeId, images, onComplete }: DailyChallengeViewerProps) {
  const [draft, setDraft] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);

  const handleAnalyze = async () => {
    if (!draft.trim()) return;
    setIsAnalyzing(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/daily-challenges-analyse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId, userAnswer: draft })
      });
      const data = await res.json();

      if (data.success && data.data) {
        setFeedbackData({
          feedback: data.data.feedback,
          missed_issues: data.data.missed_issues,
          score: data.data.score
        });

        // Let the parent know they completed the challenge, but we might want them to read the feedback first.
        // We can wait 5 seconds or just let them click a "Finish Challenge" button.
      }
    } catch (err) {
      console.error("Failed to analyze daily challenge", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden">
      {/* Distinct Header Style */}
      <div className="px-8 py-6 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-orange-500" />
          Today's Challenge
        </h3>
        <p className="text-slate-600 mt-2 text-sm font-medium">
          Review all the images below to form a comprehensive defect report for this property. Write a combined analysis as a home inspector.
        </p>
      </div>

      <div className="p-8">
        {/* Gallery Grid (shows all images at once instead of carousel) */}
        <div className={`grid gap-4 mb-8 ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {images.map((img, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden bg-slate-100 group shadow-sm border border-slate-200" style={{ aspectRatio: images.length > 1 ? '4/3' : '16/9' }}>
              <img src={img.problem_url} alt={`Challenge Image ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                IMAGE {i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Input & Feedback Section */}
        {!feedbackData ? (
          <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <label className="block text-sm font-bold text-slate-800">
              Your Inspection Comment:
            </label>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={4}
              placeholder="Detail all the primary defects, hazards, and recommendations across the photos..."
              className="w-full rounded-xl border border-slate-300 p-5 text-sm text-slate-800 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 shadow-inner bg-white"
            />
            <button
              onClick={handleAnalyze}
              disabled={!draft.trim() || isAnalyzing}
              className="w-full h-14 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-all hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed bg-orange-500 shadow-md shadow-orange-500/20"
            >
              {isAnalyzing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Submit <Search className="w-5 h-5" /></>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className={`p-8 rounded-3xl border-2 shadow-sm ${feedbackData.score >= 80 ? "border-green-200 bg-green-50" :
                feedbackData.score >= 50 ? "border-yellow-200 bg-yellow-50" :
                  "border-red-200 bg-red-50"
              }`}>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6 pb-6 border-b border-black/5">
                <div className="flex-1">
                  <h4 className="text-2xl font-black text-slate-900 mb-2">
                    {feedbackData.score >= 80 ? "Outstanding Analysis!" :
                      feedbackData.score >= 50 ? "Good Effort!" : "Needs Improvement"}
                  </h4>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/60 text-sm font-bold text-slate-700 shadow-sm border border-black/5">
                    OVERALL SCORE: <span className={`text-lg ${feedbackData.score >= 80 ? 'text-green-600' : feedbackData.score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>{feedbackData.score}/100</span>
                  </div>
                </div>
                {feedbackData.score >= 80 ? (
                  <CheckCircle className="w-16 h-16 text-green-500 drop-shadow-sm" />
                ) : feedbackData.score >= 50 ? (
                  <AlertTriangle className="w-16 h-16 text-yellow-500 drop-shadow-sm" />
                ) : (
                  <AlertOctagon className="w-16 h-16 text-red-500 drop-shadow-sm" />
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">AI Feedback</h5>
                  <p className="text-slate-800 text-base leading-relaxed font-medium bg-white/50 p-4 rounded-xl border border-black/5">{feedbackData.feedback}</p>
                </div>

                {feedbackData.missed_issues && feedbackData.missed_issues.length > 0 && (
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Missed Issues</h5>
                    <ul className="grid gap-2">
                      {feedbackData.missed_issues.map((issue, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-red-50/50 p-3 rounded-lg border border-red-100">
                          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700 font-medium">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={onComplete}
              className="w-full h-14 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-all hover:opacity-90 bg-slate-900 shadow-lg"
            >
              Complete Daily Challenge <CheckCircle className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
