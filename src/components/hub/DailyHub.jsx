import { C, TODAY } from '../../constants/tokens.js'
import { ALL_EVENTS, ROLE_DATA } from '../../constants/data.js'
import UpCard from './UpCard.jsx'
import CultureCard from './CultureCard.jsx'
import TeamGrid from './TeamGrid.jsx'
import CompanyPanel from './CompanyPanel.jsx'

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
    <div style={{maxWidth:720, margin:'0 auto', paddingTop: 16}} className="anim-fade">
      {/* Upcoming events */}
      <div style={{marginBottom:24}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
          <h2 style={{fontSize:16, fontWeight:600, color:C.gray900, margin:0}}>
            {role === 'hr' ? 'Eventos de empresa hoy' : 'Tu agenda de hoy'}
          </h2>
          <button
            onClick={() => setView('week')}
            style={{fontSize:12,color:C.accent,fontWeight:500,background:'none',border:'none',cursor:'pointer'}}>
            Ver semana
          </button>
        </div>
        {upcoming.map(e => (
          <UpCard key={e.id} event={e} onJoin={onLiveJoin} onOpen={onEventOpen} />
        ))}
        {upcoming.length === 0 && (
          <div style={{textAlign:'center',padding:'32px 24px',background:'#fff',borderRadius:12,border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:14,color:C.gray400,margin:0}}>No hay eventos programados para hoy</p>
          </div>
        )}
      </div>

      {/* Cumpleaños y aniversarios - solo si hay */}
      {cultureToday.length > 0 && (
        <div style={{marginBottom:24}}>
          <h2 style={{fontSize:16, fontWeight:600, color:C.gray900, marginBottom:12}}>
            Celebraciones del equipo
          </h2>
          {cultureToday.map(e => (
            <CultureCard key={e.id} event={e} onOpen={onEventOpen} onToast={onToast} />
          ))}
        </div>
      )}

      {role === 'manager' && <TeamGrid />}
      {role === 'hr' && <CompanyPanel />}
    </div>
  )
}
