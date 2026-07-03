import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Rocket, Zap, Globe, FileText, ArrowRight, X, Building2, Users, Play } from 'lucide-react';
import K12ReadinessAssessment from '../components/K12ReadinessAssessment';
import K12Glossary from '../components/K12Glossary';
import K12ImpactCalculator from '../components/K12ImpactCalculator';
import K12MetricsDashboard from '../components/K12MetricsDashboard';

export default function K12Page() {
  const [selectedStage, setSelectedStage] = useState<any | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const roadmapData = [
    {
      icon: Rocket,
      title: "Phase 1: Pilot & Onboarding",
      time: "Days 1-30",
      desc: "Teacher certification, SSO integration, and baseline competency assessments.",
      subSteps: ["Teacher AIOI-ED certification", "SSO integration (Clever/Google Classroom)", "Sandbox provisioning", "Baseline AICI assessment"]
    },
    {
      icon: Zap,
      title: "Phase 2: Active Execution",
      time: "Days 31-75",
      desc: "Hands-on lab modules with real-time AIBS telemetry and instructor interventions.",
      subSteps: ["6 Proving Ground labs", "Real-time AIBS telemetry tracking", "Teacher intervention alerts", "Midpoint cohort report"]
    },
    {
      icon: Globe,
      title: "Phase 3: District Scaling",
      time: "Year 2+",
      desc: "Full district-wide deployment across CTE pathways and Future 2 campuses.",
      subSteps: ["District-wide AI literacy rollout", "Cohort-wide AIBS analysis", "First Triple-85 graduating cohort"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FCF9F5] text-[#1C1C1A] font-sans">
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-[#775A19] origin-left z-50" />
      {/* ... header and other sections remain unchanged ... */}
      <header className="px-10 py-20 bg-white">
        <div className="max-w-4xl">
          <p className="text-[#775A19] font-mono text-xs uppercase tracking-[0.2em] font-bold mb-8">K-12 · The Sovereign Initiative · 2026–2027 Academic Year</p>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-8">
            The operating system for <span className="italic font-light text-[#4E4639]">future-ready</span> public schools.
          </h1>
          <p className="text-xl text-[#4E4639] leading-relaxed max-w-2xl">
            A purpose-built, FERPA-grade competency infrastructure engineered to power Houston ISD's Future 2 Schools — replacing the broken EdTech grading paradigm with verifiable, telemetry-driven proof of cognitive growth.
          </p>
        </div>
      </header>
      
      <section className="px-10 py-24">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Executive Summary</h2>
          <div className="bg-[#FFFFFF] p-10 rounded-3xl shadow-sm border border-[#EAE8E4]">
            <p className="text-lg leading-relaxed mb-6">
              Houston Independent School District has, with the launch of Future 2 Schools, made a public commitment to pivot K-12 instruction from "what to know" to "how to think." Tenured AI is the only AI-native infrastructure purpose-built to measure that pivot.
            </p>
            <p className="text-lg leading-relaxed">
              We are not selling a chatbot. We are selling the district's audit infrastructure for an AI-era classroom — the underwriting layer that lets HISD prove that a graduate's competency score was earned, not generated.
            </p>
          </div>
        </div>
      </section>

      <section className="px-10 py-24 bg-[#F6F3EF]">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">The Four Core Modules</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "The Proving Ground", desc: "Ephemeral, Docker-isolated student sandbox" },
              { title: "AICI & AIBS Engine", desc: "40+ event-type telemetry → AI Builder Score" },
              { title: "Socratic Instruction Layer", desc: "Panic-loop interception · Socratic micro-hints" },
              { title: "Digital Skill Passport", desc: "Base Sepolia · Soulbound credential token" }
            ].map((module, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl border border-[#EAE8E4]">
                <h3 className="font-bold text-lg mb-3">{module.title}</h3>
                <p className="text-[#4E4639]">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-10 py-24 bg-[#F6F3EF]">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Glossary of Terms</h2>
          <K12Glossary />
        </div>
      </section>

      <section className="px-10 py-24 bg-[#F6F3EF]">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Performance Metrics</h2>
          <K12MetricsDashboard />
        </div>
      </section>

      <section className="px-10 py-24">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Impact Calculator</h2>
          <K12ImpactCalculator />
        </div>
      </section>

      <section className="px-10 py-24 bg-white">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Administrator Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: "Principal, HISD", title: "Future 2 Campus" },
              { name: "Curriculum Director", title: "District Office" }
            ].map((t, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-video bg-[#EAE8E4] rounded-3xl flex items-center justify-center">
                  <Play className="w-16 h-16 text-[#775A19] opacity-70" />
                </div>
                <h3 className="font-bold text-lg">{t.name} — <span className="font-normal text-[#4E4639]">{t.title}</span></h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ... end unchanged ... */}

      <section className="px-10 py-24 bg-[#FFFFFF]">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Integration Roadmap</h2>
          <div className="space-y-6">
            {roadmapData.map((stage, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedStage(stage)}
                className="w-full flex gap-6 items-start p-6 bg-[#FCF9F5] hover:bg-[#F6F3EF] rounded-3xl border border-[#EAE8E4] text-left transition-colors"
              >
                <div className="p-4 bg-white rounded-2xl text-[#775A19] border border-[#EAE8E4]">
                  <stage.icon className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-baseline gap-4 mb-2">
                    <h3 className="font-bold text-xl">{stage.title}</h3>
                    <span className="font-mono text-xs uppercase bg-[#775A19] text-white px-2 py-0.5 rounded">{stage.time}</span>
                  </div>
                  <p className="text-[#4E4639]">{stage.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-10 py-24 bg-[#F6F3EF]">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Case Studies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Future 2 Pilots", desc: "Implementing AI-driven assessment frameworks in Houston ISD." },
              { title: "Competency Verification", desc: "How schools use digital passports to prove student growth." }
            ].map((study, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl border border-[#EAE8E4] flex flex-col justify-between">
                <div>
                  <FileText className="w-8 h-8 text-[#775A19] mb-4" />
                  <h3 className="font-bold text-xl mb-3">{study.title}</h3>
                  <p className="text-[#4E4639] mb-6">{study.desc}</p>
                </div>
                <a href="#" className="inline-flex items-center gap-2 font-bold text-[#775A19] hover:text-[#4E3700] transition-colors">
                  Read Case Study <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-10 py-24">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Educational Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "HISD", icon: Building2 },
              { name: "Future 2", icon: Rocket },
              { name: "EduAcademy", icon: Users },
              { name: "GlobalSchool", icon: Globe }
            ].map((partner, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-[#EAE8E4] flex flex-col items-center text-center">
                <partner.icon className="w-8 h-8 text-[#775A19] mb-4" />
                <h3 className="font-bold text-sm mb-2">{partner.name}</h3>
                <p className="text-xs text-[#4E4639] italic">"Tenured AI revolutionized how we approach student competency."</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-10 py-24">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Teacher Resource Library</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Lesson Plan Templates", desc: "Standardized templates for Future 2 AI labs." },
              { title: "Implementation Guides", desc: "Step-by-step guides for campus leaders." },
              { title: "Professional Development", desc: "Curriculum for AIOI-ED certification." }
            ].map((res, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-[#EAE8E4] flex flex-col items-center text-center">
                <FileText className="w-8 h-8 text-[#775A19] mb-4" />
                <h3 className="font-bold text-sm mb-2">{res.title}</h3>
                <p className="text-xs text-[#4E4639] mb-4">{res.desc}</p>
                <button className="text-xs font-bold text-[#775A19] hover:text-[#4E3700] uppercase tracking-wider">Download</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-10 py-24">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Readiness Assessment</h2>
          <K12ReadinessAssessment />
        </div>
      </section>

      <section className="px-10 py-24 bg-[#F6F3EF]">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Request a Personalized Demo</h2>
          <form className="bg-white p-10 rounded-3xl border border-[#EAE8E4] shadow-sm space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-[#4E4639]">School Name</label>
                <input type="text" className="w-full p-4 rounded-xl border border-[#EAE8E4] focus:outline-none focus:ring-2 focus:ring-[#775A19]" placeholder="e.g. Future 2 Campus" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-[#4E4639]">Administrator Name</label>
                <input type="text" className="w-full p-4 rounded-xl border border-[#EAE8E4] focus:outline-none focus:ring-2 focus:ring-[#775A19]" placeholder="e.g. Jane Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-[#4E4639]">Email Address</label>
              <input type="email" className="w-full p-4 rounded-xl border border-[#EAE8E4] focus:outline-none focus:ring-2 focus:ring-[#775A19]" placeholder="e.g. j.doe@district.edu" />
            </div>
            <button className="w-full p-4 bg-[#775A19] text-white font-bold rounded-xl hover:bg-[#4E3700] transition-colors">Request Demo</button>
          </form>
        </div>
      </section>

      <AnimatePresence>
        {selectedStage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedStage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-8 rounded-3xl border border-[#EAE8E4] max-w-lg w-full shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedStage(null)}
                className="absolute top-6 right-6 p-2 hover:bg-[#F6F3EF] rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-[#1C1C1A]" />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#F6F3EF] rounded-2xl text-[#775A19]">
                  <selectedStage.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl">{selectedStage.title}</h3>
                  <span className="font-mono text-xs uppercase bg-[#775A19] text-white px-2 py-0.5 rounded">{selectedStage.time}</span>
                </div>
              </div>

              <p className="text-[#4E4639] mb-8">{selectedStage.desc}</p>

              <div className="space-y-4">
                <h4 className="font-bold text-[#775A19] uppercase tracking-wider text-xs">Detailed Sub-steps</h4>
                {selectedStage.subSteps.map((step: string, idx: number) => (
                  <div key={idx} className="flex gap-4 p-4 bg-[#FCF9F5] rounded-xl border border-[#EAE8E4]">
                    <span className="font-mono text-[#775A19] font-bold">0{idx + 1}</span>
                    <p className="text-[#1C1C1A]">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
