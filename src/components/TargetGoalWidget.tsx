import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Edit2, Check, X, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { updateTargetPointGoal } from '../lib/firebase';

interface TargetGoalWidgetProps {
  uid: string;
  currentPoints: number;
  initialTargetGoal?: number;
}

export default function TargetGoalWidget({ uid, currentPoints, initialTargetGoal }: TargetGoalWidgetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(initialTargetGoal?.toString() || '');
  const [targetGoal, setTargetGoal] = useState<number | null>(initialTargetGoal || null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async () => {
    const val = parseInt(inputValue, 10);
    if (!isNaN(val) && val > 0) {
      setIsUpdating(true);
      try {
        await updateTargetPointGoal(uid, val);
        setTargetGoal(val);
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update goal", error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const remainingPoints = targetGoal ? Math.max(0, targetGoal - currentPoints) : null;
  const progressPercent = targetGoal ? Math.min(100, (currentPoints / targetGoal) * 100) : 0;
  const isGoalReached = targetGoal && currentPoints >= targetGoal;

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left flex-1 w-full">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-mono font-bold text-primary uppercase tracking-[0.2em]">Custom Objective</h3>
        </div>
        <h2 className="text-2xl font-headline font-bold text-on-surface mb-2">Target Point Goal</h2>
        
        <p className="text-xs text-on-surface-variant font-body max-w-sm mb-6 leading-relaxed">
          Set a personal horizon for your Tenured Points. Monitor your progression vector as you accumulate reputation within the ecosystem.
        </p>

        {isEditing ? (
          <div className="flex items-center gap-2 w-full max-w-xs">
            <input 
              type="number" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g. 5000"
              className="bg-surface-container border border-outline-variant/30 text-on-surface text-sm font-mono font-bold px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 w-full"
              disabled={isUpdating}
            />
            <button 
              onClick={handleSave} 
              disabled={isUpdating}
              className="p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl transition-colors disabled:opacity-50"
            >
              <Check className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                setIsEditing(false);
                setInputValue(targetGoal?.toString() || '');
              }} 
              disabled={isUpdating}
              className="p-2 bg-surface-container-high text-on-surface-variant hover:text-on-surface rounded-xl transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="text-3xl font-headline font-black text-on-surface tracking-wider">
              {targetGoal ? targetGoal.toLocaleString() : "---"} <span className="text-[12px] text-on-surface-variant">TP</span>
            </div>
            <button 
              onClick={() => setIsEditing(true)}
              className="p-1.5 border border-outline-variant/20 text-on-surface-variant hover:text-primary hover:bg-primary/5 hover:border-primary/20 rounded-lg transition-all"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="relative z-10 w-full md:w-auto min-w-[240px] flex flex-col items-center">
        {targetGoal ? (
          <div className="w-full flex flex-col items-center p-6 bg-surface-container-high/30 rounded-3xl border border-outline-variant/15">
            <div className="text-center mb-4">
              <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest block mb-1">Delta to target</span>
              <div className="flex items-end justify-center gap-1">
                <span className={cn(
                  "text-4xl font-headline font-black tracking-tight leading-none",
                  isGoalReached ? "text-primary" : "text-amber-500"
                )}>
                  {isGoalReached ? "0" : remainingPoints?.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-on-surface-variant uppercase mb-1 drop-shadow-sm">TP</span>
              </div>
            </div>

            <div className="w-full bg-surface-container-highest rounded-full h-2 mb-2 overflow-hidden border border-outline-variant/10">
               <motion.div 
                  className={cn(
                    "h-full rounded-full",
                    isGoalReached ? "bg-primary" : "bg-amber-500"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
               />
            </div>
            <div className="w-full flex justify-between text-[9px] font-mono font-bold uppercase tracking-widest text-on-surface-variant">
              <span>{Math.floor(progressPercent)}%</span>
              {isGoalReached && <span className="text-primary flex items-center gap-1"><TrendingUp className="w-3 h-3"/> Achieved</span>}
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center p-6 bg-surface-container-high/20 rounded-3xl border border-dashed border-outline-variant/30 h-full min-h-[140px] text-center">
             <Target className="w-8 h-8 text-on-surface-variant/30 mb-2" />
             <p className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wide">No goal set</p>
          </div>
        )}
      </div>
    </div>
  );
}
