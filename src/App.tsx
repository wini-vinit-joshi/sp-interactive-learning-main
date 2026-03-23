import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import LearnPage from "@/pages/LearnPage";
import FranchisePage from "@/pages/FranchisePage";
import ArticlesPage from "@/pages/ArticlesPage";
import ArticleDetail from "@/pages/ArticleDetail";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function ElevenLabsWidget() {
  useEffect(() => {
    const el = document.createElement("elevenlabs-convai");
    el.setAttribute("agent-id", "agent_0601kmd4yhq6ennr2aaeqedyvk32");
    document.body.appendChild(el);
    return () => { document.body.removeChild(el); };
  }, []);
  return null;
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
