import { CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const IMAGE_SRCS: Record<string, string> = {
  "Rot":                     "/assets/images/Rot.png",
  "Wall Covering Damage":    "/assets/images/Wall Covering Damage.png",
  "Water Damage & Leaks":    "/assets/images/Water Damage & Leaks.png",
  "Surface Water & Grading": "/assets/images/Surface Water and Grading Issues.png",
  "Exterior Door Issues":    "/assets/images/Exterior Door Issues.png",
  "Balcony & Deck Safety":   "/assets/images/Balcony and Deck Safety Concerns.png",
};

interface PerImageResult {
  label: string;
  remark: string;
  accuracy: string;
  score: number;
  feedback: string;
}

interface FeedbackResult {
  accuracy: string;
  score: number;
  feedback: string;
  missedIssues?: string[];
  perImage?: PerImageResult[];
}

function accuracyColors(accuracy: string) {
  if (accuracy === "correct") return { border: "border-green-400", bg: "bg-green-50", text: "text-green-700", badge: "bg-green-100 text-green-700", ring: "#22c55e" };
  if (accuracy === "partial") return { border: "border-yellow-400", bg: "bg-yellow-50", text: "text-yellow-700", badge: "bg-yellow-100 text-yellow-700", ring: "#eab308" };
  return { border: "border-red-400", bg: "bg-red-50", text: "text-red-700", badge: "bg-red-100 text-red-700", ring: "#ef4444" };
}

function accuracyLabel(accuracy: string) {
  if (accuracy === "correct") return "Correct";
  if (accuracy === "partial") return "Partial";
  return "Missed";
}

function AccuracyIcon({ accuracy, size = "sm" }: { accuracy: string; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "w-8 h-8" : "w-4 h-4";
  if (accuracy === "correct") return <CheckCircle className={`${cls} text-green-500`} />;
  if (accuracy === "partial") return <AlertTriangle className={`${cls} text-yellow-500`} />;
  return <AlertCircle className={`${cls} text-red-500`} />;
}

export default function AIFeedbackPanel({ result }: { result: FeedbackResult | null }) {
  if (!result) return null;

  const total = accuracyColors(result.accuracy);

  console.log("Feedback Result:", result); // Debug log to inspect the result object

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mt-8"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100" style={{ background: "linear-gradient(135deg,#005981,#0080b8)" }}>
        <h3 className="text-lg font-bold text-white">AI Feedback</h3>
        <p className="text-white/70 text-sm mt-0.5">Per-image breakdown of your inspection remarks</p>
      </div>

      {/* Image grid */}
      {result.perImage && result.perImage.length > 0 && (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.perImage.map((item, i) => {
            const c = accuracyColors(item.accuracy);
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl border-2 overflow-hidden ${c.border}`}
              >
                {/* Image */}
                <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={IMAGE_SRCS[item.label]}
                    alt={item.label}
                    className="w-full h-full object-cover"
                  />
                  {/* Accuracy badge overlay */}
                  <div className="absolute top-2 left-2">
                    <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full shadow ${c.badge}`}>
                      <AccuracyIcon accuracy={item.accuracy} />
                      {accuracyLabel(item.accuracy)}
                    </span>
                  </div>
                  {/* Score badge */}
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {item.score}/100
                  </div>
                </div>

                {/* Card body */}
                <div className={`p-3 ${c.bg}`}>
                  <p className="text-sm font-bold text-slate-900 mb-1">{item.label}</p>
                  <p className="text-xs text-slate-500 italic mb-2 line-clamp-2">"{item.remark}"</p>
                  <p className={`text-xs font-medium ${c.text}`}>{item.feedback}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Total accuracy */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (result.perImage?.length ?? 0) * 0.08 + 0.1 }}
        className={`mx-6 mb-6 rounded-2xl border-2 p-5 ${total.border} ${total.bg}`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AccuracyIcon accuracy={result.accuracy} size="lg" />
            <div>
              <p className={`text-lg font-extrabold ${total.text}`}>
                {result.accuracy === "correct" ? "Excellent Work!" :
                 result.accuracy === "partial" ? "Good Effort!" : "Needs Improvement"}
              </p>
              <p className="text-sm text-slate-600 mt-0.5">{result.feedback}</p>
            </div>
          </div>

          {/* Score ring */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke={total.ring} strokeWidth="6" opacity={0.2} />
              <circle cx="32" cy="32" r="28" fill="none" stroke={total.ring} strokeWidth="6"
                strokeDasharray={`${(result.score / 100) * 175} 175`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out" />
            </svg>
            <span className={`absolute text-base font-extrabold ${total.text}`}>{result.score}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
