import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronDown } from 'lucide-react';

const glossary = [
  {
    term: "Immutable Telemetry",
    definition: "The process of capturing student activity data in a tamper-proof manner, providing an auditable history of cognitive growth that proves work was authored, not generated."
  },
  {
    term: "Connectionist Identity",
    definition: "An instructional framework that emphasizes the connections between diverse skills and experiences, rather than isolated subject-matter mastery, fostering a more holistic student profile."
  },
  {
    term: "Sovereign Skill Passport",
    definition: "A cryptographically verifiable, student-owned record of demonstrated competencies that is portable across educational institutions and employers."
  },
  {
    term: "AI Builder Score (AIBS)",
    definition: "A composite metric that quantifies a student's ability to construct functional, AI-era solutions through iterative problem-solving and critical reasoning."
  }
];

export default function K12Glossary() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {glossary.map((item, i) => (
        <div key={i} className="bg-white rounded-2xl border border-[#EAE8E4] overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full p-6 flex justify-between items-center text-left"
          >
            <div className="flex items-center gap-4">
              <BookOpen className="w-5 h-5 text-[#775A19]" />
              <span className="font-bold text-lg">{item.term}</span>
            </div>
            <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }}>
              <ChevronDown className="w-5 h-5 text-[#4E4639]" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-6 pb-6"
              >
                <p className="text-[#4E4639] leading-relaxed border-t border-[#EAE8E4] pt-4">{item.definition}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
