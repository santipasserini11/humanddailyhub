import { C, WEEK_DAYS, TODAY } from '../../constants/tokens.js'
import { Chip } from '../layout/Atoms.jsx'

export default function MonthView({ events, layers, onOpen }) {
  const active = new Set(layers.filter(l => l.on).map(l => l.key))
  const month  = TODAY.getMonth()
  const year   = TODAY.getFullYear()
  const daysInMonth = new Date(year, month+1, 0).getDate()
  const firstDay    = new Date(year, month, 1).getDay()
  const pad = firstDay === 0 ? 6 : firstDay - 1

  const eventsForDay = (day) =>
    events.filter(e => e.day === day && active.has(e.type))

  return (
    <div style={{background:C.white, borderRadius:16, border:'1px solid #E2E8F0', padding:16}} className="anim-fade">
      {/* Day labels */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:2, textAlign:'center', marginBottom:6}}>
        {WEEK_DAYS.map(d => (
          <div key={d} style={{fontSize:10, fontWeight:700, color:C.gray400, padding:'4px 0'}}>{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3}}>
        {Array.from({length:pad}).map((_,i) => <div key={`p${i}`}/>)}
        {Array.from({length:daysInMonth}, (_,i) => i+1).map(day => {
          const isT  = day === TODAY.getDate()
          const isWk = (day + pad - 1) % 7 >= 5
          const evts = eventsForDay(day).slice(0,3)

          return (
            <div key={day}
              style={{
                minHeight:76, borderRadius:10, padding:4,
                background: isWk ? '#FAFAFA' : C.white,
                border: `1.5px solid ${isT ? C.accent+'55' : 'transparent'}`,
                transition:'all .15s', cursor:'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background='#F8FAFC'}
              onMouseLeave={e => e.currentTarget.style.background = isWk ? '#FAFAFA' : C.white}
            >
              <div style={{
                width:22, height:22, borderRadius:'50%',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:11, fontWeight:700, marginBottom:3,
                background: isT ? C.accent : 'transparent',
                color: isT ? '#fff' : isWk ? C.gray400 : '#334155',
              }}>
                {day}
              </div>
              {evts.map(e => <Chip key={e.id} event={e} onClick={onOpen} tiny/>)}
              {eventsForDay(day).length > 3 && (
                <p style={{fontSize:9, color:C.gray400, marginTop:1, fontWeight:600}}>
                  +{eventsForDay(day).length - 3} más
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
