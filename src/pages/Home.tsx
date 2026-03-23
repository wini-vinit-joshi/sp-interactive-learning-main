import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, PlayCircle, Lock } from "lucide-react";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";
import CTABanner from "@/components/CTABanner";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const [signUpModal, setSignUpModal] = useState(false);
  const { user } = useAuth();
  return (
    <div className="flex flex-col min-h-screen" style={{ fontFamily: 'Axiforma, Arial, sans-serif' }}>

      {/* ── Hero: Full-screen video ── */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
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
        <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          {/* Badge row */}
          <div className="flex items-center gap-5 mb-8">
            <img
              src="assets/images/1-Ranked-Badge.png"
              alt="Entrepreneur Franchise 500 #1 Ranked"
              className="h-28 w-auto drop-shadow-2xl"
            />
            {/* <div className="rounded-xl border border-[#D4A656]/40 bg-[#003d5c]/70 backdrop-blur-sm px-6 py-4">
              <p className="text-[#D4A656] text-xs font-bold uppercase tracking-widest mb-1">Entrepreneur Franchise 500</p>
              <p className="text-white text-xl font-extrabold leading-snug">Ranked #1 for<br />4 Years in a Row</p>
            </div> */}
          </div>

          <h1 className="text-5xl md:text-[50px] font-bold text-white tracking-tight mb-6 leading-[1.4em]">
            Learn Home Inspection. <br className="hidden md:block" />
            <span className="text-[#D4A656]">Practice with AI.</span> Own Your Future.
          </h1>
          <p className="text-xl text-white/80 mb-10 max-w-5xl">
            Master the skills of home inspection through interactive, AI-driven training.
             <br className="hidden md:block" />
            No Prior Experience Needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/learn"
              className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#005981] shadow transition-colors hover:bg-white/90"
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
                <p className="text-slate-600 text-base">{step.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-slate-300 z-10 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Veteran Friendly ── */}
      <section className="py-20 overflow-hidden relative" style={{ backgroundColor: '#f0f4f8' }}>
        {/* Faded stars background */}
        {/* <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon points='60,5 72,40 110,40 80,62 92,97 60,75 28,97 40,62 10,40 48,40' fill='%23003366'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }} /> */}
        {/* Red stripe accent */}
        {/* <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.04]" style={{
          background: 'linear-gradient(135deg, #cc0000 25%, transparent 25%, transparent 50%, #cc0000 50%, #cc0000 75%, transparent 75%)',
          backgroundSize: '40px 40px',
        }} /> */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                We are Proud to be a<br />Veteran Friendly Franchise
              </h2>
              <p className="text-slate-600 text-base leading-relaxed max-w-lg">
                Our veteran benefits include a{" "}
                <strong style={{ color: "#005981" }}>5% discount on the initial franchise fee</strong>{" "}
                as well as special financing for qualified candidates. By affiliating with organizations, we continue to help veterans explore opportunities they wouldn't ordinarily consider possible.
              </p>
            </div>
            <div className="w-full md:w-[480px] shrink-0">
              <img
                src="/assets/images/Veteran.jpg"
                alt="Veteran Friendly Franchise Event"
                className="w-full h-[320px] object-cover rounded-2xl shadow-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80";
                }}
              />
            </div>
          </div>
        </div>
      </section>
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
                <img src="assets/images/Exterior.png" alt="Exterior" className="object-contain" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">Exterior</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full">Unlocked</span>
                </div>
                <p className="text-slate-600 text-base">Learn to identify issues with siding, grading, roofs, and exterior structures.</p>
              </div>
            </Link>

            {/* Locked — Electrical */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer group transition-all hover:shadow-xl" onClick={() => !user && setSignUpModal(true)}>
              <div className="h-48 bg-slate-200 flex items-center justify-center overflow-hidden">
                <img src="assets/images/Electrical.png" alt="Electrical" className="object-contain" />
              </div>
              <div className="p-8">
                <h3 className={`text-2xl font-bold text-slate-900 mb-4 ${!user ? "opacity-60" : ""}`}>Electrical</h3>
                <p className={`text-slate-500 text-base ${!user ? "opacity-60" : ""}`}>Master the detection of faulty wiring, panel issues, and safety hazards.</p>
              </div>
              {!user && (
                <div className="absolute inset-0 bg-white/50 flex flex-col items-center justify-center backdrop-blur-[2px]">
                  <Lock className="w-10 h-10 text-slate-600 mb-3" />
                  <span className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">Sign in to unlock</span>
                </div>
              )}
            </div>

            {/* Locked — Plumbing */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer group transition-all hover:shadow-xl" onClick={() => !user && setSignUpModal(true)}>
              <div className="h-48 bg-slate-200 flex items-center justify-center overflow-hidden">
                <img src="assets/images/Plumbing.png" alt="Plumbing" className="object-cover" />
              </div>
              <div className="p-8">
                <h3 className={`text-2xl font-bold text-slate-900 mb-4 ${!user ? "opacity-60" : ""}`}>Plumbing</h3>
                <p className={`text-slate-500 text-base ${!user ? "opacity-60" : ""}`}>Identify pipe leaks, water heater defects, and drainage problems.</p>
              </div>
              {!user && (
                <div className="absolute inset-0 bg-white/50 flex flex-col items-center justify-center backdrop-blur-[2px]">
                  <Lock className="w-10 h-10 text-slate-600 mb-3" />
                  <span className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">Sign in to unlock</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

<CTABanner />


      <AuthModal open={signUpModal} onClose={() => setSignUpModal(false)} defaultTab="signin" />

    </div>
  );
}
