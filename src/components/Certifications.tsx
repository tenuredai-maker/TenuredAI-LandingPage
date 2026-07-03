import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ShieldCheck, GraduationCap, Link as LinkIcon, BadgeCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  domainId: 'engineering' | 'strategy' | 'design';
  verifyUrl: string;
  icon: any;
}

const CERTIFICATES: Certificate[] = [
  {
    id: 'c1',
    title: 'Advanced Consensus Algorithms',
    issuer: 'Distributed Systems Inst.',
    date: 'Oct 2025',
    domainId: 'engineering',
    verifyUrl: '#',
    icon: ShieldCheck
  },
  {
    id: 'c2',
    title: 'Adversarial Game Theory',
    issuer: 'Strategic Foresight Lab',
    date: 'Dec 2025',
    domainId: 'strategy',
    verifyUrl: '#',
    icon: GraduationCap
  },
  {
    id: 'c3',
    title: 'Cognitive UX Architectures',
    issuer: 'Human-AI Interface Group',
    date: 'Jan 2026',
    domainId: 'design',
    verifyUrl: '#',
    icon: BadgeCheck
  }
];

const DOMAIN_STYLES = {
  engineering: { bg: 'bg-primary/10', text: 'text-primary', label: 'Engineering' },
  strategy: { bg: 'bg-secondary/10', text: 'text-secondary', label: 'Strategy' },
  design: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', label: 'Design' }
};

export default function Certifications() {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-headline font-black text-on-surface">Verified Credentials</h3>
            <p className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">External Platform Sync</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest rounded-full transition-all border border-outline-variant/20 flex items-center gap-2 group">
          <LinkIcon className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-primary transition-colors" />
          <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest">Connect Provider</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {CERTIFICATES.map((cert) => {
          const style = DOMAIN_STYLES[cert.domainId];
          return (
            <motion.div
              key={cert.id}
              whileHover={{ y: -4 }}
              className="p-5 bg-surface-container-high/40 border border-outline-variant/10 rounded-3xl hover:border-primary/30 transition-all flex flex-col group h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn("px-2.5 py-1 rounded-md text-[9px] font-mono font-black uppercase tracking-widest", style.bg, style.text)}>
                  {style.label}
                </div>
                <cert.icon className="w-4 h-4 text-on-surface-variant/20 group-hover:text-primary/40 transition-colors" />
              </div>

              <h4 className="text-sm font-bold text-on-surface mb-1 leading-tight group-hover:text-primary transition-colors">
                {cert.title}
              </h4>
              <p className="text-[11px] text-on-surface-variant/80 font-body mb-4">
                Issued by {cert.issuer}
              </p>

              <div className="mt-auto pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold text-on-surface-variant/40 uppercase tracking-widest">
                  {cert.date}
                </span>
                <a 
                  href={cert.verifyUrl}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-primary opacity-0 group-hover:opacity-100 transition-all hover:scale-105"
                >
                  <span className="text-[10px] uppercase">Verify Node</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3 py-3 px-6 bg-surface-container-high/20 border border-outline-variant/10 rounded-2xl">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <p className="text-[10px] text-on-surface-variant font-medium text-center">
          All credentials are cross-referenced with sovereign platform hashes.
        </p>
      </div>
    </div>
  );
}
