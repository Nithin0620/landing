import React, { useState, useEffect, useRef } from 'react';
import { trackVisit, sendWave } from '../services/statusApi';

export default function VisitorArrivalToast() {
  const [visible, setVisible] = useState(false);
  const [hasWaved, setHasWaved] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Show toast on page load
    const timer = setTimeout(() => {
      setVisible(true);
      trackVisit();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible || isPaused) return;

    // 10-second timer with smooth progress bar
    const duration = 10000;
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          setVisible(false);
          return 0;
        }
        return prev - step;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [visible, isPaused]);

  const handleQuickWave = async () => {
    if (hasWaved || isWaving) return;
    setIsWaving(true);
    setHasWaved(true);
    try {
      await sendWave();
    } catch {
      // silent
    } finally {
      setIsWaving(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] max-w-md w-[calc(100vw-3rem)] animate-slideUpFade"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#020721]/95 border border-neon/40 p-4 sm:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_24px_rgba(111,255,0,0.2)] backdrop-blur-2xl">
        {/* Glow accent in corner */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-neon/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start space-x-3.5">
            {/* Pulsing Satellite / Radar Icon */}
            <div className="relative mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-neon/10 border border-neon/30 text-neon flex-shrink-0 shadow-[0_0_12px_rgba(111,255,0,0.3)]">
              <span className="text-base">📡</span>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-80" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neon" />
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neon">
                  Telegram Beacon Dispatched
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live Alert
                </span>
              </div>
              <p className="mt-1.5 text-xs text-slate-100 leading-relaxed font-sans">
                Nithin was notified via Telegram that you arrived on the page. Feel free to explore or wave!
              </p>
            </div>
          </div>

          {/* Dismiss '✕' button */}
          <button
            onClick={() => setVisible(false)}
            className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 flex-shrink-0 cursor-pointer"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>

        {/* Action strip */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            onClick={handleQuickWave}
            disabled={hasWaved || isWaving}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-grotesk text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
              hasWaved
                ? 'bg-neon text-black cursor-default shadow-[0_0_12px_rgba(111,255,0,0.4)]'
                : 'bg-white/10 hover:bg-neon hover:text-black text-white border border-white/20 hover:border-neon'
            }`}
          >
            <span className={isWaving ? 'animate-spin' : ''}>👋</span>
            <span>{hasWaved ? 'Wave Sent to Telegram!' : 'Wave at Nithin'}</span>
          </button>

          <span className="text-[10px] font-mono text-slate-400">
            {isPaused ? 'Paused on hover' : 'Auto-closing...'}
          </span>
        </div>

        {/* Progress timer bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full bg-neon transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
