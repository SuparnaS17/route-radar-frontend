import React from 'react';

export function BusRadarIcon({ className = "w-8 h-8" }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="22" height="24" rx="4" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
      <rect x="7" y="12" width="16" height="7" rx="1.5" fill="#082f49" />
      <circle cx="9" cy="26" r="2.5" fill="#38bdf8" />
      <circle cx="21" cy="26" r="2.5" fill="#38bdf8" />
      <line x1="10" y1="21" x2="20" y2="21" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
      {/* Radar waves */}
      <path d="M29 13C31 15 32 18 32 21C32 24 31 27 29 29" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M33 9C36 12 37 16 37 21C37 26 36 30 33 33" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function RadarCircleIcon({ className = "w-5 h-5 text-cyan-400" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
    </svg>
  );
}

export function WarningTriangleIcon({ className = "w-5 h-5 text-rose-500" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function CarIncidentIcon({ className = "w-5 h-5 text-amber-500" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

export function TrafficClusterIcon({ className = "w-5 h-5 text-purple-400" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="8" r="3" />
      <circle cx="18" cy="8" r="3" />
      <circle cx="12" cy="17" r="3" />
      <path d="M9 8h6" />
      <path d="m8 10 2.5 4.5" />
      <path d="m16 10-2.5 4.5" />
    </svg>
  );
}

export function TrendingUpIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

export function CrosshairIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="22" y1="12" x2="18" y2="12" />
      <line x1="6" y1="12" x2="2" y2="12" />
      <line x1="12" y1="6" x2="12" y2="2" />
      <line x1="12" y1="22" x2="12" y2="18" />
    </svg>
  );
}

export function PulseWaveIcon({ className = "w-6 h-3 text-emerald-400" }) {
  return (
    <svg className={className} viewBox="0 0 36 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 8h7l3-6 4 12 3-8 3 4h14" />
    </svg>
  );
}
