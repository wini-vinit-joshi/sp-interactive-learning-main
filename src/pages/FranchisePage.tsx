import { ArrowRight, BarChart3, Users, BookOpen, ShieldCheck } from "lucide-react";
import { useState } from "react";
import ConsultationModal from "@/components/ConsultationModal";

export default function FranchisePage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
    <div className="bg-white">
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "#003d5c" }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=2000"
            alt="Business Owner"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #003d5cee, #003d5c99, transparent)" }} />
        </div>
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <span className="font-bold tracking-wider uppercase text-sm mb-4 block" style={{ color: "#7ecfef" }}>Own Your Future</span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                Start Your Own Home Inspection Business
              </h1>
              <p className="text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
                Leverage your knowledge. Partner with the #1 ranked home inspection franchise.
                We provide the training, marketing, and technology to help you build a lucrative business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://winfranchising.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#005981] shadow transition-colors hover:bg-white/90"
                >
                  Visit Official Franchise Page <ArrowRight className="ml-2 w-4 h-4" />
                </a>
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-white border border-white/40 transition-colors hover:bg-white/10"
                >
                  Book a Call
                </button>
              </div>
            </div>
            <div className="w-full lg:w-[380px] shrink-0 hidden lg:block" />
          </div>
        </div>
      </section>

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
              { icon: ShieldCheck, title: "Market Demand", text: "Every home purchase needs an inspection. Provide a crucial service in a booming market." },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: "#e6f2f7", color: "#005981" }}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row relative" style={{ backgroundColor: "#005981" }}>
            <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center text-white relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Build a Business, Build a Life.</h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Take control of your schedule, grow your wealth, and become a trusted advisor in your community.
                With WIN, you&apos;re in business for yourself, but never by yourself.
              </p>
              <a
                href="https://winfranchising.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-max h-12 items-center justify-center rounded-full bg-white px-8 font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105"
                style={{ color: "#005981" }}
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

      {/* ── Why Partner ── */}
      <section className="py-24" style={{ backgroundColor: "#f5f0eb" }}>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">

            {/* Left: title + checklist */}
            <div className="flex-1 min-w-0">
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight mb-10">
                Why Should You Partner with the{" "}
                <span style={{ color: "#005981" }}>Best Home Inspection Franchise?</span>
              </h2>
              <ul className="space-y-8">
                {[
                  { title: "Explosive Growth with 35+ Essential Services", desc: "You scale, you profit, you WIN with a diversified business year-round." },
                  { title: "High Profitability with Minimal Overhead", desc: "No storefront. No inventory. More money stays with you." },
                  { title: "Increased Earnings with Proprietary Technology", desc: "AI-driven automation. More revenue per client. More repeat business." },
                  { title: "Brand Recognition with the #1 Ranked Franchise", desc: "Trusted nationwide. Built-in respect and authority from day one." },
                  { title: "Lowest Franchise Fee with No Hidden Costs", desc: "One-of-a-kind, all-inclusive system. Unlimited training, marketing, and tech usage." },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="mt-1 shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center" style={{ borderColor: "#005981" }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#005981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 mb-1">{item.title}</p>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: staggered photo grid */}
            <div className="w-full lg:w-[420px] shrink-0 hidden lg:grid grid-cols-2 gap-4 items-start">
              <div className="rounded-2xl overflow-hidden shadow-lg col-span-2 h-64">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Inspector on rooftop" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg h-44">
                <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80" alt="Training session" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg h-44 mt-6">
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" alt="Electrical inspection" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Revenue Stat + Copy ── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-3xl overflow-hidden shadow-xl border border-slate-200">

            {/* Left stat card */}
            <div className="flex flex-col items-center justify-center text-center px-12 py-16 bg-white border-b md:border-b-0 md:border-r border-slate-200 md:w-80 lg:w-96 shrink-0" style={{ borderColor: "#005981", borderWidth: 2, borderRadius: "1.5rem 0 0 1.5rem" }}>
              {/* Icon */}
              <div className="mb-6">
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="36" cy="24" r="16" stroke="#005981" strokeWidth="2.5" fill="none" />
                  <text x="36" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#005981">$</text>
                  <path d="M12 52 Q20 44 36 46 Q52 48 60 52" stroke="#005981" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M8 56 Q18 50 36 52 Q54 54 64 56" stroke="#005981" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
                </svg>
              </div>
              <p className="text-6xl font-extrabold mb-1" style={{ color: "#005981" }}>$244,682<sup className="text-2xl align-super">†</sup></p>
              <p className="text-lg font-bold text-slate-900 mt-3 mb-2">Average Gross Revenue</p>
              <p className="text-slate-500 text-sm leading-relaxed">5x higher than the average earnings of home inspectors in the US</p>
            </div>

            {/* Right copy */}
            <div className="flex flex-col justify-center px-10 lg:px-16 py-16 bg-slate-100 flex-1">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                Low-Cost Franchise Opportunity<br />in a Multi-Billion Dollar Industry
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                WIN Home Inspection is the lowest-cost franchise in the home inspection industry. What makes a WIN franchise a high-margin opportunity is an industry with minimal overheads (no storefront, no inventory, no upfront staff) combined with a unique, all-inclusive support model that eliminates hidden costs for you as a business owner.
              </p>
              <p className="text-slate-600 leading-relaxed">
                WIN is the only franchise in the U.S. offering in-house, end-to-end marketing support, comprehensive training and certification for 35+ services, and the most innovative, proprietary technology to help you build a highly profitable business and create memorable experiences for your clients and REALTORS®. It's this unique blend that enables WIN franchise owners to achieve remarkable success and profitability year-round.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
    <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

