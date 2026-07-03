import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Code, Briefcase, PenTool, ChevronRight, Zap, Target, TrendingUp } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '../lib/utils';

interface LearningItem {
  id: string;
  name: string;
  type: 'podcast' | 'task';
  completed: boolean;
}

interface SkillDomain {
  id: string;
  name: string;
  icon: React.ElementType;
  level: number;
  maxLevel: number;
  currentExp: number;
  nextLevelExp: number;
  color: string;
  description: string;
  milestones: { name: string; unlocked: boolean }[];
  growthData: { day: number; value: number }[];
  learningPath: LearningItem[];
}

const DOMAINS: SkillDomain[] = [
  {
    id: 'engineering',
    name: 'Engineering',
    icon: Code,
    level: 4,
    maxLevel: 10,
    currentExp: 850,
    nextLevelExp: 1000,
    color: 'text-blue-500',
    description: 'System architecture, backend logic, and algorithmic efficiency.',
    milestones: [
      { name: 'Core Syntax', unlocked: true },
      { name: 'Data Structures', unlocked: true },
      { name: 'System Design', unlocked: false },
      { name: 'AI Integration', unlocked: false }
    ],
    growthData: [
      { day: 1, value: 30 }, { day: 5, value: 45 }, { day: 10, value: 40 }, 
      { day: 15, value: 65 }, { day: 20, value: 60 }, { day: 25, value: 85 }, { day: 30, value: 95 }
    ],
    learningPath: [
      { id: 'l1', name: 'Intro to System Design', type: 'podcast', completed: true },
      { id: 'l2', name: 'Scalable Architecture', type: 'podcast', completed: false },
      { id: 'l3', name: 'Design your first API', type: 'task', completed: false }
    ]
  },
  {
    id: 'strategy',
    name: 'Strategy',
    icon: Briefcase,
    level: 2,
    maxLevel: 10,
    currentExp: 320,
    nextLevelExp: 500,
    color: 'text-amber-500',
    description: 'Venture building, growth mechanics, and market positioning.',
    milestones: [
      { name: 'Market Analysis', unlocked: true },
      { name: 'Growth Loops', unlocked: false },
      { name: 'Tokenomics', unlocked: false },
      { name: 'Board Advisory', unlocked: false }
    ],
    growthData: [
      { day: 1, value: 10 }, { day: 5, value: 15 }, { day: 10, value: 25 }, 
      { day: 15, value: 20 }, { day: 20, value: 35 }, { day: 25, value: 45 }, { day: 30, value: 55 }
    ],
    learningPath: [
      { id: 's1', name: 'Market Positioning 101', type: 'podcast', completed: true },
      { id: 's2', name: 'Growth Hacking Strategies', type: 'podcast', completed: false },
      { id: 's3', name: 'Define Customer Segment', type: 'task', completed: false }
    ]
  },
  {
    id: 'design',
    name: 'Design',
    icon: PenTool,
    level: 3,
    maxLevel: 10,
    currentExp: 600,
    nextLevelExp: 750,
    color: 'text-emerald-500',
    description: 'User experience, interface aesthetics, and interaction design.',
    milestones: [
      { name: 'Wireframing', unlocked: true },
      { name: 'Prototyping', unlocked: true },
      { name: 'Design Systems', unlocked: false },
      { name: 'Motion Design', unlocked: false }
    ],
    growthData: [
      { day: 1, value: 20 }, { day: 5, value: 35 }, { day: 10, value: 30 }, 
      { day: 15, value: 50 }, { day: 20, value: 45 }, { day: 25, value: 70 }, { day: 30, value: 80 }
    ],
    learningPath: [
      { id: 'd1', name: 'Design Systems Fundamentals', type: 'podcast', completed: true },
      { id: 'd2', name: 'Accessibility in Design', type: 'podcast', completed: false },
      { id: 'd3', name: 'Create a Style Guide', type: 'task', completed: false }
    ]
  }
];

function GrowthSparkline({ data, color }: { data: { value: number }[], color: string }) {
  const hexColor = color.includes('blue') ? '#3b82f6' : color.includes('amber') ? '#f59e0b' : '#10b981';
  return (
    <div className="w-12 h-6 opacity-60">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={hexColor} 
            strokeWidth={2} 
            dot={false} 
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function SkillTreeProgress() {
  const [activeDomain, setActiveDomain] = useState<string>(DOMAINS[0].id);
  
  const selectedDomain = DOMAINS.find(d => d.id === activeDomain) || DOMAINS[0];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-headline font-bold text-on-surface">Skill Progression</h2>
            <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">Professional Domain Matrix</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        
        {/* Domain Selection Sidebar */}
        <div className="md:col-span-4 space-y-3">
          {DOMAINS.map(domain => {
            const isActive = activeDomain === domain.id;
            const progress = (domain.currentExp / domain.nextLevelExp) * 100;
            return (
              <button
                key={domain.id}
                onClick={() => setActiveDomain(domain.id)}
                className={cn(
                  "w-full text-left p-4 rounded-2xl transition-all border outline-none flex items-center gap-4 group",
                  isActive 
                    ? "bg-surface-container-high border-outline-variant/50 shadow-md" 
                    : "bg-transparent border-transparent hover:bg-surface-container hover:border-outline-variant/20"
                )}
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors", isActive ? "bg-surface-container-highest" : "bg-surface-container-high")}>
                  <domain.icon className={cn("w-5 h-5", domain.color)} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-headline font-bold text-sm text-on-surface">{domain.name}</span>
                      <GrowthSparkline data={domain.growthData} color={domain.color} />
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono font-bold text-on-surface-variant block leading-none">LVL {domain.level}</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <TrendingUp className={cn("w-2 h-2", domain.color)} />
                        <span className="text-[7px] font-mono font-bold text-on-surface-variant/40 uppercase">Growth</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-outline-variant/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500" 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Domain Detail View */}
        <div className="md:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDomain.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-surface-container-high/30 rounded-[2rem] p-6 border border-outline-variant/20 h-full flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-headline font-black text-on-surface mb-2 flex items-center gap-2">
                    {selectedDomain.name}
                    <span className={cn("text-xs px-2 py-1 rounded bg-surface-container-highest text-on-surface-variant", selectedDomain.color)}>
                      Level {selectedDomain.level}
                    </span>
                  </h3>
                  <p className="text-sm font-body text-on-surface-variant leading-relaxed">
                    {selectedDomain.description}
                  </p>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-on-surface-variant mb-1">Experience</span>
                  <span className="font-mono text-sm font-bold text-primary">{selectedDomain.currentExp}</span>
                  <span className="text-on-surface-variant text-xs"> / {selectedDomain.nextLevelExp}</span>
                </div>
              </div>

              {/* Milestones Path */}
              <div className="mt-auto space-y-4">
                <h4 className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2 mb-4">
                  <Target className="w-3.5 h-3.5" /> Domain Milestones
                </h4>
                
                <div className="relative">
                  {/* Connecting Line */}
                  <div className="absolute top-1/2 -mt-[1px] left-0 right-0 h-[2px] bg-outline-variant/20 z-0" />
                  
                  <div className="relative z-10 flex justify-between">
                    {selectedDomain.milestones.map((milestone, idx) => (
                      <div key={idx} className="flex flex-col items-center group">
                        <div className={cn(
                          "w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all shadow-sm mb-2",
                          milestone.unlocked 
                            ? "bg-primary border-surface-container-lowest text-on-primary" 
                            : "bg-surface-container-highest border-surface-container-lowest text-outline-variant"
                        )}>
                          {milestone.unlocked ? <Zap className="w-3 h-3" /> : <span className="text-[10px] font-mono font-bold">{idx + 1}</span>}
                        </div>
                        <span className={cn(
                          "text-[10px] font-mono uppercase tracking-wide text-center px-2 max-w-[80px]",
                          milestone.unlocked ? "text-primary font-bold" : "text-on-surface-variant font-medium"
                        )}>
                          {milestone.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Active Progress Line */}
                  <div 
                    className="absolute top-1/2 -mt-[1px] left-0 h-[2px] bg-primary z-0 transition-all duration-700" 
                    style={{ 
                      width: `${(selectedDomain.milestones.filter(m => m.unlocked).length - 1) / (selectedDomain.milestones.length - 1) * 100}%` 
                    }} 
                  />
                </div>
              </div>

              {/* Learning Path Section */}
              <div className="mt-6">
                <h4 className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2 mb-4">
                  <Target className="w-3.5 h-3.5" /> Learning Path
                </h4>
                <div className="space-y-2">
                  {selectedDomain.learningPath.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-surface-container-highest rounded-xl cursor-pointer hover:bg-surface-container-highest/70 transition-colors">
                      <div className={cn("w-4 h-4 rounded-full border-2", item.completed ? "bg-primary border-primary" : "border-outline")}/>
                      <span className={cn("text-sm font-body", item.completed ? "text-on-surface line-through opacity-60" : "text-on-surface")}>{item.name}</span>
                      <span className="ml-auto text-[10px] font-mono uppercase bg-surface-container-low px-2 py-1 rounded">{item.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
