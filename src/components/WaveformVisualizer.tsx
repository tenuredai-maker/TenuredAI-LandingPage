import React, { useEffect, useRef } from "react";

export interface WaveformProps { 
  isPlaying: boolean; 
  sentimentData?: { intensity: number; density: number }[];
  progress?: number;
}

export const WaveformVisualizer = ({ 
  isPlaying, 
  sentimentData, 
  progress = 0 
}: WaveformProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const framesRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use parent container dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      // Increase resolution for retina displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      ctx.clearRect(0, 0, width, height);
      
      const bars = 40;
      const barPadding = 2;
      const barWidth = (width - (bars - 1) * barPadding) / bars;
      
      framesRef.current += isPlaying ? 0.05 : 0.01;

      // Extract current focus sentiment for global color modulation
      const currentSegmentIndex = (sentimentData && progress > 0) ? Math.floor(progress * sentimentData.length) : -1;
      const currentSentiment = (currentSegmentIndex >= 0 && sentimentData) ? sentimentData[currentSegmentIndex] : null;

      for (let i = 0; i < bars; i++) {
        // Use sentiment data to modulate the base height if available
        const sentiment = sentimentData ? sentimentData[i % sentimentData.length] : { intensity: 0.5, density: 0.5 };
        
        // Base height from sentiment intensity
        const baseHeight = sentiment.intensity * (height * 0.6);
        
        // Dynamic oscillation based on playback state
        const phase = framesRef.current + (i * 0.2);
        const oscillation = isPlaying 
          ? Math.sin(phase) * (height * 0.3) 
          : Math.sin(phase * 0.5) * (height * 0.1);
        
        const finalHeight = Math.max(4, baseHeight + oscillation);
        
        // Color interpolation based on density
        // Ochre: #775a19, Blue: #1e3a8a
        const barDensity = sentiment.density;
        
        // Shift global "vibe" toward the current playhead sentiment (40% weight)
        const activeMix = currentSentiment 
          ? (barDensity * 0.6 + currentSentiment.density * 0.4) 
          : barDensity;

        // Passed bars get a slightly more vivid shift
        const barProgress = i / bars;
        const isPassed = barProgress < progress;
        
        const r = Math.round(30 + (119 - 30) * activeMix);
        const g = Math.round(58 + (90 - 58) * activeMix);
        const b = Math.round(138 + (25 - 138) * activeMix);
        
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        
        // Playhead interaction
        if (isPlaying) {
          if (isPassed) {
            ctx.globalAlpha = 1.0;
            ctx.shadowBlur = 12;
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
          } else {
            ctx.globalAlpha = 0.6;
            ctx.shadowBlur = 4;
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
          }
        } else {
          ctx.globalAlpha = 0.4;
          ctx.shadowBlur = 0;
        }
        
        // Draw centered bar
        const x = i * (barWidth + barPadding);
        const y = (height - finalHeight) / 2;
        
        ctx.beginPath();
        const radius = barWidth / 2;
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barWidth, finalHeight, radius);
        } else {
          ctx.rect(x, y, barWidth, finalHeight);
        }
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, sentimentData, progress]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};
