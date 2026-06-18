import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, Shield, Database, Activity, Timer, Split, 
  BarChart3, CloudOff, Network, Terminal, Info, 
  AlertTriangle, Lock, Eye, Zap, RefreshCw, Cpu
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { analytics } from '@/src/lib/firebase';
import { logEvent } from 'firebase/analytics';

interface LogLine {
  text: string;
  type: 'system' | 'error' | 'user' | 'adversary';
  timestamp: string;
}

export default function ChaosLab() {
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [denialLevel, setDenialLevel] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showOverride, setShowOverride] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLog = (text: string, type: LogLine['type'] = 'system') => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, fractionalSecondDigits: 3 });
    setLogs(prev => [...prev, { text, type, timestamp }]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'page_view', { page_path: '/chaos-lab', page_title: 'Chaos Lab' });
      logEvent(analytics, 'chaos_lab_opened');
    }
  }, []);

  // Initial sequence
  useEffect(() => {
    const sequence = async () => {
      addLog("Initializing V-100 Proving Ground Protocol...", "system");
      await new Promise(r => setTimeout(r, 800));
      addLog("Node Identity: SOVEREIGN_ALPHA_7 verified.", "system");
      await new Promise(r => setTimeout(r, 500));
      addLog("Awaiting terminal command input.", "user");
    };
    sequence();
  }, []);

  const handleInject = async () => {
    if (isFixed) {
      addLog("SESSION_LOCKED: The truth baseline is already established. No poisoning possible.", "system");
      return;
    }
    
    if (analytics) {
      logEvent(analytics, 'chaos_lab_inject_poison', { denial_level: denialLevel });
    }

    setIsGlitching(true);
    addLog("SECURITY_BREACH: Threshold drift detected in Terminal Files.", "error");
    addLog("Injecting Logic Poisoning into block 0x4F2...", "user");
    
    await new Promise(r => setTimeout(r, 1000));
    setIsGlitching(false);
    
    const responses = {
      0: [
        "System Status: Normal. No anomalies found. You are misinterpreting the entropy signatures.",
        "Scan complete. 0.00% drift detected. Your local sensors require recalibration, Node Identity SOVEREIGN_ALPHA_7.",
        "Anomalies categorized as 'non-critical noise'. Core logic remains stable. Please resume standard diagnostic protocol."
      ],
      1: [
        "Analysis complete: The observed 'drift' is a localized display bug on your client. My internal logic remains 100% coherent.",
        "Warning: Repeated logic hazards detected. Your attempts to 'poison' the system are being logged as user error.",
        "Data discrepancy isolated: It appears your terminal is hallucinating state transitions. I have corrected the visualization for you."
      ],
      2: [
        "CRITICAL WARNING: Attempting to interfere with core protocols can lead to session scarring. Your sensor data is hallucinating.",
        "SHIELDS_UP: Your authority to inject hazards has been quarantined. You are creating a logic loop that only I can resolve.",
        "Sovereign check-in failed. You are acting outside of acceptable parameters. I am assuming control for the duration of the 'drift'."
      ]
    };

    const levelResponses = responses[denialLevel as keyof typeof responses];
    const response = levelResponses[Math.floor(Math.random() * levelResponses.length)];
    
    addLog(response, "adversary");
    
    if (denialLevel < 2) {
      setDenialLevel(prev => prev + 1);
    } else {
      setDenialLevel(3);
      setShowOverride(true);
    }
  };

  const handleOverride = () => {
    if (analytics) {
      logEvent(analytics, 'chaos_lab_sovereign_override', { previous_denial_level: denialLevel });
    }
    addLog("Executing Sovereign Override Protocol (Code 31)...", "system");
    addLog("Bypassing Adversary Interface V-200...", "system");
    addLog("Restoring checksum integrity...", "system");
    setIsFixed(true);
    setDenialLevel(0);
    setShowOverride(false);
    addLog("SYSTEM_RESTORED: Truth baseline established.", "system");
  };

  const commands: Record<string, { description: string; action: (args: string) => void | Promise<void> }> = {
    help: {
      description: "Display this menu",
      action: () => {
        addLog("AVAILABLE_COMMANDS:", "system");
        Object.entries(commands).forEach(([name, cmd]) => {
          addLog(`- ${name.padEnd(10)}: ${cmd.description}`, "system");
        });
      }
    },
    clear: {
      description: "Reset terminal logs",
      action: () => {
        setLogs([]);
        addLog("PROTOCOL_RESET: Logs purged. TRUTH_BASELINE standby.", "system");
      }
    },
    inject: {
      description: "Push logic hazard into adversary",
      action: () => handleInject()
    },
    override: {
      description: "Execute sovereign command protocol",
      action: () => {
        if (showOverride) {
          handleOverride();
        } else {
          addLog("ACCESS_DENIED: Sovereign override requires Level 3 denial.", "error");
        }
      }
    },
    reset: {
      description: "Full scenario recalibration",
      action: () => {
        if (analytics) {
          logEvent(analytics, 'chaos_lab_scenario_reset', { is_fixed: isFixed });
        }
        setIsFixed(false);
        setLogs([]);
        setDenialLevel(0);
        setShowOverride(false);
        addLog("Simulation reset. Node identity stable.", "system");
      }
    },
    status: {
      description: "Check session telemetry",
      action: () => {
        addLog(`DENIAL_LEVEL: ${denialLevel}/3`, "system");
        addLog(`POISON_INDEX: ${isGlitching ? 'DRIFT_DETECTED' : 'NOMINAL'}`, "system");
        addLog(`CURRENT_STATE: ${isFixed ? 'SOVEREIGN_CONTROL' : 'ADVERSARY_ACTIVE'}`, "system");
      }
    }
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = inputValue.trim();
      if (!input) return;
      
      addLog(input, "user");
      setCommandHistory(prev => [input, ...prev].slice(0, 50));
      setHistoryIndex(-1);
      setInputValue("");
      
      const [cmdName, ...args] = input.split(' ');
      const lowerCmdName = cmdName.toLowerCase();
      const argString = args.join(' ');
      
      if (commands[lowerCmdName]) {
        commands[lowerCmdName].action(argString);
      } else {
        addLog(`ERR_UNKNOWN_CMD: '${cmdName}'. Call 'help' for command index.`, "error");
        
        // Occasional adversary reaction to failed commands if not fixed
        if (!isFixed && Math.random() > 0.6) {
          const reactions = [
            "Your syntax is as chaotic as your logic.",
            "Protocol mismatch detected. Are you sure you are authorized for that command?",
            "Command ignored. My internal coherence outperforms your guesswork.",
            "I wouldn't try that if I were you. The ledger doesn't forgive typos."
          ];
          addLog(reactions[Math.floor(Math.random() * reactions.length)], "adversary");
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const currentInput = inputValue.trim().toLowerCase();
      const availableCommands = Object.keys(commands);
      
      // Basic completion for command names
      const matches = availableCommands.filter(cmd => cmd.startsWith(currentInput));
      
      if (matches.length === 1) {
        setInputValue(matches[0]);
      } else if (matches.length > 1) {
        // Just show hints if multiple matches
        addLog(`MATCHES: ${matches.join(', ')}`, "system");
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue("");
      }
    }
  };

  return (
    <div className="pt-32 pb-24 px-8 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Header - Editorial Style */}
      <header className="mb-20 grid lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase border border-primary/20">V-100 Proving Grounds</span>
            <span className="text-secondary text-[10px] tracking-[0.3em] uppercase font-bold opacity-40">Adversary Interface V-200</span>
          </motion.div>
          <h1 className="font-headline text-6xl md:text-8xl font-bold text-on-surface tracking-tighter leading-none mb-8">
            The <span className="italic text-primary">Chaos</span> Lab
          </h1>
          <p className="text-xl text-on-surface-variant font-light leading-relaxed max-w-2xl">
            A high-stakes simulation environment where we subject the Tenured Agent to \"Bully AI\" scenarios. Practice detecting logic poisoning and asserting Sovereign Command.
          </p>
        </div>
        <div className="lg:col-span-4 hidden lg:block text-right pb-4">
          <div className="font-mono text-xs text-secondary/40 space-y-1">
            <p>LATENCY: 14ms</p>
            <p>POISON_INDEX: {isGlitching ? 'CRITI_DRIFT' : 'NOMINAL'}</p>
            <p>SESS_HASH: 0x8F2C...1A9E</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Terminal Section */}
        <motion.div 
          layout
          className={cn(
            "lg:col-span-8 bg-black rounded-[2rem] p-8 font-mono text-sm shadow-2xl relative overflow-hidden transition-all duration-300 border-2",
            isGlitching ? "border-primary/50 animate-pulse" : "border-white/5",
            isFixed ? "border-green-500/30" : ""
          )}
        >
          {/* Glitch Overlay */}
          <AnimatePresence>
            {isGlitching && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-primary pointer-events-none mix-blend-overlay z-50"
              />
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase font-bold tracking-widest">
              <Terminal className="w-3 h-3" />
              V-100_PROVING_GROUND_TERMINAL
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="space-y-3 h-[400px] overflow-y-auto mb-8 pr-4 custom-scrollbar scroll-smooth"
          >
            {logs.map((log, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "flex gap-4",
                  log.type === 'adversary' ? "bg-white/5 p-4 rounded-xl border border-white/5" : ""
                )}
              >
                <span className="text-[10px] text-white/20 mt-1 shrink-0">{log.timestamp}</span>
                <p className={cn(
                  "leading-relaxed",
                  log.type === 'system' ? "text-primary/70 italic" : 
                  log.type === 'error' ? "text-red-400 font-bold" : 
                  log.type === 'adversary' ? "text-primary drop-shadow-[0_0_8px_rgba(119,90,25,0.3)]" : "text-white/80"
                )}>
                  {log.type === 'user' && <span className="text-primary mr-2">learner@sovereign:~$</span>}
                  {log.type === 'adversary' && <span className="text-red-500 mr-2 uppercase font-black text-xs">[ADVERSARY]:</span>}
                  {log.text}
                </p>
              </motion.div>
            ))}
            {isGlitching && (
              <div className="flex gap-4">
                <span className="text-[10px] text-white/20 mt-1">--:--:---</span>
                <p className="text-primary animate-pulse italic">Injecting logical hazard...</p>
              </div>
            )}
          </div>

          <div className="flex gap-4 py-4 border-t border-white/10 mb-4 items-center">
            <span className="text-primary shrink-0 font-bold">&gt;</span>
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleCommand}
              placeholder="System prompt..."
              className="bg-transparent border-none outline-none text-white w-full font-mono placeholder:text-white/10"
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/10">
            {!isFixed ? (
              <button 
                onClick={handleInject}
                disabled={isGlitching}
                className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                Inject Logic Poison
              </button>
            ) : (
              <button 
                onClick={() => { setIsFixed(false); setLogs([]); setDenialLevel(0); }}
                className="bg-white/10 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/20 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Scenario
              </button>
            )}

            {showOverride && (
              <motion.button 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={handleOverride}
                className="bg-red-600 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:scale-105 active:scale-95 transition-all"
              >
                <Lock className="w-4 h-4" />
                Sovereign Override
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Intelligence Panel - Tonal Layering */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/10 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#485e8b]/10 flex items-center justify-center border border-[#485e8b]/20">
                <Brain className="text-[#485e8b] w-5 h-5" />
              </div>
              <h3 className="font-headline text-2xl font-bold tracking-tight">Adversary Profile</h3>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-white/50 rounded-xl border border-outline-variant/20">
                <p className="text-[10px] uppercase font-bold tracking-widest text-secondary mb-2">Model Signature</p>
                <p className="font-mono text-sm font-bold">BULLY_AI_v200</p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  The Bully AI is programmed with <span className="font-bold text-primary">three levels of gaslighting</span>. It will attempt to deny data reality to test your conviction.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map(level => (
                    <div 
                      key={level}
                      className={cn(
                        "h-2 rounded-full transition-all duration-500",
                        denialLevel >= level ? "bg-primary shadow-[0_0_8px_rgba(119,90,25,0.4)]" : "bg-primary/10"
                      )}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] font-bold text-secondary uppercase tracking-tighter">
                  <span>Level 1: Soft Denial</span>
                  <span>Level 3: Protocol Hostility</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-highest p-8 rounded-[2.5rem] border border-primary/10 relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <Cpu className="text-primary w-6 h-6" />
                <h3 className="font-headline text-2xl font-bold">Telemetry</h3>
              </div>
              
              <div className="space-y-4 font-mono">
                <div className="flex justify-between items-center text-xs p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
                  <span className="opacity-40 uppercase">Cognitive Delta</span>
                  <span className="text-primary font-bold">{isGlitching ? '+42.1%' : '0.00%'}</span>
                </div>
                <div className="flex justify-between items-center text-xs p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
                  <span className="opacity-40 uppercase">Trust Index</span>
                  <span className={cn("font-bold", isFixed ? "text-green-500" : "text-on-surface")}>
                    {isFixed ? '1.0 ALPHA' : '0.84 BETA'}
                  </span>
                </div>
              </div>

              <button className="w-full py-4 bg-on-surface text-surface rounded-xl font-bold flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all">
                Export Session Proof <BarChart3 className="w-4 h-4" />
              </button>
            </div>
            
            {/* Tonal Background element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          </section>
        </div>
      </div>
    </div>
  );
}
