import Link from "next/link";
import { ArrowRight, CheckCircle2, PlayCircle, Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-24 pb-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">
              Learn Home Inspection.<br className="hidden md:block" />
              <span className="text-blue-600">Practice with AI.</span> Own Your Future.
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Master the skills of home inspection through interactive, AI-driven training.
              No Prior Experience Needed.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/learn"
                className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:scale-105"
              >
                Start Learning (Exterior)
              </Link>
              <Link
                href="/franchise"
                className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-full bg-white border-2 border-slate-200 px-8 py-3 text-lg font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-600 hover:text-blue-600"
              >
                Explore Franchise Opportunities
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100 rounded-full blur-[120px] opacity-60 pointer-events-none -z-10" />
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Your Path to Success</h2>
            <p className="mt-4 text-lg text-slate-600">A proven step-by-step process to build your business.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Learn via Videos", desc: "Expert-led training modules on all core inspection categories.", icon: PlayCircle },
              { title: "Practice with AI", desc: "Use our interactive Image Batch Viewer to spot defects.", icon: CheckCircle2 },
              { title: "Get Feedback", desc: "Receive immediate, accurate insights from our AI Trainer.", icon: CheckCircle2 },
              { title: "Start Your Franchise", desc: "Turn your skills into a lucrative WIN Home Inspection business.", icon: ArrowRight },
            ].map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Step {i + 1}: {step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
                
                {i !== 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-slate-300 transform -translate-y-1/2 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Category Preview */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Training Categories</h2>
              <p className="mt-4 text-lg text-slate-600">Start with the basics, unlock the rest.</p>
            </div>
            <Link href="/learn" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center mt-6 md:mt-0">
              View All Modules <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Unlocked */}
            <Link href="/learn" className="group block bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 transition-all hover:shadow-xl">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-4xl">🏡</span>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">Exterior</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full">Unlocked</span>
                </div>
                <p className="text-slate-600">Learn to identify issues with siding, grading, roofs, and exterior structures.</p>
              </div>
            </Link>

            {/* Locked 1 */}
            <div className="relative group block bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
              <div className="h-48 bg-slate-200 flex items-center justify-center filter grayscale blur-[2px]">
                <span className="text-4xl">⚡</span>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 opacity-60">Electrical</h3>
                </div>
                <p className="text-slate-500 opacity-60">Master the detection of faulty wiring, panel issues, and safety hazards.</p>
              </div>
              <div className="absolute inset-0 bg-white/40 flex flex-col items-center justify-center backdrop-blur-[2px]">
                <Lock className="w-10 h-10 text-slate-600 mb-3" />
                <span className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">Sign in to unlock</span>
              </div>
            </div>

            {/* Locked 2 */}
            <div className="relative group block bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
              <div className="h-48 bg-slate-200 flex items-center justify-center filter grayscale blur-[2px]">
                <span className="text-4xl">💧</span>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 opacity-60">Plumbing</h3>
                </div>
                <p className="text-slate-500 opacity-60">Identify pipe leaks, water heater defects, and drainage problems.</p>
              </div>
              <div className="absolute inset-0 bg-white/40 flex flex-col items-center justify-center backdrop-blur-[2px]">
                <Lock className="w-10 h-10 text-slate-600 mb-3" />
                <span className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">Sign in to unlock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">Turn your skills into a business</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Ready to take the next step? Join the fastest-growing home inspection franchise network in the country.
          </p>
          <a
            href="https://winfranchising.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 py-3 text-xl font-bold text-blue-600 shadow-xl transition-all hover:scale-105"
          >
            Visit Official Franchise Site <ArrowRight className="ml-3 w-6 h-6" />
          </a>
        </div>
      </section>
    </div>
  );
}
