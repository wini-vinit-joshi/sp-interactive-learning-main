import { useState, useRef, useEffect } from "react";
import { Lock, Check, PlayCircle, FlaskConical, ArrowRight, CalendarCheck, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ImageBatchViewer from "@/components/ImageBatchViewer";
import CTABanner from "@/components/CTABanner";
import VideoPlayer, { ChapterPanel, Chapter } from "@/components/VideoPlayer";
import ConsultationModal from "@/components/ConsultationModal";
import AuthModal from "@/components/AuthModal";
import { API_BASE_URL } from "@/config";

interface Category {
  id: string;
  label: string;
  locked: boolean;
  preview?: boolean;
  video: string | null;
  title: string;
  description: string;
  chapters: Chapter[];
}

const CATEGORIES: Category[] = [
  {
    id: "exterior",
    label: "Exterior",
    locked: false,
    video: "/assets/video/Exterior Inspection Demo Keith V2.mp4",
    title: "Exterior Inspection",
    description: "Learn the fundamentals of assessing siding, trim, grading, and functional exterior elements.",
    chapters: [
      { title: "Introduction", time: 0 },
      { title: "Siding & Cladding", time: 45 },
      { title: "Foundation & Grading", time: 120 },
      { title: "Windows & Doors", time: 210 },
      { title: "Roof Overview", time: 300 },
      { title: "Gutters & Drainage", time: 390 },
      { title: "Summary & Tips", time: 480 },
    ],
  },
  {
    id: "hvac", label: "HVAC", locked: false, preview: true,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "HVAC Inspection",
    description: "Inspect heating, ventilation, and air conditioning systems for defects and safety issues.",
    chapters: [
      { title: "Introduction", time: 0 },
      { title: "Furnace & Heat Exchanger", time: 30 },
      { title: "Cooling System", time: 90 },
      { title: "Ductwork & Ventilation", time: 150 },
      { title: "Thermostat & Controls", time: 210 },
    ],
  },
  {
    id: "interior", label: "Interior", locked: false, preview: true,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "Interior Inspection",
    description: "Assess walls, ceilings, floors, doors, and interior components for defects.",
    chapters: [
      { title: "Introduction", time: 0 },
      { title: "Walls & Ceilings", time: 30 },
      { title: "Floors & Stairs", time: 80 },
      { title: "Interior Doors", time: 140 },
      { title: "Windows & Insulation", time: 190 },
    ],
  },
  {
    id: "roof", label: "Roof", locked: false, preview: true,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "Roof Inspection",
    description: "Identify roofing defects, flashing issues, and drainage problems.",
    chapters: [
      { title: "Introduction", time: 0 },
      { title: "Shingles & Materials", time: 30 },
      { title: "Flashing & Seals", time: 90 },
      { title: "Gutters & Drainage", time: 150 },
      { title: "Chimney & Vents", time: 210 },
    ],
  },
  { id: "electrical", label: "Electrical System", locked: false, preview: true, video: "https://www.w3schools.com/html/mov_bbb.mp4", title: "Electrical System Inspection", description: "Master the detection of faulty wiring, panel issues, and safety hazards.", chapters: [
    { title: "Introduction", time: 0 },
    { title: "Service Entry & Panel", time: 30 },
    { title: "Branch Circuits & Wiring", time: 90 },
    { title: "Outlets & GFCI", time: 150 },
    { title: "Safety Hazards", time: 200 },
  ]},
  { id: "plumbing", label: "Plumbing", locked: false, preview: true, video: "https://www.w3schools.com/html/mov_bbb.mp4", title: "Plumbing Inspection", description: "Identify pipe leaks, water heater defects, and drainage problems.", chapters: [
    { title: "Introduction", time: 0 },
    { title: "Supply Lines", time: 30 },
    { title: "Drain & Waste", time: 80 },
    { title: "Water Heater", time: 140 },
    { title: "Fixtures & Shutoffs", time: 190 },
  ]},
  { id: "structural", label: "Structural System", locked: false, preview: true, video: "https://www.w3schools.com/html/mov_bbb.mp4", title: "Structural System Inspection", description: "Evaluate foundation, framing, beams, and load-bearing components for structural integrity.", chapters: [
    { title: "Introduction", time: 0 },
    { title: "Foundation Types", time: 30 },
    { title: "Framing & Beams", time: 80 },
    { title: "Load-Bearing Walls", time: 140 },
    { title: "Crawlspace & Basement", time: 190 },
  ]},
];

const TIMELINE_STEPS = [
  { id: "video",     label: "Learn via Video",              sub: "Watch the inspection module",                          icon: PlayCircle },
  { id: "practice",  label: "Practice Inspection with AI",  sub: "Examine images, write remarks & get AI feedback",      icon: FlaskConical },
];

// Refs for scrolling to sections
const sectionIds = { video: "section-video", practice: "section-practice" };

export default function LearnPage() {
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/metadata`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.course1) {
          setCourseData(data.data.course1);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch metadata", err);
        setLoading(false);
      });
  }, []);

  const apiMapping: Record<string, string> = {
    exterior: "Exterior",
    hvac: "HVAC",
    interior: "Interior",
    roof: "Roof",
    electrical: "Electricals",
    plumbing: "Plumbing",
    structural: "Structure"
  };

  const mergedCategories = CATEGORIES.map(cat => {
    const apiData = courseData ? courseData[apiMapping[cat.id]] : null;
    if (apiData) {
      return {
        ...cat,
        locked: apiData.sign_in_required,
        preview: apiData.sign_in_required,
        video: apiData.video_url || cat.video,
        apiImages: apiData.images ? Object.entries(apiData.images).map(([id, val]: any) => ({
          id,
          problem_url: val.problem_url,
          solution_url: val.solution_url
        })) : []
      };
    }
    return { ...cat, apiImages: [] };
  });

  const [activeCategory, setActiveCategory] = useState("exterior");
  const [signUpModal, setSignUpModal] = useState(false);
  const [categoryProgress, setCategoryProgress] = useState<Record<string, number>>({});
  const [videoState, setVideoState] = useState({ currentTime: 0, duration: 0, activeChapter: 0 });
  const [seekTo, setSeekTo] = useState<number | null>(null);

  // Timeline completion state
  const [stepsCompleted, setStepsCompleted] = useState<Record<string, boolean>>({
    video: false, practice: false,
  });
  const [activeStep, setActiveStep] = useState("video");

  const category = mergedCategories.find((c) => c.id === activeCategory)!;
  const visibleSteps = TIMELINE_STEPS.filter(s => s.id !== "practice" || (category.apiImages && category.apiImages.length > 0));

  // Mark video done when ≥ 80% watched
  const handleProgress = (currentTime: number, duration: number, activeChapter: number) => {
    setVideoState({ currentTime, duration, activeChapter });
    if (duration > 0) {
      const pct = Math.round((currentTime / duration) * 100);
      setCategoryProgress((prev) => ({ ...prev, [activeCategory]: Math.max(prev[activeCategory] ?? 0, pct) }));
      if (pct >= 80) {
        setStepsCompleted((prev) => ({ ...prev, video: true }));
        setActiveStep((s) => s === "video" ? "practice" : s);
      }
    }
  };

  // Mark practice done when user finishes all image feedback loops
  const handlePracticeComplete = () => {
    setStepsCompleted((prev) => ({ ...prev, practice: true }));
  };

  const scrollToSection = (stepId: string) => {
    const el = document.getElementById(sectionIds[stepId as keyof typeof sectionIds]);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Reset timeline when category changes
  useEffect(() => {
    setStepsCompleted({ video: false, practice: false });
    setActiveStep("video");
    setVideoState({ currentTime: 0, duration: 0, activeChapter: 0 });
  }, [activeCategory]);

  const completedCount = visibleSteps.filter(s => stepsCompleted[s.id]).length;
  const overallPct = Math.round((completedCount / visibleSteps.length) * 100) || 0;

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-16"><div className="w-8 h-8 border-4 border-[#005981]/30 border-t-[#005981] rounded-full animate-spin" /></div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-24">
      {/* Category Tab Bar */}
      <div className="bg-white border-b sticky top-24 z-40 overflow-x-auto">
        <div className="container mx-auto max-w-7xl px-4 flex items-center space-x-2 py-3 min-w-max">
          {mergedCategories.map((cat) => {
            const pct = categoryProgress[cat.id] ?? 0;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { if (!cat.locked) { setActiveCategory(cat.id); setVideoState({ currentTime: 0, duration: 0, activeChapter: 0 }); if (cat.preview) setSignUpModal(true); } }}
                className={`relative inline-flex h-9 items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors overflow-hidden ${
                  cat.locked ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : isActive ? "bg-[#005981] text-white shadow"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-[#005981] hover:text-[#005981]"
                }`}
              >
                {!cat.locked && !isActive && pct > 0 && (
                  <span className="absolute inset-0 rounded-full opacity-10" style={{ width: `${pct}%`, backgroundColor: "#005981" }} />
                )}
                {cat.locked && <Lock className="w-3.5 h-3.5 shrink-0" />}
                {cat.preview && <Lock className="w-3.5 h-3.5 shrink-0 opacity-50" />}
                <span>{cat.label}</span>
                {!cat.locked && pct > 0 && (
                  <span className={`text-xs font-bold shrink-0 ${isActive ? "text-white/80" : "text-[#005981]"}`}>{pct}%</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 pt-4">
        <div className="flex gap-8">

          {/* ── Left: Timeline sidebar ── */}
          <aside className="hidden lg:flex flex-col w-56 shrink-0">
            <div className="sticky top-44">
              {/* Overall progress */}
              <div className="mb-5">
                <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                  <span>Your Progress</span>
                  <span style={{ color: "#005981" }}>{overallPct}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${overallPct}%`, backgroundColor: "#005981" }} />
                </div>
              </div>

              {/* Steps */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-4 w-px bg-slate-200" style={{ height: "calc(100% - 3rem)" }} />
                {/* Filled line */}
                <div
                  className="absolute left-4 top-4 w-px transition-all duration-700"
                  style={{
                    backgroundColor: "#005981",
                    height: visibleSteps.length > 1 ? `${(completedCount / visibleSteps.length) * (100 - (100 / visibleSteps.length))}%` : "0%",
                  }}
                />

                <div className="space-y-1">
                  {visibleSteps.map((step, i) => {
                    const done = stepsCompleted[step.id];
                    const isCurrentStep = activeStep === step.id;
                    const Icon = step.icon;

                    return (
                      <button
                        key={step.id}
                        onClick={() => scrollToSection(step.id)}
                        className="relative flex items-start gap-3 w-full text-left px-2 py-2.5 rounded-xl transition-all hover:bg-white hover:shadow-sm group"
                      >
                        {/* Node */}
                        <div
                          className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border-2"
                          style={{
                            backgroundColor: done ? "#005981" : isCurrentStep ? "#e6f2f7" : "white",
                            borderColor: done || isCurrentStep ? "#005981" : "#e2e8f0",
                          }}
                        >
                          {done ? (
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          ) : (
                            <Icon className="w-3.5 h-3.5" style={{ color: isCurrentStep ? "#005981" : "#94a3b8" }} />
                          )}
                        </div>

                        {/* Label */}
                        <div className="pt-0.5 min-w-0">
                          <p className={`text-xs font-semibold leading-tight transition-colors ${
                            done ? "text-[#005981]" : isCurrentStep ? "text-slate-900" : "text-slate-400"
                          }`}>
                            {step.label}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5 leading-tight">{step.sub}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* ── Right: Main content ── */}
          <div className="flex-1 min-w-0 space-y-14">
            {/* Title */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900">{category.title}</h2>
              <p className="text-slate-500 mt-1">{category.description}</p>
            </div>

            {category.video ? (
              <>
                {/* Step 1 — Video */}
                <section id={sectionIds.video} className="scroll-mt-36 !mt-4">
                  <StepLabel index={1} label="Learn via Video" done={stepsCompleted.video} active={activeStep === "video"} />
                  <div className="flex flex-col xl:flex-row gap-4 mt-4 items-stretch xl:h-[550px]" style={{ minHeight: "400px" }}>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex-1 min-h-0">
                        <VideoPlayer
                          key={category.id}
                          src={category.video}
                          chapters={category.chapters}
                          onProgress={handleProgress}
                          seekTo={seekTo}
                          onSeeked={() => setSeekTo(null)}
                          categoryName={apiMapping[category.id]}
                        />
                      </div>
                    </div>
                    {category.chapters.length > 0 && (
                      <div className="xl:w-72 shrink-0 flex flex-col">
                        <ChapterPanel
                          chapters={category.chapters}
                          activeChapter={videoState.activeChapter}
                          currentTime={videoState.currentTime}
                          duration={videoState.duration}
                          onSeek={setSeekTo}
                          categoryName={apiMapping[category.id]}
                        />
                      </div>
                    )}
                  </div>
                </section>

                {/* Step 2 — Practice + AI Feedback */}
                {category.apiImages && category.apiImages.length > 0 && (
                  <section id={sectionIds.practice} className="scroll-mt-36">
                    <StepLabel index={2} label="Practice Inspection with AI" done={stepsCompleted.practice} active={activeStep === "practice"} />
                    <div className="my-6">
                      <ImageBatchViewer images={category.apiImages} onComplete={handlePracticeComplete} />
                    </div>
                  </section>
                )}
              </>
            ) : (
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 flex flex-col items-center justify-center gap-4">
                <Lock className="w-12 h-12 text-white/40" />
                <p className="text-white/60 font-medium">Video coming soon — sign in to unlock</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-20">
        <CTABanner />
      </div>
      
      <AuthModal open={signUpModal} onClose={() => { setSignUpModal(false); setActiveCategory("exterior"); }} defaultTab="signup" />
    </div>
  );
}

function FranchiseCTASection({ onComplete }: { onComplete: () => void }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-4 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
      >
        {/* Hero banner */}
        <div className="relative h-52 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=1200"
            alt="Franchise Owner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#005981dd,#004a6ecc)" }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
            <Store className="w-10 h-10 mb-3 opacity-90" />
            <h3 className="text-2xl font-extrabold mb-1">Ready to Own a Business?</h3>
            <p className="text-white/80 text-sm max-w-md">
              You've built the skills. Now turn them into a thriving WIN Home Inspection franchise.
            </p>
          </div>
        </div>

        {/* Divider label */}
        <div className="px-6 pt-6 pb-2">
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Take the next step
          </p>
        </div>

        {/* Two CTA cards — same pattern as AIFeedbackPanel */}
        <div className="grid sm:grid-cols-2 gap-4 px-6 pb-6">
          {/* Explore WIN Franchise */}
          <motion.div whileHover={{ y: -3 }}>
            <Link
              to="/franchise"
              onClick={onComplete}
              className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm group block h-full"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(135deg,#005981,#0080b8)" }} />
              <div className="relative p-5 flex flex-col h-full">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:bg-white/20" style={{ backgroundColor: "#e6f2f7" }}>
                  <Store className="w-5 h-5 transition-colors group-hover:text-white" style={{ color: "#005981" }} />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1 group-hover:text-white transition-colors">Explore WIN Franchise</h4>
                <p className="text-sm text-slate-500 group-hover:text-white/80 transition-colors flex-1">
                  Discover the #1 ranked home inspection franchise model, support system, and earning potential.
                </p>
                <div className="mt-4 flex items-center text-sm font-semibold transition-colors group-hover:text-white" style={{ color: "#005981" }}>
                  Learn More <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Book a Free Consultation */}
          <motion.div
            whileHover={{ y: -3 }}
            className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer group"
            onClick={() => setModalOpen(true)}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(135deg,#1a1a2e,#005981)" }} />
            <div className="relative p-5 flex flex-col h-full">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-slate-100 group-hover:bg-white/20 transition-colors">
                <CalendarCheck className="w-5 h-5 text-slate-700 group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1 group-hover:text-white transition-colors">Book a Free Consultation</h4>
              <p className="text-sm text-slate-500 group-hover:text-white/80 transition-colors flex-1">
                Speak with a WIN franchise expert to get personalised guidance on starting your own business.
              </p>
              <div className="mt-4 flex items-center text-sm font-semibold text-slate-700 group-hover:text-white transition-colors">
                Schedule Now <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

function StepLabel({ index, label, done, active }: { index: number; label: string; done: boolean; active: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300"
        style={{
          backgroundColor: done ? "#005981" : active ? "#e6f2f7" : "#f1f5f9",
          color: done ? "white" : active ? "#005981" : "#94a3b8",
        }}
      >
        {done ? <Check className="w-4 h-4" strokeWidth={3} /> : index}
      </div>
      <h2 className={`text-xl font-bold transition-colors ${done ? "text-[#005981]" : active ? "text-slate-900" : "text-slate-400"}`}>
        {label}
      </h2>
      {done && (
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: "#e6f2f7", color: "#005981" }}>
          Completed
        </span>
      )}
    </div>
  );
}
