import React, { useEffect, useRef, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { categorizeEvent, formatTimestamp, isValidCoord, DEFAULT_MAP_CENTER, DEFAULT_ZOOM } from '../constants';
import { PulseWaveIcon } from './Icons';

// Custom Map Controller to handle flying to selected event or fitting bounds
function MapController({ selectedEvent, userLocation, fitBoundsTrigger, events }) {
  const map = useMap();
  const hasFittedRef = useRef(false);

  useEffect(() => {
    if (selectedEvent && isValidCoord(selectedEvent.lat, selectedEvent.lon)) {
      map.flyTo([Number(selectedEvent.lat), Number(selectedEvent.lon)], 16, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  }, [selectedEvent, map]);

  useEffect(() => {
    if (userLocation && isValidCoord(userLocation.lat, userLocation.lon)) {
      map.flyTo([userLocation.lat, userLocation.lon], 15, {
        duration: 1.2,
      });
    }
  }, [userLocation, map]);

  useEffect(() => {
    if ((!hasFittedRef.current || fitBoundsTrigger > 0) && events && events.length > 0) {
      const validCoords = events
        .filter((e) => isValidCoord(e.lat, e.lon))
        .map((e) => [Number(e.lat), Number(e.lon)]);

      if (validCoords.length > 0) {
        hasFittedRef.current = true;
        const bounds = L.latLngBounds(validCoords);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      }
    }
  }, [fitBoundsTrigger, events, map]);

  return null;
}

// Marker Icon Factory creating SVG DivIcons
function createCustomDivIcon(category, isSelected = false) {
  const isDefect = category.key === 'defect';
  const isRash = category.key === 'rash';

  const bgColor = isDefect ? '#ef4444' : isRash ? '#f59e0b' : '#a855f7';
  const glowColor = isDefect ? 'rgba(239, 68, 68, 0.6)' : isRash ? 'rgba(245, 158, 11, 0.6)' : 'rgba(168, 85, 247, 0.6)';

  const iconSymbol = isDefect
    ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
    : isRash
    ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 17h14v-4l-3-4H8l-3 4z"/></svg>`
    : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="6" cy="8" r="3"/><circle cx="18" cy="8" r="3"/><circle cx="12" cy="17" r="3"/></svg>`;

  const haloHtml = isSelected
    ? `<div style="position:absolute; width:64px; height:64px; top:-18px; left:-18px; border-radius:50%; background:${glowColor}; animation:radar-beacon 1.8s infinite ease-out; pointer-events:none;"></div>`
    : '';

  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="position:relative; width:28px; height:28px; display:flex; align-items:center; justify-content:center;">
        ${haloHtml}
        <div style="
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: ${bgColor};
          border: 2px solid #ffffff;
          box-shadow: 0 0 14px ${glowColor}, 0 2px 6px rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
          transition: transform 0.2s;
        ">
          ${iconSymbol}
        </div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
}

// User Location Pin
function createUserLocationDivIcon() {
  return L.divIcon({
    className: 'user-location-pin',
    html: `
      <div style="position:relative; width:32px; height:32px; display:flex; align-items:center; justify-content:center;">
        <div style="position:absolute; width:48px; height:48px; border-radius:50%; background:rgba(16, 185, 129, 0.4); animation:radar-beacon 2s infinite ease-out;"></div>
        <div style="
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #10b981;
          border: 2.5px solid #ffffff;
          box-shadow: 0 0 16px rgba(16, 185, 129, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
}

export default function MapView({
  events = [],
  selectedEvent,
  onSelectEvent,
  onOpenImageModal,
}) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [gpsError, setGpsError] = useState(null);
  const [fitBoundsTrigger, setFitBoundsTrigger] = useState(0);
  const mapRef = useRef(null);
  const markerRefs = useRef({});

  // Trigger GPS Geolocation
  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }
    setGpsError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracy: Math.round(pos.coords.accuracy),
        };
        setUserLocation(coords);
      },
      (err) => {
        console.warn('Geolocation denied or error:', err.message);
        setGpsError('Location access was denied or is unavailable.');
        setTimeout(() => setGpsError(null), 5000);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Open popup when selectedEvent changes
  useEffect(() => {
    if (selectedEvent && markerRefs.current[selectedEvent.id]) {
      markerRefs.current[selectedEvent.id].openPopup();
    }
  }, [selectedEvent]);

  // Determine active coordinates to display on the "Current Location" card
  const displayLocation = useMemo(() => {
    if (userLocation) {
      return {
        lat: userLocation.lat.toFixed(4),
        lon: userLocation.lon.toFixed(4),
        accuracy: `±${userLocation.accuracy || 15}m`,
        source: 'GPS Device',
      };
    }
    if (selectedEvent && isValidCoord(selectedEvent.lat, selectedEvent.lon)) {
      return {
        lat: Number(selectedEvent.lat).toFixed(4),
        lon: Number(selectedEvent.lon).toFixed(4),
        accuracy: 'Telemetric',
        source: `Detection #${selectedEvent.id}`,
      };
    }
    return {
      lat: DEFAULT_MAP_CENTER[0].toFixed(4),
      lon: DEFAULT_MAP_CENTER[1].toFixed(4),
      accuracy: 'Default',
      source: 'Bengaluru Core',
    };
  }, [userLocation, selectedEvent]);

  return (
    <div className={`relative flex-1 w-full h-full overflow-hidden ${isDarkMode ? 'dark-tiles' : 'light-tiles'}`}>
      {/* 1. Leaflet Map Container */}
      <MapContainer
        center={DEFAULT_MAP_CENTER}
        zoom={DEFAULT_ZOOM}
        zoomControl={false}
        className="w-full h-full z-0"
        ref={mapRef}
      >
        {/* Free Standard OpenStreetMap Tiles - 100% Free, NO API KEY */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Map Controller for Bounds & FlyTo */}
        <MapController
          selectedEvent={selectedEvent}
          userLocation={userLocation}
          fitBoundsTrigger={fitBoundsTrigger}
          events={events}
        />

        {/* User GPS Location Marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lon]}
            icon={createUserLocationDivIcon()}
          >
            <Popup className="custom-leaflet-popup">
              <div className="p-3 bg-[#0b1329] text-white">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <span>📍</span>
                  <span>CURRENT LOCATION</span>
                </div>
                <div className="text-xs text-slate-300 font-mono mt-1">
                  {userLocation.lat.toFixed(5)}, {userLocation.lon.toFixed(5)}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Accuracy: ±{userLocation.accuracy}m
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Detection Markers */}
        {events.map((event) => {
          if (!isValidCoord(event.lat, event.lon)) return null;

          const cat = categorizeEvent(event.event_type);
          const isSelected = selectedEvent?.id === event.id;
          const markerIcon = createCustomDivIcon(cat, isSelected);

          return (
            <Marker
              key={event.id}
              position={[Number(event.lat), Number(event.lon)]}
              icon={markerIcon}
              ref={(ref) => {
                if (ref) markerRefs.current[event.id] = ref;
              }}
              eventHandlers={{
                click: () => onSelectEvent?.(event),
              }}
            >
              <Popup className="custom-leaflet-popup">
                <div className="w-64 p-3 bg-[#0b1329] text-white rounded-xl">
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{cat.icon}</span>
                      <span className={`text-xs font-bold tracking-wider uppercase ${cat.accentClass}`}>
                        {cat.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/50">
                      #{event.id}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-200 mb-1">
                    Detection #{event.id}
                  </div>

                  {/* Time & Coordinates */}
                  <div className="space-y-1 mb-2 text-[11px] text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span>🕒</span>
                      <span>{formatTimestamp(event.timestamp)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>📍</span>
                      <span>
                        {Number(event.lat).toFixed(4)}, {Number(event.lon).toFixed(4)}
                      </span>
                    </div>
                  </div>

                  {/* Base64 Detection Image */}
                  {event.image_data && (
                    <div
                      onClick={() => onOpenImageModal?.(event)}
                      className="relative rounded-lg overflow-hidden border border-blue-900/50 cursor-pointer group shadow-sm mt-2"
                    >
                      <img
                        src={`data:image/jpeg;base64,${event.image_data}`}
                        alt="Detection Preview"
                        className="w-full h-24 object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs text-white bg-slate-900/80 px-2 py-1 rounded-md font-sans">
                          Click to enlarge 🔍
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* 2. Custom Map Controls (Top Left) */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
        <div className="bg-[#0b1428]/90 backdrop-blur-md rounded-xl border border-blue-900/40 p-1 flex flex-col shadow-xl">
          {/* Zoom In */}
          <button
            onClick={() => mapRef.current?.zoomIn()}
            title="Zoom In"
            className="w-8 h-8 flex items-center justify-center text-slate-200 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg text-lg font-bold transition-all"
          >
            +
          </button>
          <div className="h-px w-6 bg-blue-900/40 mx-auto" />
          {/* Zoom Out */}
          <button
            onClick={() => mapRef.current?.zoomOut()}
            title="Zoom Out"
            className="w-8 h-8 flex items-center justify-center text-slate-200 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg text-lg font-bold transition-all"
          >
            −
          </button>
        </div>

        {/* My Location / GPS Locate */}
        <button
          onClick={handleLocateUser}
          title="Locate My Position (GPS)"
          className="w-10 h-10 bg-[#0b1428]/90 backdrop-blur-md border border-blue-900/40 hover:border-cyan-400/60 rounded-xl flex items-center justify-center text-slate-300 hover:text-cyan-300 shadow-xl transition-all group"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="22" y1="12" x2="18" y2="12" />
            <line x1="6" y1="12" x2="2" y2="12" />
            <line x1="12" y1="6" x2="12" y2="2" />
            <line x1="12" y1="22" x2="12" y2="18" />
          </svg>
        </button>

        {/* Fit All Markers Bounds */}
        <button
          onClick={() => setFitBoundsTrigger((prev) => prev + 1)}
          title="Fit All Detections"
          className="w-10 h-10 bg-[#0b1428]/90 backdrop-blur-md border border-blue-900/40 hover:border-cyan-400/60 rounded-xl flex items-center justify-center text-slate-300 hover:text-cyan-300 shadow-xl transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </button>

        {/* Dark Mode / Light Mode Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? 'Switch to Standard OSM Light Tiles' : 'Switch to Dark Command Center Map'}
          className="w-10 h-10 bg-[#0b1428]/90 backdrop-blur-md border border-blue-900/40 hover:border-cyan-400/60 rounded-xl flex items-center justify-center text-slate-300 hover:text-cyan-300 shadow-xl transition-all text-sm"
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>
      </div>

      {/* GPS Error Toast if permission denied */}
      {gpsError && (
        <div className="absolute top-4 left-20 z-[1000] bg-rose-950/90 border border-rose-500/50 text-rose-200 text-xs px-3 py-2 rounded-xl backdrop-blur-md shadow-xl flex items-center gap-2 animate-bounce">
          <span>⚠️</span>
          <span>{gpsError}</span>
          <button onClick={() => setGpsError(null)} className="ml-2 text-rose-400 font-bold">×</button>
        </div>
      )}

      {/* 3. Top Right Card: GPS MONITORING • ACTIVE */}
      <div className="absolute top-4 right-4 z-[1000] pointer-events-auto">
        <div className="bg-[#081226]/90 backdrop-blur-md border border-cyan-500/30 rounded-2xl px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.6)] min-w-[200px]">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-bold text-slate-200 tracking-wider font-mono">
              GPS MONITORING <span className="text-emerald-400">• ACTIVE</span>
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 mt-2">
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                EVENTS TRACKED
              </div>
              <div className="text-2xl font-extrabold text-white tracking-tight leading-none mt-0.5">
                {events.length}
              </div>
            </div>
            <div className="text-emerald-400 flex items-center">
              <PulseWaveIcon className="w-10 h-6 text-emerald-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Left Card: Current Location */}
      <div className="absolute bottom-6 left-4 z-[1000] pointer-events-auto">
        <div className="bg-[#081226]/90 backdrop-blur-md border border-emerald-500/30 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <div className="text-[11px] font-bold text-emerald-400 tracking-wide">
              {displayLocation.source === 'GPS Device' ? 'Current GPS Location' : 'Target Location'}
            </div>
            <div className="text-xs font-mono font-semibold text-slate-200">
              {displayLocation.lat}, {displayLocation.lon}
            </div>
            <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Accuracy: {displayLocation.accuracy}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Right Card: MAP LEGEND */}
      {showLegend && (
        <div className="absolute bottom-6 right-4 z-[1000] pointer-events-auto">
          <div className="bg-[#081226]/90 backdrop-blur-md border border-blue-900/40 rounded-2xl p-4 shadow-xl min-w-[190px]">
            <div className="flex items-center justify-between mb-3 border-b border-blue-900/30 pb-2">
              <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-mono">
                MAP LEGEND
              </h4>
              <button
                onClick={() => setShowLegend(false)}
                className="text-slate-400 hover:text-slate-200 text-xs font-bold p-0.5"
                title="Hide Legend"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)]" />
                <span className="text-slate-300 font-medium">Road Defect</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
                <span className="text-slate-300 font-medium">Rash Driving</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.7)]" />
                <span className="text-slate-300 font-medium">Traffic Congestion</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
                <span className="text-slate-300 font-medium">GPS (Current Location)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend Reopen Button if minimized */}
      {!showLegend && (
        <button
          onClick={() => setShowLegend(true)}
          className="absolute bottom-6 right-4 z-[1000] px-3 py-1.5 rounded-xl bg-[#081226]/90 border border-blue-900/40 text-xs text-slate-300 hover:text-cyan-300 shadow-xl font-mono"
        >
          🗺️ Legend
        </button>
      )}
    </div>
  );
}
