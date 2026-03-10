import { useState } from 'react'
import { AuthProvider, useAuth } from './hooks/useAuth.jsx'
import LoginPage from './components/auth/LoginPage.jsx'
import TopBar from './components/layout/TopBar.jsx'
import Toast from './components/layout/Toast.jsx'
import RoleTooltip from './components/layout/RoleTooltip.jsx'
import DailyHub from './components/hub/DailyHub.jsx'
import WeekView from './components/calendar/WeekView.jsx'
import MonthView from './components/calendar/MonthView.jsx'
import EventDrawer from './components/modals/EventDrawer.jsx'
import LiveModal from './components/modals/LiveModal.jsx'
import CreateModal from './components/modals/CreateModal.jsx'
import { MiniCal, SidebarLives, SidebarAgenda } from './components/sidebar/SidebarWidgets.jsx'
import { ALL_EVENTS } from './constants/data.js'
import { EVENT_CFG, C } from './constants/tokens.js'
import { getWeekDates, fmt } from './constants/utils.js'
import { Spinner } from './components/layout/Atoms.jsx'

function CalendarApp() {
  const { role } = useAuth()

  const [view,          setView]          = useState('hub')
  const [weekOffset,    setWeekOffset]    = useState(0)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [liveEvent,     setLiveEvent]     = useState(null)
  const [showCreate,    setShowCreate]    = useState(false)
  const [toast,         setToast]         = useState(null)
  const [layers]                          = useState(
    Object.keys(EVENT_CFG).map(k => ({ key:k, on:true }))
  )

  const weekDates = getWeekDates(weekOffset)
  const weekLabel = `${fmt(weekDates[0])} – ${fmt(weekDates[6])} ${weekDates[6].getFullYear()}`

  // Abrir evento — si es cumpleaños/aniversario mostrar toast al cerrar
  const handleEventOpen = (event) => {
    setSelectedEvent(event)
  }

  const handleDrawerClose = () => {
    // Si era un cumpleaños y se celebró, el toast lo dispara CultureCard directamente
    setSelectedEvent(null)
  }

  const fireToast = (msg, emoji, color) => {
    setToast({ msg, emoji, color })
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', overflow:'hidden' }}>

      <TopBar
        view={view}             setView={setView}
        weekOffset={weekOffset} setWeekOffset={setWeekOffset}
        weekLabel={weekLabel}
        onCreateClick={() => setShowCreate(true)}
      />

      <div style={{ flex:1, display:'flex', overflow:'hidden' }}>

        {/* Contenido principal */}
        <div
          style={{ flex:1, overflowY:'auto', padding:'20px 24px', background:'#F1F5F9' }}
          key={`${view}-${role}`}
        >
          {view === 'hub' && (
            <DailyHub
              role={role}
              onEventOpen={handleEventOpen}
              onLiveJoin={setLiveEvent}
              setView={setView}
              onToast={fireToast}
            />
          )}
          {view === 'week' && (
            <WeekView
              weekDates={weekDates}
              events={ALL_EVENTS}
              layers={layers}
              onOpen={handleEventOpen}
              onJoin={setLiveEvent}
            />
          )}
          {view === 'month' && (
            <MonthView
              events={ALL_EVENTS}
              layers={layers}
              onOpen={handleEventOpen}
            />
          )}
        </div>

        {/* Sidebar derecho */}
        <div style={{
          width:220, flexShrink:0, overflowY:'auto',
          padding:'20px 14px',
          borderLeft:'1px solid #E2E8F0',
          background:'#fff',
        }}>
          <MiniCal />
          <SidebarLives events={ALL_EVENTS.filter(e => e.live)} onJoin={setLiveEvent} />
          <SidebarAgenda events={ALL_EVENTS} onOpen={handleEventOpen} />
        </div>
      </div>

      {/* Modals */}
      {selectedEvent && (
        <EventDrawer
          event={selectedEvent}
          onClose={handleDrawerClose}
          onJoin={setLiveEvent}
          onToast={fireToast}
        />
      )}
      {liveEvent  && <LiveModal   event={liveEvent}  onClose={() => setLiveEvent(null)} />}
      {showCreate && <CreateModal role={role}         onClose={() => setShowCreate(false)} />}

      {/* Toast global */}
      {toast && (
        <Toast
          message={toast.msg}
          emoji={toast.emoji}
          color={toast.color || C.success}
          onDone={() => setToast(null)}
        />
      )}

      {/* Onboarding tooltip — aparece primera vez */}
      <RoleTooltip />
    </div>
  )
}

function AppInner() {
  const { session, role, loading } = useAuth()
  if (loading) return (
    <div style={{ height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#F1F5F9' }}>
      <Spinner />
    </div>
  )
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
