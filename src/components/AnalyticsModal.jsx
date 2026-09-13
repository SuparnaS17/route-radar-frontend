import React from 'react';
import { categorizeEvent, formatTimestamp } from '../constants';

export default function AnalyticsModal({
  events = [],
  activeTab,
  onClose,
  onSelectEvent,
  onOpenImageModal
}) {
  if (!activeTab || activeTab === 'Dashboard' || activeTab === 'MapView') {
    return null;
  }

  const defectCount = events.filter((e) => categorizeEvent(e.event_type).key === 'defect').length;
  const rashCount = events.filter((e) => categorizeEvent(e.event_type).key === 'rash').length;
  const trafficCount = events.filter((e) => categorizeEvent(e.event_type).key === 'traffic').length;
  const total = events.length || 1;

  const defectPct = Math.round((defectCount / total) * 100);
  const rashPct = Math.round((rashCount / total) * 100);
  const trafficPct = Math.round((trafficCount / total) * 100);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1500] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full max-h-[85vh] bg-[#0b1428] border border-blue-900/50 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#081021] border-b border-blue-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">
              {activeTab === 'Analytics' ? '📊' : activeTab === 'Events' ? '📋' : '⚙️'}
            </span>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                {activeTab === 'Analytics' ? 'Telemetric Analytics & Breakdown' : activeTab === 'Events' ? 'All Captured Road Events' : 'System Configuration'}
              </h2>
              <p className="text-xs text-slate-400">
                RouteRadar Smart Sensing Network • Real-time telemetry
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          {activeTab === 'Analytics' && (
            <div className="space-y-6">
              {/* Distribution Bars */}
              <div className="bg-[#081226] border border-blue-900/30 rounded-2xl p-5">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 font-mono">
                  Event Category Distribution
                </h3>

                <div className="space-y-4">
                  {/* Road Defects */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span className="text-rose-400 flex items-center gap-1.5">
                        <span>⚠️</span> Road Defects
                      </span>
                      <span className="text-slate-300 font-mono">{defectCount} ({defectPct}%)</span>
                    </div>
                    <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-rose-950">
                      <div
                        className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full transition-all duration-500"
                        style={{ width: `${defectPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Rash Driving */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span className="text-amber-400 flex items-center gap-1.5">
                        <span>🚗</span> Rash Driving
                      </span>
                      <span className="text-slate-300 font-mono">{rashCount} ({rashPct}%)</span>
                    </div>
                    <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-amber-950">
                      <div
                        className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${rashPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Traffic */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span className="text-purple-400 flex items-center gap-1.5">
                        <span>👥</span> Traffic Congestion
                      </span>
                      <span className="text-slate-300 font-mono">{trafficCount} ({trafficPct}%)</span>
                    </div>
                    <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-purple-950">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-500"
                        style={{ width: `${trafficPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistical Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#081226] border border-blue-900/30">
                  <span className="text-xs text-slate-400 uppercase font-mono">Total Recorded</span>
                  <div className="text-2xl font-bold text-white mt-1">{events.length}</div>
                  <span className="text-[11px] text-cyan-400 mt-1 block">Active Ingestion</span>
                </div>
                <div className="p-4 rounded-xl bg-[#081226] border border-blue-900/30">
                  <span className="text-xs text-slate-400 uppercase font-mono">Telemetry Density</span>
                  <div className="text-2xl font-bold text-white mt-1">High</div>
                  <span className="text-[11px] text-emerald-400 mt-1 block">Bengaluru Corridor</span>
                </div>
                <div className="p-4 rounded-xl bg-[#081226] border border-blue-900/30">
                  <span className="text-xs text-slate-400 uppercase font-mono">Inference Engine</span>
                  <div className="text-2xl font-bold text-white mt-1">YOLOv8 Edge</div>
                  <span className="text-[11px] text-purple-400 mt-1 block">Mobile Sensing Node</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Events' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#081021] text-slate-400 uppercase font-mono text-[10px] border-b border-blue-900/40">
                  <tr>
                    <th className="py-3 px-3">ID</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-3">Severity</th>
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3">Coordinates</th>
                    <th className="py-3 px-3">Thumbnail</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-900/20 font-mono">
                  {events.map((ev) => {
                    const cat = categorizeEvent(ev.event_type);
                    return (
                      <tr key={ev.id} className="hover:bg-blue-950/30 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-white">#{ev.id}</td>
                        <td className="py-2.5 px-3">
                          <span className="flex items-center gap-1.5">
                            <span>{cat.icon}</span>
                            <span className={cat.accentClass}>{ev.event_type}</span>
                          </span>
                        </td>
                        <td className="py-2.5 px-3 uppercase text-[10px]">
                          <span className={`px-2 py-0.5 rounded-full border ${cat.badgeClass}`}>
                            {ev.severity || 'Medium'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-400">{formatTimestamp(ev.timestamp)}</td>
                        <td className="py-2.5 px-3 text-slate-300">
                          {Number(ev.lat).toFixed(4)}, {Number(ev.lon).toFixed(4)}
                        </td>
                        <td className="py-2.5 px-3">
                          {ev.image_data ? (
                            <img
                              src={`data:image/jpeg;base64,${ev.image_data}`}
                              alt=""
                              onClick={() => onOpenImageModal?.(ev)}
                              className="w-10 h-10 object-cover rounded border border-blue-900/40 cursor-zoom-in hover:scale-110 transition-transform"
                            />
                          ) : (
                            <span className="text-slate-600">None</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => {
                              onSelectEvent?.(ev);
                              onClose?.();
                            }}
                            className="px-2.5 py-1 rounded bg-blue-600/80 hover:bg-blue-500 text-white text-[11px] font-sans font-semibold transition-colors"
                          >
                            View on Map
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Settings' && (
            <div className="bg-[#081226] border border-blue-900/30 rounded-2xl p-5 space-y-4 text-xs text-slate-300">
              <h3 className="font-bold text-white font-mono uppercase text-sm">Frontend Configuration</h3>
              <p className="text-slate-400">
                RouteRadar frontend operates completely client-side, consuming the existing FastAPI backend service.
              </p>
              <div className="space-y-3 font-mono">
                <div className="flex justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400">Map Tile Provider:</span>
                  <span className="text-cyan-400">OpenStreetMap Standard (Free, Zero API Key)</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400">Backend Endpoint:</span>
                  <span className="text-emerald-400">http://127.0.0.1:8000/api/events/</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400">GPS Support:</span>
                  <span className="text-sky-400">Browser Geolocation API (navigator.geolocation)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
