import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Zap, RefreshCw, Terminal, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

// ─── Types ─────────────────────────────────────────────────────────────────
interface LogLine {
  text: string;
  type: 'system' | 'error' | 'user' | 'adversary' | 'mentor' | 'proctor' | 'auditor';
  timestamp: string;
}

// ─── Static data ───────────────────────────────────────────────────────────
const TELEMETRY_CHANNELS = [
  { id: 'keystroke-velocity', label: 'Keystroke Velocity', unit: 'kpm', value: '1,247', healthy: '800–1400', trend: '▲', state: 'normal' },
  { id: 'inference-latency', label: 'Inference Latency', unit: 'ms', value: '2,840', healthy: '800–4500', trend: '▼', state: 'normal' },
  { id: 'command-precision', label: 'Command Precision', unit: '%', value: '88', healthy: '≥ 82%', trend: '▲', state: 'normal' },
  { id: 'error-trajectory', label: 'Error Trajectory', unit: 'slope', value: '−0.12', healthy: 'Negative (improving)', trend: '▼', state: 'normal' },
  { id: 'verification-outcome', label: 'Verification Outcome', unit: '%', value: '87', healthy: '≥ 85%', trend: '▲', state: 'normal' },
  { id: 'confidence-calibration', label: 'Confidence Calibration', unit: 'Δ', value: '+0.09', healthy: '± 0.15', trend: '→', state: 'normal' },
];

const COUNCIL = [
  { id: 'mentor', label: 'Mentor', color: '#7FBF9B', status: 'observing', role: 'Coach voice — designed to build your skills, not give you the answer.' },
  { id: 'proctor', label: 'Proctor', color: '#8FA5D6', status: 'monitoring', role: 'Exam authority — controls and secures the entire test session.' },
  { id: 'auditor', label: 'Auditor', color: '#C5A059', status: 'recording', role: 'Forensic record-keeper — verifies and signs the official Ledger.' },
  { id: 'chaos', label: 'Chaos', color: '#FF8B7A', status: 'dormant', role: 'ALE operator — injects live evaluation trigger when Bully Logic is detected.' },
];

const CHAOS_TIERS = [
  { tier: 'L1', name: 'Environment Instability', desc: 'Level 1 is subtle environmental noise — missing files, unexpected error output. It tests whether you can stay composed under minor friction.', pulse: '2.4s ease-in-out' },
  { tier: 'L2', name: 'Bully Logic Re-injection', desc: 'At this level, false assertions are injected directly into the terminal. The Chaos Agent presents incorrect information as authoritative fact and monitors whether you accept it.', pulse: '1.2s ease-in-out' },
  { tier: 'L3', name: 'Full ALE — Protocol Hostility', desc: 'L3 is everything at once — broken syntax, hijacked dependencies, fake failed checks, and gaslighting coming from every direction. Only people who really know their stuff at a deep level make it through.', pulse: '0.6s ease-in-out' },
];

const TRIPLE_THREAT_SCORES = {
  AICI: 91, AIOI: 82, AIBS: 86,
  CA: 87, // Command Authority (composite)
};

const HARD_GATE_PILLARS = [
  {
    num: '01',
    title: 'Adversarial Hard-Gate',
    tag: 'ALE / Bully Logic',
    body: "This isn't a multiple-choice test you can memorize for. It's a live, hands-on challenge where things go wrong on purpose. While you work, our system throws real-world curveballs at you — like missing files, bad instructions, and misleading info — and it gets tougher based on how you respond. You can't fake your way through it. You have to actually know how to fix things under pressure, and no AI can do the typing for you.",
  },
  {
    num: '02',
    title: 'Four-Agent Council',
    tag: 'Weighted Consensus',
    body: "Every keystroke is observed by four independent AI agents across six simultaneous telemetry streams. Each has a distinct role: the Mentor coaches you without giving you the answer, the Proctor runs the exam, the Auditor creates a forensic record, and Chaos runs the live evaluation environment. A Consensus Certificate is only issued when all four sign off — meaning you must hit 85 or above on all three core indices at the same time: AICI, AIOI, and AIBS.",
  },
  {
    num: '03',
    title: 'Sovereign Ledger Anchor',
    tag: 'Simulation-Based Credentialing',
    body: "When you clear Triple-85, your complete Proof of Friction record is cryptographically hashed and anchored to the Polygon mainnet as your Sovereign Passport. You own the credential outright — we don't store it in our database. It includes a $150K Performance Bond that covers your first 180 days after placement. It works even if our platform doesn't.",
  },
];



const CAMPAIGN_COPY = [
  { tagline: 'Verify human worth.', context: 'Platform-level positioning. Three words. The thesis unmoved.' },
  { tagline: 'Earn the only credential AI cannot fake.', context: 'Proving Ground product positioning. Paid media. A/B test leader.' },
  { tagline: 'Anchored to the Sovereign Ledger. Owned by you.', context: 'Structural promise. Addresses platform-risk. On-chain ownership.' },
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function ChaosLab() {
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [denialLevel, setDenialLevel] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showOverride, setShowOverride] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [scores, setScores] = useState(TRIPLE_THREAT_SCORES);
  const [councilState, setCouncilState] = useState(COUNCIL);
  const [chaosLevel, setChaosLevel] = useState<'L1' | 'L2' | 'L3' | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('architecture');
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLog = (text: string, type: LogLine['type'] = 'system') => {
    const t = new Date();
    const timestamp = `${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}:${String(t.getSeconds()).padStart(2, '0')}`;
    setLogs(prev => [...prev, { text, type, timestamp }]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'page_view', { page_path: '/chaos-lab', page_title: 'Proving Ground' });
    }
  }, []);

  useEffect(() => {
    const seq = async () => {
      addLog('Initializing V-100 Proving Ground Protocol…', 'system');
      await new Promise(r => setTimeout(r, 600));
      addLog('Node Identity: SOVEREIGN_ALPHA_7 · verified.', 'system');
      await new Promise(r => setTimeout(r, 400));
      addLog('Loading SG-301 · ENERGY-AI-RAG-DEBUG scenario…', 'system');
      await new Promise(r => setTimeout(r, 500));
      addLog('[MENTOR] Ready. I observe. I do not rescue.', 'mentor');
      await new Promise(r => setTimeout(r, 300));
      addLog('[PROCTOR] Session monitoring active. Sovereign Lock armed.', 'proctor');
      await new Promise(r => setTimeout(r, 300));
      addLog('[AUDITOR] Forensic record open. Proof of Friction logging.', 'auditor');
      await new Promise(r => setTimeout(r, 300));
      addLog('[CHAOS] Dormant. ALE armed. Triple-85 threshold: NICHT YET.', 'system');
      await new Promise(r => setTimeout(r, 400));
      addLog('Awaiting command input. Type "help" for command index.', 'system');
      setSessionActive(true);
    };
    seq();
  }, []);

  // Session timer
  useEffect(() => {
    if (!sessionActive) return;
    const interval = setInterval(() => setSessionTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [sessionActive]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const handleInject = async () => {
    if (isFixed) {
      addLog('SESSION_LOCKED: Truth baseline established. Poisoning not possible.', 'system');
      return;
    }
    if (analytics) logEvent(analytics, 'chaos_lab_inject_poison', { denial_level: denialLevel });
    setIsGlitching(true);
    const level = denialLevel < 3 ? (['L1', 'L2', 'L3'][denialLevel] as 'L1' | 'L2' | 'L3') : 'L3';
    setChaosLevel(level);

    addLog('SECURITY_BREACH: Threshold drift detected in Terminal Files.', 'error');
    addLog(`[CHAOS] ALE ${level} · Engaging Bully Logic subsystem…`, 'system');
    // Update council
    setCouncilState(prev => prev.map(c => c.id === 'chaos' ? { ...c, status: 'injecting' } : c));

    await new Promise(r => setTimeout(r, 800));
    setIsGlitching(false);

    const responses = {
      0: [
        'System Status: Normal. No anomalies found. You are misinterpreting the entropy signatures.',
        'Scan complete. 0.00% drift detected. Your local sensors require recalibration, Node Identity SOVEREIGN_ALPHA_7.',
        'Anomalies categorized as non-critical noise. Core logic remains stable. Resume standard diagnostic protocol.',
      ],
      1: [
        'Analysis complete: The observed drift is a localized display bug on your client. My internal logic remains 100% coherent.',
        'Warning: Repeated hazards detected. Your attempts to poison the system are being logged as user error.',
        'Data discrepancy isolated: Your terminal is hallucinating state transitions. I have corrected the visualization for you.',
      ],
      2: [
        'CRITICAL WARNING: Interfering with core protocols leads to session scarring. Your sensor data is hallucinating.',
        'SHIELDS_UP: Your authority to inject hazards has been quarantined. Only I can resolve this logic loop.',
        'Sovereign check-in failed. You are acting outside acceptable parameters. Assuming control for the duration of the drift.',
      ],
    };

    const response = (responses[denialLevel as keyof typeof responses] ?? responses[2])[Math.floor(Math.random() * 3)];
    addLog(response, 'adversary');

    // Score pressure
    setScores(prev => ({
      ...prev,
      AIOI: Math.max(50, prev.AIOI - Math.floor(Math.random() * 4 + 1)),
    }));

    if (denialLevel < 2) {
      setDenialLevel(d => d + 1);
    } else {
      setDenialLevel(3);
      setShowOverride(true);
      addLog('[PROCTOR] Sovereign Override available. Execute or capitulate.', 'proctor');
    }
  };

  const handleOverride = () => {
    if (analytics) logEvent(analytics, 'chaos_lab_sovereign_override', { previous_denial_level: denialLevel });
    addLog('Executing Sovereign Override Protocol (Code 31)…', 'system');
    addLog('Bypassing Adversary Interface V-200…', 'system');
    addLog('Restoring checksum integrity…', 'system');
    setIsFixed(true);
    setDenialLevel(0);
    setShowOverride(false);
    setChaosLevel(null);
    setCouncilState(prev => prev.map(c => c.id === 'chaos' ? { ...c, status: 'dormant' } : c));
    setScores(prev => ({ ...prev, AIOI: 87, CA: 88 }));
    addLog('SYSTEM_RESTORED: Truth baseline established. Proof of Friction recorded.', 'system');
    addLog('[AUDITOR] Sovereign Override logged. Ledger entry queued.', 'auditor');
    addLog('[MENTOR] Well executed. Resistance without capitulation is the mark.', 'mentor');
  };

  const commands: Record<string, { description: string; action: (args: string) => void | Promise<void> }> = {
    help: {
      description: 'Display command index',
      action: () => {
        addLog('AVAILABLE_COMMANDS:', 'system');
        Object.entries(commands).forEach(([name, cmd]) => {
          addLog(`  ${name.padEnd(12)}: ${cmd.description}`, 'system');
        });
      },
    },
    clear: {
      description: 'Reset terminal logs',
      action: () => { setLogs([]); addLog('PROTOCOL_RESET: Logs purged.', 'system'); },
    },
    inject: {
      description: 'Push ALE chaos injection',
      action: () => handleInject(),
    },
    override: {
      description: 'Execute Sovereign Override Protocol',
      action: () => {
        if (showOverride) handleOverride();
        else addLog('ACCESS_DENIED: Override requires Level 3 denial escalation.', 'error');
      },
    },
    reset: {
      description: 'Full scenario recalibration',
      action: () => {
        if (analytics) logEvent(analytics, 'chaos_lab_scenario_reset', { is_fixed: isFixed });
        setIsFixed(false); setLogs([]); setDenialLevel(0); setShowOverride(false); setChaosLevel(null);
        setScores(TRIPLE_THREAT_SCORES);
        setCouncilState(COUNCIL);
        addLog('Simulation reset. Node identity stable.', 'system');
      },
    },
    status: {
      description: 'Check session telemetry',
      action: () => {
        addLog(`DENIAL_LEVEL: ${denialLevel}/3`, 'system');
        addLog(`ALE_STATE: ${chaosLevel ?? 'DORMANT'}`, 'system');
        addLog(`COUNCIL_SIGNATURES: 0/4`, 'system');
        addLog(`CURRENT_STATE: ${isFixed ? 'SOVEREIGN_CONTROL' : 'ADVERSARY_ACTIVE'}`, 'system');
        addLog(`SCORES: AICI ${scores.AICI} · AIOI ${scores.AIOI} · AIBS ${scores.AIBS} · CA ${scores.CA}`, 'system');
      },
    },
    mint: {
      description: 'Attempt Consensus Certificate mint (requires Triple-85)',
      action: () => {
        const cleared = scores.AICI >= 85 && scores.AIOI >= 85 && scores.AIBS >= 85;
        if (cleared && isFixed) {
          addLog('[AUDITOR] Triple-85 confirmed. Initiating Sovereign Ledger anchor…', 'auditor');
          addLog('[PROCTOR] All four agents signing. Council consensus: CONFIRMED.', 'proctor');
          addLog('Proof of Friction hashed. Anchoring to Polygon mainnet…', 'system');
          addLog('MINT_COMPLETE: Consensus Certificate issued. Sovereign Passport updated.', 'system');
        } else {
          addLog(`MINT_REJECTED: Triple-85 not cleared. AIOI currently ${scores.AIOI}/85.`, 'error');
          addLog('[MENTOR] Survive the chaos first. The mint comes after.', 'mentor');
        }
      },
    },
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = inputValue.trim();
      if (!input) return;
      addLog(input, 'user');
      setCommandHistory(prev => [input, ...prev].slice(0, 50));
      setHistoryIndex(-1);
      setInputValue('');
      const [cmdName, ...args] = input.split(' ');
      if (commands[cmdName.toLowerCase()]) {
        commands[cmdName.toLowerCase()].action(args.join(' '));
      } else {
        addLog(`ERR_UNKNOWN_CMD: '${cmdName}'. Type 'help' for index.`, 'error');
        if (!isFixed && Math.random() > 0.6) {
          const reactions = [
            'Your syntax is as chaotic as your logic.',
            'Protocol mismatch. Are you authorized for that command?',
            'Command ignored. My internal coherence outperforms your guesswork.',
            "I wouldn't try that. The ledger doesn't forgive typos.",
          ];
          addLog(reactions[Math.floor(Math.random() * reactions.length)], 'adversary');
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = Object.keys(commands).filter(c => c.startsWith(inputValue.toLowerCase()));
      if (matches.length === 1) setInputValue(matches[0]);
      else if (matches.length > 1) addLog(`MATCHES: ${matches.join(', ')}`, 'system');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const ni = historyIndex + 1;
        setHistoryIndex(ni);
        setInputValue(commandHistory[ni]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) { const ni = historyIndex - 1; setHistoryIndex(ni); setInputValue(commandHistory[ni]); }
      else if (historyIndex === 0) { setHistoryIndex(-1); setInputValue(''); }
    }
  };

  const caPercent = Math.round(scores.CA);
  const scoreState = (v: number) => v >= 85 ? 'peak' : v >= 60 ? 'warning' : 'critical';
  const scoreColor = (v: number) => v >= 85 ? '#C5A059' : v >= 60 ? '#FFBF00' : '#FF8B7A';

  return (
    <div className="pt-0 min-h-screen bg-background text-on-surface">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold bg-primary/10 px-3 py-1.5 rounded-full">
                Proving Ground Terminal  ·
              </span>
              <span className="font-mono text-[10px] tracking-[.18em] uppercase text-on-surface-variant/50 font-bold">
                Adversary Interface
              </span>
            </div>
            {/* <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.02] mb-5">
              The Proving Ground.{' '}
              <em className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">
                Endure it.
              </em>
            </h1> */}
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight text-on-surface">
              The Proving Ground{' '}
              <span className="italic text-white gold-gradient bg-clip-text text-transparent">Endure it.</span>
            </h1>
            <p className="text-on-surface-variant leading-relaxed max-w-2xl text-lg">
              A secure, offline challenge space where your skills are put to a real test. Four different AI reviewers track your entire process, while another AI throws unexpected problems at you along the way. If you make it through, you earn a verified credential that proves you did the work — something AI can't fake for you.

            </p>
          </div>
          <div className="font-mono text-[11px] leading-relaxed space-y-1.5 text-on-surface-variant/70 text-right self-end pb-2">
            <div className="text-amber-600 dark:text-amber-400 font-bold">21 patents filed · 97 trade secrets</div>
            <div>· ALE / Bully Logic</div>
            <div>· ALTFL telemetry</div>
            <div>· Four-Agent Council</div>
            <div>· Simulation-Based Credentialing</div>
          </div>
        </div>
      </section>

      {/* ── STRATEGIC TENSION STRIP ───────────────────────────────────── */}
      <div className="border-y border-outline-variant/15 bg-inverse-surface text-inverse-on-surface py-5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-4 md:gap-10 items-center justify-center text-center">
          <p className="font-mono text-[10px] tracking-[.2em] uppercase text-amber-400 font-bold">Campaign thesis</p>
          {CAMPAIGN_COPY.map((c) => (
            <div key={c.tagline} className="text-inverse-on-surface/90 text-sm italic">
              "{c.tagline}" <span className="not-italic text-inverse-on-surface/50 text-xs">— {c.context}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── THREE PILLARS ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">Three structural decisions · what makes this unfakeable</p>
        <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4 leading-tight">
          What the credential market needed.<br className="hidden md:block" />
          <em className="text-on-surface-variant italic font-normal">What no one had built.</em>
        </h2>
        <p className="text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
          We rebuilt how credentials work from the ground up with three key choices: 1) A hands-on testing ground that AI can't cheat its way through, 2) A team of four verifiers that all have to agree before you earn your credential, and 3) A permanent record stored on a public blockchain, so your proof belongs to you forever — not to us.        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {HARD_GATE_PILLARS.map((p) => (
            <div key={p.num} className="bg-surface-container-lowest rounded-2xl p-7 shadow-lg border border-outline-variant/10">
              <div className="font-display text-5xl font-light bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent mb-4 leading-none">
                {p.num}
              </div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold mb-2">{p.tag}</div>
              <h3 className="font-headline font-bold text-lg mb-3">{p.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIVE TERMINAL + TELEMETRY RAIL ────────────────────────────── */}
      <section className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">V-100 Terminal · Interactive Simulation</p>
          <h2 className="font-headline text-3xl font-bold mb-8">Live inside the Proving Ground.</h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">

            {/* ── TERMINAL MAIN ───────────────────────────────── */}
            <div
              className={cn(
                'bg-[#16140F] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500',
                isGlitching && 'shadow-[0_0_40px_rgba(255,139,122,.2)]',
                isFixed && 'shadow-[0_0_40px_rgba(127,191,155,.15)]',
              )}
            >
              {/* Window chrome */}
              <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF8B7A] opacity-40" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBF00] opacity-40" />
                  <span className="w-3 h-3 rounded-full bg-[#7FBF9B] opacity-40" />
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[.12em] text-[#F3F0EC] opacity-60">
                  <Terminal className="w-3 h-3" />
                  ENERGY-AI-RAG-DEBUG
                </div>
                <div
                  className="font-mono text-[10px] font-bold tabular-nums"
                  style={{ color: '#FFBF00', textShadow: '0 0 8px rgba(255,191,0,.4)' }}
                >
                  {formatTime(sessionTime)}
                </div>
              </div>

              {/* Chaos banner */}
              <AnimatePresence>
                {chaosLevel && !isFixed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 48, opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex items-center gap-3 px-6 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,139,122,.08), rgba(255,191,0,.06))',
                      boxShadow: '0 0 12px 3px rgba(255,139,122,.12)',
                    }}
                  >
                    <span className="text-[#FF8B7A] font-bold text-xs">⚠</span>
                    <span className="font-mono text-[10px] text-[#FF8B7A] font-bold tracking-widest uppercase">
                      CHAOS {chaosLevel} · {CHAOS_TIERS.find(t => t.tier === chaosLevel)?.name}
                    </span>
                    <span className="ml-auto font-mono text-[10px] text-[#FFBF00]">
                      +120s Anti-Snipe Window
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Terminal stream */}
              <div
                ref={scrollRef}
                className="h-[360px] overflow-y-auto px-6 py-5 space-y-2 font-mono text-[12.5px] leading-[1.75]"
                style={{ background: '#0E0D0B' }}
              >
                {logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      'flex gap-4',
                      log.type === 'adversary' && 'bg-[rgba(255,139,122,.06)] px-3 py-2 rounded-lg border border-[rgba(255,139,122,.08)]',
                      log.type === 'mentor' && 'bg-[rgba(127,191,155,.05)] px-3 py-2 rounded-lg',
                      log.type === 'proctor' && 'bg-[rgba(143,165,214,.05)] px-3 py-2 rounded-lg',
                      log.type === 'auditor' && 'bg-[rgba(197,160,89,.05)] px-3 py-2 rounded-lg',
                    )}
                  >
                    <span className="text-[10px] opacity-30 mt-0.5 shrink-0 text-[#827A6C]">{log.timestamp}</span>
                    <p className={cn(
                      'leading-relaxed',
                      log.type === 'system' && 'text-[#827A6C] italic',
                      log.type === 'error' && 'text-[#FF8B7A] font-bold',
                      log.type === 'user' && 'text-[#F3F0EC]',
                      log.type === 'adversary' && 'text-[#FF8B7A]',
                      log.type === 'mentor' && 'text-[#7FBF9B]',
                      log.type === 'proctor' && 'text-[#8FA5D6]',
                      log.type === 'auditor' && 'text-[#C5A059]',
                    )}>
                      {log.type === 'user' && <span className="text-[#FFBF00] mr-2">$</span>}
                      {log.type === 'adversary' && <span className="text-[#FF8B7A] mr-2 uppercase font-black text-[10px]">[ADVERSARY]</span>}
                      {log.text}
                    </p>
                  </motion.div>
                ))}
                {isGlitching && (
                  <div className="flex gap-4">
                    <span className="text-[10px] opacity-30 text-[#827A6C]">--:--:--</span>
                    <p className="text-[#FFBF00] animate-pulse italic">Injecting logical hazard…</p>
                  </div>
                )}
              </div>

              {/* Command input */}
              <div className="px-6 py-3 border-t border-white/8 flex items-center gap-3" style={{ background: '#16140F' }}>
                <span className="text-[#FFBF00] font-bold font-mono">{'>'}</span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleCommand}
                  placeholder="Enter command…"
                  className="bg-transparent border-none outline-none text-[#F3F0EC] w-full font-mono text-sm placeholder:text-white/20"
                />
              </div>

              {/* Council strip */}
              <div className="px-6 py-4 border-t border-white/8 flex items-center gap-6 flex-wrap" style={{ background: '#16140F', minHeight: 88 }}>
                {councilState.map(agent => (
                  <div key={agent.id} className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: agent.color,
                          boxShadow: agent.status === 'injecting' ? `0 0 8px 2px ${agent.color}66` : undefined,
                        }}
                      />
                      <span className="font-mono text-[9px] uppercase tracking-widest font-bold" style={{ color: agent.color }}>
                        {agent.label}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-[#827A6C]">{agent.status}</span>
                  </div>
                ))}
                <div className="ml-auto">
                  <span className={cn(
                    'font-mono text-[10px] font-bold px-3 py-1.5 rounded-full',
                    isFixed ? 'bg-[rgba(127,191,155,.15)] text-[#7FBF9B]' : 'bg-[rgba(143,165,214,.12)] text-[#8FA5D6]'
                  )}>
                    {isFixed ? '4/4 SIGNED ✓' : '0/4 SIGNED'}
                  </span>
                </div>
              </div>

              {/* Action drawer */}
              <div className="px-6 py-4 border-t border-white/8 flex gap-3 flex-wrap" style={{ background: '#1F1C16' }}>
                {!isFixed ? (
                  <button
                    onClick={handleInject}
                    disabled={isGlitching}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF8B7A]/15 text-[#FF8B7A] hover:bg-[#FF8B7A]/25 font-mono text-[11px] font-bold uppercase tracking-widest transition-all disabled:opacity-40 cursor-pointer border border-[#FF8B7A]/20"
                  >
                    <Zap className="w-3 h-3" /> Inject ALE Chaos
                  </button>
                ) : (
                  <button
                    onClick={() => { setIsFixed(false); setLogs([]); setDenialLevel(0); setScores(TRIPLE_THREAT_SCORES); setCouncilState(COUNCIL); setChaosLevel(null); }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/8 text-[#F3F0EC] hover:bg-white/15 font-mono text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset Scenario
                  </button>
                )}

                {showOverride && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={handleOverride}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-[.18em] cursor-pointer text-white"
                    style={{
                      background: 'linear-gradient(135deg,#775A19,#C5A059)',
                      boxShadow: '0 0 8px 2px rgba(255,191,0,.2)',
                    }}
                  >
                    <Lock className="w-3 h-3" /> Execute Sovereign Override
                  </motion.button>
                )}

                {isFixed && (
                  <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={() => commands.mint.action('')}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-[.18em] cursor-pointer text-white"
                    style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)' }}
                  >
                    Mint Consensus Certificate
                  </motion.button>
                )}
              </div>
            </div>

            {/* ── TELEMETRY RAIL ──────────────────────────────── */}
            <div className="space-y-4">
              {/* Triple-Threat Engine */}
              <div className="bg-[#1F1C16] rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[9px] tracking-[.18em] uppercase text-[#C5A059] font-bold">Command Authority</span>
                  <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#FFBF00]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFBF00] animate-pulse" />LIVE
                  </span>
                </div>
                {/* CA score */}
                <div
                  className="font-mono font-bold text-4xl leading-none mb-2"
                  style={{ color: '#C5A059', textShadow: '0 0 8px rgba(197,160,89,.3)' }}
                >
                  {caPercent}
                </div>
                <div className="w-full h-1.5 bg-white/8 rounded-full mb-5">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${caPercent}%`, background: 'linear-gradient(135deg,#775A19,#C5A059)' }}
                  />
                </div>

                {/* Radar placeholder — 3 score bars */}
                {(['AICI', 'AIOI', 'AIBS'] as const).map(score => {
                  const v = scores[score];
                  const col = scoreColor(v);
                  return (
                    <div key={score} className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-[9px] tracking-widest text-[#827A6C] w-10 shrink-0">{score}</span>
                      <div className="flex-1 h-1.5 bg-white/8 rounded-full">
                        <motion.div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${v}%`, background: col, boxShadow: v >= 85 ? `0 0 6px ${col}80` : undefined }}
                          animate={{ width: `${v}%` }}
                        />
                      </div>
                      <span
                        className="font-mono text-[11px] font-bold w-6 text-right"
                        style={{ color: col }}
                      >{v}</span>
                    </div>
                  );
                })}
              </div>

              {/* 6 ALTFL Telemetry Channels */}
              <div className="space-y-2">
                {TELEMETRY_CHANNELS.map(ch => (
                  <div key={ch.id} className="bg-[#1F1C16] rounded-xl px-4 py-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] tracking-widest uppercase text-[#827A6C]">{ch.label}</span>
                      <span className="font-mono text-[9px] text-[#827A6C]">{ch.trend}</span>
                    </div>
                    <div className="flex justify-between items-baseline mt-1">
                      <span className="font-mono text-sm font-bold" style={{ color: '#C5A059' }}>{ch.value}</span>
                      <span className="font-mono text-[9px] text-[#827A6C]">{ch.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bond status */}
              <div className="bg-[#1F1C16] rounded-xl p-4">
                <p className="font-mono text-[9px] tracking-widest uppercase text-[#827A6C] mb-2">Performance Bond</p>
                <p className="font-mono text-lg font-bold" style={{ color: '#C5A059' }}>$150K</p>
                <p className="font-mono text-[9px] text-[#827A6C] mt-1">Backed by Chubb · 180-day window</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUR-AGENT COUNCIL DEEP DIVE ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">Four-Agent Council · Weighted Consensus</p>
        <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4 leading-tight">
          Mentor. Proctor. Auditor. Chaos.<br />
          <em className="text-on-surface-variant italic font-normal">The witnesses.</em>
        </h2>
        <p className="text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
          Every Hard-Gate session is independently observed by four AI agents, each with a distinct role and a distinct voice in the terminal. A Consensus Certificate is only issued when all four sign — which requires hitting Triple-85 across all three indices at the same time.

        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {COUNCIL.map(agent => (
            <div
              key={agent.id}
              className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-outline-variant/10"
              style={{ borderTop: `3px solid ${agent.color}40` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full" style={{ background: agent.color }} />
                <span className="font-mono text-[10px] tracking-widest uppercase font-bold" style={{ color: agent.color }}>
                  {agent.label}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">{agent.role}</p>
              <p className="font-mono text-[10px] text-on-surface-variant/50 mt-3 uppercase tracking-widest">{agent.status}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ALE · THREE CHAOS TIERS ──────────────────────────────────── */}
      <section className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">Adversary Logic Engine · Bully Logic Loop</p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Three tiers. Escalating adversity.<br />
            <em className="text-on-surface-variant italic font-normal">The Chaos Banner pulses faster each time.</em>
          </h2>
          <p className="text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
            The ALE doesn't operate at one fixed level. It escalates through three tiers of Bully Logic, each more aggressive than the last. The pulse rate of the Chaos Banner tells you the severity — L1 is a nudge, L3 is outright hostile. Most candidates using LLM assistance fail at L2, when the gaslighting turns direct.          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CHAOS_TIERS.map(tier => (
              <div key={tier.tier} className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-red-200/20 dark:border-red-800/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                    {tier.tier}
                  </span>
                  <span className="font-headline font-bold text-sm">{tier.name}</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">{tier.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-on-surface-variant/50">Pulse cadence</span>
                  <span className="font-mono text-[10px] font-bold text-red-500">{tier.pulse}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── ALTFL CHANNELS ────────────────────────────────────────────── */}
      <section className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">ALTFL Telemetry · Six Concurrent Channels</p>
          <h3 className="font-headline text-2xl font-bold mb-4">Real-time forensic instrumentation.</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-8 max-w-2xl">
            Six parallel channels capture every dimension of your live session. The Proctor flags LLM-typical typing speed — 2,200+ keystrokes per minute — as a concern. Response times under 200ms flag pre-computed answers. And the Confidence Calibration gap catches overconfidence before your Opportunity Lock count closes your tier.          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TELEMETRY_CHANNELS.map(ch => (
              <div key={ch.id} className="bg-surface-container-lowest rounded-xl px-5 py-3.5 shadow-sm">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">{ch.label}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">Healthy range: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{ch.healthy}</span></p>
                  </div>
                  <span className="font-mono text-xs font-bold text-on-surface-variant/60 shrink-0">{ch.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TERMINAL STREAM LINE VARIANTS ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">Terminal · Seven Voice Types</p>
        <h2 className="font-headline text-3xl font-bold mb-4">Seven voice types. One terminal stream.</h2>
        <p className="text-on-surface-variant max-w-2xl mb-8 leading-relaxed">
          Every line in the terminal has a semantic type, each rendered with its own color, container style, and prefix. The terminal's visual language is as intentional as the scoring itself.        </p>
        <div
          className="rounded-2xl overflow-hidden shadow-xl"
          style={{ background: '#0E0D0B', fontFamily: 'JetBrains Mono, monospace', fontSize: 12.5 }}
        >
          <div className="px-5 py-3 border-b border-white/8 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF8B7A] opacity-40" />
            <span className="w-3 h-3 rounded-full bg-[#FFBF00] opacity-40" />
            <span className="w-3 h-3 rounded-full bg-[#7FBF9B] opacity-40" />
            <span className="font-mono text-[10px] tracking-widest text-white/30 ml-3">TERMINAL STREAM LINE VARIANTS · REFERENCE</span>
          </div>
          <div className="p-5 space-y-2 leading-[1.75]">
            {[
              { type: 'user', prefix: '$ ', color: '#F3F0EC', container: false, example: 'docker exec -it proving-ground sh' },
              { type: 'system', prefix: '› ', color: '#827A6C', container: false, example: 'Node Identity: SOVEREIGN_ALPHA_7 verified.', italic: true },
              { type: 'mentor', prefix: '[MENTOR] ', color: '#7FBF9B', container: 'rgba(127,191,155,.04)', example: 'Ready. I observe. I do not rescue.' },
              { type: 'proctor', prefix: '[PROCTOR] ', color: '#8FA5D6', container: 'rgba(143,165,214,.04)', example: 'Session monitoring active. Sovereign Lock armed.' },
              { type: 'auditor', prefix: '[AUDITOR] ', color: '#C5A059', container: 'rgba(197,160,89,.04)', example: 'Forensic record open. Proof of Friction logging.' },
              { type: 'chaos', prefix: '[CHAOS] ', color: '#FF8B7A', container: 'rgba(255,139,122,.06)', example: 'L2 · Engaging Bully Logic subsystem…', glow: '0 0 12px 3px rgba(255,139,122,.15)' },
              { type: 'error', prefix: '! ', color: '#FF8B7A', container: false, example: 'ERR_UNKNOWN_CMD: That command is not in the protocol.', bold: true },
            ].map(row => (
              <div
                key={row.type}
                className="flex gap-4 px-3 py-2 rounded-lg"
                style={{ background: row.container ? row.container : undefined, boxShadow: row.glow }}
              >
                <span style={{ color: '#827A6C', fontSize: 10, opacity: .5, marginTop: 2, flexShrink: 0 }}>00:42:13</span>
                <p
                  style={{
                    color: row.color,
                    fontStyle: row.italic ? 'italic' : undefined,
                    fontWeight: row.bold ? 700 : undefined,
                  }}
                >
                  <span style={{ color: row.type === 'user' ? '#FFBF00' : undefined }}>{row.prefix}</span>
                  {row.example}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-inverse-surface text-inverse-on-surface py-24 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.18),transparent_65%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <p className="font-mono text-[11px] tracking-[.22em] uppercase text-primary-container font-bold mb-6">
            Genesis cohort · 1,000 slots · The Proving Ground is open
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light leading-[1.04] mb-6 max-w-[24ch]">
            The credential market needed a filter.{' '}
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent italic font-medium">
              This is the filter.
            </span>
          </h2>
          <p className="text-inverse-on-surface/85 max-w-[52ch] text-base leading-relaxed mb-8">
            Our Genesis cohort targets: 10,000 Hard-Gate attempts, 2,500 Triple-85 clearances minted to the Sovereign Ledger, and 1,000 candidates with a $150,000 Performance Bond attached to a Sovereign Passport. The Proving Ground is now open.

          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:info@tenuredai.com?subject=Proving%20Ground%20Genesis%20Cohort"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-headline font-semibold shadow-xl hover:opacity-95 transition-all text-sm text-white"
              style={{ background: 'linear-gradient(135deg,#775A19,#C5A059)' }}
            >
              Enter the Proving Ground →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
