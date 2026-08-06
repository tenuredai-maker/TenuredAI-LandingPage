import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { 
  MapPin, Calendar, ChevronRight, ChevronDown, Check, 
  ExternalLink, Lock, Shield, Award, Terminal, ArrowRight, 
  Clock, Coins, Users, Cpu, BookOpen, UserCheck, Compass,
  Activity, RefreshCw
} from 'lucide-react';

// FAQ items for main overview
const FAQ_ITEMS = [
  {
    qn: "Q_01",
    qtext: "What exactly is a \"Get Tenured\" event?",
    ans: "A high-velocity, cohort-based physical deployment — not a casual tech meetup, not a conference. Participants enter the Proving Ground live, face real-time system friction, model drift, and security constraints, and leave with verified performance data written to the Sovereign Ledger. It is where professionals and enterprise teams prove they have the sovereign skills to remain un-replaceable."
  },
  {
    qn: "Q_02",
    qtext: "Which track am I? Enterprise or Institutional?",
    ans: "Track_01 (Enterprise) is for corporate teams, consultancies, tech founders, CTOs, VPs of engineering, HR operations, and individual developers or operators. It is driven by commercial velocity, billable efficiency, and risk underwriting. Track_02 (Institutional) is for university presidents, boards of regents, K-12 superintendents, deans, and academic administrators. It is driven by academic integrity, student outcome metrics, governance, and public trust. The tracks are strictly decoupled — separate days, separate rooms, separate briefing documents — so neither message is diluted."
  },
  {
    qn: "Q_03",
    qtext: "How much does admission cost?",
    ans: "Enterprise admission is paid: $499 per individual node seat, or $1,999 for an Enterprise Team Pass covering up to five seats. Institutional admission carries no charge to your institution — seats hold a stated value of $1,250 and are covered under regional educational grants and foundation underwriting, accessed via the Institutional Nomination Protocol."
  },
  {
    qn: "Q_04",
    qtext: "Is the ticket price really 100% creditable?",
    ans: "Yes. If your organization signs an institutional agreement within 30 days of the event, the full ticket spend credits toward a Tier 1 or Tier 2 platform subscription. The event functions as a paid down-payment on your platform onboarding rather than a sunk cost."
  },
  {
    qn: "Q_05",
    qtext: "What is the Institutional Nomination Protocol?",
    ans: "Institutional seats cannot simply be purchased. A superintendent, regent, or academic administrator submits a short application detailing their existing student footprint, current LMS stack, and pilot timelines. This preserves the closed-door, peer-level standing of the room and removes the public procurement bottleneck entirely — no budget approval loop required."
  },
  {
    qn: "Q_06",
    qtext: "What do I actually walk away with?",
    ans: "Individuals and operators: ledger-synced score movement across AICI™, AIOI™, AI-ED™, and AIBS™; upward mobility on the public Grit Leaderboard; and an advanced verified tier minted to your Sovereign Passport. Enterprise leaders: a live workforce baseline mapped against the 4,000-node competency ontology, updated AIBS™ scores for your engineers, and a definitive roadmap to calculate your organization's systemic AICI™ and deploy a pilot node. Institutional leaders: a pilot framework blueprint, governance models for AIOI-ED™ deployment, and deployment planning for authenticated, verifiable student exit portfolios."
  },
  {
    qn: "Q_07",
    qtext: "What are the drills like? Do I need to prepare?",
    ans: "Operator days are grueling by design: multi-hour intensives inside the Challenge Chamber and Proving Ground, with live adversarial stress injected by the Chaos Engine — model drift, friction injection, and security constraints. Enterprise teams should bring their current tech stacks; drills run against real conditions, not toy problems. Executive and institutional sessions are strategic roundtables — no code required, full participation expected."
  },
  {
    qn: "Q_08",
    qtext: "Where and when is the next deployment?",
    ans: "The circuit currently rotates through two core hubs. NODE_HOUSTON (The Space City Cohort) is in active registration; NODE_NYC (The Capital Vault Cohort) is waitlist-only. Each stop runs distinct back-to-back days: Day 1 for the Enterprise track, Day 2 for the Institutional track. Additional regional nodes are announced on the deployment calendar as they are provisioned."
  },
  {
    qn: "Q_09",
    qtext: "Can attending replace buying a full platform license?",
    ans: "It's designed as the step before it. If your organization is hesitant to commit to a multi-seat license, send a five-person leadership team to a local node as a low-friction, high-impact trial. Once your leadership experiences the calibration telemetry in person, the transition to a full enterprise contract is the natural next step — and your ticket spend rolls into it."
  },
  {
    qn: "Q_10",
    qtext: "Why aren't these events free?",
    ans: "Because free registration attracts observers, and the Proving Ground is built for participants. The enterprise-grade math underwriting the Triple-Threat Engine deserves an admission structure that matches it. Where price would create a genuine barrier — public institutions bound by tight budget approval loops — we remove it entirely through grant underwriting and nomination-based admission, without ever diluting the standing of the room."
  }
];

export default function Events() {
  const [activeTab, setActiveTab] = useState<'overview' | 'sovereign' | 'enterprise' | 'institutional' | 'recruiters'>('overview');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tabs = [
    { id: 'overview', name: '/EVENTS_OVERVIEW' },
    { id: 'sovereign', name: 'PROTOCOL_01 // INDIVIDUALS' },
    { id: 'enterprise', name: 'ARCH_02 // ENTERPRISE' },
    { id: 'institutional', name: 'MANDATE_03 // INSTITUTIONAL' },
    { id: 'recruiters', name: 'LIQUIDITY_04 // RECRUITERS' }
  ];

  return (
    <div className="pt-20 min-h-screen bg-background text-on-surface">
      
      {/* HEADER BANNER */}
      <div className="bg-inverse-surface text-inverse-on-surface sticky top-16 z-30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 flex items-center justify-between overflow-x-auto font-mono text-[10px] md:text-xs whitespace-nowrap">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_2px_rgba(251,191,36,.4)]" />
            <span className="text-amber-400 font-bold tracking-widest">DEPLOYMENT CIRCUIT · LIVE UPDATES</span>
          </div>
          <span className="opacity-80">NODE_HOU [HOUSTON COHORT 01]: ACTIVE REGISTRATION</span>
          <span className="opacity-80">NODE_NYC [NEW YORK COHORT 02]: WAITLIST ONLY</span>
        </div>
      </div>

      {/* PAGE HEADER */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-6 border-b border-outline-variant/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary font-bold mb-3">Get Tenured // In-Person Deployment Series</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.04]">
              Events &amp; <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">Briefing Suite.</span>
            </h1>
          </div>
          <div className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase text-right leading-relaxed shrink-0">
            <strong className="text-on-surface block text-sm tracking-normal font-bold">NODE DIRECTORY // REV 2026</strong>
            Sovereign Ledger Verification Nodes<br />
            Cohort-Based Physical Calibrations
          </div>
        </div>
      </section>

      {/* TABS SWITCHER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 my-8">
        <div className="flex flex-wrap gap-1 p-1 bg-surface-container-low border border-outline-variant/20 rounded-2xl md:rounded-full w-full md:w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                window.scrollTo({ top: 220, behavior: 'smooth' });
              }}
              className={cn(
                'px-4 md:px-6 py-2.5 rounded-xl md:rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all cursor-pointer w-full md:w-auto text-center',
                activeTab === tab.id
                  ? 'bg-inverse-surface text-inverse-on-surface shadow-md'
                  : 'text-on-surface-variant hover:text-on-surface'
              )}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          {/* ══════════════════════════════════════════════════════════════════
              TAB: OVERVIEW
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'overview' && (
            <div className="space-y-16 pb-24">
              
              {/* HERO SECTION */}
              <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 relative overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.12),transparent_70%)] pointer-events-none" />
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase bg-primary/10 text-primary px-3 py-1.5 rounded-full font-bold mb-6">
                  Live Deployment Series
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight max-w-4xl mb-6">
                  Get Tenured. <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">In person.</span>
                </h2>
                <p className="text-on-surface-variant max-w-3xl text-sm md:text-base leading-relaxed mb-8">
                  True human-AI synergy cannot be verified through a screen alone. The Get Tenured series is a circuit of high-velocity, cohort-based physical deployments — where you stress-test your capabilities against live adversarial friction, lock in your immutable telemetry, and claim your place on the ledger.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#nodes" className="px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-mono text-xs font-bold tracking-widest uppercase shadow-lg hover:opacity-95 transition-all">
                    Locate Nearest Deployment →
                  </a>
                  <a href="#blueprints" className="px-6 py-3.5 rounded-full border border-outline-variant/30 text-on-surface font-mono text-xs font-bold tracking-widest uppercase hover:bg-surface-container-low transition-all">
                    Read the Blueprints
                  </a>
                </div>
              </section>

              {/* SECTION II: ACTIVE NODES */}
              <section id="nodes" className="bg-surface-container-low py-16 border-y border-outline-variant/10">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs text-primary font-bold">SEC_II</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Regional Deployment Selector</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-normal mb-4">Active nodes on the circuit.</h3>
                  <p className="text-on-surface-variant text-sm max-w-2xl mb-10 leading-relaxed">
                    Each city stop hosts distinct, back-to-back tracks — an Enterprise day and an Institutional day — formatted as localized server nodes rather than generic tour dates.
                  </p>

                  <div className="space-y-6">
                    {/* Node 1 */}
                    <div className="bg-surface p-6 md:p-8 rounded-2xl border border-outline-variant/15 shadow-md grid grid-cols-1 lg:grid-cols-[180px_1fr_auto] gap-6 items-center">
                      <div className="font-mono">
                        <div className="text-xl font-bold text-on-surface">NODE_HOU</div>
                        <span className="inline-flex items-center gap-1.5 mt-2 font-mono text-[9px] uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-bold border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Registration
                        </span>
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-base md:text-lg mb-2">The Space City Cohort — Houston · Cohort // 01</h4>
                        <p className="text-xs text-on-surface-variant leading-relaxed max-w-3xl">
                          <strong>Day 1 — Enterprise Deployment Lab:</strong> Corporate engineering teams bring their current stacks into the Proving Ground and stress-test agentic systems under simulated adversarial drift. <strong>Day 2 — The Institutional Sovereignty Summit:</strong> Closed-door roundtable for regents, superintendents, and district administrators on the K-12 competency framework and the 4,000-node hashed ontology.
                        </p>
                        <div className="text-[10px] font-mono text-on-surface-variant mt-4 uppercase tracking-wider">
                          Next Window: <strong className="text-on-surface">Q4 2026 — DATES POSTING SOON</strong>
                        </div>
                      </div>
                      <a href="#pricing-spec" className="px-5 py-3 rounded-xl bg-primary text-on-primary font-mono text-[10px] tracking-widest uppercase font-bold text-center hover:opacity-90 transition-all">
                        Secure Seat // Node_HOU
                      </a>
                    </div>

                    {/* Node 2 */}
                    <div className="bg-surface p-6 md:p-8 rounded-2xl border border-outline-variant/15 shadow-md grid grid-cols-1 lg:grid-cols-[180px_1fr_auto] gap-6 items-center">
                      <div className="font-mono">
                        <div className="text-xl font-bold text-on-surface">NODE_NYC</div>
                        <span className="inline-flex items-center gap-1.5 mt-2 font-mono text-[9px] uppercase tracking-widest text-on-surface-variant/70 bg-surface-container-high px-2.5 py-1 rounded-full font-bold">
                          Waitlist Only
                        </span>
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-base md:text-lg mb-2">The Capital Vault Cohort — New York · Cohort // 02</h4>
                        <p className="text-xs text-on-surface-variant leading-relaxed max-w-3xl">
                          <strong>Day 1 — High-Frequency Enterprise Analytics Track:</strong> Architectural briefing for enterprise strategists, consulting firms, and technical founders on predictive analytics alignment and high-velocity agentic workflows. <strong>Day 2 — The Regent &amp; Governance Forum:</strong> Policy-level briefing on Sovereign Passport integration, curriculum modernization, and the 40/40/20 Dividend Engine.
                        </p>
                        <div className="text-[10px] font-mono text-on-surface-variant mt-4 uppercase tracking-wider">
                          Next Window: <strong className="text-on-surface">CALENDAR PENDING — JOIN WAITLIST</strong>
                        </div>
                      </div>
                      <a href="#pricing-spec" className="px-5 py-3 rounded-xl border border-outline-variant/30 text-on-surface font-mono text-[10px] tracking-widest uppercase font-bold text-center hover:bg-surface-container-low transition-all">
                        Apply for Admission // Node_NYC
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION III: WHAT HAPPENS INSIDE */}
              <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-primary font-bold">SEC_III</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Inside a Deployment</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-normal mb-4">What happens inside a Get Tenured event.</h3>
                <p className="text-on-surface-variant text-sm max-w-2xl mb-12 leading-relaxed">
                  Three phases. No keynote theater. Every phase writes data.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-sm">
                    <div className="font-mono text-2xl font-bold text-primary mb-4">01</div>
                    <h4 className="font-headline font-bold text-[15px] mb-2">Hard-Gate Calibration</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Live onboarding into the platform's connectionist architecture to establish your baseline entry node — the hard floor from which every movement is measured.
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-sm">
                    <div className="font-mono text-2xl font-bold text-primary mb-4">02</div>
                    <h4 className="font-headline font-bold text-[15px] mb-2">Proving Ground Drills</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Collaborative, high-pressure sandbox drills where teams build, deploy, and debug live agentic workflows under simulated adversarial stress.
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-sm">
                    <div className="font-mono text-2xl font-bold text-primary mb-4">03</div>
                    <h4 className="font-headline font-bold text-[15px] mb-2">Passport Minting &amp; Ledger Sync</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Final evaluation. Verified data updates on the global ledger, adjusting your standing on the Grit Leaderboard and minting your Sovereign Passport tier.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION IV: THE BLUEPRINTS */}
              <section id="blueprints" className="bg-surface-container-low py-16 border-y border-outline-variant/10">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs text-primary font-bold">SEC_IV</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Choose Your Operational Interface</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-normal mb-4">Two tracks. Zero dilution.</h3>
                  <p className="text-on-surface-variant text-sm max-w-2xl mb-12 leading-relaxed">
                    A corporate VP hunting elite developer telemetry and a university regent modernizing a curriculum do not belong in the same room. The circuit is strictly decoupled — read the blueprint written for your side of the table.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Track 1 */}
                    <div className="bg-surface p-8 rounded-3xl border border-outline-variant/10 shadow-lg flex flex-col justify-between">
                      <div className="space-y-6">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold block">[ TRACK_01: ENTERPRISE ]</span>
                        <h4 className="font-headline font-bold text-xl md:text-2xl text-on-surface">I am an operator or an enterprise leader.</h4>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          For corporate teams, tech founders, VPs of engineering, and individual developers proving cognitive autonomy in the agentic era.
                        </p>
                        <div className="font-mono text-[10.5px] leading-loose text-on-surface-variant bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
                          INTERFACE: <strong className="text-on-surface">PAID ADMISSION</strong><br />
                          UPCOMING: <strong className="text-on-surface">HOUSTON // ENTERPRISE LAB</strong><br />
                          UPCOMING: <strong className="text-on-surface">NEW YORK // HIGH-VELOCITY TRACK</strong><br />
                          PAYLOAD: <em className="text-primary font-bold font-mono not-italic">PROVING GROUND CREDITS</em>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mt-8">
                        <button onClick={() => { setActiveTab('enterprise'); window.scrollTo({ top: 220, behavior: 'smooth' }); }} className="w-full py-3 rounded-xl bg-primary text-on-primary font-mono text-[10.5px] tracking-widest uppercase font-bold text-center hover:opacity-90 transition-all cursor-pointer">
                          Read Enterprise Blueprint →
                        </button>
                        <button onClick={() => { setActiveTab('sovereign'); window.scrollTo({ top: 220, behavior: 'smooth' }); }} className="w-full py-3 rounded-xl border border-outline-variant/30 text-on-surface font-mono text-[10.5px] tracking-widest uppercase font-bold text-center hover:bg-surface-container-low transition-all cursor-pointer">
                          Read Individual Operator Blueprint
                        </button>
                      </div>
                    </div>

                    {/* Track 2 */}
                    <div className="bg-surface p-8 rounded-3xl border border-outline-variant/10 shadow-lg flex flex-col justify-between">
                      <div className="space-y-6">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-secondary font-bold block">[ TRACK_02: INSTITUTIONAL ]</span>
                        <h4 className="font-headline font-bold text-xl md:text-2xl text-on-surface">I am an institutional leader.</h4>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          For regents, K-12 leadership, university presidents, and academic administration stewarding public trust and student outcomes.
                        </p>
                        <div className="font-mono text-[10.5px] leading-loose text-on-surface-variant bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
                          INTERFACE: <strong className="text-on-surface">BY APPLICATION ONLY</strong><br />
                          UPCOMING: <strong className="text-on-surface">HOUSTON // INSTITUTIONAL SUMMIT</strong><br />
                          UPCOMING: <strong className="text-on-surface">NEW YORK // GOVERNANCE FORUM</strong><br />
                          PAYLOAD: <em className="text-secondary font-bold font-mono not-italic">PILOT FRAMEWORK BLUEPRINT</em>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mt-8">
                        <button onClick={() => { setActiveTab('institutional'); window.scrollTo({ top: 220, behavior: 'smooth' }); }} className="w-full py-3 rounded-xl bg-primary text-on-primary font-mono text-[10.5px] tracking-widest uppercase font-bold text-center hover:opacity-90 transition-all cursor-pointer">
                          Read Institutional Blueprint →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION V: PRICING VALUE-CAPTURE MODEL */}
              <section id="pricing-spec" className="max-w-7xl mx-auto px-4 md:px-8 py-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-primary font-bold">PRC_01</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Admission Structure</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-normal mb-4">The price is a filter, not a fee.</h3>
                <p className="text-on-surface-variant text-sm max-w-2xl mb-12 leading-relaxed">
                  Get Tenured events are never free — free registration dilutes the signal and fills the room with observers. Pricing itself is an instrument: it filters for high-intent participants on the Enterprise side, and it disappears entirely behind grant underwriting on the Institutional side, where public procurement loops would otherwise stall admission.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-primary font-bold">[ TRACK_01: ENTERPRISE ]</span>
                      <h4 className="font-headline font-bold text-lg mb-3 mt-1">Paid admission. Fully creditable.</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                        Premium, high-contrast pricing per seat — tied directly to a tangible, on-ledger value payload. For corporate budgets, a team intensive inside the Proving Ground is an easy sign-off; for you, it guarantees every person in the room is motivated.
                      </p>
                      <div className="font-mono text-xs leading-loose text-on-surface-variant bg-surface rounded-xl p-5 border border-outline-variant/10">
                        INDIVIDUAL OPERATOR SEAT: <em className="text-primary font-bold font-mono not-italic">$499</em> / NODE<br />
                        ENTERPRISE TEAM PASS: <em className="text-primary font-bold font-mono not-italic">$1,999</em> / UP TO 5 SEATS<br />
                        PAYLOAD: <strong className="text-on-surface">PROVING GROUND CREDITS</strong><br />
                        CREDIT RULE: <strong className="text-on-surface">100% TOWARD SUBSCRIPTION</strong>
                      </div>
                      <p className="text-xs text-on-surface-variant/80 mt-4 leading-relaxed">
                        Sign an institutional agreement within 30 days of the event and the full ticket price credits toward your Tier 1 or Tier 2 platform subscription — the event becomes a paid down-payment on your onboarding.
                      </p>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-secondary font-bold block">[ TRACK_02: INSTITUTIONAL ]</span>
                      <h4 className="font-headline font-bold text-lg mb-3 mt-1">By institutional invitation only.</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                        Not listed as free — gated. Every seat carries a stated value of $1,250 and is covered entirely under regional educational grants and foundation underwriting. To the regent or superintendent, this is an elite closed-door appointment, not a webinar.
                      </p>
                      <div className="font-mono text-xs leading-loose text-on-surface-variant bg-surface rounded-xl p-5 border border-outline-variant/10">
                        COST TO INSTITUTION: <em className="text-secondary font-bold font-mono not-italic">$0</em> — COMPLIMENTARY VIA INVITE<br />
                        STATED SEAT VALUE: <strong className="text-on-surface">$1,250 / SEAT</strong><br />
                        UNDERWRITING: <strong className="text-on-surface">REGIONAL GRANTS + FOUNDATIONS</strong><br />
                        PAYLOAD: <strong className="text-on-surface">PILOT FRAMEWORK BLUEPRINT</strong>
                      </div>
                      <p className="text-xs text-on-surface-variant/80 mt-4 leading-relaxed">
                        Admission runs through the Institutional Nomination Protocol: a short application detailing your student footprint, current LMS stack, and pilot timelines. This removes the procurement bottleneck while preserving the standing of the room.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant/15 rounded-3xl overflow-hidden shadow-lg font-mono">
                  <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant/20 flex justify-between items-center text-[10px] tracking-widest uppercase font-bold text-primary">
                    <span>Pricing System Specification</span>
                    <span>REST-014 API System Spec</span>
                  </div>
                  <div className="divide-y divide-outline-variant/10 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 p-5 hover:bg-surface-container-low/30 transition-colors">
                      <div className="uppercase tracking-wider text-on-surface-variant text-[10px] font-bold">TRACK_01 · Interface</div>
                      <div>PAID ADMISSION + APPLICATION GATE</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 p-5 hover:bg-surface-container-low/30 transition-colors">
                      <div className="uppercase tracking-wider text-on-surface-variant text-[10px] font-bold">TRACK_01 · Individual Seat</div>
                      <div><strong className="text-primary">$499</strong> / NODE SEAT — secure access to the next live adversarial debugging session</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 p-5 hover:bg-surface-container-low/30 transition-colors">
                      <div className="uppercase tracking-wider text-on-surface-variant text-[10px] font-bold">TRACK_01 · Team Pass</div>
                      <div><strong className="text-primary">$1,999</strong> / UP TO 5 SEATS — deploy a full leadership or engineering cohort</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 p-5 hover:bg-surface-container-low/30 transition-colors">
                      <div className="uppercase tracking-wider text-on-surface-variant text-[10px] font-bold">TRACK_01 · Value Loop</div>
                      <div>TICKET 100% CREDITABLE toward Tier 1 or Tier 2 platform subscription within 30 days</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 p-5 hover:bg-surface-container-low/30 transition-colors">
                      <div className="uppercase tracking-wider text-on-surface-variant text-[10px] font-bold">TRACK_02 · Interface</div>
                      <div>BY APPLICATION ONLY — SOVEREIGN NOMINATION</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 p-5 hover:bg-surface-container-low/30 transition-colors">
                      <div className="uppercase tracking-wider text-on-surface-variant text-[10px] font-bold">TRACK_02 · Cost</div>
                      <div>COMPLIMENTARY VIA INVITE (SEAT VALUE: <strong className="text-primary">$1,250</strong>) — submit institutional parameters for regional board, district, and regent roundtables</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ SECTION */}
              <section className="max-w-4xl mx-auto px-4 md:px-8 py-10">
                <div className="flex items-center gap-3 mb-4 justify-center">
                  <span className="font-mono text-xs text-primary font-bold">FAQ</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Operational Parameters</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-normal text-center mb-8">Questions, answered in system terms.</h3>
                
                <div className="space-y-4">
                  {FAQ_ITEMS.map((faq, i) => (
                    <div key={i} className="bg-surface-container-low border border-outline-variant/15 rounded-xl overflow-hidden shadow-sm">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full p-5 flex justify-between items-center text-left hover:bg-surface-container-high transition-colors font-headline font-semibold text-sm cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-[10px] text-primary font-normal">{faq.qn}</span>
                          <span>{faq.qtext}</span>
                        </div>
                        <ChevronDown className={cn("w-4 h-4 transition-transform", openFaq === i ? "rotate-180" : "")} />
                      </button>
                      
                      {openFaq === i && (
                        <div className="p-5 border-t border-outline-variant/10 bg-surface text-xs leading-relaxed text-on-surface-variant space-y-3">
                          <p>{faq.ans}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB: SOVEREIGN INDIVIDUALS (PROTOCOL_01)
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'sovereign' && (
            <div className="space-y-16 pb-24 max-w-7xl mx-auto px-4 md:px-8">
              
              {/* HERO */}
              <section className="py-10 relative overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.12),transparent_70%)] pointer-events-none" />
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase bg-primary/10 text-primary px-3 py-1.5 rounded-full font-bold mb-6">
                  PROTOCOL_01 // INDIVIDUAL OPERATOR
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight max-w-4xl mb-6">
                  The Sovereign Node. <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">Prove cognitive autonomy</span> in the agentic era.
                </h2>
                <p className="text-on-surface-variant max-w-3xl text-sm leading-relaxed mb-8">
                  Traditional credentials — degrees, résumé keywords, self-reported skills — are dead letters in an era of autonomous code. The only metric that matters is your immutable telemetry under adversarial stress. This briefing details exactly what you will face inside a Get Tenured deployment, and what you will carry out of it.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 font-mono text-xs">
                  <div>FORMAT<strong className="block text-sm text-on-surface font-bold mt-1">Adversarial Bootcamp</strong></div>
                  <div>DURATION<strong className="block text-sm text-on-surface font-bold mt-1">1 Day · High-Velocity</strong></div>
                  <div>NODES<strong className="block text-sm text-on-surface font-bold mt-1">Houston · New York</strong></div>
                  <div>SEAT FEE<strong className="block text-sm text-primary font-bold mt-1">$499 / Node</strong></div>
                </div>
              </section>

              {/* THE PREMISE & TERMINAL */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-primary font-bold">01</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">The Premise</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-normal leading-tight">Your résumé is a claim. Your telemetry is a fact.</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Every operator in the market says they can orchestrate agentic workflows. Almost none can prove it under live friction. Get Tenured is not a meetup, a hackathon, or a conference. It is a calibration event — a physical arena where your capability is measured, hashed, and written to the Sovereign Ledger.
                  </p>
                </div>
                
                <div className="bg-[#16140F] rounded-2xl p-1 overflow-hidden shadow-2xl font-mono text-xs text-[#D8D2C4]">
                  <div className="bg-surface-container-low/10 px-4 py-2 flex items-center gap-2 border-b border-white/5">
                    <span className="w-2.5 h-2.5 rounded-full bg-error/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary-container/40" />
                    <span className="text-[10px] text-inverse-on-surface/40 ml-4 font-bold uppercase tracking-widest">PROTOCOL_01 --verify</span>
                  </div>
                  <div className="p-6 space-y-3 leading-relaxed">
                    <div><span className="text-[#8A8474]">$</span> tenured --verify operator_node</div>
                    <div className="text-primary-container">▸ resolving claim: "senior agentic architect"</div>
                    <div className="text-[#8A8474]">▸ source: resume.pdf .................... UNVERIFIABLE</div>
                    <div className="text-amber-400">▸ source: proving_ground.telemetry ...... STRESS-VALIDATED · LEDGER-SYNCED</div>
                    <div className="text-emerald-400">▸ verdict: only one of these survives an audit.</div>
                  </div>
                </div>
              </section>

              {/* EVENT MECHANICS */}
              <section className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-xs text-primary font-bold">02</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Event Mechanics</span>
                </div>
                <h3 className="font-display text-2xl font-normal mb-8">What happens inside the Challenge Chamber.</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl mb-8">
                  You will configure, deploy, and defend live agentic workflows against real-time model drift, injected friction, and security constraints. Three phases. No lectures. No slideware.
                </p>

                <div className="divide-y divide-outline-variant/20 font-mono text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 py-6">
                    <div className="text-primary font-bold text-lg">01 <small className="block text-[8px] uppercase text-on-surface-variant tracking-widest">Calibration</small></div>
                    <div>
                      <h4 className="font-headline font-bold text-sm text-on-surface mb-2 font-sans">Hard-Gate Calibration</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        Live onboarding into the platform's connectionist architecture. Your baseline entry node is established against the competency ontology — a hard floor from which every subsequent movement is measured.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 py-6">
                    <div className="text-primary font-bold text-lg">02 <small className="block text-[8px] uppercase text-on-surface-variant tracking-widest">The Arena</small></div>
                    <div>
                      <h4 className="font-headline font-bold text-sm text-on-surface mb-2 font-sans">Proving Ground Drills</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        Collaborative, high-pressure sandbox drills inside a secured execution environment. You build, deploy, and debug live agentic workflows while the Chaos Injection Engine introduces simulated adversarial stress — model drift, friction injection, and live exploit conditions.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 py-6">
                    <div className="text-primary font-bold text-lg">03 <small className="block text-[8px] uppercase text-on-surface-variant tracking-widest">The Mint</small></div>
                    <div>
                      <h4 className="font-headline font-bold text-sm text-on-surface mb-2 font-sans">Passport Minting &amp; Ledger Sync</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        Final evaluation. Verified performance data is written to the global ledger, your Sovereign Passport tier is minted or upgraded, and your standing on the public Grit Leaderboard adjusts in real time.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* THE PAYLOAD */}
              <section className="space-y-8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-primary font-bold">03</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">The Payload</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-normal">Four indexes. One immutable record.</h3>
                <p className="text-on-surface-variant text-xs max-w-2xl leading-relaxed">
                  Surviving the bootcamp is a direct fast-track to advancing your standing across the Triple-Threat Scoring Engine. Each index is calibrated live, on-site, under witnessed stress conditions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <strong className="text-lg font-bold text-on-surface">AICI™</strong>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-full">The Foundation</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-on-surface font-sans mb-2">AI Competency Index</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        The measure of your ability to safely, ethically, and effectively use AI tools to enhance personal productivity. Focus: prompt precision (Chain-of-Thought, Few-Shot), hallucination detection, ethical guardrails including PII and privacy, and tool agility across multimodal models. The general standard for being AI-ready.
                      </p>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <strong className="text-lg font-bold text-on-surface">AIOI™</strong>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-full">The Bridge</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-on-surface font-sans mb-2">AI Orchestrator Score</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        The measure of your ability to design, integrate, and manage AI systems within a business or educational workflow. Focus: workflow architecture, change leadership, governance and compliance, and Human-in-the-Loop design. The conductor's score — strategy, KPIs, and operational efficiency over raw output.
                      </p>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <strong className="text-lg font-bold text-on-surface">AI-ED™</strong>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-full">The Specialty</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-on-surface font-sans mb-2">AI Orchestrator Sub-Index · Education</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        A specialized sub-index for those who architect the future of learning, tagged onto the AIOI score. Focus: AI pedagogy, personalization logic for individual learning paths, and integrity management across grading and plagiarism.
                      </p>
                      <div className="flex gap-4 mt-4 text-[10px] tracking-wide text-on-surface-variant">
                        <span>EFFICIENCY <strong className="text-primary font-bold">40%</strong></span>
                        <span>SECURITY <strong className="text-primary font-bold">30%</strong></span>
                        <span>DEBUG_SPEED <strong className="text-primary font-bold">30%</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <strong className="text-lg font-bold text-on-surface">AIBS™</strong>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-full">The Engine</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-on-surface font-sans mb-2">AI Builder Score</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        The measure of your technical capability to architect, code, and deploy proprietary AI infrastructure. Pure building: RAG and vector architecture, API engineering, model fine-tuning, and agentic programming. For the heavy hitters in the technical weeds.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ROI & CALENDAR */}
              <section className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-xs text-primary font-bold">04</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Exit State</span>
                </div>
                <h3 className="font-display text-2xl font-normal mb-8">What you walk out holding.</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl mb-8">
                  The event fee is not a cost — it is a down-payment on your professional infrastructure. Every seat carries a direct, on-ledger value payload.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                  <div className="bg-surface p-5 rounded-xl border border-outline-variant/10">
                    <div className="text-[10px] tracking-widest uppercase text-on-surface-variant font-semibold mb-2">Ledger Standing</div>
                    <div className="text-xl text-primary font-bold flex items-center gap-1">↑ Grit Leaderboard</div>
                    <p className="text-xs text-on-surface-variant font-sans mt-3 leading-relaxed">
                      Direct upward mobility on the global, public leaderboard — visible to every recruiter and enterprise underwriter on the platform.
                    </p>
                  </div>

                  <div className="bg-surface p-5 rounded-xl border border-outline-variant/10">
                    <div className="text-[10px] tracking-widest uppercase text-on-surface-variant font-semibold mb-2">Credential Artifact</div>
                    <div className="text-xl text-primary font-bold flex items-center gap-1">Sovereign Passport</div>
                    <p className="text-xs text-on-surface-variant font-sans mt-3 leading-relaxed">
                      An advanced, verified tier minted to your digital passport — ironclad proof of hands-on mastery for premium consulting and enterprise roles.
                    </p>
                  </div>

                  <div className="bg-surface p-5 rounded-xl border border-outline-variant/10">
                    <div className="text-[10px] tracking-widest uppercase text-on-surface-variant font-semibold mb-2">Fee Conversion</div>
                    <div className="text-xl text-primary font-bold flex items-center gap-1">100% Creditable</div>
                    <p className="text-xs text-on-surface-variant font-sans mt-3 leading-relaxed">
                      Your full $499 seat fee credits toward a Tier 1 or Tier 2 platform subscription activated within 30 days of the event.
                    </p>
                  </div>
                </div>
              </section>

              {/* FOOT CTA */}
              <section className="bg-inverse-surface text-inverse-on-surface p-8 md:p-12 rounded-3xl relative overflow-hidden">
                <div className="absolute top-[-30%] right-[-15%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.15),transparent_65%)] pointer-events-none" />
                <h3 className="font-display text-2xl md:text-3xl font-light leading-tight mb-6">
                  The ledger doesn't record intentions. It records performance.
                </h3>
                <div className="flex flex-wrap gap-4 relative z-10">
                  <a href="mailto:hello@tenured.ai?subject=Individual%20Operator%20Node%20Seat" className="px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-mono text-xs font-bold tracking-widest uppercase shadow-xl hover:opacity-95 transition-all">
                    Enter the Proving Ground // Secure Seat →
                  </a>
                </div>
              </section>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB: ENTERPRISE (ARCH_02)
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'enterprise' && (
            <div className="space-y-16 pb-24 max-w-7xl mx-auto px-4 md:px-8">
              
              {/* HERO */}
              <section className="py-10 relative overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.12),transparent_70%)] pointer-events-none" />
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase bg-primary/10 text-primary px-3 py-1.5 rounded-full font-bold mb-6">
                  ARCH_02 // ENTERPRISE DEPLOYMENT
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight max-w-4xl mb-6">
                  Commercial velocity begins where <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">guesswork ends.</span>
                </h2>
                <p className="text-on-surface-variant max-w-3xl text-sm leading-relaxed mb-8">
                  Your company does not have an AI adoption problem. It has an AI utilization and trust problem. Throwing software at untrained teams creates systemic liabilities. The Get Tenured Enterprise Track is a low-friction, high-velocity operational pilot: your engineering and leadership teams enter the Proving Ground and leave with underwritten, ledger-verified competency telemetry.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 font-mono text-xs">
                  <div>FORMAT<strong className="block text-sm text-on-surface font-bold mt-1">Deployment Lab</strong></div>
                  <div>ARCHETYPES<strong className="block text-sm text-on-surface font-bold mt-1">CTO · VP Eng · HR Ops</strong></div>
                  <div>TEAM PASS<strong className="block text-sm text-on-surface font-bold mt-1">$1,999 / 5 Seats</strong></div>
                  <div>FEE STATUS<strong className="block text-sm text-primary font-bold mt-1">100% Creditable</strong></div>
                </div>
              </section>

              {/* THE PREMISE & TERMINAL */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-primary font-bold">01</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">The Premise</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-normal leading-tight">Stop guessing who on your team can actually orchestrate agentic workflows.</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Underwrite their actual competency. Mitigate model liabilities. Scale organizational capacity through rigorous telemetry. Instead of theoretical lectures, your leadership and management teams will see exactly how Tenured AI maps a workforce against a 4,000-node competency ontology — live, in the room, on their own work.
                  </p>
                </div>
                
                <div className="bg-[#16140F] rounded-2xl p-1 overflow-hidden shadow-2xl font-mono text-xs text-[#D8D2C4]">
                  <div className="bg-surface-container-low/10 px-4 py-2 flex items-center gap-2 border-b border-white/5">
                    <span className="w-2.5 h-2.5 rounded-full bg-error/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary-container/40" />
                    <span className="text-[10px] text-inverse-on-surface/40 ml-4 font-bold uppercase tracking-widest">ARCH_02 --audit</span>
                  </div>
                  <div className="p-6 space-y-3 leading-relaxed">
                    <div><span className="text-[#8A8474]">$</span> tenured --audit workforce --org acme_corp</div>
                    <div className="text-primary-container">▸ mapping 42 operators against ontology [4,000 nodes]</div>
                    <div className="text-[#8A8474]">▸ self-reported "AI proficient" ......... 38 / 42</div>
                    <div className="text-amber-400">▸ stress-validated under drift .......... 7 / 42</div>
                    <div className="text-error">▸ exposure: the delta between those numbers is your liability.</div>
                  </div>
                </div>
              </section>

              {/* EVENT MECHANICS */}
              <section className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-xs text-primary font-bold">02</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Event Mechanics</span>
                </div>
                <h3 className="font-display text-2xl font-normal mb-8">The Enterprise Deployment Lab.</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl mb-8">
                  Your teams bring their current tech stacks. They enter the Proving Ground. They build, deploy, and stress-test agentic systems under simulated adversarial drift — and every movement is measured.
                </p>

                <div className="divide-y divide-outline-variant/20 font-mono text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 py-6">
                    <div className="text-primary font-bold text-lg">01 <small className="block text-[8px] uppercase text-on-surface-variant tracking-widest">Baseline</small></div>
                    <div>
                      <h4 className="font-headline font-bold text-sm text-on-surface mb-2 font-sans">Organizational Calibration</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        Each operator is onboarded into the connectionist architecture and mapped against the competency ontology. Leadership receives a live baseline readout: who can build, who can orchestrate, and where the gaps sit.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 py-6">
                    <div className="text-primary font-bold text-lg">02 <small className="block text-[8px] uppercase text-on-surface-variant tracking-widest">Stress</small></div>
                    <div>
                      <h4 className="font-headline font-bold text-sm text-on-surface mb-2 font-sans">Adversarial Deployment Drills</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        Engineering teams deploy agentic workflows against your real stack conditions while the Chaos Injection Engine introduces model drift, friction injection, and security constraints. Mid-tier and senior engineers exit with updated AIBS™ scores synced to the ledger.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 py-6">
                    <div className="text-primary font-bold text-lg">03 <small className="block text-[8px] uppercase text-on-surface-variant tracking-widest">Underwrite</small></div>
                    <div>
                      <h4 className="font-headline font-bold text-sm text-on-surface mb-2 font-sans">The Executive Briefing</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        Closed-door strategic session for leadership: workforce underwriting, responsible AI guardrails, and implementing the 40/40/20 Dividend Engine across the organization. You leave with a definitive roadmap to calculate your systemic AICI™ and deploy a pilot node.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* THE PAYLOAD */}
              <section className="space-y-8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-primary font-bold">03</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">The Payload</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-normal">The instrumentation your org walks out with.</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <strong className="text-lg font-bold text-on-surface">AICI™</strong>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-full">Baseline</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-on-surface font-sans mb-2">AI Competency Index</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        Establishes a workforce-wide baseline for personal AI productivity and safe, ethical tool use — the floor every hire and every team is measured against.
                      </p>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <strong className="text-lg font-bold text-on-surface">AIOI™</strong>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-full">Strategic Layer</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-on-surface font-sans mb-2">AI Orchestrator Score</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        A strategic measure of system management, workflow architecture, and Human-in-the-Loop deployment. Identifies which managers can actually run agentic operations.
                      </p>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <strong className="text-lg font-bold text-on-surface">AIBS™</strong>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-full">Engineering Depth</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-on-surface font-sans mb-2">AI Builder Score</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        High-fidelity technical verification for engineering proprietary AI infrastructure — RAG architecture, API engineering, fine-tuning, and agentic programming.
                      </p>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <strong className="text-lg font-bold text-on-surface">40/40/20</strong>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-full">Fiscal Structure</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-on-surface font-sans mb-2">The Dividend Engine</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        The structural and fiscal framework aligning capital, user governance, and infrastructure resilience — briefed in full during the executive session.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* STRATEGIC LOOP */}
              <section className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-xs text-primary font-bold">04</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">The Strategic Loop</span>
                </div>
                <h3 className="font-display text-2xl font-normal mb-8">A low-friction trial for a high-conviction contract.</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl mb-8">
                  Hesitant to commit to a multi-seat license? Send a five-person leadership team to a regional node instead. Once your leadership experiences the calibration telemetry in person, transitioning into a full enterprise deployment becomes the natural next step — and your ticket spend rolls directly into that contract.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                  <div className="bg-surface p-5 rounded-xl border border-outline-variant/10">
                    <div className="text-[10px] tracking-widest uppercase text-on-surface-variant font-semibold mb-2">Step 01</div>
                    <div className="text-xl text-primary font-bold">Deploy 5 Seats</div>
                    <p className="text-xs text-on-surface-variant font-sans mt-3 leading-relaxed">
                      One team pass. One day. Your leadership sees the full underwriting apparatus operate on their own workflows.
                    </p>
                  </div>

                  <div className="bg-surface p-5 rounded-xl border border-outline-variant/10">
                    <div className="text-[10px] tracking-widest uppercase text-on-surface-variant font-semibold mb-2">Step 02</div>
                    <div className="text-xl text-primary font-bold">Read the Telemetry</div>
                    <p className="text-xs text-on-surface-variant font-sans mt-3 leading-relaxed">
                      Baseline readouts, ledger-synced scores, and a systemic AICI™ roadmap specific to your organization.
                    </p>
                  </div>

                  <div className="bg-surface p-5 rounded-xl border border-outline-variant/10">
                    <div className="text-[10px] tracking-widest uppercase text-on-surface-variant font-semibold mb-2">Step 03</div>
                    <div className="text-xl text-primary font-bold">Convert to Node</div>
                    <p className="text-xs text-on-surface-variant font-sans mt-3 leading-relaxed">
                      Sign within 30 days and the full ticket spend credits against your Tier 1 or Tier 2 platform onboarding.
                    </p>
                  </div>
                </div>
              </section>

              {/* FOOT CTA */}
              <section className="bg-inverse-surface text-inverse-on-surface p-8 md:p-12 rounded-3xl relative overflow-hidden">
                <div className="absolute top-[-30%] right-[-15%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.15),transparent_65%)] pointer-events-none" />
                <h3 className="font-display text-2xl md:text-3xl font-light leading-tight mb-6">
                  Underwrite the workforce you actually have.
                </h3>
                <div className="flex flex-wrap gap-4 relative z-10">
                  <a href="mailto:hello@tenured.ai?subject=Enterprise%20Deployment%20Cohort" className="px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-mono text-xs font-bold tracking-widest uppercase shadow-xl hover:opacity-95 transition-all">
                    Initialize Enterprise Node // Deploy Cohort →
                  </a>
                </div>
              </section>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB: INSTITUTIONAL (MANDATE_03)
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'institutional' && (
            <div className="space-y-16 pb-24 max-w-7xl mx-auto px-4 md:px-8">
              
              {/* HERO */}
              <section className="py-10 relative overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.12),transparent_70%)] pointer-events-none" />
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase bg-primary/10 text-primary px-3 py-1.5 rounded-full font-bold mb-6">
                  MANDATE_03 // INSTITUTIONAL BRIEFING
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight max-w-4xl mb-6">
                  Diplomas are lagging indicators. <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">Verified competency</span> is real-time telemetry.
                </h2>
                <p className="text-on-surface-variant max-w-3xl text-sm leading-relaxed mb-8">
                  A closed-door briefing series for university presidents, boards of regents, K-12 superintendents, deans of academics, and student success leadership. Protect academic integrity, map student capability directly to the sovereign AI economy, and establish transparent institutional governance using AIOI-ED™.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 font-mono text-xs">
                  <div>FORMAT<strong className="block text-sm text-on-surface font-bold mt-1">Executive Roundtable</strong></div>
                  <div>ADMISSION<strong className="block text-sm text-on-surface font-bold mt-1">Sovereign Nomination</strong></div>
                  <div>SEAT VALUE<strong className="block text-sm text-on-surface font-bold mt-1">$1,250 · Underwritten</strong></div>
                  <div>NODES<strong className="block text-sm text-primary font-bold mt-1">Houston · New York</strong></div>
                </div>
              </section>

              {/* THE PREMISE & TERMINAL */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-primary font-bold">01</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">The Mandate</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-normal leading-tight">Public trust is your balance sheet. Verification is how you defend it.</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Institutions are not driven by margin — they are driven by academic integrity, student outcome metrics, systemic workforce alignment, governance, and accreditation. The Institutional Track speaks that language exclusively. No sales floor. No mixed corporate audience. A peer-level forum for the people who steward public education.
                  </p>
                </div>
                
                <div className="bg-[#16140F] rounded-2xl p-1 overflow-hidden shadow-2xl font-mono text-xs text-[#D8D2C4]">
                  <div className="bg-surface-container-low/10 px-4 py-2 flex items-center gap-2 border-b border-white/5">
                    <span className="w-2.5 h-2.5 rounded-full bg-error/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary-container/40" />
                    <span className="text-[10px] text-inverse-on-surface/40 ml-4 font-bold uppercase tracking-widest">MANDATE_03 --brief</span>
                  </div>
                  <div className="p-6 space-y-3 leading-relaxed">
                    <div><span className="text-[#8A8474]">$</span> tenured --brief institutional_node</div>
                    <div className="text-primary-container">▸ regents · superintendents · presidents · deans</div>
                    <div className="text-[#8A8474]">▸ agenda_item[01]: counter fraud at systemic level</div>
                    <div className="text-amber-400">▸ agenda_item[02]: map student capability → sovereign AI</div>
                    <div className="text-emerald-400">▸ status: CLOSED-DOOR · PEER-LEVEL · UNDERWRITTEN</div>
                  </div>
                </div>
              </section>

              {/* EVENT MECHANICS */}
              <section className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-xs text-primary font-bold">02</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Forum Mechanics</span>
                </div>
                <h3 className="font-display text-2xl font-normal mb-8">Inside the Institutional Sovereignty Summit.</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl mb-8">
                  Not a webinar. Not a vendor demo. A working session where your leadership sees the full institutional apparatus operate — from district-level competency frameworks to regent-level governance models.
                </p>

                <div className="divide-y divide-outline-variant/20 font-mono text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 py-6">
                    <div className="text-primary font-bold text-lg">01 <small className="block text-[8px] uppercase text-on-surface-variant tracking-widest">Framework</small></div>
                    <div>
                      <h4 className="font-headline font-bold text-sm text-on-surface mb-2 font-sans">The Competency Architecture Session</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        Deploying the K-12 AI competency framework: teacher dashboards, student development metrics, and district-wide tracking through a 4,000-node hashed ontology. Built on live pilot frameworks, including district deployments modeled on the HISD Future 2 Schools architecture.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 py-6">
                    <div className="text-primary font-bold text-lg">02 <small className="block text-[8px] uppercase text-on-surface-variant tracking-widest">Governance</small></div>
                    <div>
                      <h4 className="font-headline font-bold text-sm text-on-surface mb-2 font-sans">The Regent &amp; Governance Forum</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        High-level policy and structural briefing: integration of decentralized professional identities via Sovereign Passports, curriculum modernization, and the long-term impact of the 40/40/20 Dividend Engine on public infrastructure and academic funding models.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 py-6">
                    <div className="text-primary font-bold text-lg">03 <small className="block text-[8px] uppercase text-on-surface-variant tracking-widest">Deployment</small></div>
                    <div>
                      <h4 className="font-headline font-bold text-sm text-on-surface mb-2 font-sans">Pilot Validation &amp; Planning</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        Initial validation and deployment planning for regional pilot programs — local school district and university ecosystem integrations, with systemic frameworks to counter academic fraud and produce authenticated, verifiable student exit portfolios.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* THE PAYLOAD */}
              <section className="space-y-8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-primary font-bold">03</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">The Instruments</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-normal">Measurement built for the academy.</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <strong className="text-lg font-bold text-on-surface">AI-ED™ / AIOI-ED™</strong>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-full">Academic Index</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-on-surface font-sans mb-2">AI Orchestrator Sub-Index · Education</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        A specialized metric for learning architects: AI pedagogy, personalization logic for individual learning paths, automated curricula management, and integrity management across grading and plagiarism.
                      </p>
                      <div className="flex gap-4 mt-4 text-[10px] tracking-wide text-on-surface-variant">
                        <span>EFFICIENCY <strong className="text-primary font-bold">40%</strong></span>
                        <span>SECURITY <strong className="text-primary font-bold">30%</strong></span>
                        <span>DEBUG_SPEED <strong className="text-primary font-bold">30%</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <strong className="text-lg font-bold text-on-surface">AICI™</strong>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-full">Student Baseline</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-on-surface font-sans mb-2">AI Competency Index</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        Establishes a baseline for personal AI productivity and safe, ethical tool use — measurable, auditable AI readiness for every student and every faculty member.
                      </p>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <strong className="text-lg font-bold text-on-surface">AIOI™</strong>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-full">Administrative Layer</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-on-surface font-sans mb-2">AI Orchestrator Score</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        Strategic measurement of system management and Human-in-the-Loop deployment for administrators and department leadership managing institutional AI workflows.
                      </p>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <strong className="text-lg font-bold text-on-surface">PASSPORT</strong>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-full">Exit Artifact</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-on-surface font-sans mb-2">The Sovereign Passport</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        Authenticated, verifiable student exit portfolios — decentralized professional identities that carry ledger-verified competency beyond the diploma, mapped directly to workforce demand.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ADMISSION PROTOCOL */}
              <section className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-xs text-primary font-bold">04</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Admission Protocol</span>
                </div>
                <h3 className="font-display text-2xl font-normal mb-8">By institutional invitation only.</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl mb-8">
                  There is no ticket to buy. Seats are underwritten entirely by regional educational grants and foundation funding — which removes the procurement bottleneck for public institutions while preserving the closed-door standing of the room. Admission runs through the Institutional Nomination Protocol.
                </p>

                <div className="bg-surface border border-outline-variant/15 rounded-2xl overflow-hidden font-mono text-xs">
                  <div className="divide-y divide-outline-variant/10">
                    <div className="grid grid-cols-[180px_1fr] p-4">
                      <span className="text-[10px] text-on-surface-variant uppercase font-bold">Interface</span>
                      <span>BY APPLICATION ONLY · SOVEREIGN NOMINATION</span>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] p-4">
                      <span className="text-[10px] text-on-surface-variant uppercase font-bold">Cost to Institution</span>
                      <span>$0 — COMPLIMENTARY VIA INVITE (SEAT VALUE: $1,250)</span>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] p-4">
                      <span className="text-[10px] text-on-surface-variant uppercase font-bold">Underwriting</span>
                      <span>COVERED BY REGIONAL EDUCATIONAL GRANTS &amp; FOUNDATION FUNDING</span>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] p-4">
                      <span className="text-[10px] text-on-surface-variant uppercase font-bold">Nomination Requires</span>
                      <span>STUDENT FOOTPRINT · CURRENT LMS STACK · PILOT TIMELINES</span>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] p-4">
                      <span className="text-[10px] text-on-surface-variant uppercase font-bold">Payload</span>
                      <span>PILOT FRAMEWORK BLUEPRINT · GOVERNANCE MODEL · REGIONAL ROUNDTABLE SEAT</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* FOOT CTA */}
              <section className="bg-inverse-surface text-inverse-on-surface p-8 md:p-12 rounded-3xl relative overflow-hidden">
                <div className="absolute top-[-30%] right-[-15%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.15),transparent_65%)] pointer-events-none" />
                <h3 className="font-display text-2xl md:text-3xl font-light leading-tight mb-6">
                  An elite appointment — not a free webinar.
                </h3>
                <div className="flex flex-wrap gap-4 relative z-10">
                  <a href="mailto:hello@tenured.ai?subject=Institutional%20Nomination%20Protocol" className="px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-mono text-xs font-bold tracking-widest uppercase shadow-xl hover:opacity-95 transition-all">
                    Submit Nomination Protocol →
                  </a>
                </div>
              </section>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB: RECRUITERS
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'recruiters' && (
            <div className="space-y-16 pb-24 max-w-7xl mx-auto px-4 md:px-8">
              
              {/* HERO */}
              <section className="py-10 relative overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.12),transparent_70%)] pointer-events-none" />
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase bg-primary/10 text-primary px-3 py-1.5 rounded-full font-bold mb-6">
                  LIQUIDITY_04 // RECRUITER NODE
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight max-w-4xl mb-6">
                  Talent Liquidity Node. <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent italic font-medium">Acquire stress-validated talent</span> directly from the ledger.
                </h2>
                <p className="text-on-surface-variant max-w-3xl text-sm leading-relaxed mb-8">
                  Stop chasing unverified résumés and self-reported skills. The B-300 Recruiter Battle circuit allows verified recruiter seats to bid on anonymized, stress-validated candidate briefs. Secure raw engineering telemetry and finalize hires via on-ledger escrow.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 font-mono text-xs">
                  <div>FORMAT<strong className="block text-sm text-on-surface font-bold mt-1">Escrowed Auction</strong></div>
                  <div>AUCTION TYPE<strong className="block text-sm text-on-surface font-bold mt-1">B-300 Snipe-Protected</strong></div>
                  <div>REVEAL CREDITS<strong className="block text-sm text-on-surface font-bold mt-1">SaaS Consumption</strong></div>
                  <div>COHORT ACCESS<strong className="block text-sm text-primary font-bold mt-1">I-100 Invitation</strong></div>
                </div>
              </section>

              {/* THE PREMISE & TERMINAL */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-primary font-bold">01</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">The Premise</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-normal leading-tight">Stop chasing unverified claims. Bid on actual engineering telemetry.</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Recruiters spend days filter-searching keyword profiles. On the Tenured AI ledger, candidates are pre-audited. Recruiters place secure bids on candidates based on high-integrity telemetry: AICI, AIOI, and AIBS build scores. Anti-snipe protection ensures fair value capture, and candidate reveals are fully opt-in.
                  </p>
                </div>
                
                <div className="bg-[#16140F] rounded-2xl p-1 overflow-hidden shadow-2xl font-mono text-xs text-[#D8D2C4]">
                  <div className="bg-surface-container-low/10 px-4 py-2 flex items-center gap-2 border-b border-white/5">
                    <span className="w-2.5 h-2.5 rounded-full bg-error/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary-container/40" />
                    <span className="text-[10px] text-inverse-on-surface/40 ml-4 font-bold uppercase tracking-widest">B-300 --bidding-tape</span>
                  </div>
                  <div className="p-6 space-y-3 leading-relaxed">
                    <div><span className="text-[#8A8474]">$</span> tenured --bids --lot 094</div>
                    <div className="text-primary-container">▸ Lot 094 · Senior Quantitative Forecasting Engineer</div>
                    <div className="text-[#8A8474]">▸ R-0027 · Tate &amp; Howell ......... $348,000 [Snipe]</div>
                    <div className="text-[#8A8474]">▸ R-0019 · Bennett Search ........ $326,000 [Standard]</div>
                    <div className="text-[#8A8474]">▸ R-0011 · Aerie Talent ........... $312,000 [Protected]</div>
                    <div className="text-emerald-400">▸ system status: B-300 anti-snipe window active [+120s]</div>
                  </div>
                </div>
              </section>

              {/* EVENT MECHANICS */}
              <section className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-xs text-primary font-bold">02</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Corridor Mechanics</span>
                </div>
                <h3 className="font-display text-2xl font-normal mb-8">What happens inside the Recruiter Bidding Corridor.</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl mb-8">
                  Get Tenured operates regional talent nodes (Houston, New York) where verified talent is auctioned to high-intent recruiter seats.
                </p>

                <div className="divide-y divide-outline-variant/20 font-mono text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 py-6">
                    <div className="text-primary font-bold text-lg">01 <small className="block text-[8px] uppercase text-on-surface-variant tracking-widest">Lot opens</small></div>
                    <div>
                      <h4 className="font-headline font-bold text-sm text-on-surface mb-2 font-sans font-semibold">Pre-Notification &amp; Reveal</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        Verified recruiter seats receive notification 2 hours before a lot opens. The lot reveals the candidate's Triple-85 status, corridor, AICI/AIOI/AIBS scores, and Genesis Institution — but hides personal identity. Reveal credits cost 2 to enter.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 py-6">
                    <div className="text-primary font-bold text-lg">02 <small className="block text-[8px] uppercase text-on-surface-variant tracking-widest">Bidding</small></div>
                    <div>
                      <h4 className="font-headline font-bold text-sm text-on-surface mb-2 font-sans font-semibold">Anti-Snipe Escrowed Bids</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        Each bid is escrowed in the B-300 smart contract until settlement. Bids increment in $4K minimums. Any bid within 120s of close triggers a 120-second extension, preventing sub-second automated sniping while preserving manual strategy.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 py-6">
                    <div className="text-primary font-bold text-lg">03 <small className="block text-[8px] uppercase text-on-surface-variant tracking-widest">Settlement</small></div>
                    <div>
                      <h4 className="font-headline font-bold text-sm text-on-surface mb-2 font-sans font-semibold">Decentralized Execution</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        Winning recruiter's escrow releases against the candidate's reveal. The 40/40/20 split executes on-chain. Performance Bonds issue at the hiring enterprise's election, and the battle is permanently archived on the Replay surface.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* THREE-PHASE PRIVACY */}
              <section className="space-y-8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-primary font-bold">03</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">The Privacy Protocol</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-normal text-on-surface">The 3-Phase Privacy-Preserving Match Protocol.</h3>
                <p className="text-on-surface-variant text-xs max-w-2xl leading-relaxed">
                  PAT-013 Module 1354 inverts the power dynamic of existing talent networks. Recruiters pay to reach; candidates choose to be reached.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15">
                    <span className="inline-block bg-surface-container-high text-on-surface-variant text-[9px] font-bold px-2.5 py-1 rounded-full mb-4">PHASE 1</span>
                    <h4 className="font-headline font-bold text-sm text-on-surface font-sans mb-2 font-semibold">Match Count</h4>
                    <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                      Recruiter runs a Boolean search. Result shows the total matching counts (e.g. "42 matches at Tier 4+ in Houston-Energy corridor"). Absolutely zero identifying information is disclosed. Free.
                    </p>
                  </div>

                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15">
                    <span className="inline-block bg-surface-container-high text-on-surface-variant text-[9px] font-bold px-2.5 py-1 rounded-full mb-4">PHASE 2</span>
                    <h4 className="font-headline font-bold text-sm text-on-surface font-sans mb-2 font-semibold">De-Identified Profiles</h4>
                    <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                      Detailed telemetry dashboards become visible (e.g., "Candidate c0001 · Tier 5 · AIBS 87"). All scores, calibrations, and verification sources are exposed. No names, contacts, or employers are shown. Included with base subscription.
                    </p>
                  </div>

                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15">
                    <span className="inline-block bg-gradient-to-r from-primary to-primary-container text-white text-[9px] font-bold px-2.5 py-1 rounded-full mb-4">PHASE 3</span>
                    <h4 className="font-headline font-bold text-sm text-on-surface font-sans mb-2 font-semibold">Opt-In Reveal</h4>
                    <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                      Recruiter spends a Reveal Credit and submits a structured Hire Brief. Candidate reviews the details of the firm, role, and compensation. If they accept, identity is disclosed. The credit is consumed regardless.
                    </p>
                  </div>
                </div>
              </section>

              {/* COHORT SEATS */}
              <section className="bg-inverse-surface text-inverse-on-surface p-8 md:p-12 rounded-3xl relative overflow-hidden">
                <div className="absolute top-[-30%] right-[-15%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,.15),transparent_65%)] pointer-events-none" />
                <p className="font-mono text-[10px] tracking-[.18em] uppercase text-primary-container font-bold mb-4">
                  § I-100 Launch Cohort · First 100 Verified Recruiters
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-light leading-tight mb-6">
                  First 100 verified recruiters receive a $24K-equivalent credit pack.
                </h3>
                <div className="flex flex-wrap gap-4 relative z-10">
                  <a href="mailto:hello@tenured.ai?subject=I-100%20Recruiter%20Seat" className="px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-mono text-xs font-bold tracking-widest uppercase shadow-xl hover:opacity-95 transition-all">
                    Claim Verified Recruiter Seat →
                  </a>
                  <Link to="/recruiters" className="px-6 py-3.5 rounded-full border border-white/20 text-inverse-on-surface hover:bg-white/5 font-mono text-xs font-bold tracking-widest uppercase transition-all">
                    Go to Live Recruiter Page
                  </Link>
                </div>
              </section>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* FOOTER CALL TO ACTION */}
      <section className="bg-surface-container-low border-t border-outline-variant/10 py-16 px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-display text-2xl md:text-3xl font-light text-on-surface">
            Cognitive sovereignty, verified.
          </h2>
          <p className="text-xs text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Register for a regional node calibration or submit an institutional application to deploy verified competency telemetry in your ecosystem.
          </p>
          <div className="flex justify-center gap-4 flex-wrap pt-4">
            <a href="mailto:hello@tenured.ai?subject=Events%20and%20Briefings" className="px-6 py-3 rounded-full bg-primary text-on-primary font-mono text-[10px] tracking-widest uppercase font-bold shadow-md hover:opacity-90 transition-all">
              Initiate Registration
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
