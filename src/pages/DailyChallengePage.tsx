import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DailyChallengeViewer, { CategoryImage } from "@/components/DailyChallengeViewer";
import CTABanner from "@/components/CTABanner";
import { CalendarCheck, Users, Flame, Check, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "@/config";

const TOP_SUBMISSIONS = [
  { name: "Lisa P.", score: 90 },
  { name: "David L.", score: 90 },
  { name: "James C.", score: 90 },
  { name: "Sarah M.", score: 85 },
  { name: "John D.", score: 85 },
  { name: "Mike T.", score: 80 },
  { name: "Emily R.", score: 91 },
  { name: "Jessica K.", score: 90 }
].slice(0, 5);

export default function DailyChallengePage() {
  const [loading, setLoading] = useState(true);
  const [challengeData, setChallengeData] = useState<any>(null);
  const [images, setImages] = useState<CategoryImage[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Fetch daily challenge
    const fetchChallenge = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/daily-challenges?challenge_id=challenge_1`);
        const data = await res.json();
        
        if (data.success && data.data) {
          setChallengeData(data.data);
          
          const mappedImages: CategoryImage[] = (data.data.images || []).map((url: string, index: number) => ({
            id: String(index + 1),
            problem_url: url,
            solution_url: url
          }));
          
          setImages(mappedImages);
        }
      } catch (err) {
        console.error("Failed to fetch daily challenge", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-16">
        <div className="w-8 h-8 border-4 border-[#005981]/30 border-t-[#005981] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6f2f7] text-[#005981] text-sm font-bold mb-3">
              <CalendarCheck className="w-4 h-4" />
              Daily Challenge
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
              Spot the Defects: {challengeData?.metadata?.category || 'General Inspection'}
            </h1>
            <p className="text-slate-500 text-lg">
              Test your skills with today's real-world inspection scenarios.
            </p>
          </div>
          
          {/* Static Stats */}
          <div className="flex gap-4 shrink-0">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 text-center min-w-[120px]">
              <div className="flex justify-center mb-1"><Flame className="w-6 h-6 text-orange-500" /></div>
              <div className="text-2xl font-black text-slate-900">5</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Day Streak</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 text-center min-w-[120px]">
              <div className="flex justify-center mb-1"><Users className="w-6 h-6" style={{ color: "#005981" }} /></div>
              <div className="text-2xl font-black text-slate-900">1,234</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Completed Today</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
          {/* Center Content */}
          <div className="lg:col-span-2 space-y-8 order-1">
            {!completed ? (
              <>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Today's Inspection: {challengeData?.metadata?.subcategory || 'Exterior'}</h2>
                  <p className="text-slate-600">
                    Review the {images.length} images below closely. Identify any defects, hazards, or notable issues and write your professional remark. The AI will evaluate your findings against an expert's solution.
                  </p>
                </div>
                
                {images.length > 0 ? (
                  <DailyChallengeViewer 
                    challengeId={challengeData?.challenge_id || "challenge_1"}
                    images={images} 
                    onComplete={() => setCompleted(true)} 
                  />
                ) : (
                  <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 text-center">
                    <p className="text-slate-500 font-medium">No challenge data available for today.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white p-10 py-16 rounded-2xl shadow-sm border border-slate-200 text-center animation-fade-in flex flex-col justify-center h-full">
                <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6" style={{ backgroundColor: "#e6f2f7" }}>
                  <Check className="w-10 h-10" style={{ color: "#005981" }} strokeWidth={3} />
                </div>
                <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Challenge Completed!</h2>
                <p className="text-slate-600 text-lg mb-8 max-w-lg mx-auto">
                  Great job keeping your inspection skills sharp. You've extended your streak to <span className="font-bold text-orange-500">6 days!</span> Come back tomorrow for a new scenario.
                </p>
                <div>
                  <Link to="/learn" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#005981] px-6 text-base font-semibold text-white hover:opacity-90 transition-opacity gap-2">
                     Continue Training <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Top Submissions */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col self-start lg:max-h-[800px] order-2">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold flex items-center gap-2 text-slate-800">
                <Users className="w-5 h-5" style={{ color: "#005981" }} />
                Today's Top Scores
              </h3>
            </div>
            <div className="overflow-y-auto p-0 flex-1 relative">
              <table className="w-full text-left text-sm">
                <thead className="bg-white sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  <tr>
                    <th className="py-3 px-4 font-semibold text-slate-500 whitespace-nowrap">Rank</th>
                    <th className="py-3 px-4 font-semibold text-slate-500">Inspector</th>
                    <th className="py-3 px-4 font-semibold text-slate-500 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {TOP_SUBMISSIONS.map((user, i) => (
                    <tr key={user.name + i} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-400">#{i + 1}</td>
                      <td className="py-3 px-4 font-semibold text-slate-700 whitespace-nowrap">{user.name}</td>
                      <td className="py-3 px-4 text-right font-bold" style={{ color: "#005981" }}>{user.score}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <CTABanner />
      </div>
    </div>
  );
}
