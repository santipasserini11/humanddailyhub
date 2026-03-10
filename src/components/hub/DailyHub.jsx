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

export default function DailyHub({ role, onEventOpen, onLiveJoin, setView, onToast, activeTypes }) {
  const data  = ROLE_DATA[role]
  const today = TODAY.getDate()

  const upcoming = (data?.upcoming || [])
    .map(id => ALL_EVENTS.find(e => e.id === id))
    .filter(e => e && (!activeTypes || activeTypes.includes(e.type)))

  const cultureToday = ALL_EVENTS.filter(e =>
    e.day === today &&
    (e.type === 'cumpleanos' || e.type === 'aniversario') &&
    (!activeTypes || activeTypes.includes(e.type))
  )

  return (
    <div style={{maxWidth:720, margin:'0 auto'}} className="anim-fade">
      <AlertBar role={role} />
      <HeroHub role={role} />

      {/* Upcoming events */}
      <div style={{marginBottom:20}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
          <SectionTitle>
            {role === 'hr' ? '📋 Eventos de empresa hoy' : '🗓 Tu agenda de hoy'}
          </SectionTitle>
          <button
            onClick={() => setView('week')}
            style={{fontSize:11,color:C.accent,fontWeight:600,background:'none',border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>
            Ver semana completa →
          </button>
        </div>
        {upcoming.map(e => (
          <UpCard key={e.id} event={e} onJoin={onLiveJoin} onOpen={onEventOpen} />
        ))}
        {upcoming.length === 0 && (
          <div style={{textAlign:'center',padding:'24px',background:'#fff',borderRadius:14,border:'1px solid #F1F5F9'}}>
            <p style={{fontSize:22,marginBottom:6}}>🎉</p>
            <p style={{fontSize:13,color:C.gray400}}>No hay eventos visibles con los filtros actuales.</p>
          </div>
        )}
      </div>

      {/* Cumpleaños y aniversarios */}
      {role === 'colaborador' && cultureToday.length > 0 && (
        <div style={{marginBottom:20}}>
          <SectionTitle>🎊 Cumpleaños y aniversarios</SectionTitle>
          {cultureToday.map(e => (
            <CultureCard key={e.id} event={e} onOpen={onEventOpen} onToast={onToast} />
          ))}
        </div>
      )}

      {role === 'manager' && <div style={{marginBottom:20}}><TeamGrid /></div>}
      {role === 'hr'      && <div style={{marginBottom:20}}><CompanyPanel /></div>}

      <Nudges role={role} />
    </div>
  )
}
