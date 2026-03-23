import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, PlayCircle, Lock } from "lucide-react";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";

export default function Home() {
  const [signUpModal, setSignUpModal] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Hero: Full-screen video ── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d32ittej1rr3zr.cloudfront.net/WIN_Hero_Video_b08c95bdc9_a7a4490e28.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#005981]/70" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Learn Home Inspection.<br className="hidden md:block" />
            <span className="text-[#D4A656]">Practice with AI.</span> Own Your Future.
          </h1>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Master the skills of home inspection through interactive, AI-driven training.
            No Prior Experience Needed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/learn"
              className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-lg font-semibold text-[#005981] shadow-lg transition-all hover:bg-white/90 hover:scale-105"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Your Path to Success</h2>
            <p className="mt-4 text-lg text-slate-600">A proven step-by-step process to build your business.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mx-auto">
            {[
              { title: "Learn via Videos", desc: "Expert-led training modules on all core inspection categories.", icon: PlayCircle },
              { title: "Practice with AI", desc: "Use our interactive Image Batch Viewer to spot defects.", icon: CheckCircle2 },
              { title: "Start Your Franchise", desc: "Turn your skills into a lucrative WIN Home Inspection business.", icon: ArrowRight },
            ].map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl transition-all hover:shadow-xl hover:-translate-y-1 border border-slate-100">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 relative z-10" style={{ backgroundColor: "#e6f2f7", color: "#005981" }}>
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Step {i + 1}: {step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-slate-300 z-10 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Training Categories ── */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Training Categories</h2>
              <p className="mt-4 text-lg text-slate-600">Start with the basics, unlock the rest.</p>
            </div>
            <Link to="/learn" className="font-semibold flex items-center mt-6 md:mt-0 transition-colors hover:opacity-80" style={{ color: "#005981" }}>
              View All Modules <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Unlocked — Exterior */}
            <Link to="/learn" className="group block bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 transition-all hover:shadow-xl">
              <div className="h-48 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #005981, #0080b8)" }}>
               <img src="assets/images/Exterior.png" alt="Exterior" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">Exterior</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full">Unlocked</span>
                </div>
                <p className="text-slate-600">Learn to identify issues with siding, grading, roofs, and exterior structures.</p>
              </div>
            </Link>

            {/* Locked — Electrical */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer group" onClick={() => setSignUpModal(true)}>
              <div className="h-48 bg-slate-200 flex items-center justify-center">
                <img src="assets/images/Electrical.png" alt="Electrical" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 opacity-60 mb-4">Electrical</h3>
                <p className="text-slate-500 opacity-60">Master the detection of faulty wiring, panel issues, and safety hazards.</p>
              </div>
              <div className="absolute inset-0 bg-white/50 flex flex-col items-center justify-center backdrop-blur-[2px]">
                <Lock className="w-10 h-10 text-slate-600 mb-3" />
                <span className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">Sign in to unlock</span>
              </div>
            </div>

            {/* Locked — Plumbing */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer group" onClick={() => setSignUpModal(true)}>
              <div className="h-48 bg-slate-200 flex items-center justify-center">
                <img src="assets/images/Plumbing.png" alt="Plumbing" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 opacity-60 mb-4">Plumbing</h3>
                <p className="text-slate-500 opacity-60">Identify pipe leaks, water heater defects, and drainage problems.</p>
              </div>
              <div className="absolute inset-0 bg-white/50 flex flex-col items-center justify-center backdrop-blur-[2px]">
                <Lock className="w-10 h-10 text-slate-600 mb-3" />
                <span className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">Sign in to unlock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* ── CTA Banner ── */}
      <section className="py-24 relative overflow-hidden bg-[#FBF4E9]">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl font-extrabold text-[#005981] mb-6">Turn your skills into a business</h2>
          <p className="text-xl text-[#005981] mb-10 max-w-2xl mx-auto">
            Ready to take the next step? Join the fastest-growing home inspection franchise network in the country.
          </p>
          <a
            href="https://winfranchising.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 text-xl font-bold shadow-xl transition-all hover:scale-105"
            style={{ color: "#005981" }}
          >
            Visit Official Franchise Site <ArrowRight className="ml-3 w-6 h-6" />
          </a>
        </div>
      </section>


      <AuthModal open={signUpModal} onClose={() => setSignUpModal(false)} defaultTab="signin" />

    </div>
  );
}
