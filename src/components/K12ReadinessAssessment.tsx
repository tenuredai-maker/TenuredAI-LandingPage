import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, RefreshCcw } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "What is your school's current AI policy?",
    options: [
      { text: "No policy / Restricted", score: 0 },
      { text: "Informal guidelines", score: 5 },
      { text: "Formalized, integrated policy", score: 10 }
    ]
  },
  {
    id: 2,
    question: "How would you describe your teachers' AI proficiency?",
    options: [
      { text: "Novice (Exploratory)", score: 0 },
      { text: "Emerging (Active usage)", score: 5 },
      { text: "Advanced (Orchestrating)", score: 10 }
    ]
  },
  {
    id: 3,
    question: "Do you have dedicated infrastructure for AI (sandboxing/secure access)?",
    options: [
      { text: "None / Shared", score: 0 },
      { text: "Partial / Ad-hoc", score: 5 },
      { text: "Full / Secure Tenant", score: 10 }
    ]
  }
];

const recommendations = [
  { range: [0, 10], title: "Foundation Building", desc: "Focus on establishing foundational AI literacy and safe, secure infrastructure before scaling." },
  { range: [11, 20], title: "Scaling Integration", desc: "You are ready to pilot secure, sandboxed AI tools and provide teacher professional development." },
  { range: [21, 30], title: "Optimization & Verification", desc: "You are ready for enterprise-grade orchestration, verifiable credentialing, and district-wide scaling." }
];

export default function K12ReadinessAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [result, setResult] = useState<any | null>(null);

  const handleAnswer = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const total = newScores.reduce((a, b) => a + b, 0);
      setResult(recommendations.find(r => total >= r.range[0] && total <= r.range[1]));
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setScores([]);
    setResult(null);
  };

  return (
    <div className="p-8 bg-white rounded-3xl border border-[#EAE8E4] shadow-sm">
      {!result ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="font-bold text-2xl mb-6">{questions[currentStep].question}</h3>
          <div className="space-y-4">
            {questions[currentStep].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt.score)}
                className="w-full text-left p-4 rounded-xl border border-[#EAE8E4] hover:bg-[#F6F3EF] transition-colors flex justify-between items-center group"
              >
                {opt.text}
                <ChevronRight className="w-5 h-5 text-[#775A19] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
          <div className="mt-8 text-sm text-[#4E4639]">Question {currentStep + 1} of {questions.length}</div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <h3 className="font-bold text-2xl mb-4 text-[#775A19]">{result.title}</h3>
          <p className="text-lg leading-relaxed mb-8 text-[#1C1C1A]">{result.desc}</p>
          <button 
            onClick={reset}
            className="flex items-center gap-2 font-bold text-[#775A19] hover:text-[#4E3700]"
          >
            <RefreshCcw className="w-4 h-4" /> Reset Assessment
          </button>
        </motion.div>
      )}
    </div>
  );
}
