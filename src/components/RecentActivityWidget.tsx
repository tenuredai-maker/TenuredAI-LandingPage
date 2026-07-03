import React from 'react';
import { Clock, Zap } from 'lucide-react';

interface Activity {
  id: string;
  action: string;
  date: string;
  points: number;
}

const recentActivities: Activity[] = [
  { id: '1', action: 'Verified Tweet: "System Architecture 101"', date: '2 hours ago', points: 50 },
  { id: '2', action: 'Completed Udemy: "Advanced React"', date: '1 day ago', points: 150 },
  { id: '3', action: 'Verified Tweet: "AI Agent Workflows"', date: '2 days ago', points: 75 },
];

export default function RecentActivityWidget() {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] p-6 shadow-sm">
      <h3 className="text-sm font-mono font-bold text-on-surface uppercase tracking-widest mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" /> Recent Activity
      </h3>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-3 bg-surface-container-high/50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-on-surface">{activity.action}</p>
              <p className="text-[10px] font-mono text-on-surface-variant uppercase">{activity.date}</p>
            </div>
            <div className="flex items-center gap-1 font-bold text-amber-500">
              <Zap className="w-4 h-4" />
              <span>+{activity.points}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
