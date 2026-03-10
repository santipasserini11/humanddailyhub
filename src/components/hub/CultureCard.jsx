import { useState } from 'react'
import { C, EVENT_CFG } from '../../constants/tokens.js'

export default function CultureCard({ event, onOpen }) {
  const [done, setDone] = useState(false)
  const c = EVENT_CFG[event.type] || EVENT_CFG.cumpleanos

  return (
    <div className="anim-up1" style={{
      background:c.bg, border:`1.5px solid ${c.color}30`,
      borderRadius:12, padding:'12px 14px',
      display:'flex', alignItems:'center', gap:10,
      marginBottom:8,
    }}>
      <span style={{fontSize:22}}>{c.icon}</span>
      <div style={{flex:1}}>
        <p style={{fontSize:12, fontWeight:700, color:c.color}}>{event.title}</p>
        <p style={{fontSize:11, color:C.gray500, marginTop:1}}>{event.desc}</p>
      </div>

      {!done ? (
        <div style={{display:'flex', gap:6, flexShrink:0}}>
          <button
            onClick={() => setDone(true)}
            className="btn"
            style={{background:c.color, color:'#fff', borderRadius:8, padding:'5px 11px', fontSize:11, fontWeight:700}}
          >Felicitar 🎉</button>
          <button
            onClick={() => onOpen(event)}
            className="btn"
            style={{background:C.accentLight, color:C.accent, borderRadius:8, padding:'5px 11px', fontSize:11, fontWeight:700}}
          >⭐</button>
        </div>
      ) : (
        <span style={{
          fontSize:11, fontWeight:700,
          background:'#D1FAE5', color:C.success,
          padding:'5px 13px', borderRadius:8, flexShrink:0,
        }}>✓ ¡Enviado!</span>
      )}
    </div>
  )
}
