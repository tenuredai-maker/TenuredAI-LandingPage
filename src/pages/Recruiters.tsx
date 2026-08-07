import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
interface BidRow {
  id: string;
  time: string;
  firm: string;
  amount: number;
  tag: 'Snipe' | 'Protected' | 'Standard' | 'Opening';
  isSnipe?: boolean;
  isProtected?: boolean;
}

interface UpcomingLot {
  role: string;
  meta: string;
  startsIn: string;
}

interface ArchivedBattle {
  id: string;
  role: string;
  corridor: string;
  score: string;
  settled: number;
  winner: string;
  duration: string;
}

interface RecruiterRank {
  rank: string;
  id: string;
  firm: string;
  winRate: string;
  gmv: string;
  isTop?: boolean;
}

// ─── Static data (sourced from TenuredAI_Battle_Live.html) ─────────────────
const INITIAL_BID_TAPE: BidRow[] = [
  { id: '1', time: '14s', firm: 'R-0027 · Tate & Howell', amount: 348000, tag: 'Snipe', isSnipe: true },
  { id: '2', time: '38s', firm: 'R-0019 · Bennett Search', amount: 326000, tag: 'Standard' },
  { id: '3', time: '1m 12s', firm: 'R-0011 · Aerie Talent', amount: 312000, tag: 'Protected', isProtected: true },
  { id: '4', time: '1m 47s', firm: 'R-0034 · Greybrook', amount: 298000, tag: 'Standard' },
  { id: '5', time: '2m 18s', firm: 'R-0027 · Tate & Howell', amount: 284000, tag: 'Standard' },
  { id: '6', time: '3m 02s', firm: 'R-0019 · Bennett Search', amount: 272000, tag: 'Standard' },
  { id: '7', time: '3m 41s', firm: 'R-0008 · Houghton', amount: 258000, tag: 'Standard' },
  { id: '8', time: '4m 28s', firm: 'R-0011 · Aerie Talent', amount: 245000, tag: 'Opening' },
];

const UPCOMING: UpcomingLot[] = [
  { role: 'Sr ML Infrastructure Engineer', meta: 'Houston-Energy · AICI 87 · OSD 0.81', startsIn: 'in 2h 14m' },
  { role: 'AI Risk & Compliance Lead', meta: 'NYC-Finance · AICI 92 · OL Clean', startsIn: 'in 5h 47m' },
  { role: 'Head of Diagnostic AI Validation', meta: 'Boston-Healthcare · AICI 89 · AIBS 91', startsIn: 'in 11h 30m' },
  { role: 'VP Enterprise Agent Architect', meta: 'NYC-Finance · AICI 90 · AIOI 94', startsIn: 'in 18h 15m' },
  { role: 'Forecast Quant · Senior IC', meta: 'Houston-Energy · AICI 86 · OSD 0.77', startsIn: 'tomorrow' },
];

const LEADERBOARD: RecruiterRank[] = [
  { rank: '01', id: 'R-0027', firm: 'Tate & Howell', winRate: '88%', gmv: '$2.84M GMV', isTop: true },
  { rank: '02', id: 'R-0019', firm: 'Bennett Search', winRate: '81%', gmv: '$2.21M GMV' },
  { rank: '03', id: 'R-0011', firm: 'Aerie Talent', winRate: '79%', gmv: '$1.96M GMV' },
  { rank: '04', id: 'R-0034', firm: 'Greybrook', winRate: '74%', gmv: '$1.74M GMV' },
  { rank: '05', id: 'R-0042', firm: 'Northbridge', winRate: '71%', gmv: '$1.56M GMV' },
  { rank: '06', id: 'R-0008', firm: 'Houghton', winRate: '68%', gmv: '$1.42M GMV' },
];

const ARCHIVE: ArchivedBattle[] = [
  { id: 'B300-0093', role: 'Sr Forecast Engineer', corridor: 'NYC-Finance', score: 'AICI 90', settled: 324000, winner: 'R-0027', duration: '17m 22s' },
  { id: 'B300-0092', role: 'AI Compliance Lead', corridor: 'NYC-Finance', score: 'AICI 88', settled: 288000, winner: 'R-0019', duration: '24m 47s' },
  { id: 'B300-0091', role: 'ML Ops Senior', corridor: 'Houston-Energy', score: 'AICI 87', settled: 236000, winner: 'R-0011', duration: '9m 12s' },
  { id: 'B300-0090', role: 'Diagnostic AI Validator', corridor: 'Boston-Healthcare', score: 'AICI 91', settled: 372000, winner: 'R-0027', duration: '31m 04s' },
  { id: 'B300-0089', role: 'VP Agent Architect', corridor: 'NYC-Finance', score: 'AICI 93', settled: 418000, winner: 'R-0034', duration: '22m 51s' },
  { id: 'B300-0088', role: 'Risk Quant Senior', corridor: 'NYC-Finance', score: 'AICI 89', settled: 306000, winner: 'R-0019', duration: '14m 38s' },
  { id: 'B300-0087', role: 'Grid Stability ML Lead', corridor: 'Houston-Energy', score: 'AICI 86', settled: 252000, winner: 'R-0008', duration: '19m 02s' },
  { id: 'B300-0086', role: 'Sr Refinery Optimization', corridor: 'Houston-Energy', score: 'AICI 88', settled: 268000, winner: 'R-0042', duration: '26m 11s' },
];

const AUCTION_RULES = [
  {
    num: '01',
    title: 'Lot opens',
    body: 'Verified recruiter seats receive notification 2 hours before lot open. Lot reveals the candidate\'s Triple-85 status, corridor, AICI/AIOI/AIBS scores, OL-flag status, and Genesis Institution — but not identity. Reveal credits cost 2 to enter.',
  },
  {
    num: '02',
    title: 'Bids escrow',
    body: 'Each bid is escrowed in the B-300 smart contract until settlement. Bids increment in $4K minimums against the current high bid. Bid history is public; recruiter identity displayed as anonymized R-XXXX during the battle.',
  },
  {
    num: '03',
    title: 'Anti-snipe protection',
    body: 'Any terminal-window bid (within 120s of close) triggers a 120-second auction extension. This prevents sub-second sniping while preserving the snipe-as-strategy mechanic — sniping is allowed; sniping the auction close is not.',
  },
  {
    num: '04',
    title: 'Settlement',
    body: 'Winning recruiter\'s escrow releases against the candidate\'s reveal. 40/40/20 split executes on-chain. Performance Bond optionally issues at hiring enterprise election. Battle archived to the Replay surface for forensic review.',
  },
];

const I100_PHASES = [
  {
    phase: 'PHASE 1',
    title: 'Match Count',
    desc: 'Recruiter runs a Boolean query. Result: "42 matches at Tier 4+ in Houston-Energy corridor." Zero identifying information. Free.',
    style: 'soft',
  },
  {
    phase: 'PHASE 2',
    title: 'De-Identified Profiles',
    desc: '"Candidate c0001 · Tier 5 · 7 Lab Verifications · AIBS 87." Tiers, scores, attribution sources visible. No name, no contact, no employer. Included with base subscription.',
    style: 'soft',
  },
  {
    phase: 'PHASE 3',
    title: 'Opt-In Reveal',
    desc: 'Recruiter spends a Reveal Credit + submits a structured Hire Brief. Candidate reviews recruiter, role, comp. Only if they accept is identity disclosed. The credit is consumed regardless.',
    style: 'gild',
  },
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function Recruiters() {
  // Live auction state
  const [currentBid, setCurrentBid] = useState(348000);
  const [bidDelta, setBidDelta] = useState(22000);
  const [bidTape, setBidTape] = useState<BidRow[]>(INITIAL_BID_TAPE);
  const [countdown, setCountdown] = useState(14 * 60 + 32); // 14m 32s in seconds
  const [ms, setMs] = useState(412);
  const [seatsClaimed, setSeatsClaimed] = useState(64);
  const [userBidPlaced, setUserBidPlaced] = useState(false);
  const [activeTab, setActiveTab] = useState<'battle' | 'i100'>('battle');
  const [revealCredits, setRevealCredits] = useState(128);
  const [activePipeline, setActivePipeline] = useState(11);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedCorridor, setSelectedCorridor] = useState('all');
  const [showRecentSearches] = useState([
    'RAG+AIBS≥85 · Houston · 42 matches',
    'Compliance auditor · NYC · 18 matches',
    'Tier-5 + Triple-85 · all corridors · 6 matches',
  ]);
  const [showRules, setShowRules] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Live countdown ticker
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown(t => {
        if (t <= 0) return 14 * 60 + 32;
        return t - 1;
      });
      setMs(Math.floor(Math.random() * 900 + 100));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatClock = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return { m: String(m).padStart(2, '0'), s: String(s).padStart(2, '0') };
  };

  const clock = formatClock(countdown);

  const handlePlaceBid = () => {
    const newBid = currentBid + 4000;
    const delta = newBid - currentBid;
    setCurrentBid(newBid);
    setBidDelta(delta);
    setUserBidPlaced(true);
    const newRow: BidRow = {
      id: Date.now().toString(),
      time: 'just now',
      firm: 'R-YOUR-FIRM · You',
      amount: newBid,
      tag: countdown < 120 ? 'Snipe' : 'Standard',
      isSnipe: countdown < 120,
    };
    setBidTape(prev => [newRow, ...prev.slice(0, 7)]);
    // Anti-snipe: if within 120s, extend
    if (countdown < 120) {
      setCountdown(prev => prev + 120);
    }
  };

  const tagColor = (tag: BidRow['tag'], isSnipe?: boolean, isProtected?: boolean) => {
    if (isSnipe) return 'text-red-500 bg-red-500/10';
    if (isProtected) return 'text-amber-500 bg-amber-500/10';
    return 'text-emerald-500 bg-emerald-500/10';
  };

  return (
    <div className="pt-20 min-h-screen bg-background text-on-surface">

      {/* ── LIVE CORRIDOR PULSE STRIP ─────────────────────────────────── */}
      <div className="bg-inverse-surface text-inverse-on-surface sticky top-16 z-30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 flex items-center gap-6 overflow-x-auto font-mono text-[10px] md:text-xs whitespace-nowrap">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_2px_rgba(251,191,36,.4)]" />
            <span className="text-amber-400 font-bold tracking-widest">CORRIDOR PULSE · LIVE</span>
          </div>
          <span>HOU-Energy: <span className="font-bold text-white">$248K</span> <span className="text-emerald-400">▲ 4.2%</span> · strike 85 · vol 1.2×</span>
          <span>NYC-Finance: <span className="font-bold text-white">$312K</span> <span className="text-emerald-400">▲ 6.8%</span> · strike 88 · vol 1.4×</span>
          <span>SF-Compute: <span className="font-bold text-white">$284K</span> <span className="text-red-400">▼ 1.1%</span> · strike 87 · vol 1.3×</span>
          <span>BOS-Health: <span className="font-bold text-white">$196K</span> <span className="text-emerald-400">▲ 2.5%</span> · strike 86 · vol 1.1×</span>
        </div>
      </div>

      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">B-300 · Auction Protocol</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.04] mb-0">
              The <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">Recruiter Battle.</span> <em className="italic text-on-surface-variant font-light">Live.</em>
            </h1>
          </div>
          <div className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase text-right leading-relaxed shrink-0">
            <strong className="text-on-surface block text-sm tracking-normal font-bold">B-300 · Auction Protocol</strong>
            Snipe-protected escrowed talent auction<br />
            I-100 Recruiter Signal Service
          </div>
        </div>
      </section>

      {/* ── SECTION TABS ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <div className="flex gap-1 p-1 bg-surface-container-low border border-outline-variant/20 rounded-full w-fit">
          <button
            onClick={() => setActiveTab('battle')}
            className={cn(
              'px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer',
              activeTab === 'battle'
                ? 'bg-inverse-surface text-inverse-on-surface shadow'
                : 'text-on-surface-variant hover:text-on-surface'
            )}
          >
            B-300 Live Battle
          </button>
          <button
            onClick={() => setActiveTab('i100')}
            className={cn(
              'px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer',
              activeTab === 'i100'
                ? 'bg-primary text-on-primary shadow'
                : 'text-on-surface-variant hover:text-on-surface'
            )}
          >
            I-100 Command Center
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">

        {/* ══════════════════════════════════════════════════════════════════
            TAB 1: B-300 LIVE BATTLE
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'battle' && (
          <motion.div
            key="battle"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {/* ── BROADCAST STAGE ─────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
              <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5">

                {/* LEFT: Live Auction Card */}
                <div className="bg-inverse-surface text-inverse-on-surface rounded-2xl overflow-hidden shadow-2xl">
                  {/* Auction head */}
                  <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center flex-wrap gap-3">
                    <span className="font-mono text-[11px] tracking-widest text-primary-container font-bold">B-300 · 00094 · NYC-Finance</span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase bg-red-600 text-white px-3 py-1.5 rounded-full font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />Auction live
                    </span>
                  </div>

                  {/* Auction body */}
                  <div className="p-7">
                    <p className="font-mono text-[10.5px] tracking-widest uppercase text-primary-container font-bold mb-2.5">
                      Lot 094 · Senior Quantitative Forecasting Engineer
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl font-normal leading-tight mb-4">
                      Triple-89 verified · <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent italic">NYC-Finance</span> · 14yr senior · OL-clean
                    </h2>
                    <div className="flex flex-wrap gap-4 font-mono text-[11px] tracking-wide text-inverse-on-surface/70 mb-6">
                      <span>AICI <strong className="text-primary-container">91</strong></span>
                      <span>AIOI <strong className="text-primary-container">88</strong></span>
                      <span>AIBS <strong className="text-primary-container">89</strong></span>
                      <span>OSD <strong className="text-primary-container">0.74</strong></span>
                      <span>Genesis · <strong className="text-primary-container">Columbia</strong></span>
                    </div>

                    {/* Scoreboard */}
                    <div className="grid grid-cols-[1.4fr_1fr] gap-4 p-6 bg-white/4 rounded-xl mb-6">
                      {/* Current bid */}
                      <div>
                        <p className="font-mono text-[10px] tracking-widest uppercase text-primary-container font-bold mb-2.5">Current bid · placement value</p>
                        <div className="flex items-baseline gap-2 font-display text-4xl md:text-5xl font-medium text-white leading-none">
                          ${(currentBid / 1000).toFixed(0)}K
                          <span className="font-mono text-sm text-emerald-400 font-bold">▲ +${(bidDelta / 1000).toFixed(0)}K</span>
                        </div>
                        <p className="font-mono text-[11px] text-inverse-on-surface/65 mt-2.5">
                          by <span className="text-primary-container font-bold">{userBidPlaced ? 'R-YOUR-FIRM · You' : 'R-0027 · Tate & Howell'}</span> · {userBidPlaced ? 'just now' : '11s ago'}
                        </p>
                      </div>

                      {/* Countdown */}
                      <div>
                        <p className="font-mono text-[10px] tracking-widest uppercase text-amber-400 font-bold mb-2.5 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_rgba(251,191,36,.5)]" />
                          Snipe window closes
                        </p>
                        <div className="font-mono font-bold text-3xl md:text-4xl text-white flex items-baseline gap-1">
                          <span>00</span><span className="text-amber-400">:</span>
                          <span>{clock.m}</span><span className="text-amber-400">:</span>
                          <span>{clock.s}</span>
                          <span className="text-inverse-on-surface/50 text-base">.{ms}</span>
                        </div>
                        <p className="font-mono text-[10.5px] text-inverse-on-surface/65 mt-2">
                          Anti-snipe extension · +120s per terminal bid
                        </p>
                      </div>
                    </div>

                    {/* Bid tape */}
                    <div className="flex justify-between items-center font-mono text-[10px] tracking-widest uppercase mb-3">
                      <span className="text-primary-container font-bold">Bid tape · last 8 events</span>
                      <span className="text-inverse-on-surface/50">B-300</span>
                    </div>
                    <div className="space-y-1.5">
                      {bidTape.map((row) => (
                        <div
                          key={row.id}
                          className={cn(
                            'grid grid-cols-[auto_1fr_auto_auto] gap-3 items-center px-3.5 py-2.5 rounded-lg font-mono text-xs transition-colors',
                            row.isSnipe ? 'bg-red-500/10' : 'bg-white/4'
                          )}
                        >
                          <span className="text-inverse-on-surface/50 text-[10px]">{row.time}</span>
                          <span className={cn('font-bold text-[11px]', row.firm.includes('You') ? 'text-amber-300' : 'text-primary-container')}>
                            {row.firm}
                          </span>
                          <span className="text-white font-bold font-mono tabular-nums">${row.amount.toLocaleString()}</span>
                          <span className={cn('text-[9.5px] tracking-widest uppercase font-bold px-2 py-1 rounded-full', tagColor(row.tag, row.isSnipe, row.isProtected))}>
                            {row.tag}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Place Bid CTA */}
                    <button
                      onClick={handlePlaceBid}
                      className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold font-headline text-sm tracking-wide shadow-xl hover:opacity-95 active:scale-[.98] transition-all cursor-pointer"
                    >
                      {userBidPlaced ? `Raise bid to $${((currentBid + 4000) / 1000).toFixed(0)}K (+$4K)` : `Place opening bid · $${((currentBid + 4000) / 1000).toFixed(0)}K`}
                    </button>
                  </div>
                </div>

                {/* RIGHT: Sidebar */}
                <div className="space-y-5">
                  {/* L-100 Verified Recruiter League */}
                  <div className="bg-surface-container-lowest border border-outline-variant/15 rounded-2xl p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">§ L-100 · Verified Recruiter League</span>
                      <span className="font-mono text-[10px] text-on-surface-variant">Q2 2026</span>
                    </div>
                    <h3 className="font-display text-lg font-normal mb-4 leading-tight">
                      This quarter's <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent italic">top settlements.</span>
                    </h3>
                    <div className="space-y-1.5 font-mono text-xs">
                      {LEADERBOARD.map((r) => (
                        <div
                          key={r.rank}
                          className={cn(
                            'grid grid-cols-[20px_1fr_auto_auto] gap-3 items-center px-3.5 py-2.5 rounded-lg',
                            r.isTop
                              ? 'bg-gradient-to-r from-primary/10 to-primary/5 border-l-2 border-primary-container'
                              : 'bg-surface-container-low'
                          )}
                        >
                          <span className="text-primary font-bold">{r.rank}</span>
                          <span className="text-on-surface font-semibold truncate">{r.id} · {r.firm}</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">{r.winRate}</span>
                          <span className="text-on-surface-variant text-[11px]">{r.gmv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Lots */}
                  <div className="bg-surface-container-lowest border border-outline-variant/15 rounded-2xl p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">§ Upcoming · Next 24h</span>
                      <span className="font-mono text-[10px] text-on-surface-variant">5 scheduled</span>
                    </div>
                    <h3 className="font-display text-lg font-normal mb-4 leading-tight">
                      Next on the <em className="text-on-surface-variant italic">auction floor.</em>
                    </h3>
                    <div className="space-y-2">
                      {UPCOMING.map((lot, i) => (
                        <div key={i} className="flex justify-between gap-3 px-3.5 py-3 bg-surface-container-low rounded-xl">
                          <div>
                            <p className="font-headline font-semibold text-sm text-on-surface leading-tight">{lot.role}</p>
                            <p className="font-mono text-[10.5px] text-on-surface-variant mt-1">{lot.meta}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-mono text-[10.5px] font-bold text-primary">{lot.startsIn.startsWith('in') ? lot.startsIn.replace('in ', '') : lot.startsIn}</p>
                            <p className="font-mono text-[9px] text-on-surface-variant/60 mt-0.5">{lot.startsIn.startsWith('in') ? 'from now' : ''}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── STATS STRIP ─────────────────────────────────────────── */}
            <section className="border-y border-outline-variant/20 bg-surface-container-low py-10">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Battles · last 90 days', value: '94', delta: '▲ +37 vs prior period' },
                    { label: 'Avg placement value · senior tier', value: '$298K', delta: '▲ +12.4% vs market' },
                    { label: 'Median time-to-settle', value: '11d', delta: '▼ vs 47d ext search' },
                    { label: 'Active verified recruiter seats', value: '218', delta: '▲ I-100 cohort 64% claimed' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-surface-container-lowest rounded-2xl p-6 shadow-md">
                      <p className="font-mono text-[10px] tracking-widest uppercase text-on-surface-variant font-semibold mb-2">{stat.label}</p>
                      <p className="font-display text-3xl md:text-4xl font-medium bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent">{stat.value}</p>
                      <p className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-2">{stat.delta}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── RECENT BATTLE ARCHIVE ───────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
              <div className="flex justify-between items-end gap-6 flex-wrap mb-8">
                <h2 className="font-display text-3xl md:text-4xl font-normal leading-tight">
                  Recent settled battles. <em className="text-on-surface-variant italic">Replays</em> <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent italic font-medium">on-chain.</span>
                </h2>
                <button className="border border-outline-variant/30 px-5 py-2.5 rounded-full text-sm font-headline font-medium hover:bg-surface-container-low transition-colors cursor-pointer">
                  View full archive →
                </button>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-lg border border-outline-variant/10">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        {['Battle', 'Role · Corridor', 'Settled', 'Winner', 'Duration', ''].map(h => (
                          <th key={h} className="text-left font-mono text-[10px] tracking-widest uppercase text-on-surface-variant font-semibold px-5 py-3.5">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ARCHIVE.map((battle, i) => (
                        <tr key={battle.id} className={cn('border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors', i === ARCHIVE.length - 1 && 'border-b-0')}>
                          <td className="px-5 py-3.5 font-mono text-primary font-bold text-[11.5px] tracking-wide">{battle.id}</td>
                          <td className="px-5 py-3.5">
                            <span className="font-headline font-semibold text-on-surface">{battle.role}</span>
                            <span className="block font-mono text-[10.5px] text-on-surface-variant mt-0.5">{battle.corridor} · {battle.score}</span>
                          </td>
                          <td className="px-5 py-3.5 font-mono font-bold text-on-surface tabular-nums">${battle.settled.toLocaleString()}</td>
                          <td className="px-5 py-3.5 font-mono text-primary font-bold text-[11.5px]">{battle.winner}</td>
                          <td className="px-5 py-3.5 font-mono text-on-surface-variant text-[11.5px]">{battle.duration}</td>
                          <td className="px-5 py-3.5">
                            <button className="px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-primary hover:text-white font-mono text-[10px] tracking-widest uppercase font-bold transition-all cursor-pointer border border-outline-variant/20">
                              Replay →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ── AUCTION RULES ───────────────────────────────────────── */}
            <section className="bg-surface-container-low py-20">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl font-normal leading-tight mb-5">
                      How the <em className="text-on-surface-variant italic">B-300 Auction</em>{' '}
                      <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent italic font-medium">actually works.</span>
                    </h2>
                    <p className="text-on-surface-variant leading-relaxed mb-4">
                      The B-300 is a snipe-protected escrowed auction protocol. Only verified Tenured AI recruiter seats can enter. Every bid is escrowed in a smart contract until the battle settles. Anti-snipe windows extend the close by 120 seconds on any terminal bid.
                    </p>
                    <p className="text-on-surface-variant leading-relaxed mb-5">
                      Once settled, the placement is bonded by the Performance Bond product. The winning recruiter's escrow releases; the 40/40/20 split executes on-chain — candidate, institution, and state Treasury receive dividends automatically.
                    </p>
                    <span className="inline-block font-mono text-[10.5px] tracking-widest uppercase text-primary font-bold bg-primary/10 px-3 py-1.5 rounded-full">
                      B-300 · Recruiter Battle Auction
                    </span>
                  </div>
                  <div className="space-y-4">
                    {AUCTION_RULES.map((step) => (
                      <div key={step.num} className="grid grid-cols-[56px_1fr] gap-5 bg-surface-container-lowest p-6 rounded-2xl shadow-md">
                        <div className="font-display text-4xl font-light leading-none bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent">
                          {step.num}
                        </div>
                        <div>
                          <h4 className="font-headline font-bold text-[15px] mb-1.5">{step.title}</h4>
                          <p className="text-[13.5px] text-on-surface-variant leading-relaxed">{step.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── I-100 FOUNDER SEAT CTA ──────────────────────────────── */}
            <section className="bg-inverse-surface text-inverse-on-surface py-24 relative overflow-hidden">
              <div className="absolute top-[-30%] right-[-15%] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.18),transparent_65%)] pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
                <p className="font-mono text-[11px] tracking-[.22em] uppercase text-primary-container font-bold mb-6">
                  § I-100 Protocol · First 100 verified recruiters · 90-day starter
                </p>
                <h2 className="font-display text-3xl md:text-5xl font-light leading-[1.04] mb-6 max-w-[22ch]">
                  The first 100 verified recruiters get $24K-equivalent{' '}
                  <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent italic font-medium">credit at no charge.</span>{' '}
                  <em className="text-primary-container/85 italic">{seatsClaimed} seats claimed.</em>
                </h2>
                <p className="text-inverse-on-surface/85 max-w-[54ch] text-base leading-relaxed mb-8">
                  The I-100 Protocol is the platform's launch cohort for the verified recruiter network. The first 100 seats receive a $24K credit pack covering reveal credits and B-300 entries for the first 90 days at no charge — designed to seed network liquidity before the platform reaches steady-state.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:hello@tenured.ai?subject=I-100%20Recruiter%20Seat"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-headline font-semibold shadow-xl hover:opacity-95 transition-all text-sm"
                  >
                    Claim a seat · I-100 →
                  </a>
                  <button
                    onClick={() => setActiveTab('i100')}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-inverse-on-surface hover:bg-white/5 font-headline font-medium transition-all text-sm cursor-pointer"
                  >
                    Explore I-100 Command Center →
                  </button>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 2: I-100 COMMAND CENTER (Sovereign Underwriting UX Spec)
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'i100' && (
          <motion.div
            key="i100"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="pb-20"
          >
            {/* ── I-100 Hero ──────────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-14">
              <div className="flex flex-col lg:flex-row gap-10 items-start">
                {/* Left: context */}
                <div className="lg:w-1/2">
                  <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">UW / I-100 · Recruiter Signal Service</p>
                  <h2 className="font-headline text-3xl md:text-4xl font-bold leading-tight mb-4">
                    The recruiter's terminal —<br className="hidden md:block" /> but they pay to use it.
                  </h2>
                  <p className="text-on-surface-variant leading-relaxed max-w-xl">
                    Eight screens covering the full Recruiter Signal Service flow. Boolean search against the AIRF™-filtered pool, the three-phase privacy protocol made operational, structured connect requests, and pipeline tracking. Every interaction reinforces that contact is rationed and the candidate holds the veto.
                  </p>
                </div>

                {/* Right: mock command center */}
                <div className="lg:w-1/2 w-full">
                  <div className="bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/15 overflow-hidden">
                    {/* Window bar */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-surface-container-low border-b border-outline-variant/15">
                      <span className="w-3 h-3 rounded-full bg-red-400" />
                      <span className="w-3 h-3 rounded-full bg-amber-400" />
                      <span className="w-3 h-3 rounded-full bg-green-400" />
                      <span className="font-mono text-[10px] tracking-widest text-on-surface-variant ml-3">I-100 · COMMAND CENTER</span>
                    </div>
                    <div className="p-5 space-y-3">
                      {/* Corridor pulse mini */}
                      <div className="bg-inverse-surface text-inverse-on-surface p-3 rounded-xl font-mono text-[10px] leading-relaxed">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          <span className="text-amber-400 tracking-widest">CORRIDOR PULSE</span>
                        </div>
                        <span className="text-inverse-on-surface/80">HOU $248K ▲4.2% &nbsp;·&nbsp; NYC $312K ▲6.8% &nbsp;·&nbsp; SF $284K ▼1.1%</span>
                      </div>
                      {/* KPIs */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: 'Reveal credits', value: revealCredits.toString(), color: 'text-primary' },
                          { label: 'Active pipeline', value: activePipeline.toString(), color: 'text-on-surface' },
                          { label: 'Avg time-to-accept', value: '2.1 days', color: 'text-on-surface' },
                        ].map(kpi => (
                          <div key={kpi.label} className="bg-surface-container-low rounded-xl p-3 text-center">
                            <p className="font-mono text-[9px] uppercase tracking-widest text-on-surface-variant mb-1">{kpi.label}</p>
                            <p className={cn('font-mono font-bold text-lg leading-none', kpi.color)}>{kpi.value}</p>
                          </div>
                        ))}
                      </div>
                      {/* New search CTA */}
                      <button
                        onClick={() => setSearchQuery('')}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-mono text-xs font-bold tracking-widest uppercase cursor-pointer hover:opacity-90 transition-all"
                      >
                        New search →
                      </button>
                      {/* Recent searches */}
                      <div className="bg-surface-container-low rounded-xl p-3">
                        <p className="font-mono text-[9px] uppercase tracking-widest text-on-surface-variant mb-2">Recent searches</p>
                        {showRecentSearches.map((s, i) => (
                          <button
                            key={i}
                            onClick={() => setSearchQuery(s.split(' · ')[0])}
                            className="block font-mono text-[10px] text-on-surface-variant hover:text-primary transition-colors py-0.5 cursor-pointer text-left w-full"
                          >
                            ▸ {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── 3-Phase Privacy Protocol ────────────────────────────── */}
            <section className="bg-surface-container-low py-16">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">UW / F4 · 3-Phase Privacy-Preserving Match Protocol</p>
                <h3 className="font-headline text-2xl md:text-3xl font-bold mb-4">Recruiters pay to reach. Candidates choose to be reached.</h3>
                <p className="text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
                  The privacy-preserving match protocol inverts the power dynamic of every existing talent platform. The recruiter sees a match count, then de-identified profiles, then — and only after paying a credit and the candidate accepting — the identity. Top talent pays nothing to participate; recruiters pay premium SaaS fees to reach them.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {I100_PHASES.map((phase) => (
                    <div key={phase.phase} className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-outline-variant/10">
                      <span className={cn(
                        'inline-block px-3 py-1 rounded-full text-xs font-bold mb-4',
                        phase.style === 'gild'
                          ? 'bg-gradient-to-r from-primary to-primary-container text-white'
                          : 'bg-surface-container-high text-on-surface-variant'
                      )}>
                        {phase.phase}
                      </span>
                      <h4 className="font-headline font-semibold text-base mb-2">{phase.title}</h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{phase.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/30 rounded-2xl">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold mb-2">Designer's Note · friction is the feature</p>
                  <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed max-w-3xl">
                    Every existing recruiter platform optimizes for recruiter ease — fast contact, mass outreach, easy InMails. This is precisely why senior engineers hate them. We do the opposite: deliberately add friction to recruiter contact (credits + structured brief + opt-in), which selects for serious specific opportunities and protects the candidate's attention. That asymmetric cost — cheap to be a candidate, expensive to be a recruiter — is what attracts the talent pool LinkedIn cannot reach.
                  </p>
                </div>
              </div>
            </section>

            {/* ── Underwriting Math ────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
              <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">UW / F5 · The Underwriting Math</p>
              <h3 className="font-headline text-2xl md:text-3xl font-bold mb-4">π, V<sub>u</sub>, and the Strike Event.</h3>
              <p className="text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
                Three formulas govern every bond on the platform. The Premium (π) is what the employer pays. The Underwritten Value (V<sub>u</sub>) is what the platform guarantees. The Strike Event is what fires the claim. All three are surfaced in the EWARD console so the CFO sees exactly what they're buying.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-outline-variant/10">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full mb-4">PREMIUM (π)</span>
                  <div className="bg-[#16140F] text-amber-400 rounded-xl p-4 font-mono text-sm text-center mb-3">π = Base × (λ / CLI)</div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Low Decay (λ) + high Continuous Learning Index (CLI) = low premium. The honest learner pays less to be insured.</p>
                </div>
                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-outline-variant/10">
                  <span className="inline-block bg-gradient-to-r from-primary to-primary-container text-white text-xs font-bold px-3 py-1 rounded-full mb-4">UNDERWRITTEN VALUE (V<sub>u</sub>)</span>
                  <div className="bg-[#16140F] text-amber-400 rounded-xl p-4 font-mono text-xs text-center mb-3 leading-relaxed">
                    V<sub>u</sub> = (Salary + Regional Premium)<br />× AICI<sub>conf</sub> × Volatility
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">The payout if the hire fails a Hard-Gate audit in the first 180 days. NYC-Finance multiplier (1.4×) vs Houston-Energy.</p>
                </div>
                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-outline-variant/10">
                  <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">STRIKE EVENT</span>
                  <div className="bg-[#16140F] rounded-xl p-4 font-mono text-xs leading-relaxed mb-3">
                    <span className="text-red-400">if AICI &lt; strike_threshold</span><br />
                    <span className="text-amber-400">&amp;&amp; corrective_gate = FAIL:</span><br />
                    <span className="text-blue-400">claim_status → TRIGGERED</span>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Two simultaneous conditions trigger payout from the Underwriting Reserve. Documented in the Strike sequence (E6).</p>
                </div>
              </div>
            </section>

            {/* ── AIRF Tier Classifier ─────────────────────────────────── */}
            <section className="bg-surface-container-low py-16">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">UW / F3 · The AIRF™ Classifier</p>
                <h3 className="font-headline text-2xl md:text-3xl font-bold mb-4">Four conditions. Five tiers. Zero "flashcard engineers."</h3>
                <p className="text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
                  The AIRF™ Classifier is the platform's filter against false signal. A candidate earns a tier only when <em>all four</em> conditions clear simultaneously: Verified Count, Accuracy, Calibration Gap, and Overconfident Liability count.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                  {[
                    { tier: 'TIER 1', label: 'Below Threshold', desc: 'Insufficient signal — recruiters do not see by default.', color: 'from-[#3D2914] to-[#5E3D1A]' },
                    { tier: 'TIER 2', label: 'Familiar', desc: 'Some verification, calibration not yet trustworthy.', color: 'from-[#5E3D1A] to-[#8A6020]' },
                    { tier: 'TIER 3', label: 'Working Knowledge', desc: 'Recruiter-visible. Reliable in standard scenarios.', color: 'from-[#8A6020] to-[#B8862E]' },
                    { tier: 'TIER 4', label: 'Verified Practitioner', desc: 'High Verified Count + low OL. Bond-eligible.', color: 'from-[#B8862E] to-[#C5A059]' },
                    { tier: 'TIER 5', label: 'Sovereign Practitioner', desc: 'All conditions clear. Triple-85 candidate.', color: 'from-[#C5A059] to-[#E8C37E]' },
                  ].map(t => (
                    <div key={t.tier} className="bg-surface-container-lowest rounded-2xl p-4 text-center shadow-md border border-outline-variant/10">
                      <div className={cn('inline-block text-white text-[10px] font-bold font-mono px-2.5 py-1 rounded-lg mb-3 bg-gradient-to-r', t.color)}>
                        {t.tier}
                      </div>
                      <p className="font-semibold text-sm mb-1">{t.label}</p>
                      <p className="text-[11px] text-on-surface-variant leading-relaxed">{t.desc}</p>
                    </div>
                  ))}
                </div>
                {/* 4-Condition Gate */}
                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-lg border border-outline-variant/10">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold mb-4">The 4-Condition Gate — All Must Clear</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-outline-variant/15">
                          <th className="text-left font-mono text-[10px] uppercase tracking-widest text-on-surface-variant py-2 pr-6">Condition</th>
                          <th className="text-left font-mono text-[10px] uppercase tracking-widest text-on-surface-variant py-2 pr-6">Definition</th>
                          <th className="text-left font-mono text-[10px] uppercase tracking-widest text-on-surface-variant py-2">Why it matters</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { cond: 'Verified Count', def: 'Number of Hard-Gate / Lab verifications across cross-surface attribution.', why: 'Volume of evidence — a single Gate is a sample, not a track record.' },
                          { cond: 'Accuracy', def: 'Proportion of verifications that passed without override.', why: 'Quality — high-volume + low-accuracy is noise.' },
                          { cond: 'Calibration Gap', def: 'Difference between self-rated and verified competency.', why: 'Honesty signal — high gap = overconfidence.' },
                          { cond: 'Overconfident Liability (OL) Count', def: 'High-confidence answers that failed verification.', why: 'The "arrogant liability" filter — even one OL caps tier.' },
                        ].map(row => (
                          <tr key={row.cond} className="border-b border-outline-variant/10 last:border-b-0">
                            <td className="py-3 pr-6 font-semibold text-on-surface">{row.cond}</td>
                            <td className="py-3 pr-6 text-on-surface-variant">{row.def}</td>
                            <td className="py-3 text-on-surface-variant">{row.why}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
