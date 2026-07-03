import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { Hexagon } from 'lucide-react';

const data = [
  { subject: 'Engineering', A: 85, fullMark: 100 },
  { subject: 'Strategy', A: 65, fullMark: 100 },
  { subject: 'Design', A: 75, fullMark: 100 },
  { subject: 'Leadership', A: 90, fullMark: 100 },
  { subject: 'Operations', A: 60, fullMark: 100 },
  { subject: 'Product', A: 80, fullMark: 100 },
];

export default function SkillRadarChart() {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Hexagon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-headline font-bold text-on-surface">Domain Balance</h3>
          <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest font-bold">Multidisciplinary Matrix</p>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[300px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid 
              stroke="#444" 
              strokeOpacity={0.2}
              gridType="polygon"
            />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 700, className: 'uppercase tracking-tighter text-on-surface-variant/80 font-mono' }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={false} 
              axisLine={false}
            />
            <Radar
              name="Proficiency"
              dataKey="A"
              stroke="var(--color-primary)"
              fill="var(--color-primary)"
              fillOpacity={0.25}
              dot={{ r: 3, fill: 'var(--color-primary)', strokeWidth: 2 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-outline-variant/10">
        <p className="text-[10px] text-on-surface-variant leading-relaxed text-center italic">
          Visualization of cross-functional aptitude based on verified node contributions.
        </p>
      </div>
    </div>
  );
}
