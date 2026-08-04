import React from 'react';
import { Award, ShieldCheck, Cpu, History, MapPin, UserCircle, Rocket, Star, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

interface Badge {
  id: string;
  label: string;
  icon: React.ElementType;
  isUnlocked: boolean;
}

export default function LatestMilestones({ profile, isLoading = false }: { profile: any, isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded bg-surface-container-high animate-pulse" />
            <div className="h-4 w-32 bg-surface-container-high rounded animate-pulse" />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high animate-pulse" />
              <div className="h-4 w-40 bg-surface-container-high rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const badges: Badge[] = [
    { id: 'name', label: 'Cognitive ID', icon: UserCircle, isUnlocked: !!profile?.displayName && profile.displayName !== 'Sovereign Citizen' },
    { id: 'photo', label: 'Visual Anchor', icon: ShieldCheck, isUnlocked: !!profile?.photoURL },
    { id: 'bio', label: 'Intel Architect', icon: History, isUnlocked: !!profile?.bio },
    { id: 'skills', label: 'Core Logic', icon: Cpu, isUnlocked: Array.isArray(profile?.skills) && profile.skills.length > 0 },
    { id: 'location', label: 'Node Sovereign', icon: MapPin, isUnlocked: !!profile?.location },
    { id: 'early_adopter', label: 'Early Adopter', icon: Rocket, isUnlocked: true },
    { id: 'quality_contributor', label: 'Quality Contributor', icon: Star, isUnlocked: (profile?.tenuredPoints || 0) >= 1000 },
  ];

  const unlockedBadges = badges.filter(b => b.isUnlocked);
  const latestMilestones = unlockedBadges.slice(-3).reverse();
  const mostRecent = latestMilestones[0];

  const handleShare = () => {
    if (!mostRecent) return;
    const text = encodeURIComponent(`I just unlocked the ${mostRecent.label} milestone on Tenured AI! Precise benchmarks for cognitive sovereignty.`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-primary" />
          <h3 className="text-xs font-mono font-bold text-on-surface uppercase tracking-[0.25em]">Latest Milestones</h3>
        </div>
        {mostRecent && (
          <button 
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Share milestone"
          >
            <Share2 className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {latestMilestones.length === 0 ? (
        <p className="text-xs text-on-surface-variant font-body italic">No milestones earned yet.</p>
      ) : (
        <div className="space-y-4">
          {latestMilestones.map((badge, index) => (
            <div key={badge.id} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center">
                <badge.icon className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm font-medium text-on-surface">Unlocked {badge.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
