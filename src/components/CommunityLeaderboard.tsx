import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, TrendingUp, Medal, ArrowRight, User as UserIcon } from 'lucide-react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

interface LeaderboardUser {
  uid: string;
  displayName: string;
  photoURL?: string;
  tenuredPoints: number;
}

const MOCK_LEADERS: LeaderboardUser[] = [
  { uid: 'mock1', displayName: 'Elena Rodriguez', tenuredPoints: 14250, photoURL: 'https://i.pravatar.cc/150?u=mock1' },
  { uid: 'mock2', displayName: 'Marcus Sterling', tenuredPoints: 12820, photoURL: 'https://i.pravatar.cc/150?u=mock2' },
  { uid: 'mock3', displayName: 'Sarah Jenkins', tenuredPoints: 9100, photoURL: 'https://i.pravatar.cc/150?u=mock3' },
  { uid: 'mock4', displayName: 'David Chen', tenuredPoints: 8750, photoURL: 'https://i.pravatar.cc/150?u=mock4' }
];

export default function CommunityLeaderboard() {
  const { user } = useAuth();
  const [leaders, setLeaders] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const q = query(
          collection(db, 'users'),
          orderBy('tenuredPoints', 'desc'),
          limit(10)
        );
        const snapshot = await getDocs(q);
        const data: LeaderboardUser[] = [];
        snapshot.forEach((doc) => {
          data.push(doc.data() as LeaderboardUser);
        });

        // Merge and sort real users with mock data to ensure a well-populated board
        const merged = [...data];
        for (const mock of MOCK_LEADERS) {
          if (!merged.find(m => m.uid === mock.uid)) {
            merged.push(mock);
          }
        }
        
        merged.sort((a, b) => (b.tenuredPoints || 0) - (a.tenuredPoints || 0));
        setLeaders(merged.slice(0, 5));
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setLeaders(MOCK_LEADERS);
      } finally {
        setLoading(false);
      }
    };
    fetchTopUsers();
  }, []);

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-tertiary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-tertiary" />
            <h3 className="text-sm font-mono font-bold text-tertiary uppercase tracking-[0.2em]">Community Leaderboard</h3>
          </div>
          <h2 className="text-2xl font-headline font-bold text-on-surface">Top Validated Nodes</h2>
        </div>
        <button className="flex items-center gap-2 text-[10px] font-mono font-bold text-secondary uppercase tracking-widest px-4 py-2 rounded-full border border-outline-variant/20 hover:bg-surface-container-high transition-colors">
          View Global Rank <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        {loading ? (
          Array(5).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse flex items-center justify-between p-4 bg-surface-container-high/30 border border-outline-variant/10 rounded-2xl h-16" />
          ))
        ) : (
          leaders.map((leader, index) => {
            const isCurrentUser = user && leader.uid === user.uid;
            
            return (
              <motion.div 
                key={leader.uid}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={cn(
                  "flex items-center justify-between p-4 rounded-2xl border transition-all hover:scale-[1.01]",
                  isCurrentUser 
                    ? "bg-primary/5 border-primary/30 shadow-sm" 
                    : "bg-surface-container-highest border-outline-variant/15 hover:border-outline-variant/30"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-black shrink-0",
                    index === 0 ? "bg-amber-500 text-amber-950" : 
                    index === 1 ? "bg-slate-300 text-slate-800" : 
                    index === 2 ? "bg-amber-700 text-amber-100" : 
                    "bg-surface-container-low text-on-surface-variant"
                  )}>
                    {index + 1}
                  </div>
                  
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container border border-outline-variant/20 shrink-0">
                    {leader.photoURL ? (
                      <img src={leader.photoURL} alt={leader.displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-on-surface-variant/50" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface flex items-center gap-2">
                      {leader.displayName}
                      {isCurrentUser && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-primary text-on-primary font-mono uppercase tracking-widest">You</span>
                      )}
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-mono uppercase tracking-widest">
                      Node Level {Math.floor((leader.tenuredPoints || 0) / 1000) + 1}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <TrendingUp className={cn(
                    "w-3.5 h-3.5",
                    isCurrentUser ? "text-primary" : "text-tertiary"
                  )} />
                  <span className="text-sm font-headline font-black text-on-surface tracking-widest">
                    {(leader.tenuredPoints || 0).toLocaleString()} <span className="text-[10px] text-on-surface-variant">TP</span>
                  </span>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
