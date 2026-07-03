import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Social Verification', value: 400 },
  { name: 'Educational Completion', value: 300 },
  { name: 'Mentorship', value: 200 },
  { name: 'Code Contributions', value: 100 },
];

const COLORS = ['#eab308', '#a855f7', '#3b82f6', '#10b981'];

export default function PointsDistributionChart() {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] p-6 shadow-sm">
      <h3 className="text-sm font-mono font-bold text-on-surface uppercase tracking-widest mb-6">Points Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
