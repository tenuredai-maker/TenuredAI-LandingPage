import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { db, analytics } from "../lib/firebase";
import { logEvent } from "firebase/analytics";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  getCountFromServer,
  where,
} from "firebase/firestore";
import {
  Trophy,
  Medal,
  Zap,
  User,
  Target,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  TrendingDown,
  Minus,
  Share2,
  Check,
  X,
  Shield,
  Activity,
  Fingerprint,
  Star,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useAuth } from "../context/AuthContext";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface LeaderboardUser {
  uid: string;
  displayName: string;
  photoURL: string | null;
  tenuredPoints: number;
  trajectory?: { value: number }[];
  rankTrajectory?: { day: string; rank: number }[];
  stats?: {
    aici?: number;
    aibs?: number;
    aioi?: number;
  };
}

const MILESTONES = [
  { value: 1000, label: "Initiate Node" },
  { value: 5000, label: "Architect" },
  { value: 10000, label: "Sovereign" },
];

export default function GritLeaderboard() {
  const { user, userProfile } = useAuth();
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [timeRange, setTimeRange] = useState<"all" | "month" | "week">("all");
  const [sharing, setSharing] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<
    LeaderboardUser[]
  >([]);
  const [showRankHistory, setShowRankHistory] = useState(false);
  const [recentlyUnlocked, setRecentlyUnlocked] = useState<{
    value: number;
    label: string;
  } | null>(null);
  const [showSyncToast, setShowSyncToast] = useState(false);
  const wasOffline = useRef(false);

  // Track session baseline points to show deltas
  const sessionStartPoints = useRef<Record<string, number>>({});
  const sessionStartRanks = useRef<Record<string, number>>({});
  const initialPointsRef = useRef<number | null>(null);

  // Helper to generate a mock 30-day trajectory
  const generateTrajectory = (basePoints: number) => {
    const data = [];
    let current = basePoints * 0.85; // Start lower
    for (let i = 0; i < 30; i++) {
      current += Math.random() * (basePoints * 0.015); // Small steady gains
      data.push({ value: Math.floor(current) });
    }
    return data;
  };

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "grit_leaderboard_opened");
    }
  }, []);

  // Check for milestone unlock animations
  useEffect(() => {
    if (!userProfile?.tenuredPoints) return;
    const currentPoints = userProfile.tenuredPoints;

    if (initialPointsRef.current === null) {
      initialPointsRef.current = currentPoints;
      return;
    }

    const prevPoints = initialPointsRef.current;

    const crossedMilestone = MILESTONES.find(
      (m) => currentPoints >= m.value && prevPoints < m.value,
    );

    if (crossedMilestone) {
      setRecentlyUnlocked(crossedMilestone);
      if (analytics) {
        logEvent(analytics, "milestone_unlocked", {
          value: crossedMilestone.value,
          label: crossedMilestone.label,
        });
      }
      setTimeout(() => setRecentlyUnlocked(null), 5000);
    }

    initialPointsRef.current = currentPoints;
  }, [userProfile?.tenuredPoints]);

  useEffect(() => {
    const handleOnline = () => {
      wasOffline.current = true;
    };
    const handleOffline = () => {
      wasOffline.current = true;
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    // Load baseline from localStorage to persist across refreshes during a "session"
    try {
      const stored = localStorage.getItem("tenured_session_baseline");
      if (stored) {
        sessionStartPoints.current = JSON.parse(stored);
      }
      const storedRanks = localStorage.getItem("tenured_session_ranks");
      if (storedRanks) {
        sessionStartRanks.current = JSON.parse(storedRanks);
      }
    } catch (e) {
      console.error("Failed to load session baseline:", e);
    }

    // 1. Fetch Top 5 Users
    const usersRef = collection(db, "users");
    const qTop = query(usersRef, orderBy("tenuredPoints", "desc"), limit(5));

    const unsubscribeTop = onSnapshot(
      qTop,
      { includeMetadataChanges: true },
      (snapshot) => {
        if (!snapshot.metadata.fromCache && wasOffline.current) {
          setShowSyncToast(true);
          wasOffline.current = false;
          setTimeout(() => setShowSyncToast(false), 3000);
        }

        const topUsers = snapshot.docs.map((doc, index) => {
          const data = doc.data();
          const finalRank = index + 1;
          const uid = doc.id;

          let currentRank = finalRank + 5 + (uid.charCodeAt(0) % 10);
          const rankTrajectory = [];
          const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
          for (let i = 0; i < 6; i++) {
            currentRank = Math.max(
              finalRank,
              currentRank - Math.floor(Math.random() * 3),
            );
            rankTrajectory.push({ day: days[i], rank: currentRank });
          }
          rankTrajectory.push({ day: "Today", rank: finalRank });

          return {
            uid: doc.id,
            ...data,
            trajectory: generateTrajectory(data.tenuredPoints || 0),
            rankTrajectory,
          };
        }) as LeaderboardUser[];

        // Update baseline for new users found
        topUsers.forEach((u, index) => {
          if (sessionStartPoints.current[u.uid] === undefined) {
            sessionStartPoints.current[u.uid] = u.tenuredPoints;
          }
          if (sessionStartRanks.current[u.uid] === undefined) {
            sessionStartRanks.current[u.uid] = index + 1;
          }
        });

        // Persist baseline
        localStorage.setItem(
          "tenured_session_baseline",
          JSON.stringify(sessionStartPoints.current),
        );
        localStorage.setItem(
          "tenured_session_ranks",
          JSON.stringify(sessionStartRanks.current),
        );

        setUsers(topUsers);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching leaderboard:", error);
        setLoading(false);
      },
    );

    return () => unsubscribeTop();
  }, [timeRange]); // Re-subscribe if range changes (mocking actual filters)

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "grit_leaderboard_filter_changed", {
        time_range: timeRange,
      });
    }
  }, [timeRange]);

  // 2. Fetch Current User's Rank
  useEffect(() => {
    if (!user || userProfile?.tenuredPoints === undefined) {
      setUserRank(null);
      return;
    }

    const calculateRank = async () => {
      try {
        const usersRef = collection(db, "users");
        // Count users with more points than current user
        const qRank = query(
          usersRef,
          where("tenuredPoints", ">", userProfile.tenuredPoints),
        );
        const snapshot = await getCountFromServer(qRank);
        const rank = snapshot.data().count + 1;
        setUserRank(rank);
      } catch (error) {
        console.error("Error calculating rank:", error);
      }
    };

    calculateRank();
  }, [user, userProfile?.tenuredPoints]);

  const handleShare = async () => {
    if (!user || userRank === null) return;

    if (analytics) {
      logEvent(analytics, "grit_leaderboard_share", {
        rank: userRank,
        points: userProfile?.tenuredPoints,
      });
    }

    const text = `Sovereign Architecture Verified: I am currently Rank #${userRank} on the @TenuredAI Grit Leaderboard with ${userProfile?.tenuredPoints?.toLocaleString()} points. The Human Moat expands. #TenuredAI #SovereignWorkforce`;

    setSharing(true);

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Tenured AI Grit Rank",
          text: text,
          url: window.location.origin,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error("Error copying:", err);
      }
    }

    setTimeout(() => setSharing(false), 2000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 15 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.2 },
    },
  };

  const layoutTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1,
  };

  if (loading) {
    return (
      <div className="bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/10 animate-pulse h-[400px] flex items-center justify-center">
        <span className="text-on-surface-variant font-mono text-[10px] uppercase tracking-widest">
          Calibrating Leaderboard...
        </span>
      </div>
    );
  }

  return (
    <div
      id="grit-leaderboard-section"
      className="bg-surface-container-low rounded-[2.5rem] border border-outline-variant/20 p-8 shadow-xl relative overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <AnimatePresence>
        {showSyncToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-4 py-3 rounded-xl flex items-center gap-3 backdrop-blur-md shadow-[0_4px_20px_rgba(16,185,129,0.15)]"
          >
            <Zap className="w-4 h-4 text-emerald-500" />
            <div className="flex flex-col">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-500">
                Network Restored
              </span>
              <span className="text-[10px] font-medium opacity-80">
                Telemetry re-synced successfully.
              </span>
            </div>
            <button
              onClick={() => setShowSyncToast(false)}
              className="ml-2 p-1 rounded-md hover:bg-emerald-500/10 transition-colors"
            >
              <X className="w-4 h-4 opacity-50 hover:opacity-100" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 space-y-8">
        {/* Milestone Pop-up Overlay */}
        <AnimatePresence>
          {recentlyUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute top-0 left-0 right-0 z-50 p-4 bg-primary text-on-primary rounded-2xl shadow-xl border border-primary-container shadow-primary/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-on-primary/20 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-on-primary fill-on-primary" />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-lg">
                    Milestone Unlocked!
                  </h4>
                  <p className="text-sm font-mono opacity-90">
                    {recentlyUnlocked.value.toLocaleString()} PTS:{" "}
                    {recentlyUnlocked.label}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.2em]">
                The Human Moat
              </span>
              {user && userRank && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-1"
                >
                  <Target className="w-2.5 h-2.5 text-primary" />
                  <span className="text-[9px] font-mono font-black text-primary uppercase">
                    Rank #{userRank}
                  </span>
                </motion.div>
              )}
            </div>
            <h3 className="text-2xl font-headline font-black text-on-surface tracking-tighter">
              Grit Leaderboard
            </h3>
          </div>
          <Trophy className="w-8 h-8 text-primary opacity-50" />
        </div>

        {/* Time Range Toggle */}
        <div className="flex bg-surface-container-high p-1.5 rounded-2xl w-full border border-outline-variant/10">
          {(["all", "month", "week"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                "relative flex-1 py-2.5 text-[9px] font-mono font-black uppercase tracking-[0.1em] rounded-xl transition-all duration-300",
                timeRange === range
                  ? "text-primary z-10"
                  : "text-on-surface-variant/40 hover:text-on-surface-variant/60",
              )}
            >
              {timeRange === range && (
                <motion.div
                  layoutId="activeRange"
                  className="absolute inset-0 bg-surface-container-lowest shadow-sm rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-20">
                {range === "all"
                  ? "All Time"
                  : range === "month"
                    ? "This Month"
                    : "This Week"}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {showRankHistory && user && userRank !== null ? (
            <motion.div
              key="rank-history"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full h-[400px] p-6 bg-surface-container-high rounded-3xl border border-outline-variant/20 relative overflow-hidden"
            >
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.2em] block mb-1">
                    Weekly Telemetry
                  </span>
                  <h4 className="text-xl font-headline font-black text-on-surface">
                    Rank Progression
                  </h4>
                </div>
                <Activity className="w-5 h-5 text-primary opacity-50" />
              </div>
              <div className="w-full h-full pt-16 pb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { day: "Mon", rank: userRank + 14 },
                      { day: "Tue", rank: userRank + 11 },
                      { day: "Wed", rank: userRank + 8 },
                      { day: "Thu", rank: userRank + 5 },
                      { day: "Fri", rank: userRank + 3 },
                      { day: "Sat", rank: userRank + 1 },
                      { day: "Today", rank: userRank },
                    ]}
                    margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(var(--outline-variant), 0.1)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "rgba(var(--on-surface-variant), 0.5)",
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                      dy={10}
                    />
                    <YAxis
                      reversed
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "rgba(var(--on-surface-variant), 0.5)",
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                      dx={-10}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor:
                          "rgba(var(--surface-container-high), 0.9)",
                        border: "1px solid rgba(var(--outline-variant), 0.2)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }}
                      itemStyle={{
                        color: "var(--primary)",
                        fontFamily: "monospace",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                      labelStyle={{
                        color: "rgba(var(--on-surface-variant), 0.7)",
                        fontFamily: "monospace",
                        fontSize: "10px",
                        textTransform: "uppercase",
                      }}
                      formatter={(value: number) => [
                        `Rank #${value}`,
                        "Position",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="rank"
                      stroke="#775a19"
                      strokeWidth={3}
                      dot={{
                        fill: "rgba(var(--surface-container-high), 1)",
                        stroke: "#775a19",
                        strokeWidth: 2,
                        r: 4,
                      }}
                      activeDot={{
                        fill: "#775a19",
                        stroke: "rgba(var(--surface-container-high), 1)",
                        strokeWidth: 2,
                        r: 6,
                      }}
                      isAnimationActive={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={timeRange}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="space-y-4"
            >
              {users.map((user, index) => {
                const baseline =
                  sessionStartPoints.current[user.uid] ?? user.tenuredPoints;
                const delta = user.tenuredPoints - baseline;

                const startingRank =
                  sessionStartRanks.current[user.uid] ?? index + 1;
                const rankDelta = startingRank - (index + 1);

                return (
                  <motion.div
                    key={user.uid}
                    layout
                    variants={itemVariants}
                    transition={{
                      layout: layoutTransition,
                      opacity: { duration: 0.2 },
                    }}
                    whileHover={{
                      scale: 1.01,
                      backgroundColor: "rgba(var(--primary), 0.03)",
                    }}
                    onClick={() => {
                      if (analytics) {
                        logEvent(analytics, "grit_leaderboard_compare_user", {
                          target_uid: user.uid,
                        });
                      }
                      setSelectedForComparison((prev) => {
                        if (prev.find((u) => u.uid === user.uid)) {
                          return prev.filter((u) => u.uid !== user.uid);
                        }
                        if (prev.length === 1) {
                          return [...prev, user];
                        }
                        return [user];
                      });
                    }}
                    className={cn(
                      "group relative p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer",
                      selectedForComparison.some((u) => u.uid === user.uid)
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10 scale-[1.01]"
                        : index === 0
                          ? "bg-surface-container-lowest border-primary/30 shadow-lg shadow-primary/5"
                          : "bg-surface-container-lowest border-outline-variant/10 hover:border-primary/20",
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl overflow-hidden border flex items-center justify-center transition-transform group-hover:scale-105",
                            index === 0
                              ? "border-primary/40 bg-primary/5"
                              : "border-outline-variant/20 bg-surface-container-high",
                          )}
                        >
                          {user.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt={user.displayName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-6 h-6 text-on-surface-variant/40" />
                          )}
                        </div>
                        {index < 3 && (
                          <div
                            className={cn(
                              "absolute -top-2 -left-2 w-6 h-6 rounded-lg flex items-center justify-center shadow-lg border border-white/20",
                              index === 0
                                ? "bg-amber-500 text-white"
                                : index === 1
                                  ? "bg-slate-400 text-white"
                                  : "bg-amber-700 text-white",
                            )}
                          >
                            {index === 0 ? (
                              <Medal className="w-3.5 h-3.5" />
                            ) : (
                              <span className="text-[10px] font-bold">
                                {index + 1}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Rank Delta Badge */}
                        {rankDelta !== 0 && (
                          <motion.div
                            key={`rank-delta-${rankDelta}-${user.uid}`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{
                              opacity: 1,
                              scale: rankDelta > 0 ? [1, 1.3, 1] : 1,
                              boxShadow:
                                rankDelta > 0
                                  ? [
                                      "0px 0px 0px 0px rgba(16, 185, 129, 0.8)",
                                      "0px 0px 0px 6px rgba(16, 185, 129, 0)",
                                      "0px 0px 0px 0px rgba(16, 185, 129, 0)",
                                    ]
                                  : "0px 1px 2px 0px rgba(0,0,0,0.05)",
                            }}
                            transition={{
                              duration: 0.6,
                              ease: "easeOut",
                              repeat: rankDelta > 0 ? 2 : 0,
                              repeatDelay: 0.1,
                            }}
                            className={cn(
                              "absolute -bottom-1 -right-1 px-1 py-0.5 rounded-md text-[8px] font-mono font-black border flex items-center gap-0.5 z-10",
                              rankDelta > 0
                                ? "bg-emerald-500 text-white border-emerald-400"
                                : "bg-rose-500 text-white border-rose-400",
                            )}
                          >
                            {rankDelta > 0 ? (
                              <ArrowUp className="w-2 h-2 stroke-[3]" />
                            ) : (
                              <ArrowDown className="w-2 h-2 stroke-[3]" />
                            )}
                            {Math.abs(rankDelta)}
                          </motion.div>
                        )}
                      </div>

                      <div>
                        <h4 className="font-bold text-on-surface text-sm truncate max-w-[120px]">
                          {user.displayName}
                        </h4>
                        <p className="text-[10px] font-mono font-bold text-on-surface-variant/40 uppercase tracking-widest">
                          {index === 0
                            ? "Supreme Citizen"
                            : index === 1
                              ? "Vanguard"
                              : "Node Contributor"}
                        </p>
                      </div>
                    </div>

                    <div className="hidden md:flex flex-1 mx-8 h-12 flex-col justify-center items-center">
                      {user.rankTrajectory &&
                        (() => {
                          const firstRank = user.rankTrajectory[0].rank;
                          const lastRank =
                            user.rankTrajectory[user.rankTrajectory.length - 1]
                              .rank;
                          const isImproved = firstRank > lastRank;
                          const isDeclined = firstRank < lastRank;
                          const hasChanged = firstRank !== lastRank;

                          const color = isImproved
                            ? "#10b981"
                            : isDeclined
                              ? "#f43f5e"
                              : "#8b949e";
                          const IndicatorIcon = isImproved
                            ? TrendingUp
                            : isDeclined
                              ? TrendingDown
                              : Minus;

                          return (
                            <>
                              <div className="w-full h-8">
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={user.rankTrajectory}>
                                    <Line
                                      type="monotone"
                                      dataKey="rank"
                                      stroke={color}
                                      strokeWidth={2}
                                      dot={false}
                                      isAnimationActive={true}
                                    />
                                    <YAxis
                                      reversed
                                      hide
                                      domain={["dataMin - 1", "dataMax + 1"]}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                              <div
                                className={cn(
                                  "flex items-center gap-1 text-[8px] font-mono font-bold uppercase",
                                  isImproved
                                    ? "text-emerald-500"
                                    : isDeclined
                                      ? "text-rose-500"
                                      : "text-on-surface-variant/40",
                                )}
                              >
                                <IndicatorIcon className="w-2.5 h-2.5" />
                                <span>
                                  {isImproved
                                    ? "Improved"
                                    : isDeclined
                                      ? "Declined"
                                      : "Stable"}
                                </span>
                              </div>
                            </>
                          );
                        })()}
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Rank Trajectory Tooltip on Hover */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[140px] bg-surface-container-lowest border border-outline-variant/20 shadow-2xl shadow-primary/5 rounded-2xl p-4 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-300 z-50 flex flex-col">
                        <div className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                          <Activity className="w-3 h-3" />
                          Rank Trajectory
                        </div>
                        <div className="flex-1 w-full -ml-4 -mb-4">
                          {user.rankTrajectory && (
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={user.rankTrajectory}
                                margin={{
                                  top: 5,
                                  right: 10,
                                  left: 10,
                                  bottom: 5,
                                }}
                              >
                                <Line
                                  type="monotone"
                                  dataKey="rank"
                                  stroke="#775a19"
                                  strokeWidth={2}
                                  dot={{
                                    fill: "rgba(var(--surface-container-lowest), 1)",
                                    stroke: "#775a19",
                                    strokeWidth: 2,
                                    r: 3,
                                  }}
                                  isAnimationActive={false}
                                />
                                <YAxis
                                  reversed
                                  hide
                                  domain={["dataMin - 1", "dataMax + 1"]}
                                />
                                <XAxis
                                  dataKey="day"
                                  axisLine={false}
                                  tickLine={false}
                                  tick={{
                                    fill: "rgba(var(--on-surface-variant), 0.5)",
                                    fontSize: 8,
                                    fontFamily: "monospace",
                                    fontWeight: "bold",
                                  }}
                                  dy={5}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                      </div>

                      {delta !== 0 && (
                        <motion.div
                          key={`delta-${delta}-${user.uid}`}
                          initial={{ scale: 0 }}
                          animate={{
                            scale: delta > 0 ? [1, 1.15, 1] : 1,
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: delta > 0 ? 2 : 0,
                            repeatDelay: 0.1,
                          }}
                          className={cn(
                            "flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg text-[9px] font-mono font-black border",
                            delta > 0
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.25)]"
                              : "bg-rose-500/10 text-rose-500 border-rose-500/20",
                          )}
                        >
                          {delta > 0 ? (
                            <ArrowUp className="w-2.5 h-2.5" />
                          ) : (
                            <ArrowDown className="w-2.5 h-2.5" />
                          )}
                          {Math.abs(delta)}
                        </motion.div>
                      )}

                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1.5 text-primary font-mono font-black text-lg">
                          <Zap
                            className={cn(
                              "w-4 h-4 fill-primary",
                              index === 0 && "animate-pulse",
                            )}
                          />
                          {user.tenuredPoints.toLocaleString()}
                        </div>
                        <span className="text-[9px] font-mono font-bold text-on-surface-variant/30 uppercase tracking-[0.2em]">
                          TENURED POINTS
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-4 border-t border-outline-variant/10 space-y-3">
          {/* Achievements Container */}
          {user &&
            userProfile &&
            (() => {
              const currentPoints = userProfile.tenuredPoints || 0;
              const nextMilestone = MILESTONES.find(
                (m) => m.value > currentPoints,
              );
              const pointsNeeded = nextMilestone
                ? nextMilestone.value - currentPoints
                : 0;
              const prevMilestoneValue =
                MILESTONES.slice()
                  .reverse()
                  .find((m) => m.value <= currentPoints)?.value || 0;

              const progressToNext = nextMilestone
                ? Math.max(
                    0,
                    Math.min(
                      100,
                      ((currentPoints - prevMilestoneValue) /
                        (nextMilestone.value - prevMilestoneValue)) *
                        100,
                    ),
                  )
                : 100;

              return (
                <div className="mb-6 p-4 rounded-2xl bg-surface-container-high/50 border border-outline-variant/10">
                  <div className="flex items-center gap-2 mb-4">
                    <Medal className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-[0.2em]">
                      Milestone Achievements
                    </span>
                  </div>

                  {/* Progress to Next Tier */}
                  <div className="flex flex-col gap-2 mb-6 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/10 shadow-inner">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-bold text-on-surface uppercase tracking-widest">
                        {nextMilestone
                          ? `Next Tier: ${nextMilestone.label}`
                          : "Max Tier Reached"}
                      </span>
                      {nextMilestone && (
                        <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
                          {pointsNeeded.toLocaleString()} PTS Needed
                        </span>
                      )}
                    </div>
                    {nextMilestone && (
                      <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${progressToNext}%` }}
                          transition={{
                            duration: 1.5,
                            delay: 0.3,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center gap-2">
                    {MILESTONES.map((milestone, idx) => {
                      const isUnlocked = currentPoints >= milestone.value;
                      const progress = isUnlocked
                        ? 100
                        : Math.min(
                            100,
                            (currentPoints / milestone.value) * 100,
                          );

                      return (
                        <div
                          key={idx}
                          className="flex-1 flex flex-col items-center"
                        >
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 mb-2 shadow-sm relative",
                              isUnlocked
                                ? "bg-primary/20 border-primary text-primary"
                                : "bg-surface-container-lowest border-outline-variant/20 text-on-surface-variant/30",
                            )}
                          >
                            {isUnlocked ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 20,
                                }}
                              >
                                <Star className="w-5 h-5 fill-primary" />
                              </motion.div>
                            ) : (
                              <Zap className="w-4 h-4 opacity-50" />
                            )}
                            {!isUnlocked && progress > 0 && (
                              <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle
                                  className="text-primary/10"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  fill="transparent"
                                  r="18"
                                  cx="18"
                                  cy="18"
                                />
                                <circle
                                  className="text-primary transition-all duration-1000"
                                  strokeWidth="2"
                                  strokeDasharray={`${(progress / 100) * (2 * Math.PI * 18)} 999`}
                                  strokeLinecap="round"
                                  stroke="currentColor"
                                  fill="transparent"
                                  r="18"
                                  cx="18"
                                  cy="18"
                                />
                              </svg>
                            )}
                          </div>
                          <span
                            className={cn(
                              "text-[9px] font-mono font-bold uppercase tracking-widest text-center",
                              isUnlocked
                                ? "text-primary"
                                : "text-on-surface-variant/50",
                            )}
                          >
                            {milestone.value / 1000}K
                          </span>
                          <span
                            className={cn(
                              "text-[8px] font-mono text-center tracking-tight mt-0.5",
                              isUnlocked
                                ? "text-on-surface"
                                : "text-on-surface-variant/40",
                            )}
                          >
                            {milestone.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

          {user && userRank !== null && (
            <button
              onClick={handleShare}
              className={cn(
                "w-full py-3 rounded-xl border flex items-center justify-center gap-2 text-[10px] font-mono font-black uppercase tracking-[0.25em] transition-all duration-300",
                sharing
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                  : "border-primary text-on-surface hover:bg-primary/5",
              )}
            >
              {sharing ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Ledger Shared</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share My Rank</span>
                </>
              )}
            </button>
          )}
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl border border-primary/20 text-[10px] font-mono font-black uppercase tracking-[0.25em] text-primary hover:bg-primary/5 transition-colors">
              Analyze Global Ledger
            </button>
            {user && userRank !== null && (
              <button
                onClick={() => {
                  if (analytics) {
                    logEvent(analytics, "grit_leaderboard_view_rank_history", {
                      showing: !showRankHistory,
                    });
                  }
                  setShowRankHistory(!showRankHistory);
                }}
                className={cn(
                  "flex-1 py-3 rounded-xl border text-[10px] font-mono font-black uppercase tracking-[0.25em] transition-colors",
                  showRankHistory
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-primary/20 text-primary hover:bg-primary/5",
                )}
              >
                {showRankHistory ? "Hide Rank History" : "View Rank History"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
      <AnimatePresence>
        {selectedForComparison.length === 2 && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedForComparison([])}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-surface-container-low rounded-[2rem] md:rounded-[3rem] border border-outline-variant/20 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedForComparison([])}
                className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-surface-container-high border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors z-20"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="grid lg:grid-cols-2 overflow-y-auto">
                {/* Left Side: Identity Info */}
                <div className="p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-outline-variant/10 space-y-8 md:space-y-12">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.4em] block mb-4">
                      Neural Comparison Mode
                    </span>
                    <h2 className="text-4xl font-headline font-black text-on-surface tracking-tighter leading-none mb-2">
                      Proving Ground Analysis
                    </h2>
                    <p className="text-sm text-on-surface-variant font-mono uppercase tracking-widest opacity-50">
                      Sovereign Ledger Node Evaluation
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-6 p-4 rounded-2xl bg-surface-container-high/40 border border-outline-variant/10">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                        {selectedForComparison[0].photoURL ? (
                          <img
                            src={selectedForComparison[0].photoURL}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-8 h-8 text-primary" />
                        )}
                      </div>
                      <div>
                        <span className="text-[9px] font-mono font-black text-primary uppercase block mb-1">
                          NODE_
                          {selectedForComparison[0].uid
                            .slice(0, 2)
                            .toUpperCase()}
                        </span>
                        <h4 className="text-xl font-headline font-bold text-on-surface">
                          {selectedForComparison[0].displayName}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Zap className="w-3 h-3 text-primary fill-primary" />
                          <span className="text-xs font-mono font-bold text-on-surface-variant uppercase">
                            {selectedForComparison[0].tenuredPoints?.toLocaleString() ||
                              0}{" "}
                            PTS
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center py-2">
                      <div className="h-px flex-1 bg-outline-variant/10" />
                      <span className="px-4 text-[10px] font-mono font-black text-primary/40 uppercase">
                        VS
                      </span>
                      <div className="h-px flex-1 bg-outline-variant/10" />
                    </div>

                    <div className="flex items-center gap-6 p-4 rounded-2xl bg-primary/5 border border-primary/20 shadow-lg shadow-primary/5">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                        {selectedForComparison[1].photoURL ? (
                          <img
                            src={selectedForComparison[1].photoURL}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-8 h-8 text-primary" />
                        )}
                      </div>
                      <div>
                        <span className="text-[9px] font-mono font-black text-primary uppercase block mb-1">
                          TARGET (NODE_
                          {selectedForComparison[1].uid
                            .slice(0, 2)
                            .toUpperCase()}
                          )
                        </span>
                        <h4 className="text-xl font-headline font-bold text-on-surface">
                          {selectedForComparison[1].displayName}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Zap className="w-3 h-3 text-primary fill-primary" />
                          <span className="text-xs font-mono font-bold text-on-surface-variant uppercase">
                            {selectedForComparison[1].tenuredPoints.toLocaleString()}{" "}
                            PTS
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <div className="flex items-center gap-3 text-on-surface-variant opacity-40">
                      <Fingerprint className="w-5 h-5" />
                      <span className="text-[10px] font-mono uppercase tracking-widest">
                        Verification: IMMUTABLE_LEDGER_ENTRY
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Radar Chart */}
                {(() => {
                  const hash1 = (selectedForComparison[0].uid || "A")
                    .split("")
                    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
                  const hash2 = (selectedForComparison[1].uid || "B")
                    .split("")
                    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

                  const dataA = [
                    { subject: "Arch", val: 50 + (hash1 % 50) },
                    { subject: "Velocity", val: 50 + ((hash1 * 2) % 50) },
                    { subject: "Resil", val: 50 + ((hash1 * 3) % 50) },
                    { subject: "Sync", val: 50 + ((hash1 * 4) % 50) },
                    { subject: "Orch", val: 50 + ((hash1 * 5) % 50) },
                    { subject: "Ethics", val: 50 + ((hash1 * 6) % 50) },
                  ];

                  const dataB = [
                    { subject: "Arch", val: 50 + (hash2 % 50) },
                    { subject: "Velocity", val: 50 + ((hash2 * 2) % 50) },
                    { subject: "Resil", val: 50 + ((hash2 * 3) % 50) },
                    { subject: "Sync", val: 50 + ((hash2 * 4) % 50) },
                    { subject: "Orch", val: 50 + ((hash2 * 5) % 50) },
                    { subject: "Ethics", val: 50 + ((hash2 * 6) % 50) },
                  ];

                  return (
                    <div className="p-6 md:p-8 flex flex-col justify-center items-center bg-surface-container-lowest/50 relative">
                      <div className="absolute top-4 left-6 md:top-8 md:left-10 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.2em]">
                          Neural Competence Web
                        </span>
                      </div>

                      <div className="w-full mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-2">
                        <div className="h-[250px] flex flex-col">
                          <ResponsiveContainer width="100%" height="85%">
                            <RadarChart
                              cx="50%"
                              cy="50%"
                              outerRadius="65%"
                              data={dataA}
                            >
                              <PolarGrid stroke="#6b7280" strokeOpacity={0.1} />
                              <PolarAngleAxis
                                dataKey="subject"
                                tick={{
                                  fill: "rgba(var(--on-surface-variant), 0.7)",
                                  fontSize: 8,
                                  fontWeight: 700,
                                  fontFamily: "monospace",
                                }}
                              />
                              <PolarRadiusAxis
                                angle={30}
                                domain={[0, 100]}
                                tick={false}
                                axisLine={false}
                              />
                              <Radar
                                name="Node 1"
                                dataKey="val"
                                stroke="#8b949e"
                                fill="#8b949e"
                                fillOpacity={0.2}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                          <div className="text-center mt-3">
                            <span className="text-[9px] font-mono font-bold uppercase text-on-surface-variant tracking-wider bg-surface-container-high px-3 py-1 rounded-sm border border-outline-variant/10">
                              {selectedForComparison[0].displayName}
                            </span>
                          </div>
                        </div>

                        <div className="h-[250px] flex flex-col">
                          <ResponsiveContainer width="100%" height="85%">
                            <RadarChart
                              cx="50%"
                              cy="50%"
                              outerRadius="65%"
                              data={dataB}
                            >
                              <PolarGrid stroke="#775a19" strokeOpacity={0.2} />
                              <PolarAngleAxis
                                dataKey="subject"
                                tick={{
                                  fill: "rgba(var(--primary), 0.7)",
                                  fontSize: 8,
                                  fontWeight: 700,
                                  fontFamily: "monospace",
                                }}
                              />
                              <PolarRadiusAxis
                                angle={30}
                                domain={[0, 100]}
                                tick={false}
                                axisLine={false}
                              />
                              <Radar
                                name="Node 2"
                                dataKey="val"
                                stroke="#775a19"
                                fill="#775a19"
                                fillOpacity={0.3}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                          <div className="text-center mt-3">
                            <span className="text-[9px] font-mono font-bold uppercase text-primary tracking-wider bg-primary/10 px-3 py-1 rounded-sm border border-primary/20">
                              {selectedForComparison[1].displayName}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 text-center">
                        <p className="text-[10px] text-on-surface-variant/40 font-mono italic max-w-[280px] mx-auto">
                          Side-by-side skill array comparison indicates{" "}
                          {hash1 % 50 > hash2 % 50
                            ? `${selectedForComparison[0].displayName}'s superior architecture scaling`
                            : `${selectedForComparison[1].displayName}'s stronger system orchestration`}
                          .
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
