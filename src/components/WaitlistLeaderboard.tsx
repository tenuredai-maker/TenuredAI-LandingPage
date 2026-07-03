import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Users, Loader2 } from 'lucide-react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Leader {
  id: string;
  email: string;
  referrals: number;
}

export default function WaitlistLeaderboard() {
  const [loading, setLoading] = useState(true);
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'waitlist'),
          orderBy('referrals', 'desc'),
          limit(5)
        );
        const snapshot = await getDocs(q);
        const fetchedLeaders: Leader[] = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          // Mask email for privacy
          const email = data.email || 'anonymous';
          const maskedEmail = email.split('@')[0].slice(0, 2) + '***@' + email.split('@')[1];
          fetchedLeaders.push({
            id: doc.id,
            email: maskedEmail,
            referrals: data.referrals || 0
          });
        });
        setLeaders(fetchedLeaders);
      } catch (err) {
        console.error("Leaderboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-amber-400" />
        <h3 className="text-lg font-sans font-medium text-white">Top Referrers</h3>
      </div>

      {loading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {leaders.map((leader, index) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-mono text-gray-300">
                    {index + 1}
                  </div>
                  <span className="text-sm font-mono text-gray-200">{leader.email}</span>
                </div>
                <div className="flex items-center gap-1.5 text-green-400">
                  <Users className="w-3.5 h-3.5" />
                  <span className="text-sm font-bold font-mono">{leader.referrals}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
