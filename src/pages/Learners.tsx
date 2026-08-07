import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal, Shield, BarChart3, Link as LinkIcon, Mic,
  History, Cpu, Globe, Play, Pause, Eye, EyeOff,
  Lock, Unlock, AlertTriangle, CheckCircle, ChevronDown,
  ChevronUp, FileText, Database, GitMerge, Info, RefreshCw,
  Copy, Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DecayNode {
  id: string;
  name: string;
  intensity: number;
  decay: number;
  status: 'active' | 'warning' | 'reverify';
}

export default function Learners() {
  // State variables for interactive sections
  const [activeTab, setActiveTab] = useState<'owner' | 'recruiter' | 'public'>('owner');
  const [activeCert, setActiveCert] = useState<string>('G-014');
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  // Replay states
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timelineProgress, setTimelineProgress] = useState<number>(35); // percentage

  // Redaction settings
  const [redactIdentity, setRedactIdentity] = useState<boolean>(true);
  const [redactOLFlags, setRedactOLFlags] = useState<boolean>(false);
  const [redactBonds, setRedactBonds] = useState<boolean>(false);

  // Interactive Merkle leaf selection
  const [selectedLeaf, setSelectedLeaf] = useState<string | null>(null);

  // Accordion state for Foundations
  const [expandedFoundation, setExpandedFoundation] = useState<string | null>(null);

  // Copy to clipboard notification
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Auto-play timeline simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimelineProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const copyDidLink = () => {
    navigator.clipboard.writeText('https://tenured.ai/p/did:tenured:sovereign_alpha_7');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Generate 72 nodes for the Decay Atlas
  const decayNodes: DecayNode[] = Array.from({ length: 72 }).map((_, i) => {
    const intensity = parseFloat((0.4 + (Math.sin(i * 0.45) + 1) * 0.3).toFixed(2));
    const decay = parseFloat((0.05 + (i % 5) * 0.04).toFixed(2));
    const value = parseFloat((intensity * Math.exp(-decay * (i % 6))).toFixed(2));

    let status: 'active' | 'warning' | 'reverify' = 'active';
    if (value < 0.35) status = 'reverify';
    else if (value < 0.65) status = 'warning';

    const nodeNames = [
      "Vector Embeddings", "RAG Pipeline", "Prompt Engineering", "Adversarial Test",
      "Model Quantization", "JSON Schema Enforcement", "Memory Persistence", "Multi-Agent Router",
      "Context Window Compression", "Inference Latency Tuning", "Token Cost Control", "Rate Limit Backoff"
    ];

    return {
      id: `N-${(100 + i).toString()}`,
      name: nodeNames[i % nodeNames.length],
      intensity,
      decay,
      status
    };
  });

  return (
    <div className="pt-10 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-32">
      {/* Hero Section */}
      <header className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-3"
          >
            {/* <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-primary/20">

            </span> */}
            <span className="bg-tertiary/10 text-tertiary px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-tertiary/20">
              THE SOVEREIGN PASSPORT
            </span>
            <span className="text-on-surface-variant text-[10px] tracking-[0.2em] uppercase font-mono">
              Core Verification · Decay · Consensus · Career Memory
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-headline text-5xl md:text-7xl lg:text-8xl leading-[1.05] font-bold text-on-surface tracking-tighter"
          >
            The portable, verifiable, <br />
            <span className="italic text-white gold-gradient bg-clip-text text-transparent">sovereign record</span> of a career.
          </motion.h1>
          {/* Reduced Verifiable bar */}
          <div className="verifiable-bar mt-2 w-32 bg-primary/20 h-1" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed font-light"
          >
            The complete implementation of the Sovereign Passport—the single user-facing credential that displays everything the platform produces. Cryptographically anchored, redaction-controlled, and instantly auditable by recruiters or insurers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <a
              href="#simulator"
              className="gold-gradient text-on-primary px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-[1.02] transition-transform text-center inline-block"
            >
              Launch Passport Simulator
            </a>
            <a
              href="#foundations"
              className="text-on-surface font-headline font-bold flex items-center gap-2 group"
            >
              <span className="border-b-2 border-primary/30 group-hover:border-primary transition-colors py-1">View Patent Foundations</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-4 relative hidden lg:block"
        >
          <div className="bg-[#16140F] text-[#F3F0EC] p-8 rounded-3xl border border-outline-variant/30 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-[#FFBF00] opacity-85 tracking-wider">
              PASSPORT // SA_7
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-[10px] text-[#FFBF00] font-mono tracking-widest block uppercase">Command Authority</span>
                <span className="text-6xl font-bold font-headline text-[#C5A059]">87</span>
              </div>

              <div className="h-px bg-white/10" />

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="opacity-60">DID ADDRESS:</span>
                  <span className="text-primary-container">did:tenured:sa_7</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">ACTIVE TIER:</span>
                  <span className="text-primary-container">2 Orchestrator</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">ON-CHAIN LEDGER:</span>
                  <span className="text-[#4F8A6B]">VERIFIED ✓</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Simulator Section */}
      <section id="simulator" className="space-y-8 scroll-margin-top-28">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
            <Cpu className="w-3.5 h-3.5" />
            <span className="font-mono text-[9px] font-bold tracking-widest uppercase">UX Playground v2.0</span>
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            Sovereign Passport Simulator
          </h2>
          <p className="text-on-surface-variant font-light">
            Toggle between three target audiences to observe how the platform dynamically formats, redacts, and cryptographically certifies career metrics.
          </p>
        </div>

        {/* Tab Switcher & Simulator Container */}
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl overflow-hidden shadow-2xl">
          {/* Top Address Bar / Header */}
          <div className="bg-[#1E1E1D] text-white p-4 flex flex-wrap justify-between items-center border-b border-white/5 gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#BA1A1A] block"></span>
              <span className="w-3 h-3 rounded-full bg-[#FFBF00] block"></span>
              <span className="w-3 h-3 rounded-full bg-[#4F8A6B] block"></span>
              <span className="text-xs font-mono text-white/50 ml-4 font-bold tracking-wider">
                https://tenured.ai/passport/did:tenured:sovereign_alpha_7
              </span>
            </div>

            {/* View Selector Tabs */}
            <div className="flex bg-[#121211] p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setActiveTab('owner')}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
                  activeTab === 'owner' ? "bg-primary text-white" : "text-white/60 hover:text-white"
                )}
              >
                <Lock className="w-3.5 h-3.5" /> Owner (Full Forensic)
              </button>
              <button
                onClick={() => {
                  setActiveTab('recruiter');
                  setRedactIdentity(true);
                  setRedactOLFlags(false);
                }}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
                  activeTab === 'recruiter' ? "bg-[#2C4771] text-white" : "text-white/60 hover:text-white"
                )}
              >
                <Eye className="w-3.5 h-3.5" /> Recruiter (Revealed)
              </button>
              <button
                onClick={() => {
                  setActiveTab('public');
                  setRedactIdentity(true);
                  setRedactOLFlags(true);
                }}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
                  activeTab === 'public' ? "bg-[#775A19] text-white" : "text-white/60 hover:text-white"
                )}
              >
                <Globe className="w-3.5 h-3.5" /> Public Merkle Verify
              </button>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <AnimatePresence mode="wait">
              {/* OWNER VIEW */}
              {activeTab === 'owner' && (
                <motion.div
                  key="owner"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-10"
                >
                  {/* Owner Header / Settings */}
                  <div className="flex flex-wrap justify-between items-start border-b border-outline-variant/20 pb-6 gap-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-headline text-2xl font-bold">Owner Console</h3>
                        <span className="bg-primary/20 text-primary border border-primary/30 text-[9px] px-2 py-0.5 rounded-full font-mono uppercase font-bold tracking-widest">
                          did:tenured:sovereign_alpha_7
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1 font-light">
                        Only you see this layout. Fully un-redacted forensic reports, liability markers, and decay heatmaps.
                      </p>
                    </div>

                    {/* Redaction Switches Panel */}
                    <div className="bg-surface-container-high/60 border border-outline-variant/20 rounded-2xl p-4 space-y-3 w-full sm:w-auto min-w-[280px]">
                      <div className="text-[10px] font-mono font-bold tracking-wider text-primary uppercase flex items-center gap-1.5">
                        <Lock className="w-3 h-3" /> Redaction Controls (PAT-019)
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center justify-between text-xs cursor-pointer hover:bg-black/5 p-1 rounded transition-colors">
                          <span className="text-on-surface-variant">Redact Identity on share</span>
                          <input
                            type="checkbox"
                            checked={redactIdentity}
                            onChange={(e) => setRedactIdentity(e.target.checked)}
                            className="accent-primary w-4 h-4 cursor-pointer"
                          />
                        </label>
                        <label className="flex items-center justify-between text-xs cursor-pointer hover:bg-black/5 p-1 rounded transition-colors">
                          <span className="text-on-surface-variant">Hide OL Flags on reveal</span>
                          <input
                            type="checkbox"
                            checked={redactOLFlags}
                            onChange={(e) => setRedactOLFlags(e.target.checked)}
                            className="accent-primary w-4 h-4 cursor-pointer"
                          />
                        </label>
                        <label className="flex items-center justify-between text-xs cursor-pointer hover:bg-black/5 p-1 rounded transition-colors">
                          <span className="text-on-surface-variant">Mask Underwriting status</span>
                          <input
                            type="checkbox"
                            checked={redactBonds}
                            onChange={(e) => setRedactBonds(e.target.checked)}
                            className="accent-primary w-4 h-4 cursor-pointer"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Main Grid */}
                  <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: CA and Decay */}
                    <div className="lg:col-span-7 space-y-8">
                      {/* CA Hero Block */}
                      <div className="bg-[#16140F] text-[#F3F0EC] p-8 rounded-3xl relative overflow-hidden shadow-xl border border-white/5">
                        <div className="absolute top-0 right-0 p-4 text-[9px] font-mono tracking-widest text-[#FFBF00]">
                          LEDGER-ANCHORED
                        </div>
                        <div className="flex flex-wrap gap-12 items-baseline">
                          <div>
                            <span className="text-[10px] text-[#FFBF00] font-mono tracking-widest block uppercase">
                              Command Authority (PAT-001)
                            </span>
                            <span className="text-7xl font-bold font-headline text-[#C5A059]">87</span>
                            <span className="text-xs text-white/50 block font-mono mt-1">+6 this quarter · 24 Hard-Gates cleared · Tier 2 Orchestrator</span>
                          </div>

                          <div className="grid grid-cols-3 gap-6 flex-1 min-w-[200px] border-l border-white/10 pl-6">
                            <div>
                              <span className="text-[9px] text-[#FFBF00] font-mono block">AICI</span>
                              <span className="text-xl font-bold font-mono">92</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-[#FFBF00] font-mono block">AIOI</span>
                              <span className="text-xl font-bold font-mono">88</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-[#FFBF00] font-mono block">AIBS</span>
                              <span className="text-xl font-bold font-mono">85</span>
                            </div>
                          </div>
                        </div>
                        {/* CA composition formula — PAT-001 */}
                        <div className="mt-6 pt-5 border-t border-white/10 font-mono text-[10.5px] leading-loose">
                          <span className="text-[#FFBF00]">CA = f(TTR, ALTFL_composite, Bully_survival)</span><br />
                          <span className="text-[#8FA5D6]">TTR component · </span><span className="text-[#C5A059]">26.4</span><span className="text-white/60"> (avg 32s remediation)</span><br />
                          <span className="text-[#8FA5D6]">ALTFL composite · </span><span className="text-[#C5A059]">34.8</span><span className="text-white/60"> (KV/CP/CCT weighted)</span><br />
                          <span className="text-[#8FA5D6]">Bully survival · </span><span className="text-[#C5A059]">25.8</span><span className="text-white/60"> (8/8 loops passed)</span><br />
                          <span className="text-[#4F8A6B] font-bold">→ CA = 87</span>
                        </div>
                      </div>

                      {/* Decay Atlas (PAT-003) */}
                      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-md space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-headline text-lg font-bold">Decay Atlas</h4>
                            <p className="text-xs text-on-surface-variant font-light">
                              Live lambda calculation coefficient λ across 72 mapped skills.
                            </p>
                          </div>
                          <div className="flex items-center gap-3 text-[10px] font-mono">
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#4F8A6B]"></span> Active</span>
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#FFBF00]"></span> Warning</span>
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#BA1A1A]"></span> Re-Verify</span>
                          </div>
                        </div>

                        {/* Interactive Grid cells */}
                        <div className="grid grid-cols-12 gap-1.5">
                          {decayNodes.map((node, i) => (
                            <div
                              key={i}
                              onMouseEnter={() => setSelectedCell(i)}
                              onMouseLeave={() => setSelectedCell(null)}
                              className={cn(
                                "aspect-square rounded cursor-help transition-all relative border border-black/5 hover:scale-110",
                                node.status === 'active' ? "bg-[#4F8A6B]" :
                                  node.status === 'warning' ? "bg-[#FFBF00]" : "bg-[#BA1A1A]"
                              )}
                            >
                              {/* Simple mini popup */}
                              {selectedCell === i && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-neutral-900 text-white text-[9px] rounded-lg font-mono z-50 shadow-2xl min-w-[160px] border border-white/10 whitespace-nowrap">
                                  <div className="font-bold border-b border-white/10 pb-1 mb-1 text-[#FFBF00]">{node.id}: {node.name}</div>
                                  <div>Intensity: {node.intensity} α</div>
                                  <div>Decay Rate: {node.decay} λ</div>
                                  <div className="capitalize mt-1 font-bold text-[8px] flex items-center gap-1">
                                    <span className={cn(
                                      "w-1.5 h-1.5 rounded-full inline-block",
                                      node.status === 'active' ? "bg-[#4F8A6B]" :
                                        node.status === 'warning' ? "bg-[#FFBF00]" : "bg-[#BA1A1A]"
                                    )}></span>
                                    Status: {node.status}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="text-[10px] font-mono text-on-surface-variant text-center pt-2">
                          Retention Integrity Score: <span className="font-bold text-[#4F8A6B]">84.2%</span> · λ recompute runs at 00:00 UTC daily.
                        </div>
                      </div>
                    </div>

                    {/* Right Column: PHSE Tier, Underwriting, and Vault */}
                    <div className="lg:col-span-5 space-y-8">
                      {/* PHSE Tier progress (PAT-011) */}
                      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-md space-y-4">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-headline font-bold">Tier Progress · PAT-011</h4>
                          <span className="text-[11px] font-mono text-primary font-bold">Tier 2 Orchestrator</span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
                            <div className="h-full bg-primary" style={{ width: '84.2%' }}></div>
                          </div>
                          <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                            <span>PHSE: 8,420 pts</span>
                            <span className="font-bold text-on-surface">1,580 to Tier 1 Architect</span>
                          </div>
                        </div>
                        {/* 10-Tier dot visualization — spec F7 */}
                        <div className="grid grid-cols-10 gap-1.5 mt-3">
                          {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((tier) => (
                            <div key={tier} className="flex flex-col items-center gap-1">
                              <span className={`w-2.5 h-2.5 rounded-full inline-block ${tier > 2 ? 'bg-[#4F8A6B]' :
                                tier === 2 ? 'bg-primary w-3.5 h-3.5 ring-2 ring-primary/30' :
                                  'bg-outline-variant/40'
                                }`} />
                              <span className={`font-mono text-[8px] ${tier === 2 ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                                {tier === 10 ? '10 App' : tier === 1 ? '1 Arch' : tier}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Underwriting Block (PAT-013/014) */}
                      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-md space-y-4">
                        <div className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-primary" />
                          <h4 className="font-headline font-bold">Active Bond Status · PAT-013/014</h4>
                          <span className="ml-auto text-[9px] font-mono bg-[#4F8A6B]/10 border border-[#4F8A6B]/30 text-[#4F8A6B] px-2 py-0.5 rounded font-bold">⚜ ACTIVE BOND</span>
                        </div>

                        {redactBonds ? (
                          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20 text-center font-mono text-xs text-on-surface-variant flex items-center justify-center gap-2">
                            <Lock className="w-4 h-4" /> Underwriting Details Redacted
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 gap-3">
                            <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
                              <span className="text-[9px] font-mono font-bold text-on-surface-variant block uppercase">V_u Guarantee</span>
                              <span className="text-lg font-bold font-mono text-primary">$150K</span>
                              <span className="text-[9px] text-on-surface-variant block font-light mt-0.5">First 180 days</span>
                            </div>
                            <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
                              <span className="text-[9px] font-mono font-bold text-on-surface-variant block uppercase">Annual π</span>
                              <span className="text-lg font-bold font-mono text-primary">$11,250</span>
                              <span className="text-[9px] text-on-surface-variant block font-light mt-0.5">5% of package</span>
                            </div>
                            <div className="bg-surface-container-low p-3 rounded-xl border border-[#4F8A6B]/20">
                              <span className="text-[9px] font-mono font-bold text-on-surface-variant block uppercase">Strike margin</span>
                              <span className="text-lg font-bold font-mono text-[#4F8A6B]">+12</span>
                              <span className="text-[9px] text-on-surface-variant block font-light mt-0.5">CA 87 vs strike 75</span>
                            </div>
                          </div>
                        )}
                        <div className="text-[10px] font-mono text-on-surface-variant flex justify-between">
                          <span>Chubb · Gold tier · 25% premium credit</span>
                          <span className="text-[#4F8A6B] font-bold">BONDED STATE ACTIVE</span>
                        </div>
                      </div>

                      {/* Career Memory — Vector-Graph (PAT-005 O5) */}
                      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-md space-y-4">
                        <div className="flex items-center gap-2">
                          <h4 className="font-headline font-bold text-sm">Career Memory · PAT-005</h4>
                          <span className="ml-auto text-[9px] font-mono text-tertiary">24 artifacts sealed</span>
                        </div>
                        <div className="bg-surface-container-low rounded-xl px-3 py-2 font-mono text-[10px] text-on-surface-variant border border-outline-variant/20">
                          <span className="italic">Search artifacts (Vector + Graph) — e.g. "distributed retry patterns"</span>
                        </div>
                        <div className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest">2026 Q3</div>
                        <div className="space-y-2">
                          {[
                            { id: 'G-014', name: 'Adversarial Audit · Production RAG', sim: '0.94', status: 'cleared', ca: '+5.2' },
                            { id: 'G-022', name: 'RAG Production · Latency SLA', sim: '0.88', status: 'cleared', ca: '+3.8' },
                            { id: 'G-008', name: 'Prompt Injection Hardening', sim: '0.81', status: 'cleared', ca: '+2.4' },
                          ].map(art => (
                            <div key={art.id} className="flex items-center gap-3 bg-surface-container-low rounded-xl p-3 border border-outline-variant/20">
                              <span className="font-mono text-[9px] text-primary font-bold w-10">{art.id}</span>
                              <span className="text-xs flex-1 text-on-surface-variant">{art.name}</span>
                              <span className="font-mono text-[9px] text-[#4F8A6B]">cosine {art.sim}</span>
                              <span className="font-mono text-[9px] text-[#C5A059]">{art.ca} CA</span>
                            </div>
                          ))}
                        </div>
                        <div className="h-px bg-outline-variant/20" />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            readOnly
                            value="https://tenured.ai/p/did:tenured:sovereign_alpha_7"
                            className="bg-surface-container-low border border-outline-variant/20 text-xs px-3 py-2.5 rounded-lg flex-1 font-mono text-on-surface-variant outline-none"
                          />
                          <button
                            onClick={copyDidLink}
                            className="bg-primary text-white p-2.5 rounded-lg hover:bg-primary/90 active:scale-95 transition-all"
                            title="Copy share link"
                          >
                            {copiedLink ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        {copiedLink && (
                          <span className="text-[10px] font-mono text-[#4F8A6B] block text-center">Copied! Redaction-aware share link ready.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* RECRUITER VIEW */}
              {activeTab === 'recruiter' && (
                <motion.div
                  key="recruiter"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-10"
                >
                  <div className="flex flex-wrap justify-between items-start border-b border-outline-variant/20 pb-6 gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-headline text-2xl font-bold">Recruiter Vetting Desk</h3>
                        <span className="bg-[#2C4771]/20 text-[#2C4771] border border-[#2C4771]/30 text-[9px] px-2 py-0.5 rounded-full font-mono uppercase font-bold tracking-widest">
                          Reveal Credit Status: Active
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1 font-light">
                        Vetted profile loaded. View de-identified metrics, cert validity trees, and Auditor OL flags.
                      </p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Triple-85 & Merkle Cert */}
                    <div className="lg:col-span-7 space-y-8">
                      {/* Recruiter Verdict Header */}
                      <div className="bg-[#1C1F26] text-white p-6 rounded-3xl border border-white/5 shadow-xl flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-mono text-[#8FA5D6] tracking-widest uppercase block">Audience Verdict</span>
                          <h4 className="font-headline font-bold text-xl mt-1 text-[#DBE2F9]">Sovereign Operator</h4>
                          <span className="text-xs opacity-60 font-mono">Anonymous Candidate ID: Alpha-7</span>
                        </div>
                        <div className="bg-[#4F8A6B]/20 text-[#4F8A6B] border border-[#4F8A6B]/30 px-4 py-2 rounded-xl text-center">
                          <span className="block text-[8px] font-mono font-bold tracking-widest">TRIPLE-85 STATUS</span>
                          <span className="text-lg font-bold font-headline">BONDABLE</span>
                        </div>
                      </div>

                      {/* Dynamic Certificate Vetting Drawer with Merkle Node Tree */}
                      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-md space-y-6">
                        <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                          <div>
                            <h4 className="font-headline font-bold">Consensus Certificate G-014</h4>
                            <p className="text-xs text-on-surface-variant font-light">
                              Clearing and verifying leaf hashes anchored to Polygon Mainnet block 81,402.
                            </p>
                          </div>
                          <span className="bg-[#4F8A6B]/15 text-[#4F8A6B] text-[10px] font-mono px-2.5 py-1 rounded-full font-bold">
                            WCS: 0.818 ✓
                          </span>
                        </div>

                        {/* Interactive Merkle Layout */}
                        <div className="bg-[#16140F] p-8 rounded-2xl border border-white/5 relative overflow-hidden">
                          <div className="absolute top-2 left-2 text-[8px] font-mono text-white/30 uppercase tracking-widest">
                            Merkle Path Verification Trace (PAT-010)
                          </div>

                          <div className="flex flex-col items-center justify-center space-y-6 mt-4">
                            {/* Root Node */}
                            <motion.button
                              onClick={() => setSelectedLeaf('root')}
                              whileHover={{ scale: 1.05 }}
                              className={cn(
                                "font-mono text-xs px-4 py-2 rounded-lg font-bold border transition-colors",
                                selectedLeaf === 'root' ? "bg-primary border-primary text-white" : "bg-neutral-800 border-white/10 text-white/80"
                              )}
                            >
                              ROOT: 0x77ab1f2c...
                            </motion.button>

                            <div className="h-4 w-px bg-white/20"></div>

                            {/* Middle layer */}
                            <div className="flex gap-12 relative">
                              <div className="absolute inset-x-0 top-0 h-px bg-white/20 -translate-y-1/2"></div>
                              <motion.button
                                onClick={() => setSelectedLeaf('h12')}
                                whileHover={{ scale: 1.05 }}
                                className={cn(
                                  "font-mono text-[10px] px-3 py-1.5 rounded-lg border transition-colors",
                                  selectedLeaf === 'h12' ? "bg-[#2C4771] border-[#2C4771] text-white" : "bg-neutral-800/80 border-white/5 text-white/60"
                                )}
                              >
                                H(L1·L2)
                              </motion.button>
                              <motion.button
                                onClick={() => setSelectedLeaf('h34')}
                                whileHover={{ scale: 1.05 }}
                                className={cn(
                                  "font-mono text-[10px] px-3 py-1.5 rounded-lg border transition-colors",
                                  selectedLeaf === 'h34' ? "bg-[#2C4771] border-[#2C4771] text-white" : "bg-neutral-800/80 border-white/5 text-white/60"
                                )}
                              >
                                H(L3·L4)
                              </motion.button>
                            </div>

                            <div className="h-4 w-px bg-white/20"></div>

                            {/* Leaves */}
                            <div className="flex gap-4">
                              {[
                                { id: 'artifact', label: 'Artifact Hash' },
                                { id: 'pof', label: 'PoF Telemetry' },
                                { id: 'consensus', label: 'Consensus Sign' },
                                { id: 'meta', label: 'Metadata' }
                              ].map((leaf) => (
                                <motion.button
                                  key={leaf.id}
                                  onClick={() => setSelectedLeaf(leaf.id)}
                                  whileHover={{ scale: 1.05 }}
                                  className={cn(
                                    "font-mono text-[9px] px-2.5 py-1.5 rounded border transition-colors",
                                    selectedLeaf === leaf.id ? "bg-[#FFBF00] text-black border-[#FFBF00] font-bold" : "bg-neutral-800/60 border-white/5 text-white/50"
                                  )}
                                >
                                  {leaf.label}
                                </motion.button>
                              ))}
                            </div>
                          </div>

                          {/* Merkle Leaf Metadata Output */}
                          <div className="mt-8 pt-4 border-t border-white/10 min-h-[90px] font-mono text-[10px] text-white/80 leading-relaxed">
                            {selectedLeaf === 'root' && (
                              <div>
                                <span className="text-[#FFBF00] block mb-1">▸ MERKLE ROOT PATH</span>
                                Verified Root Hash: <span className="text-white font-bold">0x77ab1f2cc0591e13a40...</span><br />
                                Anchored on Polygon Block: 81,402. Verification outcome: <span className="text-[#4F8A6B]">VALID</span>.
                              </div>
                            )}
                            {selectedLeaf === 'h12' && (
                              <div>
                                <span className="text-[#8FA5D6] block mb-1">▸ LEFT SUBTREE (H(L1·L2))</span>
                                Concatenated hash of Learner Artifact (L1) and Proof of Friction (L2). Verified integrity checks pass.
                              </div>
                            )}
                            {selectedLeaf === 'h34' && (
                              <div>
                                <span className="text-[#8FA5D6] block mb-1">▸ RIGHT SUBTREE (H(L3·L4))</span>
                                Concatenated hash of Council Consensus signatures (L3) and validation metadata (L4). Verified integrity checks pass.
                              </div>
                            )}
                            {selectedLeaf === 'artifact' && (
                              <div>
                                <span className="text-[#FFBF00] block mb-1">▸ L1 // LEAF: ARTIFACT VALIDITY</span>
                                Hash: <span className="text-white">0xab3f2847cde00192eef8...</span><br />
                                Contains: Code repository snapshot, sandbox test logs, dependency manifest, lint diagnostic logs.
                              </div>
                            )}
                            {selectedLeaf === 'pof' && (
                              <div>
                                <span className="text-[#FFBF00] block mb-1">▸ L2 // LEAF: PROOF OF FRICTION TELEMETRY</span>
                                Hash: <span className="text-white">0x4f2a71829e0018fca20...</span><br />
                                Contains: KV, IL, CP, ET, VO, CCT channel metrics from the live evaluation session.
                              </div>
                            )}
                            {selectedLeaf === 'consensus' && (
                              <div>
                                <span className="text-[#FFBF00] block mb-1">▸ L3 // LEAF: COUNCIL CONSENSUS SIGNATURES</span>
                                Hash: <span className="text-white">0x750cde1a0293ee0a1f2b...</span><br />
                                Contains: Cryptographic signatures from Auditor (40% wt), Proctor (30% wt), Mentor (20% wt), and Chaos (10% wt).
                              </div>
                            )}
                            {selectedLeaf === 'meta' && (
                              <div>
                                <span className="text-[#FFBF00] block mb-1">▸ L4 // LEAF: RUN METADATA</span>
                                Hash: <span className="text-white">0x937efcda1092837bcda...</span><br />
                                Contains: Expiry parameters, local timestamp, block height reference, evaluate schema index v1.4.
                              </div>
                            )}
                            {!selectedLeaf && (
                              <div className="text-white/40 text-center italic py-4">
                                Click on any Merkle node or leaf button above to inspect its cryptographic trace data contents.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: PoF Replay & OL Flags */}
                    <div className="lg:col-span-5 space-y-8">
                      {/* PoF Replay Section */}
                      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-md space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-headline font-bold">PoF Replay (PAT-002)</h4>
                          <span className="font-mono text-[9px] bg-neutral-100 border px-2 py-0.5 rounded text-on-surface-variant">
                            Session G-014
                          </span>
                        </div>

                        {/* 6-Channel Telemetry Bars */}
                        <div className="bg-neutral-950 p-4 rounded-xl border border-white/5 space-y-3 font-mono text-[10px]">
                          <div className="flex justify-between">
                            <span className="text-white/40 text-[9px] uppercase tracking-widest">6-Channel ALTFL Telemetry · PAT-002</span>
                            <span className="text-[#FFBF00] text-[9px]">G-014 · WCS 0.818 ✓</span>
                          </div>
                          <div className="space-y-2">
                            {[
                              { label: 'KV', value: 85, color: '#4F8A6B', metric: '112ms', desc: 'Keystroke velocity' },
                              { label: 'IL', value: 60, color: '#4F8A6B', metric: '3.4s', desc: 'Inference latency' },
                              { label: 'CP', value: 75, color: '#C5A059', metric: '0.82', desc: 'Command precision' },
                              { label: 'ET', value: 35, color: '#BA1A1A', metric: '2 backtracks', desc: 'Error trajectory' },
                              { label: 'VO', value: 90, color: '#4F8A6B', metric: '11/14', desc: 'Verification outcomes' },
                              { label: 'CCT', value: 80, color: '#4F8A6B', metric: '0.04 Δ', desc: 'Confidence calibration' }
                            ].map((ch) => (
                              <div key={ch.label} className="flex items-center gap-2">
                                <span className="w-8 font-bold text-white/60 text-[9px]">{ch.label}</span>
                                <div className="h-1.5 bg-white/10 rounded-full flex-1 overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                      width: `${Math.min(ch.value, timelineProgress)}%`,
                                      backgroundColor: ch.color
                                    }}
                                  ></div>
                                </div>
                                <span className="text-[9px] font-bold w-20 text-right" style={{ color: ch.color }}>{ch.metric}</span>
                              </div>
                            ))}
                          </div>

                          {/* Playback Controls */}
                          <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-3">
                            <button
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center gap-1.5 text-white active:scale-95 transition-all"
                            >
                              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                              {isPlaying ? 'Pause' : 'Play'}
                            </button>
                            <span className="text-[10px] text-white/50">
                              Time: {Math.floor((timelineProgress / 100) * 22)}:
                              {Math.floor(((timelineProgress / 100) * 1320) % 60).toString().padStart(2, '0')} / 22:41
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* OL Flag Disclosure (PAT-019) */}
                      {redactOLFlags ? (
                        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-md text-center py-10 space-y-2">
                          <EyeOff className="w-8 h-8 text-on-surface-variant/40 mx-auto" />
                          <h4 className="font-headline font-bold text-sm">OL Flag Disclosures Redacted</h4>
                          <p className="text-xs text-on-surface-variant/60 max-w-xs mx-auto">
                            The owner has redacted overconfidence flags for this session preview link.
                          </p>
                        </div>
                      ) : (
                        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-md space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-headline font-bold text-sm text-[#BA1A1A]">OL Flag Disclosures</h4>
                            <span className="text-[9px] font-mono bg-red-50 border border-red-200 text-[#BA1A1A] px-2 py-0.5 rounded font-bold">
                              1 Active Flag
                            </span>
                          </div>

                          <div className="border-l-4 border-[#FFBF00] bg-[#FFBF00]/5 p-4 rounded-r-xl space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[9px] font-mono font-bold bg-[#FFBF00] text-black px-2 py-0.5 rounded">
                                TIER 2 · CRITICAL
                              </span>
                              <span className="text-[10px] font-mono text-on-surface-variant font-bold">Node: N-038</span>
                            </div>

                            <div className="font-mono text-[10.5px] text-on-surface-variant space-y-1">
                              <div>Competency: <span className="text-on-surface font-bold">Vector DB Latency</span></div>
                              <div>Declared confidence: <span className="text-[#BA1A1A] font-bold">L5 (Certain)</span></div>
                              <div>Verified Outcome: <span className="text-[#BA1A1A] font-bold">WRONG</span></div>
                              <div>Decay Penalty: <span className="text-[#BA1A1A] font-bold">−2.5× Asymmetric</span></div>
                            </div>
                            <p className="text-[11px] text-on-surface-variant italic font-light pt-1 border-t border-outline-variant/20">
                              "Auditor notes: Recommend re-verification lab before bonding this specific competency node."
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PUBLIC VIEW */}
              {activeTab === 'public' && (
                <motion.div
                  key="public"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-10"
                >
                  <div className="flex flex-wrap justify-between items-start border-b border-outline-variant/20 pb-6 gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-headline text-2xl font-bold">Public Verification Board</h3>
                        <span className="bg-primary/20 text-primary border border-primary/30 text-[9px] px-2 py-0.5 rounded-full font-mono uppercase font-bold tracking-widest">
                          Public V1.0 · Zero-Knowledge Check
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1 font-light">
                        De-identified cryptographic verification dashboard. Walks the public Polygon blockchain records directly.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 gap-8 items-start">
                    <div className="md:col-span-6 space-y-8">
                      {/* Public minimal card */}
                      <div className="bg-[#16140F] text-[#F3F0EC] p-8 rounded-3xl text-center space-y-4 shadow-xl border border-white/5">
                        <span className="text-[9px] font-mono text-[#FFBF00] tracking-widest uppercase block">
                          PUBLIC CREDENTIAL SUMMARY
                        </span>
                        <h4 className="font-headline font-bold text-3xl text-[#C5A059]">Tier 2 Orchestrator</h4>
                        <div className="text-xs opacity-60 font-mono space-y-1">
                          <div>24 Consensus Certificates cleared</div>
                          <div>4 bonded credentials verified</div>
                          <div>Anchored on Polygon Mainnet</div>
                        </div>
                        <div className="text-[9px] font-mono bg-white/5 p-2 rounded border border-white/10 text-white/50 inline-block">
                          DID: did:tenured:sovereign_alpha_7
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-6 space-y-8">
                      {/* Monospace terminal check trace */}
                      <div className="bg-neutral-950 p-6 rounded-3xl border border-white/5 text-[#4F8A6B] font-mono text-xs space-y-3 leading-relaxed shadow-xl">
                        <div className="flex justify-between border-b border-white/10 pb-2 text-white/30 text-[9px]">
                          <span>ON-CHAIN VERIFICATION RECORD</span>
                          <span>POLYGON_RPC_81402</span>
                        </div>

                        <div className="space-y-1.5">
                          <p className="text-white/60 flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#4F8A6B]" /> Resolved DID: did:tenured:sa_7</p>
                          <p className="text-white/60 flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#4F8A6B]" /> Master Root: 0x77ab1f2cc0591e13a40879f82...</p>
                          <p className="text-white/60 flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#4F8A6B]" /> Block confirmation height: 81,402</p>
                          <p className="text-white/60 flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#4F8A6B]" /> Verified path nodes: L3 ➔ H(L3·L4) ➔ Root</p>
                          <p className="text-[#FFBF00] font-bold mt-4 pt-2 border-t border-white/10 text-center">
                            CRYPTOGRAPHIC PROOF STATUS: AUTHENTIC
                          </p>
                          <p className="text-white/40 text-[9px] text-center italic">
                            Verification query verified by decentralized client protocol. No central server check required.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Patent Foundations Accordions */}
      {/* <section id="foundations" className="space-y-10 scroll-margin-top-28">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
            <Cpu className="w-3.5 h-3.5" />
            <span className="font-mono text-[9px] font-bold tracking-widest uppercase">Verification Architecture</span>
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            Foundations &amp; Patent Proofs
          </h2>
          <p className="text-on-surface-variant font-light max-w-3xl">
            Sovereign Credentialing functions through ten core patent-complete architecture segments. Expand each concept to review operational limits and patent numbers.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl">
          {[
            {
              id: "F1",
              title: "The Sovereign Artifact",
              patent: "Verification · Decay · Consensus · Ledger · Memory",
              summary: "A unified, ledger-bound credential.",
              detail: "The Sovereign Passport collects every dynamic output of the Proving Ground and Learning Loop into a single cryptographic artifact. Every claim is verifiable against the public chain without relying on central verification services."
            },
            {
              id: "F2",
              title: "Command Authority (CA)",
              patent: "Command Logic Engine",
              summary: "The primary composite calibration metric.",
              detail: "Surfaced as the hero metric. Command Authority (CA) combines Time-To-Remediation (TTR), ALTFL command trajectory precision, and Bully Loop feedback survival. Supporting indices (AICI/AIOI/AIBS) feed into CA as components."
            },
            {
              id: "F3",
              title: "Consensus Certificate Anatomy",
              patent: "Four-Agent Council · Sovereign Ledger",
              summary: "Cryptographic consensus bundles.",
              detail: "Each certificate encapsulates the code artifact hash, raw PoF telemetry channels, and the weighted signatures of the 4-agent verification council (Auditor 40%, Proctor 30%, Mentor 20%, Chaos 10%), nested inside a Polygon-anchored Merkle proof."
            },
            {
              id: "F4",
              title: "The Evidence Locker (PoF)",
              patent: "ALTFL Telemetry Stack",
              summary: "6-channel millisecond-resolution telemetry.",
              detail: "Stores forensic session files tracking: Keystroke Velocity (KV), Inference Latency (IL), Command Precision (CP), Error Trajectory (ET), Verification Outcomes (VO), and Confidence Calibration (CCT). Enables full replay during recruiter audit."
            },
            {
              id: "F5",
              title: "The Decay Layer (λ)",
              patent: "Skill-Decay Lambda (λ)",
              summary: "Real-time competency half-life calculations.",
              detail: "Competency nodes carry individual skill decay lambda coefficients. St state (Active, Warning, Re-verify) decays exponentially over time from initial verification, requiring Refresh Labs or drills to restore baseline status."
            },
            {
              id: "F6",
              title: "Career Memory (Vector-Graph)",
              patent: "Career Memory Engine",
              summary: "Hybrid search and continuity over historical runs.",
              detail: "A local semantic query interface linking cleared artifacts using vector similarity (cosine threshold >= 0.65) overlayed on direct ontology graph dependencies to navigate professional evolution path histories."
            },
            {
              id: "F7",
              title: "Tenure Points & Tier Evolution",
              patent: "Tenure Points Ledger",
              summary: "Personal Human Sovereignty Engine (PHSE) logic.",
              detail: "Calculates active capability tiers (1 to 10) on a slow-drift nightly state machine. Tenure points accumulate via cleared gates and decay proportionally based on elapsed skill half-lives or active liabilities."
            },
            {
              id: "F8",
              title: "Bond Status Integration",
              patent: "EWARD Audit · B-300 Battle",
              summary: "Underwritten professional indemnity.",
              detail: "Integrates underwriting parameters (Guaranteed coverage V_u, annual premium credit calculation π, and strike margins) directly onto the verified passport page. Connects credential assurance with liability protection."
            },
            {
              id: "F9",
              title: "Asymmetric Liability Surfacing",
              patent: "Asymmetric Liability OL",
              summary: "Transparent overconfidence tracking.",
              detail: "Surfaces Overconfidence Liability (OL) flags where a user's declared confidence mismatch conflicts with verified errors. Generates critical flags to enforce integrity across downstream underwriting and vetting steps."
            },
            {
              id: "F10",
              title: "Three Audiences & Redaction Toggle",
              patent: "Liability OL · Annotation Persistence",
              summary: "Radical privacy and verification control.",
              detail: "Dynamic rendering formats details specifically for Owner views (complete data), Recruiters (verdict-focused reveal mechanics), and Public systems (anonymized hash proofs) managed by toggle settings."
            }
          ].map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-low border border-outline-variant/30 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setExpandedFoundation(expandedFoundation === item.id ? null : item.id)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-black/5"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-primary font-bold">{item.id}</span>
                    <h3 className="font-headline font-bold text-base md:text-lg">{item.title}</h3>
                    <span className="bg-[#16140F] text-[#C5A059] text-[8px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                      {item.patent}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-light mt-1">{item.summary}</p>
                </div>
                {expandedFoundation === item.id ? <ChevronUp className="w-5 h-5 text-on-surface-variant" /> : <ChevronDown className="w-5 h-5 text-on-surface-variant" />}
              </button>

              <AnimatePresence>
                {expandedFoundation === item.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-sm text-on-surface-variant leading-relaxed font-light border-t border-outline-variant/10">
                      {item.detail}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section> */}


      {/* Patent Mappings section — hidden
      <section className="space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
            <FileText className="w-3.5 h-3.5" />
            <span className="font-mono text-[9px] font-bold tracking-widest uppercase">IP Registry</span>
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            Patent Mappings Map
          </h2>
          <p className="text-on-surface-variant font-light max-w-3xl">
            Reference catalog connecting every Passport-related patent implementation with its physical UI layout surface components.
          </p>
        </div>
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#1E1E1D] text-white/60 font-mono text-[9px] uppercase tracking-wider border-b border-white/10">
                  <th className="p-4 pl-6 font-bold">Patent ID</th>
                  <th className="p-4 font-bold">Functional Scope</th>
                  <th className="p-4 pr-6 font-bold">Layout Implementation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-light text-on-surface-variant">
                PAT rows removed for brevity — restore array from git history if needed
              </tbody>
            </table>
          </div>
        </div>
      </section>
      */}
    </div>
  );
}
