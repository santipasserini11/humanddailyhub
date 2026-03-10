import { C, WEEK_DAYS, HOURS, TODAY } from '../../constants/tokens.js'
import { sameDay, timeStr } from '../../constants/utils.js'
import { Chip } from '../layout/Atoms.jsx'

export default function WeekView({ weekDates, events, layers, onOpen, onJoin }) {
  const active = new Set(layers.filter(l => l.on).map(l => l.key))
  const allDay = events.filter(e => e.allDay  && active.has(e.type))
  const timed  = events.filter(e => !e.allDay && active.has(e.type))
  const now    = new Date()

  const timedForDay = (day, hour) =>
    timed.filter(e => e.day === day && Math.floor(e.startH) === hour)

  const allDayForDay = (day) =>
    allDay.filter(e => e.day === day)

  return (
    <div style={{background:C.white, borderRadius:16, border:'1px solid #E2E8F0', overflow:'hidden'}} className="anim-fade">

      {/* Day headers */}
      <div style={{display:'grid', gridTemplateColumns:'52px repeat(7,1fr)', borderBottom:'1px solid #F1F5F9'}}>
        <div style={{borderRight:'1px solid #F1F5F9'}}/>
        {weekDates.map((d,i) => {
          const isT = sameDay(d, TODAY)
          const wkd = i >= 5
          return (
            <div key={i} style={{
              padding:'10px 6px', textAlign:'center',
              borderRight: i < 6 ? '1px solid #F1F5F9' : 'none',
              background: wkd ? '#FAFAFA' : C.white,
            }}>
              <div style={{fontSize:10, color:C.gray400, fontWeight:600, marginBottom:3}}>{WEEK_DAYS[i]}</div>
              <div style={{
                width:30, height:30, borderRadius:'50%', margin:'0 auto',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:13, fontWeight:700,
                background: isT ? C.accent : 'transparent',
                color: isT ? '#fff' : wkd ? C.gray400 : '#334155',
              }}>
                {d.getDate()}
              </div>
            </div>
          )
        })}
      </div>

      {/* All-day row */}
      <div style={{display:'grid', gridTemplateColumns:'52px repeat(7,1fr)', borderBottom:'1px solid #F1F5F9', minHeight:32}}>
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'center',
          borderRight:'1px solid #F1F5F9',
        }}>
          <span style={{fontSize:9, color:'#CBD5E1', writingMode:'vertical-rl', transform:'rotate(180deg)'}}>todo el día</span>
        </div>
        {weekDates.map((d,i) => (
          <div key={i} style={{
            padding:'3px 3px',
            borderRight: i < 6 ? '1px solid #F1F5F9' : 'none',
            background: i >= 5 ? '#FAFAFA' : C.white,
          }}>
            {allDayForDay(d.getDate()).map(e => (
              <Chip key={e.id} event={e} onClick={onOpen} tiny/>
            ))}
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div style={{overflowY:'auto', maxHeight:460}}>
        {HOURS.map(h => (
          <div key={h} style={{
            display:'grid', gridTemplateColumns:'52px repeat(7,1fr)',
            borderBottom:'1px solid #F8FAFC', minHeight:54,
          }}>
            <div style={{
              padding:'4px 6px 0 0', textAlign:'right',
              fontSize:10, color:'#CBD5E1', fontWeight:600,
              borderRight:'1px solid #F1F5F9',
            }}>
              {String(h).padStart(2,'0')}:00
            </div>

            {weekDates.map((d,i) => {
              const isToday   = sameDay(d, TODAY)
              const curMin    = now.getHours() === h ? now.getMinutes() : null
              const dayEvents = timedForDay(d.getDate(), h)
              return (
                <div key={i} style={{
                  padding:'2px 3px',
                  borderRight: i < 6 ? '1px solid #F1F5F9' : 'none',
                  background: i >= 5 ? '#FAFAFA' : C.white,
                  position:'relative',
                }}>
                  {/* Current time line */}
                  {isToday && curMin !== null && (
                    <div style={{
                      position:'absolute', left:0, right:0,
                      top:`${(curMin/60)*100}%`,
                      display:'flex', alignItems:'center', zIndex:5, pointerEvents:'none',
                    }}>
                      <div style={{width:7,height:7,borderRadius:'50%',background:C.accent,flexShrink:0}}/>
                      <div style={{flex:1,height:1.5,background:C.accent,opacity:.7}}/>
                    </div>
                  )}
                  {dayEvents.map(e => (
                    <Chip key={e.id} event={e} onClick={onOpen}/>
                  ))}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
