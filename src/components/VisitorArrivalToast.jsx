import React, { useState, useEffect } from 'react';
import { trackVisit, sendWave } from '../services/statusApi';

export default function VisitorArrivalToast() {
  const [visible, setVisible] = useState(false);
  const [hasWaved, setHasWaved] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Only trigger once per session
    const sessionSeen = sessionStorage.getItem('arrival_toast_seen');
    if (sessionSeen) return;

    const notify = async () => {
      // Small delay so the page animation settles first
      await new Promise((r) => setTimeout(r, 1200));
      const res = await trackVisit();
      sessionStorage.setItem('arrival_toast_seen', 'true');
      setVisible(true);
    };

    notify();
  }, []);

  useEffect(() => {
    if (!visible) return;

    // 8-second auto-dismiss with animated progress bar
    const duration = 8000;
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setVisible(false);
          return 0;
        }
        return prev - step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [visible]);

  const handleQuickWave = async () => {
    if (hasWaved) return;
    setHasWaved(true);
    try {
      await sendWave();
    } catch {
      // silent
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100vw-3rem)] animate-slideUp">
      <div className="relative overflow-hidden rounded-2xl liquid-glass border border-neon/30 bg-[#030c2c]/90 p-4 shadow-[0_0_30px_rgba(56,239,125,0.15)] backdrop-blur-xl">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-neon/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start space-x-3">
            {/* Animated Beacon Icon */}
            <div className="relative mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl bg-neon/10 border border-neon/30 text-neon flex-shrink-0">
              <span className="text-sm">📡</span>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon" />
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-neon">
                  Live Telegram Ping
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                  Beacon Dispatched
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-200 leading-relaxed font-sans">
                Your arrival was informed to Nithin's device via Telegram. Welcome!
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => setVisible(false)}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>

        {/* Quick Action Strip */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
          <button
            onClick={handleQuickWave}
            disabled={hasWaved}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg font-mono text-[11px] transition-all ${
              hasWaved
                ? 'bg-neon/20 text-neon border border-neon/40'
                : 'bg-white/10 hover:bg-neon hover:text-black text-white border border-white/10'
            }`}
          >
            <span>👋</span>
            <span>{hasWaved ? 'Wave Sent!' : 'Say Hi / Wave'}</span>
          </button>

          <span className="text-[10px] font-mono text-slate-400">
            Auto-closing...
          </span>
        </div>

        {/* Progress timer bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
          <div
            className="h-full bg-neon transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
