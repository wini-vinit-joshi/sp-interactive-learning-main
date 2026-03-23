import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Search, X, ZoomIn, Check, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import { API_BASE_URL } from "@/config";

export interface CategoryImage {
  id: string;
  problem_url: string;
  solution_url: string;
}

interface SingleFeedback {
  accuracy: string;
  score: number;
  feedback: string;
  missed_issues?: string[];
}

function AccuracyIcon({ accuracy, size = "sm" }: { accuracy: string; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "w-8 h-8" : "w-5 h-5";
  if (accuracy === "correct") return <CheckCircle className={`${cls} text-green-500`} />;
  if (accuracy === "partial") return <AlertTriangle className={`${cls} text-yellow-500`} />;
  return <AlertCircle className={`${cls} text-red-500`} />;
}

export default function ImageBatchViewer({ images, onComplete }: { images: CategoryImage[], onComplete: () => void }) {
  const [active, setActive] = useState(0);
  const [remarks, setRemarks] = useState<string[]>([]);
  const [feedbacks, setFeedbacks] = useState<(SingleFeedback | null)[]>([]);
  const [draft, setDraft] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  // Initialize state when images change
  useEffect(() => {
    setRemarks(Array(images.length).fill(""));
    setFeedbacks(Array(images.length).fill(null));
    setActive(0);
    setDraft("");
  }, [images]);

  // Sync draft when switching images
  useEffect(() => {
    if (remarks.length > active) {
      setDraft(remarks[active]);
    }
  }, [active, remarks]);

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (!lightbox || images.length === 0) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((p: number) => (p + 1) % images.length);
      if (e.key === "ArrowLeft")  setActive((p: number) => (p - 1 + images.length) % images.length);
      if (e.key === "Escape")     setLightbox(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, images.length]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  if (!images || images.length === 0) return null;

  const prev = () => setActive((p: number) => (p - 1 + images.length) % images.length);
  const next = () => setActive((p: number) => (p + 1) % images.length);

  const handleAnalyzeSingle = async () => {
    if (!draft.trim()) return;
    setIsAnalyzing(true);
    
    // Save draft
    const newRemarks = [...remarks];
    newRemarks[active] = draft;
    setRemarks(newRemarks);

    try {
      const res = await fetch(`${API_BASE_URL}/api/analyse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId: images[active].id, userAnswer: draft })
      });
      const data = await res.json();

      if (data.success && data.data) {
        const score = data.data.score;
        const accuracy = score >= 80 ? "correct" : score >= 50 ? "partial" : "wrong";
        
        const newFeedbacks = [...feedbacks];
        newFeedbacks[active] = { 
          accuracy, 
          score, 
          feedback: data.data.feedback,
          missed_issues: data.data.missed_issues
        };
        setFeedbacks(newFeedbacks);
        
        // If all are done
        if (newFeedbacks.every(Boolean)) {
          onComplete();
        }
      }
    } catch (err) {
      console.error("Failed to analyze image", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRetry = () => {
    const newFeedbacks = [...feedbacks];
    newFeedbacks[active] = null;
    setFeedbacks(newFeedbacks);
  };

  const allSubmitted = feedbacks.length > 0 && feedbacks.every(Boolean);

  const currentLabel = `Image ${images[active].id}`;
  const currentImageSrc = feedbacks[active] ? images[active].solution_url : images[active].problem_url;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100" style={{ background: "linear-gradient(135deg,#005981,#0080b8)" }}>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Search className="w-5 h-5" />
            Practice Exercise: Spot the Defects
          </h3>
          <p className="text-white/70 mt-1 text-sm">
            Examine each image, write your remark, and get AI feedback.
          </p>
        </div>

        <div className="p-6">
          {/* Progress pills */}
          <div className="flex gap-1.5 mb-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="flex-1 h-1.5 rounded-full transition-all"
                style={{ backgroundColor: feedbacks[i] ? "#005981" : i === active ? "#7ecfef" : "#e2e8f0" }}
              />
            ))}
          </div>

          {/* Thumbnail strip (AT TOP) */}
          <div className="grid grid-cols-6 gap-2 mb-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="relative rounded-xl overflow-hidden transition-all bg-slate-100"
                style={{ aspectRatio: "1", outline: i === active ? "2.5px solid #005981" : "2.5px solid transparent", opacity: i === active ? 1 : 0.55 }}
              >
                <img src={feedbacks[i] ? img.solution_url : img.problem_url} alt={`Thumb ${img.id}`} className="w-full h-full object-cover" />
                {feedbacks[i] && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "#005981aa" }}>
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Main image */}
          <div
            className="relative w-full rounded-2xl overflow-hidden bg-slate-900 cursor-zoom-in group mb-6 flex items-center justify-center"
            style={{ aspectRatio: "16/7" }}
            onClick={() => setLightbox(true)}
          >
            <img
              key={`${active}-${feedbacks[active] ? 'sol' : 'prob'}`}
              src={currentImageSrc}
              alt={currentLabel}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute top-4 left-4 pointer-events-none">
              <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${feedbacks[active] ? "bg-green-500 text-white shadow-lg" : "bg-black/40 text-white backdrop-blur-md"}`}>
                {feedbacks[active] ? "Solution" : "Problem"}
              </span>
            </div>

            <div className="absolute bottom-4 left-5 text-white pointer-events-none">
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">Image {active + 1} of {images.length}</span>
              <p className="text-lg font-bold mt-0.5">{currentLabel}</p>
            </div>

            {/* Tick overlay when submitted 
            {feedbacks[active] && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#005981cc" }}>
                  <Check className="w-9 h-9 text-white" strokeWidth={3} />
                </div>
              </div>
            )}
            */}

            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <ZoomIn className="w-3.5 h-3.5" /> Click to enlarge
            </div>

            {images.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#005981] transition-colors opacity-0 group-hover:opacity-100">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#005981] transition-colors opacity-0 group-hover:opacity-100">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Per-image remark input & feedback */}
          <div className="space-y-3">
            {!feedbacks[active] ? (
              <>
                <label className="block text-sm font-semibold text-slate-700">
                  Write your remark for <span className="text-[#005981]">{currentLabel}</span>:
                </label>
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={3}
                  placeholder="What defects do you see in this image?"
                  className="w-full rounded-xl border border-slate-300 p-4 text-sm text-slate-800 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ "--tw-ring-color": "#005981" } as React.CSSProperties}
                  onFocus={(e) => (e.target.style.borderColor = "#005981")}
                  onBlur={(e) => (e.target.style.borderColor = "")}
                />
                <button
                  onClick={handleAnalyzeSingle}
                  disabled={!draft.trim() || isAnalyzing}
                  className="w-full h-11 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#005981" }}
                >
                  {isAnalyzing ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Analyze with AI <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </>
            ) : (
              <div
                className={`p-5 rounded-2xl border-2 transition-all ${
                  feedbacks[active]!.accuracy === "correct" ? "border-green-400 bg-green-50" :
                  feedbacks[active]!.accuracy === "partial" ? "border-yellow-400 bg-yellow-50" :
                  "border-red-400 bg-red-50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <AccuracyIcon accuracy={feedbacks[active]!.accuracy} size="lg" />
                  <div className="flex-1">
                    <h4 className={`text-sm font-extrabold ${
                      feedbacks[active]!.accuracy === "correct" ? "text-green-700" :
                      feedbacks[active]!.accuracy === "partial" ? "text-yellow-700" :
                      "text-red-700"
                    }`}>
                      {feedbacks[active]!.accuracy === "correct" ? "Excellent!" :
                       feedbacks[active]!.accuracy === "partial" ? "Good Effort!" : "Needs Review"}
                    </h4>
                    <p className="text-sm mt-1 text-slate-700 font-medium">{feedbacks[active]!.feedback}</p>
                    
                    {feedbacks[active]!.missed_issues && feedbacks[active]!.missed_issues!.length > 0 && (
                      <div className="mt-3 bg-white/50 rounded-lg p-3 border border-slate-200/50">
                        <p className="text-xs font-bold text-slate-700 mb-1">Missed Issues:</p>
                        <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5">
                          {feedbacks[active]!.missed_issues!.map((issue: string, idx: number) => (
                            <li key={idx}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <p className="text-xs text-slate-500 italic mt-3 opacity-80 border-t border-slate-200/50 pt-2">Your remark: "{draft}"</p>
                  </div>
                  {/* Score badge */}
                  <div className="bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full shrink-0">
                    {feedbacks[active]!.score}/100
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={handleRetry}
                    className="flex-1 h-10 rounded-xl bg-white border border-slate-300 text-slate-700 text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors"
                  >
                    Retry
                  </button>
                  {images.length > 1 && (
                    <button
                      onClick={next}
                      className="flex-1 h-10 rounded-xl text-white text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-1.5 hover:opacity-90"
                      style={{ backgroundColor: "#005981" }}
                    >
                      Next Image <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Progress hint */}
          {!allSubmitted && images.length > 0 && (
            <p className="mt-4 text-center text-xs text-slate-400">
              {feedbacks.filter(Boolean).length} of {images.length} remarks analyzed
            </p>
          )}
          {allSubmitted && (
            <p className="mt-4 text-center text-sm font-bold text-[#005981]">
              <CheckCircle className="w-4 h-4 inline mr-1" /> All images analyzed!
            </p>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95" onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10" onClick={() => setLightbox(false)}>
            <X className="w-5 h-5" />
          </button>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
            {active + 1} / {images.length} — <span className="text-white">{currentLabel} {feedbacks[active] ? "(Solution)" : "(Problem)"}</span>
          </div>
          {images.length > 1 && (
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#005981] text-white flex items-center justify-center transition-colors z-10" onClick={(e) => { e.stopPropagation(); prev(); }}>
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <img key={`${active}-${feedbacks[active] ? 'sol' : 'prob'}-full`} src={currentImageSrc} alt={currentLabel} className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
          {images.length > 1 && (
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#005981] text-white flex items-center justify-center transition-colors z-10" onClick={(e) => { e.stopPropagation(); next(); }}>
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
