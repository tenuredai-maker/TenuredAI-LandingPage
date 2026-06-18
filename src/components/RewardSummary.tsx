import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Zap, X, Star } from 'lucide-react';
import { cn } from '../lib/utils';

export interface Reward {
  type: 'badge' | 'points';
  label: string;
  value?: number;
  icon?: React.ElementType;
}

interface RewardSummaryProps {
  rewards: Reward[];
  isOpen: boolean;
  onClose: () => void;
}

export default function RewardSummary({ rewards, isOpen, onClose }: RewardSummaryProps) {
  if (rewards.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[200] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-surface-container-lowest border border-primary/20 rounded-[3rem] p-10 shadow-2xl overflow-hidden"
          >
            {/* Visual Flair */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center relative">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-[2rem]"
                  />
                  <Award className="w-10 h-10 text-primary" />
                </div>
              </div>

              <div className="text-center mb-10">
                <h3 className="text-3xl font-headline font-black text-on-surface tracking-tighter leading-tight">
                  Intelligence Uplifted
                </h3>
                <p className="text-on-surface-variant font-mono text-[10px] uppercase tracking-widest mt-2">
                  Sovereign Talent Ledger &middot; Verification Successful
                </p>
              </div>

              <div className="space-y-4 max-h-[40vh] overflow-y-auto px-2 py-1 scrollbar-hide">
                {rewards.map((reward, i) => (
                  <motion.div
                    key={`${reward.label}-${i}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center justify-between p-5 bg-surface-container-high rounded-2xl border border-outline-variant/10 group hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                        reward.type === 'badge' ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-500"
                      )}>
                        {reward.icon ? <reward.icon className="w-6 h-6" /> : (reward.type === 'badge' ? <Star className="w-6 h-6" /> : <Zap className="w-6 h-6" />)}
                      </div>
                      <div>
                        <p className="text-[9px] font-mono font-bold text-on-surface-variant/50 uppercase tracking-widest">{reward.type === 'points' ? 'Currency Accrued' : 'Badge Unlocked'}</p>
                        <h4 className="text-sm font-bold text-on-surface">{reward.label}</h4>
                      </div>
                    </div>
                    {reward.value && (
                      <div className="text-lg font-mono font-black text-primary">
                        +{reward.value}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <button
                onClick={onClose}
                className="w-full mt-10 py-5 bg-on-surface text-surface rounded-2xl font-black text-xs uppercase tracking-[0.25em] hover:shadow-xl hover:shadow-on-surface/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                Continue Mission
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
