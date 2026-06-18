import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  ShieldCheck, 
  Cpu, 
  History, 
  MapPin, 
  UserCircle,
  Star,
  Rocket
} from 'lucide-react';
import { cn } from '../lib/utils';
import { analytics } from '../lib/firebase';
import { logEvent } from 'firebase/analytics';

interface Badge {
  id: string;
  label: string;
  requirement: string;
  icon: React.ElementType;
  isUnlocked: boolean;
  color: string;
}

interface ReputationBadgesProps {
  profile: any;
}

export default function ReputationBadges({ profile }: ReputationBadgesProps) {
  const [justUnlocked, setJustUnlocked] = useState<string | null>(null);
  const previousUnlockedRef = useRef<Record<string, boolean>>({});

  const badges: Badge[] = [
    { 
      id: 'name', 
      label: 'Cognitive ID', 
      requirement: 'Establish Display Name', 
      icon: UserCircle, 
      isUnlocked: !!profile?.displayName && profile.displayName !== 'Sovereign Citizen',
      color: 'from-blue-500/20 to-blue-600/20 text-blue-400'
    },
    { 
      id: 'photo', 
      label: 'Visual Anchor', 
      requirement: 'Upload Visual Identity', 
      icon: ShieldCheck, 
      isUnlocked: !!profile?.photoURL,
      color: 'from-amber-500/20 to-amber-600/20 text-amber-500'
    },
    { 
      id: 'bio', 
      label: 'Intel Architect', 
      requirement: 'Write Citizen Biography', 
      icon: History, 
      isUnlocked: !!profile?.bio,
      color: 'from-emerald-500/20 to-emerald-600/20 text-emerald-500'
    },
    { 
      id: 'skills', 
      label: 'Core Logic', 
      requirement: 'Define Technical Skills', 
      icon: Cpu, 
      isUnlocked: Array.isArray(profile?.skills) && profile.skills.length > 0,
      color: 'from-purple-500/20 to-purple-600/20 text-purple-400'
    },
    { 
      id: 'location', 
      label: 'Node Sovereign', 
      requirement: 'Pin Geographic Node', 
      icon: MapPin, 
      isUnlocked: !!profile?.location,
      color: 'from-rose-500/20 to-rose-600/20 text-rose-500'
    },
    { 
      id: 'early_adopter', 
      label: 'Early Adopter', 
      requirement: 'Joined Genesis Epoch', 
      icon: Rocket, 
      isUnlocked: true,
      color: 'from-orange-500/20 to-orange-600/20 text-orange-500'
    },
    { 
      id: 'quality_contributor', 
      label: 'Quality Contributor', 
      requirement: 'Earn 1000 TP', 
      icon: Star, 
      isUnlocked: (profile?.tenuredPoints || 0) >= 1000,
      color: 'from-yellow-500/20 to-yellow-600/20 text-yellow-500'
    },
  ];

  useEffect(() => {
    let newlyUnlockedId: string | null = null;
    badges.forEach(b => {
      const wasUnlocked = previousUnlockedRef.current[b.id];
      if (wasUnlocked === false && b.isUnlocked) {
        newlyUnlockedId = b.id;
        if (analytics) {
          logEvent(analytics, 'reputation_badge_unlocked', { badge_id: b.id });
        }
      }
      previousUnlockedRef.current[b.id] = b.isUnlocked;
    });

    if (newlyUnlockedId) {
      setJustUnlocked(newlyUnlockedId);
      const timer = setTimeout(() => setJustUnlocked(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [profile]); // run when profile changes

  const unlockedCount = badges.filter(b => b.isUnlocked).length;
  const isValidatedCitizen = unlockedCount === badges.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-primary" />
          <h3 className="text-xs font-mono font-bold text-on-surface uppercase tracking-[0.25em]">Sovereign Accolades</h3>
        </div>
        <span className="text-[10px] font-mono font-bold text-on-surface-variant/40 uppercase tracking-widest leading-none">
          {unlockedCount}/{badges.length} Unlocked
        </span>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
      >
        {badges.map((badge, i) => {
          const isJustUnlocked = justUnlocked === badge.id;
          return (
            <motion.div
              key={badge.id}
              variants={badgeVariants}
              whileHover={badge.isUnlocked ? { scale: 1.05 } : {}}
              animate={isJustUnlocked ? {
                scale: [1, 1.15, 1],
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.6, ease: "easeOut" }
              } : undefined}
              className={cn(
                "relative p-4 rounded-2xl border transition-all duration-500 overflow-hidden group cursor-default",
                badge.isUnlocked 
                  ? "bg-surface-container-lowest border-primary/20 shadow-lg shadow-primary/5" 
                  : "bg-surface-container-high/50 border-outline-variant/10 grayscale opacity-40"
              )}
            >
              <AnimatePresence>
                {isJustUnlocked && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute -top-1 -right-1 z-20"
                  >
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
                  </motion.div>
                )}
              </AnimatePresence>

              {badge.isUnlocked && (
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 pointer-events-none transition-opacity group-hover:opacity-100", badge.color)} />
              )}
              
              <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-500",
                  badge.isUnlocked ? "group-hover:rotate-12 group-hover:scale-110 bg-surface-container-lowest text-primary shadow-sm" : "bg-surface-container-highest text-on-surface-variant/30"
                )}>
                  <badge.icon className="w-5 h-5" />
                </div>
                <p className={cn(
                  "text-[10px] font-mono font-black uppercase tracking-widest leading-tight",
                  badge.isUnlocked ? "text-on-surface" : "text-on-surface-variant/30"
                )}>
                  {badge.label}
                </p>
                {!badge.isUnlocked && (
                  <p className="text-[7px] font-mono font-bold uppercase tracking-tight text-on-surface-variant/20 leading-none">
                    Locked
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}

        <AnimatePresence>
          {isValidatedCitizen && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="col-span-full mt-4 p-4 bg-primary text-on-primary rounded-[1.5rem] shadow-xl shadow-primary/20 border border-white/10 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-0.5">Title Awarded</p>
                  <h4 className="text-sm font-black uppercase tracking-widest">Validated Citizen</h4>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
