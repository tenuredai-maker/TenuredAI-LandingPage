import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Brain, 
  CheckCircle, 
  Lock, 
  Shield, 
  X, 
  Award, 
  Flame, 
  AlertTriangle,
  ChevronDown, 
  HelpCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SelfLearners() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Will my professor or employer know my score?",
      a: "No. Faculty and employers see aggregate cohort calibration only. Your individual Command Authority, Triple-Threat scores, and Passport contents are visible only to you (and to recruiters who reveal credits to see you). Your GPA, transcript, and your Passport are independent records."
    },
    {
      q: "What if I bomb a Hard-Gate?",
      a: "Hard-Gates can be retaken. A failed Gate doesn't appear on your Passport — only cleared Gates mint Consensus Certificates. The failure stays in your private practice history for your own learning. The recruiter never sees it."
    },
    {
      q: "Does this replace my degree or certificate?",
      a: "No. It complements it. Your degree or course certificates prove that you completed a curriculum. Your Passport certifies what you can actually do. Employers want both — for different reasons. The platform's bet is that verified capability is what wins the offer."
    },
    {
      q: "Can I cheat the Forge drills?",
      a: "Yes, but it doesn't help. Drill scores alone don't qualify you for sourcing — the cross-surface attribution filter (which recruiters use by default) excludes profiles whose AICI is drill-only. The Hard-Gate is what counts. The drill is just how you train for it."
    },
    {
      q: "What if Tenured AI fails as a company?",
      a: "Your Passport is anchored to Polygon mainnet under your decentralized ID (DID). It is independent of Tenured AI's servers. If we shut down tomorrow, every Consensus Certificate you've earned is still cryptographically verifiable by any employer, anywhere, forever. Open-source verification tools are public to guarantee this case."
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-background text-on-surface overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-32">
        
        {/* SLIDE 1 · HERO */}
        <header className="relative py-12 md:py-20 border-b border-outline-variant/10 text-center space-y-8">
          <div className="flex justify-center items-center gap-2">
            <span className="font-mono text-xs text-primary uppercase tracking-[0.2em]">DECK 05 / 13 · SELF-LEARNERS & STUDENTS</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
            Graduate with proof. <span className="italic text-primary">Not just a degree.</span>
          </h1>
          <p className="font-body text-on-surface-variant font-light text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            A briefing for undergraduate students and independent self-learners on Tenured AI — the verification platform where you build a Sovereign Passport, walk into the hiring market with a portable, employer-trusted credential, and own it for life.
          </p>
          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <Link 
              to="/request-access"
              className="gold-gradient text-on-primary px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform inline-flex items-center gap-2 shadow-lg"
            >
              Start Your Passport <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="#the-cost"
              className="px-8 py-4 bg-surface-container hover:bg-surface-container-high rounded-xl font-bold text-sm uppercase tracking-widest text-on-surface transition-colors inline-flex items-center"
            >
              Pricing Details
            </a>
          </div>
          <div className="pt-12 font-mono text-[10px] text-outline tracking-widest uppercase">
            PREPARED FOR · INDEPENDENT SOVEREIGNS · 2026
          </div>
        </header>

        {/* SLIDE 2 · THE SIGNAL PROBLEM */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">02 · THE HONEST TRUTH</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">Your credentials no longer prove what your career needs them to prove.</h2>
            <p className="text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed">
              This isn't a critique of your institution. It's a fact about the world your resume enters when you apply. Generative AI has changed what a take-home assignment, a project, and a coding interview actually verify. The credential gap is real — and so is the opportunity to stand out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "REALITY 01",
                title: "Employers don't trust the signal",
                desc: "75% of HR leaders now prioritize skills-based hiring over legacy degrees. Your dream company already assumes the candidate next to you used an LLM for half their portfolio. The interview loop has gotten longer and more invasive because employers don't believe what they see."
              },
              {
                num: "REALITY 02",
                title: "Your peers are using the LLM too",
                desc: "Even if you don't cheat, your classmates' polished projects look identical to yours from the outside. You are competing on the wrong signal. The candidates who refuse to use AI as a crutch are penalized in the very metric (resume output) that employers stopped trusting."
              },
              {
                num: "REALITY 03",
                title: "\"AI-skilled\" is now table stakes",
                desc: "Listing \"Python, Claude API, RAG\" on a resume is what listing \"Microsoft Office\" was in 2003. The candidates who differentiate are the ones who can prove how they think, adjust, and audit under adversarial pressure."
              }
            ].map((card, i) => (
              <div key={i} className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-3xl space-y-6 hover:shadow-lg transition-shadow">
                <span className="inline-block px-3 py-1 bg-error/10 text-error text-[10px] font-bold rounded-full tracking-widest">{card.num}</span>
                <h3 className="font-headline font-bold text-xl text-on-surface">{card.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed font-light">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SLIDE 3 · THE SOVEREIGN PASSPORT */}
        <section className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">03 · THE CREDENTIAL</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">A Sovereign Passport is the proof the hiring market actually wants.</h2>
            <p className="text-on-surface-variant font-light leading-relaxed">
              Every time you clear a Hard-Gate — an adversarial, air-gapped engineering challenge run by a four-agent council — you earn a Consensus Certificate. Each certificate is cryptographically anchored to a public blockchain, contains a forensic record of how you actually worked under pressure, and lives on a Passport you own.
            </p>
            <ul className="space-y-4 font-light text-sm text-on-surface-variant">
              <li className="flex items-start gap-3">
                <span className="text-primary font-mono">•</span>
                <span><strong className="text-on-surface font-bold">Command Authority score:</strong> The composite issued at each Gate — your headline metric.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-mono">•</span>
                <span><strong className="text-on-surface font-bold">Forensic Verification:</strong> Every Hard-Gate you've cleared is sealed and replayable. Recruiters verify without trusting Tenured AI.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-mono">•</span>
                <span><strong className="text-on-surface font-bold">A Career Memory Vault:</strong> Your drill artifacts are preserved forever. You can query your past implementations years down the road.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 bg-neutral-950 text-white p-8 rounded-[2rem] border border-white/5 relative overflow-hidden shadow-2xl space-y-6 font-mono text-xs">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-white/40 uppercase tracking-widest text-[9px]">Sovereign Passport v.4.0</span>
              <span className="text-green-400 text-[10px] animate-pulse">● LIVE SECURE</span>
            </div>
            
            <div className="space-y-2">
              <div className="text-[10px] text-white/40 uppercase tracking-wider">Command Authority Score</div>
              <div className="text-5xl font-bold font-headline text-[#FFBF00] tracking-tight">87</div>
              <div className="text-[10px] text-white/60">Tier 2 Orchestrator · 18 Consensus Certificates</div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10 text-[10px] text-white/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>G-014 · Adversarial RAG · cleared</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>G-008 · Prompt Injection · cleared</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>G-022 · Multi-Agent Consensus · cleared</span>
              </div>
              <div className="flex items-center gap-2 opacity-50">
                <span className="w-2 h-2 rounded-full bg-[#D88828]"></span>
                <span>N-052 · Embedding Models · refreshing (λ decay)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[9px] text-[#FFBF00] tracking-widest">
              <span>✓ ANCHORED · POLYGON</span>
              <span className="text-white/40">ID: DID:KEY:Z6MKT...</span>
            </div>
          </div>
        </section>

        {/* SLIDE 4 · ONBOARDING & TRANSPARENCY */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">04 · TRANSPARENCY</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">You enroll yourself. You can decline at any time.</h2>
            <p className="text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed">
              No institution forces you onto the platform. You opt in personally, through your own account, against a consent screen that itemizes exactly what is shared and with whom. If you decline, you keep your learning path, and no records are altered. It's a system built for personal agency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "STEP 01",
                time: "1 MIN",
                title: "Log in with secure oauth",
                desc: "Initialize connection using Google, Github, or your institution account. Tenured AI never sees a password, never stores one, and never requires a second login credential."
              },
              {
                step: "STEP 02",
                time: "3 MIN",
                title: "Confirm the Consent Ledger",
                desc: "One transparent screen: what gets verified, what's published, what stays private, and what happens if you pause. Granular toggles protect your data by default."
              },
              {
                step: "STEP 03",
                time: "1 MIN",
                title: "Your Passport Mints",
                desc: "Issued to your own decentralized ID. The public side shows verified competency bands with zero personal identifiers until you explicitly authorize a reveal."
              }
            ].map((step, i) => (
              <div key={i} className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-3xl space-y-6 relative">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-outline font-mono uppercase tracking-wider">{step.step}</span>
                  <span className="text-[10px] font-bold text-primary font-mono">{step.time}</span>
                </div>
                <h3 className="font-headline font-bold text-lg text-on-surface">{step.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Separation Table Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface-container-high/40 p-8 md:p-12 rounded-3xl border border-outline-variant/10">
            <div className="space-y-6">
              <span className="font-mono text-[10px] text-[#4F8A6B] font-bold uppercase tracking-widest">Platform Integrity Toggles</span>
              <h3 className="font-headline text-2xl font-bold">What is shared and what remains dark</h3>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                By architectural design, Tenured AI operates with strict cryptographic boundaries. Your profile is dark by default to ensure no candidate is biased, targeted, or exposed without their active permission.
              </p>
            </div>
            <div className="bg-neutral-950 p-6 rounded-2xl border border-white/5 font-mono text-[10px] leading-relaxed text-white/80 space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                <span className="text-white/40 uppercase tracking-widest text-[9px]">Access Telemetry Rules</span>
                <span className="text-[#FFBF00]">v4.0 CONSTRAINED</span>
              </div>
              <div className="flex justify-between"><span className="text-green-400">CAN SHARE</span> <span>Aggregate cohort trajectory benchmarks</span></div>
              <div className="flex justify-between"><span className="text-green-400">CAN SHARE</span> <span>k-anonymous competency distributions</span></div>
              <div className="flex justify-between"><span className="text-red-400">CANNOT VIEW</span> <span>Your individual scores or sub-components</span></div>
              <div className="flex justify-between"><span className="text-red-400">CANNOT VIEW</span> <span>Your custom drills or reasoning responses</span></div>
              <div className="flex justify-between"><span className="text-red-400">CANNOT VIEW</span> <span>Uncompleted or failed Hard-Gate attempts</span></div>
              <div className="pt-2 border-t border-white/10 text-center text-[#FFBF00] text-[9px]">
                NO THIRD-PARTY ACADEMIC OR HISTORIC DATA IS RECORDED.
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 5 · THE DAILY DRILLS */}
        <section className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 bg-surface-container-low border border-outline-variant/15 p-8 rounded-[2rem] space-y-6">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
              <span className="font-mono text-[10px] text-primary font-bold uppercase tracking-wider">Live Forge Emulator</span>
              <span className="flex items-center gap-1 text-[10px] font-mono text-outline"><Flame className="w-3.5 h-3.5 text-[#FF8B7A]" /> 8-day streak</span>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
                <div className="text-[9px] font-mono text-outline uppercase tracking-wider mb-2">Phase 1: Active Recall</div>
                <p className="text-xs font-semibold text-on-surface">"How does a write-ahead log ensure durability in transactional systems?"</p>
              </div>

              <div className="p-4 bg-primary text-on-primary rounded-xl space-y-2">
                <div className="text-[9px] font-mono text-white/60 uppercase tracking-wider">Phase 2: Semantic Compression</div>
                <p className="text-xs font-headline italic">"Writes log entries to disk sequentially before updating the actual database."</p>
                <div className="text-[9px] font-mono text-white/80 text-right">11 words · Validated ✓</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">05 · THE DAILY METHOD</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">Forge drills look like flashcards. They're not.</h2>
            <p className="text-on-surface-variant font-light leading-relaxed">
              The Forge is the platform's daily practice surface — an active recall engine engineered against decay. No multiple choice. You see a prompt, and you answer in your own words. The Mentor verifies your logical progression. Over a semester, you build the decay-resistant baseline that makes Hard-Gates manageable.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div>
                <h4 className="font-headline font-bold text-sm text-primary mb-1">Recall</h4>
                <p className="text-xs text-on-surface-variant font-light">Input your conceptual flow. The Mentor checks your logical reasoning path.</p>
              </div>
              <div>
                <h4 className="font-headline font-bold text-sm text-primary mb-1">Re-state</h4>
                <p className="text-xs text-on-surface-variant font-light">Compress your explanation into 12 words. Forcing density seals it in memory.</p>
              </div>
              <div>
                <h4 className="font-headline font-bold text-sm text-primary mb-1">Refresh</h4>
                <p className="text-xs text-on-surface-variant font-light">Every node decays on a decay rate (λ). Practice updates before it drops.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 6 · HIRING INVERSION */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">06 · THE HIRING INVERSION</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">Recruiters spend credits to talk to you.</h2>
            <p className="text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed">
              Traditional networks turn you into a product, flooding your inbox with low-intent recruiter spam. Tenured AI inverts this. A recruiter who wants to see your details has to spend a real credit. They commit before they contact, ensuring outreach is filtered for genuine interest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-3xl space-y-4">
              <h3 className="font-headline font-bold text-xl text-on-surface">What recruiters see first</h3>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                Before they request a reveal, recruiters see your de-identified stats to protect candidates from bias and spam:
              </p>
              <ul className="space-y-3 font-mono text-xs text-on-surface-variant pt-2">
                <li>• Stable candidate tag (e.g. cNNNN)</li>
                <li>• Command Authority composite score</li>
                <li>• Triple-Threat values (AICI / AIOI / AIBS)</li>
                <li>• Bondable status indicator (Yes / No)</li>
                <li className="text-primary font-bold">• Zero names, zero photos, zero universities</li>
              </ul>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-3xl space-y-4">
              <h3 className="font-headline font-bold text-xl text-on-surface">What a reveal costs them</h3>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                To unlock communication and see your identity, the recruiting node must agree to the platform rules:
              </p>
              <ul className="space-y-3 font-mono text-xs text-on-surface-variant pt-2">
                <li>• 1 Reveal Credit required ($120 market cost)</li>
                <li>• You receive a notification instantly with their details</li>
                <li>• You see the recruiter's company, history, and placement rate</li>
                <li>• You see the role brief and the compensation floor</li>
                <li className="text-primary font-bold">• You can decline: the credit is spent anyway</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SLIDE 7 · LIVE TALENT AUCTION */}
        <section className="bg-surface-container-high/30 border border-outline-variant/10 p-8 md:p-12 rounded-[2rem] grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">07 · B-300 ACTUARIAL MARKET</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">When multiple firms compete, they bid.</h2>
            <p className="text-on-surface-variant font-light leading-relaxed">
              If your scores reach Tier 5 status and you opt in, your profile becomes eligible for the Tenured Candidate Auction. Escrowed bids are placed in a live timed market with snipe protection. Settlement automatically includes an optional Performance Bond — a $150K guarantee to protect the employer if performance falls below verified thresholds. You control the floor; the market defines the ceiling.
            </p>
          </div>
          <div className="lg:col-span-4 bg-neutral-950 p-6 rounded-2xl border border-white/5 space-y-4 font-mono text-[10px] text-white/80">
            <div className="text-center border-b border-white/10 pb-2">
              <span className="text-[#FFBF00] font-bold uppercase tracking-wider">B-300 Auction Console</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between"><span>Candidate ID:</span> <span>c4902</span></div>
              <div className="flex justify-between"><span>Status:</span> <span className="text-green-400">Escrow Locked</span></div>
              <div className="flex justify-between"><span>Current Bid:</span> <span className="text-[#FFBF00] font-bold">$125,000 / yr</span></div>
              <div className="flex justify-between"><span>Floor Minimum:</span> <span>$105,000</span></div>
            </div>
            <div className="pt-2 border-t border-white/10 text-center text-white/40">
              Performance Bond: $150,000 active coverage
            </div>
          </div>
        </section>

        {/* SLIDE 8 · WEB3 SOVEREIGNTY */}
        <section className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 bg-neutral-950 text-white/90 p-8 rounded-[2rem] border border-white/5 space-y-6 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-[#FFBF00] font-bold">Polygon DID Certificate</span>
              <span className="text-white/40 text-[9px]">BLOCK #4890281</span>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-[10px] leading-relaxed">
              {`{"id": "did:polygon:0x71C...","type": "ConsensusCredential","merkleRoot": "0x4a9b...","issued": "2026-08-10"}`}
            </div>
            <div className="text-[10px] text-white/50 leading-relaxed">
              This credential persists independently of Tenured AI servers. It is verifiable via any public RPC node.
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">08 · SOVEREIGN OWNERSHIP</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">You own the Passport. Always.</h2>
            <p className="text-on-surface-variant font-light leading-relaxed">
              Your credentials live on a decentralized ledger under your digital signature (DID). Tenured AI cannot delete, revoke, or condition your access to them. Your practice vault — every audit trail and response — is exportable as signed JSON or PDF at any time.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-sm">
              <div className="space-y-1">
                <span className="font-headline font-bold block text-on-surface">Decentralized</span>
                <p className="text-xs text-on-surface-variant font-light">Anchored on Polygon. Verified via Merkle proof even if platform servers go offline.</p>
              </div>
              <div className="space-y-1">
                <span className="font-headline font-bold block text-on-surface">Redactable</span>
                <p className="text-xs text-on-surface-variant font-light">Three visibility modes (Owner, Recruiter, Public). You toggle what is readable.</p>
              </div>
              <div className="space-y-1">
                <span className="font-headline font-bold block text-on-surface">Portable</span>
                <p className="text-xs text-on-surface-variant font-light">Full data export available. Take your verified history to any platform.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 9 · THE FOUR-YEAR ROADMAP */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">09 · ROADMAP</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">How a Passport gets built across your major.</h2>
            <p className="text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed">
              This isn't a sprint to graduation. It's a gradual baseline-build, woven into the work you already do. The platform integrates with your coursework — never replaces it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { year: "YEAR 1", stage: "Discover", desc: "Optional Forge drills aligned to intro courses. You build a baseline; no public scoring yet. Your AICI starts to take shape. About 10–15 minutes a day." },
              { year: "YEAR 2", stage: "Build", desc: "Refresh Labs aligned to major-required coursework. You earn your first scoped Consensus Certificates. Your Passport starts to look like a professional asset." },
              { year: "YEAR 3", stage: "Prove", desc: "First adversarial Hard-Gate. Real chaos injections, real four-agent council. The Triple-Threat scores stabilize. Your recruiter sourcing eligibility opens." },
              { year: "YEAR 4", stage: "Graduate", desc: "Senior-tier Adversarial Audit Gates. Triple-85 status if your scores cross. Your Passport walks across the stage with you — and into the job market." }
            ].map((step, i) => (
              <div key={i} className="bg-surface-container-low border border-outline-variant/15 p-6 rounded-2xl relative shadow-sm">
                <span className="absolute top-4 right-4 font-mono text-[10px] font-bold text-primary">{step.year}</span>
                <h3 className="font-headline font-bold text-lg text-on-surface mb-2 mt-4">{step.stage}</h3>
                <p className="text-xs text-on-surface-variant font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SLIDE 10 · COMPARATIVE COMPARISON */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">10 · PLATFORM COMPARATIVE</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">None of them carry forward into your career.</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-outline-variant/10 rounded-2xl overflow-hidden shadow-md">
              <thead>
                <tr className="bg-surface-container-high/60 border-b border-outline-variant/10 font-mono text-[10px] uppercase text-outline tracking-wider">
                  <th className="p-4">Platform</th>
                  <th className="p-4">What it does for you</th>
                  <th className="p-4">What it doesn't do</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 font-body text-xs text-on-surface-variant">
                <tr>
                  <td className="p-4 font-bold text-on-surface">LinkedIn</td>
                  <td className="p-4">You post a profile and hope recruiters notice it.</td>
                  <td className="p-4 text-error">Self-reported skills. No verification. No portable proof. Easily spammed inbox.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-on-surface">Handshake</td>
                  <td className="p-4">University-curated postings during your job search.</td>
                  <td className="p-4 text-error">Useful while you're a student. Goes dormant after graduation. Resume does the work.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-on-surface">Course Certificates (Coursera, etc.)</td>
                  <td className="p-4">Completion proof for an online course.</td>
                  <td className="p-4 text-error">Completion is not competency. Employers know it. Adding 12 doesn't shift the salary signal.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-on-surface">Coding Portfolios (GitHub, etc.)</td>
                  <td className="p-4">Public code files you've committed.</td>
                  <td className="p-4 text-error">AI handles most writing now; employers know. The "code is your resume" era ended in 2023.</td>
                </tr>
                <tr className="bg-surface-container-high/20 font-semibold text-on-surface">
                  <td className="p-4 text-primary font-bold">Tenured AI Passport</td>
                  <td className="p-4">Verified Consensus Certificates, Command Authority, secure auction eligibility.</td>
                  <td className="p-4 text-primary">Survives graduation. Portable. Underwritten by performance bonds.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SLIDE 11 · TRANSPARENT COST & PRICING */}
        <section id="the-cost" className="space-y-12">
          <div className="text-center space-y-4">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">11 · TRANSPARENT COST</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">Access options. Billed clearly.</h2>
            <p className="text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed">
              We do not bury costs. The Sovereign Access Fee is transparently disclosed. There are three categories of billing depending on your enrolment status:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-3xl space-y-6">
              <span className="inline-block px-3 py-1 bg-[#4F8A6B]/15 text-[#4F8A6B] text-[10px] font-bold rounded-full tracking-widest font-mono">GENESIS SCHOOL</span>
              <div className="space-y-2">
                <span className="text-3xl font-headline font-bold text-primary block">$100 / sem</span>
                <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                  Assessed as a standard institutional fee and billed through your bursar. Fully aid-eligible inside cost-of-attendance calculations.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-3xl space-y-6">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full tracking-widest font-mono">HARDSHIP WAIVER</span>
              <div className="space-y-2">
                <span className="text-3xl font-headline font-bold text-primary block">$0</span>
                <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                  Pell-eligible, first-generation, or documented financial hardship: the fee is fully waived at assessment. No complex forms required.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-3xl space-y-6 relative overflow-hidden ring-1 ring-primary/20">
              <div className="absolute top-0 right-0 bg-primary text-on-primary font-mono text-[9px] px-3 py-1 rounded-bl-lg font-bold tracking-wider">STANDARD</div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full tracking-widest font-mono">INDEPENDENT LEARNERS</span>
              <div className="space-y-2">
                <span className="text-3xl font-headline font-bold text-primary block">$19 / mo</span>
                <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                  If you are not enrolled at a partner institution, join as a self-learner. Billed out of pocket monthly. Pause and resume any time.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface-container-high/40 p-8 rounded-3xl border border-outline-variant/10">
            <div className="space-y-4">
              <h4 className="font-headline font-bold text-lg">Early Access Reimbursement</h4>
              <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                If you pay out of pocket as an independent learner and your school later activates as a Genesis Institution, we automatically reimburse what you paid out of pocket. You are never penalized for starting before your school does.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-headline font-bold text-lg">Fee Doctrine</h4>
              <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                The fee buys system access, not a score. Paying does not clear a Gate, raise a grade, or buy a credential. What the Passport says is earned adversarially, which is the only reason it holds value for employers.
              </p>
            </div>
          </div>
        </section>

        {/* SLIDE 12 · QUESTIONS (FAQ) */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">12 · INQUIRIES</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">The questions you're asking.</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-surface-container-low border border-outline-variant/10 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-surface-container-high/30 transition-colors"
                >
                  <span className="font-headline font-bold text-sm md:text-base flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-outline transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 pt-2 border-t border-outline-variant/5 text-xs text-on-surface-variant font-light leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SLIDE 13 · THE ASK / CALL TO ACTION */}
        <section className="bg-surface-container-low border border-outline-variant/15 p-8 md:p-16 rounded-[2.5rem] text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <span className="font-mono text-xs text-primary uppercase tracking-widest block">13 · THE ASK</span>
          <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">One semester. <span className="italic text-primary">One Hard-Gate.</span> One Passport.</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-light text-sm md:text-base leading-relaxed">
            We are asking you to do 15 minutes of Forge drills a day for one semester and attempt one scoped Hard-Gate. After one semester, you have either a Consensus Certificate that walks with you for the rest of your career, or data telling you exactly where your gaps are. The decision is whether your next interview has proof on your side, or just a resume.
          </p>
          <div className="pt-6">
            <Link
              to="/request-access"
              className="gold-gradient text-on-primary px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all inline-flex items-center gap-2 shadow-2xl"
            >
              Start Onboarding <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="pt-8 border-t border-outline-variant/10 text-xs text-outline font-mono">
            Tenured AI Student & Self-Learner Onboarding · Houston, TX
          </div>
        </section>

      </div>
    </div>
  );
}
