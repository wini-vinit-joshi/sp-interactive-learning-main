import Link from "next/link";
import { ArrowRight, BarChart3, Users, BookOpen, ShieldCheck } from "lucide-react";

export default function FranchisePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-slate-900 py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=2000" 
            alt="Business Owner" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-4 block">Own Your Future</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Start Your Own Home Inspection Business
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              Leverage your knowledge. Partner with the #1 ranked home inspection franchise. 
              We provide the training, marketing, and technology to help you build a lucrative business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://winfranchising.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-full bg-blue-600 px-8 text-lg font-bold text-white shadow-lg transition-all hover:bg-blue-500 hover:scale-105"
              >
                Visit Official Franchise Page <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a 
                href="https://winfranchising.com/contact" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-full bg-white/10 px-8 text-lg font-bold text-white border border-white/20 transition-all hover:bg-white/20"
              >
                Book a Call
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose WIN */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose WIN Home Inspection?</h2>
            <p className="text-lg text-slate-600">A proven business model designed for your success, backed by decades of industry leadership.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BarChart3, title: "Proven Model", text: "Low overhead, high margins, and a resilient industry driven by real estate transactions." },
              { icon: BookOpen, title: "Training & Support", text: "Comprehensive in-house training plus an immersive AI platform dedicated to your mastery." },
              { icon: Users, title: "Marketing Power", text: "Cutting-edge digital marketing support and brand recognition to drive leads directly to you." },
              { icon: ShieldCheck, title: "Market Demand", text: "Every home purchase needs an inspection. Provide a crucial service in a booming market." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle block */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="bg-blue-600 rounded-3xl overflow-hidden flex flex-col md:flex-row relative">
            <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center text-white relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Build a Business, Build a Life.</h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Take control of your schedule, grow your wealth, and become a trusted advisor in your community. 
                With WIN, you&apos;re in business for yourself, but never by yourself.
              </p>
              <a 
                href="https://winfranchising.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-max h-12 items-center justify-center rounded-full bg-white px-8 text-blue-600 font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105"
              >
                Download Free Brochure
              </a>
            </div>
            <div className="md:w-1/2 min-h-[400px] relative">
              <img 
                src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=1000" 
                alt="Happy Business Owner" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
