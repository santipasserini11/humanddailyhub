import { useState } from 'react'
import { AuthProvider, useAuth } from './hooks/useAuth.jsx'
import LoginPage from './components/auth/LoginPage.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import TopBar from './components/layout/TopBar.jsx'
import DailyHub from './components/hub/DailyHub.jsx'
import WeekView from './components/calendar/WeekView.jsx'
import MonthView from './components/calendar/MonthView.jsx'
import EventDrawer from './components/modals/EventDrawer.jsx'
import LiveModal from './components/modals/LiveModal.jsx'
import CreateModal from './components/modals/CreateModal.jsx'
import { MiniCal, SidebarLives, SidebarAgenda, LayerToggle } from './components/sidebar/SidebarWidgets.jsx'
import { ALL_EVENTS } from './constants/data.js'
import { EVENT_CFG, TODAY } from './constants/tokens.js'
import { getWeekDates, fmt } from './constants/utils.js'
import { Spinner } from './components/layout/Atoms.jsx'

/* ── Inner app (shown when logged in) ── */
function CalendarApp() {
  const { role } = useAuth()

  const [view,          setView]         = useState('hub')
  const [weekOffset,    setWeekOffset]   = useState(0)
  const [selectedEvent, setSelectedEvent]= useState(null)
  const [liveEvent,     setLiveEvent]    = useState(null)
  const [showCreate,    setShowCreate]   = useState(false)
  const [showLayers,    setShowLayers]   = useState(false)
  const [layers,        setLayers]       = useState(
    Object.keys(EVENT_CFG).map(k => ({ key:k, on:true }))
  )

  const weekDates = getWeekDates(weekOffset)
  const weekLabel = `${fmt(weekDates[0])} – ${fmt(weekDates[6])} ${weekDates[6].getFullYear()}`

  const toggleLayer = (key) =>
    setLayers(prev => prev.map(l => l.key === key ? { ...l, on:!l.on } : l))

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden' }}>

      {/* Nav sidebar */}
      <Sidebar />

      {/* Main area */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>

        {/* Top bar */}
        <TopBar
          view={view}            setView={setView}
          weekOffset={weekOffset} setWeekOffset={setWeekOffset}
          weekLabel={weekLabel}
          showLayers={showLayers} setShowLayers={setShowLayers}
          onCreateClick={() => setShowCreate(true)}
        />

        {/* Content + right sidebar */}
        <div style={{ flex:1, display:'flex', overflow:'hidden' }}>

          {/* Scrollable main content */}
          <div style={{ flex:1, overflowY:'auto', padding:'18px 20px', background:'#F1F5F9' }} key={`${view}-${role}`}>
            {view === 'hub' && (
              <DailyHub
                role={role}
                onEventOpen={setSelectedEvent}
                onLiveJoin={setLiveEvent}
                setView={setView}
              />
            )}
            {view === 'week' && (
              <WeekView
                weekDates={weekDates}
                events={ALL_EVENTS}
                layers={layers}
                onOpen={setSelectedEvent}
                onJoin={setLiveEvent}
              />
            )}
            {view === 'month' && (
              <MonthView
                events={ALL_EVENTS}
                layers={layers}
                onOpen={setSelectedEvent}
              />
            )}
          </div>

          {/* Right sidebar */}
          <div style={{
            width:232, flexShrink:0, overflowY:'auto',
            padding:'18px 14px',
            borderLeft:'1px solid #E2E8F0',
            background:'#FFFFFF',
          }}>
            <MiniCal />
            <SidebarLives events={ALL_EVENTS.filter(e => e.live)} onJoin={setLiveEvent} />
            <SidebarAgenda events={ALL_EVENTS} onOpen={setSelectedEvent} />
            {showLayers && <LayerToggle layers={layers} toggle={toggleLayer} />}
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedEvent && (
        <EventDrawer event={selectedEvent} onClose={() => setSelectedEvent(null)} onJoin={setLiveEvent} />
      )}
      {liveEvent && (
        <LiveModal event={liveEvent} onClose={() => setLiveEvent(null)} />
      )}
      {showCreate && (
        <CreateModal role={role} onClose={() => setShowCreate(false)} />
      )}
    </div>
  )
}

/* ── Root with auth gate ── */
function AppInner() {
  const { session, role, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#F1F5F9' }}>
        <Spinner />
      </div>
    )
  }

  // Show app if session exists OR if role has been set via demo mode
  if (session || role) return <CalendarApp />

  return <LoginPage />
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}
