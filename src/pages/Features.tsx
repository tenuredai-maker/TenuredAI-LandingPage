import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Brain, Activity, FileBadge, Fingerprint, ShieldCheck, History, ArrowRight, Settings, Globe, Mail, X, CheckCircle2, Zap, AlertTriangle, Database } from 'lucide-react';

interface ProvingFeature {
  id: string;
  title: string;
  brief: string;
  full: string;
  scenarios: string[];
  skillSets: string[];
  difficulty: 'Intermediate' | 'Advanced' | 'Expert';
  icon: React.ReactNode;
}

const provingFeatures: ProvingFeature[] = [
  {
    id: 'debugging',
    title: 'Live Debugging',
    brief: 'Real-time resolution of critical system failures.',
    full: 'Step into a live, failing production environment where every keystroke is logged and analyzed for efficiency and logical soundness. This is not a sandbox; it is a forensic reconstruction of real-world outages.',
    scenarios: ['The Memory Leak', 'The Race Condition', 'The Cascading Timeout'],
    skillSets: ['Runtime Analysis', 'Heap Profiling', 'Concurrency Management'],
    difficulty: 'Advanced',
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: 'pressure',
    title: 'Architecture Pressure-Tests',
    brief: 'Stress-testing system designs under extreme load.',
    full: 'Submit your architectural blueprints to a synthetic traffic generator that simulates 100x peak load. We test for bottlenecks, single points of failure, and auto-scaling efficacy in a high-concurrency environment.',
    scenarios: ['The Black Friday Surge', 'The DDoS Mitigation', 'The Global Data Sync'],
    skillSets: ['Distributed Systems', 'Load Balancing', 'Database Sharding'],
    difficulty: 'Expert',
    icon: <Activity className="w-5 h-5" />
  },
  {
    id: 'recovery',
    title: 'SLA Recovery Ops',
    brief: 'Rapid restoration of services under strict time constraints.',
    full: 'A high-pressure simulation where you must restore a multi-region service outage while maintaining strict SLA compliance. Every second of downtime is quantified against your final competence score.',
    scenarios: ['The Regional Outage', 'The Data Corruption Event', 'The Security Breach Lockdown'],
    skillSets: ['Disaster Recovery', 'Incident Response', 'Stakeholder Communication'],
    difficulty: 'Intermediate',
    icon: <AlertTriangle className="w-5 h-5" />
  },
  {
    id: 'security',
    title: 'Zero-Day Patching',
    brief: 'Identify and patch critical vulnerabilities.',
    full: 'A rigorous security audit simulation where you must uncover and patch zero-day vulnerabilities in a live system before automated adversaries exploit them. Speed and accuracy are paramount.',
    scenarios: ['The SQL Injection', 'The Auth Bypass', 'The Supply Chain Attack'],
    skillSets: ['Security Auditing', 'Cryptography', 'Incident Response'],
    difficulty: 'Expert',
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 'optimization',
    title: 'Query Optimization',
    brief: 'Optimize complex database operations under load.',
    full: 'Analyze and rewrite inefficient database queries that are bringing the system to a halt. Balance explain plans, index creation, and cache invalidation strategies to bring latency back under SLA.',
    scenarios: ['The N+1 Problem', 'The Missing Index', 'The Cache Stampede'],
    skillSets: ['Database Tuning', 'SQL Profiling', 'Caching Strategies'],
    difficulty: 'Intermediate',
    icon: <Database className="w-5 h-5" />
  }
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState<ProvingFeature | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [filterSkills, setFilterSkills] = useState<string[]>([]);

  const allSkills = Array.from(new Set(provingFeatures.flatMap(f => f.skillSets))).sort();

  const filteredFeatures = provingFeatures.filter(feature => {
    const matchesDifficulty = filterDifficulty === 'All' || feature.difficulty === filterDifficulty;
    const matchesSkill = filterSkills.length === 0 || filterSkills.some(skill => feature.skillSets.includes(skill));
    return matchesDifficulty && matchesSkill;
  });

  const clearFilters = () => {
    setFilterDifficulty('All');
    setFilterSkills([]);
  };

  const toggleSkill = (skill: string) => {
    setFilterSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleFeatureClick = (feature: ProvingFeature) => {
    setActiveFeature(feature);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 md:py-32">
      {/* Hero Section */}
      <section className="mb-24 text-center md:text-left">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center px-4 py-1 rounded-full bg-tertiary-container/20 text-tertiary mb-6"
        >
          <Shield className="w-4 h-4 mr-2 fill-current" />
          <span className="text-xs font-label font-bold tracking-widest uppercase">The High-Friction Fortress</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-headline text-5xl md:text-7xl text-on-background mb-8 leading-tight max-w-4xl"
        >
          Proving Capability Through <span className="italic text-primary">Uncompromising Evidence.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-on-surface-variant max-w-2xl leading-relaxed font-light"
        >
          In an era of synthetic noise, Tenured AI provides a sovereign vault for your technical soul. We don't just list skills; we architect challenges that verify competence.
        </motion.p>
      </section>

      {/* Atmospheric Entry Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full h-64 md:h-[400px] rounded-2xl overflow-hidden relative mb-6 border border-outline-variant/10 editorial-shadow group"
      >
        <img 
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Forensic Architecture Terminal" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
          referrerPolicy="no-referrer"
        />
        {/* Intellectual Blue Tint Overlay */}
        <div className="absolute inset-0 bg-tertiary/60 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-surface/20 to-transparent"></div>
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex items-center gap-3 z-10">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-on-surface drop-shadow-md">V-100 Lab // Live Environment</span>
        </div>
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
        {/* The Proving Ground (Major Card) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="col-span-1 md:col-span-12 bg-surface-container-low rounded-2xl p-6 md:p-12 overflow-hidden relative group"
        >
          {/* Background subtle image */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-multiply hidden md:block">
            <img 
              alt="The Proving Ground simulation" 
              className="w-full h-full object-cover grayscale opacity-50" 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/80 to-transparent"></div>
          </div>

          <div className="relative z-10 flex flex-col xl:flex-row gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center">
                  <Brain className="text-primary w-6 h-6" />
                </div>
                <h3 className="font-headline text-3xl md:text-4xl text-on-background font-bold tracking-tight">The Proving Ground</h3>
              </div>
              <p className="text-on-surface-variant text-lg max-w-2xl mb-10 leading-relaxed">
                Deploy into ephemeral, high-stakes technical simulations. These aren't tests; they are live-fire environments where your architectural decisions leave a permanent forensic trail.
              </p>

              <div className="flex flex-col gap-6 mb-8 max-w-3xl">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-label font-bold text-outline-variant uppercase tracking-widest text-on-surface-variant">Filter by Difficulty</label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['All', 'Intermediate', 'Advanced', 'Expert'].map(diff => (
                        <button
                          key={diff}
                          onClick={() => setFilterDifficulty(diff)}
                          className={`px-3 py-1.5 rounded border text-[11px] font-bold uppercase tracking-wider transition-colors ${
                            filterDifficulty === diff 
                              ? 'bg-primary text-on-primary border-primary' 
                              : 'bg-surface-container-highest text-on-surface-variant border-transparent hover:border-primary/50 hover:text-on-surface'
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-label font-bold text-outline-variant uppercase tracking-widest text-on-surface-variant">Filter by Skills</label>
                      {(filterSkills.length > 0 || filterDifficulty !== 'All') && (
                        <button 
                          onClick={clearFilters}
                          className="text-[10px] font-label font-bold text-primary uppercase tracking-widest hover:underline"
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                      {allSkills.map(skill => {
                        const isSelected = filterSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            className={`px-3 py-1.5 rounded border text-[11px] font-bold transition-colors flex items-center gap-1.5 ${
                              isSelected 
                                ? 'bg-secondary text-on-primary border-secondary' 
                                : 'bg-surface-container-highest text-on-surface-variant border-transparent hover:border-primary/40 hover:text-on-surface'
                            }`}
                          >
                            {skill}
                            {isSelected && <X className="w-3 h-3" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full xl:max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredFeatures.map((feature) => (
                    <motion.button
                      key={feature.id}
                      layoutId={`feature-${feature.id}`}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => handleFeatureClick(feature)}
                      whileHover={{ scale: 1.03, y: -4, boxShadow: "0 10px 30px -5px rgba(119, 90, 25, 0.15)" }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="group/btn relative py-5 px-6 rounded-xl border border-outline-variant/10 bg-surface-container-highest text-on-surface-variant font-label text-sm font-semibold hover:bg-surface-container-lowest hover:border-primary/30 transition-all flex flex-col items-start gap-2 text-left h-full z-10 hover:z-20"
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="text-on-surface font-headline font-bold text-lg group-hover/btn:text-primary transition-colors">{feature.title}</span>
                        <div className="p-1 rounded bg-surface-container-low opacity-60 group-hover/btn:opacity-100 transition-opacity">
                          <ArrowRight className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                      
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                        feature.difficulty === 'Expert' ? 'bg-error/10 text-error' :
                        feature.difficulty === 'Advanced' ? 'bg-primary/10 text-primary' :
                        'bg-tertiary/10 text-tertiary'
                      }`}>
                        {feature.difficulty}
                      </span>
                      
                      <span className="text-xs mt-2 opacity-80 group-hover/btn:opacity-100 transition-opacity leading-relaxed font-normal">
                        {feature.brief}
                      </span>
                    </motion.button>
                  ))}
                </AnimatePresence>
                {filteredFeatures.length === 0 && (
                  <div className="col-span-1 sm:col-span-2 py-12 flex flex-col items-center justify-center text-on-surface-variant border-2 border-dashed border-outline-variant/20 rounded-xl">
                    <Database className="w-8 h-8 mb-3 opacity-20" />
                    <span className="font-headline font-bold">No modules available</span>
                    <span className="text-xs mt-1 opacity-70">Try adjusting your filters</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sovereign Passport (Full Width Highlight) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="col-span-1 md:col-span-12 bg-surface-container-lowest rounded-2xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-16 editorial-shadow"
        >
          <div className="flex-1 order-2 md:order-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center">
                <FileBadge className="text-primary w-6 h-6" />
              </div>
              <h3 className="font-headline text-3xl md:text-4xl text-on-background font-bold tracking-tight">The Sovereign Passport</h3>
            </div>
            <p className="text-on-surface-variant text-lg md:text-xl mb-12 leading-relaxed max-w-2xl">
              The resume is dead. The Sovereign Passport is a cryptographic ledger of every verified action you’ve taken within Tenured AI. It is an immutable, forensic record of your true capability—portable, private, and powerful.
            </p>
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-4 p-5 rounded-xl bg-surface-container-low">
                <ShieldCheck className="text-primary w-6 h-6 shrink-0" />
                <span className="text-xs md:text-sm font-label font-bold text-on-surface uppercase tracking-widest leading-tight">Cryptographic Verification: SHA-256 Anchored</span>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-xl bg-surface-container-low">
                <History className="text-primary w-6 h-6 shrink-0" />
                <span className="text-xs md:text-sm font-label font-bold text-on-surface uppercase tracking-widest leading-tight">Immutable Contribution Logs</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[450px] lg:w-[480px] order-1 md:order-2 shrink-0">
            <div className="aspect-[4/5] rounded-2xl bg-surface-container-highest p-2 ambient-shadow group/passport relative">
              <div className="w-full h-full bg-surface-container-low rounded-[1.2rem] flex flex-col p-8 md:p-10 overflow-hidden relative">
                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-24 w-full animate-[scan_4s_linear_infinite] pointer-events-none"></div>
                
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Passport ID</p>
                    <p className="font-mono text-xl md:text-2xl font-bold text-primary">X-775A-19</p>
                  </div>
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-surface-container-highest rounded-full flex items-center justify-center group-hover/passport:scale-110 transition-transform">
                    <Fingerprint className="text-primary w-6 h-6 md:w-7 md:h-7" />
                  </div>
                </div>

                {/* Profile Section */}
                <div className="flex gap-6 md:gap-8 mb-10 relative z-10">
                  <div className="w-24 h-32 md:w-28 md:h-36 bg-surface-container-highest rounded-xl overflow-hidden relative group/photo shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                      alt="Passport Holder" 
                      className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80 group-hover/photo:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 space-y-4 min-w-0">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Subject Name</p>
                      <p className="text-xs md:text-sm font-bold tracking-wide truncate">ALEXANDER VANCE</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Node Origin</p>
                      <p className="text-xs md:text-sm font-mono font-bold tracking-wide truncate">US-EAST-1 // NYC</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Clearance</p>
                      <p className="text-xs md:text-sm font-bold text-primary flex items-center gap-1.5 tracking-wide">
                        <ShieldCheck className="w-4 h-4 shrink-0" /> LEVEL 4
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-6 md:gap-8 mb-8 relative z-10">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Issue Date</p>
                    <p className="text-xs md:text-sm font-mono font-bold">2024.10.11</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Expiry</p>
                    <p className="text-xs md:text-sm font-mono font-bold">PERPETUAL</p>
                  </div>
                </div>

                {/* Barcode/Hash Section */}
                <div className="mt-auto relative z-10">
                  <div className="h-8 md:h-10 w-full bg-on-surface/5 rounded flex items-center justify-center gap-1 md:gap-1.5 px-3 overflow-hidden">
                    {Array.from({ length: 45 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="w-px bg-on-surface" 
                        style={{ height: `${Math.random() * 80 + 20}%` }}
                      />
                    ))}
                  </div>
                  <p className="text-[8px] font-mono text-center mt-3 text-on-surface-variant truncate tracking-wide">
                    HASH: 8f3c2b1a9d8e7f6g5h4i3j2k1l0m9n8o7p6q5r4s3t2u1v0w
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* The Grit Heatmap */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="col-span-1 md:col-span-6 lg:col-span-4 bg-surface-container-highest rounded-2xl p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center">
                <Activity className="text-primary w-6 h-6" />
              </div>
              <h3 className="font-headline text-2xl font-bold tracking-tight">Grit Heatmap</h3>
            </div>
            <p className="text-on-surface-variant mb-12 leading-relaxed text-sm">
              Visualize skill decay and cognitive endurance. Tenured AI tracks the velocity of your mastery, ensuring your expertise is never static or outdated.
            </p>
          </div>
          <div className="flex flex-col space-y-3">
            {/* Faux Heatmap Visualization */}
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: 28 }).map((_, i) => {
                const isHigh = [0, 4, 6, 8, 12, 16, 20, 22].includes(i);
                const isMed = [1, 7, 13, 19, 25].includes(i);
                const isLow = [2, 5, 11, 15, 23].includes(i);
                const isNone = !isHigh && !isMed && !isLow;

                const decay = isHigh ? "0%" : isMed ? "15%" : isLow ? "42%" : "89%";
                const time = isHigh ? "2 hours ago" : isMed ? "1 day ago" : isLow ? "4 days ago" : "12 days ago";
                const bgClass = isHigh ? 'bg-primary' : isMed ? 'bg-primary-container' : isLow ? 'bg-primary/20' : 'bg-surface-container-low';
                
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.4, 
                      delay: i * 0.02, 
                      ease: "easeOut"
                    }}
                    className={`relative group aspect-square rounded-[2px] ${bgClass} cursor-pointer hover:ring-2 ring-primary/50 transition-all z-10 hover:z-20`}
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-2 bg-surface text-[10px] font-mono shadow-xl border border-outline-variant/20 rounded-lg opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none drop-shadow-lg flex flex-col gap-1 items-center">
                      <div className="flex gap-3">
                        <span className="text-secondary text-right">Decay:</span>
                        <span className="text-on-surface font-bold text-left">{decay}</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-secondary text-right">Activity:</span>
                        <span className="text-on-surface font-bold text-left">{time}</span>
                      </div>
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-surface border-b border-r border-outline-variant/20 rotate-45 transform"></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <span className="text-[10px] font-mono text-on-surface-variant text-right uppercase font-bold tracking-widest pt-2">Velocity: 0.94 Alpha</span>
          </div>
        </motion.div>

        {/* Technical Red Team Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="col-span-1 md:col-span-6 lg:col-span-4 bg-surface-container-low rounded-2xl p-8 flex flex-col group justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center">
                <Shield className="text-primary w-6 h-6" />
              </div>
              <h3 className="font-headline text-2xl font-bold tracking-tight">Continuous Red-Teaming</h3>
            </div>
            <p className="text-on-surface-variant text-sm mb-12 leading-relaxed">
              Professional competence is a moving target. Our internal Red Team constantly probes your submitted solutions for edge-case failures, ensuring your "Tenure" is earned every single day.
            </p>
          </div>
          <div className="mt-auto pt-8 flex justify-between items-center border-t border-outline-variant/10">
            <span className="text-[10px] font-label font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded">Status: Active</span>
          </div>
        </motion.div>

        {/* Evidence Section (Small Feature) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="col-span-1 md:col-span-12 lg:col-span-4 bg-surface-container-highest rounded-2xl p-8 flex flex-col text-on-surface justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-2xl font-bold tracking-tight">Forensic Competence</h3>
            </div>
            <p className="text-on-surface-variant text-sm mb-12 leading-relaxed">
              We've removed the middleman between you and the truth. No recruiters, no resumes—just a direct, unhackable link to your technical reality.
            </p>
          </div>
          <div className="mt-auto">
            <div className="flex -space-x-4 overflow-hidden mb-4">
              {[1, 2, 3].map((i) => (
                <img 
                  key={i}
                  alt={`Architect ${i}`} 
                  className="inline-block h-12 w-12 rounded-full ring-4 ring-surface-container-highest grayscale mix-blend-multiply opacity-80" 
                  src={`https://images.unsplash.com/photo-${['1568602428641-ceebcdbfc6b6','1573496359142-b8d87734a5a2','1580489944761-15a19d654956'][i-1]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`}
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest font-bold">Trusted by over 1,400 Architects</p>
          </div>
        </motion.div>
      </div>

      {/* Final CTA Section */}
      <section className="mt-32 pt-24 border-t border-outline-variant/10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-headline font-bold">Ready to Prove Your Worth?</h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Join the elite network of verified architects. Establish your sovereign identity and begin your forensic journey today.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
            <Link 
              to="/request-access"
              className="w-full md:w-auto px-12 py-4 gold-gradient text-on-primary font-headline font-bold text-lg rounded-xl shadow-2xl shadow-primary/20 hover:scale-105 transition-all"
            >
              Request Access
            </Link>
            <Link 
              to="/manifesto"
              className="w-full md:w-auto px-12 py-4 bg-surface-container-high text-on-surface font-headline font-bold text-lg rounded-xl hover:bg-surface-container-highest transition-all"
            >
              Read Manifesto
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Detail Modal */}
      <AnimatePresence>
        {activeFeature && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
              onClick={() => setActiveFeature(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div 
              layoutId={`feature-${activeFeature.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-surface-container-low rounded-[2rem] border border-outline-variant/20 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setActiveFeature(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-on-surface/5 transition-colors z-10"
              >
                <X className="w-6 h-6 text-on-surface-variant" />
              </button>

              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    {activeFeature.icon}
                  </div>
                  <div>
                    <h2 className="font-headline text-3xl font-bold text-on-background">{activeFeature.title}</h2>
                    <p className="text-primary text-xs font-label font-bold uppercase tracking-widest mt-1">
                      Proving Ground Module &bull; {activeFeature.difficulty}
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-[10px] font-label font-bold text-outline uppercase tracking-widest mb-3">Operational Overview</h4>
                    <p className="text-on-surface-variant leading-relaxed">
                      {activeFeature.full}
                    </p>
                  </section>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section>
                      <h4 className="text-[10px] font-label font-bold text-outline uppercase tracking-widest mb-4">Example Scenarios</h4>
                      <ul className="space-y-3">
                        {activeFeature.scenarios.map((scenario, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-sm text-on-surface">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {scenario}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h4 className="text-[10px] font-label font-bold text-outline uppercase tracking-widest mb-4">Required Skill Sets</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeFeature.skillSets.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-lg bg-surface-container-highest text-[11px] font-bold text-on-surface-variant border border-outline-variant/10">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="pt-8 border-t border-outline-variant/10 flex justify-end">
                    <motion.button 
                      onClick={() => setActiveFeature(null)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="px-8 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                    >
                      Initialize Simulation
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
