import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { History, Zap, MessageSquare, CheckCircle, Target, Compass } from 'lucide-react';
import { cn } from '../lib/utils';
import EmptyState from './EmptyState';

// Mock data generator for activity feed
const MOCK_ACTIVITIES = [
  { id: 1, type: 'review', points: 150, title: 'Peer Underwriting Review', date: '2 hours ago', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
  { id: 2, type: 'validation', points: 50, title: 'Node Validation Payload', date: '5 hours ago', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 3, type: 'milestone', points: 500, title: 'Initiate Node Unlocked', date: '1 day ago', icon: Target, color: 'text-primary', bg: 'bg-primary/10' },
  { id: 4, type: 'comment', points: 10, title: 'Insightful Commentary', date: '2 days ago', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 5, type: 'review', points: 150, title: 'Peer Underwriting Review', date: '3 days ago', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
];

export default function ActivityStream() {
  const [activities, setActivities] = useState<typeof MOCK_ACTIVITIES>([]);

  const loadMockData = () => {
    setActivities(MOCK_ACTIVITIES);
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-on-surface">
          <History className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-headline font-bold text-on-surface">Activity Stream</h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase tracking-widest mt-0.5">Chronological Accrual</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activities.length === 0 ? (
          <EmptyState
            icon={Compass}
            title="No Activity Detected"
            description="Your sovereign ledger is currently quiet. Engage with the community, peer-review architectures, or contribute data to accrue Tenured Points."
            actionLabel="Discover Network Tasks"
            onAction={loadMockData}
            className="border-none bg-transparent"
          />
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-outline-variant/20 before:to-transparent"
          >
            {activities.map((activity, idx) => {
              const Icon = activity.icon;
              return (
                <motion.div 
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  {/* Icon marker */}
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface-container-low shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10",
                    activity.bg,
                    activity.color
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  {/* Content Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface-container-highest border border-outline-variant/20 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">{activity.date}</span>
                      <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                        +{activity.points} <span className="text-[9px] text-amber-500/70 uppercase">TP</span>
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-on-surface">{activity.title}</h4>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      
      {activities.length > 0 && (
        <div className="mt-8 text-center border-t border-outline-variant/10 pt-6">
          <button 
            className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest hover:text-primary-container transition-colors"
          >
            Load Historical Data
          </button>
        </div>
      )}
    </div>
  );
}
