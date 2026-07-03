import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { Search, Award, Users, TrendingUp, Copy, Check, Loader2, ArrowRight, Info, X } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, getCountFromServer, doc, getDoc } from 'firebase/firestore';

// Mock data generator for now as historical activity logging is needed to populate this
const getMockChartData = () => {
    const data = [];
    const now = new Date();
    for (let i = 30; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        data.push({
            date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            referrals: Math.floor(Math.random() * (i === 0 ? 5 : 2))
        });
    }
    return data;
};

interface ReferralStatsProps {
  initialWaitlistId?: string;
  onClose?: () => void;
}

interface WaitlistData {
  id: string;
  email: string;
  points: number;
  referrals: number;
  createdAt: any;
}

export default function ReferralStats({ initialWaitlistId, onClose }: ReferralStatsProps) {
  const [emailInput, setEmailInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<WaitlistData | null>(null);
  const [rank, setRank] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPointsHelp, setShowPointsHelp] = useState(false);

  const MILESTONES = [50, 100, 250, 500, 1000];

  useEffect(() => {
    if (!stats) return;
    const milestone = MILESTONES.filter(m => stats.points >= m).pop();
    if (milestone) {
      const storageKey = `milestone_${milestone}`;
      if (!localStorage.getItem(storageKey)) {
        setToastMessage(`🎉 Milestone Reached: ${milestone} Tenured Points!`);
        localStorage.setItem(storageKey, 'true');
        setTimeout(() => setToastMessage(null), 5000);
      }
    }
  }, [stats]);

  const fetchStatsByDocId = async (docId: string) => {
    setLoading(true);
    setError(null);
    try {
      const waitlistDoc = await getDoc(doc(db, 'waitlist', docId));
      if (waitlistDoc.exists()) {
        const data = waitlistDoc.data();
        const d: WaitlistData = {
          id: waitlistDoc.id,
          email: data.email,
          points: data.points ?? 0,
          referrals: data.referrals ?? 0,
          createdAt: data.createdAt,
        };
        setStats(d);
        await calculateRank(d.points);
      } else {
        setError('No waitlist record found.');
      }
    } catch (err) {
      console.error(err);
      setError('Error retrieving your metrics.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStatsByEmail = async (emailStr: string) => {
    if (!emailStr.trim()) return;
    setLoading(true);
    setError(null);
    setStats(null);
    setRank(null);
    try {
      const q = query(collection(db, 'waitlist'), where('email', '==', emailStr.trim().toLowerCase()));
      const snap = await getDocs(q);
      
      if (snap.empty) {
        setError("This email hasn't joined the waitlist yet.");
      } else {
        const matchDoc = snap.docs[0];
        const data = matchDoc.data();
        const d: WaitlistData = {
          id: matchDoc.id,
          email: data.email,
          points: data.points ?? 0,
          referrals: data.referrals ?? 0,
          createdAt: data.createdAt,
        };
        setStats(d);
        await calculateRank(d.points);
      }
    } catch (err) {
      console.error(err);
      setError('Unable to fetch stats. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateRank = async (userPoints: number) => {
    try {
      // Rank is 1 + (Count of people with points strictly greater than user's points)
      const rankQuery = query(collection(db, 'waitlist'), where('points', '>', userPoints));
      const rankSnap = await getCountFromServer(rankQuery);
      setRank(rankSnap.data().count + 1);
    } catch (err) {
      console.error("Failed to compute rank", err);
      // Fallback
      setRank(null);
    }
  };

  useEffect(() => {
    if (initialWaitlistId) {
      fetchStatsByDocId(initialWaitlistId);
    }
  }, [initialWaitlistId]);

  const handleCopyLink = async () => {
    if (!stats) return;
    const link = `${window.location.origin}/coming-soon?ref=${stats.id}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setToastMessage('Referral link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setToastMessage(null), 2500);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto" id="referral-stats-container">
      {!initialWaitlistId && !stats && (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl text-center">
          <h3 className="text-lg font-sans font-medium text-white mb-2">Check Waitlist Status</h3>
          <p className="text-xs text-gray-400 mb-6">Enter your email address to check your current queue position and referral metrics.</p>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              fetchStatsByEmail(emailInput);
            }}
            className="space-y-3"
          >
            <div className="relative">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your registered email"
                className="w-full px-5 py-3 bg-black/30 border border-white/15 rounded-full text-sm text-white focus:outline-none focus:border-white transition-colors pl-11"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white hover:bg-gray-200 text-black font-semibold rounded-full text-xs transition-all flex items-center justify-center gap-1.5"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Retrieving Stats...
                </>
              ) : (
                <>
                  Verify Standing
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-400 font-medium mt-4"
            >
              {error}
            </motion.p>
          )}
        </div>
      )}

      {loading && !stats && initialWaitlistId && (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center min-h-[220px]">
          <Loader2 className="w-8 h-8 text-green-400 animate-spin mb-3" />
          <p className="text-xs text-gray-400 font-mono">Querying digital waiting ledger...</p>
        </div>
      )}

      {stats && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative"
        >
          {onClose && (
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-xs font-mono text-gray-400 hover:text-white transition-colors"
            >
              Reset
            </button>
          )}

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/15 flex items-center justify-center border border-green-500/20 text-green-400">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono text-green-400 tracking-wider uppercase">Active Standing</span>
              <p className="text-sm font-semibold truncate text-white max-w-[200px]" title={stats.email}>
                {stats.email}
              </p>
            </div>
          </div>

          {/* Metrics Bento Grid */}
          <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
            {/* Rank Box */}
            <div className="p-3 bg-black/25 rounded-xl border border-white/5">
              <span className="block text-[9px] uppercase tracking-wider font-mono text-gray-400 mb-1">Queue Rank</span>
              <span className="text-lg font-bold font-mono text-white">
                {rank !== null ? `#${rank.toLocaleString()}` : <Loader2 className="w-4 h-4 animate-spin mx-auto text-gray-400" />}
              </span>
            </div>

            {/* Referrals Box */}
            <div className="p-3 bg-black/25 rounded-xl border border-white/5">
              <span className="block text-[9px] uppercase tracking-wider font-mono text-gray-400 mb-1">Referrals</span>
              <div className="flex items-center justify-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-lg font-bold font-mono text-white">{stats.referrals}</span>
              </div>
            </div>

            {/* Points Box */}
            <div className="p-3 bg-black/25 rounded-xl border border-white/5 relative">
              <span className="block text-[9px] uppercase tracking-wider font-mono text-gray-400 mb-1">Total Points</span>
              <div className="flex items-center justify-center gap-1.5 cursor-pointer" onClick={() => setShowPointsHelp(true)}>
                <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                <span className="text-lg font-bold font-mono text-white">{stats.points}</span>
                <Info className="w-3 h-3 text-gray-500" />
              </div>

              <AnimatePresence>
                {showPointsHelp && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute z-20 top-0 left-0 right-0 bottom-0 bg-black/95 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center"
                  >
                    <button onClick={() => setShowPointsHelp(false)} className="absolute top-2 right-2 text-gray-500"><X className="w-4 h-4" /></button>
                    <span className="text-xs font-mono text-gray-400 mb-2">How it's calculated:</span>
                    <span className="text-xs text-white">10 (Base) + (5 × Total Referrals) = Total Points</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Referral Growth Chart */}
          <div className="h-32 mb-6 w-full -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getMockChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#000', borderColor: '#ffffff20', color: '#fff', fontSize: '10px' }}
                    itemStyle={{ color: '#4ade80' }}
                />
                <Line type="monotone" dataKey="referrals" stroke="#22c55e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Referral link box */}
          <div className="space-y-2 text-left mb-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Your Shareable Credentials</span>
            <div className="flex gap-2 items-center bg-black/30 rounded-xl p-2 border border-white/10">
              <input 
                type="text" 
                readOnly 
                value={`${window.location.origin}/coming-soon?ref=${stats.id}`} 
                className="bg-transparent text-xs text-gray-300 font-mono flex-1 outline-none px-2 select-all overflow-ellipsis"
              />
              <button 
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-3 py-1.5 bg-white text-black text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors shrink-0"
              >
                {copied ? <Check className="w-3 h-3 stroke-[3]" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="text-[10px] font-mono text-gray-400 text-center flex items-center justify-center gap-1 bg-white/5 py-2 px-3 rounded-lg border border-white/5">
            <span>Invite more peers to climb the waitlist queue!</span>
          </div>
        </motion.div>
      )}

      {/* Floating high-contrast Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 bg-neutral-900/95 border border-white/10 text-white text-xs px-4 py-3 rounded-full shadow-2xl backdrop-blur-md pointer-events-none whitespace-nowrap"
            id="toast-notification"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-sans font-medium text-gray-200">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
