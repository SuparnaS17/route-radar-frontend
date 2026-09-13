import React, { useEffect } from 'react';
import { categorizeEvent, formatTimestamp } from '../constants';

export default function ImageModal({ event, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  const cat = categorizeEvent(event.event_type);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-3xl w-full bg-[#0b1428] border border-blue-900/60 rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)]"
      >
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#081021] border-b border-blue-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">{cat.icon}</span>
            <div className="flex items-center gap-2">
              <h3 className={`text-sm font-bold tracking-wider uppercase ${cat.accentClass}`}>
                {cat.label}
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                • Detection #{event.id}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Image Display */}
        <div className="p-4 bg-slate-950 flex items-center justify-center max-h-[60vh] overflow-hidden">
          {event.image_data ? (
            <img
              src={`data:image/jpeg;base64,${event.image_data}`}
              alt={`Detection ${event.id}`}
              className="max-h-[56vh] w-auto max-w-full object-contain rounded-lg border border-slate-800"
            />
          ) : (
            <div className="h-48 flex items-center justify-center text-slate-500 font-mono text-sm">
              No thumbnail telemetry image available for this event.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-[#081021] border-t border-blue-900/40 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span>🕒</span>
              <span>Time: <strong className="text-slate-200">{formatTimestamp(event.timestamp)}</strong></span>
            </div>
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span>
                Coordinates: <strong className="text-slate-200">{Number(event.lat).toFixed(5)}, {Number(event.lon).toFixed(5)}</strong>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${cat.badgeClass}`}>
              Severity: {event.severity || 'Medium'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
