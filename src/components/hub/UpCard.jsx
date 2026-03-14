import { C, EVENT_CFG } from '../../constants/tokens.js'
import { timeStr } from '../../constants/utils.js'
import { EventIcon } from '../icons/HumandIcons.jsx'

function getTimeUntil(startH) {
  const now = new Date()
  const eventMinutes = Math.floor(startH) * 60 + (startH % 1 === 0.5 ? 30 : 0)
  const nowMinutes   = now.getHours() * 60 + now.getMinutes()
  const diff         = eventMinutes - nowMinutes

  if (diff < 0 && diff > -90)  return { label:'En curso', color:'#059669', urgent:false }
  if (diff < 0)                return null
  if (diff === 0)              return { label:'¡Ahora!',  color:C.danger,  urgent:true }
  if (diff < 60)               return { label:`En ${diff} min`, color: diff <= 15 ? C.danger : C.warn, urgent: diff <= 15 }
  const h = Math.floor(diff/60), m = diff%60
  return { label: m > 0 ? `En ${h}h ${m}m` : `En ${h}h`, color:C.gray400, urgent:false }
}

export default function UpCard({ event, onJoin, onOpen }) {
  const c       = EVENT_CFG[event.type] || EVENT_CFG.reunion
  const timeUntil = event.startH != null ? getTimeUntil(event.startH) : null

  return (
    <div
      onClick={() => onOpen(event)}
      className="card-hover"
      style={{
        background:C.white,
        border:`1.5px solid ${c.color}20`,
        borderRadius:14,
        padding:'12px 14px',
        display:'flex', alignItems:'flex-start', gap:12,
        cursor:'pointer', marginBottom:8,
      }}
    >
      {/* Icon */}
      <div style={{width:42,height:42,borderRadius:12,background:c.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
        <EventIcon type={event.type} size={20} color={c.color} />
      </div>

      {/* Content */}
      <div style={{flex:1, minWidth:0}}>
        <div style={{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap',marginBottom:3}}>
          <span style={{fontSize:13,fontWeight:700,color:C.primary}}>{event.title}</span>
          {event.urgent && (
            <span style={{fontSize:10,background:'#FEF3C7',color:C.warn,padding:'1px 7px',borderRadius:20,fontWeight:700}}>⚠ Urgente</span>
          )}
        </div>
        <p style={{fontSize:11,color:C.gray500,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{event.desc}</p>

        {event.progress !== undefined && (
          <div style={{display:'flex',alignItems:'center',gap:6,marginTop:6}}>
            <div style={{flex:1,height:4,borderRadius:4,background:'#E2E8F0'}}>
              <div style={{height:4,borderRadius:4,background:c.color,width:`${event.progress}%`}}/>
            </div>
            <span style={{fontSize:10,color:C.gray400}}>{event.progress}%</span>
          </div>
        )}
      </div>

      {/* Right: time + action */}
      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:5,flexShrink:0}}>
        {event.startH != null && (
          <span style={{fontSize:11,fontWeight:600,color:C.gray400}}>{timeStr(event.startH)}</span>
        )}

        {/* Time until badge */}
        {timeUntil && (
          <span style={{
            fontSize:10, fontWeight:700,
            color: timeUntil.color,
            background: timeUntil.urgent ? '#FEF2F2' : `${timeUntil.color}15`,
            padding:'2px 8px', borderRadius:20,
            display:'flex', alignItems:'center', gap:3,
          }}>
            {timeUntil.urgent && <span style={{width:5,height:5,borderRadius:'50%',background:timeUntil.color,display:'inline-block'}} className="live-dot"/>}
            {timeUntil.label}
          </span>
        )}

        {/* CTA button */}
        {event.live ? (
          <button
            onClick={e => { e.stopPropagation(); onJoin(event) }}
            className="btn"
            style={{background:C.danger,color:'#fff',borderRadius:8,padding:'5px 10px',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',gap:4}}>
            <span className="live-dot">●</span> LIVE
          </button>
        ) : event.task ? (
          <button onClick={e => e.stopPropagation()} className="btn"
            style={{background:c.color,color:'#fff',borderRadius:8,padding:'5px 10px',fontSize:11,fontWeight:700}}>Hacer ✓</button>
        ) : (
          <button onClick={e => e.stopPropagation()} className="btn"
            style={{background:c.bg,color:c.color,borderRadius:8,padding:'5px 10px',fontSize:11,fontWeight:600}}>Ver →</button>
        )}
      </div>
    </div>
  )
}
