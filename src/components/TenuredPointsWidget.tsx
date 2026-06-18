import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Target, ArrowRight, X, Activity, TrendingUp, TrendingDown, Award, Lock } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip as RechartsTooltip, YAxis } from 'recharts';
import { cn } from '../lib/utils';

interface TenuredPointsWidgetProps {
  points: number | string;
}

export default function TenuredPointsWidget({ points }: TenuredPointsWidgetProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedDateData, setSelectedDateData] = useState<{ date: string, points: number, dailyEarned: number, activities: { type: string, points: number }[] } | null>(null);
  
  const currentPoints = typeof points === 'number' ? points : parseInt(points as string, 10) || 0;
  
  // Calculate next milestone (e.g., if 2450, next is 3000)
  const milestoneUnit = 1000;
  const nextMilestone = Math.ceil((currentPoints + 1) / milestoneUnit) * milestoneUnit;
  const percentage = Math.min((currentPoints / nextMilestone) * 100, 100);

  // Generate dummy trend data based on current points
  const trendData = useMemo(() => {
    const data = [];
    let cumulative = Math.max(0, currentPoints - 1000);
    const increment = 1000 / 30;
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const dailyPoints = Math.floor(increment * (0.5 + Math.random()));
      const prevCumulative = cumulative;
      cumulative += dailyPoints;
      
      if (i === 0) cumulative = currentPoints; // Ensure last point matches exactly
      
      const finalDaily = Math.floor(cumulative) - Math.floor(prevCumulative);
      
      const activities = [
        { type: 'Node Validation Payload', points: Math.floor(finalDaily * 0.5) },
        { type: 'Peer Underwriting Review', points: Math.floor(finalDaily * 0.3) },
        { type: 'Daily Ping Streak', points: finalDaily - Math.floor(finalDaily * 0.5) - Math.floor(finalDaily * 0.3) }
      ].filter(a => a.points > 0);

      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        points: Math.floor(cumulative),
        dailyEarned: finalDaily,
        activities
      });
    }
    return data;
  }, [currentPoints]);

  const radius = 64;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = mounted 
    ? circumference - (percentage / 100) * circumference 
    : circumference;

  const weeklyGrowth = useMemo(() => {
    if (!trendData || trendData.length < 8) return 0;
    const todayPoints = trendData[trendData.length - 1].points;
    const lastWeekPoints = trendData[trendData.length - 8].points;
    return todayPoints - lastWeekPoints;
  }, [trendData]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden flex flex-col gap-8 group">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-mono font-bold text-amber-500 uppercase tracking-[0.2em]">Tenured Points</h3>
          </div>
          <h2 className="text-2xl font-headline font-bold text-on-surface mb-2">Milestone Progress</h2>
          <p className="text-xs text-on-surface-variant font-body max-w-sm mb-6 leading-relaxed">
            Accumulate points through professional underwriting, peer reviews, and algorithm validation. Reach {nextMilestone.toLocaleString()} to unlock Universal Node privileges.
          </p>
          
          <button className="flex items-center gap-2 text-[10px] font-mono font-bold text-primary uppercase tracking-widest hover:text-primary-container transition-colors">
            View Earn History <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="relative flex items-center justify-center shrink-0">
          <svg height={radius * 2} width={radius * 2} className="-rotate-90 drop-shadow-xl">
            <circle
              className="text-amber-500/10 stroke-current transition-all"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <motion.circle
              className="text-amber-500 stroke-current"
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex items-start">
              <span className="text-2xl font-headline font-black text-on-surface leading-none">{currentPoints}</span>
            </div>
            <span className="text-[9px] font-mono font-bold text-on-surface-variant uppercase tracking-widest mt-1 mb-1">/ {nextMilestone / 1000}k</span>
            
            {weeklyGrowth > 0 ? (
              <div className="flex items-center gap-0.5 text-primary">
                <TrendingUp className="w-3 h-3 stroke-[3]" />
                <span className="text-[9px] font-mono font-bold">+{weeklyGrowth} Wk</span>
              </div>
            ) : weeklyGrowth < 0 ? (
              <div className="flex items-center gap-0.5 text-error">
                <TrendingDown className="w-3 h-3 stroke-[3]" />
                <span className="text-[9px] font-mono font-bold">{weeklyGrowth} Wk</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full pt-6 border-t border-outline-variant/10">
        <div className="text-[10px] uppercase font-mono tracking-widest text-on-surface-variant font-bold mb-4 flex justify-between items-center">
          <span>30-Day Accumulation Trend</span>
          <span className="text-amber-500 flex items-center gap-1">
            <Target className="w-3 h-3" /> Momentum Active
          </span>
        </div>
        <div className="h-32 w-full cursor-pointer">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={trendData} 
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              onClick={(e: any) => {
                if (e && e.activePayload && e.activePayload.length) {
                  setSelectedDateData(e.activePayload[0].payload);
                }
              }}
            >
              <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide />
              <RechartsTooltip 
                cursor={{ stroke: 'var(--color-outline-variant)', strokeWidth: 1, strokeDasharray: '4 4' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-surface-container-highest border border-outline-variant/20 px-3 py-2 rounded-lg shadow-lg">
                        <p className="text-[9px] font-mono text-on-surface-variant mb-1 uppercase tracking-wider">{data.date}</p>
                        <p className="text-xs font-bold text-amber-500 mb-0.5">{data.points} TP</p>
                        <p className="text-[9px] text-primary">+{data.dailyEarned} Points (Click to view)</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="points" 
                stroke="#f59e0b" // amber-500
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5, fill: '#f59e0b', stroke: 'var(--color-surface)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="relative z-10 w-full pt-6 border-t border-outline-variant/10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] uppercase font-mono tracking-widest text-on-surface-variant font-bold flex items-center gap-1">
            <Award className="w-3 h-3 text-primary" /> Tenured Milestones
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: 1, label: 'Initiate Node', threshold: 1000 },
            { id: 2, label: 'Verified Peer', threshold: 2500 },
            { id: 3, label: 'Core Validator', threshold: 5000 },
            { id: 4, label: 'Universal Node', threshold: 10000 },
          ].map((milestone, idx) => {
            const isUnlocked = currentPoints >= milestone.threshold;
            const progressPercent = Math.min(100, (currentPoints / milestone.threshold) * 100);
            
            return (
              <div 
                key={milestone.id} 
                className={cn(
                  "p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all relative overflow-hidden",
                  isUnlocked 
                    ? "bg-primary/5 border-primary/20 shadow-sm" 
                    : "bg-surface-container border-outline-variant/10 opacity-70 grayscale hover:grayscale-0 transition-all duration-300"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center relative z-10",
                  isUnlocked ? "bg-primary/20 text-primary" : "bg-surface-container-high text-on-surface-variant/50"
                )}>
                  {isUnlocked ? <Award className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </div>
                <div className="relative z-10 w-full flex flex-col items-center">
                  <div className={cn(
                    "text-[10px] font-mono font-bold uppercase tracking-wider mb-0.5",
                    isUnlocked ? "text-primary" : "text-on-surface-variant"
                  )}>
                    {milestone.label}
                  </div>
                  <div className="text-[9px] font-bold text-on-surface-variant mb-2">
                    {milestone.threshold.toLocaleString()} TP
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      className="bg-primary h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.1 + (idx * 0.1) }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Modal overlay */}
      <AnimatePresence>
        {selectedDateData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-sm rounded-[2.5rem]"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-surface-container-high border border-outline-variant/30 rounded-2xl p-6 shadow-2xl w-full max-w-sm relative"
            >
              <button 
                onClick={() => setSelectedDateData(null)}
                className="absolute top-4 right-4 p-1.5 bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant rounded-full transition-colors"
                aria-label="Close log modal"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-amber-500" />
                <h4 className="text-sm font-headline font-bold text-on-surface uppercase tracking-widest">{selectedDateData.date} Log</h4>
              </div>
              
              <div className="flex items-baseline gap-2 mb-6 border-b border-outline-variant/10 pb-4">
                <span className="text-3xl font-headline font-black text-amber-500">+{selectedDateData.dailyEarned}</span>
                <span className="text-xs font-mono text-on-surface-variant uppercase tracking-widest">Points earned</span>
              </div>
              
              <div className="space-y-3 max-h-[160px] overflow-y-auto scrollbar-thin scrollbar-thumb-outline-variant scrollbar-track-transparent pr-2">
                {selectedDateData.activities.map((act, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-3">
                    <span className="text-[11px] font-mono text-on-surface font-bold uppercase tracking-wide">{act.type}</span>
                    <span className="text-xs font-bold text-primary">+{act.points}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
