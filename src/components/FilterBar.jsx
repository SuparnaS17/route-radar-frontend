import React from 'react';

export default function FilterBar({
  activeFilter = 'All',
  onSelectFilter,
  counts = { all: 0, defects: 0, rash: 0, traffic: 0 },
  searchQuery = '',
  onSearchChange,
  onResetFilters
}) {
  return (
    <div className="px-5 py-2 flex flex-wrap items-center justify-between gap-3 shrink-0">
      {/* Left: Filter funnel + Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-1">
        {/* Funnel Icon */}
        <button
          onClick={onResetFilters}
          title="Reset Filters"
          className="p-2 text-slate-400 hover:text-cyan-400 rounded-xl bg-[#0b1428] border border-blue-900/30 hover:border-cyan-500/40 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
        </button>

        {/* 1. All */}
        <button
          onClick={() => onSelectFilter('All')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
            activeFilter === 'All'
              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-400/60 shadow-[0_0_15px_rgba(14,165,233,0.4)]'
              : 'bg-[#0b1428]/80 text-slate-300 border-blue-900/40 hover:border-sky-500/40'
          }`}
        >
          <span>All</span>
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
            activeFilter === 'All' ? 'bg-sky-900/60 text-white' : 'bg-slate-800 text-slate-400'
          }`}>
            {counts.all}
          </span>
        </button>

        {/* 2. Defects */}
        <button
          onClick={() => onSelectFilter('Road Defect')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
            activeFilter === 'Road Defect'
              ? 'bg-rose-950/80 text-rose-300 border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
              : 'bg-[#0b1428]/80 text-rose-400 border-rose-900/40 hover:border-rose-500/40'
          }`}
        >
          <span className="text-rose-400">⚠️</span>
          <span>Defects</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-950/60 text-rose-300">
            {counts.defects}
          </span>
        </button>

        {/* 3. Rash */}
        <button
          onClick={() => onSelectFilter('Rash Driving')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
            activeFilter === 'Rash Driving'
              ? 'bg-amber-950/80 text-amber-300 border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
              : 'bg-[#0b1428]/80 text-amber-400 border-amber-900/40 hover:border-amber-500/40'
          }`}
        >
          <span>🚗</span>
          <span>Rash</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/60 text-amber-300">
            {counts.rash}
          </span>
        </button>

        {/* 4. Traffic */}
        <button
          onClick={() => onSelectFilter('Traffic')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
            activeFilter === 'Traffic'
              ? 'bg-purple-950/80 text-purple-300 border-purple-500/80 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
              : 'bg-[#0b1428]/80 text-purple-400 border-purple-900/40 hover:border-purple-500/40'
          }`}
        >
          <span>👥</span>
          <span>Traffic</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-950/60 text-purple-300">
            {counts.traffic}
          </span>
        </button>
      </div>

      {/* Right: Search Input */}
      <div className="flex items-center gap-2 flex-1 max-w-sm ml-auto">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events, IDs or coordinates..."
            className="w-full pl-9 pr-8 py-1.5 bg-[#0a1224]/90 border border-blue-900/40 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sliders / Toggle */}
        <button
          onClick={onResetFilters}
          title="Reset All"
          className="p-2 text-slate-400 hover:text-cyan-400 rounded-xl bg-[#0b1428] border border-blue-900/30 hover:border-cyan-500/40 transition-colors shrink-0"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
