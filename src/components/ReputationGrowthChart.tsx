import React, { useMemo, useRef, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'motion/react';
import { Activity, Zap, Share2, Download, Check } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ReputationGrowthChartProps {
  currentPoints: number;
}

export default function ReputationGrowthChart({ currentPoints }: ReputationGrowthChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Generate dummy historical data over the past 6 months to visualize long-term growth
  const historicalData = useMemo(() => {
    const data = [];
    let cumulative = Math.max(0, currentPoints - 5000); // Start from a lower point
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      
      if (i === 0) {
        cumulative = currentPoints;
      } else {
        cumulative += Math.floor(Math.random() * 1000);
      }
      
      data.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        points: cumulative
      });
    }
    return data;
  }, [currentPoints]);

  const handleShare = async () => {
    if (!chartRef.current) return;
    
    setIsSharing(true);
    try {
      // Capture the element
      const element = chartRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // Higher resolution
        backgroundColor: '#0a0a0b', // Keep the dark background
        useCORS: true,
      });
      
      const file = await new Promise<File | null>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], 'reputation-growth.png', { type: 'image/png' }));
          } else {
            resolve(null);
          }
        }, 'image/png');
      });

      if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Reputation Growth',
          text: `Check out my Tenured Points accumulation trend! I currently have ${currentPoints} TP.`,
        });
      } else if (file) {
        // Fallback: download the image
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.download = 'reputation-growth.png';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
      
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    } catch (error) {
      console.error('Error sharing image:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden" ref={chartRef}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-headline font-bold text-on-surface">Reputation Growth</h2>
            <p className="text-xs text-on-surface-variant font-mono uppercase tracking-widest mt-0.5">Historical Accrual</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 p-2 px-4 rounded-xl border border-outline-variant/20 bg-surface-container-high/50" data-html2canvas-ignore>
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold font-headline text-amber-500">{currentPoints.toLocaleString()} <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">Total TP</span></span>
          </div>

          <button 
            onClick={handleShare}
            disabled={isSharing}
            data-html2canvas-ignore
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isSharing ? (
              <span className="flex items-center gap-2"><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><Activity className="w-3.5 h-3.5" /></motion.div> Generating</span>
            ) : shareSuccess ? (
              <span className="flex items-center gap-2"><Check className="w-3.5 h-3.5" /> Shared</span>
            ) : (
              <span className="flex items-center gap-2"><Share2 className="w-3.5 h-3.5" /> Share Snapshot</span>
            )}
          </button>
        </div>
      </div>

      <div className="relative z-10 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={historicalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-outline-variant)" strokeOpacity={0.2} />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'var(--color-on-surface-variant)' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'var(--color-on-surface-variant)' }}
              tickFormatter={(val) => `${val}`}
              dx={-10}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-surface-container-highest border border-outline-variant/30 px-4 py-3 rounded-xl shadow-lg backdrop-blur-md">
                      <p className="text-[10px] font-mono text-on-surface-variant mb-1 uppercase tracking-widest">{label}</p>
                      <p className="text-sm font-bold text-primary">{payload[0].value} <span className="text-xs text-on-surface-variant">TP</span></p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="points" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPoints)" 
              activeDot={{ r: 6, fill: 'var(--color-primary)', stroke: 'var(--color-surface)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
