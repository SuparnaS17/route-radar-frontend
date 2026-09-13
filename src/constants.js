// RouteRadar Constants and Helper Definitions

export const BACKEND_URL = 'http://127.0.0.1:8000/api/events/';
export const DEFAULT_MAP_CENTER = [12.9716, 77.5946]; // Bengaluru default
export const DEFAULT_ZOOM = 13;

export const CATEGORIES = {
  ALL: 'All',
  DEFECT: 'Road Defect',
  RASH: 'Rash Driving',
  TRAFFIC: 'Traffic',
};

// Classify event into one of the 3 primary categories: Road Defect, Rash Driving, Traffic Congestion
export function categorizeEvent(eventType = '') {
  const lower = String(eventType).toLowerCase();
  if (lower.includes('rash') || lower.includes('speed') || lower.includes('braking') || lower.includes('swerve')) {
    return {
      key: 'rash',
      label: 'RASH DRIVING',
      color: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.4)',
      accentClass: 'text-amber-400',
      badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      icon: '🚗',
    };
  }
  if (lower.includes('traffic') || lower.includes('congestion') || lower.includes('jam') || lower.includes('density')) {
    return {
      key: 'traffic',
      label: 'TRAFFIC',
      color: '#a855f7',
      glow: 'rgba(168, 85, 247, 0.4)',
      accentClass: 'text-purple-400',
      badgeClass: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
      icon: '👥',
    };
  }
  // Default to Road Defect
  return {
    key: 'defect',
    label: 'ROAD DEFECT',
    color: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.4)',
    accentClass: 'text-rose-400',
    badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    icon: '⚠️',
  };
}

export function formatTimestamp(isoString) {
  if (!isoString) return '--:--:--';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return String(isoString);
    return d.toTimeString().split(' ')[0]; // HH:MM:SS
  } catch {
    return String(isoString);
  }
}

export function isValidCoord(lat, lon) {
  const nLat = Number(lat);
  const nLon = Number(lon);
  return (
    !isNaN(nLat) &&
    !isNaN(nLon) &&
    isFinite(nLat) &&
    isFinite(nLon) &&
    nLat >= -90 &&
    nLat <= 90 &&
    nLon >= -180 &&
    nLon <= 180 &&
    !(nLat === 0 && nLon === 0)
  );
}
