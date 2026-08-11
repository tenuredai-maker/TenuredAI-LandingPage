import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  ArrowRight, 
  Activity, 
  Zap, 
  TrendingUp, 
  FileText, 
  Database,
  Building,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CommercialUse() {
  const [selectedVertical, setSelectedVertical] = useState<'healthcare' | 'energy' | 'financial' | 'regulatory'>('healthcare');

  const verticals = {
    healthcare: {
      id: 'healthcare' as const,
      num: "VERTICAL I",
      title: "Healthcare Diagnostic Integrity Layer",
      tagline: "The malpractice shield, sold to the insurer rather than the doctor.",
      desc: "Standard medical AI returns a result but no account of how it arrived there, leaving the hospital to defend a clinical black box. The Diagnostic Integrity Layer converts every AI-assisted decision into a recorded, coherence-scored, credential-bound clinical event.",
      arrYear5: "$72.4M",
      ip: ["PAT-002 · Telemetry & CA Monitoring", "PAT-017 · Modal Logic Reasoning", "PAT-004 · Four-Agent Council", "PAT-005 · Credential Framework"],
      mechanics: [
        { title: "The Diagnostic Flight Recorder", desc: "Every diagnostic session captures a four-channel TSS and a live Coherence Anomaly score. If model logic drifts, autopilot disengages before recommendations reach the clinician." },
        { title: "Clinical Necessity Gates", desc: "Modal logic enforces groundings. The model cannot recommend therapies it cannot ground in the patient's actual labs, preventing hallucinated treatments." },
        { title: "The Medical Council", desc: "Expander proposes, Critic hunts differentials, Auditor checks FDA guidance/protocol, and Synthesizer returns a confidence-weighted decision." }
      ],
      instrumentTitle: "The Safety Dividend",
      instrumentRate: "25% of verified premium reduction",
      unitEconomics: [
        { label: "Reference system beds", val: "1,400" },
        { label: "Annual MPL premium", val: "$28.0M" },
        { label: "Verified premium reduction", val: "17.5%" },
        { label: "Annual saving to hospital", val: "$4.90M" },
        { label: "Tenured AI share (25%)", val: "$1.225M / yr", highlight: true }
      ],
      secondaryInstrument: "Practitioner Integrity Fee ($180/clinician · ~$900K/yr per system)",
      simulation: {
        title: "CLINICAL EVENT RECORD · CASE 8821-A",
        lines: [
          { label: "inference_ts", val: "2026-03-21T14:02:11.442Z" },
          { label: "supervising_cred", val: "MD-4471 · active", accent: true },
          { label: "CA_score", val: "0.91 · nominal · above 0.65 floor", success: true },
          { label: "necessity_check", val: "□ PASS · 4 lab markers matched", success: true },
          { label: "council_dissent", val: "Critic raised 2 differentials · logged" }
        ],
        footer: "DEFENSIBLE POSTURE: system nominal · human in loop · evidence-grounded"
      }
    },
    energy: {
      id: 'energy' as const,
      num: "VERTICAL II",
      title: "Energy Sector Resilience Layer",
      tagline: "Double the grid through code, and take a share of the capacity you unlock.",
      desc: "The grid runs near 30% utilization because operators hold massive safety buffers against cascade failures. Tenured AI models grid capacity as a dynamic decay graph, enabling operators to narrow margins safely and dispatch dormant capacity.",
      arrYear5: "$95.0M",
      ip: ["PAT-003 · Decay Graph & Cascades", "PAT-002 · Telemetry & CA Monitoring", "PAT-017 · Modal Logic Reasoning", "PAT-004 · Four-Agent Council"],
      mechanics: [
        { title: "Cascade Prevention", desc: "Modeling the grid as a dynamic decay graph. Calibration identifies when a localized failure risks propagation, triggering isolation before substations drop." },
        { title: "Predictive Telemetry", desc: "Substation sensors feed coherence monitoring on the grid's digital twin. Logic drops signal physical component failures 4-6 hours in advance." },
        { title: "Verified Reconfiguration", desc: "Every proposed maintenance reroute passes a necessity check. Critic simulates extreme load/attack; Auditor confirms NERC/FERC compliance." }
      ],
      instrumentTitle: "The Capacity Fee",
      instrumentRate: "6% of verified unlocked value",
      unitEconomics: [
        { label: "Reference IOU nameplate", val: "12 GW" },
        { label: "Verified utilization gain", val: "+3.5 pts" },
        { label: "Effective capacity unlocked", val: "420 MW" },
        { label: "Avoided peaker capital (annualized)", val: "$23.1M" },
        { label: "Avoided outage cost (2 events)", val: "$36.0M" },
        { label: "Tenured AI share (6%)", val: "$3.55M / yr", highlight: true }
      ],
      secondaryInstrument: "ISO / RTO Governance Licence ($6.2M/operator · $31M/yr Year 5 target)",
      simulation: {
        title: "GRID TELEMETRY · CORRIDOR NODE SI-11",
        lines: [
          { label: "nameplate", val: "12,400 MW" },
          { label: "utilization_verified", val: "33.3% · +3.5 pts", success: true },
          { label: "effective_unlocked", val: "420 MW", accent: true },
          { label: "necessity_checks", val: "1,104 PASS · 3 BLOCKED", success: true },
          { label: "blocked_reason", val: "thermal limit violation" }
        ],
        footer: "VERIFIED ANNUAL VALUE: $59.1M · avoided capital + avoided outage"
      }
    },
    financial: {
      id: 'financial' as const,
      num: "VERTICAL III",
      title: "Financial Integrity Layer",
      tagline: "Priced against value at risk, not against seats.",
      desc: "Financial AI failure modes result from algorithmic drift—running strategies against manipulated prices or hallucinated data. The Integrity Layer runs pre-flight verification on every action before capital moves, preventing major loss events.",
      arrYear5: "$44.0M",
      ip: ["PAT-017 · Modal Logic Reasoning", "PAT-016 · Dual-Token Economics", "PAT-002 · Telemetry & CA Monitoring", "PAT-004 · Four-Agent Council"],
      mechanics: [
        { title: "Pre-Flight Verification", desc: "Every proposed transaction is verified against live constraints—exposure limits, slippage ceilings, and liquidity sources—before execution." },
        { title: "Drift Detection", desc: "Continuous coherence checks identify when execution models shift from active reasoning to shallow pattern-matching. Falls below floors halt the desk." },
        { title: "Adversarial Council", desc: "On strategy shifts, the Critic simulates flash-loans, oracle manipulation, and extreme drawdowns. The Auditor matches plans to risk mandates." }
      ],
      instrumentTitle: "Protected Value Fee",
      instrumentRate: "Basis points on assets under verification",
      unitEconomics: [
        { label: "Institutional / TradFi rate", val: "1.5 bps / yr" },
        { label: "Protocol / DeFi TVL rate", val: "5.0 bps / yr" },
        { label: "Year 5 TradFi assets under verification", val: "$220B" },
        { label: "Year 5 DeFi TVL under verification", val: "$22B" },
        { label: "Blended Year 5 Revenue", val: "$44.0M / yr", highlight: true }
      ],
      secondaryInstrument: "Data Position Calibrator (utilizes DeFi telemetry to refine coherence algorithms across all other verticals)",
      simulation: {
        title: "PRE-FLIGHT VERIFICATION GATE · DESK ALPHA-3",
        lines: [
          { label: "actions_proposed", val: "184,220" },
          { label: "necessity_PASS", val: "184,109", success: true },
          { label: "necessity_BLOCK", val: "111", accent: true },
          { label: "coherence_halts", val: "2 · auto-resumed on recovery" },
          { label: "notional_blocked", val: "$412.7M", accent: true }
        ],
        footer: "VALUE-AT-RISK PREVENTED: reported to risk committee weekly"
      }
    },
    regulatory: {
      id: 'regulatory' as const,
      num: "VERTICAL IV",
      title: "Regulatory Compliance Framework",
      tagline: "The audit is the cost. We make the audit a build artifact.",
      desc: "Manual compliance runs $250K–$500K per model annually. For multinationals running hundreds of high-risk models, exposure under the EU AI Act ranges up to 7% of global turnover. The framework generates compliance logs continuously as a by-product.",
      arrYear5: "$94.6M",
      ip: ["PAT-004 · Four-Agent Council", "PAT-017 · Modal Logic Reasoning", "PAT-008 · ZK Session Isolation", "PAT-005 · Credential Framework"],
      mechanics: [
        { title: "EU AI Act Art. 14 Oversight", desc: "Four-Agent Council filters decisions; Critic & Auditor prepare CA reports for supervisors. Gates halt systems if supervisors are absent." },
        { title: "EU AI Act Art. 15 Robustness", desc: "Modal logic verifies systems cannot enter unsafe logical states. ZK session isolation contains threats at container borders." },
        { title: "NIST RMF Automation", desc: "Provides automated mapping of cascade exposure, ontology generation, and credential allocation for service accounts." }
      ],
      instrumentTitle: "Regulatory Integrity Fee",
      instrumentRate: "Per model, per year",
      unitEconomics: [
        { label: "List rate (1-25 models)", val: "$50,000 / yr" },
        { label: "Tier 2 rate (26-100 models)", val: "$38,000 / yr" },
        { label: "Tier 3 rate (100+ models)", val: "$32,000 / yr" },
        { label: "Reference multinational (200 models)", val: "$6.4M / yr" },
        { label: "Buyer's manual alternative", val: "$50M–$100M", highlight: true }
      ],
      secondaryInstrument: "Fastest-compounding vertical due to hard EU AI Act compliance timelines starting in 2026",
      simulation: {
        title: "ONE-CLICK AUDIT · COMPLIANCE PACKET",
        lines: [
          { label: "scope", val: "MODEL-0442 · high-risk · EU + US" },
          { label: "oversight_events", val: "14,882 logged · 14,882 attested", success: true },
          { label: "halt_events", val: "7 · all safe-state · documented", success: true },
          { label: "signature", val: "non-repudiable · TS-003", accent: true },
          { label: "manual_equivalent", val: "~340 analyst-hours · $312K" }
        ],
        footer: "PACKET STATUS: signed · regulator-ready · immutably anchored"
      }
    }
  };

  const selected = verticals[selectedVertical];

  return (
    <div className="pt-24 pb-20 bg-background text-on-surface overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-32">
        
        {/* Slide 1: Cover / Hero */}
        <header className="relative py-12 md:py-20 border-b border-outline-variant/10 text-center space-y-8">
          <div className="flex justify-center items-center gap-2">
            <span className="font-mono text-xs text-primary uppercase tracking-[0.2em]">DECK 05 / 10 · COMMERCIAL VERTICALS</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
            One verification kernel. <span className="italic text-primary">Four regulated markets.</span>
          </h1>
          <p className="font-body text-on-surface-variant font-light text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            The academic and state channels prove the ledger. POINT-01 pointed at industries where an unverified AI decision is not a minor bug, but a liability event. The buyer is not a technology budget — the buyer is a risk budget.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
            {[
              { title: "Healthcare Integrity", val: "$72.4M", desc: "Safety Dividend model" },
              { title: "Energy Resilience", val: "$95.0M", desc: "Capacity share pricing" },
              { title: "Financial Integrity", val: "$44.0M", desc: "Protected Value basis pts" },
              { title: "Regulatory Compliance", val: "$94.6M", desc: "Continuous model audit" }
            ].map((v, i) => (
              <div key={i} className="bg-surface-container-low border border-outline-variant/10 p-6 rounded-2xl text-center space-y-2 hover:border-primary/20 transition-all">
                <span className="text-[10px] font-mono text-outline uppercase tracking-wider block">{v.title}</span>
                <span className="text-2xl md:text-3xl font-headline font-bold text-primary block">{v.val}</span>
                <span className="text-[10px] text-on-surface-variant font-light block">{v.desc}</span>
              </div>
            ))}
          </div>
        </header>

        {/* Slide 2: The Thesis */}
        <section className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">02 · THE THESIS</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">We do not sell AI. We sell the proof that the AI was not guessing.</h2>
            <p className="text-on-surface-variant font-light leading-relaxed">
              Every regulated enterprise has already deployed AI. None can defend its decisions. The gap between deployment and defensibility is where the risk lies. The underlying question is identical across all verticals: can you demonstrate, after the fact, that the system was operating within nominal parameters at the exact moment of the decision?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-1">
                <h4 className="font-headline font-bold text-sm text-primary">Risk Budgets First</h4>
                <p className="text-xs text-on-surface-variant font-light">CIOs negotiate software seats. Insurers and risk committees negotiate losses. Our instruments price against the latter, avoiding the IT queue.</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-headline font-bold text-sm text-primary">Shared Kernel Architecture</h4>
                <p className="text-xs text-on-surface-variant font-light">Adapters are domain-specific; the core telemetry, modal logics, and multi-agent consensus components are identical, yielding extreme margins.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-surface-container-low border border-outline-variant/15 p-8 rounded-[2rem] space-y-6">
            <h3 className="font-headline font-bold text-lg">Shared Verification Kernel</h3>
            <div className="space-y-4">
              {[
                { name: "PAT-002", label: "Telemetry & CA Flight Recorder" },
                { name: "PAT-017", label: "Modal Logic Necessity Verification" },
                { name: "PAT-004", label: "Four-Agent Consensus Council" },
                { name: "PAT-003", label: "Decay Graph Cascade Modeling" }
              ].map((k, idx) => (
                <div key={idx} className="flex justify-between items-center bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/10">
                  <span className="font-mono text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">{k.name}</span>
                  <span className="text-xs text-on-surface-variant font-light">{k.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Slide 3-6: The Verticals (Interactive Showcase) */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">03-06 · MARKETS & MECHANICS</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">The Regulated Verticals</h2>
            
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-3 pt-6">
              {(Object.keys(verticals) as Array<keyof typeof verticals>).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedVertical(key)}
                  className={`px-5 py-3 rounded-full font-headline text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedVertical === key 
                      ? 'gold-gradient text-on-primary shadow-md' 
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {verticals[key].title.split(' ')[0]} {verticals[key].title.split(' ')[1] || ''}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Box: Text and mechanics */}
            <div className="lg:col-span-7 bg-surface-container-low border border-outline-variant/10 p-8 md:p-12 rounded-[2rem] flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <span className="font-mono text-xs text-primary font-bold uppercase tracking-widest">{selected.num}</span>
                <h3 className="font-headline text-3xl font-bold text-on-surface">{selected.title}</h3>
                <p className="font-headline italic text-lg text-primary">{selected.tagline}</p>
                <p className="text-sm text-on-surface-variant font-light leading-relaxed">{selected.desc}</p>
              </div>

              {/* Mechanics list */}
              <div className="space-y-6">
                {selected.mechanics.map((mech, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="font-mono text-xs font-bold text-outline py-0.5">MECH 0{i + 1}</span>
                    <div>
                      <h4 className="font-headline font-bold text-sm text-on-surface">{mech.title}</h4>
                      <p className="text-xs text-on-surface-variant font-light leading-relaxed mt-1">{mech.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* IP Footnote */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-outline-variant/10">
                {selected.ip.map((ipVal, idx) => (
                  <span key={idx} className="font-mono text-[9px] bg-surface-container-high text-outline px-2 py-0.5 rounded">
                    {ipVal}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Box: Simulation & Pricing details */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8">
              {/* Simulation Block */}
              <div className="bg-neutral-950 text-white/90 p-6 rounded-2xl border border-white/5 space-y-4 font-mono text-[10px]">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/40 uppercase tracking-widest text-[8px]">Flight Recorder Emulator</span>
                  <span className="text-[#FFBF00]">{selected.simulation.title}</span>
                </div>
                <div className="space-y-1.5">
                  {selected.simulation.lines.map((line, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-white/40">{line.label}:</span>
                      <span className={line.accent ? 'text-primary-container' : line.success ? 'text-green-400' : 'text-white'}>
                        {line.val}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-white/10 text-center text-[#FFBF00] text-[9px]">
                  {selected.simulation.footer}
                </div>
              </div>

              {/* Unit Economics Block */}
              <div className="bg-surface-container-low border border-outline-variant/10 p-6 rounded-2xl space-y-4">
                <div>
                  <span className="font-mono text-[9px] text-outline uppercase tracking-wider block">{selected.instrumentTitle}</span>
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wide">{selected.instrumentRate}</h4>
                </div>
                
                <div className="space-y-2 border-t border-outline-variant/10 pt-4">
                  {selected.unitEconomics.map((u, idx) => (
                    <div key={idx} className={`flex justify-between text-xs ${u.highlight ? 'bg-surface-container-high p-2 rounded text-primary font-bold' : 'text-on-surface-variant font-light'}`}>
                      <span>{u.label}</span>
                      <span>{u.val}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-[10px] text-outline leading-relaxed border-t border-outline-variant/5">
                  <strong className="text-on-surface">Secondary:</strong> {selected.secondaryInstrument}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 7: Consolidated Stack */}
        <section className="bg-surface-container-high/20 border border-outline-variant/10 p-8 md:p-12 rounded-[2.5rem] space-y-12">
          <div className="text-center space-y-4">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">07 · REVENUE CONSOLIDATION</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">
              $306M modeled ARR by Year 5
            </h2>
            <p className="text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed text-sm">
              These four verticals share one kernel, one telemetry pipeline, one credential framework, and one settlement rail with academic and state channels. The incremental cost is a domain adapter and a sales motion, yielding extreme scalability.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              { vertical: "Energy Resilience", rate: "$95.0M", fill: "w-full", label: "Capacity Fee · ISO licence" },
              { vertical: "Regulatory Compliance", rate: "$94.6M", fill: "w-[99%]", label: "Integrity Fee · per model" },
              { vertical: "Healthcare Integrity", rate: "$72.4M", fill: "w-[76%]", label: "Safety Dividend · practitioner fee" },
              { vertical: "Financial Integrity", rate: "$44.0M", fill: "w-[46%]", label: "Protected Value · basis points" }
            ].map((v, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <div className="md:col-span-4">
                  <h4 className="text-sm font-bold text-on-surface leading-tight">{v.vertical}</h4>
                  <span className="text-[10px] font-mono text-outline uppercase tracking-wider block">{v.label}</span>
                </div>
                <div className="md:col-span-6 bg-surface-container-high h-6 rounded-lg overflow-hidden relative">
                  <div className={`h-full gold-gradient ${v.fill}`}></div>
                </div>
                <div className="md:col-span-2 text-right font-mono font-bold text-primary">
                  {v.rate}
                </div>
              </div>
            ))}
          </div>

          {/* Forecast Disclaimer */}
          <p className="text-[10px] text-outline text-center italic max-w-4xl mx-auto">
            All figures above are modeled projections built from the stated unit economics and adoption assumptions. They are not booked revenue or guaranteed forecasts. Detailed inputs are available in the data room under NDA.
          </p>
        </section>

        {/* Slide 8: Pricing Architecture */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">08 · PRICING PHILOSOPHY</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">We price a share of the loss that does not occur.</h2>
            <p className="text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed">
              Every instrument in our portfolio is denominated in the buyer's risk currency—premium, capacity, exposure, or compliance hours. This avoids procurement seat checks and focuses negotiations on loss avoidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "INSTRUMENT I",
                title: "Risk-share",
                desc: "A percentage of verified, carrier-confirmed savings. Used where insurers underwrite premium reductions (e.g. Healthcare's Safety Dividend). Zero downside for the buyer."
              },
              {
                num: "INSTRUMENT II",
                title: "Value-share",
                desc: "A percentage of grid or capital capacity unlocked. Scales directly with the customer's balance sheet without requiring pricing renegotiations as they expand."
              },
              {
                num: "INSTRUMENT III",
                title: "Displacement fee",
                desc: "A fixed annual fee priced significantly lower than documented manual compliance alternatives (e.g. Regulatory automation list rates vs. analyst audits)."
              }
            ].map((inst, i) => (
              <div key={i} className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-3xl space-y-6 hover:shadow-lg transition-all">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full tracking-widest font-mono">{inst.num}</span>
                <h3 className="font-headline font-bold text-lg text-on-surface">{inst.title}</h3>
                <p className="text-xs text-on-surface-variant font-light leading-relaxed">{inst.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Slide 9: Entry Sequence */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">09 · MARKET ENTRY</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">Sequence builds credibility.</h2>
            <p className="text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed">
              The entry timeline is structured by forcing function, rather than market size. Each wave constructs the compliance documentation, telemetry validation, or carrier backing the next phase requires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { wave: "2026 · WAVE 1", title: "Regulatory Compliance", desc: "EU AI Act obligations bite. 6 design partners priced on displacement. Generates reference logs for subsequent verticals.", target: "$6.6M ARR" },
              { wave: "2026-27 · WAVE 2", title: "Energy Resilience", desc: "2 utility pilots in the Houston corridor. Shadow-mode cascade prediction builds real-time validation profiles.", target: "$7.0M ARR" },
              { wave: "2027-28 · WAVE 3", title: "Healthcare Integrity", desc: "Launches after insurance carrier validation. SAFETY dividends are calculated based on model telemetry.", target: "$26.4M ARR" },
              { wave: "2028-30 · WAVE 4", title: "Financial Integrity & Scale", desc: "Longest cycle, highest exposure desks. Calibrated by thresholds proven in three previous verticals.", target: "$306M ARR" }
            ].map((v, i) => (
              <div key={i} className="bg-surface-container-low border border-outline-variant/10 p-6 rounded-2xl relative shadow-sm hover:border-primary/20 transition-all">
                <span className="text-[9px] font-mono font-bold text-primary block mb-2">{v.wave}</span>
                <h3 className="font-headline font-bold text-sm text-on-surface mb-2">{v.title}</h3>
                <p className="text-xs text-on-surface-variant font-light leading-relaxed mb-4">{v.desc}</p>
                <div className="pt-2 border-t border-outline-variant/10 font-mono text-[10px] font-bold text-[#FFBF00] tracking-wider">
                  {v.target}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Slide 10: The Ask / Partner Structure */}
        <section className="bg-surface-container-low border border-outline-variant/15 p-8 md:p-16 rounded-[2.5rem] text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <span className="font-mono text-xs text-primary uppercase tracking-widest block">10 · COHORT INVITATION</span>
          <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">One model. One quarter. <span className="italic text-primary">One measurement protocol.</span></h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-light text-sm md:text-base leading-relaxed">
            Every partnership opens through the same constraint: a single model desk or corridor node, monitored for one quarter, scoped against an agreed measurement protocol. No enterprise migration or upfront multi-year commitments.
          </p>
          
          <div className="pt-6">
            <Link
              to="/request-access"
              className="gold-gradient text-on-primary px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all inline-flex items-center gap-2 shadow-2xl"
            >
              Request Access <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="pt-8 border-t border-outline-variant/10 text-xs text-outline font-mono">
            Tenured AI Enterprise Risk Partnerships · enterprise@tenured.ai · Houston, TX
          </div>
        </section>

      </div>
    </div>
  );
}
