import { ArrowRight, BarChart3, Users, BookOpen, ShieldCheck } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { API_BASE_URL } from "@/config";

export default function FranchisePage() {
  return (
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
                  className="inline-flex h-14 items-center justify-center rounded-full px-8 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90 hover:scale-105"
                  style={{ backgroundColor: "#005981" }}
                >
                  Visit Official Franchise Page <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="https://winfranchising.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center justify-center rounded-full px-8 text-lg font-bold text-white border border-white/20 transition-all hover:bg-white/10"
                >
                  Book a Call
                </a>
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
      <FranchiseChatbot />
    </div>
  );
}

function parseMarkdown(text: string) {
  const lines = text.split('\n');
  const elements = [];
  let inList = false;
  let listItems = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('- ')) {
       let item = line.trim().substring(2);
       item = item.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
       item = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
       listItems.push(<li key={i} dangerouslySetInnerHTML={{__html: item}} />);
       inList = true;
       continue;
    } 
    if (inList) {
       elements.push(<ul key={'ul-'+i} className="list-disc list-outside ml-4 mb-2">{listItems}</ul>);
       listItems = [];
       inList = false;
    }
    if (line.trim() === '') continue;

    let parsedLine = line.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    parsedLine = parsedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    if (line.startsWith('### ')) {
       elements.push(<h3 key={i} className="text-[14px] font-bold text-[#005981] mt-3 mb-1" dangerouslySetInnerHTML={{__html: parsedLine.substring(4)}} />);
    } else if (line.startsWith('#### ')) {
       elements.push(<h4 key={i} className="text-[13px] font-bold text-slate-800 mt-2 mb-1" dangerouslySetInnerHTML={{__html: parsedLine.substring(5)}} />);
    } else {
       elements.push(<p key={i} className="mb-1.5" dangerouslySetInnerHTML={{__html: parsedLine}} />);
    }
  }
  if (inList) {
     elements.push(<ul key={'ul-end'} className="list-disc list-outside ml-4 mb-2">{listItems}</ul>);
  }
  return <div className="space-y-0.5">{elements}</div>;
}

function FranchiseChatbot() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTypingExample, setIsTypingExample] = useState(true);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const exampleQ = "What is the initial franchise fee?";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (!isTypingExample) {
        clearInterval(interval);
        return;
      }
      setInput(exampleQ.substring(0, i + 1));
      i++;
      if (i >= exampleQ.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [isTypingExample]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isAiTyping]);

  const send = async () => {
    const text = input.trim();
    if (!text || isAiTyping) return;
    setIsTypingExample(false);
    
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setIsAiTyping(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/franchise-consultant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: "fran123",
          user_message: text
        })
      });
      const data = await res.json();
      if (data.success && data.reply) {
        setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: "ai", text: "Sorry, I couldn't get a response right now." }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "ai", text: "Something went wrong. Please try again." }]);
    } finally {
      setIsAiTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[calc(100%-3rem)] max-w-[380px] flex flex-col justify-end gap-3 pointer-events-none">
      
      {/* Floating Bubbles */}
      {messages.length > 0 && (
        <div 
          ref={scrollRef} 
          className="flex flex-col gap-3 overflow-y-auto max-h-[500px] pointer-events-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] px-5 py-4 rounded-[24px] text-[15px] leading-relaxed shadow-[0_12px_40px_rgba(0,0,0,0.12)] ${
                  msg.role === "user"
                    ? "text-white rounded-br-sm inline-block font-medium"
                    : "bg-white text-slate-800 rounded-bl-sm border-2 border-slate-100/80"
                }`}
                style={msg.role === "user" ? { backgroundColor: "#005981", boxShadow: "0 12px 40px rgba(0,89,129,0.3)" } : {}}
              >
                {msg.role === "ai" ? parseMarkdown(msg.text) : msg.text}
              </div>
            </div>
          ))}
          {isAiTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-slate-700 px-6 py-4 rounded-[24px] rounded-bl-sm text-xs flex gap-1.5 items-center shadow-[0_12px_40px_rgba(0,0,0,0.12)] border-2 border-slate-100/80">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Input */}
      <div className="bg-white rounded-[32px] shadow-[0_12px_40px_rgba(0,89,129,0.25)] ring-4 ring-[#005981]/10 flex gap-3 p-2.5 items-center pointer-events-auto transition-transform hover:scale-[1.02]">
        <div className="relative w-11 h-11 rounded-full flex items-center justify-center shrink-0 ml-1 bg-gradient-to-br from-[#005981] to-[#0080b8] shadow-inner">
          <span className="text-[13px] font-extrabold tracking-wider text-white">AI</span>
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full shadow-sm animate-pulse"></span>
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsTypingExample(false);
          }}
          onFocus={() => {
            if (isTypingExample) setIsTypingExample(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask a franchise question..."
          className="flex-1 text-[15px] font-medium bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-400"
        />
        <button
          onClick={send}
          disabled={!input.trim() || isAiTyping}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white disabled:opacity-40 shrink-0 transition-all hover:opacity-90 active:scale-95 shadow-md mr-1"
          style={{ backgroundColor: "#005981" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5 mt-0.5">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
      
    </div>
  );
}
