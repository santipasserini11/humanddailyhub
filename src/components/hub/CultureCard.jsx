import { useState } from 'react'
import { C, EVENT_CFG } from '../../constants/tokens.js'
import { EventIcon } from '../icons/HumandIcons.jsx'

export default function CultureCard({ event, onOpen, onToast }) {
  const [done, setDone] = useState(false)
  const c = EVENT_CFG[event.type] || EVENT_CFG.cumpleanos

  const handleFelicitar = () => {
    setDone(true)
    const name = event.person?.split(' ')[0] || 'tu compañero'
    if (onToast) {
      if (event.type === 'cumpleanos') {
        onToast(`¡Felicitación enviada a ${name}! 🎉`, '🎂', C.pink)
      } else {
        onToast(`¡Felicitaste el logro de ${name}! 🏆`, '🏆', C.orange)
      }
    }
  }

  return (
    <div className="anim-up1" style={{
      background:c.bg, border:`1.5px solid ${c.color}30`,
      borderRadius:12, padding:'12px 14px',
      display:'flex', alignItems:'center', gap:10,
      marginBottom:8,
    }}>
      <div style={{width:36,height:36,borderRadius:10,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
        <EventIcon type={event.type} size={18} color={c.color} />
      </div>
      <div style={{flex:1}}>
        <p style={{fontSize:12,fontWeight:700,color:c.color}}>{event.title}</p>
        <p style={{fontSize:11,color:C.gray500,marginTop:1}}>{event.desc}</p>
      </div>

      {!done ? (
        <div style={{display:'flex',gap:6,flexShrink:0}}>
          <button
            onClick={handleFelicitar}
            className="btn"
            style={{background:c.color,color:'#fff',borderRadius:8,padding:'5px 11px',fontSize:11,fontWeight:700}}
          >Felicitar 🎉</button>
          <button
            onClick={() => onOpen(event)}
            className="btn"
            style={{background:C.accentLight,color:C.accent,borderRadius:8,padding:'5px 11px',fontSize:11,fontWeight:700}}
          >⭐</button>
        </div>
      ) : (
        <span style={{
          fontSize:11,fontWeight:700,
          background:'#D1FAE5',color:C.success,
          padding:'5px 13px',borderRadius:8,flexShrink:0,
        }}>✓ ¡Enviado!</span>
      )}
    </div>
  )
}
