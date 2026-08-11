import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  TrendingUp, 
  Wallet, 
  CheckCircle2, 
  Activity, 
  HelpCircle,
  FileText, 
  Layers,
  Percent,
  Search,
  Database,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DividendDashboard() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [countdown, setCountdown] = useState({ hours: 4, minutes: 12, seconds: 55 });
  const [filterType, setFilterType] = useState<'all' | 'dividend' | 'access'>('all');

  // Live ticking countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let s = prev.seconds - 1;
        let m = prev.minutes;
        let h = prev.hours;

        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) {
          // Reset countdown to test loop
          h = 4;
          m = 12;
          s = 55;
        }
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (val: number) => val.toString().padStart(2, '0');

  const inflowEvents = [
    { id: 'TX-8821', type: 'dividend', gate: 'SI-11 · SCADA Logic', amt: 980.00, gross: 2450.00, user: 'USER_D1D1…D1D1', time: '2026-03-21 14:02' },
    { id: 'TX-8822', type: 'dividend', gate: 'SI-12 · Subsea Orchestration', amt: 1920.00, gross: 4800.00, user: 'USER_A4F2…E921', time: '2026-03-21 13:45' },
    { id: 'TX-8823', type: 'dividend', gate: 'IN-31 · Risk Synthesis', amt: 600.00, gross: 1500.00, user: 'USER_K912…L002', time: '2026-03-21 12:12' },
    { id: 'AC-2211', type: 'access', gate: 'Access Fee · Spring term', amt: 168200.00, gross: 420500.00, user: '4,205 sovereigns × $40', time: '2026-01-18 09:00' },
  ];

  const filteredInflow = filterType === 'all' 
    ? inflowEvents 
    : inflowEvents.filter(e => e.type === filterType);

  return (
    <div className="pt-24 pb-20 bg-background text-on-surface overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-20">
        
        {/* Navigation back and header kicker */}
        <div className="flex justify-between items-center border-b border-outline-variant/10 pb-6">
          <Link 
            to="/universities" 
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Institutional Portal
          </Link>
          <span className="font-mono text-[9px] tracking-widest uppercase text-outline">
            F-100 SPECIFICATION · STAGE 04 MOU
          </span>
        </div>

        {/* Headline section */}
        <header className="space-y-6 max-w-4xl">
          <span className="font-mono text-xs text-primary uppercase tracking-[0.2em] font-bold block">§1 · THE SPECIFICATION</span>
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
            The dividend dashboard is a <span className="italic text-primary">ledger, not a report.</span>
          </h1>
          <p className="text-on-surface-variant font-light text-base md:text-lg leading-relaxed">
            What your dashboard displays is not a quarterly estimate or a modeled forecast. It is the real-time record of atomic settlement events executing on the Tenured Grid — verified on-chain, attributed by department, and paid automatically to your treasury.
          </p>
        </header>

        {/* ─────────── MOCKUP CONTAINER ─────────── */}
        <section className="space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <span className="font-mono text-[10px] text-outline uppercase tracking-wider block">§2 · INTERACTIVE SURFACE</span>
              <h2 className="font-headline text-2xl font-bold">UH Administration Console</h2>
            </div>
            <span className="font-mono text-[10px] text-primary bg-primary/5 border border-primary/10 px-3 py-1 rounded-full uppercase tracking-wider hidden sm:inline">
              Reference Tenant · Seeded Figures
            </span>
          </div>

          <div className="bg-surface-container-low border border-outline-variant/15 rounded-[2.5rem] shadow-2xl overflow-hidden">
            {/* Nav Header */}
            <div className="bg-surface-container-lowest px-8 py-6 flex flex-wrap justify-between items-center gap-4 border-b border-outline-variant/10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white font-headline font-bold text-xl flex items-center justify-center">
                  T
                </div>
                <div>
                  <span className="font-mono text-[9px] text-outline tracking-widest uppercase block">Institutional Ledger / F-100</span>
                  <h3 className="font-headline text-sm font-bold text-on-surface">University of Houston · Administration</h3>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono text-[10px]">
                <div className="hidden md:block">
                  <span className="text-outline uppercase block text-[8px]">Ledger Integrity</span>
                  <span className="text-green-500 font-bold">98.0% SECURED</span>
                </div>
                <div>
                  <span className="text-outline uppercase block text-[8px]">Settlement Wallet</span>
                  <span className="text-on-surface-variant font-bold">0xUH…F2E</span>
                </div>
                <button className="bg-surface-container hover:bg-surface-container-high px-4 py-2 rounded-lg font-bold text-[9px] uppercase tracking-wider transition-all flex items-center gap-1.5 border border-outline-variant/10">
                  <Wallet className="w-3.5 h-3.5 text-primary" /> Wallet Admin
                </button>
              </div>
            </div>

            {/* Dashboard grid body */}
            <div className="p-8 space-y-8">
              {/* Hero Stats Section */}
              <div className="grid lg:grid-cols-12 gap-6 items-stretch">
                {/* Total box */}
                <div className="lg:col-span-8 bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-[10px] text-outline uppercase tracking-wider block">Total cumulative settlement · all instruments</span>
                      <h4 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-on-surface mt-2">$4,586,400.00</h4>
                    </div>
                    <span className="bg-[#2C4771]/10 text-[#2C4771] text-[10px] font-mono font-bold px-3 py-1 rounded-full">+12.4% YoY</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 mt-4 border-t border-outline-variant/10">
                    <div>
                      <span className="text-[9px] font-mono text-outline uppercase block">Dividend Split</span>
                      <span className="text-sm font-mono font-bold text-primary">$4,250,000.00</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-outline uppercase block">Access Split</span>
                      <span className="text-sm font-mono font-bold text-tertiary">$336,400.00</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-outline uppercase block">Pending payout</span>
                      <span className="text-sm font-mono font-bold">$124,500.50</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-outline uppercase block">Active sovereigns</span>
                      <span className="text-sm font-mono font-bold">4,205</span>
                    </div>
                  </div>
                </div>

                {/* Countdown Box */}
                <div className="lg:col-span-4 bg-gradient-to-br from-primary to-primary-container text-white p-8 rounded-3xl shadow-lg flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] tracking-widest uppercase opacity-90">Next settlement block</span>
                    <Activity className="w-4 h-4 text-white/80 animate-pulse" />
                  </div>

                  <div className="space-y-1 my-6">
                    <div className="text-4xl font-headline font-bold font-mono tracking-tight">
                      {formatTime(countdown.hours)}:{formatTime(countdown.minutes)}:{formatTime(countdown.seconds)}
                    </div>
                    <div className="text-[10px] font-mono opacity-90 tracking-wider">Estimated · $22,450.00</div>
                  </div>

                  <div className="text-[9px] font-mono opacity-70 leading-normal">
                    Dividend $18,210 · Access $4,240
                  </div>
                </div>
              </div>

              {/* Two columns: departments & inflow */}
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Departments */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex justify-between items-baseline border-b border-outline-variant/10 pb-3">
                    <h4 className="font-mono text-[10px] text-outline uppercase tracking-wider font-bold">Alumni Performance Ledger</h4>
                    <span className="text-[9px] font-mono text-outline">Yield attribution by college</span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: "Cullen College of Engineering", val: "$1,850,000", w: "w-full", color: "bg-primary", stats: "Avg AICI 94 · Activations 755", tier: "Tier 1 Efficiency" },
                      { name: "Bauer College of Business", val: "$1,200,000", w: "w-[65%]", color: "bg-tertiary", stats: "Avg AICI 89 · Activations 490", tier: "Tier 1 Efficiency" },
                      { name: "College of Natural Sciences", val: "$950,000", w: "w-[51%]", color: "bg-tertiary-soft", stats: "Avg AICI 91 · Activations 388", tier: "Tier 2 Efficiency" },
                      { name: "Technology Division", val: "$250,000", w: "w-[13%]", color: "bg-outline-variant", stats: "Avg AICI 82 · Activations 102", tier: "Tier 3 · Watch", watch: true },
                    ].map((dept, i) => (
                      <div key={i} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm space-y-4 hover:border-primary/20 transition-all">
                        <div className="flex justify-between items-baseline">
                          <h5 className="font-headline font-bold text-sm text-on-surface">{dept.name}</h5>
                          <span className="font-mono text-sm font-bold text-primary">{dept.val}</span>
                        </div>
                        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                          <div className={`h-full ${dept.color} ${dept.w}`}></div>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono text-on-surface-variant">
                          <span>{dept.stats}</span>
                          <span className={dept.watch ? 'text-outline' : 'text-primary font-bold'}>{dept.tier}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inflow Stream */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex justify-between items-baseline border-b border-outline-variant/10 pb-3">
                    <h4 className="font-mono text-[10px] text-outline uppercase tracking-wider font-bold">◷ Inflow Stream</h4>
                    {/* Filter tabs */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setFilterType('all')} 
                        className={`text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded ${filterType === 'all' ? 'bg-primary text-on-primary font-bold' : 'text-outline hover:text-on-surface'}`}
                      >
                        All
                      </button>
                      <button 
                        onClick={() => setFilterType('dividend')} 
                        className={`text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded ${filterType === 'dividend' ? 'bg-primary text-on-primary font-bold' : 'text-outline hover:text-on-surface'}`}
                      >
                        Dividend
                      </button>
                      <button 
                        onClick={() => setFilterType('access')} 
                        className={`text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded ${filterType === 'access' ? 'bg-primary text-on-primary font-bold' : 'text-outline hover:text-on-surface'}`}
                      >
                        Access
                      </button>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden divide-y divide-outline-variant/5">
                    {filteredInflow.map((ev, i) => (
                      <div key={i} className="p-5 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-mono text-[10px] font-bold text-primary-container block">{ev.id}</span>
                            <h5 className="font-headline font-bold text-xs text-on-surface mt-1">{ev.gate}</h5>
                          </div>
                          <div className="text-right">
                            <span className={`font-mono text-sm font-bold block ${ev.type === 'access' ? 'text-tertiary' : 'text-primary'}`}>
                              +${ev.amt.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </span>
                            <span className="font-mono text-[9px] text-outline uppercase block">40% of ${ev.gross.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center font-mono text-[9px] text-outline">
                          <span>{ev.user}</span>
                          <span>{ev.time}</span>
                        </div>
                      </div>
                    ))}
                    <button className="w-full py-4 bg-surface-container-high/40 hover:bg-surface-container-high text-center font-mono text-[10px] tracking-widest uppercase text-on-surface-variant font-bold border-t border-outline-variant/10 transition-colors">
                      Load Forensic History →
                    </button>
                  </div>

                  {/* Actionable Intelligence Box */}
                  <div className="bg-tertiary-container text-on-tertiary-container p-6 rounded-2xl space-y-3 border border-outline-variant/10">
                    <span className="font-mono text-[9px] text-tertiary font-bold uppercase tracking-wider block">◆ Actionable Intelligence</span>
                    <p className="text-xs font-light italic leading-relaxed">
                      Energy-sector demand at Node SI-11 is at the 94th percentile and rising. Recommend prioritizing SCADA Logic modules in Cullen and Technology Division to raise throughput and institutional yield.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Ticker Tape */}
            <div className="bg-neutral-950 text-white py-4 flex items-center overflow-hidden relative">
              <div className="px-6 bg-neutral-950 text-[10px] font-mono uppercase tracking-widest font-bold border-r border-white/10 shrink-0 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBF00] animate-pulse"></span> Global Settlement Pulse
              </div>
              <div className="flex gap-12 whitespace-nowrap font-mono text-[10px] uppercase text-white/50 animate-[scroll_40s_linear_infinite]">
                <span>UNIVERSITY OF HOUSTON · TOTAL YIELD <em className="text-[#FFBF00] font-bold font-style-normal">$4.59M</em></span>
                <span>TX CORRIDOR RESERVE · LIQUIDITY <em className="text-[#FFBF00] font-bold font-style-normal">NOMINAL</em></span>
                <span>RECENT SETTLEMENT <em className="text-[#FFBF00] font-bold font-style-normal">$1,920.00</em> · SI-12 ORCHESTRATION</span>
                <span>ACCESS SPLIT · SPRING TERM <em className="text-[#FFBF00] font-bold font-style-normal">SETTLED</em></span>
                <span>DEAN ACCESS GRANTED · <em className="text-[#FFBF00] font-bold font-style-normal">0x88…F2E</em></span>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── §3 · MODULE ANATOMY ─────────── */}
        <section className="space-y-8">
          <div className="border-b border-outline-variant/10 pb-4">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">§3 · SPECIFICATION DECK</span>
            <h2 className="font-headline text-2xl font-bold">Ledger Module Anatomy</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: 1, title: "Cumulative settlement · the editorial anchor", desc: "States total settlement across both instruments — the Access Split and the Dividend Split — broken out independently to prevent blend confusion. Reconcilable to public Merkle roots.", src: "Source: on-chain settlement events" },
              { num: 2, title: "Next settlement block · the sovereign gradient", desc: "A live countdown ticker to the next contract verification run. Estimates splits by instrument so financial officers can verify liquidity inflow timing.", src: "Source: transaction pool scheduler" },
              { num: 3, title: "Alumni Performance Ledger · attribution", desc: "Yield attributed directly to the college or department that trained the graduate. Features average AICI and activation counts to track curricular ROI.", src: "Source: ontology node maps" },
              { num: 4, title: "Inflow Stream · the forensic register", desc: "Chronological transaction logging. Access fee splits are registered as single term-level rows; dividend payouts settle continuously on individual alumna reveals.", src: "Source: settlement log verified on mainnet" },
              { num: 5, title: "Actionable Intelligence · demand signals", desc: "Aggregate corridor-wide capability demand. Allows deans and steering committees to align course sections with high-yield skills.", src: "Source: aggregated anonymous telemetry" },
              { num: 6, title: "Global Settlement Pulse · tape", desc: "A persistent corridor tape displaying market liquidity status and recent transactions, situating the campus inside a macro talent ledger.", src: "Source: corridor event bus subscription" },
            ].map((mod, i) => (
              <div key={i} className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 space-y-4 hover:shadow-md transition-shadow">
                <div className="flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-container text-white font-mono text-sm font-bold flex items-center justify-center shrink-0">
                    {mod.num}
                  </span>
                  <div className="space-y-2">
                    <h4 className="font-headline font-bold text-sm text-on-surface">{mod.title}</h4>
                    <p className="text-xs text-on-surface-variant font-light leading-relaxed">{mod.desc}</p>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-tertiary block font-bold pt-2">{mod.src}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────── §4 · DUAL LEDGER REQUIREMENTS ─────────── */}
        <section className="space-y-8">
          <div className="border-b border-outline-variant/10 pb-4">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">§4 · LEDGER MECHANICS</span>
            <h2 className="font-headline text-2xl font-bold">The Dual-Ledger Requirement</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-3xl space-y-6">
              <span className="font-mono text-[10px] text-tertiary uppercase tracking-widest font-bold">LEDGER A · THE ACCESS SPLIT</span>
              <h3 className="font-headline text-xl font-bold">Per enrolled student · per semester</h3>
              <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                The Sovereign Access Fee is divided at the smart-contract layer at the moment of billing. Settle events occur termly based on cohort headcount registration.
              </p>
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/5 space-y-2 font-mono text-[10px]">
                <div className="flex justify-between"><span>University Share (40%):</span> <span className="font-bold text-primary">$40.00</span></div>
                <div className="flex justify-between"><span>Platform Share (40%):</span> <span className="font-bold">$40.00</span></div>
                <div className="flex justify-between"><span>State Share (20%):</span> <span className="font-bold text-tertiary">$20.00</span></div>
              </div>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-3xl space-y-6">
              <span className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold">LEDGER B · THE DIVIDEND SPLIT</span>
              <h3 className="font-headline text-xl font-bold">Per alumna transaction · in perpetuity</h3>
              <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                Divided continuously on recruiter reveals and Performance Bond premiums. Attaches directly to the alumna, accruing value years after graduation.
              </p>
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/5 space-y-2 font-mono text-[10px]">
                <div className="flex justify-between"><span>University Share (40%):</span> <span className="font-bold text-primary">Real-time split</span></div>
                <div className="flex justify-between"><span>Platform Share (40%):</span> <span className="font-bold">Real-time split</span></div>
                <div className="flex justify-between"><span>State Share (20%):</span> <span className="font-bold text-tertiary">Real-time split</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── §5 · DATA MODEL & VERIFICATION PATH ─────────── */}
        <section className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">§5 · COMPLIANCE AUDITING</span>
            <h2 className="font-headline text-3xl font-bold tracking-tight">Audit compliance and verification trails</h2>
            <p className="text-on-surface-variant font-light leading-relaxed text-sm">
              The data model is GASB-aligned and designed for instant reconciliation. External auditors verify payments directly against the public chain ledger without requiring internal university databases or compromising candidate privacy.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-light text-on-surface-variant pt-2">
              <div className="space-y-1">
                <strong className="text-on-surface font-bold">Audit Autonomy:</strong>
                <p className="text-xs">No coordination required. Auditors match bursar receipts to Polygon transaction logs independently.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-on-surface font-bold">Privacy Floor:</strong>
                <p className="text-xs">Student identities, personal IDs, grades, GPA, and recruiter corporate keys are absent from the schema entirely.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-neutral-950 p-6 rounded-2xl border border-white/5 space-y-4 font-mono text-[10px] text-white/80">
            <div className="text-center border-b border-white/10 pb-2">
              <span className="text-white/40 uppercase tracking-widest text-[8px]">Event Schema: F-100 Rev 2.0</span>
            </div>
            <div className="space-y-1">
              <div>event_id: <span className="text-primary-container">TX-8821 / AC-2211</span></div>
              <div>gross_value: <span className="text-green-400">transaction total USD</span></div>
              <div>institution_bp: <span className="text-green-400">4000 (40% share)</span></div>
              <div>block_anchor: <span className="text-white/60">Polygon transaction hash</span></div>
              <div className="text-red-400 pt-2 border-t border-white/5 mt-2">✕ Student Names & IDs (ABSENT)</div>
              <div className="text-red-400">✕ Student GPA & Transcripts (ABSENT)</div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
