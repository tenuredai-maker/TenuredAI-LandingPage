import { motion } from 'motion/react';
import { ArrowUpRight, ShieldCheck, Terminal, Network, Brain, Database, Lock, RefreshCw, Landmark, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import GritLeaderboard from '../components/GritLeaderboard';

export default function Home() {
  const navigate = useNavigate();
  const [isRequestAccessLoading, setIsRequestAccessLoading] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [isProtocolLoading, setIsProtocolLoading] = useState(false);
  const [isDiagnosticLoading, setIsDiagnosticLoading] = useState(false);

  const handleSummaryClick = () => {
    setIsSummaryLoading(true);
    setTimeout(() => setIsSummaryLoading(false), 2000);
  };

  const handleReportClick = () => {
    setIsReportLoading(true);
    setTimeout(() => setIsReportLoading(false), 2000);
  };

  const handleProtocolClick = () => {
    setIsProtocolLoading(true);
    setTimeout(() => setIsProtocolLoading(false), 2000);
  };

  const handleDiagnosticClick = () => {
    setIsDiagnosticLoading(true);
    setTimeout(() => setIsDiagnosticLoading(false), 3000);
  };

  const handleRequestAccessClick = () => {
    setIsRequestAccessLoading(true);
    setTimeout(() => {
      setIsRequestAccessLoading(false);
      navigate('/request-access');
    }, 800);
  };

  return (
    <div className="pt-24 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="px-6 md:px-8 py-16 md:py-40 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 md:gap-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8"
        >
          <div className="space-y-4">
            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-primary font-bold">Platform Intelligence</span>
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight text-on-surface">
              Sovereign Intelligence. <br/> <span className="italic text-primary">Verified Worth.</span>
            </h1>
          </div>
          <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
            Tenured AI is the connectionist operating system for liquid professional identities. We bridge the trust gap through high-stakes adversarial testing and immutable telemetry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleRequestAccessClick}
              disabled={isRequestAccessLoading}
              className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold editorial-shadow hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-wait min-w-[220px]"
            >
              {isRequestAccessLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Request Access'
              )}
            </button>
            <button 
              onClick={handleReportClick}
              disabled={isReportLoading}
              className="text-on-surface-variant px-8 py-4 font-headline italic hover:text-tertiary transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isReportLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  View Intelligence Report <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[600px] bg-surface-container-high rounded-xl overflow-hidden editorial-shadow"
        >
          <img 
            alt="abstract digital geometry" 
            className="w-full h-full object-cover opacity-100" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdR35ylxhUa__i0NMh_tBelTtqSpLK53kj6KOmiTZGiOUAV2gV-L7MPiV059GOKLRDJBj5dqRx5-fubgKkXzwwnxl3IT2-x_BtMlTUUTlpS7mtGmwS8ZF10JIfkXU4y-mAeZxhvrJjobvWdKGxAw05-Eym9PGtWwKbInWbYnZjKwPJiuHhfAu8Go7Yl8BnVw9_DdYixI064lmroW8bA6PAli8hvqsY6JYU6h6KMHt9CVEJAU4KFenm6zcykkyr2u7OU23KRt0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
          <div className="absolute bottom-8 left-8 p-6 bg-surface-container-lowest/90 backdrop-blur-md rounded-lg border border-outline-variant/15 max-w-xs">
            <div className="text-primary font-headline text-2xl mb-1">4,000+</div>
            <div className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Competency Ontology Nodes</div>
          </div>
        </motion.div>
      </section>

      {/* Trust Bar / Logos */}
      <section className="py-12 border-y border-outline-variant/10 bg-surface-container-lowest overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-[10px] font-label uppercase tracking-[0.3em] text-outline mb-10">Institutional Partners & Nodes</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {['University of Houston', 'Rice University', 'Texas State', 'Global AI Alliance', 'Sovereign Reserve'].map((partner, i) => (
              <span key={i} className="font-headline font-bold text-xl md:text-2xl text-on-surface tracking-tighter whitespace-nowrap">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Triple-Threat Scoring Section */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">The Triple-Threat Engine</h2>
            <p className="text-on-surface-variant font-body">The new standard for cross-functional AI excellence and technical mastery.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-auto lg:auto-rows-[300px]">
            {/* AICI */}
            <div className="lg:col-span-8 bg-surface-container-highest rounded-xl p-6 md:p-8 flex flex-col justify-between border border-outline-variant/15 relative overflow-hidden group min-h-[250px]">
              <div className="relative z-10">
                <ShieldCheck className="text-primary w-10 h-10 mb-4" />
                <h3 className="text-2xl font-headline font-bold mb-2 text-on-surface">AICI™</h3>
                <p className="text-on-surface-variant max-w-md font-body">AI Competency Index. Real-time measurement of AI literacy and strategic preparedness. Quantifying the "AI-IQ" required for institutional integration and ethical implementation.</p>
              </div>
              <div className="flex items-baseline gap-2 z-10">
                <span className="text-5xl font-headline text-primary">0.94</span>
                <span className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Readiness Index</span>
              </div>
              <div className="absolute right-[-5%] bottom-[-5%] opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck className="w-60 h-60" />
              </div>
            </div>

            {/* AIOI */}
            <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-6 md:p-8 flex flex-col justify-between border border-outline-variant/15 group min-h-[250px]">
              <div>
                <Network className="text-primary w-10 h-10 mb-4" />
                <h3 className="text-xl font-headline font-bold mb-2">AIOI™</h3>
                <p className="text-sm text-on-surface-variant">AI Orchestrator Index. Verifying the ability to design, deploy, and manage agentic workflows. Includes AIOI-ED™ for educational leadership.</p>
              </div>
              <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[88%]"></div>
              </div>
            </div>

            {/* AIBS */}
            <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-6 md:p-8 flex flex-col justify-between border border-outline-variant/15 min-h-[250px]">
              <div>
                <Terminal className="text-primary w-10 h-10 mb-4" />
                <h3 className="text-xl font-headline font-bold mb-2">AIBS™</h3>
                <p className="text-sm text-on-surface-variant font-body">AI Builder Score. Technical mastery in developing AI-native applications. Verification of hands-on engineering talent from fine-tuning to RAG.</p>
              </div>
              <div className="flex justify-between items-end">
                <div className="text-xs font-label text-on-surface-variant uppercase tracking-widest">Mastery Level</div>
                <div className="text-2xl font-headline text-primary">L4</div>
              </div>
            </div>

            {/* Unified Scoring Protocol */}
            <div className="lg:col-span-8 bg-tertiary text-white rounded-xl p-6 md:p-8 flex items-center border border-tertiary/20 shadow-lg shadow-tertiary/20">
              <div className="w-full">
                <h3 className="text-3xl font-headline font-bold mb-4">Institutional Verification</h3>
                <p className="max-w-lg opacity-90 mb-6">Our multi-dimensional scoring provides a 360-degree view of human-AI synergy, verified through adversarial testing and immutable logs.</p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={handleProtocolClick}
                    disabled={isProtocolLoading}
                    className="bg-white text-tertiary px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-widest flex items-center gap-2 disabled:opacity-70 hover:bg-white/90 transition-colors"
                  >
                    {isProtocolLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Preparing...
                      </>
                    ) : (
                      'Download Protocol'
                    )}
                  </button>
                  <button 
                    onClick={handleRequestAccessClick}
                    disabled={isRequestAccessLoading}
                    className="bg-tertiary-container text-on-tertiary-container border border-transparent px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:border-white hover:text-white hover:bg-tertiary transition-colors disabled:opacity-80 disabled:cursor-wait min-w-[200px]"
                  >
                    {isRequestAccessLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      'Request Access'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grit Leaderboard / The Human Moat Section */}
      <section id="grit-leaderboard-section" className="py-16 md:py-24 px-6 md:px-8 bg-background relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4 text-left">
                <span className="font-label uppercase tracking-[0.2em] text-[10px] text-primary font-bold">The Collective Ledger</span>
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface">
                  The <span className="italic text-primary">Grit</span> Leaderboard
                </h2>
                <p className="text-lg text-on-surface-variant leading-relaxed font-body">
                  Professional credibility is no longer static. Our real-time leaderboard tracks participants who have demonstrated the highest levels of technical agility and adversarial resilience across the Sovereign AI economy.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: "Immutable Reputation", desc: "Every point is backed by a verified telemetry event on the Sovereign Ledger." },
                  { label: "Adversarial Proof", desc: "Top nodes have successfully navigated shadow-docker sandbox drills." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">{feature.label}</h4>
                      <p className="text-sm text-on-surface-variant">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-6">
                <button
                  onClick={handleSummaryClick}
                  className="px-8 py-3 rounded-xl border border-primary/20 text-xs font-mono font-black uppercase tracking-[0.25em] text-primary hover:bg-primary/5 transition-all group flex items-center gap-3"
                >
                  <span>Verification Protocols</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
            
            <div>
              <GritLeaderboard />
            </div>
          </div>
        </div>
      </section>

      {/* Platform Architecture */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20 space-y-4">
            <span className="font-label uppercase tracking-widest text-[10px] text-primary font-bold">System Architecture</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">The Intelligence OS</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">A modular, secure, and connectionist architecture built to evolve with the AI economy.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "Core Orchestrator", desc: "The 'Brain' of the platform. Directs specialized sub-agents (Tutors, Feedback, Analytics) for a seamless, AI-native journey." },
              { icon: Database, title: "Sovereign Ledger", desc: "The 'Memory'. Immutable telemetry tracking friction events and competencies across a 4,000-node hashed ontology." },
              { icon: Lock, title: "Governance Shell", desc: "Human-in-the-loop controls. Explicit explainability and risk-tier autonomy limits for responsible institutional AI." },
              { icon: RefreshCw, title: "Enterprise Sync", desc: "Seamless LMS and HRIS integration to provide a unified view of workforce maturity and identity recovery." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-surface-container-low rounded-xl border border-outline-variant/15 hover:border-primary/30 hover:bg-surface-container-high hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-headline font-bold text-xl mb-3">{item.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dividend Engine Section */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-surface-container-lowest overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
          <div className="space-y-8 md:space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-headline font-bold">The 40/40/20 <br/> Dividend Engine</h2>
              <p className="text-on-surface-variant leading-relaxed text-lg">Our connectionist model ensures that intelligence output is equitably distributed across the three pillars of institutional power.</p>
            </div>
            <div className="space-y-8">
              {[
                { pct: "40%", title: "Institution", desc: "Capital reserves and operational reinvestment for platform longevity." },
                { pct: "40%", title: "User", desc: "Direct profit-sharing and governance weight for platform participants." },
                { pct: "20%", title: "State", desc: "Social dividend for public infrastructure and community resilience." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="text-4xl font-headline text-primary opacity-30 group-hover:opacity-100 transition-opacity">{item.pct}</div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                    <p className="text-on-surface-variant text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative flex justify-center items-center">
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[500px] md:h-[500px] relative">
              <div className="absolute inset-0 border-[20px] sm:border-[30px] md:border-[40px] border-surface-container-high rounded-full"></div>
              <div className="absolute inset-0 border-[20px] sm:border-[30px] md:border-[40px] border-primary rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 90%, 50% 50%)' }}></div>
              <div className="absolute inset-0 border-[20px] sm:border-[30px] md:border-[40px] border-primary-container rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 0% 100%, 0% 50%, 50% 50%)' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-surface-container-lowest rounded-full editorial-shadow flex items-center justify-center">
                  <Landmark className="text-primary w-8 h-8 md:w-10 md:h-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sovereign Proof / Stats Section */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center">
            {[
              { value: "98.4%", label: "Verification Accuracy", desc: "Across 1.2M adversarial stress tests." },
              { value: "400k+", label: "Sovereign Identities", desc: "Verified professional nodes on the ledger." },
              { value: "$2.4B", label: "Dividend Settlement", desc: "Automated fiscal distribution via 40/40/20." }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="text-5xl md:text-6xl font-headline font-bold text-primary tracking-tighter">{stat.value}</div>
                <div className="space-y-2">
                  <h4 className="font-label text-xs uppercase tracking-[0.2em] font-bold text-on-surface">{stat.label}</h4>
                  <p className="text-sm text-on-surface-variant max-w-[200px] mx-auto">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-tertiary/10 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      {/* Terminal Section */}
      <section className="py-16 md:py-24 px-6 md:px-8 bg-surface-container-highest">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-label uppercase tracking-widest text-[10px] text-primary">Security Protocol</span>
            <h2 className="text-3xl font-headline font-bold mt-2">Testing your AIOS-ED</h2>
            <p className="text-on-surface-variant mt-2 text-sm">Adversarial debugging via Shadow-Docker sandbox.</p>
          </div>
          
          <div className="bg-inverse-surface rounded-xl p-1 overflow-hidden editorial-shadow shadow-2xl">
            <div className="bg-surface-container-low/10 px-4 py-2 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-error/40"></div>
              <div className="w-3 h-3 rounded-full bg-primary/40"></div>
              <div className="w-3 h-3 rounded-full bg-secondary-container/40"></div>
              <span className="text-[10px] font-label text-inverse-on-surface/40 ml-4">hard-gate-v4.0.1 --secure</span>
            </div>
            <div className="p-8 font-mono text-sm space-y-4">
              <div className="flex gap-4">
                <span className="text-primary opacity-50 shrink-0">01</span>
                <span className="text-inverse-on-surface/80 break-all">systemctl initialize sovereign-gate --tier executive</span>
              </div>
              <div className="flex gap-4">
                <span className="text-primary opacity-50 shrink-0">02</span>
                <span className="text-inverse-on-surface/80 break-all">evaluating local node: <span className="text-primary-container">Houston_South_04</span></span>
              </div>
              <div className="flex gap-4">
                <span className="text-primary opacity-50 shrink-0">03</span>
                <span className="text-primary font-bold">SUCCESS: Identity Verified via Sovereign Ledger.</span>
              </div>
              <div className="flex gap-4">
                <span className="text-primary opacity-50 shrink-0">04</span>
                <span className="text-inverse-on-surface/40 animate-pulse">_</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <button 
              onClick={handleDiagnosticClick}
              disabled={isDiagnosticLoading}
              className="bg-primary text-on-primary px-10 py-3 rounded-full font-label uppercase tracking-widest text-xs hover:scale-105 transition-transform border border-primary-container/20 flex items-center gap-2 disabled:opacity-70"
            >
              {isDiagnosticLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Running Diagnostic...
                </>
              ) : (
                'Initiate Hard-Gate Diagnostic'
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
