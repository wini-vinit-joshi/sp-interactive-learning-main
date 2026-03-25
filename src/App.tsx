import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import LearnPage from "@/pages/LearnPage";
import FranchisePage from "@/pages/FranchisePage";
import ArticlesPage from "@/pages/ArticlesPage";
import ArticleDetail from "@/pages/ArticleDetail";
import LicensePage from "@/pages/LicensePage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function ElevenLabsWidget() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const el = document.createElement("elevenlabs-convai");
    el.setAttribute("agent-id", "agent_0601kmd4yhq6ennr2aaeqedyvk32");
    el.id = "elevenlabs-widget";
    document.body.appendChild(el);
    return () => { document.body.removeChild(el); };
  }, []);

  useEffect(() => {
    const el = document.getElementById("elevenlabs-widget");
    if (el) el.style.display = collapsed ? "none" : "";
  }, [collapsed]);

  return (
    <>
      <style>{`
        @keyframes bar-bounce {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.35); }
        }
        @keyframes el-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.25), 0 4px 24px rgba(0,0,0,0.35); }
          50% { box-shadow: 0 0 0 8px rgba(255,255,255,0), 0 4px 24px rgba(0,0,0,0.35); }
        }
        .el-btn-pulse { animation: el-pulse 2.4s ease-in-out infinite; }
        .el-bar { transform-origin: center; animation: bar-bounce 1.1s ease-in-out infinite; }
        .el-bar-1 { animation-delay: 0s; }
        .el-bar-2 { animation-delay: 0.18s; }
        .el-bar-3 { animation-delay: 0.36s; }
        .el-bar-4 { animation-delay: 0.18s; }
        .el-bar-5 { animation-delay: 0s; }
      `}</style>
      <button
        onClick={() => setCollapsed(p => !p)}
        title={collapsed ? "Open AI Assistant" : "Close AI Assistant"}
        style={{ bottom: collapsed ? "24px" : "100px" }}
        className={`fixed right-6 z-[9999] w-11 h-11 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform${collapsed ? " el-btn-pulse" : " shadow-[0_4px_24px_rgba(0,0,0,0.35)]"}`}
      >
        {collapsed ? (
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className="el-bar el-bar-1" x="4" y="10" width="3" height="8" rx="1.5" fill="white"/>
            <rect className="el-bar el-bar-2" x="9" y="6" width="3" height="16" rx="1.5" fill="white"/>
            <rect className="el-bar el-bar-3" x="14" y="3" width="3" height="22" rx="1.5" fill="white"/>
            <rect className="el-bar el-bar-4" x="19" y="6" width="3" height="16" rx="1.5" fill="white"/>
            <rect className="el-bar el-bar-5" x="24" y="10" width="3" height="8" rx="1.5" fill="white"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 5L5 17M5 5l12 12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        )}
      </button>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-full flex flex-col bg-slate-50 relative">
        <ScrollToTop />
        <ElevenLabsWidget />
        <Navbar />
        <main className="flex-1 flex flex-col pt-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/license" element={<LicensePage />} />
            <Route path="/franchise" element={<FranchisePage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
