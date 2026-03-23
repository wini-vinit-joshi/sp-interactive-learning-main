import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

const ARTICLES = [
  {
    id: "spotting-foundation-cracks",
    title: "How to Spot Serious Foundation Cracks vs. Settling",
    category: "Exterior",
    readTime: "5 min read",
    image: "/assets/images/Exterior.png",
    description: "Not all foundation cracks are created equal. Learn to differentiate between normal superficial settling cracks and critical structural failures.",
  },
  {
    id: "roof-inspection-safety",
    title: "10 Safety Rules for Inspecting Roofs",
    category: "Roof",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80&w=800",
    description: "Walking a roof is the most dangerous part of a home inspection. Here is our definitive guide for staying safe while doing your job.",
  },
  {
    id: "electrical-panel-hazards",
    title: "Top 5 Lethal Electrical Panel Hazards",
    category: "Electrical",
    readTime: "6 min read",
    image: "/assets/images/Electrical.png",
    description: "Double taps, over-fusing, and Federal Pacific panels. Master the most dangerous electrical defects you'll encounter.",
  },
  {
    id: "why-become-inspector",
    title: "Why 2024 is the Year to Become a Home Inspector",
    category: "Business",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=800",
    description: "The demand for certified, professional home inspectors is rising. Explore the market dynamics driving this lucrative industry.",
  },
];

export default function ArticlesPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <section className="py-20 px-4" style={{ backgroundColor: "#005981" }}>
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Inspection Knowledge Hub</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Deepen your technical expertise and learn about the home inspection industry with articles curated by WIN experts.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Latest Articles</h2>
          <div className="flex space-x-2">
            <span className="px-4 py-1.5 text-white rounded-full text-sm font-semibold cursor-pointer" style={{ backgroundColor: "#005981" }}>All</span>
            <span className="px-4 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-full text-sm font-semibold cursor-pointer hover:border-[#005981]">Technical</span>
            <span className="px-4 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-full text-sm font-semibold cursor-pointer hover:border-[#005981]">Business</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <Link key={article.id} to={`/articles/${article.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all">
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider" style={{ color: "#005981" }}>
                  {article.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-slate-500 text-sm mb-3">
                  <Clock className="w-4 h-4 mr-1.5" />
                  {article.readTime}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 transition-colors line-clamp-2" style={{ color: undefined }}>
                  <span className="group-hover:text-[#005981] transition-colors">{article.title}</span>
                </h3>
                <p className="text-slate-600 text-sm line-clamp-3 mb-6">{article.description}</p>
                <div className="flex items-center font-semibold text-sm" style={{ color: "#005981" }}>
                  Read Article <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden" style={{ backgroundColor: "#003d5c" }}>
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(to right, #7ecfef, #005981, #7ecfef)" }} />
          <BookOpen className="w-12 h-12 mx-auto mb-6 opacity-80" style={{ color: "#7ecfef" }} />
          <h2 className="text-3xl font-bold mb-4">Want to learn more? Turn it into a career.</h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Reading articles is great, but getting hands-on training and building your own business is life-changing.
            Join WIN Home Inspection and start your journey today.
          </p>
          <Link
            to="/franchise"
            className="inline-flex h-12 items-center justify-center rounded-full px-8 font-bold transition-all hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: "#005981", color: "white" }}
          >
            Explore Franchising
          </Link>
        </div>
      </section>
    </div>
  );
}
