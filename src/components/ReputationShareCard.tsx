import React, { forwardRef } from 'react';
import { Shield, TrendingUp, Award, Zap, UserCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface ReputationShareCardProps {
  displayName: string;
  photoURL?: string;
  points: number;
  role: string;
  achievements: { label: string; icon: any }[];
}

const ReputationShareCard = forwardRef<HTMLDivElement, ReputationShareCardProps>(({ 
  displayName, 
  photoURL, 
  points, 
  role,
  achievements 
}, ref) => {
  return (
    <div 
      ref={ref}
      className="w-[1080px] h-[1080px] bg-on-surface p-16 flex flex-col relative overflow-hidden"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Header */}
      <div className="flex justify-between items-start relative z-10 mb-20">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40">
            <Shield className="w-10 h-10 text-on-primary" />
          </div>
          <div>
            <h1 className="text-5xl font-black text-surface tracking-tighter uppercase italic">Tenured.AI</h1>
            <p className="text-primary font-mono text-xl font-bold tracking-[0.4em] uppercase mt-1">Sovereign Talent Ledger</p>
          </div>
        </div>
        <div className="bg-surface/10 backdrop-blur-md border border-surface/20 px-8 py-4 rounded-3xl">
          <span className="text-surface font-mono text-xl font-bold tracking-widest uppercase">Node: 2026-07-05</span>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center">
        <div className="relative mb-12">
          <div className="w-64 h-64 rounded-[4rem] bg-surface-container-high border-[12px] border-on-surface shadow-2xl overflow-hidden ring-4 ring-primary/30">
            {photoURL ? (
              <img src={photoURL} alt={displayName} className="w-full h-full object-cover" crossOrigin="anonymous" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <UserCircle className="w-32 h-32 text-primary/40" />
              </div>
            )}
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-10 py-3 rounded-2xl font-black text-2xl uppercase tracking-widest shadow-xl">
            {role}
          </div>
        </div>

        <h2 className="text-8xl font-black text-surface tracking-tighter mb-4 leading-none">
          {displayName}
        </h2>
        
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px w-24 bg-surface/20" />
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-secondary" />
            <span className="text-secondary font-mono text-2xl font-bold uppercase tracking-widest">Verified Identity</span>
          </div>
          <div className="h-px w-24 bg-surface/20" />
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-2 gap-12 w-full max-w-4xl">
          <div className="bg-surface/5 backdrop-blur-xl border border-surface/10 rounded-[4rem] p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8">
              <TrendingUp className="w-10 h-10 text-primary/40" />
            </div>
            <p className="text-primary font-mono text-xl font-bold uppercase tracking-[0.3em] mb-4">Tenured Points</p>
            <h3 className="text-9xl font-black text-surface tracking-tighter">
              {points.toLocaleString()}
            </h3>
          </div>

          <div className="bg-surface/5 backdrop-blur-xl border border-surface/10 rounded-[4rem] p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <Award className="w-10 h-10 text-secondary/40" />
            </div>
            <p className="text-secondary font-mono text-xl font-bold uppercase tracking-[0.3em] mb-8">Achievements</p>
            <div className="flex flex-wrap justify-center gap-4">
              {achievements.map((ach, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-surface/10 px-6 py-3 rounded-2xl border border-surface/5">
                  <ach.icon className="w-6 h-6 text-surface" />
                  <span className="text-surface font-bold text-lg uppercase tracking-tight">{ach.label}</span>
                </div>
              ))}
              {achievements.length === 0 && (
                <p className="text-surface/40 font-mono text-lg uppercase italic">No milestones recorded</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-12 border-t border-surface/10 flex justify-between items-end relative z-10">
        <div>
          <p className="text-surface/40 font-mono text-lg uppercase tracking-widest mb-2">Immutable Verification Proof</p>
          <p className="text-surface font-mono text-xl font-bold tracking-tight">AIS-NODE-PROX-241839958404</p>
        </div>
        <div className="text-right">
          <p className="text-surface/40 font-mono text-lg uppercase tracking-widest mb-2">Claim your identity at</p>
          <p className="text-primary font-black text-3xl tracking-tighter italic">TENURED.AI</p>
        </div>
      </div>
    </div>
  );
});

ReputationShareCard.displayName = 'ReputationShareCard';

export default ReputationShareCard;
