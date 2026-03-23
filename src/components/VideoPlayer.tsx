import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, ChevronDown, ChevronUp } from "lucide-react";
import { API_BASE_URL } from "@/config";

export interface Chapter {
  title: string;
  time: number;
}

interface Props {
  src: string;
  chapters: Chapter[];
  onProgress?: (currentTime: number, duration: number, activeChapter: number) => void;
  seekTo?: number | null;
  onSeeked?: () => void;
  categoryName?: string;
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function VideoPlayer({ src, chapters, onProgress, seekTo, onSeeked, categoryName }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState(0);
  const [hoverTime, setHoverTime] = useState(0);

  // Handle external seek requests from chapter panel
  useEffect(() => {
    const v = videoRef.current;
    if (seekTo == null || !v) return;
    v.currentTime = seekTo;
    v.play();
    onSeeked?.();
  }, [seekTo]);

  useEffect(() => {
    let idx = 0;
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (currentTime >= chapters[i].time) { idx = i; break; }
    }
    setActiveChapter(idx);
    onProgress?.(currentTime, duration, idx);
  }, [currentTime, duration, chapters]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    playing ? v.pause() : v.play();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  const seekToChapter = (time: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = time;
    v.play();
  };

  const skipToNext = () => {
    const next = chapters[activeChapter + 1];
    if (next) seekToChapter(next.time);
  };

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    const v = videoRef.current;
    if (!bar || !v || !duration) return;
    const rect = bar.getBoundingClientRect();
    v.currentTime = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * duration;
  }, [duration]);

  const handleProgressHover = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    if (!bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverX(pct * 100);
    setHoverTime(pct * duration);
  }, [duration]);

  const fullscreen = () => {
    const v = videoRef.current;
    if (v?.requestFullscreen) v.requestFullscreen();
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-black w-full h-full flex flex-col min-h-[300px] xl:min-h-0">
      <div className="relative group flex-1 min-h-0">
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-contain"
          style={{ minHeight: 0 }}
          preload="metadata"
          onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onClick={togglePlay}
        />

        {/* Active chapter badge */}
        {chapters.length > 0 && (
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full pointer-events-none">
            {chapters[activeChapter]?.title}
          </div>
        )}

        {/* Controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 pb-3 pt-10">
          {/* Progress bar */}
          <div
            ref={progressRef}
            className="relative h-1.5 bg-white/30 rounded-full cursor-pointer mb-3 hover:h-2.5 transition-all group/bar"
            onClick={handleProgressClick}
            onMouseMove={handleProgressHover}
            onMouseLeave={() => setHoveredChapter(null)}
          >
            <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: "#005981" }} />

            {duration > 0 && chapters.map((ch, i) => {
              if (i === 0) return null;
              const pct = (ch.time / duration) * 100;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 bg-white/70 rounded-full cursor-pointer z-10"
                  style={{ left: `${pct}%` }}
                  onMouseEnter={() => setHoveredChapter(i)}
                  onMouseLeave={() => setHoveredChapter(null)}
                  onClick={(e) => { e.stopPropagation(); seekToChapter(ch.time); }}
                />
              );
            })}

            {/* Hover time tooltip */}
            <div
              className="absolute -top-8 -translate-x-1/2 bg-black text-white text-xs px-2 py-0.5 rounded pointer-events-none whitespace-nowrap opacity-0 group-hover/bar:opacity-100 transition-opacity"
              style={{ left: `${hoverX}%` }}
            >
              {formatTime(hoverTime)}
            </div>

            {hoveredChapter !== null && duration > 0 && (
              <div
                className="absolute -top-8 -translate-x-1/2 bg-[#005981] text-white text-xs px-2 py-0.5 rounded pointer-events-none whitespace-nowrap z-20"
                style={{ left: `${(chapters[hoveredChapter].time / duration) * 100}%` }}
              >
                {chapters[hoveredChapter].title}
              </div>
            )}
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <button onClick={togglePlay} className="hover:text-[#4db8e8] transition-colors">
                {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button onClick={skipToNext} disabled={activeChapter >= chapters.length - 1} className="hover:text-[#4db8e8] transition-colors disabled:opacity-30" title="Next chapter">
                <SkipForward className="w-4 h-4" />
              </button>
              <button onClick={toggleMute} className="hover:text-[#4db8e8] transition-colors">
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="text-xs text-white/70 tabular-nums">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
            <button onClick={fullscreen} className="hover:text-[#4db8e8] transition-colors">
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Separate exportable chapter panel to render on the right
export function ChapterPanel({
  chapters,
  activeChapter,
  currentTime,
  duration,
  onSeek,
  categoryName,
}: {
  chapters: Chapter[];
  activeChapter: number;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  categoryName?: string;
}) {
  if (!chapters.length) return null;

  const [chatMessages, setChatMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi! Ask me anything about this inspection module." },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isChaptersExpanded, setIsChaptersExpanded] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chatScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chatMessages, isTyping]);

  const sendMessage = async () => {
    const text = chatInput.trim();
    if (!text || isTyping) return;
    
    setChatMessages((prev) => [...prev, { role: "user", text }]);
    setChatInput("");
    setIsTyping(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/ai-mentor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: "123",
          user_message: text,
          category_name: categoryName || "Exterior"
        })
      });
      const data = await res.json();
      
      if (data.success && data.data?.reply) {
        setChatMessages((prev) => [...prev, { role: "ai", text: data.data.reply }]);
      } else if (data.reply) {
        setChatMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
      } else {
        setChatMessages((prev) => [...prev, { role: "ai", text: "Sorry, I couldn't get a response right now." }]);
      }
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [...prev, { role: "ai", text: "Something went wrong. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

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
         elements.push(<ul key={'ul-'+i} className="list-disc list-outside ml-4 mb-2 space-y-0.5">{listItems}</ul>);
         listItems = [];
         inList = false;
      }
      if (line.trim() === '') continue;

      let parsedLine = line.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
      parsedLine = parsedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      if (line.startsWith('### ')) {
         elements.push(<h3 key={i} className="text-[13px] font-bold text-[#005981] mt-3 mb-1" dangerouslySetInnerHTML={{__html: parsedLine.substring(4)}} />);
      } else if (line.startsWith('#### ')) {
         elements.push(<h4 key={i} className="text-[12px] font-bold text-slate-800 mt-2 mb-1" dangerouslySetInnerHTML={{__html: parsedLine.substring(5)}} />);
      } else {
         elements.push(<p key={i} className="mb-1.5" dangerouslySetInnerHTML={{__html: parsedLine}} />);
      }
    }
    if (inList) {
       elements.push(<ul key={'ul-end'} className="list-disc list-outside ml-4 mb-2 space-y-0.5">{listItems}</ul>);
    }
    return <div className="space-y-0.5">{elements}</div>;
  }

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm h-full max-h-[500px] xl:max-h-none flex flex-col">
      {/* Chapter header */}
      <button 
        onClick={() => setIsChaptersExpanded(!isChaptersExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between transition-colors hover:opacity-90 z-10" 
        style={{ background: "linear-gradient(135deg,#005981,#0080b8)" }}
      >
        <div className="text-left">
          <p className="text-xs font-bold text-white uppercase tracking-wider">Chapters</p>
          <p className="text-xs text-white/60 mt-0.5">{chapters.length} sections</p>
        </div>
        {isChaptersExpanded ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-white" />}
      </button>

      {/* Chapter list */}
      <div 
        className={`overflow-y-auto transition-all duration-300 ${isChaptersExpanded ? 'max-h-[250px] border-b border-slate-100' : 'max-h-0'}`}
        onMouseLeave={() => setIsChaptersExpanded(false)}
      >
        {chapters.map((ch, i) => {
          const isActive = i === activeChapter;
          const isDone = duration > 0 && currentTime > (chapters[i + 1]?.time ?? duration);
          const chapterStart = ch.time;
          const chapterEnd = chapters[i + 1]?.time ?? duration;
          const chapterPct = duration > 0 && isActive
            ? Math.min(100, Math.max(0, ((currentTime - chapterStart) / (chapterEnd - chapterStart)) * 100))
            : 0;

          return (
            <button
              key={i}
              onClick={() => onSeek(ch.time)}
              className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-all border-l-2 ${
                isActive ? "bg-[#e6f2f7] border-[#005981]" : "border-transparent hover:bg-slate-50"
              }`}
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{
                  backgroundColor: isActive ? "#005981" : isDone ? "#005981" : "#f1f5f9",
                  color: isActive || isDone ? "white" : "#94a3b8",
                }}
              >
                {isDone && !isActive ? "✓" : i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`text-sm font-medium truncate ${
                    isActive ? "text-[#005981] font-semibold" : isDone ? "text-slate-500" : "text-slate-700"
                  }`}>
                    {ch.title}
                  </span>
                  <span className="text-xs text-slate-400 shrink-0">{formatTime(ch.time)}</span>
                </div>
                {isActive && duration > 0 && (
                  <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${chapterPct}%`, backgroundColor: "#005981" }} />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* AI Chatbox */}
      <div className="flex-1 flex flex-col min-h-0 bg-white relative z-0">
        <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-2" style={{ backgroundColor: "#f8fafc" }}>
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <p className="text-xs font-bold text-slate-700">AI Mentor</p>
        </div>

        {/* Messages */}
        <div ref={chatScrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "text-white rounded-br-sm inline-block"
                    : "bg-slate-100 text-slate-700 rounded-bl-sm"
                }`}
                style={msg.role === "user" ? { backgroundColor: "#005981" } : {}}
              >
                {msg.role === "ai" ? parseMarkdown(msg.text) : msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-700 px-4 py-2.5 rounded-2xl rounded-bl-sm text-xs flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-3 pb-3 pt-2 border-t border-slate-100 flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about this module..."
            className="flex-1 text-xs rounded-full border border-slate-200 px-3 py-2 focus:outline-none focus:border-[#005981] transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={!chatInput.trim() || isTyping}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white disabled:opacity-40 transition-colors shrink-0"
            style={{ backgroundColor: "#005981" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
