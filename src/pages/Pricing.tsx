import { motion } from 'motion/react';
import { Check, Info, ArrowRight, Zap, Shield, GraduationCap, Building2, User, BookOpen, Cpu, Award } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const individualPlans = [
    {
      name: "Explorer",
      price: "0",
      description: "Baseline skill assessment and career discovery.",
      features: [
        "Baseline skill assessment",
        "AI-powered skill discovery",
        "One exploratory pathway (0–30)",
        "View-only skill graph",
        "Limited AI guidance"
      ],
      cta: "Start Free",
      highlight: false
    },
    {
      name: "Builder",
      price: billingCycle === 'monthly' ? "39" : "33",
      description: "Guided learning with adaptive AI agents.",
      features: [
        "Full access to one learning pathway (0–70)",
        "Personal AI learning agent",
        "Adaptive learning paths",
        "Assessments & basic simulations",
        "Progress analytics",
        "1 verified skill badge included"
      ],
      cta: "Upgrade to Builder",
      highlight: true,
      popular: true
    },
    {
      name: "Pro",
      price: billingCycle === 'monthly' ? "99" : "83",
      description: "Mastery-level verification for elite architects.",
      features: [
        "Unlimited learning pathways",
        "Advanced, role-based simulations",
        "Mastery confidence scoring",
        "Portfolio-ready evidence",
        "Multiple micro-credentials",
        "Public credential verification links"
      ],
      cta: "Go Pro",
      highlight: false
    }
  ];

  const institutionalSegments = [
    {
      icon: GraduationCap,
      title: "Students & Higher Ed",
      options: [
        { name: "Institutional License", price: "$10–$25", unit: "per student / mo", desc: "Curriculum-aligned simulations and instructor dashboards." },
        { name: "Program-Level", price: "$25k–$150k", unit: "per year", desc: "Custom competency framework and faculty enablement." }
      ]
    },
    {
      icon: BookOpen,
      title: "Educators & Faculty",
      options: [
        { name: "Practitioner License", price: "$799", unit: "per year", desc: "AI-assisted lesson planning and ethics training." },
        { name: "Institutional Bundle", price: "Custom", unit: "seat-based", desc: "Unlimited licenses and shared competency libraries." }
      ]
    },
    {
      icon: Building2,
      title: "Enterprise & Workforce",
      options: [
        { name: "Per-Employee License", price: "$30–$80", unit: "per employee / mo", desc: "Role-based pathways and real-world job simulations." },
        { name: "Platform License", price: "From $100k", unit: "per year", desc: "Custom role frameworks and AI agent governance." }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <header className="mb-20 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <span className="font-label text-xs tracking-[0.3em] text-primary uppercase font-bold block">Pricing Strategy v4.0</span>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-on-surface tracking-tight">
            Pay for <span className="italic text-primary">Proven Capability.</span>
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed">
            Not content. Not seat time. TenuredAI pricing is built on confidence and proof.
          </p>
        </motion.div>
      </header>

      {/* How it Works - Value Anchor */}
      <section className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-surface-container-low p-12 rounded-3xl border border-outline-variant/10">
        <div>
          <h2 className="text-3xl font-headline font-bold mb-6">How TenuredAI Pricing Works</h2>
          <div className="space-y-4">
            {[
              "Adaptive, agent-guided learning",
              "Verified skill mastery",
              "Real-world simulations",
              "Credentials backed by evidence"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-on-surface">
                <Check className="w-5 h-5 text-green-600" />
                <span className="font-bold">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-l border-outline-variant/30 pl-12">
          <p className="text-xs font-label font-bold uppercase tracking-widest text-outline mb-4">We do not charge for:</p>
          <div className="space-y-3 opacity-60">
            {["Hours watched", "Courses completed", "Seat time"].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-on-surface-variant">
                <span className="text-error font-bold text-lg">×</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Pricing */}
      <section className="mb-32">
        <div className="flex justify-center items-center gap-4 mb-12">
          <span className={cn("text-sm font-bold uppercase tracking-widest transition-colors", billingCycle === 'monthly' ? "text-on-surface" : "text-outline")}>Monthly</span>
          <button 
            onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly')}
            className="w-12 h-6 bg-surface-container-highest rounded-full relative p-1 transition-colors"
          >
            <div className={cn("w-4 h-4 bg-primary rounded-full transition-transform", billingCycle === 'annual' ? "translate-x-6" : "translate-x-0")} />
          </button>
          <span className={cn("text-sm font-bold uppercase tracking-widest transition-colors", billingCycle === 'annual' ? "text-on-surface" : "text-outline")}>
            Annual <span className="text-[10px] text-primary ml-1">(10–20% Savings)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {individualPlans.map((plan, i) => (
            <div 
              key={i} 
              className={cn(
                "p-10 rounded-2xl flex flex-col border transition-all duration-500 relative",
                plan.highlight 
                  ? "bg-primary text-on-primary border-primary shadow-2xl scale-105 z-10" 
                  : "bg-surface-container-low border-outline-variant/15 hover:border-primary/30"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                  ⭐ Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-headline font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-headline font-bold">${plan.price}</span>
                  <span className={cn("text-xs font-bold uppercase tracking-widest", plan.highlight ? "text-primary-fixed" : "text-outline")}>
                    / {billingCycle === 'monthly' ? 'mo' : 'mo billed annually'}
                  </span>
                </div>
                <p className={cn("text-sm leading-relaxed", plan.highlight ? "text-on-primary/80" : "text-on-surface-variant")}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <Check className={cn("w-4 h-4 mt-0.5 shrink-0", plan.highlight ? "text-on-primary" : "text-primary")} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/request-access"
                className={cn(
                  "w-full py-4 rounded-lg font-bold uppercase tracking-widest text-xs transition-all active:scale-95 text-center",
                  plan.highlight 
                    ? "bg-surface-container-lowest text-primary hover:bg-white" 
                    : "bg-primary text-on-primary hover:opacity-90"
                )}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 40/40/20 Sovereign Revenue Model */}
      <section className="mb-32 py-24 bg-inverse-surface text-inverse-on-surface rounded-3xl overflow-hidden relative">
        <div className="max-w-5xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <span className="font-label text-xs tracking-[0.3em] text-primary-fixed uppercase font-bold block mb-4">Automated Fiscal Settlement</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">The 40/40/20 <br/> Dividend Model</h2>
            <p className="text-stone-400 leading-relaxed mb-8">
              An automated settlement system where verification fees from "Hard-Gate" activations are split to support a new talent economy.
            </p>
            <div className="space-y-6">
              {[
                { pct: "40%", label: "Alma Mater", desc: "Direct Innovation Fund for the University (e.g., U of H, NYU)." },
                { pct: "40%", label: "Sovereign Reserve", desc: "Platform Infrastructure, R&D, and Performance Bond capital." },
                { pct: "20%", label: "State Treasury", desc: "State Workforce Dividend for public infrastructure." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="text-3xl font-headline text-primary-fixed opacity-50 group-hover:opacity-100 transition-opacity">{item.pct}</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.label}</h4>
                    <p className="text-stone-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-[10px] text-stone-500 italic leading-relaxed border-t border-white/5 pt-6">
              * Note on Private Institutions: For private colleges, the 20% state portion is either negotiated into a custom split or held in reserve by Tenured AI to maintain platform infrastructure and future professional bonds.
            </p>
          </div>
          <div className="relative flex justify-center">
            <div className="w-64 h-64 sm:w-80 sm:h-80 relative">
              <div className="absolute inset-0 border-[20px] sm:border-[30px] border-white/5 rounded-full"></div>
              <div className="absolute inset-0 border-[20px] sm:border-[30px] border-primary-fixed rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}></div>
              <div className="absolute inset-0 border-[20px] sm:border-[30px] border-primary-container rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 0% 100%, 0% 50%, 50% 50%)' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-surface-container-lowest rounded-full editorial-shadow flex flex-col items-center justify-center text-primary">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Shield className="w-96 h-96" />
        </div>
      </section>

      {/* Sovereign Verification Fee */}
      <section className="mb-32">
        <div className="mb-12">
          <h2 className="text-3xl font-headline font-bold mb-4">Sovereign Verification Fee</h2>
          <p className="text-on-surface-variant">Mandatory per-semester fee integrated directly into institutional billing.</p>
        </div>
        <div className="bg-surface-container-low rounded-2xl overflow-x-auto border border-outline-variant/15">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-surface-container-high">
                <th className="p-6 font-label text-xs uppercase tracking-widest font-bold">Feature</th>
                <th className="p-6 font-label text-xs uppercase tracking-widest font-bold">Amount</th>
                <th className="p-6 font-label text-xs uppercase tracking-widest font-bold">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {[
                { name: "Proving Ground Access", price: "$125.00", desc: "Unlimited use of adversarial AI sandbox environments." },
                { name: "Ledger Maintenance", price: "$75.00", desc: "Recording 'Hard-Gate' attempts on the immutable record." },
                { name: "Underwriting Seed", price: "$50.00", desc: "Initial capital to 'Mint' the student's first Performance Bond." }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-surface-container-highest/50 transition-colors">
                  <td className="p-6 font-bold text-sm">{row.name}</td>
                  <td className="p-6 font-headline font-bold text-primary">{row.price}</td>
                  <td className="p-6 text-sm text-on-surface-variant">{row.desc}</td>
                </tr>
              ))}
              <tr className="bg-primary/5">
                <td className="p-6 font-headline font-bold text-lg">TOTAL SEMESTER FEE</td>
                <td className="p-6 font-headline font-bold text-2xl text-primary">$250.00</td>
                <td className="p-6 text-sm font-bold italic">Fully underwritten professional identity.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Institutional & Enterprise Bento */}
      <section className="mb-32">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-headline font-bold mb-4">Institutional & Enterprise</h2>
          <p className="text-on-surface-variant">Structured for scale, flexible for innovation.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {institutionalSegments.map((segment, i) => (
            <div key={i} className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/15 flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <segment.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-headline font-bold">{segment.title}</h3>
              </div>

              <div className="space-y-6 flex-grow">
                {segment.options.map((opt, j) => (
                  <div key={j} className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-sm">{opt.name}</h4>
                      <span className="text-primary font-headline font-bold">{opt.price}</span>
                    </div>
                    <p className="text-[10px] text-outline font-bold uppercase tracking-widest mb-3">{opt.unit}</p>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{opt.desc}</p>
                  </div>
                ))}
              </div>

              <Link 
                to="/request-access"
                className="mt-8 w-full py-3 border border-primary text-primary rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-primary/5 transition-colors text-center"
              >
                Contact Sales
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Standalone & Add-ons */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-32">
        <div className="md:col-span-8 bg-inverse-surface text-inverse-on-surface p-10 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-headline font-bold mb-8">Learning Pathways (Standalone)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { type: "Educator Pathway (0–70)", price: "$299–$1,499" },
                { type: "Employee Pathway (0–80)", price: "$399–$2,499" },
                { type: "Student Pathway (0–80)", price: "$199" },
                { type: "Self-Learner Pathway (0–100)", price: "$499–$2,999" }
              ].map((path, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-sm font-medium">{path.type}</span>
                  <span className="text-primary-fixed font-bold">{path.price}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs text-on-surface-variant italic">
              * Pricing varies by simulation depth, credential value, and customization level.
            </p>
          </div>
          <div className="absolute -bottom-10 -right-10 opacity-5">
            <BookOpen className="w-60 h-60" />
          </div>
        </div>

        <div className="md:col-span-4 space-y-8">
          <div className="bg-surface-container-high p-8 rounded-2xl border border-outline-variant/15">
            <div className="flex items-center gap-3 mb-4 text-primary">
              <Cpu className="w-5 h-5" />
              <h4 className="font-bold text-sm uppercase tracking-widest">AI Agent Usage</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
              Standard interactions included. Premium depth and multi-scenario evaluations available as add-ons.
            </p>
            <div className="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10">
              <p className="text-xs font-bold">$10 per 1,000</p>
              <p className="text-[10px] text-outline uppercase">Advanced Agent Actions</p>
            </div>
          </div>

          <div className="bg-surface-container-high p-8 rounded-2xl border border-outline-variant/15">
            <div className="flex items-center gap-3 mb-4 text-primary">
              <Award className="w-5 h-5" />
              <h4 className="font-bold text-sm uppercase tracking-widest">Credentialing</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Standard Micro-Credential</span>
                <span className="font-bold">Included</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Employer-Reviewed</span>
                <span className="font-bold">$50–$150</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">API Verification</span>
                <span className="font-bold">Enterprise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Takeaway */}
      <section className="bg-gradient-to-br from-tertiary to-[#2e3e60] p-12 md:p-20 rounded-3xl text-white text-center relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
            Stop measuring learning by time. <br/> Start proving your <span className="italic underline decoration-white/30 text-tertiary-container">Worth.</span>
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto text-white/90">
            You don’t pay for content. You pay for confidence, capability, and proof.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 text-left">
            {[
              { title: "Learning Platform", desc: "Adaptive pathways for every professional tier." },
              { title: "Credential Authority", desc: "Immutable proof of capability and worth." },
              { title: "Workforce Intelligence", desc: "Real-time verification of institutional maturity." }
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <h4 className="font-bold text-xl text-white">{item.title}</h4>
                <p className="text-sm text-white/80">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="pt-10">
            <Link 
              to="/request-access"
              className="inline-block bg-white text-tertiary px-10 py-4 rounded-lg font-bold uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-transform"
            >
              Initialize Sovereign Seed
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none text-white">
          <Shield className="w-80 h-80" />
        </div>
      </section>
    </div>
  );
}
