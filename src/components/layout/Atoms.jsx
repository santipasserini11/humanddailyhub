import { C, EVENT_CFG } from '../../constants/tokens.js'
import { initials } from '../../constants/utils.js'

/* ── Avatar ── */
export function Av({ name='', size=32, color=C.accent }) {
  return (
    <div style={{
      width:size, height:size, borderRadius:'50%', background:color,
      display:'flex', alignItems:'center', justifyContent:'center',
      color:'#fff', fontWeight:700,
      fontSize: size <= 28 ? 10 : size <= 38 ? 12 : 14,
      flexShrink:0,
    }}>
      {initials(name)}
    </div>
  )
}

/* ── Event Chip (compact, used in calendar grid) ── */
export function Chip({ event, onClick, tiny=false }) {
  const c = EVENT_CFG[event.type] || EVENT_CFG.reunion
  return (
    <div
      onClick={() => onClick(event)}
      className="event-chip"
      style={{
        background:c.bg, color:c.color,
        border:`1px solid ${c.color}28`,
        borderRadius:6,
        padding: tiny ? '2px 5px' : '3px 7px',
        fontSize: tiny ? 9 : 10,
        fontWeight:600,
        display:'flex', alignItems:'center', gap:3,
        marginBottom:2,
        overflow:'hidden',
        cursor:'pointer',
      }}
    >
      <span style={{flexShrink:0}}>{c.icon}</span>
      <span style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1}}>
        {event.title}
      </span>
      {event.live && (
        <span style={{color:C.danger, fontSize:8, fontWeight:800, flexShrink:0}}>●</span>
      )}
    </div>
  )
}

/* ── Section label ── */
export function SectionTitle({ children }) {
  return (
    <p style={{
      fontSize:11, fontWeight:700, color:C.gray500,
      textTransform:'uppercase', letterSpacing:'.06em',
      marginBottom:8,
    }}>
      {children}
    </p>
  )
}

/* ── Loading spinner ── */
export function Spinner() {
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', padding:40}}>
      <div className="spin" style={{
        width:28, height:28, borderRadius:'50%',
        border:`3px solid ${C.accentLight}`,
        borderTopColor:C.accent,
      }}/>
    </div>
  )
}
