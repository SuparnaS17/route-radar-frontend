import React from 'react';
import { categorizeEvent, formatTimestamp } from '../constants';

export default function Sidebar({
  events = [],
  selectedEventId,
  onSelectEvent,
  activeTab = 'Dashboard',
  onChangeTab,
  onOpenImageModal
}) {
  const navItems = [
    {
      id: 'Dashboard',
      label: 'Dashboard',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )
    },
    {
      id: 'MapView',
      label: 'Map View',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
      )
    },
    {
      id: 'Events',
      label: 'Events',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )
    },
    {
      id: 'Analytics',
      label: 'Analytics',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      id: 'Settings',
      label: 'Settings',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    },
  ];

  return (
    <div className="w-80 md:w-84 lg:w-92 h-full bg-[#081021] border-r border-blue-900/30 flex flex-col shrink-0 overflow-hidden">
      {/* 1. Top Navigation Menu */}
      <div className="p-3 space-y-1 border-b border-blue-900/30 shrink-0">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab?.(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white shadow-[0_0_16px_rgba(37,99,235,0.4)] border border-sky-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-slate-400'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. LIVE DETECTIONS HEADER */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-blue-900/20 bg-[#060c1a] shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <h2 className="text-xs font-bold tracking-wider text-slate-200 uppercase font-['Plus_Jakarta_Sans']">
            LIVE DETECTIONS
          </h2>
        </div>
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[10px] font-bold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          LIVE
        </span>
      </div>

      {/* 3. SCROLLABLE DETECTION LIST */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2.5">
        {events.length === 0 ? (
          <div className="h-48 flex flex-col items-center justify-center text-center p-4">
            <span className="text-2xl mb-2 text-slate-500">📡</span>
            <span className="text-xs font-semibold text-slate-300">No detections found</span>
            <p className="text-[11px] text-slate-500 mt-1 max-w-[200px]">
              Waiting for live telemetry or filter match...
            </p>
          </div>
        ) : (
          events.map((event, index) => {
            const cat = categorizeEvent(event.event_type);
            const isSelected = selectedEventId === event.id;
            const isNew = index === 0;

            return (
              <div
                key={event.id}
                onClick={() => onSelectEvent?.(event)}
                className={`group relative rounded-xl p-2.5 border transition-all duration-200 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'bg-[#121c38] border-rose-500/70 shadow-[0_0_18px_rgba(244,63,94,0.25)] border-l-4 border-l-rose-500'
                    : isNew
                    ? 'bg-[#0c152a] border-blue-500/40 hover:border-cyan-400/60 border-l-4 border-l-rose-500/80 shadow-[0_0_12px_rgba(244,63,94,0.15)]'
                    : 'bg-[#0a1224] border-blue-950/60 hover:bg-[#0d1830] hover:border-blue-800/60'
                }`}
              >
                <div className="flex gap-2.5 items-center">
                  {/* Left: Thumbnail Image */}
                  <div
                    onClick={(e) => {
                      if (event.image_data) {
                        e.stopPropagation();
                        onOpenImageModal?.(event);
                      }
                    }}
                    className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-900 border border-blue-900/40 relative flex items-center justify-center cursor-zoom-in group/img"
                  >
                    {event.image_data ? (
                      <>
                        <img
                          src={`data:image/jpeg;base64,${event.image_data}`}
                          alt="Detection"
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-[10px] text-white">🔍</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-xl opacity-60">
                        {cat.icon}
                      </div>
                    )}
                  </div>

                  {/* Right: Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-xs">{cat.icon}</span>
                        <span className={`text-[11px] font-bold tracking-wider uppercase truncate ${cat.accentClass}`}>
                          {cat.label}
                        </span>
                      </div>
                      {isNew && (
                        <span className="px-1.5 py-0.2 rounded bg-rose-600 text-white text-[9px] font-extrabold tracking-wider animate-pulse">
                          NEW
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                      • Detection #{event.id}
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono mt-0.5">
                      <span>🕒</span>
                      <span>{formatTimestamp(event.timestamp)}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono truncate mt-0.5">
                      <span>📍</span>
                      <span>
                        {Number(event.lat).toFixed(4)}, {Number(event.lon).toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
