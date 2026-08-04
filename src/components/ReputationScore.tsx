import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, Award } from 'lucide-react';

const data = [
  { month: 'Jan', points: 1200 },
  { month: 'Feb', points: 2100 },
  { month: 'Mar', points: 1800 },
  { month: 'Apr', points: 3400 },
  { month: 'May', points: 4200 },
  { month: 'Jun', points: 3900 },
  { month: 'Jul', points: 5600 },
];

export default function ReputationScore({ isLoading = false }: { isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-8 shadow-xl h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high animate-pulse" />
            <div className="space-y-2">
              <div className="h-5 w-32 bg-surface-container-high rounded animate-pulse" />
              <div className="h-3 w-40 bg-surface-container-high rounded animate-pulse" />
            </div>
          </div>
          <div className="space-y-2 flex flex-col items-end">
            <div className="h-8 w-20 bg-surface-container-high rounded animate-pulse" />
            <div className="h-3 w-24 bg-surface-container-high rounded animate-pulse" />
          </div>
        </div>
        <div className="flex-1 min-h-[250px] bg-surface-container-high/50 rounded-2xl animate-pulse" />
        <div className="mt-8 pt-6 border-t border-outline-variant/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-container-high animate-pulse" />
          <div className="h-4 w-full max-w-[250px] bg-surface-container-high rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-headline font-black text-on-surface tracking-tight">Tenured Points</h3>
            <p className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest">Historical Growth Trend</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-headline font-black text-primary tracking-tight">5,600</p>
          <p className="text-[9px] font-mono font-bold text-emerald-500 uppercase tracking-widest">+12% vs last month</p>
        </div>
      </div>

      <div className="flex-1 min-h-[250px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#775A19" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#775A19" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700, fontFamily: 'monospace' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700, fontFamily: 'monospace' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '16px', 
                border: '1px solid #e5e7eb',
                fontSize: '12px',
                fontFamily: 'monospace',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
              }}
              itemStyle={{ color: '#775A19', fontWeight: 800 }}
            />
            <Area 
              type="monotone" 
              dataKey="points" 
              stroke="#775A19" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPoints)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 pt-6 border-t border-outline-variant/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center">
            <Award className="w-4 h-4 text-primary" />
          </div>
          <p className="text-[10px] text-on-surface-variant leading-relaxed">
            Your points represent <span className="font-bold text-on-surface">Verified Knowledge Proofs</span> and contribution milestones within the ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
}
