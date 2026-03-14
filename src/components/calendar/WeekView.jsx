import { C, WEEK_DAYS, HOURS, TODAY, EVENT_CFG } from '../../constants/tokens.js'
import { sameDay, timeStr } from '../../constants/utils.js'
import { Chip } from '../layout/Atoms.jsx'
import { EventIcon, IconVacacion } from '../icons/HumandIcons.jsx'

const now = new Date()

function isPast(d, startH) {
  if (d.getDate() < TODAY.getDate()) return true
  if (d.getDate() > TODAY.getDate()) return false
  // same day — check hour
  const curH = now.getHours() + now.getMinutes() / 60
  return startH < curH
}

export default function WeekView({ weekDates, events, layers, onOpen, onJoin }) {
  const active = new Set(layers.filter(l => l.on).map(l => l.key))

  // All-day types that render as pills at top (not in time slots)
  const ALL_DAY_TYPES = new Set(['cumpleanos','aniversario','festivo','objetivo','evaluacion','vacacion'])

  const timedEvents  = events.filter(e => !e.allDay && active.has(e.type))
  const allDayEvents = events.filter(e => e.allDay  && active.has(e.type))

  // Vacations with date ranges
  const vacations = allDayEvents.filter(e => e.type === 'vacacion' && e.startDay)
  // Regular allDay (single-day pills)
  const singleAllDay = allDayEvents.filter(e => !e.startDay || e.type !== 'vacacion')

  const timedForDay = (day, hour) =>
    timedEvents.filter(e => e.day === day && Math.floor(e.startH) === hour)

  const singleForDay = (day) =>
    singleAllDay.filter(e => e.day === day)

  // Vacations that cover a given day
  const vacationsForDay = (day) =>
    vacations.filter(e => day >= e.startDay && day <= e.endDay)

  // Vacation bar spanning columns
  const vacationBars = []
  vacations.forEach(e => {
    const startIdx = weekDates.findIndex(d => d.getDate() === e.startDay)
    const endIdx   = weekDates.findIndex(d => d.getDate() === e.endDay)
    if (startIdx !== -1) {
      vacationBars.push({
        ...e,
        startCol: startIdx,
        endCol: endIdx !== -1 ? endIdx : weekDates.length - 1,
      })
    }
  })

  const cfg = (type) => EVENT_CFG[type] || EVENT_CFG.reunion
  const curH = now.getHours() + now.getMinutes()/60

  return (
    <div style={{background:C.white,borderRadius:16,border:'1px solid #E2E8F0',overflow:'hidden'}} className="anim-fade">

      {/* Day headers */}
      <div style={{display:'grid',gridTemplateColumns:'52px repeat(7,1fr)',borderBottom:'1px solid #F1F5F9'}}>
        <div style={{borderRight:'1px solid #F1F5F9'}}/>
        {weekDates.map((d,i) => {
          const isT = sameDay(d, TODAY)
          const wkd = i >= 5
          return (
            <div key={i} style={{padding:'10px 6px',textAlign:'center',borderRight:i<6?'1px solid #F1F5F9':'none',background:wkd?'#FAFAFA':C.white}}>
              <div style={{fontSize:10,color:C.gray400,fontWeight:600,marginBottom:3}}>{WEEK_DAYS[i]}</div>
              <div style={{width:30,height:30,borderRadius:'50%',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,background:isT?C.accent:'transparent',color:isT?'#fff':wkd?C.gray400:'#334155'}}>
                {d.getDate()}
              </div>
            </div>
          )
        })}
      </div>

      {/* All-day pills row */}
      <div style={{display:'grid',gridTemplateColumns:'52px repeat(7,1fr)',borderBottom:'1px solid #F1F5F9',minHeight:28}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',borderRight:'1px solid #F1F5F9'}}>
          <span style={{fontSize:9,color:'#CBD5E1',writingMode:'vertical-rl',transform:'rotate(180deg)'}}>todo el día</span>
        </div>
        {weekDates.map((d,i) => (
          <div key={i} style={{padding:'3px 3px',borderRight:i<6?'1px solid #F1F5F9':'none',background:i>=5?'#FAFAFA':C.white}}>
            {singleForDay(d.getDate()).map(e => {
              const c = cfg(e.type)
              const past = d.getDate() < TODAY.getDate()
              return (
                <div key={e.id} onClick={() => onOpen(e)}
                  style={{
                    background: past ? '#F1F5F9' : c.bg,
                    color: past ? '#94A3B8' : c.color,
                    borderRadius:5, padding:'2px 5px', fontSize:9, fontWeight:600,
                    marginBottom:2, cursor:'pointer', display:'flex', alignItems:'center', gap:3,
                    opacity: past ? 0.55 : 1,
                    overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis',
                  }}>
                  <EventIcon type={e.type} size={10} color={past ? '#94A3B8' : c.color} />
                  <span style={{overflow:'hidden',textOverflow:'ellipsis'}}>{e.title || e.person}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Vacation bars — row below all-day */}
      {vacationBars.length > 0 && (
        <div style={{display:'grid',gridTemplateColumns:'52px repeat(7,1fr)',borderBottom:'1px solid #F1F5F9',minHeight:22,position:'relative'}}>
          <div style={{borderRight:'1px solid #F1F5F9'}}/>
          {weekDates.map((_,i) => (
            <div key={i} style={{borderRight:i<6?'1px solid #F1F5F9':'none',position:'relative'}}/>
          ))}
          {/* Render bars as absolute overlays */}
          {vacationBars.map((bar,bi) => {
            const c = cfg('vacacion')
            const past = weekDates[bar.startCol]?.getDate() < TODAY.getDate()
            const colW = `calc((100% - 52px) / 7)`
            const left = `calc(52px + ${bar.startCol} * ${colW})`
            const width = `calc(${(bar.endCol - bar.startCol + 1)} * ${colW})`
            return (
              <div key={bi}
                onClick={() => onOpen(bar)}
                style={{
                  position:'absolute', top:3,
                  left: `${(bar.startCol / 7) * 100}%`,
                  width: `${((bar.endCol - bar.startCol + 1) / 7) * 100}%`,
                  marginLeft: bar.startCol === 0 ? 52 : 0,
                  background: past ? '#F1F5F9' : c.bg,
                  color: past ? '#94A3B8' : c.color,
                  borderRadius:6, padding:'3px 8px',
                  fontSize:9, fontWeight:700,
                  cursor:'pointer', display:'flex', alignItems:'center', gap:4,
                  opacity: past ? 0.55 : 1,
                  border:`1px solid ${c.color}30`,
                  overflow:'hidden', whiteSpace:'nowrap',
                  zIndex:1,
                }}>
                <IconVacacion size={11} color={past ? '#94A3B8' : c.color} />
                <span style={{overflow:'hidden',textOverflow:'ellipsis'}}>{bar.title}</span>
              </div>
            )
          })}
        </div>
      )}

      {/* Time grid */}
      <div style={{overflowY:'auto',maxHeight:460}}>
        {HOURS.map(h => (
          <div key={h} style={{display:'grid',gridTemplateColumns:'52px repeat(7,1fr)',borderBottom:'1px solid #F8FAFC',minHeight:54}}>
            <div style={{padding:'4px 6px 0 0',textAlign:'right',fontSize:10,color:'#CBD5E1',fontWeight:600,borderRight:'1px solid #F1F5F9'}}>
              {String(h).padStart(2,'0')}:00
            </div>
            {weekDates.map((d,i) => {
              const isToday = sameDay(d, TODAY)
              const curMin  = isToday && now.getHours() === h ? now.getMinutes() : null
              const dayEvts = timedForDay(d.getDate(), h)
              return (
                <div key={i} style={{padding:'2px 3px',borderRight:i<6?'1px solid #F1F5F9':'none',background:i>=5?'#FAFAFA':C.white,position:'relative'}}>
                  {/* Current time line */}
                  {isToday && curMin !== null && (
                    <div style={{position:'absolute',left:0,right:0,top:`${(curMin/60)*100}%`,display:'flex',alignItems:'center',zIndex:5,pointerEvents:'none'}}>
                      <div style={{width:7,height:7,borderRadius:'50%',background:C.accent,flexShrink:0}}/>
                      <div style={{flex:1,height:1.5,background:C.accent,opacity:.7}}/>
                    </div>
                  )}
                  {dayEvts.map(e => {
                    const past = isPast(d, e.startH)
                    const c = cfg(e.type)
                    return (
                      <div key={e.id} onClick={() => onOpen(e)}
                        className="event-chip"
                        style={{
                          background: past ? '#F1F5F9' : c.bg,
                          color: past ? '#94A3B8' : c.color,
                          border: `1px solid ${past ? '#E2E8F0' : c.color+'28'}`,
                          borderRadius:6, padding:'3px 7px',
                          fontSize:10, fontWeight:600,
                          display:'flex', alignItems:'center', gap:3,
                          marginBottom:2, opacity: past ? 0.55 : 1,
                          cursor:'pointer',
                        }}>
                        <EventIcon type={e.type} size={11} color={past ? '#94A3B8' : c.color} />
                        <span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',flex:1}}>{e.title}</span>
                        {e.live && !past && <span style={{color:C.danger,fontSize:8,fontWeight:800,flexShrink:0}}>●</span>}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
