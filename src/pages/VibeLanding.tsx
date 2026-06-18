import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Bell, X, Volume2, VolumeX } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';

export default function VibeLanding() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isTTSActive, setIsTTSActive] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<{ text: string, type: 'system' | 'user' | 'adversary' }[]>([
    { text: "Welcome to Tenured AI Concierge.", type: 'system' },
    { text: "Type 'help' for available commands.", type: 'system' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0
  });

  useEffect(() => {
    const target = new Date('June 19, 2026 00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [interactionCount, setInteractionCount] = useState(0);

  const commands: Record<string, { description: string; action: (args: string) => Promise<void> | void }> = {
    help: {
      description: "Display this menu",
      action: () => {
        const helpText = Object.entries(commands)
          .map(([name, cmd]) => `${name.padEnd(8)} - ${cmd.description}`)
          .join('\n');
        setTerminalHistory(prev => [
          ...prev, 
          { text: "help", type: 'user' },
          { text: "Available Commands:\n" + helpText, type: 'system' }
        ]);
      }
    },
    verify: {
      description: "Initialize Sovereign Check-In protocol",
      action: () => {
        const response = interactionCount > 5 
          ? "Verification priority elevated for high-activity node. Redirecting to Sovereign Check-In..."
          : "Redirecting to Sovereign Check-In protocol...";
        setTerminalHistory(prev => [
          ...prev, 
          { text: "verify", type: 'user' },
          { text: response, type: 'system' }
        ]);
      }
    },
    patent: {
      description: "View index of IP Fortress patents",
      action: () => {
        const patentResponses = [
          "14 Patents Pending. Displaying index... [ACCESS DENIED]",
          "IP Fortress index is currently encrypted. Sovereign Tier nodes only.",
          "Accessing Patent Vault... Error 403: Insufficient Ledger Reputation."
        ];
        const response = patentResponses[interactionCount % patentResponses.length];
        setTerminalHistory(prev => [
          ...prev, 
          { text: "patent", type: 'user' },
          { text: response, type: 'system' }
        ]);
      }
    },
    status: {
      description: "Check system integrity & deployment state",
      action: () => {
        const response = interactionCount > 10
          ? "System: Operational. Session persistence established. Next opening: June 19, 2026."
          : "System: Operational. Next opening: June 19, 2026.";
        setTerminalHistory(prev => [
          ...prev, 
          { text: "status", type: 'user' },
          { text: response, type: 'system' }
        ]);
      }
    },
    clear: {
      description: "Reset the localized terminal history",
      action: () => {
        setTerminalHistory([
          { text: "Terminal history cleared.", type: 'system' },
          { text: "Type 'help' for available commands.", type: 'system' }
        ]);
      }
    },
    concierge: {
      description: "[query] - Pulse natural language queries to the Concierge AI",
      action: async (query) => {
        if (!query) {
          setTerminalHistory(prev => [
            ...prev, 
            { text: "concierge", type: 'user' },
            { text: "Error: Concierge requires a query parameter.", type: 'system' }
          ]);
          return;
        }

        const processingMsg = interactionCount > 15 
          ? "High intensity query stream detected. Scaling compute for deeper insight..."
          : "System processing...";
        
        setTerminalHistory(prev => [
          ...prev, 
          { text: `concierge ${query}`, type: 'user' },
          { text: processingMsg, type: 'system' }
        ]);
        
        const geminiResponse = await sendMessageToGemini(query);
        
        setTerminalHistory(prev => {
            const newHistory = [...prev];
            if (newHistory.length > 0 && (newHistory[newHistory.length - 1].text === processingMsg)) {
               newHistory[newHistory.length - 1] = { text: geminiResponse, type: 'system' };
            }
            return newHistory;
        });
      }
    }
  };

  const handleCommand = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = inputValue.trim();
      if (!input) return;

      setCommandHistory(prev => [input, ...prev].slice(0, 50));
      setHistoryIndex(-1);
      setInteractionCount(prev => prev + 1);

      const [cmdName, ...args] = input.split(' ');
      const lowerCmdName = cmdName.toLowerCase();
      const argString = args.join(' ');

      setInputValue("");

      if (commands[lowerCmdName]) {
        await commands[lowerCmdName].action(argString);
      } else {
        // Default to concierge if not a specific command
        const processingMsg = interactionCount > 15 
          ? "High intensity query stream detected. Scaling compute for deeper insight..."
          : "System processing...";
        
        setTerminalHistory(prev => [
          ...prev, 
          { text: input, type: 'user' },
          { text: processingMsg, type: 'system' }
        ]);
        
        const geminiResponse = await sendMessageToGemini(input);
        
        setTerminalHistory(prev => {
            const newHistory = [...prev];
            if (newHistory.length > 0 && (newHistory[newHistory.length - 1].text === processingMsg)) {
               newHistory[newHistory.length - 1] = { text: geminiResponse, type: 'system' };
            }
            return newHistory;
        });
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const currentInput = inputValue.trim().toLowerCase();
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(currentInput));
      
      if (matches.length === 1) {
        setInputValue(matches[0]);
      } else if (matches.length > 1) {
        setTerminalHistory(prev => [...prev, { text: `MATCHES: ${matches.join(', ')}`, type: 'system' }]);
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
    <div className="bg-background text-dark-teal font-body overflow-x-hidden min-h-screen">
      <div className="fixed inset-0 grain-overlay z-[9999]"></div>

      {/* Navigation override for this specific page layout */}
      <nav className="absolute top-0 w-full p-8 flex justify-between items-center bg-transparent z-10">
        <div className="font-serif text-2xl font-bold tracking-tighter">TENURED AI</div>
        <div className="hidden md:flex space-x-8 font-mono text-xs uppercase tracking-widest text-[#0d2b2d]">
          <Link to="/chaos-lab" className="hover:text-gold-leaf transition">The Proving Ground</Link>
          <a href="#patents" className="hover:text-gold-leaf transition">IP Fortress</a>
          <a href="#indices" className="hover:text-gold-leaf transition">AICI Standards</a>
          <Link to="/request-access" className="hover:text-gold-leaf transition">Guest List</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 relative">
        <span className="section-tag">EST. 2026 | TRANQUILITY BASE RESEARCH</span>
        <h1 className="text-6xl md:text-8xl font-light mb-6 leading-tight font-serif">
          The Sovereign <br /> <span className="italic">Workforce Ledger</span>
        </h1>
        <p className="max-w-2xl text-lg opacity-80 mb-12">
          Eliminate hiring hallucinations. Tenured AI uses Friction Injection Logic to verify true AI competency, stored on your own sovereign architectural ledger.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link to="/chaos-lab" className="btn-sovereign text-center">Enter The Proving Ground</Link>
          <Link to="/docs" className="border border-dark-teal border-opacity-20 px-8 py-4 font-mono text-xs uppercase tracking-widest hover:border-opacity-100 transition text-center">Read Whitepaper</Link>
        </div>
      </section>

      {/* The Concierge Desk / Check-In */}
      <section className="marble-desk py-32 px-8 text-white relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <span className="section-tag">ARRIVAL & VERIFICATION</span>
            <h2 className="text-5xl mb-8 font-serif">The Sovereign Check-In</h2>
            <p className="text-gray-400 mb-8 font-mono text-sm leading-relaxed">
              Identity is not granted; it is verified. Deposit your decentralized ID to begin the AICI diagnostic. Your progress remains immutable, encrypted, and entirely yours.
            </p>
            <div className="bg-white/5 p-6 border border-white/10 rounded-sm">
              <p className="font-mono text-xs text-amber-glow mb-4">&gt; INITIALIZING SOVEREIGN_PROTOCOL_V.1.04</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <input 
                    type="text" 
                    placeholder="WALLET_ADDRESS_OR_DID" 
                    className="bg-black/50 border border-white/20 p-3 flex-1 font-mono text-xs focus:outline-none focus:border-gold-leaf text-white"
                />
                <button className="bg-gold-leaf text-black px-6 py-3 font-mono text-xs font-bold hover:bg-[#d4ae6a] transition-colors">CONNECT</button>
              </div>
            </div>
          </div>

          {/* Mechanical Countdown */}
          <div className="flex flex-col items-center">
            <span className="section-tag mb-4">GRAND OPENING: JUNE 19, 2026</span>
            <div className="flex gap-4 justify-center">
              <div className="flex flex-col items-center">
                <div className="flip-unit">{timeLeft.days.toString().padStart(2, '0')}</div>
                <div className="text-[0.75rem] uppercase tracking-[0.1em] mt-2 text-white/50 text-center">Days</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flip-unit">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-[0.75rem] uppercase tracking-[0.1em] mt-2 text-white/50 text-center">Hrs</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flip-unit">{timeLeft.mins.toString().padStart(2, '0')}</div>
                <div className="text-[0.75rem] uppercase tracking-[0.1em] mt-2 text-white/50 text-center">Min</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flip-unit">{timeLeft.secs.toString().padStart(2, '0')}</div>
                <div className="text-[0.75rem] uppercase tracking-[0.1em] mt-2 text-white/50 text-center">Sec</div>
              </div>
            </div>
            <p className="mt-12 text-sm text-gray-500 italic">"The highest friction creates the hardest truth."</p>
          </div>
        </div>
      </section>

      {/* The Indices */}
      <section id="indices" className="py-32 px-8 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="section-tag">PROPRIETARY STANDARDS</span>
              <h2 className="text-5xl font-serif">The Metric of Merit</h2>
            </div>
            <p className="text-sm font-mono text-gray-500 max-w-xs mt-4 md:mt-0">
              Calculated in real-time using Friction Injection Stress-Testing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="index-card group cursor-pointer">
              <h3 className="text-3xl mb-4 font-serif group-hover:text-gold-leaf transition-colors">AICI</h3>
              <p className="text-xs font-mono mb-6 text-gold-leaf">AI Competency Index</p>
              <p className="text-sm opacity-70 leading-relaxed">
                The ultimate verification of individual mastery. Not just what you know, but how you orchestrate.
              </p>
            </div>
            <div className="index-card group cursor-pointer">
              <h3 className="text-3xl mb-4 font-serif group-hover:text-gold-leaf transition-colors">AIOI</h3>
              <p className="text-xs font-mono mb-6 text-gold-leaf">AI Orchestrator Index</p>
              <p className="text-sm opacity-70 leading-relaxed">
                A dynamic score for institutional leaders who successfully integrate AI into human-centric workflows.
              </p>
            </div>
            <div className="index-card group cursor-pointer">
              <h3 className="text-3xl mb-4 font-serif group-hover:text-gold-leaf transition-colors">AIBS</h3>
              <p className="text-xs font-mono mb-6 text-gold-leaf">AI Builder Score</p>
              <p className="text-sm opacity-70 leading-relaxed">
                A rigorous metric for the architects of the next era. Verified via proof-of-work in The Proving Ground.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The IP Fortress / Patents */}
      <section id="patents" className="py-32 px-8 bg-[#0a1a1b] text-[#f9f7f2]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          <div className="md:w-1/2">
            <img 
              src="https://img.freepik.com/free-photo/abstract-eye-structure-background_23-2149023447.jpg?w=800" 
              alt="Patent Visualization" 
              className="opacity-40 grayscale sepia rounded-sm w-full object-cover aspect-video md:aspect-square"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="md:w-1/2">
            <span className="section-tag opacity-80">INTELLECTUAL PROPERTY FORTRESS</span>
            <h2 className="text-5xl mb-8 font-serif leading-tight">14 Pending Patents. <br /> One Standard.</h2>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              We aren't just building a platform; we are establishing the sovereign protocol for workforce intelligence. Our architecture handles the complexity of Friction Injection and Ledger Synchronization, so you can focus on the talent.
            </p>
            <a href="#" className="text-gold-leaf font-mono text-xs uppercase tracking-widest border-b border-gold-leaf pb-2 hover:opacity-80 transition-opacity">View Patent Gallery →</a>
          </div>
        </div>
      </section>

      {/* Footer / Editorial */}
      <footer className="py-20 px-8 border-t border-dark-teal/10 bg-background">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="font-serif text-3xl font-bold mb-6">TENURED AI</div>
            <p className="text-sm max-w-sm opacity-60 italic leading-relaxed mb-6">
              "Tranquility Base for the AI Era. A luxury of truth in a sea of hallucination."
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full border border-dark-teal/20 text-dark-teal hover:text-gold-leaf hover:border-gold-leaf transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="p-2 rounded-full border border-dark-teal/20 text-dark-teal hover:text-gold-leaf hover:border-gold-leaf transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className="p-2 rounded-full border border-dark-teal/20 text-dark-teal hover:text-gold-leaf hover:border-gold-leaf transition-colors" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
            </div>
          </div>
          <div className="font-mono text-[10px] uppercase space-y-3">
            <p className="text-gold-leaf">Protocol Status: Beta</p>
            <p>Location: Lunar-1 / Houston, TX</p>
            <p>© 2026 Tenured AI Systems</p>
          </div>
          <div className="font-mono text-[10px] uppercase space-y-3">
            <Link to="/privacy" className="block hover:text-gold-leaf transition-colors">Privacy Sovereignty</Link>
            <Link to="/terms" className="block hover:text-gold-leaf transition-colors">Terms of Service</Link>
            <a href="#" className="block hover:text-gold-leaf transition-colors">Investor Relations</a>
          </div>
        </div>
      </footer>

      {/* Service Bell & Terminal */}
      <button 
        onClick={() => setIsTerminalOpen(!isTerminalOpen)}
        className="fixed bottom-8 right-8 bg-gold-leaf w-[60px] h-[60px] rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:scale-110 hover:bg-[#d4ae6a] active:scale-95 transition-all z-[100]"
        aria-label="Toggle Concierge Terminal"
      >
        <Bell className="w-6 h-6 text-black" />
      </button>

      <AnimatePresence>
        {isTerminalOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 w-[350px] h-[450px] bg-nero-marquina border border-gold-leaf rounded-lg flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-[100] overflow-hidden"
          >
            <div className="bg-[#1a1a1a] p-3 border-b border-[#333] flex justify-between items-center">
              <span className="font-mono text-[10px] text-gray-500 uppercase">Concierge Terminal v1.0</span>
              <div className="flex gap-3 items-center">
                <button 
                  onClick={() => {
                    setIsTTSActive(!isTTSActive);
                  }} 
                  className={`transition-colors ${isTTSActive ? 'text-gold-leaf' : 'text-gray-500 hover:text-white'}`}
                  aria-label="Toggle Text-to-Speech"
                >
                  {isTTSActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsTerminalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 p-4 font-mono text-[0.85rem] text-amber-glow overflow-y-auto flex flex-col">
              {terminalHistory.map((line, idx) => (
                <div key={idx} className={`mb-1 whitespace-pre-wrap ${line.type === 'user' ? 'opacity-100' : 'opacity-70'} ${line.type === 'adversary' ? 'text-red-500 font-bold' : ''}`}>
                  {line.type === 'user' && <span>&gt; </span>}
                  {line.type === 'adversary' && <span className="mr-2 uppercase">[ADVERSARY]:</span>}
                  {line.text}
                </div>
              ))}
              <div className="flex mt-2">
                <span className="mr-2">&gt;</span>
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleCommand}
                  className="bg-transparent border-none outline-none text-amber-glow w-full" 
                  autoFocus 
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
