import React from 'react';
import { BusRadarIcon } from './Icons';

export default function Header({
  connectionStatus = 'Live',
  lastSyncTime,
  isGpsActive = true,
  onRefresh,
  isRefreshing = false
}) {
  const isLive = connectionStatus === 'Live';

  return (
    <header className="h-16 px-5 bg-[#081021]/90 backdrop-blur-md border-b border-blue-900/30 flex items-center justify-between z-30 shrink-0">
      {/* Brand & Subtitle */}
      <div className="flex items-center gap-4">
        <div className="relative flex items-center justify-center">
          <BusRadarIcon className="w-9 h-9 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-cyan-200 to-sky-400 bg-clip-text text-transparent font-['Plus_Jakarta_Sans']">
              ROUTE RADAR
            </h1>
            <span className="hidden sm:inline-block text-xs px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 font-mono tracking-wide">
              PS124 • MOBILE URBAN SENSING
            </span>
          </div>
          <span className="text-[11px] text-slate-400 tracking-wide font-medium">
            AI-Powered Road Defect Monitoring
          </span>
        </div>
      </div>

      {/* Right status indicators */}
      <div className="flex items-center gap-3">
        {/* System Status Pill */}
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all ${
          isLive
            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
            : 'bg-rose-950/40 text-rose-400 border-rose-500/40'
        }`}>
          <span className={`w-2 h-2 rounded-full ${
            isLive ? 'bg-emerald-400 animate-ping' : 'bg-rose-500'
          }`} />
          <span className="font-mono text-[11px]">
            {isLive ? 'SYSTEM LIVE' : 'SYSTEM OFFLINE'}
          </span>
        </div>

        {/* GPS Active Pill */}
        <div className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border font-mono ${
          isGpsActive
            ? 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30'
            : 'bg-slate-800/40 text-slate-400 border-slate-700/30'
        }`}>
          <span className="text-cyan-400">📍</span>
          <span className="text-[11px]">GPS ACTIVE</span>
        </div>

        {/* Last Sync Info & Manual Refresh */}
        <div className="hidden lg:flex flex-col items-end pl-2">
          <span className="text-[10px] text-slate-400 font-mono">
            Last sync: <span className="text-cyan-300 font-semibold">{lastSyncTime || '--:--:--'}</span>
          </span>
        </div>

        {/* Manual Refresh Button */}
        <button
          onClick={onRefresh}
          title="Refresh Data Now"
          className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 rounded-lg border border-transparent hover:border-cyan-500/30 transition-all text-xs"
        >
          <svg className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
        </button>
      </div>
    </header>
  );
}
