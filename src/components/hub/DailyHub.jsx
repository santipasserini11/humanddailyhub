import { C, TODAY } from '../../constants/tokens.js'
import { ALL_EVENTS, ROLE_DATA } from '../../constants/data.js'
import AlertBar from './AlertBar.jsx'
import HeroHub from './HeroHub.jsx'
import UpCard from './UpCard.jsx'
import CultureCard from './CultureCard.jsx'
import TeamGrid from './TeamGrid.jsx'
import CompanyPanel from './CompanyPanel.jsx'
import Nudges from './Nudges.jsx'
import { SectionTitle } from '../layout/Atoms.jsx'

export default function DailyHub({ role, onEventOpen, onLiveJoin, setView }) {
  const data    = ROLE_DATA[role]
  const today   = TODAY.getDate()

  const upcoming = (data?.upcoming || [])
    .map(id => ALL_EVENTS.find(e => e.id === id))
    .filter(Boolean)

  const cultureToday = ALL_EVENTS.filter(e =>
    e.day === today && (e.type === 'cumpleanos' || e.type === 'aniversario')
  )

  return (
    <div style={{maxWidth:720, margin:'0 auto'}} className="anim-fade">
      <AlertBar role={role} />
      <HeroHub role={role} />

      {/* Upcoming */}
      <div style={{marginBottom:20}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
          <SectionTitle>
            {role === 'hr' ? '📋 Eventos de empresa hoy' : '🗓 Tu agenda de hoy'}
          </SectionTitle>
          <button
            onClick={() => setView('week')}
            style={{fontSize:11, color:C.accent, fontWeight:600, background:'none', border:'none', cursor:'pointer', fontFamily:"'DM Sans', sans-serif"}}
          >Ver semana completa →</button>
        </div>
        {upcoming.map(e => (
          <UpCard key={e.id} event={e} onJoin={onLiveJoin} onOpen={onEventOpen} />
        ))}
      </div>

      {/* Culture (colaborador only) */}
      {role === 'colaborador' && cultureToday.length > 0 && (
        <div style={{marginBottom:20}}>
          <SectionTitle>🎊 Cultura del equipo</SectionTitle>
          {cultureToday.map(e => (
            <CultureCard key={e.id} event={e} onOpen={onEventOpen} />
          ))}
        </div>
      )}

      {/* Team (manager) */}
      {role === 'manager' && (
        <div style={{marginBottom:20}}>
          <TeamGrid />
        </div>
      )}

      {/* Company (hr) */}
      {role === 'hr' && (
        <div style={{marginBottom:20}}>
          <CompanyPanel />
        </div>
      )}

      {/* Nudges */}
      <Nudges role={role} />
    </div>
  )
}
