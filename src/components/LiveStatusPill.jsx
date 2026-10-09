import React, { useState, useEffect } from 'react';
import { fetchLiveStatus } from '../services/statusApi';

export default function LiveStatusPill() {
  const [status, setStatus] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadStatus = async () => {
      const data = await fetchLiveStatus();
      if (isMounted) setStatus(data);
    };

    loadStatus();
    const interval = setInterval(loadStatus, 45000); // Poll every 45s
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!status) return null;

  const isActive = status.state === 'active';
  const isAway = status.state === 'away';

  const dotColor = isActive
    ? 'bg-[#10B981] shadow-[0_0_8px_#10B981]'
    : isAway
    ? 'bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]'
    : 'bg-slate-500';

  const stateText = isActive ? 'Active' : isAway ? 'Away' : 'Offline';

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md hover:border-neon/40 hover:bg-white/[0.08] transition-all duration-200 cursor-pointer">
        <span className="relative flex h-2 w-2">
          {isActive && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`} />
        </span>
        <span className="font-grotesk text-[11px] uppercase tracking-wider text-slate-300">
          <span className="text-white font-medium">{status.agent?.name || 'Hermes'}:</span> {stateText}
        </span>
      </div>

      {/* Tooltip on Hover */}
      {isHovered && (
        <div className="absolute top-full right-0 mt-2 w-64 p-3 rounded-xl bg-[#030c2c]/95 border border-white/10 shadow-2xl backdrop-blur-xl z-50 animate-fadeIn pointer-events-none">
          <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-white/5">
            <span className="text-[10px] font-mono text-neon uppercase tracking-wider">
              {status.category || 'Focus'}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {status.context?.project ? `repo: ${status.context.project}` : 'live telemetry'}
            </span>
          </div>
          <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed font-sans mb-2">
            {status.task}
          </p>
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
            <span>CPU: {status.hardware?.cpu_percent}%</span>
            <span>RAM: {status.hardware?.ram_used_gb}G</span>
            <span>{status.hardware?.battery}% ⚡</span>
          </div>
        </div>
      )}
    </div>
  );
}
