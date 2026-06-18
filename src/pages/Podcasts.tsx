import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Search,
  Filter,
  Calendar,
  Clock,
  ArrowUpRight,
  Radio,
  Mic,
  Sparkles,
  Check,
  Loader2,
  Share2,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  SkipForward,
  SkipBack,
  User,
  Sliders,
  Send,
  Share,
  Heart
} from "lucide-react";
import { EPISODES_DATA, CATEGORIES, Episode } from "../data/podcastEpisodes";
import { fetchPodcasts, likePodcast } from "../lib/podcastService";
import ShareModal from "../components/ShareModal";

const WaveformVisualizer = ({ 
  isPlaying, 
  sentimentData, 
  progress = 0 
}: { 
  isPlaying: boolean; 
  sentimentData?: { intensity: number; density: number }[];
  progress?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const framesRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use parent container dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      // Increase resolution for retina displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      
      const bars = 40;
      const barPadding = 2;
      const barWidth = (width - (bars - 1) * barPadding) / bars;
      
      framesRef.current += isPlaying ? 0.05 : 0.01;

      // Extract current focus sentiment for global color modulation
      const currentSegmentIndex = (sentimentData && progress > 0) ? Math.floor(progress * sentimentData.length) : -1;
      const currentSentiment = (currentSegmentIndex >= 0 && sentimentData) ? sentimentData[currentSegmentIndex] : null;

      for (let i = 0; i < bars; i++) {
        // Use sentiment data to modulate the base height if available
        const sentiment = sentimentData ? sentimentData[i % sentimentData.length] : { intensity: 0.5, density: 0.5 };
        
        // Base height from sentiment intensity
        const baseHeight = sentiment.intensity * (height * 0.6);
        
        // Dynamic oscillation based on playback state
        const phase = framesRef.current + (i * 0.2);
        const oscillation = isPlaying 
          ? Math.sin(phase) * (height * 0.3) 
          : Math.sin(phase * 0.5) * (height * 0.1);
        
        const finalHeight = Math.max(4, baseHeight + oscillation);
        
        // Color interpolation based on density
        // Ochre: #775a19, Blue: #1e3a8a
        const barDensity = sentiment.density;
        
        // Shift global "vibe" toward the current playhead sentiment (40% weight)
        const activeMix = currentSentiment 
          ? (barDensity * 0.6 + currentSentiment.density * 0.4) 
          : barDensity;

        // Passed bars get a slightly more vivid shift
        const barProgress = i / bars;
        const isPassed = barProgress < progress;
        
        const r = Math.round(30 + (119 - 30) * activeMix);
        const g = Math.round(58 + (90 - 58) * activeMix);
        const b = Math.round(138 + (25 - 138) * activeMix);
        
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        
        // Playhead interaction
        if (isPlaying) {
          if (isPassed) {
            ctx.globalAlpha = 1.0;
            ctx.shadowBlur = 12;
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
          } else {
            ctx.globalAlpha = 0.6;
            ctx.shadowBlur = 4;
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
          }
        } else {
          ctx.globalAlpha = 0.4;
          ctx.shadowBlur = 0;
        }
        
        // Draw centered bar
        const x = i * (barWidth + barPadding);
        const y = (height - finalHeight) / 2;
        
        ctx.beginPath();
        const radius = barWidth / 2;
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barWidth, finalHeight, radius);
        } else {
          ctx.rect(x, y, barWidth, finalHeight);
        }
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, sentimentData, progress]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-10 block"
      style={{ imageRendering: 'auto' }}
    />
  );
};

export default function Podcasts() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTarget, setSearchTarget] = useState<"all" | "title" | "host">("all");
  const [sortBy, setSortBy] = useState<"number-desc" | "number-asc" | "date-desc" | "date-asc">("number-desc");
  const [expandedEpisode, setExpandedEpisode] = useState<string | null>(null);
  const [shareEpisode, setShareEpisode] = useState<Episode | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Dropdown states for custom animated sorter
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);

  useEffect(() => {
    const loadEpisodes = async () => {
      const data = await fetchPodcasts();
      setEpisodes(data);
      setLoadingEpisodes(false);
      
      // Update active episode to the one from DB so likes/shares are present
      if (data && data.length > 0) {
        setActiveEpisode(data[0]);
      }
    };
    loadEpisodes();
  }, []);

  const sortOptions = [
    { value: "number-desc" as const, label: "Episode: Highest First" },
    { value: "number-asc" as const, label: "Episode: Lowest First" },
    { value: "date-desc" as const, label: "Released: Newest" },
    { value: "date-asc" as const, label: "Released: Oldest" },
  ];

  // Audio Player State
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [progressRecords, setProgressRecords] = useState<Record<string, { currentTime: number; duration: number; percent: number }>>({});

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "signing" | "success">("idle");
  const [formFeedback, setFormFeedback] = useState("");

  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Helper: converts seconds to MM:SS format
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Static total duration mapped from episode data
  const getEpisodeDurationSeconds = (ep: Episode | null): number => {
    if (!ep) return 1800; // default 30 mins
    const m = parseInt(ep.duration.replace(" mins", "")) || 30;
    return m * 60;
  };

  const totalDurationSeconds = getEpisodeDurationSeconds(activeEpisode);

  // Handles simulated audio progression
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDurationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, totalDurationSeconds, playbackSpeed]);

  // Save progress of current activeEpisode to localStorage
  useEffect(() => {
    if (activeEpisode) {
      try {
        const savedProgress = localStorage.getItem("podcast_listening_progress");
        const progressMap = savedProgress ? JSON.parse(savedProgress) : {};
        
        const percent = totalDurationSeconds > 0 ? (currentTime / totalDurationSeconds) * 100 : 0;
        
        // Prevent writing redundant progress if unchanged and 0 (e.g. initial mount)
        if (currentTime === 0 && (!progressMap[activeEpisode.id] || progressMap[activeEpisode.id].currentTime === 0)) {
          return;
        }

        progressMap[activeEpisode.id] = {
          currentTime,
          duration: totalDurationSeconds,
          percent,
          lastUpdated: Date.now()
        };
        
        localStorage.setItem("podcast_listening_progress", JSON.stringify(progressMap));
        setProgressRecords(progressMap);
        window.dispatchEvent(new Event("podcast_progress_updated"));
      } catch (e) {
        console.warn("Failed to save progress", e);
      }
    }
  }, [currentTime, activeEpisode, totalDurationSeconds]);

  // Initialize progress records and sync listeners
  useEffect(() => {
    const loadProgress = () => {
      try {
        const savedProgress = localStorage.getItem("podcast_listening_progress");
        if (savedProgress) {
          setProgressRecords(JSON.parse(savedProgress));
        }
      } catch (e) {
        console.warn("Failed to load progress records", e);
      }
    };

    loadProgress();

    window.addEventListener("podcast_progress_updated", loadProgress);
    window.addEventListener("storage", loadProgress);
    return () => {
      window.removeEventListener("podcast_progress_updated", loadProgress);
      window.removeEventListener("storage", loadProgress);
    };
  }, []);

  // Set initial playhead of loaded activeEpisode from progress records
  useEffect(() => {
    if (activeEpisode) {
      try {
        const savedProgress = localStorage.getItem("podcast_listening_progress");
        if (savedProgress) {
          const progressMap = JSON.parse(savedProgress);
          if (progressMap[activeEpisode.id]) {
            const savedTime = progressMap[activeEpisode.id].currentTime;
            const savedDuration = progressMap[activeEpisode.id].duration || getEpisodeDurationSeconds(activeEpisode);
            if (savedTime && savedTime < savedDuration - 5) {
              setCurrentTime(savedTime);
              return;
            }
          }
        }
      } catch (e) {
        console.warn("Failed to initialize active episode progress", e);
      }
      setCurrentTime(0);
    }
  }, [activeEpisode]);

  // Stops speech synthesis if active track changes
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSynthesizing(false);
    }
  }, [activeEpisode]);

  // Click outside listener for custom sorting dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePlayEpisode = (episode: Episode) => {
    const isSame = activeEpisode?.id === episode.id;
    if (isSame) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveEpisode(episode);
      try {
        const savedProgress = localStorage.getItem("podcast_listening_progress");
        if (savedProgress) {
          const progressMap = JSON.parse(savedProgress);
          if (progressMap[episode.id]) {
            const savedTime = progressMap[episode.id].currentTime;
            const episodeDuration = getEpisodeDurationSeconds(episode);
            if (savedTime && savedTime < episodeDuration - 5) {
              setCurrentTime(savedTime);
              setIsPlaying(true);
              return;
            }
          }
        }
      } catch (e) {
        // Safe failover
      }
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds: number) => {
    setCurrentTime((prev) => {
      const target = prev + seconds;
      if (target < 0) return 0;
      if (target > totalDurationSeconds) return totalDurationSeconds;
      return target;
    });
  };

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(Math.floor((val / 100) * totalDurationSeconds));
  };

  // Text to Speech brief synth for premium AI experience
  const handleTTSBriefing = () => {
    if (!activeEpisode) return;
    if (isSynthesizing) {
      window.speechSynthesis.cancel();
      setIsSynthesizing(false);
      return;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const textToRead = `Briefing from beyond tech frontiers episode ${activeEpisode.episodeNumber}. ${activeEpisode.title}. ${activeEpisode.summary}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.05 * playbackSpeed;
      utterance.volume = isMuted ? 0 : volume / 100;
      
      utterance.onend = () => {
        setIsSynthesizing(false);
      };
      utterance.onerror = () => {
        setIsSynthesizing(false);
      };

      speechUtteranceRef.current = utterance;
      setIsSynthesizing(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis is not supported in this browser environment.");
    }
  };

  // Filtering Logic
  const filteredEpisodes = episodes.filter((ep) => {
    const matchesCategory = selectedCategory === "All" || ep.category === selectedCategory;
    
    const matchesSearch = (() => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      
      const titleMatches = ep.title.toLowerCase().includes(query);
      const summaryMatches = 
        ep.summary.toLowerCase().includes(query) || 
        ep.extendedDescription.toLowerCase().includes(query);
      
      const guestMatches = ep.guests?.some(g => 
        g.name.toLowerCase().includes(query) ||
        g.role.toLowerCase().includes(query) ||
        g.company.toLowerCase().includes(query)
      ) || false;
      
      const hostMatches = 
        "sabine vanderlinden".includes(query) || 
        "sabine".includes(query) || 
        "vanderlinden".includes(query);
      
      if (searchTarget === "title") {
        return titleMatches;
      }
      if (searchTarget === "host") {
        return hostMatches || guestMatches;
      }
      
      // Default: "all"
      return titleMatches || summaryMatches || guestMatches || hostMatches || ep.episodeNumber.toString().includes(query);
    })();

    return matchesCategory && matchesSearch;
  });

  // Sorting Logic
  const sortedEpisodes = [...filteredEpisodes].sort((a, b) => {
    if (sortBy === "number-desc") {
      return b.episodeNumber - a.episodeNumber;
    }
    if (sortBy === "number-asc") {
      return a.episodeNumber - b.episodeNumber;
    }
    if (sortBy === "date-desc") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === "date-asc") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return 0;
  });

  // Contact Form submit sequence mimicking authentic ledger operations
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormFeedback("All essential fields (Name, Email, Query) must be defined.");
      return;
    }

    setFormFeedback("");
    setFormStatus("submitting");
    await new Promise((r) => setTimeout(r, 1200));

    setFormStatus("signing");
    await new Promise((r) => setTimeout(r, 1000));

    setFormStatus("success");
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const currentProgressPercent = (currentTime / totalDurationSeconds) * 100 || 0;

  const featuredEpisode = episodes.length > 0 ? episodes[0] : null;

  return (
    <div className="pt-32 pb-36 px-4 md:px-12 max-w-7xl mx-auto min-h-screen text-on-surface">
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-primary/5 rounded-full filter blur-[90px] pointer-events-none" />

      {/* Hero Header */}
      <header id="podcasts-header" className="mb-12 relative z-10">
        <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[11px] tracking-[0.25em] text-primary uppercase font-bold">
            Auditory Intelligence Core / Series 03
          </span>
        </div>
        <h1 id="podcasts-title" className="font-headline text-4xl md:text-6xl font-black text-center md:text-left tracking-tight mb-4 leading-[1.1]">
          Beyond Tech Frontiers
        </h1>
        <p id="podcasts-subtitle" className="font-body text-lg text-on-surface-variant max-w-3xl leading-relaxed text-center md:text-left">
          Deep dives into the mechanics of disruptive innovation, corporate venture clienting, ethical AI networks, and algorithmic risk underwriting. Hosted by globally renowned venture builder <strong className="text-on-surface font-semibold">Sabine VanderLinden</strong> in collaboration with <span className="text-primary font-bold">Tenured AI</span>.
        </p>
      </header>

      {loadingEpisodes ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Featured Episode & Host Biography Bento Grid */}
          <div id="podcasts-bento-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 relative z-10">
            {/* Host Biography Panel */}
            <div id="bento-panel-host animate-box" className="lg:col-span-4 bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 flex flex-col justify-between ambient-shadow">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div id="host-avatar" className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center overflow-hidden bg-primary/10">
                    <Mic className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="block font-sans text-xs uppercase tracking-widest text-primary font-bold">Podcast Creator & Host</span>
                    <h3 id="host-name" className="text-xl font-headline font-extrabold text-on-surface">Sabine VanderLinden</h3>
                  </div>
                </div>
                <p id="host-bio" className="text-sm text-on-surface-variant leading-relaxed mb-6 font-body">
                  Named one of Europe’s Top 50 InsurTech influencers, Sabine is the CEO of Alchemy Crew and a pioneer of venture client programs. She has accelerated over 50 strategic corporate collaborations and continues to rewrite the future of financial risk frameworks.
                </p>
                <div className="border-t border-outline-variant/10 pt-4 italic text-xs text-primary/80 font-body leading-relaxed">
                  &ldquo;True disruption isn't about adopting tools; it's about re-underwriting the entire boundary between human discretion and sovereign automated systems.&rdquo;
                </div>
              </div>
              <div id="host-stats" className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-outline-variant/10">
                <div>
                  <div className="text-2xl font-headline font-bold text-on-surface">50+</div>
                  <div className="text-[10px] text-on-surface-variant uppercase tracking-wider">Episodes Airing</div>
                </div>
                <div>
                  <div className="text-2xl font-headline font-bold text-on-surface">15+</div>
                  <div className="text-[10px] text-on-surface-variant uppercase tracking-wider">Patents Contextualized</div>
                </div>
              </div>
            </div>

            {/* Featured Episode Dashboard (Latest) */}
            {featuredEpisode && (
            <div id="bento-panel-featured" className="lg:col-span-8 bg-surface-container-lowest border-2 border-primary/20 rounded-3xl p-8 relative flex flex-col justify-between ambient-shadow overflow-hidden group">
              <div className="absolute top-0 right-0 py-1.5 px-4 bg-primary/10 text-primary font-mono text-[10px] uppercase font-bold tracking-widest border-l border-b border-primary/20 rounded-bl-xl">
                LATEST EPISODE
              </div>
              <div>
                <div className="flex items-center gap-3 text-xs font-mono text-primary font-bold mb-4">
                  <span>EPISODE {featuredEpisode.episodeNumber}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {featuredEpisode.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredEpisode.duration}</span>
                </div>
                <Link to={`/podcasts/${featuredEpisode.id}`} className="hover:text-primary transition-colors block">
                  <h2 id="featured-title" className="text-2xl md:text-3xl font-headline font-extrabold text-on-surface tracking-tight mb-4 leading-snug hover:text-primary transition-colors">
                    {featuredEpisode.title}
                  </h2>
                </Link>
                <p id="featured-desc" className="text-sm md:text-base text-on-surface-variant leading-relaxed mb-6 font-body line-clamp-3">
                  {featuredEpisode.extendedDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-surface-container-high rounded-full font-label text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
                    {featuredEpisode.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-outline-variant/10">
                <div className="flex gap-4 w-full sm:w-auto">
                  <button
                    id="btn-featured-play"
                    onClick={() => handlePlayEpisode(featuredEpisode)}
                    className="flex-1 sm:flex-initial py-3 px-6 bg-primary text-on-primary font-bold rounded-full flex items-center justify-center gap-2.5 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:bg-primary/95 transition-all text-xs uppercase tracking-widest"
                  >
                    <Play className="w-4 h-4 fill-on-primary" /> Listen Now
                  </button>
                  <button
                    id="btn-featured-synth"
                    onClick={() => {
                      setActiveEpisode(featuredEpisode);
                      setTimeout(() => handleTTSBriefing(), 100);
                    }}
                    className={`py-3 px-4 rounded-full border border-outline-variant/50 flex items-center justify-center gap-2 transition-all text-xs font-semibold ${
                      isSynthesizing && activeEpisode?.id === featuredEpisode.id
                        ? "bg-primary/10 border-primary text-primary animate-pulse"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                    }`}
                    title="Synthesize an AI briefing overview"
                  >
                    <Sparkles className="w-4 h-4 text-primary" /> Audio Briefing
                  </button>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <Link
                    to={`/podcasts/${featuredEpisode.id}`}
                    className="w-full sm:w-auto py-2.5 px-4 text-xs font-bold bg-primary/10 text-primary hover:bg-primary/25 flex items-center justify-center gap-1.5 rounded-full transition-all border border-primary/25"
                  >
                    Comprehensive Study Dossier & Transcript →
                  </Link>
                  <a
                    href={featuredEpisode.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-2.5 px-4 text-xs font-bold text-on-surface hover:text-primary flex items-center justify-center gap-2 border border-outline-variant/10 rounded-full transition-all"
                  >
                    Original URL <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
            )}
          </div>

      {/* Directory & Interactive Catalog */}
      <section id="episodes-directory" className="relative z-10 mb-20 scroll-mt-24">
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-6 mb-8 pb-4 border-b border-outline-variant/10">
          <div>
            <h2 className="text-2xl font-headline font-bold text-on-surface">Episode Archives</h2>
            <p className="text-xs text-on-surface-variant font-mono mt-1">CROSS-INDEXED BROADCAST DATASET</p>
          </div>

          {/* Search Input & Mode Selector Matrix */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">
            {/* Target Select Pills */}
            <div className="flex items-center gap-1 bg-surface-container-low border border-outline-variant/15 rounded-full p-1 self-stretch sm:self-auto shadow-sm">
              <button
                type="button"
                onClick={() => setSearchTarget("all")}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-[10px] font-mono tracking-wider uppercase font-extrabold rounded-full transition-all ${
                  searchTarget === "all"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                All Fields
              </button>
              <button
                type="button"
                onClick={() => setSearchTarget("title")}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-[10px] font-mono tracking-wider uppercase font-extrabold rounded-full transition-all ${
                  searchTarget === "title"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Title Only
              </button>
              <button
                type="button"
                onClick={() => setSearchTarget("host")}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-[10px] font-mono tracking-wider uppercase font-extrabold rounded-full transition-all ${
                  searchTarget === "host"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Host/Guest
              </button>
            </div>

            <div className="relative flex-grow sm:flex-grow-0 sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input
                type="text"
                id="episode-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  searchTarget === "title"
                    ? "Search specifically by title..."
                    : searchTarget === "host"
                    ? "Search host or expert guest names..."
                    : "Search episodes, topics, hosts..."
                }
                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/20 rounded-full text-xs font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/35 transition-all text-on-surface placeholder-on-surface-variant/55"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs & Sorting Selector Matrix */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-2 border-b border-outline-variant/5">
          <div id="category-filter-tabs" className="flex flex-wrap gap-2 overflow-x-auto scrollbar-none">
            {CATEGORIES.map((tab) => (
              <button
                key={tab}
                id={`tab-filter-${tab.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(tab)}
                className={`px-5 py-2 rounded-full font-sans text-xs font-semibold whitespace-nowrap tracking-wide transition-all ${
                  selectedCategory === tab
                    ? "bg-primary text-on-primary shadow-md"
                    : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border border-outline-variant/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div
            ref={sortDropdownRef}
            id="episodes-sorting-dropdown"
            className="relative self-start md:self-auto"
          >
            <button
              type="button"
              id="episodes-sort-dropdown-trigger"
              onClick={() => setIsSortDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isSortDropdownOpen}
              className="flex items-center gap-2.5 bg-surface-container-low border border-outline-variant/15 rounded-full py-1.5 px-4 shadow-sm hover:border-primary/40 transition-all cursor-pointer select-none"
            >
              <Sliders className="w-3.5 h-3.5 text-primary/85" />
              <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider whitespace-nowrap">
                Order By:
              </span>
              <span className="text-xs font-sans font-extrabold text-on-surface flex items-center gap-1">
                {sortOptions.find((o) => o.value === sortBy)?.label}
                <ChevronDown
                  className={`w-3.5 h-3.5 text-on-surface-variant transition-transform duration-300 ${
                    isSortDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>

            <AnimatePresence>
              {isSortDropdownOpen && (
                <motion.div
                  id="episodes-sort-dropdown"
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className="absolute right-0 mt-2.5 w-60 bg-surface-container-high border border-outline-variant/20 rounded-2xl shadow-xl z-30 overflow-hidden py-2 focus:outline-none"
                >
                  {sortOptions.map((opt) => {
                    const isSelected = sortBy === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setSortBy(opt.value);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-xs transition-colors text-left ${
                          isSelected
                            ? "bg-primary/10 text-primary font-extrabold font-headline"
                            : "text-on-surface-variant font-medium font-sans hover:text-on-surface hover:bg-surface-container-highest"
                        }`}
                      >
                        <span className="tracking-wide">{opt.label}</span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic EPISODES GRID */}
        {sortedEpisodes.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-outline-variant/10 border-dashed">
            <Radio className="w-12 h-12 text-outline/30 mx-auto mb-4 animate-pulse" />
            <p className="text-on-surface-variant font-medium text-lg">No corresponding episodes matched your coordinates.</p>
            <p className="text-xs text-outline mt-2">Adjust your filtering system keywords and retry.</p>
          </div>
        ) : (
          <div id="episodes-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
            {sortedEpisodes.map((ep) => {
              const isEpicExpanded = expandedEpisode === ep.id;
              const isCurrentlyActiveInPlayer = activeEpisode?.id === ep.id;

              const record = progressRecords[ep.id];
              const epProgress = isCurrentlyActiveInPlayer 
                ? (totalDurationSeconds > 0 ? (currentTime / totalDurationSeconds) * 100 : 0)
                : (record?.percent || 0);
              const epCurrentTime = isCurrentlyActiveInPlayer ? currentTime : (record?.currentTime || 0);
              const epDuration = isCurrentlyActiveInPlayer ? totalDurationSeconds : (record?.duration || getEpisodeDurationSeconds(ep));

              return (
                <motion.div
                  key={ep.id}
                  id={`episode-card-${ep.id}`}
                  className={`bg-surface-container-lowest border rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
                    isCurrentlyActiveInPlayer
                      ? "border-primary shadow-lg shadow-primary/5 bg-gradient-to-br from-surface-container-lowest to-primary/5"
                      : "border-outline-variant/20"
                  }`}
                  whileHover={{
                    y: -10,
                    rotateX: 3,
                    rotateY: -1.5,
                    scale: 1.02,
                    boxShadow: "0 22px 32px -8px rgba(119, 90, 25, 0.16), 0 0 20px 4px rgba(119, 90, 25, 0.1)",
                    borderColor: "rgba(119, 90, 25, 0.45)",
                  }}
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                  layout
                >
                  <div>
                    {/* Top Stats */}
                    <div className="flex items-center justify-between gap-1 mb-3.5">
                      <span className="font-mono text-[10px] text-primary font-bold px-2 py-0.5 bg-primary/10 rounded-md">
                        EP {ep.episodeNumber}
                      </span>
                      <span className="text-[10px] text-on-surface-variant font-semibold flex items-center gap-1 uppercase font-mono tracking-wider">
                        {ep.category}
                      </span>
                    </div>

                    {/* Integrated Cover Art Thumbnail */}
                    <Link to={`/podcasts/${ep.id}`} className="block relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-outline-variant/10 mb-4 bg-surface-container-high group shadow-sm">
                      <img
                        src={ep.imageUrl || `https://picsum.photos/seed/${ep.id}/600/375`}
                        alt={`${ep.title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Integrated Action & Sentiment Heatmap Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <div className="p-3">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[9px] font-mono font-bold text-white/90 tracking-widest uppercase flex items-center gap-2">
                              System Analytics
                              <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                            </span>
                            <div className="flex gap-3">
                              <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#775a19]" />
                                <span className="text-[7px] font-mono text-white/60 tracking-tighter uppercase font-bold">Dense</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a]" />
                                <span className="text-[7px] font-mono text-white/60 tracking-tighter uppercase font-bold">Fluid</span>
                              </div>
                            </div>
                          </div>
                          
                          {ep.sentimentMap ? (
                            <div className="mb-3">
                              <WaveformVisualizer 
                                isPlaying={isCurrentlyActiveInPlayer && isPlaying} 
                                sentimentData={ep.sentimentMap} 
                                progress={isCurrentlyActiveInPlayer ? (currentTime / totalDurationSeconds) : 0}
                              />
                            </div>
                          ) : (
                            <div className="h-10 mb-3 flex items-center justify-center border border-white/10 border-dashed rounded bg-white/5">
                              <WaveformVisualizer 
                                isPlaying={isCurrentlyActiveInPlayer && isPlaying} 
                                progress={isCurrentlyActiveInPlayer ? (currentTime / totalDurationSeconds) : 0}
                              />
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2 border-t border-white/10">
                            <span className="text-[9px] font-mono font-bold text-primary tracking-[0.15em] uppercase">Inspect Dossier</span>
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                              <Play className="w-3 h-3 fill-primary" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Dynamic Progress Bar Indicator */}
                    {epProgress > 0 && (
                      <div className="mt-[-8px] mb-4 bg-surface-container-low border border-outline-variant/10 rounded-xl p-2.5 shadow-sm">
                        <div className="flex items-center justify-between text-[9px] font-mono font-bold mb-1.5 px-0.5">
                          <span className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${epProgress >= 95 ? "bg-green-500" : "bg-primary"}`} />
                            {epProgress >= 95 ? (
                              <span className="text-green-600 dark:text-green-400 font-extrabold uppercase">COMPLETED</span>
                            ) : (
                              <span className="text-primary uppercase">{Math.round(epProgress)}% LISTENED</span>
                            )}
                          </span>
                          <span className="text-on-surface-variant font-semibold">
                            {formatTime(epCurrentTime)} / {formatTime(epDuration)}
                          </span>
                        </div>
                        <div className="w-full h-1 bg-outline-variant/20 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              epProgress >= 95 ? "bg-green-500" : "bg-primary"
                            }`}
                            style={{ width: `${Math.min(epProgress, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <Link to={`/podcasts/${ep.id}`} className="block hover:text-primary transition-colors group">
                      <h3 className="font-headline text-lg font-extrabold text-on-surface tracking-tight mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                        {ep.title}
                      </h3>
                    </Link>

                    {/* Brief desc */}
                    <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed mb-3">
                      {ep.summary}
                    </p>

                    {/* Speakers & Panels */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono font-medium text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded border border-outline-variant/10">
                        <User className="w-2.5 h-2.5 text-primary/75" /> Host: Sabine
                      </span>
                      {ep.guests && ep.guests.map((g) => (
                        <span key={g.name} className="inline-flex items-center gap-1 text-[9px] font-mono font-semibold text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                          Guest: {g.name}
                        </span>
                      ))}
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-[11px] text-outline mb-4 pb-4 border-b border-outline-variant/10 font-sans">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-primary/70" /> {ep.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-primary/70" /> {ep.duration}
                      </span>
                    </div>

                    {/* Expand details view */}
                    <AnimatePresence>
                      {isEpicExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-on-surface-variant/90 mb-4 bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/10 leading-relaxed overflow-hidden"
                        >
                          <strong className="block mb-1 text-on-surface">Detailed Syllabus Brief:</strong>
                          {ep.extendedDescription}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Actions Column */}
                  <div className="flex items-center justify-between gap-2 mt-4 pt-2">
                    <button
                      id={`btn-expand-details-${ep.id}`}
                      onClick={() => setExpandedEpisode(isEpicExpanded ? null : ep.id)}
                      className="text-xs font-bold text-on-surface-variant hover:text-primary flex items-center gap-1"
                    >
                      {isEpicExpanded ? "Hide Text" : "Quick Text"}{" "}
                      {isEpicExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={async () => {
                          try {
                            await likePodcast(ep.id);
                            // Optimistically update local state
                            setEpisodes(prev => prev.map(p => 
                              p.id === ep.id ? { ...p, likes: (p.likes || 0) + 1 } : p
                            ));
                          } catch (err) {
                            console.warn("Failed to like", err);
                          }
                        }}
                        className="flex items-center gap-1.5 px-3 h-9 rounded-full bg-surface-container-high text-on-surface-variant hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-95"
                        title="Like Episode"
                      >
                        <Heart className="w-4 h-4" />
                        <span className="text-xs font-mono font-bold">{ep.likes || 0}</span>
                      </button>

                      <button
                        onClick={() => {
                          setShareEpisode(ep);
                          setIsShareModalOpen(true);
                        }}
                        className="flex items-center gap-1.5 px-3 h-9 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary transition-all active:scale-95"
                        title="Share Intelligence"
                      >
                        <Share2 className="w-4 h-4" />
                        <span className="text-xs font-mono font-bold">{ep.shares || 0}</span>
                      </button>

                      <Link
                        to={`/podcasts/${ep.id}`}
                        className="text-xs font-sans font-extrabold text-primary hover:text-primary/70 uppercase tracking-widest flex items-center gap-0.5"
                        title="Comprehensive Show Notes & Transcript Study Dossier"
                      >
                        Notes
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                      
                      <button
                        id={`btn-play-card-${ep.id}`}
                        onClick={() => handlePlayEpisode(ep)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                          isCurrentlyActiveInPlayer && isPlaying
                            ? "bg-on-surface text-surface"
                            : "bg-primary text-on-primary hover:bg-primary/95 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                        }`}
                        title="Load to secure auditory player console"
                      >
                        {isCurrentlyActiveInPlayer && isPlaying ? (
                          <Pause className="w-4 h-4 fill-surface text-surface" />
                        ) : (
                          <Play className="w-4 h-4 fill-on-primary text-on-primary pl-0.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      <ShareModal 
        episode={shareEpisode}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Let's Talk Secure Communications Portal */}
      <section id="podcasts-contact-section" className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-8 md:p-12 mb-12 relative z-10 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">Secure Intel Exchange</span>
            </div>
            <h2 className="text-3xl font-headline font-black text-on-surface leading-tight mb-4">
              Connect With the Frontline Builders
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6 font-body">
              Are you looking to future-proof your risk methodologies? Secure bespoke advising from Sabine VanderLinden, or query the Tenured AI and Alchemy Crew platform architecture. Our team handles institutional integrations with absolute discretion.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-xs text-on-surface-variant">Secure, symmetric cryptographical submission lines.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-xs text-on-surface-variant">Validated routing to partners at Alchemy Crew and SAS panels.</p>
              </div>
            </div>
          </div>

          <div id="contact-form-container" className="lg:col-span-7 bg-surface-container-lowest p-6 md:p-8 rounded-2xl border border-outline-variant/10 shadow- inner-shadow">
            {formStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-headline font-bold text-on-surface mb-2">Intel Transmitted Securely!</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm mx-auto mb-6 font-body">
                  Your payload has been cryptographically signed and routed to Sabine VanderLinden's inbox. A reply will arrive on standard corridors.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="px-6 py-2.5 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/20 rounded-full text-xs font-bold text-on-surface tracking-wider uppercase"
                >
                  Establish New Pipeline
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label id="lbl-name" className="block text-[10px] font-mono uppercase tracking-widest text-outline mb-1.5 font-bold">
                      NODE ENVOY NAME *
                    </label>
                    <input
                      type="text"
                      className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 text-on-surface"
                      placeholder="Jane Doe"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label id="lbl-email" className="block text-[10px] font-mono uppercase tracking-widest text-outline mb-1.5 font-bold">
                      SECURE ROUTING EMAIL *
                    </label>
                    <input
                      type="email"
                      className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 text-on-surface"
                      placeholder="envoy@domain.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label id="lbl-company" className="block text-[10px] font-mono uppercase tracking-widest text-outline mb-1.5 font-bold">
                    CORPORATE AFFILIATION
                  </label>
                  <input
                    type="text"
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 text-on-surface"
                    placeholder="Sovereign Ventures LLC"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>

                <div>
                  <label id="lbl-message" className="block text-[10px] font-mono uppercase tracking-widest text-outline mb-1.5 font-bold">
                    TRANSMISSION PAYLOAD *
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 text-on-surface resize-none"
                    placeholder="Describe your corporate venture project, risk underwriting requirements or podcast collaboration ideas..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {formFeedback && (
                  <p className="text-xs text-error font-medium">{formFeedback}</p>
                )}

                <button
                  type="submit"
                  id="btn-submit-form"
                  disabled={formStatus !== "idle"}
                  className="w-full sm:w-auto px-8 py-3.5 bg-primary text-on-primary rounded-full font-bold uppercase tracking-widest hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/10 active:scale-95 transition-all text-xs flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-on-primary" /> Routing Intel...
                    </>
                  ) : formStatus === "signing" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-on-primary" /> CRYPTOGRAPHICALLY SIGNING LEDGER...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-on-primary" /> INITIATE CIPHER COMMUNICATOR
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Persistent Docked Audio Player Console Bar */}
      <AnimatePresence>
        {activeEpisode && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-md border-t border-outline-variant/20 py-4 px-6 md:px-12 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] transition-colors duration-300"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Left track information */}
              <div className="flex items-center gap-4 w-full md:w-1/3">
                <div className="w-12 h-12 bg-primary/15 rounded-xl flex-shrink-0 flex items-center justify-center border border-primary/20 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <Radio className="w-5 h-5 text-primary animate-pulse" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold bg-primary/10 px-1.5 py-0.5 rounded">
                      EP {activeEpisode.episodeNumber}
                    </span>
                    <span className="text-[10px] text-outline font-semibold uppercase tracking-wider truncate">
                      {activeEpisode.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-on-surface truncate mt-1 leading-tight" title={activeEpisode.title}>
                    {activeEpisode.title}
                  </h4>
                </div>
              </div>

              {/* Center controls & timeline scrub */}
              <div className="flex flex-col items-center w-full md:w-2/5 gap-2">
                <div className="flex items-center gap-4">
                  {/* Skip back */}
                  <button
                    onClick={() => handleSkip(-10)}
                    className="p-1 text-on-surface-variant hover:text-on-surface transition-colors"
                    title="-10 Seconds"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  {/* Play/Pause */}
                  <button
                    onClick={handleTogglePlay}
                    className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-105 active:scale-95 shadow-md shadow-primary/15 hover:shadow-primary/30 transition-all"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-on-primary text-on-primary" />
                    ) : (
                      <Play className="w-5 h-5 fill-on-primary text-on-primary pl-0.5" />
                    )}
                  </button>

                  {/* Skip forward */}
                  <button
                    onClick={() => handleSkip(10)}
                    className="p-1 text-on-surface-variant hover:text-on-surface transition-colors"
                    title="+10 Seconds"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                {/* Timeline slider slider-box */}
                <div className="flex items-center gap-2.5 w-full">
                  <span className="text-[10px] font-mono text-outline w-10 text-right">
                    {formatTime(currentTime)}
                  </span>
                  
                  <div className="relative flex-grow flex items-center h-5">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={currentProgressPercent}
                      onChange={handleProgressBarChange}
                      className="w-full accent-primary h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                    
                    {/* Bouncing EQ Bars Visualizer when active and playing */}
                    {isPlaying && (
                      <div className="absolute top-1/2 -translate-y-[21px] left-0 right-0 flex items-end justify-center gap-[2.5px] pointer-events-none h-3 opacity-25">
                        {[4, 8, 11, 6, 9, 5, 12, 7, 10, 4].map((height, i) => (
                          <motion.div
                            key={i}
                            className="w-[2px] bg-primary rounded-full"
                            animate={{ height: ["2px", `${height + 2}px`, "2px"] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.4 + i * 0.05,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-outline w-10">
                    {formatTime(totalDurationSeconds)}
                  </span>
                </div>
              </div>

              {/* Right secondary controls (Speed, Speech, Audio toggles) */}
              <div className="flex items-center justify-end gap-4 w-full md:w-1/3">
                {/* Speech Synthesis Briefing */}
                <button
                  onClick={handleTTSBriefing}
                  className={`py-1.5 px-3 rounded-full border border-outline-variant/30 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all ${
                    isSynthesizing
                      ? "bg-primary/20 text-primary border-primary animate-pulse"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                  }`}
                  title="Synthesize and play an AI synopsis read"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary" /> Audio Synopsis
                </button>

                {/* Speed Multiplier */}
                <button
                  onClick={() => {
                    const speeds = [1, 1.25, 1.5, 2];
                    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                    setPlaybackSpeed(speeds[nextIdx]);
                  }}
                  className="px-2 py-1 text-[10px] font-mono font-bold bg-surface-container-high border border-outline-variant/10 rounded hover:bg-surface-container-highest text-on-surface-variant transition-colors"
                  title="Auditory Transmission Multiplier"
                >
                  {playbackSpeed}x
                </button>

                {/* Mute and volume */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-error" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseInt(e.target.value));
                      if (isMuted) setIsMuted(false);
                    }}
                    className="hidden sm:inline-block w-16 accent-primary h-1 bg-surface-container-high rounded-lg cursor-pointer"
                  />
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </>
      )}
    </div>
  );
}
