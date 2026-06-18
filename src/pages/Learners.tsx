import { motion } from 'motion/react';
import { Terminal, ArrowRight, Shield, BarChart3, Badge, Link as LinkIcon, Mic, History, Cpu, Globe } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Learners() {
  return (
    <div className="pt-32 pb-20 px-8 max-w-7xl mx-auto space-y-32">
      {/* Hero Section - Asymmetric Layout */}
      <header className="grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 space-y-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-primary/20">Protocol: Learner_X</span>
            <span className="text-secondary text-[10px] tracking-[0.2em] uppercase font-medium">Session Alpha-7</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-headline text-7xl md:text-9xl leading-[0.9] font-bold text-on-surface tracking-tighter"
          >
            The Sovereign <br />
            <span className="italic text-primary">Journey</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-on-surface-variant max-w-xl leading-relaxed font-light"
          >
            Navigate the high-stakes landscape of institutional intelligence. Secure your agency through hard-gate verification and immutable forensic tracking.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-6 items-center"
          >
            <button className="gold-gradient text-on-primary px-10 py-5 rounded-xl font-bold shadow-2xl flex items-center gap-3 hover:scale-[1.02] transition-transform">
              Initialize Terminal <Terminal className="w-5 h-5" />
            </button>
            <button className="text-on-surface font-headline font-bold flex items-center gap-2 group">
              <span className="border-b-2 border-primary/30 group-hover:border-primary transition-colors py-1">View Manifesto</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-5 relative"
        >
          <div className="aspect-[4/5] bg-surface-container-lowest rounded-3xl overflow-hidden ambient-shadow relative group border border-outline-variant/20">
            <img 
              alt="Elite Learner Architecture" 
              className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 transition-transform duration-1000" 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-60"></div>
            
            {/* Floating Telemetry Box */}
            <div className="absolute bottom-10 left-10 right-10 bg-surface-container-lowest/90 backdrop-blur-xl p-8 rounded-2xl border border-outline-variant/30 editorial-shadow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[10px] text-primary font-bold tracking-[0.3em] uppercase mb-1">Authorization</div>
                  <div className="font-mono text-2xl font-bold tracking-tight text-on-surface">L3_VERIFIED</div>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="text-primary w-6 h-6" />
                </div>
              </div>
              <div className="h-px w-full bg-outline-variant/30 mb-6"></div>
              <div className="flex justify-between text-[10px] font-mono font-bold uppercase text-on-surface-variant">
                <span>Node Identity: 77-XX</span>
                <span>Active Link</span>
              </div>
            </div>
          </div>
          
          {/* Accent decoration */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        </motion.div>
      </header>

      {/* Proving Ground Section - Tonal Layering */}
      <section className="relative">
        <div className="absolute inset-0 bg-surface-container-highest/30 rounded-[3rem] -rotate-1"></div>
        <div className="relative bg-inverse-surface text-inverse-on-surface rounded-[2.5rem] p-12 md:p-20 overflow-hidden shadow-2xl border border-white/5">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Cpu className="w-4 h-4 text-primary-container" />
                <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase">V-100 Protocol</span>
              </div>
              <h2 className="font-headline text-5xl md:text-6xl font-bold leading-tight tracking-tighter text-white">
                Survival is the <br />
                <span className="italic opacity-70">Metric of Truth</span>
              </h2>
              <p className="text-lg opacity-70 leading-relaxed font-light">
                The Proving Ground is not an assessment; it is a clean-slate environment for verifying cognitive resilience. Execute under friction.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 text-sm font-medium">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Ephemeral WebContainer Execution</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Adversarial Logic Injection</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium text-primary">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Real-time Remediation Velocity</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="bg-black rounded-3xl p-8 font-mono text-sm text-primary-container border border-white/10 shadow-2xl relative overflow-hidden group">
                {/* Terminal Header */}
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-error/40"></div>
                    <div className="w-3 h-3 rounded-full bg-primary/40"></div>
                    <div className="w-3 h-3 rounded-full bg-tertiary-container/40"></div>
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/30 italic">Terminal_V100_Secure</div>
                </div>
                
                {/* Terminal Lines */}
                <div className="space-y-3 opacity-90 group-hover:opacity-100 transition-opacity">
                  <p className="text-white/20"># System: Initializing Sovereign Verification...</p>
                  <p className="text-white">learner@sovereign:~$ initialize --hard-gate</p>
                  <p className="text-primary-container/80 italic font-medium">Verification sequence active...</p>
                  <div className="flex gap-4 items-center">
                    <span className="w-1 h-4 bg-primary animate-pulse"></span>
                    <p className="text-primary-container font-bold">Injecting logical hazard in block 7...</p>
                  </div>
                  <p className="text-white/40">Warning: Synthesis speed at 84% baseline.</p>
                  <p className="text-white font-bold">&gt; Define the delta between machine output and human agency.</p>
                  <div className="flex mt-6">
                    <span className="text-white mr-2">_</span>
                    <motion.span 
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="bg-primary w-3 h-6"
                    ></motion.span>
                  </div>
                </div>

                {/* Scanline effect */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-primary/5 to-transparent h-1/2 w-full animate-scan opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grit Heatmap & Sovereign Passport - Asymmetric Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-7 bg-surface-container-low p-10 rounded-[2.5rem] flex flex-col justify-between ambient-shadow border border-outline-variant/10 shadow-xl"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md">
                <BarChart3 className="text-primary w-7 h-7" />
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">Metric Index</div>
                <div className="text-sm font-mono font-bold text-on-surface">I-100.v2</div>
              </div>
            </div>
            <div>
              <h3 className="font-headline text-4xl font-bold text-on-surface mb-2 tracking-tight">Grit Heatmap</h3>
              <p className="text-on-surface-variant font-light text-lg">Your cognitive consistency, mapped across time.</p>
            </div>
            
            <div className="grid grid-cols-12 gap-2 pt-6">
              {Array.from({ length: 72 }).map((_, i) => {
                const hour = Math.floor(i / 3);
                const minute = (i % 3) * 20;
                const activityTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const intensity = (0.2 + (Math.sin(i * 0.5) + 1) * 0.4).toFixed(2);
                const decay = (0.1 + (i % 7) * 0.05).toFixed(2);

                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.1, rotate: -45 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: i * 0.008, 
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                    whileHover={{ 
                      scale: 1.25, 
                      y: -5,
                      rotate: 4,
                      zIndex: 50, 
                      borderRadius: "4px",
                      boxShadow: "0 15px 30px -5px rgba(119, 90, 25, 0.4)",
                      transition: { type: "spring", stiffness: 400, damping: 15 }
                    }}
                    className={cn(
                      "aspect-square rounded-sm relative group cursor-help transition-colors duration-300",
                      parseFloat(intensity) > 0.8 ? "bg-primary" : 
                      parseFloat(intensity) > 0.5 ? "bg-[#485e8b] opacity-90" : 
                      parseFloat(intensity) > 0.3 ? "bg-primary/40" : "bg-primary/10"
                    )}
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 p-3 bg-[#0a0a0a] text-white text-[9px] rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none font-mono shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-[60] border border-white/10 scale-90 group-hover:scale-100 blur-[2px] group-hover:blur-0 ring-1 ring-white/20">
                      <div className="flex flex-col gap-2.5">
                        <div className="flex justify-between items-center gap-8 border-b border-white/10 pb-2">
                          <span className="opacity-40 uppercase tracking-[0.2em] font-black text-[7px]">Temporal_Node</span>
                          <span className="font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded italic">{activityTime}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                          <div className="space-y-1">
                            <span className="block opacity-40 uppercase tracking-widest text-[7px]">Intensity</span>
                            <div className="flex items-baseline gap-1">
                              <span className="font-bold text-white text-[11px]">{intensity}</span>
                              <span className="text-primary/60 text-[8px]">α</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <span className="block opacity-40 uppercase tracking-widest text-[7px]">Decay_RT</span>
                            <div className="flex items-baseline gap-1">
                              <span className="font-bold text-red-400 text-[11px]">{decay}</span>
                              <span className="text-red-400/40 text-[8px]">λ</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                          <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
                          <span className="text-[7px] opacity-40 italic tracking-tight">Verified λ-Calculus Signature</span>
                        </div>
                      </div>
                      {/* Tooltip Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/10" />
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#0a0a0a] -mt-[1px]" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <div className="pt-10 flex flex-wrap justify-between items-end gap-6 text-[10px] font-mono uppercase font-bold tracking-widest text-secondary">
            <div className="space-y-1">
              <div className="text-primary mb-1">Retention Integrity</div>
              <div className="text-2xl font-headline text-on-surface tracking-tighter">84.2%</div>
            </div>
            <div className="text-right max-w-[200px] leading-relaxed opacity-60">
              *Skill decay is calculated in real-time. Metabolic cooling active.
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:col-span-5 bg-[#485e8b] p-10 rounded-[2.5rem] flex flex-col justify-between ambient-shadow border border-white/10 relative overflow-hidden group text-white shadow-2xl"
        >
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] mix-blend-overlay"></div>
          
          <div className="space-y-8 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Badge className="text-primary-container w-6 h-6" />
              </div>
              <h3 className="font-headline text-3xl font-bold tracking-tight">Sovereign Passport</h3>
            </div>
            
            <div className="space-y-3">
              {[
                { label: "ID", value: "REDACTED_NODE_X9", status: "HIDDEN" },
                { label: "Trust Score", value: "0.98 ALPHA", status: "VERIFIED" },
                { label: "Global Rank", value: "TOP 2% PEER", status: "LIFTED" }
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-inner group-hover:bg-white/10 transition-colors">
                  <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase">{row.label}</span>
                  <span className="font-mono text-xs font-bold text-white tracking-tight">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-10 space-y-6 relative z-10">
            <p className="text-sm italic text-white font-medium leading-relaxed">
              Forensic proof of performance, cryptographically bound and redacted by default for radical privacy.
            </p>
            <button className="w-full py-5 bg-white text-[#485e8b] font-bold rounded-2xl flex justify-center items-center gap-3 hover:scale-[1.02] transition-all shadow-xl active:scale-95">
              Generate Live-Link <LinkIcon className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Tenured Agent Feature - Immersion Section */}
      <section className="relative group">
        <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10"></div>
        <div className="relative rounded-[3rem] overflow-hidden bg-gold-gradient p-12 lg:p-24 shadow-2xl ambient-shadow">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Globe className="w-64 h-64 text-on-primary rotate-12" />
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-7 space-y-10 text-on-primary-container">
              <div className="inline-block border border-on-primary-container/20 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Intelligence Interface</span>
              </div>
              <h2 className="font-headline text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter">
                The Guided <br />
                <span className="italic opacity-80">Intelligence</span>
              </h2>
              <p className="text-xl opacity-90 leading-relaxed font-light max-w-2xl">
                The Tenured Agent is not an automated prompt; it is a forensic mentor. Understand the 'Why' behind every adversarial drift through high-fidelity explainability.
              </p>
              
              <div className="flex items-center gap-8 pt-6">
                <div className="flex -space-x-6">
                  {[
                    "https://images.unsplash.com/photo-1544005313-94ddf028fbdb?w=100&h=100&fit=crop",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  ].map((src, i) => (
                    <div key={i} className="w-16 h-16 rounded-full border-4 border-surface-container-low shadow-xl overflow-hidden bg-surface transition-transform hover:translate-y-[-4px] hover:z-10">
                      <img alt="Sovereign Learner" className="w-full h-full object-cover" src={src} referrerPolicy="no-referrer" />
                    </div>
                  ))}
                  <div className="w-16 h-16 rounded-full border-4 border-surface-container-low bg-surface-container-high flex items-center justify-center text-on-surface font-bold text-xs shadow-xl">
                    +4K
                  </div>
                </div>
                <div className="h-10 w-px bg-on-primary-container/20"></div>
                <p className="text-sm font-bold tracking-wide uppercase opacity-90">Sovereign Alliance Active</p>
              </div>
            </div>
            
            <div className="lg:col-span-12">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/20 space-y-8 shadow-2xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-2xl shadow-lg border border-white/30">
                      <Mic className="w-8 h-8 text-on-primary-container" />
                    </div>
                    <div className="text-on-primary-container">
                      <p className="font-bold">Neural Stream</p>
                      <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Explainability active</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-1 h-3 bg-on-primary-container/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="h-1.5 bg-on-primary-container/10 w-full rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      whileInView={{ width: "78%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-on-primary-container"
                    ></motion.div>
                  </div>
                  <div className="flex justify-between text-[10px] text-on-primary-container font-mono font-bold tracking-[0.1em]">
                    <span className="opacity-60">REASONING_RECURSION</span>
                    <span className="text-primary">MATCH: 0.9942</span>
                  </div>
                </div>
                
                <div className="bg-black/10 p-8 rounded-2xl border border-white/10 relative group">
                  <p className="text-on-primary-container text-lg italic font-headline leading-tight">
                    "I have indexed a drift in your synthesis block. Let us recalibrate the adversarial lens to maximize your sovereign delta."
                  </p>
                  <div className="absolute -top-3 -left-3 text-on-primary-container/20">
                    <History className="w-8 h-8" />
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-[10px] font-mono text-on-primary-container/30 justify-center">
                  <div className="w-1 h-1 rounded-full bg-on-primary-container/40"></div>
                  <span>ENCRYPTION_LAYER_RSA_4096</span>
                  <div className="w-1 h-1 rounded-full bg-on-primary-container/40"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
