import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Shield, Award } from 'lucide-react';

const data = [
  { subject: 'Integrity', A: 95, fullMark: 100 },
  { subject: 'Reliability', A: 88, fullMark: 100 },
  { subject: 'Collaboration', A: 92, fullMark: 100 },
  { subject: 'Merit', A: 85, fullMark: 100 },
  { subject: 'Expertise', A: 90, fullMark: 100 },
  { subject: 'Consistency', A: 94, fullMark: 100 },
];

export default function ReputationVisualization() {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-headline font-black text-on-surface tracking-tight">Trust Dynamics</h3>
            <p className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest">Professional Integrity Metrics</p>
          </div>
        </div>
        <div className="bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
          <span className="text-[10px] font-mono font-bold text-secondary uppercase tracking-widest">Verified Hub</span>
        </div>
      </div>

      <div className="flex-1 min-h-[300px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 700, fontFamily: 'monospace' }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Reputation Score"
              dataKey="A"
              stroke="#775A19"
              fill="#775A19"
              fillOpacity={0.3}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '12px', 
                border: '1px solid #e5e7eb',
                fontSize: '12px',
                fontFamily: 'monospace'
              }} 
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-6 border-t border-outline-variant/10 relative z-10">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
            <Award className="w-4 h-4 text-primary" />
          </div>
          <p className="text-[10px] text-on-surface-variant leading-relaxed">
            This visualization reflects your <span className="font-bold text-on-surface">Immutable Reputation Score</span>, calculated from 124 cross-validated professional interactions and peer signatures.
          </p>
        </div>
      </div>
    </div>
  );
}
