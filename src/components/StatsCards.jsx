import React from 'react';
import {
  RadarCircleIcon,
  WarningTriangleIcon,
  CarIncidentIcon,
  TrafficClusterIcon,
  TrendingUpIcon
} from './Icons';

export default function StatsCards({
  totalEvents = 0,
  defectCount = 0,
  rashCount = 0,
  trafficCount = 0,
  activeFilter = 'All',
  onSelectFilter
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 px-5 pt-3 pb-2 shrink-0">
      {/* 1. TOTAL EVENTS */}
      <div
        onClick={() => onSelectFilter?.('All')}
        className={`relative overflow-hidden rounded-2xl p-4 bg-gradient-to-r from-[#071d34]/70 via-[#071326]/80 to-[#070c18] border transition-all duration-200 cursor-pointer group shadow-lg ${
          activeFilter === 'All'
            ? 'border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
            : 'border-cyan-500/20 hover:border-cyan-400/40'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.25)] group-hover:scale-105 transition-transform">
              <RadarCircleIcon className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">
                TOTAL EVENTS
              </span>
              <div className="text-3xl font-extrabold text-white tracking-tight leading-none mt-1">
                {totalEvents}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                Live telemetry
              </div>
            </div>
          </div>
          <div className="text-cyan-400/80 self-start mt-1">
            <TrendingUpIcon className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 2. ROAD DEFECTS */}
      <div
        onClick={() => onSelectFilter?.('Road Defect')}
        className={`relative overflow-hidden rounded-2xl p-4 bg-gradient-to-r from-[#290d16]/70 via-[#1a0a12]/80 to-[#070c18] border transition-all duration-200 cursor-pointer group shadow-lg ${
          activeFilter === 'Road Defect'
            ? 'border-rose-400/60 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
            : 'border-rose-500/20 hover:border-rose-400/40'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-rose-950/80 border border-rose-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(244,63,94,0.25)] group-hover:scale-105 transition-transform">
              <WarningTriangleIcon className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider text-rose-200 uppercase">
                ROAD DEFECTS
              </span>
              <div className="text-3xl font-extrabold text-rose-500 tracking-tight leading-none mt-1">
                {defectCount}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                Detected locations
              </div>
            </div>
          </div>
          <div className="text-rose-400/80 self-start mt-1">
            <TrendingUpIcon className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 3. RASH DRIVING */}
      <div
        onClick={() => onSelectFilter?.('Rash Driving')}
        className={`relative overflow-hidden rounded-2xl p-4 bg-gradient-to-r from-[#291a0b]/70 via-[#181107]/80 to-[#070c18] border transition-all duration-200 cursor-pointer group shadow-lg ${
          activeFilter === 'Rash Driving'
            ? 'border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
            : 'border-amber-500/20 hover:border-amber-400/40'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.25)] group-hover:scale-105 transition-transform">
              <CarIncidentIcon className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider text-amber-200 uppercase">
                RASH DRIVING
              </span>
              <div className="text-3xl font-extrabold text-amber-400 tracking-tight leading-none mt-1">
                {rashCount}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                Safety incidents
              </div>
            </div>
          </div>
          <div className="text-amber-400/80 self-start mt-1">
            <TrendingUpIcon className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 4. TRAFFIC */}
      <div
        onClick={() => onSelectFilter?.('Traffic')}
        className={`relative overflow-hidden rounded-2xl p-4 bg-gradient-to-r from-[#200c30]/70 via-[#140820]/80 to-[#070c18] border transition-all duration-200 cursor-pointer group shadow-lg ${
          activeFilter === 'Traffic'
            ? 'border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
            : 'border-purple-500/20 hover:border-purple-400/40'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.25)] group-hover:scale-105 transition-transform">
              <TrafficClusterIcon className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider text-purple-200 uppercase">
                TRAFFIC
              </span>
              <div className="text-3xl font-extrabold text-purple-400 tracking-tight leading-none mt-1">
                {trafficCount}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                Traffic events
              </div>
            </div>
          </div>
          <div className="text-purple-400/80 self-start mt-1">
            <TrendingUpIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
