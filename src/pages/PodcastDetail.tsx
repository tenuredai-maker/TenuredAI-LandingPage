import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  ArrowLeft,
  Calendar,
  Clock,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  ExternalLink,
  Linkedin,
  Twitter,
  Copy,
  QrCode,
  X,
  Check,
  Radio,
  FileText,
  User,
  CheckCircle,
  MessageSquare,
  Volume1,
  SkipForward,
  SkipBack,
  FileDown,
  Share2,
  ChevronDown,
  Scissors,
  Loader2,
  Heart,
  Zap,
  Activity
} from "lucide-react";
import { Episode, GuestInfo, TranscriptLine } from "../data/podcastEpisodes";
import { grantTenuredPoints } from "../lib/firebase";
import { fetchPodcasts, likePodcast, sharePodcast } from "../lib/podcastService";
import { BarChart, Bar, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts";

type TabType = "notes" | "transcript" | "guests";

export default function PodcastDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);

  useEffect(() => {
    const loadEpisodes = async () => {
      const data = await fetchPodcasts();
      setEpisodes(data);
      setLoadingEpisodes(false);
    };
    loadEpisodes();
  }, []);

  // Find the episode
  const episode = episodes.find((e) => e.id === id);

  // If episode isn't found, fallback to first episode, or show error
  const currentEpisode: Episode | null = episode || (episodes.length > 0 ? episodes[0] : null);

  // Scroll to top when loading or switching episodes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Compute 3 related episodes (prioritizing same category first, then backfilling with others)
  const relatedEpisodes = React.useMemo(() => {
    if (!currentEpisode) return [];
    const rawRelated = episodes.filter((e) => e.id !== currentEpisode.id);
    const sameCategory = rawRelated.filter((e) => e.category === currentEpisode.category);
    const otherCategories = rawRelated.filter((e) => e.category !== currentEpisode.category);
    return [...sameCategory, ...otherCategories].slice(0, 3);
  }, [currentEpisode, episodes]);

  // Tab State
  const [activeTab, setActiveTab] = useState<TabType>("notes");
  const [sentimentViewType, setSentimentViewType] = useState<"intensity" | "density">("intensity");

  // Local Dedicated Player State for pristine self-contained playback
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isShareClipMode, setIsShareClipMode] = useState(false);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const [transcriptSearchQuery, setTranscriptSearchQuery] = useState("");

  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speedMenuRef = useRef<HTMLDivElement>(null);
  const lastActiveLineIdxRef = useRef<number>(-1);
  const milestonesReachedRef = useRef<Set<number>>(new Set());

  // Parse duration text (e.g., "45 mins" -> 2700 seconds)
  const getDurationSeconds = (durationStr: string): number => {
    const mins = parseInt(durationStr.replace(" mins", "")) || 30;
    return mins * 60;
  };

  const totalSeconds = getDurationSeconds(currentEpisode.duration);

  // Audio Playback simulation hook
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1;
          
          // Points Logic: Grant 10 points every 10% milestone
          const milestone = Math.floor((next / totalSeconds) * 10);
          if (milestone > 0 && !milestonesReachedRef.current.has(milestone)) {
            milestonesReachedRef.current.add(milestone);
            grantTenuredPoints(10, `Listening Milestone ${milestone * 10}%: ${currentEpisode.title}`);
          }
          
          return next;
        });
      }, 1000 / playbackSpeed);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, totalSeconds, playbackSpeed, currentEpisode.id, currentEpisode.title]);

  // Initialize playhead from localStorage on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem("podcast_listening_progress");
      if (savedProgress) {
        const progressMap = JSON.parse(savedProgress);
        if (progressMap[currentEpisode.id]) {
          const savedTime = progressMap[currentEpisode.id].currentTime;
          // If they didn't finish completely, resume
          if (savedTime && savedTime < totalSeconds - 5) {
            setCurrentTime(savedTime);
          }
        }
      }
    } catch (e) {
      console.warn("Failed to retrieve podcast progress", e);
    }
  }, [currentEpisode.id, totalSeconds]);

  // Persist current segment position to localStorage
  useEffect(() => {
    try {
      if (currentEpisode) {
        const savedProgress = localStorage.getItem("podcast_listening_progress");
        const progressMap = savedProgress ? JSON.parse(savedProgress) : {};
        
        const percent = totalSeconds > 0 ? (currentTime / totalSeconds) * 100 : 0;
        
        // Prevent writing redundant progress if unchanged and 0 (e.g. initial mount)
        if (currentTime === 0 && (!progressMap[currentEpisode.id] || progressMap[currentEpisode.id].currentTime === 0)) {
          return;
        }

        progressMap[currentEpisode.id] = {
          currentTime,
          duration: totalSeconds,
          percent,
          lastUpdated: Date.now()
        };
        
        localStorage.setItem("podcast_listening_progress", JSON.stringify(progressMap));
        // Dispatch custom global event so other pages or tabs can sync immediately
        window.dispatchEvent(new Event("podcast_progress_updated"));
      }
    } catch (e) {
      console.warn("Failed to persist progress", e);
    }
  }, [currentTime, currentEpisode, totalSeconds]);

  // Check for deep-linked timestamp on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const timeParam = params.get("t");
    if (timeParam) {
      const seconds = parseInt(timeParam);
      if (!isNaN(seconds) && seconds >= 0 && seconds <= totalSeconds) {
        setCurrentTime(seconds);
        // Optional: Auto-play when deep linked
        setIsPlaying(true);
      }
    }
  }, [totalSeconds]);

  // Clean speech synthesis
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Audio Keyboard Navigation Shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isShareModalOpen || isSpeedMenuOpen) {
        if (event.key === "Escape") {
          setIsShareModalOpen(false);
          setIsSpeedMenuOpen(false);
        }
        return;
      }

      // Ignore key events if user is typing inside interactive elements (inputs, textareas, or contenteditables)
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          (activeEl as HTMLElement).isContentEditable)
      ) {
        return;
      }

      const key = event.key.toLowerCase();

      if (key === " " || event.code === "Space") {
        event.preventDefault(); // Guard against page jump/scrolling
        setIsPlaying((prev) => !prev);
      } else if (key === "s") {
        event.preventDefault();
        setPlaybackSpeed((prev) => {
          const speeds = [1, 1.25, 1.5, 2];
          const idx = (speeds.indexOf(prev) + 1) % speeds.length;
          return speeds[idx];
        });
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setCurrentTime((prev) => Math.max(0, prev - 15));
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setCurrentTime((prev) => Math.min(totalSeconds, prev + 15));
      } else if (key === "m") {
        event.preventDefault();
        setIsMuted((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [totalSeconds, isShareModalOpen, isSpeedMenuOpen]);

  // Click outside listener for speed selection menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(event.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatSecs = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Convert "MM:SS" back to seconds
  const parseTimestampToSeconds = (timestamp: string): number => {
    const parts = timestamp.split(":");
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    return 0;
  };

  // Skip absolute audio position
  const handleSkip = (seconds: number) => {
    setCurrentTime((prev) => {
      const next = prev + seconds;
      if (next < 0) return 0;
      if (next > totalSeconds) return totalSeconds;
      return next;
    });
  };

  // Jump directly from interactive transcript line
  const handleJumpToTime = (timestamp: string) => {
    const seconds = parseTimestampToSeconds(timestamp);
    setCurrentTime(seconds);
    setIsPlaying(true);
  };

  const handleTTSBriefing = () => {
    if (isSynthesizing) {
      window.speechSynthesis.cancel();
      setIsSynthesizing(false);
      return;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const textToRead = `Briefing from Beyond Tech Frontiers. ${currentEpisode.title}. ${currentEpisode.summary}. In this episode, Sabine discusses ${currentEpisode.extendedDescription}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.05 * playbackSpeed;
      utterance.volume = isMuted ? 0 : volume / 100;
      
      utterance.onend = () => setIsSynthesizing(false);
      utterance.onerror = () => setIsSynthesizing(false);

      speechUtteranceRef.current = utterance;
      setIsSynthesizing(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(async () => {
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
      try {
        if (currentEpisode) {
          await sharePodcast(currentEpisode.id);
          setEpisodes(prev => prev.map(p => 
            p.id === currentEpisode.id ? { ...p, shares: (p.shares || 0) + 1 } : p
          ));
        }
      } catch (err) {
        console.warn("Failed to update shares", err);
      }
    });
  };

  const trackShare = async () => {
    try {
      if (currentEpisode) {
        await sharePodcast(currentEpisode.id);
        setEpisodes(prev => prev.map(p => 
          p.id === currentEpisode.id ? { ...p, shares: (p.shares || 0) + 1 } : p
        ));
      }
    } catch (err) {
      console.warn("Failed to update shares", err);
    }
  };

  const handleShare = () => {
    setIsShareClipMode(false);
    setIsShareModalOpen(true);
  };

  const handleShareClip = () => {
    setIsShareClipMode(true);
    setIsShareModalOpen(true);
  };

  // Fallbacks if data doesn't exist to guarantee impeccable rendering
  const showNotesList = currentEpisode.fullShowNotes || [
    `Complete examination of ${currentEpisode.category} guidelines.`,
    `Analyzing current developments in technology scaling frameworks.`,
    "Strategic recommendation guidelines for investment committee review.",
    "Critical discussion of regulatory and execution parameters with key partners."
  ];

  const guestsList = currentEpisode.guests || [
    {
      name: "Sabine VanderLinden",
      role: "Venture Architect & CEO",
      company: "Alchemy Crew",
      bio: "Sabine is CEO of Alchemy Crew and co-developer of experimental innovation protocols. She spent over two decades implementing systemic risk technologies in London and Munich.",
      linkedinUrl: "https://linkedin.com/in/sabinevanderlinden"
    }
  ];

  const transcriptList = currentEpisode.transcript || [
    { speaker: "Sabine VanderLinden", time: "00:00", text: "Hello and welcome to Beyond Tech Frontiers. Let's delve into our core topic and focus on the strategic implications of these shifts." },
    { speaker: "Host Representative", time: "01:25", text: "Indeed, Sabine. When we map capital reserves against digital efficiency, carriers who wait to implement AI automation are placing themselves at a persistent structural disadvantage." },
    { speaker: "Sabine VanderLinden", time: "03:10", text: "Which is why we stress that testing integration frameworks in early sandbox staging is paramount. Waiting for unified standards to emerge is a critical failure pattern." }
  ];

  const handleExportBriefing = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  // Determine the active transcript line index matching current audio playhead
  const currentActiveLineIdx = transcriptList.findIndex((line, idx) => {
    const lineInSeconds = parseTimestampToSeconds(line.time);
    const nextLineInSeconds = idx < transcriptList.length - 1
      ? parseTimestampToSeconds(transcriptList[idx + 1].time)
      : Infinity;
    return currentTime >= lineInSeconds && currentTime < nextLineInSeconds;
  });

  // Auto-scroll active line into view inside active transcript view viewport
  useEffect(() => {
    if (
      activeTab === "transcript" &&
      isAutoScrollEnabled &&
      currentActiveLineIdx !== -1 &&
      currentActiveLineIdx !== lastActiveLineIdxRef.current
    ) {
      lastActiveLineIdxRef.current = currentActiveLineIdx;
      const activeElement = document.getElementById(`transcript-line-${currentActiveLineIdx}`);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [currentActiveLineIdx, activeTab, isAutoScrollEnabled]);

  // Component to highlight search matches in transcript text
  const TranscriptHighlighter = ({ text, query }: { text: string; query: string }) => {
    if (!query.trim()) return <>{text}</>;

    const parts = text.split(new RegExp(`(${query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")})`, "gi"));
    
    return (
      <>
        {parts.map((part, i) => (
          part.toLowerCase() === query.toLowerCase() ? (
            <mark 
              key={i} 
              className="bg-primary/25 text-primary font-bold rounded-sm px-0.5 border-b border-primary/40 selection:bg-primary selection:text-on-primary"
            >
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        ))}
      </>
    );
  };

  const progressPercent = (currentTime / totalSeconds) * 100 || 0;

  if (loadingEpisodes || !currentEpisode) {
    return (
      <div className="pt-32 pb-36 px-4 md:px-12 max-w-5xl mx-auto min-h-screen text-on-surface flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-36 px-4 md:px-12 max-w-5xl mx-auto min-h-screen text-on-surface">
      {/* Decorative backdrops */}
      <div className="absolute top-12 left-1/3 w-80 h-80 bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Back button link & Share actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <Link
          to="/podcasts"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-primary hover:text-primary-container uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Podcast Archive
        </Link>

        <div className="flex gap-2">
          <button
            onClick={async () => {
              if (!currentEpisode) return;
              try {
                await likePodcast(currentEpisode.id);
                setEpisodes(prev => prev.map(p => 
                  p.id === currentEpisode.id ? { ...p, likes: (p.likes || 0) + 1 } : p
                ));
              } catch (err) {
                console.warn("Failed to like", err);
              }
            }}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest transition-all px-4 py-1.5 rounded-full border border-outline-variant/30 text-on-surface-variant hover:text-red-500 hover:bg-red-500/10 cursor-pointer"
            title="Acknowledge Intel"
          >
            <Heart className="w-3.5 h-3.5" /> 
            {currentEpisode?.likes || 0}
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest transition-all px-4 py-1.5 rounded-full border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:bg-primary/5 cursor-pointer"
            title="Open custom share options for this episode"
          >
            <Share2 className="w-3.5 h-3.5" /> 
            {currentEpisode?.shares || 0} Shares
          </button>
        </div>
      </div>

      {/* Episode Header Card */}
      <header id="episode-detail-header" className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 py-1.5 px-4 bg-primary/10 text-primary font-mono text-[10px] uppercase font-bold tracking-widest border-l border-b border-outline-variant/20 rounded-bl-xl z-20">
          EPISODE {currentEpisode.episodeNumber}
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative z-10 mb-6">
          {/* Episode Cover Image */}
          <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 aspect-square rounded-2xl overflow-hidden border border-outline-variant/20 shadow-md bg-surface-container-high flex-shrink-0 relative group self-center md:self-start">
            <img
              src={currentEpisode.imageUrl || `https://picsum.photos/seed/${currentEpisode.id}/600/600`}
              alt={`${currentEpisode.title} Cover Art`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 pointer-events-none">
              <span className="text-[9px] font-mono text-white tracking-widest uppercase">HQ COVER DETECTED</span>
            </div>
          </div>

          {/* Episode Meta & Content */}
          <div className="flex-grow min-w-0">
            <div className="flex flex-wrap gap-2.5 items-center text-xs font-mono text-primary font-bold mb-4">
              <span className="uppercase tracking-wider px-2.5 py-0.5 bg-primary/10 rounded">
                {currentEpisode.category}
              </span>
              <span className="text-outline">•</span>
              <span className="flex items-center gap-1 text-on-surface-variant">
                <Calendar className="w-3.5 h-3.5 text-primary/70" /> {currentEpisode.date}
              </span>
              <span className="text-outline">•</span>
              <span className="flex items-center gap-1 text-on-surface-variant">
                <Clock className="w-3.5 h-3.5 text-primary/70" /> {currentEpisode.duration}
              </span>
            </div>

            <h1 id="episode-detail-title" className="font-headline text-2xl md:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight mb-4 leading-tight">
              {currentEpisode.title}
            </h1>

            <p id="episode-detail-summary" className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed mb-1">
              {currentEpisode.extendedDescription}
            </p>
          </div>
        </div>

        {/* Dynamic Premium Player interface inside the Detail Card */}
        <div id="episode-embedded-player" className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 md:p-6 mt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Play Button & Time stats */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                id="embedded-play-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 hover:bg-primary/95 transition-all flex-shrink-0"
                title="Play / Pause (Space)"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-on-primary text-on-primary" />
                ) : (
                  <Play className="w-6 h-6 fill-on-primary text-on-primary pl-0.5" />
                )}
              </button>

              <div className="min-w-0">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-outline">Listening Console</span>
                <span className="font-sans text-xs font-extrabold text-on-surface">
                  {isPlaying ? "Auditory Intelligence Streaming..." : "Console Paused / Ready"}
                </span>
              </div>
            </div>

            {/* Time progress scrub */}
            <div className="flex-grow w-full">
              <div className="flex items-center justify-between text-[10px] font-mono text-outline mb-1.5">
                <span>{formatSecs(currentTime)}</span>
                <span className="flex items-center gap-1 text-primary">
                  {isPlaying && <Radio className="w-3 h-3 animate-pulse" />} FULL HIGH-RES STREAM
                </span>
                <span>{formatSecs(totalSeconds)}</span>
              </div>

              {/* Slider track wrapper */}
              <div className="relative flex items-center h-5">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressPercent}
                  onChange={(e) => {
                    const factor = parseFloat(e.target.value) / 100;
                    setCurrentTime(Math.floor(factor * totalSeconds));
                  }}
                  className="w-full h-1.5 accent-primary bg-surface-container-high rounded-full appearance-none cursor-pointer focus:outline-none"
                />
              </div>
            </div>

            {/* Actions Panel */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              {/* Skip backward/forward & Mute buttons */}
              <div className="flex items-center gap-1.5 mr-2">
                <button
                  onClick={() => handleSkip(-15)}
                  className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
                  title="Rewind 15s (←)"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSkip(15)}
                  className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
                  title="Forward 15s (→)"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
                  title={isMuted ? "Unmute Briefing (M)" : "Mute Briefing (M)"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-error" /> : <Volume2 className="w-4 h-4 text-primary" />}
                </button>
              </div>

              {/* Playback speed toggle */}
              <div className="relative" ref={speedMenuRef}>
                <button
                  onClick={() => setIsSpeedMenuOpen(!isSpeedMenuOpen)}
                  className={`px-3 py-1.5 text-[10px] font-mono font-bold rounded border transition-all flex items-center gap-1.5 ${
                    isSpeedMenuOpen 
                      ? "bg-primary text-on-primary border-primary" 
                      : "bg-surface-container-high hover:bg-surface-container-highest border-outline-variant/10 text-on-surface-variant"
                  }`}
                  title="Playback Multiplier (S)"
                >
                  {playbackSpeed}x SPEED
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isSpeedMenuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isSpeedMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute bottom-full right-0 mb-2 w-32 bg-surface-container-high border border-outline-variant/20 rounded-xl shadow-xl z-30 overflow-hidden py-1.5"
                    >
                      {[1, 1.25, 1.5, 2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => {
                            setPlaybackSpeed(speed);
                            setIsSpeedMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-[10px] font-mono font-bold transition-colors ${
                            playbackSpeed === speed
                              ? "bg-primary/10 text-primary"
                              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest"
                          }`}
                        >
                          {speed}x
                          {playbackSpeed === speed && <Check className="w-3 h-3" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Share button in player */}
              <button
                onClick={handleShare}
                className="py-1.5 px-3 rounded-full border border-outline-variant/30 text-[10px] uppercase font-mono font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high flex items-center gap-1.5 tracking-wider transition-all cursor-pointer"
                title="Open custom share options for this episode"
              >
                <Share2 className="w-3.5 h-3.5 animate-pulse" /> Share
              </button>

              {/* Share Clip button */}
              <button
                onClick={handleShareClip}
                className="py-1.5 px-3 rounded-full border border-outline-variant/30 text-[10px] uppercase font-mono font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high flex items-center gap-1.5 tracking-wider transition-all cursor-pointer"
                title="Share this specific timestamp deep-link"
              >
                <Scissors className="w-3.5 h-3.5" /> Share Clip
              </button>

              {/* Speech overview brief */}
              <button
                onClick={handleTTSBriefing}
                className={`py-1.5 px-3.5 rounded-full border border-outline-variant/30 text-[10px] uppercase font-mono font-bold flex items-center gap-1.5 tracking-wider transition-all ${
                  isSynthesizing
                    ? "bg-primary/20 text-primary border-primary animate-pulse"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                }`}
                title="Generate TTS briefing"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" /> Briefing
              </button>
            </div>
          </div>

          {/* Connected Equalizer wave animation when playing */}
          {isPlaying && (
            <div className="flex justify-center gap-1 mt-4 pt-4 border-t border-outline-variant/5">
              {[6, 14, 22, 10, 18, 12, 28, 16, 24, 8, 14, 20, 12, 18, 6].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-primary rounded-full"
                  animate={{ height: ["4px", `${h}px`, "4px"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.3 + (i * 0.04),
                    ease: "easeInOut"
                  }}
                  style={{ height: "4px" }}
                />
              ))}
            </div>
          )}

          {/* Keyboard Shortcuts Legend helper */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mt-4 pt-3.5 border-t border-outline-variant/10 text-[9px] font-mono text-on-surface-variant/75 uppercase select-none tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="bg-surface-container-high border border-outline-variant/20 px-1.5 py-0.5 rounded text-on-surface font-extrabold shadow-sm">Space</span> Play/Pause
            </span>
            <span className="text-outline-variant/40">•</span>
            <span className="flex items-center gap-1.5">
              <span className="bg-surface-container-high border border-outline-variant/20 px-1.5 py-0.5 rounded text-on-surface font-extrabold shadow-sm">S</span> Cycle Speed
            </span>
            <span className="text-outline-variant/40">•</span>
            <span className="flex items-center gap-1.5">
              <span className="bg-surface-container-high border border-outline-variant/20 px-1.5 py-0.5 rounded text-on-surface font-extrabold shadow-sm">←</span> Rewind 15s
            </span>
            <span className="text-outline-variant/40">•</span>
            <span className="flex items-center gap-1.5">
              <span className="bg-surface-container-high border border-outline-variant/20 px-1.5 py-0.5 rounded text-on-surface font-extrabold shadow-sm">→</span> Seek 15s
            </span>
            <span className="text-outline-variant/40">•</span>
            <span className="flex items-center gap-1.5">
              <span className="bg-surface-container-high border border-outline-variant/20 px-1.5 py-0.5 rounded text-on-surface font-extrabold shadow-sm">M</span> {isMuted ? "Unmute briefing" : "Mute briefing"}
            </span>
          </div>
        </div>
      </header>

      {/* Symmetric Segmented Tab System */}
      <section id="episode-details-segmented-matrix" className="relative z-10">
        <div className="flex border-b border-outline-variant/20 mb-8 gap-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("notes")}
            className={`pb-4 px-1 text-sm font-sans font-extrabold tracking-wide relative flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === "notes" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <FileText className="w-4 h-4" /> Comprehensive Show Notes
            {activeTab === "notes" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTabUnderline"
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab("transcript")}
            className={`pb-4 px-1 text-sm font-sans font-extrabold tracking-wide relative flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === "transcript" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Interactive Transcript
            {activeTab === "transcript" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTabUnderline"
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab("guests")}
            className={`pb-4 px-1 text-sm font-sans font-extrabold tracking-wide relative flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === "guests" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <User className="w-4 h-4" /> Expert Guest Profiles ({guestsList.length})
            {activeTab === "guests" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTabUnderline"
              />
            )}
          </button>
        </div>

        {/* Tab display zone */}
        <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6 md:p-8 min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === "notes" && (
              <motion.div
                key="notes-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-outline-variant/10 pb-4 mb-4">
                  <div>
                    <h3 className="text-xl font-headline font-bold text-on-surface">Curated Show Notes</h3>
                    <p className="text-xs text-on-surface-variant font-mono mt-1">RESEARCH ABSTRACTS & KEY METRICS</p>
                  </div>

                  <button
                    onClick={handleExportBriefing}
                    className={`px-4 py-2 rounded-full border border-outline-variant/30 text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 hover:bg-surface-container-high transition-all ${
                      downloadSuccess ? "bg-green-500/10 border-green-500 text-green-700" : "text-on-surface-variant"
                    }`}
                  >
                    {downloadSuccess ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-green-600" /> Export Complete
                      </>
                    ) : (
                      <>
                        <FileDown className="w-3.5 h-3.5" /> Export PDF Dossier
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-4">
                  {showNotesList.map((note, index) => (
                    <div key={index} className="flex gap-4 items-start bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-mono text-sm font-bold flex items-center justify-center border border-primary/20">
                        {index + 1}
                      </span>
                      <p className="font-body text-sm text-on-surface-variant leading-relaxed pt-0.5">
                        {note}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Additional resources link block */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mt-8">
                  <h4 className="font-headline font-bold text-sm text-primary mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Academic Reference Core
                  </h4>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-4">
                    The discussions referenced in this episode refer to formal sandbox pilot parameters and sovereign transaction standards approved under Series 03 guidelines.
                  </p>
                  <a
                    href={currentEpisode.sourceUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-container"
                  >
                    Original Venturing Publication Index <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            )}

            {activeTab === "transcript" && (
              <motion.div
                key="transcript-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-outline-variant/10 pb-6 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-headline font-bold text-on-surface">Interactive Audio-Synced Transcript</h3>
                    <p className="text-xs text-on-surface-variant font-mono mt-1 uppercase tracking-wider">Click on any timestamp to scrub the playback console directly</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    {/* Topic Search Input */}
                    <div className="relative group flex-grow sm:w-64">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                      <input
                        type="text"
                        placeholder="Search topics or mentions..."
                        value={transcriptSearchQuery}
                        onChange={(e) => setTranscriptSearchQuery(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-full py-2 pl-10 pr-10 text-xs font-sans text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all shadow-inner"
                      />
                      {transcriptSearchQuery && (
                        <button
                          onClick={() => setTranscriptSearchQuery("")}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Elegant iOS-style Auto-Scroll Toggle */}
                    <div className="flex items-center gap-3 bg-surface-container-high border border-outline-variant/15 rounded-full py-2 px-4 shadow-sm hover:border-primary/30 transition-colors">
                      <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">Auto-Scroll</span>
                      <button
                        type="button"
                        onClick={() => setIsAutoScrollEnabled(!isAutoScrollEnabled)}
                        className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          isAutoScrollEnabled ? "bg-primary" : "bg-outline/35"
                        }`}
                        role="switch"
                        aria-checked={isAutoScrollEnabled}
                        title="Toggle automatic synchronization and scrolling of speaker tracks"
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            isAutoScrollEnabled ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {currentEpisode?.sentimentMap && currentEpisode.sentimentMap.length > 0 && (
                  <div className="mb-6 bg-surface-container-low border border-outline-variant/10 rounded-xl p-4 h-[180px] hidden md:flex flex-col">
                    <div className="text-[10px] uppercase font-mono tracking-widest text-on-surface-variant font-bold mb-4 flex justify-between items-center">
                      <span>Sentiment Analysis Visualization</span>
                      <div className="flex gap-2 bg-surface-container-highest p-1 rounded-full border border-outline-variant/10">
                        <button 
                          onClick={() => setSentimentViewType("intensity")}
                          className={`px-3 py-1 rounded-full text-[9px] font-bold transition-all ${sentimentViewType === "intensity" ? "bg-red-500/20 text-red-500" : "text-on-surface-variant hover:text-on-surface"}`}
                        >
                          Intensity (Stakes)
                        </button>
                        <button 
                          onClick={() => setSentimentViewType("density")}
                          className={`px-3 py-1 rounded-full text-[9px] font-bold transition-all ${sentimentViewType === "density" ? "bg-blue-500/20 text-blue-500" : "text-on-surface-variant hover:text-on-surface"}`}
                        >
                          Density (Analytical)
                        </button>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={currentEpisode.sentimentMap.map((s, i) => {
                        const transcriptIndex = Math.floor((i / currentEpisode.sentimentMap!.length) * transcriptList.length);
                        const textPreview = transcriptList[transcriptIndex]?.text || '';
                        return { 
                          index: i, 
                          value: sentimentViewType === "intensity" ? s.intensity : s.density,
                          text: textPreview,
                          speaker: transcriptList[transcriptIndex]?.speaker || 'Unknown'
                        };
                      })}>
                        <XAxis dataKey="index" hide />
                        <RechartsTooltip
                          cursor={{ fill: 'transparent' }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-surface-container-highest border border-outline-variant/20 p-2.5 rounded shadow-lg max-w-[240px]">
                                  <div className="flex justify-between items-center text-[10px] font-mono text-on-surface font-bold mb-1.5">
                                    <span className="truncate pr-2">{data.speaker}</span>
                                    <span className="shrink-0">{sentimentViewType === "intensity" ? "Intensity" : "Density"}: {payload[0].value}</span>
                                  </div>
                                  <p className="text-[10px] text-on-surface-variant font-body leading-relaxed line-clamp-3">
                                    "{data.text}"
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                          {currentEpisode.sentimentMap.map((entry, index) => {
                            const val = sentimentViewType === "intensity" ? entry.intensity : entry.density;
                            const isHigh = val >= 0.75;
                            const isLow = val <= 0.3;
                            const fill = sentimentViewType === "intensity" 
                              ? (isHigh ? "#ef4444" : isLow ? "#3b82f6" : "#775a19")
                              : (isHigh ? "#3b82f6" : isLow ? "#ef4444" : "#775a19");
                            return (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={fill} 
                              />
                            );
                          })}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                <div className="max-h-[500px] overflow-y-auto pr-1.5 space-y-4 scrollbar-thin scrollbar-thumb-outline-variant scrollbar-track-transparent">
                  {transcriptList.map((line, idx) => {
                    const isTimeMatched = idx === currentActiveLineIdx;
                    
                    const sentimentMap = currentEpisode?.sentimentMap || [];
                    const sentimentIndex = Math.floor((idx / transcriptList.length) * sentimentMap.length);
                    const intensity = sentimentMap[sentimentIndex]?.intensity || 0.5;
                    const isHighStakes = intensity >= 0.75;
                    const isLowIntensity = intensity <= 0.3;

                    return (
                      <div
                        key={idx}
                        id={`transcript-line-${idx}`}
                        onClick={() => handleJumpToTime(line.time)}
                        className={`group p-4 rounded-xl border transition-all cursor-pointer scroll-mt-6 ${
                          isTimeMatched
                            ? "bg-primary/10 border-primary shadow-sm ring-1 ring-primary/20"
                            : "bg-surface-container-lowest border-outline-variant/10 hover:border-primary/45 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`font-sans text-xs font-black ${isTimeMatched ? "text-primary" : "text-on-surface"}`}>
                              {line.speaker}
                            </span>
                            {isHighStakes && (
                              <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-red-500 uppercase tracking-widest bg-red-500/10 px-1.5 py-0.5 rounded-sm border border-red-500/20" title="High-stakes discussion point detected">
                                <Zap className="w-3 h-3" /> High Stakes
                              </span>
                            )}
                            {isLowIntensity && (
                              <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-1.5 py-0.5 rounded-sm border border-blue-500/20" title="Analytical synthesis point detected">
                                <Activity className="w-3 h-3" /> Analytical
                              </span>
                            )}
                          </div>
                          
                          <button className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-all flex items-center gap-1 ${
                            isTimeMatched 
                              ? "bg-primary text-on-primary" 
                              : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-on-primary"
                          }`}>
                            <Clock className="w-2.5 h-2.5" /> {line.time}
                          </button>
                        </div>

                        <p className={`font-body text-xs md:text-sm leading-relaxed transition-colors duration-300 ${isTimeMatched ? "text-on-surface" : "text-on-surface-variant"} ${isHighStakes ? "font-medium" : ""}`}>
                          <TranscriptHighlighter text={line.text} query={transcriptSearchQuery} />
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === "guests" && (
              <motion.div
                key="guests-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                <div className="border-b border-outline-variant/10 pb-4 mb-4">
                  <h3 className="text-xl font-headline font-bold text-on-surface">Invited Expert Envoys</h3>
                  <p className="text-xs text-on-surface-variant font-mono mt-1">CREDENTIALS AND SYMMETRIC NETWORKS</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {guestsList.map((g, idx) => (
                    <div key={idx} className="bg-surface-container-lowest border border-outline-variant/15 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          {/* Rich customizable Avatar Initials badge */}
                          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-headline font-bold text-primary text-base">
                            {g.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <h4 className="font-headline font-extrabold text-on-surface text-base">{g.name}</h4>
                            <p className="text-xs text-primary font-semibold">{g.role} at {g.company}</p>
                          </div>
                        </div>

                        <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-6">
                          {g.bio}
                        </p>
                      </div>

                      {g.linkedinUrl && (
                        <div className="border-t border-outline-variant/10 pt-4">
                          <a
                            href={g.linkedinUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary hover:text-primary-container uppercase tracking-wider"
                          >
                            <Linkedin className="w-3.5 h-3.5 fill-primary text-primary" /> Established Corridor <ExternalLink className="w-3 h-3 text-primary/70" />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Related Episodes Section */}
      <section id="related-episodes-matrix" className="mt-16 pt-12 border-t border-outline-variant/15 relative z-10 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
          <div>
            <h2 className="font-headline text-xl md:text-2xl font-extrabold text-on-surface tracking-tight">
              Related Episodes
            </h2>
            <p className="text-xs text-on-surface-variant font-mono mt-1 uppercase tracking-wider">
              Explore other insights in {currentEpisode.category}
            </p>
          </div>
          <Link
            to="/podcasts"
            className="text-xs font-mono font-bold text-primary hover:text-primary-container transition-colors uppercase tracking-widest flex items-center gap-1 animate-pulse"
          >
            All Episodes &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedEpisodes.map((ep, idx) => (
            <motion.div
              key={ep.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                {/* Embedded Cover Art Image */}
                <Link to={`/podcasts/${ep.id}`} className="block relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-outline-variant/10 mb-4 bg-surface-container-high shadow-sm">
                  <img
                    src={ep.imageUrl || `https://picsum.photos/seed/${ep.id}/600/375`}
                    alt={ep.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-2.5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-mono font-bold text-white tracking-widest uppercase">Inspect Details</span>
                    <Play className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                </Link>

                {/* Meta details */}
                <div className="flex items-center justify-between text-[10px] font-mono text-primary font-bold mb-2">
                  <span>EP {ep.episodeNumber}</span>
                  <span className="text-on-surface-variant/60 font-semibold">{ep.category}</span>
                </div>

                {/* Title */}
                <Link to={`/podcasts/${ep.id}`} className="block">
                  <h3 className="font-headline text-sm font-extrabold text-on-surface tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {ep.title}
                  </h3>
                </Link>

                {/* Summary */}
                <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-4 line-clamp-2">
                  {ep.summary}
                </p>
              </div>

              {/* Bottom stats details */}
              <div className="flex items-center justify-between text-[10px] font-mono text-on-surface-variant border-t border-outline-variant/10 pt-3 mt-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-primary/70" /> {ep.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-primary/70" /> {ep.duration}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Custom Share Modal with QR code & social shortcuts */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsShareModalOpen(false);
                setIsShareClipMode(false);
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Card content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="relative w-full max-w-lg bg-surface-container-high border border-outline-variant/30 rounded-3xl p-6 md:p-8 shadow-2xl z-10 overflow-hidden text-on-surface"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card
            >
              {/* Card top flare pattern */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30" />

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsShareModalOpen(false);
                  setIsShareClipMode(false);
                }}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                title="Close modal (Esc)"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="mb-6 pr-8">
                <div className="flex items-center gap-2 mb-1">
                  {isShareClipMode ? (
                    <Scissors className="w-4 h-4 text-primary animate-pulse" />
                  ) : (
                    <Share2 className="w-4 h-4 text-primary animate-pulse" />
                  )}
                  <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
                    {isShareClipMode ? `Share Clip at ${formatSecs(currentTime)}` : "Share Broadcast insights"}
                  </span>
                </div>
                <h3 className="font-headline text-lg md:text-xl font-extrabold text-on-surface tracking-tight leading-snug line-clamp-2">
                  {currentEpisode.title}
                </h3>
                <p className="text-[10px] font-mono text-on-surface-variant font-bold uppercase tracking-wider mt-1.5">
                  Episode {currentEpisode.episodeNumber} &middot; {currentEpisode.category}
                </p>
              </div>

              {/* Grid content */}
              <div className="space-y-6">
                {/* Social Networks Row */}
                <div>
                  <span className="block text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-2.5">
                    Share on Social Network channels
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${window.location.origin}${window.location.pathname}${isShareClipMode ? `?t=${Math.floor(currentTime)}` : ""}`)}&text=${encodeURIComponent(isShareClipMode ? `Check out this segment @ ${formatSecs(currentTime)} from "${currentEpisode.title}"!` : `Listening to "${currentEpisode.title}" from Sabine VanderLinden and Alchemy Crew on Beyond Tech Frontiers!`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={trackShare}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0f1419] hover:bg-[#1d2226] text-white text-xs font-semibold tracking-wide shadow transition-all hover:-translate-y-0.5"
                    >
                      <Twitter className="w-4 h-4 fill-white text-white" />
                      X / Twitter
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}${window.location.pathname}${isShareClipMode ? `?t=${Math.floor(currentTime)}` : ""}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={trackShare}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0077b5] hover:bg-[#006297] text-white text-xs font-semibold tracking-wide shadow transition-all hover:-translate-y-0.5"
                    >
                      <Linkedin className="w-4 h-4 fill-white text-white" />
                      LinkedIn
                    </a>
                  </div>
                </div>

                {/* Mobile QR Hand-off Section */}
                <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-4.5 flex flex-col sm:flex-row items-center gap-5 justify-between">
                  <div className="flex-1 text-center sm:text-left">
                    <span className="flex items-center justify-center sm:justify-start gap-1.5 text-[9px] font-mono font-bold text-primary uppercase tracking-wider mb-1.5">
                      <QrCode className="w-3.5 h-3.5" /> {isShareClipMode ? `QR Clip at ${formatSecs(currentTime)}` : "Mobile Hand-off link"}
                    </span>
                    <h4 className="text-xs font-bold text-on-surface leading-snug mb-1">
                      {isShareClipMode ? "Focused Contextual Segment" : "Continuous Auditory Experience"}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant leading-normal">
                      {isShareClipMode 
                        ? `Transfer this specific segment starting at ${formatSecs(currentTime)} to your mobile device for precise listening.`
                        : "Scan the QR code to transfer this briefing to your mobile device and continue listening seamlessly on the go."
                      }
                    </p>
                  </div>
                  
                  <div className="w-[110px] h-[110px] p-2 bg-white rounded-xl border border-outline-variant/25 flex-shrink-0 flex items-center justify-center shadow-inner">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&color=232323&bgcolor=ffffff&data=${encodeURIComponent(`${window.location.origin}${window.location.pathname}${isShareClipMode ? `?t=${Math.floor(currentTime)}` : ""}`)}`}
                      alt="Episode QR Code"
                      className="w-[96px] h-[96px] object-contain select-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Clipboard link row */}
                <div>
                  <span className="block text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                    {isShareClipMode ? "Deep-linked Segment URL" : "Direct Episode Link"}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex-grow bg-surface-container-lowest border border-outline-variant/20 rounded-xl py-2 px-3 text-xs text-on-surface-variant font-mono truncate select-all">
                      {window.location.origin}{window.location.pathname}{isShareClipMode ? `?t=${Math.floor(currentTime)}` : ""}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const url = `${window.location.origin}${window.location.pathname}${isShareClipMode ? `?t=${Math.floor(currentTime)}` : ""}`;
                        navigator.clipboard.writeText(url).then(() => {
                          setShareSuccess(true);
                          setTimeout(() => setShareSuccess(false), 2000);
                        });
                      }}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                        shareSuccess
                          ? "bg-green-500/10 border-green-500 text-green-700 font-extrabold"
                          : "border-outline-variant/30 hover:border-primary hover:text-primary hover:bg-primary/5 text-on-surface-variant"
                      }`}
                    >
                      {shareSuccess ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600 animate-bounce" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Escape key guide */}
              <div className="mt-6 pt-4 border-t border-outline-variant/10 text-center">
                <span className="text-[9px] font-mono text-on-surface-variant/50 uppercase tracking-widest select-none">
                  Press <span className="bg-surface-container-lowest border border-outline-variant/20 px-1 py-0.5 rounded text-[10px] font-bold">Esc</span> key to close dialog
                </span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
