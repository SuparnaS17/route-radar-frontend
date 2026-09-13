import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import FilterBar from './components/FilterBar';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import FooterBar from './components/FooterBar';
import ImageModal from './components/ImageModal';
import AnalyticsModal from './components/AnalyticsModal';
import { BACKEND_URL, categorizeEvent } from './constants';

export default function App() {
  const [events, setEvents] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('Connecting');
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalEvent, setModalEvent] = useState(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch events from FastAPI backend
  const fetchEvents = useCallback(async (isManual = false) => {
    try {
      if (isManual) setIsRefreshing(true);
      const res = await fetch(BACKEND_URL, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setEvents(data);
          setConnectionStatus('Live');
          setLastSyncTime(new Date().toTimeString().split(' ')[0]);
        }
      } else {
        setConnectionStatus('Offline');
      }
    } catch (err) {
      console.warn('Backend currently unreachable at', BACKEND_URL, err.message);
      setConnectionStatus('Offline');
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Initial fetch and auto-polling
  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      await fetchEvents();
    };
    load();

    if (!isAutoRefresh) return;
    const interval = setInterval(() => {
      if (isMounted) {
        fetchEvents();
      }
    }, 2000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [fetchEvents, isAutoRefresh]);

  // Compute category counts directly from backend data
  const counts = useMemo(() => {
    let defects = 0;
    let rash = 0;
    let traffic = 0;

    events.forEach((ev) => {
      const cat = categorizeEvent(ev.event_type);
      if (cat.key === 'defect') defects++;
      else if (cat.key === 'rash') rash++;
      else if (cat.key === 'traffic') traffic++;
    });

    return {
      all: events.length,
      defects,
      rash,
      traffic,
    };
  }, [events]);

  // Filter and search events
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      // 1. Filter pill
      if (activeFilter !== 'All') {
        const cat = categorizeEvent(ev.event_type);
        if (activeFilter === 'Road Defect' && cat.key !== 'defect') return false;
        if (activeFilter === 'Rash Driving' && cat.key !== 'rash') return false;
        if (activeFilter === 'Traffic' && cat.key !== 'traffic') return false;
      }

      // 2. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const typeMatch = String(ev.event_type || '').toLowerCase().includes(q);
        const idMatch = String(ev.id).includes(q);
        const coordMatch = `${ev.lat},${ev.lon}`.includes(q);
        if (!typeMatch && !idMatch && !coordMatch) return false;
      }

      return true;
    });
  }, [events, activeFilter, searchQuery]);

  // Handle event selection
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  // Reset filters
  const handleResetFilters = () => {
    setActiveFilter('All');
    setSearchQuery('');
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#070c18] text-slate-100 overflow-hidden select-none font-sans">
      {/* 1. Header */}
      <Header
        connectionStatus={connectionStatus}
        lastSyncTime={lastSyncTime}
        isGpsActive={true}
        onRefresh={() => fetchEvents(true)}
        isRefreshing={isRefreshing}
      />

      {/* Offline Alert Banner (Graceful error handling) */}
      {connectionStatus === 'Offline' && (
        <div className="bg-rose-950/70 border-b border-rose-500/40 px-5 py-1.5 flex items-center justify-between text-xs text-rose-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>
              <strong>Backend Disconnected:</strong> Cannot connect to FastAPI server at <code className="bg-slate-900/60 px-1 py-0.5 rounded font-mono text-[11px]">{BACKEND_URL}</code>. Waiting for server to start...
            </span>
          </div>
          <button
            onClick={fetchEvents}
            className="px-2.5 py-0.5 rounded bg-rose-800/60 hover:bg-rose-700 text-[11px] font-semibold transition-colors"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* 2. Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: Navigation + Live Detections Feed */}
        <Sidebar
          events={filteredEvents}
          selectedEventId={selectedEvent?.id}
          onSelectEvent={handleSelectEvent}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          onOpenImageModal={setModalEvent}
        />

        {/* Right Column: Statistics, Filter Bar, Interactive Map, and Footer */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#070e1c] relative">
          {/* Top 4 KPI Stat Cards */}
          <StatsCards
            totalEvents={counts.all}
            defectCount={counts.defects}
            rashCount={counts.rash}
            trafficCount={counts.traffic}
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
          />

          {/* Filter & Search Bar */}
          <FilterBar
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
            counts={counts}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onResetFilters={handleResetFilters}
          />

          {/* Central Interactive Leaflet Map */}
          <div className="flex-1 relative overflow-hidden">
            <MapView
              events={filteredEvents}
              selectedEvent={selectedEvent}
              onSelectEvent={handleSelectEvent}
              onOpenImageModal={setModalEvent}
            />
          </div>

          {/* Bottom Status Bar */}
          <FooterBar
            connectionStatus={connectionStatus}
            lastSyncTime={lastSyncTime}
            pollingIntervalMs={2000}
            isAutoRefresh={isAutoRefresh}
            onToggleAutoRefresh={() => setIsAutoRefresh(!isAutoRefresh)}
          />
        </div>
      </div>

      {/* Image Zoom Inspection Modal */}
      <ImageModal
        event={modalEvent}
        onClose={() => setModalEvent(null)}
      />

      {/* Analytics / Events Tab Modal */}
      <AnalyticsModal
        events={events}
        activeTab={activeTab}
        onClose={() => setActiveTab('Dashboard')}
        onSelectEvent={handleSelectEvent}
        onOpenImageModal={setModalEvent}
      />
    </div>
  );
}