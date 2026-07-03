import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction, 
  className 
}: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center bg-surface-container-low border border-outline-variant/20 border-dashed rounded-[2rem]", 
        className
      )}
    >
      <div className="w-20 h-20 bg-surface-container-highest/50 rounded-full flex items-center justify-center mb-6 shadow-inner relative">
        <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse" />
        <Icon className="w-10 h-10 text-outline-variant/60 relative z-10" />
      </div>
      <h3 className="text-2xl font-headline font-bold text-on-surface tracking-tight mb-3">{title}</h3>
      <p className="text-sm font-body text-on-surface-variant max-w-md mb-8 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="px-8 py-3 bg-primary text-on-primary font-mono text-xs uppercase tracking-widest font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
