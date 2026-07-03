import React, { useState } from 'react';
import { Bell, Mail, Zap, CheckCircle } from 'lucide-react';

export default function NotificationSettings() {
  const [emailAlerts, setEmailAlerts] = useState({
    verificationUpdates: true,
    pointsAwarded: false,
  });

  const toggleAlert = (key: keyof typeof emailAlerts) => {
    setEmailAlerts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] p-6 shadow-sm">
      <h3 className="text-sm font-mono font-bold text-on-surface uppercase tracking-widest mb-6 flex items-center gap-2">
        <Bell className="w-5 h-5 text-primary" /> Notification Settings
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-surface-container-high/50 rounded-xl">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-on-surface">Verification Updates</p>
              <p className="text-[10px] font-mono text-on-surface-variant uppercase">Get notified when your status changes</p>
            </div>
          </div>
          <button 
            onClick={() => toggleAlert('verificationUpdates')}
            className={`w-12 h-6 rounded-full transition-colors relative ${emailAlerts.verificationUpdates ? 'bg-primary' : 'bg-outline'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-surface absolute top-1 transition-all ${emailAlerts.verificationUpdates ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between p-3 bg-surface-container-high/50 rounded-xl">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-sm font-medium text-on-surface">Points Awarded</p>
              <p className="text-[10px] font-mono text-on-surface-variant uppercase">Get notified when you earn new points</p>
            </div>
          </div>
          <button 
            onClick={() => toggleAlert('pointsAwarded')}
            className={`w-12 h-6 rounded-full transition-colors relative ${emailAlerts.pointsAwarded ? 'bg-primary' : 'bg-outline'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-surface absolute top-1 transition-all ${emailAlerts.pointsAwarded ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
