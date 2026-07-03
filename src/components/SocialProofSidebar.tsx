import React from 'react';
import { Quote, CheckCircle2, Star, ShieldCheck, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface Endorsement {
  id: string;
  author: string;
  role: string;
  text: string;
  avatarUrl?: string;
  points: number;
}

const ENDORSEMENTS: Endorsement[] = [
  {
    id: 'e1',
    author: 'Elena R.',
    role: 'Lead Architect',
    text: 'Exceptional architectural review. Identified 3 latent failure points before protocol launch.',
    points: 150,
  },
  {
    id: 'e2',
    author: 'Marcus V.',
    role: 'Risk Underwriter',
    text: 'A highly reliable validator. Always thorough in assessing consensus payloads.',
    points: 80,
  }
];

export default function SocialProofSidebar() {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-headline font-black text-on-surface">Peer Validation</h3>
          <p className="text-[9px] font-mono font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">Social Proof Protocols</p>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {ENDORSEMENTS.map((endr) => (
          <div key={endr.id} className="p-4 bg-surface-container border border-outline-variant/20 rounded-2xl relative group hover:border-secondary/30 transition-colors">
            <Quote className="absolute top-4 right-4 w-6 h-6 text-outline-variant/20 group-hover:text-secondary/20 transition-colors pointer-events-none" />
            
            <p className="text-xs font-body text-on-surface-variant leading-relaxed italic mb-4 pr-6">
              "{endr.text}"
            </p>
            
            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface font-bold text-[9px] uppercase">
                  {endr.author.charAt(0)}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface leading-none">{endr.author}</p>
                  <p className="text-[8px] font-mono text-on-surface-variant uppercase tracking-wider mt-0.5">{endr.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-2 py-1 rounded-md">
                <Star className="w-3 h-3" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider">+{endr.points}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-outline-variant/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest font-bold">Endorsement Tier</span>
          <span className="text-[10px] font-mono text-secondary uppercase tracking-widest font-bold">Verified</span>
        </div>
        <div className="w-full h-1.5 bg-outline-variant/20 rounded-full overflow-hidden">
          <div className="h-full bg-secondary rounded-full" style={{ width: '85%' }} />
        </div>
        <p className="text-[9px] text-on-surface-variant/60 mt-3 text-center leading-relaxed">
          Based on consensus verification of network peers. Validations require multi-signature approval.
        </p>
      </div>
    </div>
  );
}
