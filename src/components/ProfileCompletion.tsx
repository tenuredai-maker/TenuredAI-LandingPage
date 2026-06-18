import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, AlertCircle, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface Task {
  id: string;
  label: string;
  completed: boolean;
  weight: number;
}

interface ProfileCompletionProps {
  profile: any;
}

export default function ProfileCompletion({ profile }: ProfileCompletionProps) {
  const tasks: Task[] = [
    { id: 'name', label: 'Establish Display Name', completed: !!profile?.displayName && profile.displayName !== 'Sovereign Citizen', weight: 15 },
    { id: 'photo', label: 'Upload Visual Identity', completed: !!profile?.photoURL, weight: 25 },
    { id: 'bio', label: 'Write Citizen Biography', completed: !!profile?.bio, weight: 20 },
    { id: 'skills', label: 'Define Core Skills', completed: Array.isArray(profile?.skills) && profile.skills.length > 0, weight: 20 },
    { id: 'location', label: 'Pin Geographic Node', completed: !!profile?.location, weight: 20 },
  ];

  const completionPercentage = tasks.reduce((acc, task) => acc + (task.completed ? task.weight : 0), 0);
  const remainingTasks = tasks.filter(t => !t.completed);

  if (completionPercentage === 100) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-container-lowest border border-primary/20 rounded-[2rem] p-6 mb-8 shadow-lg relative overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="flex-grow space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-mono font-bold text-on-surface uppercase tracking-widest">
                Identity Synchronization: 
                <motion.span
                  key={completionPercentage}
                  animate={{ scale: [1, 1.2, 1], color: ['#775a19', '#9b7625', '#775a19'] }}
                  className="inline-block ml-2"
                >
                  {completionPercentage}%
                </motion.span>
              </h3>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="h-3 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/10 relative">
            <motion.div 
              key={completionPercentage}
              initial={{ width: 0 }}
              animate={{ 
                width: `${completionPercentage}%`,
                scaleY: [1, 1.1, 1],
              }}
              transition={{ 
                width: { duration: 0.8, ease: "easeOut" },
                scaleY: { duration: 0.4, times: [0, 0.5, 1] }
              }}
              className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 shadow-[0_0_15px_rgba(var(--primary),0.2)] relative z-10"
            >
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
              />
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center gap-2">
                {task.completed ? (
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                ) : (
                  <Circle className="w-3 h-3 text-on-surface-variant/30" />
                )}
                <span className={cn(
                  "text-[10px] font-mono font-bold uppercase tracking-wider",
                  task.completed ? "text-on-surface-variant/40" : "text-primary"
                )}>
                  {task.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {remainingTasks.length > 0 && (
          <div className="shrink-0">
            <button className="flex items-center gap-3 px-6 py-4 bg-primary text-on-primary rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all group">
              <span>Optimize Ledger Entry</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
