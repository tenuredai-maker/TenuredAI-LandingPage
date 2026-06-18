import { motion } from 'motion/react';
import { ArrowRight, Zap, Landmark, ShieldCheck, BarChart3, Shield, Rocket, Database, Cpu, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function UseCases() {
  return (
    <div className="pt-32 pb-24">
      {/* Hero Section: High-Scarcity Invitation */}
      <section className="px-8 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-8"
          >
            <span className="font-label text-xs tracking-[0.3em] uppercase text-primary font-bold block">Private Beta Invitation</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-tight font-headline font-bold tracking-tighter text-on-surface">
              Architectural <br/><span className="italic text-primary">Exclusivity.</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed font-light">
              Tenured AI is not a public utility. It is an institutional partner. We are currently accepting applications for the Q4 Cohort of our Sovereign Intelligence Pilots.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Link to="/request-access" className="px-8 py-4 rounded-lg bg-primary text-on-primary font-bold shadow-xl shadow-primary/20 flex items-center gap-3 hover:scale-105 transition-all">
                Request Private Access
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 rounded-lg bg-surface-container-high text-on-surface font-semibold hover:bg-surface-container-highest transition-colors">
                Review Whitepaper
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl relative z-10 editorial-shadow">
              <img 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                alt="monochromatic architectural photography" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkU953Exa6zC9bn-gP6V_NJ3BlJNpoAh2t-FwmeS0vxiYLfqvOwVR7ifm3eepLQnWg0-U1BCCxESV0t8zytyD9s6E6zcIbVPMrFLMKlvfM8qPqTF35uZkpQNQcD7offGb7YwQ5yC30GQWbmGsJWCMbHUlRUTMdrL1vJ7uvQHYYWRhlwlw_667gJ0RA4_kvhXXo_i5-nUZ-W91ejlUA3KosjPmMyu6_qBDHmSIrowUnv7qLUWoiqK9dJRmr9FBg3_Hb7-x8ytI"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-surface-container-highest rounded-xl -z-0 opacity-50"></div>
          </motion.div>
        </div>
      </section>

      {/* Section 1: The Houston-NYC Corridor Pilot */}
      <section className="bg-surface-container-low py-32 px-8 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">Genesis Node: The Corridor</h2>
              <p className="text-on-surface-variant font-light text-lg">Cross-industrial intelligence synchronization between Global Energy and World Finance.</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest font-bold text-outline block mb-2">Status</span>
              <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-full border border-outline-variant/10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-widest">Active Synchronization</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Houston Node */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-surface-container-lowest p-10 rounded-xl border border-outline-variant/15 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8" />
                </div>
                <span className="font-label text-[10px] tracking-widest font-bold text-outline-variant uppercase">NODE_01_HOU</span>
              </div>
              <h3 className="text-3xl font-headline font-bold mb-4">Houston Energy Node</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed">Implementing deep-learning infrastructure for predictive grid resiliency and decarbonization strategy within the Permian Basin ecosystem.</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                  <span className="text-sm font-medium">Data Ingest Rate</span>
                  <span className="text-sm font-bold text-primary">4.2 PB/Day</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                  <span className="text-sm font-medium">Pilot Participants</span>
                  <span className="text-sm font-bold text-primary">3 Energy Majors</span>
                </div>
              </div>
            </motion.div>

            {/* NYC Node */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-surface-container-lowest p-10 rounded-xl border border-outline-variant/15 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Landmark className="w-8 h-8" />
                </div>
                <span className="font-label text-[10px] tracking-widest font-bold text-outline-variant uppercase">NODE_02_NYC</span>
              </div>
              <h3 className="text-3xl font-headline font-bold mb-4">NYC Finance Node</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed">Bridging capital markets with real-time industrial data. High-fidelity risk modeling for structured energy products and ESG derivatives.</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                  <span className="text-sm font-medium">Latency Threshold</span>
                  <span className="text-sm font-bold text-primary">&lt; 14ms</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                  <span className="text-sm font-medium">AUM Influence</span>
                  <span className="text-sm font-bold text-primary">$2.4T USD</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Higher Education: The AICI Pivot */}
      <section className="px-8 max-w-7xl mx-auto mb-32">
        <div className="bg-inverse-surface text-inverse-on-surface rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl">
          <div className="p-12 md:p-20 flex flex-col justify-center space-y-8">
            <span className="font-label text-xs tracking-[0.3em] text-primary-fixed uppercase font-bold block">Institutional Resilience</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight">The AICI Pivot for University Regents</h2>
            <p className="text-stone-400 text-lg leading-relaxed font-light">
              Artificial Intelligence Curriculum Integration (AICI). We partner with Board of Regents to restructure the academic value proposition in the era of generative intelligence.
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4 group">
                <ShieldCheck className="text-primary-fixed w-6 h-6 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="block font-bold text-lg">Curricular Auditing</span>
                  <span className="text-sm text-stone-500">Updating legacy pedagogy for AI-native professionals.</span>
                </div>
              </li>
              <li className="flex gap-4 group">
                <ShieldCheck className="text-primary-fixed w-6 h-6 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="block font-bold text-lg">Research Acceleration</span>
                  <span className="text-sm text-stone-500">Applying proprietary nodes to grant-funded laboratories.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="relative min-h-[400px]">
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale" 
              alt="classic library interior" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH99GFAjPl3PzuWs3fOleiLB8fXHPQlVXWmiv021LNpLwrnQW4wVuE6NBkiQk2iioWCl4G15wdOQaAxs6GEncylKhQtafKuwMV3a_2Qwr1HWLQI8NeXU_ANHcG6f2V6RZe1VTvZfztQ1GYw58FPfOAHCDmCDJnegAumPZH0rKVJLOYl-bcezcsSETjfBvTWvox0-ZJ10VqJbuOt_VCHJg7LUXgcfZsxqJ0ec90PqP20LOQ4nBXhz-PtZEAa-0SnnXaNCE9ZBY"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-inverse-surface via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Section 3 & 4: Bento Grid */}
      <section className="px-8 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Enterprise AIOI Trial */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-surface-container-high rounded-xl p-12 flex flex-col justify-between border border-outline-variant/10"
          >
            <div>
              <h3 className="text-4xl font-headline font-bold mb-6">Enterprise: The AIOI Trial</h3>
              <p className="text-on-surface-variant text-lg mb-12 max-w-xl leading-relaxed">
                Our Artificial Intelligence Operational Intelligence (AIOI) Proof-of-Value program. A 90-day deep dive into your organization's hidden data reserves.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: BarChart3, title: "Efficiency Gap", desc: "Identify and close latent operational friction points." },
                { icon: Shield, title: "Data Sovereignty", desc: "Full-stack containment of proprietary trade secrets." },
                { icon: Rocket, title: "Velocity Scale", desc: "Rapid deployment of custom LLM orchestration." }
              ].map((item, i) => (
                <div key={i} className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/5 group hover:border-primary/30 transition-colors">
                  <item.icon className="text-primary w-6 h-6 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold mb-1 text-sm">{item.title}</h4>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed uppercase tracking-wide">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Independent Sovereigns */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 bg-primary text-on-primary rounded-xl p-12 flex flex-col justify-between shadow-xl"
          >
            <div>
              <h3 className="text-3xl font-headline font-bold mb-6">Independent Sovereigns</h3>
              <p className="opacity-90 leading-relaxed mb-12">
                The Career Pivot pathway for high-impact individuals transitioning into the AI economy.
              </p>
            </div>
            <div className="space-y-8">
              <div className="border-b border-on-primary/20 pb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-60 font-bold">Success Rate</span>
                <span className="block text-4xl font-bold italic font-headline mt-1">94% Retention</span>
              </div>
              <div className="pb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-60 font-bold">Avg. Outcome</span>
                <span className="block text-4xl font-bold italic font-headline mt-1">+120% Productivity</span>
              </div>
              <button className="w-full py-4 bg-surface-container-lowest text-primary font-bold rounded-lg hover:bg-white transition-colors uppercase tracking-widest text-xs">
                Apply to Cohort
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Methodology Section: Framework */}
      <section className="bg-surface-container-lowest py-32 px-8 border-y border-outline-variant/10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <span className="font-label text-xs tracking-[0.3em] uppercase text-primary font-bold mb-4 block">The Methodology</span>
          <h2 className="text-4xl md:text-6xl font-headline font-bold">The Tenured Protocol</h2>
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-outline-variant/30 -translate-y-1/2 z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
            {[
              { icon: Database, title: "Input", desc: "We curate institutional data siloes, legacy archives, and streaming operational telemetry." },
              { icon: Cpu, title: "Intelligence", desc: "Domain-specific models distill noise into high-fidelity actionable insights." },
              { icon: TrendingUp, title: "Outcome", desc: "Permanent structural advantage and defensible institutional sovereignty." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className={cn(
                  "w-24 h-24 rounded-full shadow-xl flex items-center justify-center mb-8 border-4 transition-all duration-500",
                  i === 1 ? "bg-primary text-on-primary border-primary-container scale-110" : "bg-surface-container-lowest text-primary border-surface-container-low group-hover:border-primary/30"
                )}>
                  <step.icon className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-headline font-bold mb-4">{step.title}</h4>
                <p className="text-on-surface-variant font-light px-4 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
