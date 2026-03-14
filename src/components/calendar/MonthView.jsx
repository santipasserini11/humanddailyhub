import { useState } from 'react'
import { C, WEEK_DAYS, TODAY, EVENT_CFG } from '../../constants/tokens.js'
import { EventIcon, IconVacacion } from '../icons/HumandIcons.jsx'

// Group categories for monthly display
const MONTH_GROUPS = [
  { key:'reunion',     label:'Reuniones',     multi:true },
  { key:'capacitacion',label:'Capacitac.',    multi:true },
  { key:'evaluacion',  label:'Evaluaciones',  multi:true },
  { key:'onboarding',  label:'Onboarding',    multi:true },
  { key:'objetivo',    label:'Objetivos',     multi:true },
  { key:'noticia',     label:'Noticias',      multi:true },
  { key:'livestream',  label:'Lives',         multi:true },
  { key:'turno',       label:'Turno',         multi:false },
]

// These render as full-day horizontal pills (like GCal)
const ALLDAY_TYPES = new Set(['cumpleanos','aniversario','festivo','vacacion'])

function DayModal({ day, events, onClose, onOpen }) {
  if (!events.length) return null
  return (
    <>
      <div onClick={onClose} style={{position:'fixed',inset:0,zIndex:60,background:'rgba(15,23,60,.45)',backdropFilter:'blur(4px)'}}/>
      <div onClick={e=>e.stopPropagation()} className="anim-up" style={{
        position:'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
        zIndex:61,background:'#fff',borderRadius:20,width:320,maxHeight:'80vh',
        overflow:'hidden',boxShadow:'0 20px 60px rgba(0,0,0,.25)',display:'flex',flexDirection:'column',
      }}>
        <div style={{padding:'16px 20px 12px',borderBottom:'1px solid #F1F5F9',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h3 style={{fontSize:16,fontWeight:800,color:C.primary}}>{day} de marzo</h3>
          <button onClick={onClose} style={{width:26,height:26,border:'none',background:'#F1F5F9',borderRadius:7,cursor:'pointer',fontSize:14,color:C.gray500,display:'flex',alignItems:'center',justifyContent:'center'}}>×</button>
        </div>
        <div style={{overflowY:'auto',padding:'10px 16px 16px'}}>
          {events.map(e => {
            const c = EVENT_CFG[e.type] || EVENT_CFG.reunion
            const past = e.day < TODAY.getDate() || (e.startDay && e.endDay < TODAY.getDate())
            return (
              <div key={e.id} onClick={() => { onOpen(e); onClose() }}
                style={{
                  display:'flex',alignItems:'center',gap:10,padding:'9px 10px',
                  borderRadius:10,cursor:'pointer',transition:'all .12s',
                  background: past ? '#FAFAFA' : c.bg,
                  border:`1px solid ${past ? '#E2E8F0' : c.color+'28'}`,
                  opacity: past ? .6 : 1,
                  marginBottom:5,
                }}>
                <EventIcon type={e.type} size={16} color={past ? C.gray400 : c.color} />
                <div style={{flex:1}}>
                  <p style={{fontSize:12,fontWeight:700,color: past ? C.gray400 : C.primary}}>{e.title || e.person}</p>
                  {e.startH && <p style={{fontSize:10,color:C.gray400}}>{String(Math.floor(e.startH)).padStart(2,'0')}:{e.startH%1===.5?'30':'00'}</p>}
                </div>
                <span style={{fontSize:9,color:c.color,fontWeight:700,background:c.bg,padding:'2px 7px',borderRadius:20}}>{c.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default function MonthView({ events, layers, onOpen }) {
  const active = new Set(layers.filter(l => l.on).map(l => l.key))
  const [selectedDay, setSelectedDay] = useState(null)

  const month      = TODAY.getMonth()
  const year       = TODAY.getFullYear()
  const daysInMonth = new Date(year, month+1, 0).getDate()
  const firstDay    = new Date(year, month, 1).getDay()
  const pad         = firstDay === 0 ? 6 : firstDay - 1

  const eventsForDay = (day) =>
    events.filter(e => {
      if (!active.has(e.type)) return false
      if (e.startDay) return day >= e.startDay && day <= e.endDay  // vacation range
      return e.day === day
    })

  const allDayForDay = (day) =>
    eventsForDay(day).filter(e => ALLDAY_TYPES.has(e.type))

  const groupedForDay = (day) => {
    const timed = eventsForDay(day).filter(e => !ALLDAY_TYPES.has(e.type))
    const groups = {}
    timed.forEach(e => {
      if (!groups[e.type]) groups[e.type] = []
      groups[e.type].push(e)
    })
    return groups
  }

  const allForDay = (day) => eventsForDay(day)

  const cfg = (type) => EVENT_CFG[type] || EVENT_CFG.reunion

  return (
    <div style={{background:C.white,borderRadius:16,border:'1px solid #E2E8F0',padding:16}} className="anim-fade">
      {/* Day labels */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:2,textAlign:'center',marginBottom:6}}>
        {WEEK_DAYS.map(d => (
          <div key={d} style={{fontSize:10,fontWeight:700,color:C.gray400,padding:'4px 0'}}>{d}</div>
        ))}
      </div>

      {/* Cells */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3}}>
        {Array.from({length:pad}).map((_,i) => <div key={`p${i}`}/>)}
        {Array.from({length:daysInMonth}, (_,i) => i+1).map(day => {
          const isT  = day === TODAY.getDate()
          const past = day < TODAY.getDate()
          const isWk = (day + pad - 1) % 7 >= 5
          const allDay = allDayForDay(day)
          const groups = groupedForDay(day)
          const total  = allForDay(day).length

          // Vacation pills spanning — only show on startDay
          const vacStart = events.filter(e => e.type==='vacacion' && e.startDay===day && active.has('vacacion'))

          return (
            <div key={day}
              onClick={() => total > 0 && setSelectedDay(day)}
              style={{
                minHeight:82, borderRadius:10, padding:'5px 4px',
                background: isWk ? '#FAFAFA' : C.white,
                border: `1.5px solid ${isT ? C.accent+'55' : 'transparent'}`,
                cursor: total > 0 ? 'pointer' : 'default',
                transition:'all .12s',
                opacity: past ? .7 : 1,
              }}
              onMouseEnter={e => { if(total>0) e.currentTarget.style.background='#F8FAFC' }}
              onMouseLeave={e => e.currentTarget.style.background = isWk?'#FAFAFA':C.white}
            >
              {/* Day number */}
              <div style={{
                width:22,height:22,borderRadius:'50%',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:11,fontWeight:700,marginBottom:3,
                background: isT ? C.accent : 'transparent',
                color: isT ? '#fff' : past ? C.gray400 : '#334155',
              }}>{day}</div>

              {/* All-day pills (birthdays, anniversaries, holidays) */}
              {allDay.slice(0,2).map(e => {
                const c = cfg(e.type)
                return (
                  <div key={e.id} style={{
                    background: past ? '#F1F5F9' : c.bg,
                    color: past ? '#94A3B8' : c.color,
                    borderRadius:4, padding:'1px 4px', fontSize:8,
                    fontWeight:700, marginBottom:2,
                    display:'flex',alignItems:'center',gap:2,
                    overflow:'hidden',whiteSpace:'nowrap',
                  }}>
                    <EventIcon type={e.type} size={9} color={past ? '#94A3B8' : c.color} />
                    <span style={{overflow:'hidden',textOverflow:'ellipsis'}}>
                      {e.person || e.title}
                    </span>
                  </div>
                )
              })}

              {/* Vacation bar starting on this day */}
              {vacStart.map(e => (
                <div key={e.id} style={{
                  background: past ? '#F1F5F9' : EVENT_CFG.vacacion.bg,
                  color: past ? '#94A3B8' : EVENT_CFG.vacacion.color,
                  borderRadius:4, padding:'1px 4px', fontSize:8,
                  fontWeight:700, marginBottom:2,
                  overflow:'hidden',whiteSpace:'nowrap',
                }}>
                  <IconVacacion size={9} color={past ? '#94A3B8' : EVENT_CFG.vacacion.color} /> {e.person?.split(' ')[0]}
                </div>
              ))}

              {/* Grouped timed events */}
              {Object.entries(groups).slice(0,2).map(([type, evts]) => {
                const c = cfg(type)
                return (
                  <div key={type} style={{
                    background: past ? '#F1F5F9' : c.bg,
                    color: past ? '#94A3B8' : c.color,
                    borderRadius:4, padding:'2px 5px', fontSize:9,
                    fontWeight:700, marginBottom:2,
                    display:'flex',alignItems:'center',gap:3,
                  }}>
                    <EventIcon type={type} size={10} color={past ? '#94A3B8' : c.color} />
                    <span>{evts.length > 1 ? `${evts.length} ${c.label}` : evts[0].title}</span>
                  </div>
                )
              })}

              {/* +N más */}
              {total > 3 && (
                <p style={{fontSize:9,color:C.accent,fontWeight:700,marginTop:1}}>+{total-3} más</p>
              )}
            </div>
          )
        })}
      </div>

      {/* Day detail modal */}
      {selectedDay && (
        <DayModal
          day={selectedDay}
          events={allForDay(selectedDay)}
          onClose={() => setSelectedDay(null)}
          onOpen={onOpen}
        />
      )}
    </div>
  )
}
