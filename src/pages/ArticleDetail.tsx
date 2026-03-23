import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Share2 } from "lucide-react";

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const title = slug?.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[400px] w-full bg-slate-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1590483259966-1c88147d3c90?auto=format&fit=crop&q=80&w=2000"
            alt="Article header"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div className="container mx-auto max-w-3xl px-4 relative z-10 h-full flex flex-col justify-end pb-12">
          <Link to="/articles" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 font-medium text-sm transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
          </Link>
          <div className="flex items-center space-x-4 mb-4">
            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-wider">Exterior</span>
            <span className="flex items-center text-slate-300 text-sm"><Clock className="w-4 h-4 mr-1.5" /> 5 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            {title || "How to Spot Serious Foundation Cracks vs. Settling"}
          </h1>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-16">
        <div className="prose prose-lg prose-slate max-w-none">
          <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-blue-600 pl-4 font-medium italic">
            Foundation cracks are the single most feared defect for a home buyer. As an inspector, your job is to accurately contextualize these cracks so buyers can make informed decisions without unnecessary panic.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">1. Understanding the Physics of Settling</h2>
          <p className="mb-6 text-slate-700 leading-relaxed">
            Every home settles. The immense weight of building materials compressing the soil below ensures that microscopic to minor macroscopic shifts will occur within the first 2-5 years of a home's life.
            Settling cracks are typically vertical, hairline in width (less than 1/16th of an inch), and do not continuously widen over time.
          </p>

          <img
            src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200"
            alt="Foundation detail"
            className="rounded-2xl shadow-md my-10 w-full"
          />

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">2. Warning Signs of Structural Failure</h2>
          <p className="mb-6 text-slate-700 leading-relaxed">
            When does a crack move from "normal" to "critical"? Keep an eye out for these defining characteristics:
          </p>
          <ul className="list-disc pl-6 space-y-3 mb-10 text-slate-700">
            <li><strong>Horizontal Orientation:</strong> Cracks running parallel to the ground often indicate lateral earth pressure or hydrostatic pressure bowing the wall inward.</li>
            <li><strong>Stair-Step Cracking:</strong> Often found in block foundations, indicating uneven settling where one section of the footing has dropped lower than the rest.</li>
            <li><strong>V-Shape:</strong> Cracks that are wider at the top than the bottom indicate severe dropping of a foundation section.</li>
            <li><strong>Displacement:</strong> If the wall on one side of the crack is not flush with the other side, sheer forces are at play.</li>
          </ul>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-bold text-slate-900 flex items-center mb-4">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 text-sm">💡</span>
              Pro Tip from WIN Experts
            </h3>
            <p className="text-slate-700 text-sm">
              Always inspect the interior corresponding to an exterior crack. If the drywall inside shows diagonal cracking off the corners of windows or doors in that same area, the structure is actively shifting.
            </p>
          </div>

          <p className="mb-6 text-slate-700 leading-relaxed">
            Your ability to clearly document these differences and recommend structural engineers only when absolutely necessary is what will build trust with realtors and clients alike.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-6 sm:mb-0">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">W</div>
            <div>
              <p className="font-bold text-slate-900">WIN Training Dept.</p>
              <p className="text-sm text-slate-500">Published • Oct 2024</p>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 text-sm font-semibold transition-colors">
            <Share2 className="w-4 h-4 mr-2" /> Share Article
          </button>
        </div>
      </div>
    </div>
  );
}
