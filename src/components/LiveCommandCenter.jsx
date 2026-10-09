import React, { useState, useEffect } from 'react';
import { fetchLiveStatus, sendWave, trackVisit } from '../services/statusApi';

// Helper to generate smooth SVG path for CPU sparkline
function generateSparklinePath(points, width, height) {
  if (!points || points.length < 2) return '';
  const min = 0;
  const max = Math.max(...points, 50); // Scale up to at least 50%
  const stepX = width / (points.length - 1);

  const coordinates = points.map((val, idx) => {
    const x = idx * stepX;
    const y = height - (val / max) * (height - 8) - 4;
    return { x, y };
  });

  return coordinates.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
  }, '');
}

export default function LiveCommandCenter() {
  const [status, setStatus] = useState(null);
  const [waves, setWaves] = useState(0);
  const [hasWaved, setHasWaved] = useState(false);
  const [isWaving, setIsWaving] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      const data = await fetchLiveStatus();
      if (isMounted) {
        setStatus(data);
        if (data.waves_count) setWaves(data.waves_count);
      }
      // Non-intrusive visit notification
      trackVisit();
    };

    init();
    const interval = setInterval(async () => {
      const data = await fetchLiveStatus();
      if (isMounted) setStatus(data);
    }, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleWave = async () => {
    if (hasWaved || isWaving) return;
    setIsWaving(true);
    setWaves((prev) => prev + 1);
    setHasWaved(true);

    try {
      const res = await sendWave();
      if (res?.waves_count) setWaves(res.waves_count);
    } catch (e) {
      console.error(e);
    } finally {
      setIsWaving(false);
    }
  };

  if (!status) return null;

  const isActive = status.state === 'active';
  const isAway = status.state === 'away';
  const cpuHistory = status.hardware?.cpu_history || [15, 20, 18, 25, 16];
  const sparklineWidth = 140;
  const sparklineHeight = 36;
  const sparklinePath = generateSparklinePath(cpuHistory, sparklineWidth, sparklineHeight);

  // Calculate relative time
  const timeDiffMins = Math.floor((Date.now() - new Date(status.updated_at).getTime()) / 60000);
  const relativeTime = timeDiffMins <= 1 ? 'Just now' : `${timeDiffMins}m ago`;

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 sm:p-8 rounded-3xl liquid-glass border border-white/10 shadow-2xl relative overflow-hidden group">
      {/* Subtle background glow effect */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="relative flex h-3 w-3">
            {isActive && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                isActive
                  ? 'bg-neon shadow-[0_0_12px_#38ef7d]'
                  : isAway
                  ? 'bg-amber-400'
                  : 'bg-slate-500'
              }`}
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-grotesk text-sm font-semibold tracking-wider uppercase text-white">
                Live Developer Pulse
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neon border border-neon/20">
                {status.agent?.name || 'Hermes'} Online
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs font-mono text-slate-400">
          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            <span>Synced: {relativeTime}</span>
          </span>
          <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] text-slate-300">
            Model: {status.agent?.model || 'Hermes 3'}
          </span>
        </div>
      </div>

      {/* Arrival Notification Ribbon */}
      <div className="mt-4 px-3.5 py-2 rounded-xl bg-neon/[0.05] border border-neon/20 flex items-center justify-between gap-3 text-xs backdrop-blur-md">
        <div className="flex items-center space-x-2.5 overflow-hidden">
          <span className="flex h-2 w-2 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon" />
          </span>
          <span className="font-mono text-[11px] text-slate-300 truncate sm:overflow-visible">
            <strong className="text-neon font-semibold">📡 Beacon Active:</strong> Your arrival was informed to Nithin's Telegram.
          </span>
        </div>
        <button
          onClick={handleWave}
          disabled={hasWaved || isWaving}
          className="text-[11px] font-mono text-neon hover:text-white underline transition-colors cursor-pointer flex-shrink-0"
        >
          {hasWaved ? '✓ Wave Sent' : 'Wave Back 👋'}
        </button>
      </div>

      {/* Main Focus / Current Task Section */}
      <div className="my-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-2 flex items-center space-x-2">
          <span>Current Focus & Goal</span>
          <span className="w-8 h-[1px] bg-white/20" />
          <span className="text-neon font-semibold">{status.category || 'Engineering'}</span>
        </div>
        <h3 className="font-grotesk text-lg sm:text-xl font-medium text-white tracking-wide leading-relaxed">
          {status.task}
        </h3>
      </div>

      {/* Hardware Telemetry & Sparkline Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        {/* CPU + Sparkline */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
            <span>CPU LOAD</span>
            <span className="text-neon font-semibold">{status.hardware?.cpu_percent}%</span>
          </div>
          <div className="h-9 flex items-center justify-center">
            <svg width={sparklineWidth} height={sparklineHeight} className="overflow-visible w-full">
              <defs>
                <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38ef7d" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#38ef7d" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d={sparklinePath}
                fill="none"
                stroke="#38ef7d"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* RAM Usage */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between">
          <div className="text-[11px] font-mono text-slate-400 mb-1">MEMORY</div>
          <div className="font-grotesk text-lg font-bold text-white">
            {status.hardware?.ram_used_gb}{' '}
            <span className="text-xs font-normal text-slate-400 font-mono">
              / {status.hardware?.ram_total_gb} GB
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-cyan-400 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(
                  100,
                  ((status.hardware?.ram_used_gb || 4) / (status.hardware?.ram_total_gb || 16)) * 100
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Battery & Power */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between">
          <div className="text-[11px] font-mono text-slate-400 mb-1">POWER STATUS</div>
          <div className="font-grotesk text-lg font-bold text-white flex items-center space-x-1.5">
            <span>{status.hardware?.battery}%</span>
            {status.hardware?.is_charging && (
              <span className="text-neon text-sm animate-pulse" title="Plugged In">
                ⚡
              </span>
            )}
          </div>
          <div className="text-[10px] font-mono text-slate-400">
            {status.hardware?.is_charging ? 'Connected to AC' : 'On Battery'}
          </div>
        </div>

        {/* System Uptime */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between">
          <div className="text-[11px] font-mono text-slate-400 mb-1">UPTIME</div>
          <div className="font-grotesk text-lg font-bold text-white">
            {status.hardware?.uptime || 'Active'}
          </div>
          <div className="text-[10px] font-mono text-slate-400">Continuous session</div>
        </div>
      </div>

      {/* Footer: Workspace Context & Wave Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/10 text-xs">
        <div className="flex flex-wrap items-center gap-3 font-mono text-slate-300">
          <span className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/5">
            <span>📁</span>
            <span>{status.context?.project || 'landing'}</span>
            <span className="text-slate-500">({status.context?.branch || 'master'})</span>
          </span>
          {status.context?.music && (
            <span className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-300">
              <span>🎧</span>
              <span className="truncate max-w-[180px]">{status.context.music}</span>
            </span>
          )}
        </div>

        {/* Interactive Wave Button */}
        <button
          onClick={handleWave}
          disabled={hasWaved || isWaving}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-grotesk text-xs uppercase tracking-wider font-semibold transition-all duration-300 transform active:scale-95 ${
            hasWaved
              ? 'bg-neon text-black cursor-default shadow-[0_0_16px_rgba(56,239,125,0.4)]'
              : 'bg-white/10 hover:bg-neon hover:text-black text-white border border-white/15 hover:border-neon'
          }`}
        >
          <span className={isWaving ? 'animate-spin' : ''}>👋</span>
          <span>{hasWaved ? 'Wave Sent to Telegram!' : 'Wave at Nithin'}</span>
          <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px] font-mono font-normal">
            {waves}
          </span>
        </button>
      </div>
    </div>
  );
}
