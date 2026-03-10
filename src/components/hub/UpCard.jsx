import { C, EVENT_CFG } from '../../constants/tokens.js'
import { timeStr } from '../../constants/utils.js'

export default function UpCard({ event, onJoin, onOpen }) {
  const c = EVENT_CFG[event.type] || EVENT_CFG.reunion

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
        cursor:'pointer',
        marginBottom:8,
      }}
    >
      {/* Icon */}
      <div style={{
        width:42, height:42, borderRadius:12, background:c.bg,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:19, flexShrink:0,
      }}>
        {c.icon}
      </div>

      {/* Content */}
      <div style={{flex:1, minWidth:0}}>
        <div style={{display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', marginBottom:3}}>
          <span style={{fontSize:13, fontWeight:700, color:C.primary}}>{event.title}</span>
          {event.urgent && (
            <span style={{fontSize:10,background:'#FEF3C7',color:C.warn,padding:'1px 7px',borderRadius:20,fontWeight:700}}>⚠ Urgente</span>
          )}
        </div>
        <p style={{fontSize:11, color:C.gray500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
          {event.desc}
        </p>
        {event.progress !== undefined && (
          <div style={{display:'flex', alignItems:'center', gap:6, marginTop:6}}>
            <div style={{flex:1, height:4, borderRadius:4, background:'#E2E8F0'}}>
              <div style={{height:4, borderRadius:4, background:c.color, width:`${event.progress}%`}}/>
            </div>
            <span style={{fontSize:10, color:C.gray400}}>{event.progress}%</span>
          </div>
        )}
      </div>

      {/* Time + action */}
      <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6, flexShrink:0}}>
        <span style={{fontSize:11, fontWeight:600, color:C.gray400}}>
          {event.time || (event.startH != null ? timeStr(event.startH) : '')}
        </span>

        {event.live ? (
          <button
            onClick={e => { e.stopPropagation(); onJoin(event) }}
            className="btn"
            style={{
              background:C.danger, color:'#fff', borderRadius:8,
              padding:'4px 10px', fontSize:11, fontWeight:700,
              display:'flex', alignItems:'center', gap:4,
            }}
          >
            <span className="live-dot">●</span> LIVE
          </button>
        ) : event.task ? (
          <button
            onClick={e => e.stopPropagation()}
            className="btn"
            style={{background:c.color, color:'#fff', borderRadius:8, padding:'4px 10px', fontSize:11, fontWeight:700}}
          >Hacer ✓</button>
        ) : (
          <button
            onClick={e => e.stopPropagation()}
            className="btn"
            style={{background:c.bg, color:c.color, borderRadius:8, padding:'4px 10px', fontSize:11, fontWeight:600}}
          >Ver →</button>
        )}
      </div>
    </div>
  )
}
