import React from 'react';
import { motion } from 'motion/react';
import TenuredLeaderboard from '../components/TenuredLeaderboard';
import { Shield, Info } from 'lucide-react';

export default function LeaderboardPage() {
  return (
    <div className="pt-32 pb-20 px-6 md:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left Column: Context & Stats */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.3em]">Reputation Kernel</span>
            </div>
            <h1 className="text-5xl font-headline font-black text-on-surface leading-tight tracking-tighter">
              The Sovereign <br/> <span className="italic text-primary">Ledger.</span>
            </h1>
            <p className="text-on-surface-variant leading-relaxed">
              Real-time synchronization of verified professional nodes. Rank is determined by the cumulative weight of peer-signed validations and adversarial performance metrics.
            </p>
          </motion.div>

          <div className="p-6 bg-surface-container-high rounded-3xl border border-outline-variant/10 space-y-4">
            <div className="flex items-center gap-2 text-on-surface">
              <Info className="w-4 h-4 opacity-50" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest">Protocol Rules</h4>
            </div>
            <ul className="space-y-3">
              {[
                "Points accrue through verified network contributions.",
                "Rank updates are processed every block cycle.",
                "Weekly rewards are settled based on leaderboard position.",
                "Adversarial failures result in point slash events."
              ].map((rule, i) => (
                <li key={i} className="flex gap-3 text-[11px] text-on-surface-variant leading-tight">
                  <span className="text-primary font-bold">{i + 1}.</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: The Leaderboard */}
        <div className="lg:col-span-8">
          <TenuredLeaderboard />
        </div>
      </div>
    </div>
  );
}
