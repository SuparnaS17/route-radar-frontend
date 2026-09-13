import React from 'react';

export default function FooterBar({
  connectionStatus = 'Live',
  lastSyncTime,
  pollingIntervalMs = 2000,
  isAutoRefresh = true,
  onToggleAutoRefresh
}) {
  const isLive = connectionStatus === 'Live';

  return (
    <footer className="h-8 px-5 bg-[#060b17] border-t border-blue-900/30 flex items-center justify-between text-[11px] text-slate-400 font-mono z-20 shrink-0 select-none">
      {/* Left: Live Updates indicator */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleAutoRefresh}
          className="flex items-center gap-2 hover:text-slate-200 transition-colors cursor-pointer"
          title={isAutoRefresh ? "Pause live polling" : "Resume live polling"}
        >
          <span className={`w-2 h-2 rounded-full ${
            isLive && isAutoRefresh ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'
          }`} />
          <span className={isLive ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
            Live Updates
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">
            {isAutoRefresh ? `Polling every ${Math.round(pollingIntervalMs / 1000)}s` : 'Polling Paused'}
          </span>
        </button>
      </div>

      {/* Right: Last Sync Time */}
      <div className="flex items-center gap-2">
        <span>🕒</span>
        <span>Last sync: <strong className="text-slate-300">{lastSyncTime || '--:--:--'}</strong></span>
      </div>
    </footer>
  );
}
