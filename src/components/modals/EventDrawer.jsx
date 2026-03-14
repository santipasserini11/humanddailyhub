import { useState } from 'react'
import { C, EVENT_CFG } from '../../constants/tokens.js'
import { timeStr } from '../../constants/utils.js'
import { Av } from '../layout/Atoms.jsx'

export default function EventDrawer({ event, onClose, onJoin }) {
  const [celebrated, setCelebrated] = useState(false)
  if (!event) return null
  const c = EVENT_CFG[event.type] || EVENT_CFG.reunion

  return (
    <div
      style={{
        position:'fixed', inset:0, zIndex:60,
        display:'flex', alignItems:'center', justifyContent:'center',
        background:'rgba(15,23,60,.55)', backdropFilter:'blur(5px)',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="anim-up"
        style={{
          background:C.white, borderRadius:24,
          width:'100%', maxWidth:420, margin:16,
          overflow:'hidden',
          boxShadow:'0 25px 60px rgba(0,0,0,.25)',
          border:`2px solid ${c.color}28`,
        }}
      >
        {/* Header */}
        <div style={{padding:'20px 22px', background:c.bg, borderBottom:`1px solid ${c.color}18`}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10}}>
            <div style={{display:'flex', alignItems:'center', gap:10}}>
              <div style={{
                width:44, height:44, borderRadius:14,
                background:C.white, boxShadow:`0 2px 8px ${c.color}28`,
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:22,
              }}>{c.icon}</div>
              <div>
                <span style={{fontSize:10, background:c.color, color:'#fff', padding:'2px 9px', borderRadius:20, fontWeight:700}}>
                  {c.label}
                </span>
                {event.live && (
                  <span style={{
                    marginLeft:5, fontSize:10, background:C.danger, color:'#fff',
                    padding:'2px 8px', borderRadius:20, fontWeight:700,
                    display:'inline-flex', alignItems:'center', gap:3,
                  }}>
                    <span className="live-dot">●</span> LIVE
                  </span>
                )}
              </div>
            </div>
            <button onClick={onClose} style={{
              width:28, height:28, borderRadius:8, border:'none',
              background:'rgba(0,0,0,.06)', cursor:'pointer',
              fontSize:15, color:C.gray500,
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>×</button>
          </div>
          <h3 style={{
            fontSize:17, fontWeight:700, color:C.primary, lineHeight:1.2,
          }}>{event.title}</h3>
          <p style={{fontSize:12, color:C.gray500, marginTop:5}}>
            {event.allDay ? '📅 Todo el día' : `🕐 ${timeStr(event.startH)} — ${timeStr(event.endH)}`}
          </p>
        </div>

        {/* Body */}
        <div style={{padding:'18px 22px', maxHeight:340, overflowY:'auto'}}>
          {event.desc && (
            <p style={{fontSize:13, color:'#475569', lineHeight:1.6, marginBottom:14}}>{event.desc}</p>
          )}

          {event.person && (
            <div style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',background:'#F8FAFC',borderRadius:12,marginBottom:12}}>
              <Av name={event.person} size={34} color={c.color}/>
              <span style={{fontSize:13,fontWeight:600,color:'#334155'}}>{event.person}</span>
            </div>
          )}

          {event.participants?.length > 0 && (
            <div style={{marginBottom:12}}>
              <p style={{fontSize:10,fontWeight:700,color:C.gray400,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:6}}>Participantes</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                {event.participants.map((p,i) => (
                  <span key={i} style={{fontSize:11,background:C.accentLight,color:C.accent,padding:'3px 10px',borderRadius:20,fontWeight:600}}>{p}</span>
                ))}
              </div>
            </div>
          )}

          {event.liveUrl && (
            <div style={{background:'#FEF2F2',border:'1px solid #FCA5A5',borderRadius:12,padding:'12px 14px',display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
              <span style={{fontSize:20}}>📡</span>
              <div>
                <p style={{fontSize:11,fontWeight:700,color:C.danger}}>Humand Live — Sesión en vivo</p>
                <p style={{fontSize:10,color:'#EF4444',marginTop:1}}>{event.liveUrl}</p>
              </div>
            </div>
          )}

          {event.progress !== undefined && (
            <div style={{marginBottom:12}}>
              <p style={{fontSize:10,color:C.gray400,marginBottom:5}}>Progreso del curso</p>
              <div style={{height:6,borderRadius:6,background:'#E2E8F0'}}>
                <div style={{height:6,borderRadius:6,background:c.color,width:`${event.progress}%`,transition:'width .5s ease'}}/>
              </div>
              <p style={{fontSize:10,color:C.gray400,marginTop:4}}>{event.progress}% completado</p>
            </div>
          )}

          {event.urgent && (
            <div style={{background:'#FEF3C7',border:'1px solid #FCD34D',borderRadius:10,padding:'10px 12px',display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
              <span>⚠️</span>
              <p style={{fontSize:11,fontWeight:600,color:C.warn}}>Fecha límite próxima — completalo antes de que cierre</p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div style={{padding:'0 22px 20px', display:'flex', flexWrap:'wrap', gap:8}}>
          {event.type === 'cumpleanos' && !celebrated && <>
            <button onClick={() => setCelebrated(true)} className="btn" style={{flex:1,padding:'10px',background:C.pink,color:'#fff',borderRadius:12,fontSize:13,fontWeight:700}}>🎉 Felicitar</button>
            <button className="btn" style={{flex:1,padding:'10px',background:C.accentLight,color:C.accent,borderRadius:12,fontSize:13,fontWeight:700}}>⭐ Reconocimiento</button>
          </>}
          {event.type === 'cumpleanos' && celebrated && (
            <div style={{flex:1,padding:'10px',background:'#D1FAE5',color:C.success,borderRadius:12,fontSize:13,fontWeight:700,textAlign:'center'}}>✓ ¡Felicitación enviada!</div>
          )}
          {event.type === 'aniversario' && (
            <button className="btn" style={{flex:1,padding:'10px',background:C.orange,color:'#fff',borderRadius:12,fontSize:13,fontWeight:700}}>🏆 Celebrar logro</button>
          )}
          {event.type === 'capacitacion' && (
            <button className="btn" style={{flex:1,padding:'10px',background:C.success,color:'#fff',borderRadius:12,fontSize:13,fontWeight:700}}>📚 Ir al curso →</button>
          )}
          {event.type === 'evaluacion' && (
            <button className="btn" style={{flex:1,padding:'10px',background:C.violet,color:'#fff',borderRadius:12,fontSize:13,fontWeight:700}}>📊 Completar evaluación →</button>
          )}
          {event.type === 'objetivo' && (
            <button className="btn" style={{flex:1,padding:'10px',background:C.warn,color:'#fff',borderRadius:12,fontSize:13,fontWeight:700}}>🎯 Ver mis objetivos →</button>
          )}
          {event.type === 'onboarding' && (
            <button className="btn" style={{flex:1,padding:'10px',background:C.cyan,color:'#fff',borderRadius:12,fontSize:13,fontWeight:700}}>✅ Completar tarea</button>
          )}
          {event.live && event.liveUrl && (
            <button onClick={() => { onJoin(event); onClose() }} className="btn"
              style={{flex:1,padding:'10px',background:C.danger,color:'#fff',borderRadius:12,fontSize:13,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
              <span className="live-dot">●</span> Unirse al LIVE
            </button>
          )}
          <button onClick={onClose} style={{padding:'10px 16px',background:'#F1F5F9',color:C.gray500,border:'none',borderRadius:12,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
