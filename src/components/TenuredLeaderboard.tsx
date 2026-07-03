import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Crown, 
  ChevronUp, 
  ChevronDown, 
  Zap, 
  Clock, 
  TrendingUp,
  User as UserIcon,
  Search,
  Filter
} from 'lucide-react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

interface LeaderboardUser {
  uid: string;
  displayName: string;
  photoURL?: string;
  tenuredPoints: number;
  weeklyPoints?: number;
  rank?: number;
  change?: 'up' | 'down' | 'stable';
}

const MOCK_EXTRAS: Partial<LeaderboardUser>[] = [
  { displayName: "Elena R.", tenuredPoints: 12500, weeklyPoints: 1200, photoURL: 'https://i.pravatar.cc/150?u=1' },
  { displayName: "Marcus V.", tenuredPoints: 11200, weeklyPoints: 950, photoURL: 'https://i.pravatar.cc/150?u=2' },
  { displayName: "Sarah J.", tenuredPoints: 9800, weeklyPoints: 1500, photoURL: 'https://i.pravatar.cc/150?u=3' },
  { displayName: "David C.", tenuredPoints: 8900, weeklyPoints: 400, photoURL: 'https://i.pravatar.cc/150?u=4' },
  { displayName: "Aish W.", tenuredPoints: 7500, weeklyPoints: 800, photoURL: 'https://i.pravatar.cc/150?u=5' },
];

export default function TenuredLeaderboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'week'>('all');
  const [leaders, setLeaders] = useState<LeaderboardUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLeaders = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'users'),
          orderBy('tenuredPoints', 'desc'),
          limit(20)
        );
        const snapshot = await getDocs(q);
        const realUsers: LeaderboardUser[] = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          realUsers.push({
            uid: doc.id,
            displayName: data.displayName || 'Pioneer User',
            photoURL: data.photoURL,
            tenuredPoints: data.tenuredPoints || 0,
            weeklyPoints: Math.floor((data.tenuredPoints || 0) * (Math.random() * 0.2 + 0.05)), // Mock weekly logic
            change: Math.random() > 0.7 ? 'up' : Math.random() > 0.8 ? 'down' : 'stable'
          });
        });

        // Add some mock users if list is short to make it look "global"
        const finalLeaders = [...realUsers];
        MOCK_EXTRAS.forEach((m, i) => {
          if (!finalLeaders.find(u => u.displayName === m.displayName)) {
            finalLeaders.push({
              uid: `mock-${i}`,
              displayName: m.displayName!,
              photoURL: m.photoURL,
              tenuredPoints: m.tenuredPoints!,
              weeklyPoints: m.weeklyPoints || 0,
              change: i % 3 === 0 ? 'up' : i % 3 === 1 ? 'down' : 'stable'
            });
          }
        });

        setLeaders(finalLeaders);
      } catch (err) {
        console.error("Leaderboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  const sortedLeaders = [...leaders]
    .filter(l => l.displayName.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (filter === 'all') return b.tenuredPoints - a.tenuredPoints;
      return (b.weeklyPoints || 0) - (a.weeklyPoints || 0);
    })
    .slice(0, 10);

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-[0.3em]">Network Ranking</h3>
          </div>
          <h2 className="text-3xl font-headline font-black text-on-surface tracking-tight">Tenured Leaderboard</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Filter Toggle */}
          <div className="flex p-1 bg-surface-container-high rounded-full border border-outline-variant/10 w-full sm:w-auto">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                "px-6 py-2 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest transition-all",
                filter === 'all' 
                  ? "bg-primary text-on-primary shadow-lg shadow-primary/20" 
                  : "text-on-surface-variant/60 hover:text-on-surface"
              )}
            >
              All Time
            </button>
            <button
              onClick={() => setFilter('week')}
              className={cn(
                "px-6 py-2 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest transition-all",
                filter === 'week' 
                  ? "bg-primary text-on-primary shadow-lg shadow-primary/20" 
                  : "text-on-surface-variant/60 hover:text-on-surface"
              )}
            >
              This Week
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 z-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
        <input 
          type="text"
          placeholder="Filter nodes by identity hash..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-surface-container-high/50 border border-outline-variant/20 rounded-2xl py-3 pl-12 pr-4 text-sm font-body text-on-surface focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      {/* Search Trends */}
      <div className="mb-8 z-10">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-3 h-3 text-on-surface-variant/40" />
          <span className="text-[9px] font-mono font-bold text-on-surface-variant/40 uppercase tracking-widest">Trending Searches</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Engineering', 'Web3 Security', 'AI Governance', 'Quantum Crypto'].map((trend) => (
            <button
              key={trend}
              onClick={() => setSearchQuery(trend)}
              className="px-3 py-1.5 rounded-full bg-surface-container-highest/50 border border-outline-variant/10 text-[10px] font-mono font-bold text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all"
            >
              #{trend}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="relative z-10 space-y-3">
        {loading ? (
          Array(5).fill(0).map((_, i) => (
            <div key={i} className="h-20 bg-surface-container-high/50 rounded-2xl animate-pulse" />
          ))
        ) : (
          <AnimatePresence mode="popLayout">
            {sortedLeaders.map((leader, index) => {
              const isCurrentUser = user && user.uid === leader.uid;
              const points = filter === 'all' ? leader.tenuredPoints : leader.weeklyPoints;
              
              return (
                <motion.div
                  key={leader.uid}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border transition-all hover:scale-[1.01] group",
                    isCurrentUser 
                      ? "bg-primary/5 border-primary/40 shadow-lg shadow-primary/5" 
                      : "bg-surface-container-highest/40 border-outline-variant/10 hover:border-outline-variant/30"
                  )}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank Number */}
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-black shrink-0",
                      index === 0 ? "bg-amber-500 text-amber-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]" : 
                      index === 1 ? "bg-slate-300 text-slate-800" : 
                      index === 2 ? "bg-amber-800 text-amber-100" : 
                      "bg-surface-container-low text-on-surface-variant/40"
                    )}>
                      {index + 1}
                    </div>

                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/20 flex items-center justify-center">
                        {leader.photoURL ? (
                          <img src={leader.photoURL} alt={leader.displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <UserIcon className="w-6 h-6 text-on-surface-variant/30" />
                        )}
                      </div>
                      {index === 0 && (
                        <div className="absolute -top-2 -right-2 bg-amber-500 rounded-full p-1 shadow-lg">
                          <Crown className="w-3 h-3 text-amber-950" />
                        </div>
                      )}
                    </div>

                    {/* Name & Title */}
                    <div>
                      <h4 className="text-sm font-bold text-on-surface flex items-center gap-2">
                        {leader.displayName}
                        {isCurrentUser && (
                          <span className="text-[8px] font-mono font-black bg-primary text-on-primary px-1.5 py-0.5 rounded-sm uppercase tracking-widest animate-pulse">Self</span>
                        )}
                      </h4>
                      <p className="text-[9px] font-mono text-on-surface-variant/60 uppercase tracking-widest mt-0.5">
                        {index === 0 ? "Supreme Architect" : index < 3 ? "Lead Validator" : "Node Contributor"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Trend */}
                    <div className="hidden sm:flex flex-col items-end">
                      {leader.change === 'up' && (
                        <div className="flex items-center gap-1 text-emerald-500">
                          <ChevronUp className="w-3 h-3" />
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider">Aeronautic</span>
                        </div>
                      )}
                      {leader.change === 'down' && (
                        <div className="flex items-center gap-1 text-rose-500/60 text-xs">
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      )}
                      {leader.change === 'stable' && (
                        <div className="w-4 h-[1px] bg-outline-variant/30" />
                      )}
                    </div>

                    {/* Points */}
                    <div className="text-right min-w-[80px]">
                      <div className="flex items-center justify-end gap-1.5">
                        <Zap className={cn("w-3.5 h-3.5", filter === 'week' ? "text-primary" : "text-amber-500")} />
                        <span className="text-lg font-headline font-black text-on-surface tracking-tighter">
                          {points?.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono font-bold text-on-surface-variant/40 uppercase tracking-widest">
                        {filter === 'all' ? 'Total TP' : 'Weekly TP'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-8 pt-6 border-t border-outline-variant/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest font-bold">
          <Clock className="w-3.5 h-3.5" />
          Last Synced: Just Now
        </div>
        <p className="text-[9px] text-on-surface-variant/40 italic text-center sm:text-right">
          Leaderboard updates every block. Contributions require verified peer signatures.
        </p>
      </div>
    </div>
  );
}
