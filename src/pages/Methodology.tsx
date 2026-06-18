import { motion, AnimatePresence } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Radar as RadarArea, ResponsiveContainer } from 'recharts';
import { ArrowRight, BarChart3, School, Terminal, Bolt, CheckCircle, Shield, Search, Settings, GitBranch, Zap, RefreshCw, Activity } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { cn } from '@/src/lib/utils';

const radarData = [
  { subject: 'Prompt Fidelity', A: 92, fullMark: 100 },
  { subject: 'Latent Recall', A: 85, fullMark: 100 },
  { subject: 'Orchestration', A: 96, fullMark: 100 },
  { subject: 'Ethical Alignment', A: 89, fullMark: 100 },
  { subject: 'Debug Speed', A: 94, fullMark: 100 },
];

const Tooltip: React.FC<{ children: React.ReactNode; content: React.ReactNode; externalVisible?: boolean }> = ({ children, content, externalVisible }) => {
  const [isVisible, setIsVisible] = useState(false);
  const show = externalVisible || isVisible;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: -5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-64 p-4 bg-surface-container-highest/95 backdrop-blur-xl rounded-xl ambient-shadow pointer-events-none border border-outline-variant/10 shadow-2xl"
          >
            <div className="relative z-10">
              {content}
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-surface-container-highest/95" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Methodology() {
  const [challengeInput, setChallengeInput] = useState('');
  
  const [aiciScores, setAiciScores] = useState<Record<string, number>>({
    'Prompt Fidelity': 92,
    'Latent Recall': 85,
    'Orchestration': 96,
    'Ethical Alignment': 89,
    'Debug Speed': 94,
  });

  const [aioiScores, setAioiScores] = useState<Record<string, number>>({
    'Multi-agent Sync': 94,
    'Loop Efficiency': 91,
    'Context Management': 88,
    'Strategic Routing': 95,
    'System Resilience': 92,
  });

  const [aibsScores, setAibsScores] = useState<Record<string, number>>({
    'Vector RAG': 98,
    'Model Optimization': 92,
    'Schema Soundness': 95,
    'Deployment Velocity': 90,
    'Infrastructure Integrity': 94,
  });

  const [aibsLog, setAibsLog] = useState<string[]>(['System initialized...', 'Baseline architecture verified.']);
  const [hoveredAiciKey, setHoveredAiciKey] = useState<string | null>(null);

  const getRadarData = (scores: Record<string, number>) => 
    Object.entries(scores).map(([subject, value]) => ({
      subject,
      A: value,
      fullMark: 100,
    }));

  const getAverage = (scores: Record<string, number>) => {
    const vals = Object.values(scores) as number[];
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  };

  const aiciRadarData = useMemo(() => getRadarData(aiciScores), [aiciScores]);
  const aioiRadarData = useMemo(() => getRadarData(aioiScores), [aioiScores]);
  const aibsRadarData = useMemo(() => getRadarData(aibsScores), [aibsScores]);

  const updateAibsScore = (key: string, value: number) => {
    const oldValue = aibsScores[key] || 0;
    setAibsScores(prev => ({ ...prev, [key]: value }));
    if (Math.abs(oldValue - value) > 5) {
      setAibsLog(prevLog => [`[LOG] ${key} recalibrated to ${value}%`, ...prevLog].slice(0, 5));
    }
  };

  const [aioiedScores, setAioiedScores] = useState<Record<string, number>>({
    'Efficiency': 96,
    'Security': 98,
    'Debug Speed': 94,
  });

  const aiciWhyMatters: Record<string, string> = {
    'Prompt Fidelity': 'Ensures that AI outputs align perfectly with complex business logic, reducing the need for manual prompt engineering iterations.',
    'Latent Recall': 'Critical for long-running workflows where maintaining context over thousands of tokens is necessary for consistent decision-making.',
    'Orchestration': 'High orchestration scores enable the management of multi-agent swarms with minimal supervisor intervention.',
    'Ethical Alignment': 'Essential for institutional deployment to ensure compliance with global safety standards and minimize reputational risk.',
    'Debug Speed': 'Directly impacts the agility of the development cycle, allowing for rapid recovery from logical AI failures in production.',
  };

  const aiciDescriptions: Record<string, string> = {
    'Prompt Fidelity': 'Accuracy in translating complex human intent into executable instructions.',
    'Latent Recall': 'Ability to retrieve and apply deep-context information.',
    'Orchestration': 'Efficiency in managing multi-step reasoning chains, as well as the capacity to effectively lead cross-functional teams, allocate project resources dynamically, and drive strategic initiatives to completion.',
    'Ethical Alignment': 'Adherence to safety protocols and bias mitigation.',
    'Debug Speed': 'Rapid identification and correction of logical fallacies.',
  };

  const aioiDescriptions: Record<string, string> = {
    'Multi-agent Sync': 'Coordination efficacy between specialized synthetic agents in a shared environment.',
    'Loop Efficiency': 'Optimization of iterative reasoning cycles to minimize latency and token overhead.',
    'Context Management': 'Precision in maintaining state and relevance across long-form strategic sessions.',
    'Strategic Routing': 'Intelligent delegation of tasks to the most capable model or agent node.',
    'System Resilience': 'Ability to maintain operational integrity under high-concurrency or adversarial conditions.',
  };

  const aibsDescriptions: Record<string, string> = {
    'Vector RAG': 'Sophistication of retrieval-augmented generation architectures and embedding precision.',
    'Model Optimization': 'Efficacy in fine-tuning, quantization, and performance-tuning for specific use cases.',
    'Schema Soundness': 'Structural integrity and scalability of data models and API interfaces.',
    'Deployment Velocity': 'Speed and reliability of transitioning synthetic solutions from dev to production.',
    'Infrastructure Integrity': 'Robustness of the underlying compute, storage, and networking stack.',
  };

  const aioiedDescriptions: Record<string, string> = {
    'Efficiency': 'Measures the optimization of AI resource allocation and the speed of automated educational workflows.',
    'Security': 'Evaluates the robustness of student data protection, privacy protocols, and institutional node integrity.',
    'Debug Speed': 'Quantifies the agility in identifying and resolving technical glitches or pedagogical misalignments.',
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-surface-container-low pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-xs font-bold uppercase tracking-widest">
              Technical Specification v4.0.1
            </div>
            <h1 className="font-headline text-6xl lg:text-8xl font-bold text-on-surface tracking-tighter leading-none">
              The Institutional <span className="text-primary italic">Standard</span> for Intelligence.
            </h1>
            <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              Quantifying the bridge between human expertise and synthetic orchestration. Tenured AI’s scoring engine provides real-time verification of AI Competency, Orchestration Efficiency, and Builder Soundness.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-primary text-on-primary rounded-lg font-bold flex items-center gap-2 hover:bg-surface-tint transition-colors group">
                Initialize Protocol <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-surface-container-highest text-on-surface font-bold rounded-lg hover:bg-outline-variant transition-colors">
                Download Whitepaper
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-square bg-gradient-to-tr from-surface-container-highest to-surface-container-low rounded-3xl p-1 relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#775a19_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <div className="w-full h-full rounded-[1.4rem] bg-surface flex flex-col items-center justify-center overflow-hidden border border-outline-variant/10 relative">
                <img 
                  alt="technical blueprint" 
                  className="w-full h-full object-cover mix-blend-multiply opacity-80" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBnqUDfzQ4NZqLMoafvXSpf5bkDpuibmGCQvCW4YJi7qojNqMCq4h-hC_lLXNDRx0Vwun8QVo1HP-sOc95nbHIfaPOXQeFgSXYCISbL_JXmQWPsPwr_AMPqkhCFEpNVonuJMmp7t0l69j5L6kILM0lXNCt_bAHhU0z7goNo0iO90SZlEbe8wUOgWiXUGfj3WqBEF8ZXXEDHcNzskVkV2tcvv4aM_WWuT8hj9yVyJzEiQFv5Fp2_02kgjIVbkqs0gEOU1ISHKM"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
                  <div className="w-64 h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={aiciRadarData}>
                        <PolarGrid stroke="#d1c5b4" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#775a19', fontSize: 10, fontWeight: 'bold' }} />
                        <RadarArea name="Score" dataKey="A" stroke="#775a19" fill="#775a19" fillOpacity={0.4} animationDuration={300} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-surface/90 backdrop-blur-md px-6 py-4 rounded-xl shadow-xl border border-outline-variant/20">
                    <div className="text-xs font-bold text-primary tracking-widest uppercase">System Integrity</div>
                    <div className="text-3xl font-headline font-bold">{(getAverage(aiciScores) * 0.9984 + (100 - getAverage(aiciScores)) * 0.5).toFixed(2)}%</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Section 1: Command Bar */}
      <section className="py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-surface-container-high sm:rounded-full rounded-2xl px-6 py-3 flex flex-col sm:flex-row items-center justify-between border border-outline-variant/15 gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto overflow-x-auto">
              <span className="text-[10px] whitespace-nowrap font-bold text-outline uppercase tracking-widest sm:border-r border-outline-variant sm:pr-4">Command Console</span>
              <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto custom-scrollbar-hide">
                <button className="text-[10px] sm:text-xs whitespace-nowrap font-bold text-primary px-4 py-1.5 bg-surface rounded-full shadow-sm uppercase tracking-widest">Methodology</button>
                <button className="text-[10px] sm:text-xs whitespace-nowrap font-bold text-secondary px-4 py-1.5 hover:bg-surface-container transition-colors rounded-full uppercase tracking-widest">Validator Node</button>
                <button className="text-[10px] sm:text-xs whitespace-nowrap font-bold text-secondary px-4 py-1.5 hover:bg-surface-container transition-colors rounded-full uppercase tracking-widest">Scoring Tiers</button>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Live Sync Active
              </div>
              <div className="h-6 w-px bg-outline-variant"></div>
              <div className="flex gap-4 text-stone-400">
                <Search className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" />
                <Settings className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Triple-Threat Scoring Section */}
      <section className="py-24 bg-surface px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-headline text-5xl font-bold mb-4 tracking-tight">The Core Trinity Metrics</h2>
            <p className="text-on-surface-variant max-w-3xl">A multidimensional approach to AI proficiency. We don't just measure output; we measure the architecture of intelligence and the efficacy of the operator.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* AICI™ Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-surface-container-low p-10 rounded-3xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-outline-variant/10"
            >
              <div className="space-y-6 flex-grow">
                <div className="flex justify-between items-start">
                  <div className="text-xs font-bold text-primary tracking-widest uppercase">Index I</div>
                  <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">v4.0.1</span>
                </div>
                <h3 className="text-3xl font-headline font-bold">AICI™: Competency</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Focus on foundational literacy, prompting logic, and ethical framework alignment. Verifying the bridge between human intent and synthetic reasoning.</p>
                
                <div className="pt-4">
                  <div className="text-[10px] uppercase font-bold text-secondary mb-3 tracking-widest">Foundational Knowledge Heatmap</div>
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className={cn(
                        "h-8 rounded-sm transition-colors duration-500",
                        i % 3 === 0 ? "bg-primary/90" : i % 2 === 0 ? "bg-primary/60" : "bg-primary/30"
                      )}></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-8 space-y-4">
                {[
                  { label: "Prompting Logic", val: 92 },
                  { label: "Ethical Framework", val: 89 }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-[10px] font-bold uppercase text-secondary tracking-widest">{item.label}</span>
                      <span className="text-sm font-bold text-primary">{item.val}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.val}%` }}
                        viewport={{ once: true }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AIOI™ Card */}
            <div className="space-y-8 flex flex-col">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-primary text-on-primary p-10 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col h-full group"
              >
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
                <div className="relative z-10 space-y-6 flex-grow">
                  <div className="text-xs font-bold text-primary-fixed tracking-widest uppercase">Index II • Strategic Level</div>
                  <h3 className="text-3xl font-headline font-bold">AIOI™: Orchestration</h3>
                  <p className="text-sm text-primary-fixed leading-relaxed">Focusing on Strategic Orchestration: managing systems, multi-agent workflows, and AI solution architecture. Command of the machine through complex loops and agentic reasoning.</p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="border-l-2 border-primary-fixed/30 pl-3">
                      <div className="text-[10px] uppercase font-bold text-primary-fixed/70 tracking-widest">Workflows</div>
                      <div className="text-lg font-bold">9.7</div>
                    </div>
                    <div className="border-l-2 border-primary-fixed/30 pl-3">
                      <div className="text-[10px] uppercase font-bold text-primary-fixed/70 tracking-widest">Strategy</div>
                      <div className="text-lg font-bold">9.4</div>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 pt-8 flex items-center gap-4">
                  <GitBranch className="text-primary-fixed w-8 h-8" />
                  <div className="h-1 flex-grow bg-primary-fixed/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '96%' }}
                      viewport={{ once: true }}
                      className="h-full bg-primary-fixed"
                    />
                  </div>
                </div>
              </motion.div>

              <div className="bg-surface-container-highest p-6 rounded-3xl border-2 border-primary/20 relative overflow-hidden flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                    <School className="text-on-primary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-tight">AIOI-ED™ Educator Designation</h4>
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Specialized Management Sub-score</p>
                  </div>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-tight">A specialized sub-score for Management & Education focusing on Efficiency, Security, and Debug Speed. Measured via the WMF (Weighted Multi-Factor) Index.</p>
                <div className="bg-on-surface/5 rounded-xl p-3 font-mono text-[10px] border border-outline-variant/10">
                  <div className="text-primary font-bold mb-1">// WMF Index: Efficiency (40%) + Security (30%) + Debug (30%)</div>
                  <div className="flex justify-between items-center text-on-surface">
                    <span>Certification Status:</span>
                    <span className="text-green-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> VALIDATED
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* AIBS™ Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-surface-container-low p-10 rounded-3xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-outline-variant/10"
            >
              <div className="space-y-6 flex-grow">
                <div className="flex justify-between items-start">
                  <div className="text-xs font-bold text-primary tracking-widest uppercase">Index III • Architect</div>
                  <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">v4.0.1</span>
                </div>
                <h3 className="text-3xl font-headline font-bold">AIBS™: Builder Score</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Quantifying technical architect skills: RAG, vector databases, model optimization, and complex agentic workflows.</p>
                
                <div className="pt-4">
                  <div className="text-[10px] uppercase font-bold text-secondary mb-3 tracking-widest">System Integrity Stress-Test</div>
                  <div className="w-full h-24 bg-surface-container flex items-center justify-center rounded-xl border border-outline-variant/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-[shimmer_2s_infinite]"></div>
                    <div className="w-16 h-16 rounded-full border-2 border-primary/20 flex items-center justify-center animate-pulse">
                      <Bolt className="text-primary w-8 h-8" />
                    </div>
                    <div className="absolute bottom-2 right-3 text-[10px] font-mono text-primary animate-pulse uppercase tracking-widest">Optimizing...</div>
                  </div>
                </div>
              </div>
              <div className="pt-8 grid grid-cols-2 gap-4">
                {[
                  { label: "Vector RAG", val: (aibsScores['Vector RAG'] / 10).toFixed(1) },
                  { label: "Model Opt.", val: (aibsScores['Model Optimization'] / 10).toFixed(1) }
                ].map((item, i) => (
                  <div key={i} className="bg-surface-container p-4 rounded-xl border border-outline-variant/10">
                    <div className="text-[10px] uppercase font-bold text-secondary mb-2 tracking-widest">{item.label}</div>
                    <div className="text-xl font-bold text-on-surface">{item.val}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: AICI™ Deep Dive Interactive Radar */}
      <section className="py-24 bg-surface-container-low border-y border-outline-variant/10 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Interactive Assessment</span>
                <h2 className="text-4xl md:text-5xl font-headline font-bold">AICI™ Deep Dive</h2>
                <p className="text-on-surface-variant leading-relaxed text-lg">
                  Simulate your institutional competency score by adjusting the core metrics below. Our proprietary algorithm weights these factors to determine your global node ranking.
                </p>
              </div>

              <div className="space-y-6">
                {Object.entries(aiciScores).map(([key, value]) => (
                  <Tooltip 
                    key={key} 
                    externalVisible={hoveredAiciKey === key}
                    content={
                      <div className="space-y-2 text-left">
                        <div className="flex justify-between items-center border-b border-outline-variant/15 pb-1.5 mb-1.5">
                          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.1em]">{key}</span>
                          <span className="font-mono text-xs font-bold text-on-surface">{value}</span>
                        </div>
                        <p className="text-[10px] text-on-surface leading-relaxed font-medium">
                          {aiciDescriptions[key]}
                        </p>
                        <div className="pt-1.5 border-t border-outline-variant/15">
                          <h4 className="text-[8px] font-bold text-primary uppercase tracking-[0.1em] mb-1">Why this matters</h4>
                          <p className="text-[9px] text-on-surface-variant leading-relaxed italic">
                            {aiciWhyMatters[key]}
                          </p>
                        </div>
                      </div>
                    }
                  >
                    <motion.div 
                      layout
                      animate={hoveredAiciKey === key ? { 
                        scale: 1.02,
                        x: 5,
                        backgroundColor: "rgba(119, 90, 25, 0.08)"
                      } : { 
                        scale: 1,
                        x: 0,
                        backgroundColor: "rgba(255, 255, 255, 0)"
                      }}
                      className={cn(
                        "space-y-2 p-3 transition-all duration-300 rounded-xl cursor-help border border-transparent",
                        hoveredAiciKey === key ? "border-primary/20 shadow-xl ring-1 ring-primary/10" : "hover:bg-white/40"
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <label className={cn(
                          "text-xs font-bold uppercase tracking-widest transition-colors",
                          hoveredAiciKey === key ? "text-primary" : "text-secondary group-hover:text-primary"
                        )}>{key}</label>
                        <div className="flex items-center gap-2">
                          {hoveredAiciKey === key && (
                            <motion.span 
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-[8px] font-black text-primary uppercase tracking-tighter"
                            >
                              Selected Node
                            </motion.span>
                          )}
                          <span className="text-sm font-mono font-bold text-primary">{value}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-on-surface-variant/80 leading-tight mb-1">
                        {aiciDescriptions[key]}
                      </p>
                      <div className="relative">
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={value}
                          onChange={(e) => setAiciScores(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                          className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary relative z-10"
                        />
                        {hoveredAiciKey === key && (
                          <motion.div 
                            layoutId="active-glow"
                            className="absolute -inset-1 bg-primary/10 blur-sm rounded-full z-0"
                          />
                        )}
                      </div>
                    </motion.div>
                  </Tooltip>
                ))}
              </div>

              <div className="pt-8 border-t border-outline-variant/20">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Simulated Score</div>
                    <div className="text-5xl font-headline font-bold text-primary">{getAverage(aiciScores)}</div>
                  </div>
                  <div className="h-12 w-px bg-outline-variant/30"></div>
                  <div className="flex-grow">
                    <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2">Institutional Tier</div>
                    <div className="text-lg font-bold">
                      {getAverage(aiciScores) >= 90 ? 'Sovereign Elite' : getAverage(aiciScores) >= 75 ? 'Institutional Grade' : 'Foundational'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-surface p-12 rounded-3xl border border-outline-variant/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#775a19_1px,transparent_1px)] [background-size:30px_30px]"></div>
              <div className="aspect-square w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart 
                    cx="50%" 
                    cy="50%" 
                    outerRadius="80%" 
                    data={aiciRadarData}
                    onMouseMove={(data) => {
                      if (data && data.activeLabel) {
                        setHoveredAiciKey(data.activeLabel);
                      }
                    }}
                    onMouseLeave={() => setHoveredAiciKey(null)}
                  >
                    <PolarGrid stroke="#d1c5b4" strokeDasharray="3 3" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#775a19', fontSize: 12, fontWeight: 'bold' }} 
                    />
                    <RadarArea 
                      name="Score" 
                      dataKey="A" 
                      stroke="#775a19" 
                      fill="#775a19" 
                      fillOpacity={0.5} 
                      animationDuration={300}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <AnimatePresence>
                {hoveredAiciKey && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute bottom-6 left-6 right-6 bg-primary/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 z-20 pointer-events-none"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">{hoveredAiciKey}</span>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-white">{aiciScores[hoveredAiciKey]}%</span>
                        </div>
                        <p className="text-[11px] text-white/90 leading-tight font-medium">
                          {aiciWhyMatters[hoveredAiciKey]}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute top-6 right-6">
                <div className="flex items-center gap-2 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Real-time Sync</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: AIOI™ Deep Dive Interactive Radar */}
      <section className="py-24 bg-surface px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-primary p-12 rounded-3xl shadow-2xl relative overflow-hidden order-2 lg:order-1"
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px]"></div>
              <div className="aspect-square w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={aioiRadarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#ffffff', fontSize: 12, fontWeight: 'bold' }} 
                    />
                    <RadarArea 
                      name="Score" 
                      dataKey="A" 
                      stroke="#ffffff" 
                      fill="#ffffff" 
                      fillOpacity={0.3} 
                      animationDuration={300}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 order-1 lg:order-2"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Strategic Orchestration</span>
                <h2 className="text-4xl md:text-5xl font-headline font-bold">AIOI™ Deep Dive</h2>
                <p className="text-on-surface-variant leading-relaxed text-lg">
                  Measure your capacity for multi-agent synchronization and system resilience. High AIOI scores indicate a mastery of complex synthetic workflows.
                </p>
              </div>

              <div className="space-y-6">
                {Object.entries(aioiScores).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary">{key}</label>
                      <span className="text-sm font-mono font-bold text-primary">{value}</span>
                    </div>
                    <p className="text-[10px] text-on-surface-variant/80 leading-tight mb-1">
                      {aioiDescriptions[key]}
                    </p>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={value}
                      onChange={(e) => setAioiScores(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                      className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-outline-variant/20">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Orchestration Rank</div>
                    <div className="text-5xl font-headline font-bold text-primary">{getAverage(aioiScores)}</div>
                  </div>
                  <div className="h-12 w-px bg-outline-variant/30"></div>
                  <div className="flex-grow">
                    <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2">Command Level</div>
                    <div className="text-lg font-bold">
                      {getAverage(aioiScores) >= 90 ? 'Grand Architect' : getAverage(aioiScores) >= 75 ? 'System Lead' : 'Operator'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: AIBS™ Deep Dive Interactive Radar */}
      <section className="py-24 bg-surface-container-low border-y border-outline-variant/10 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Technical Soundness</span>
                    <h2 className="text-4xl md:text-5xl font-headline font-bold">AIBS™ Deep Dive</h2>
                  </div>
                  <button 
                    onClick={() => {
                      setAibsScores({
                        'Vector RAG': 98,
                        'Model Optimization': 92,
                        'Schema Soundness': 95,
                        'Deployment Velocity': 90,
                        'Infrastructure Integrity': 94,
                      });
                      setAibsLog(['System reset to baseline.', ...aibsLog].slice(0, 5));
                    }}
                    className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest hover:bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset Baseline
                  </button>
                </div>
                <p className="text-on-surface-variant leading-relaxed text-lg">
                  Evaluate your technical builder proficiency across RAG architectures, model optimization, and deployment integrity. Adjust the parameters to see real-time status updates.
                </p>
              </div>

              <div className="space-y-6">
                {Object.entries(aibsScores).map(([key, value]) => (
                  <div key={key} className="space-y-2 group">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary group-hover:text-primary transition-colors">{key}</label>
                      <span className="text-sm font-mono font-bold text-primary bg-primary/5 px-2 py-0.5 rounded">{value}</span>
                    </div>
                    <p className="text-[10px] text-on-surface-variant/80 leading-tight mb-1">
                      {aibsDescriptions[key]}
                    </p>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={value}
                      onChange={(e) => updateAibsScore(key, parseInt(e.target.value))}
                      className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-outline-variant/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Builder Score</div>
                      <div className="text-5xl font-headline font-bold text-primary">{getAverage(aibsScores)}</div>
                    </div>
                    <div className="h-12 w-px bg-outline-variant/30"></div>
                    <div className="flex-grow">
                      <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2">Architect Status</div>
                      <div className={cn(
                        "text-lg font-bold px-3 py-1 rounded-lg inline-block",
                        getAverage(aibsScores) >= 90 ? "bg-green-500/10 text-green-700" : 
                        getAverage(aibsScores) >= 75 ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                      )}>
                        {getAverage(aibsScores) >= 90 ? 'Master Builder' : getAverage(aibsScores) >= 75 ? 'Senior Engineer' : 'Apprentice'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-surface p-4 rounded-xl border border-outline-variant/10 font-mono text-[10px] space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2 text-primary font-bold mb-2 uppercase tracking-widest">
                      <Activity className="w-3 h-3" /> System Log
                    </div>
                    {aibsLog.map((log, i) => (
                      <div key={i} className={cn("truncate", i === 0 ? "text-on-surface" : "text-on-surface-variant/50")}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-surface p-12 rounded-3xl border border-outline-variant/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#775a19_1px,transparent_1px)] [background-size:30px_30px]"></div>
              <div className="aspect-square w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={aibsRadarData}>
                    <PolarGrid stroke="#d1c5b4" strokeDasharray="3 3" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#775a19', fontSize: 12, fontWeight: 'bold' }} 
                    />
                    <RadarArea 
                      name="Score" 
                      dataKey="A" 
                      stroke="#775a19" 
                      fill="#775a19" 
                      fillOpacity={0.5} 
                      animationDuration={300}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-4 bg-surface/80 backdrop-blur-sm px-6 py-3 rounded-full border border-outline-variant/20 shadow-lg">
                  <div className="flex flex-col items-center">
                    <div className="text-[8px] font-bold text-secondary uppercase tracking-widest">Integrity</div>
                    <div className="text-xs font-bold text-primary">{(getAverage(aibsScores) * 0.998).toFixed(2)}%</div>
                  </div>
                  <div className="w-px h-6 bg-outline-variant/30"></div>
                  <div className="flex flex-col items-center">
                    <div className="text-[8px] font-bold text-secondary uppercase tracking-widest">Latency</div>
                    <div className="text-xs font-bold text-primary">{Math.max(12, 100 - getAverage(aibsScores))}ms</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* AIBS CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 pt-12 border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-headline font-bold">Deepen Your Technical Integration</h3>
              <p className="text-on-surface-variant max-w-xl">
                Access the full AIBS™ Protocol documentation, including vector optimization benchmarks, infrastructure requirements, and the complete deployment roadmap.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold flex items-center gap-2 hover:bg-surface-tint transition-all shadow-lg active:scale-95">
                Explore Further Details <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 bg-surface-container-highest text-on-surface rounded-xl font-bold flex items-center gap-2 hover:bg-outline-variant transition-all active:scale-95 border border-outline-variant/20">
                Download Full Protocol <Bolt className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section: AIOI-ED™ Mini-Assessment */}
      <section className="py-24 bg-surface px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-surface-container-highest rounded-[3rem] p-12 border border-outline-variant/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <School className="w-32 h-32 text-primary" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Educator Sub-module</span>
                  <h2 className="text-3xl font-headline font-bold">AIOI-ED™ Mini-Assessment</h2>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    A streamlined evaluation for management and education nodes. Focuses on the WMF (Weighted Multi-Factor) Index.
                  </p>
                </div>

                <div className="space-y-4">
                  {Object.entries(aioiedScores).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">{key}</label>
                        <span className="text-xs font-mono font-bold text-primary">{value}</span>
                      </div>
                      <p className="text-[9px] text-on-surface-variant/80 leading-tight mb-1">
                        {aioiedDescriptions[key]}
                      </p>
                      <input 
                        type="range" 
                        min="0" 
max="100" 
                        value={value}
                        onChange={(e) => setAioiedScores(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                        className="w-full h-1 bg-surface-container-low rounded-full appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-8 bg-surface rounded-3xl border border-outline-variant/10 shadow-xl">
                <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2">WMF Index Score</div>
                <div className="text-6xl font-headline font-bold text-primary mb-4">{getAverage(aioiedScores)}</div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 text-[10px] font-bold uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  Designation Valid
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Hard-Gate Mini-Terminal Widget */}
      <section className="py-24 bg-surface-container-low border-y border-outline-variant/10 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Terminal className="text-primary w-12 h-12 mx-auto mb-6" />
            <h2 className="font-headline text-4xl font-bold mb-4">Don't take our word for it. Test your AIOI-ED right now.</h2>
            <p className="text-on-surface-variant leading-relaxed">Deployment of Tenured AI models requires a validated AICI™ rating above 70. Solve the Next.js fix-it challenge below to verify your node.</p>
          </motion.div>

          <div className="bg-inverse-surface text-inverse-on-surface rounded-2xl p-2 shadow-2xl relative overflow-hidden">
            <div className="bg-inverse-surface flex items-center gap-2 px-4 py-2 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-error"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-primary-container"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <div className="text-[10px] font-mono opacity-50 ml-4">TENURED-ROOT // NEXTJS-CHALLENGE-v1.2</div>
            </div>
            <div className="p-8 font-mono text-left text-sm leading-loose">
              <div className="flex gap-4 mb-4">
                <span className="text-primary-container">system@tenured:~$</span>
                <span>run --challenge nextjs-fix-it</span>
              </div>
              <div className="bg-white/5 p-4 rounded mb-6 text-xs text-white/70 overflow-x-auto border border-white/5">
                <code className="block">
                  // Fix the hydration error in this component:<br/>
                  export default function Counter() {'{'}<br/>
                  &nbsp;&nbsp;const [count, setCount] = useState(window.localStorage.getItem('count') || 0);<br/>
                  &nbsp;&nbsp;return &lt;div&gt;{'{'}count{'}'}&lt;/div&gt;;<br/>
                  {'}'}
                </code>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-bold">Submit Correct Implementation Hash</label>
                  <input 
                    value={challengeInput}
                    onChange={(e) => setChallengeInput(e.target.value)}
                    className="bg-white/5 border border-white/10 focus:ring-1 focus:ring-primary-container rounded p-3 text-sm font-mono placeholder:opacity-20 outline-none transition-all" 
                    placeholder="useEffect(() => ..." 
                    type="text"
                  />
                </div>
                <button className="w-full bg-primary-container text-on-primary-container font-bold py-4 rounded hover:opacity-90 transition-opacity uppercase tracking-widest text-xs">
                  Verify Solution
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">
            Institutional access only. Failure to resolve Next.js dependencies results in <span className="text-primary underline cursor-pointer">node isolation</span>.
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-surface px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative order-2 md:order-1"
          >
            <img 
              alt="liquid gold" 
              className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwfXoSCwmGGF9zo8T3TM_Q6xsXLr4gYEWlGxfDfG6y87ptt_is5cHxt6BNjLfVfRVRUGCh_gICKXI2IiW_3-0yFhNxOqUSc4C2cADXN5_oHfzVsTvEpFdyAgpB9yHNmn2tWTGdFdAtgn0ixwMVFnDjKr3yWtQ2i7Q6vg8KE4_tAKJAZT6cf2VjbGWPvleLE5YmKFGuYHV8X41jfzF2u3TXl4y4oLGOEemHn8S8fZ3pMva-Vyq59GddwDFUMnw4xltXVzawv2w"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -right-10 bg-surface p-12 rounded-3xl shadow-xl border border-outline-variant/10 hidden lg:block">
              <div className="text-5xl font-headline font-bold text-primary mb-2">99.9%</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-secondary">Decision Factualization</div>
            </div>
          </motion.div>
          <div className="space-y-8 order-1 md:order-2">
            <h2 className="font-headline text-5xl font-bold tracking-tight">The Gilded Slate <br/>Philosophy.</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">We believe that institutional intelligence should be as beautiful as it is precise. Our "Gilded Slate" design system represents the fusion of raw technical power (Slate) and executive prestige (Gold).</p>
            <div className="space-y-6 pt-4">
              {[
                { icon: CheckCircle, title: "Real-time Node Verification", desc: "Every score is backed by an immutable ledger entry." },
                { icon: Shield, title: "End-to-End Cryptography", desc: "Data integrity is our non-negotiable cornerstone." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <item.icon className="text-primary w-6 h-6 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
