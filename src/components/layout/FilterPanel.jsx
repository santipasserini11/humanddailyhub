import { useState } from 'react'
import { C, EVENT_CFG } from '../../constants/tokens.js'

// Group event types for cleaner UI
const GROUPS = [
  { label:'Trabajo',   keys:['turno','reunion','capacitacion','onboarding'] },
  { label:'HR',        keys:['evaluacion','objetivo','noticia','livestream'] },
  { label:'Personas',  keys:['cumpleanos','aniversario','vacacion'] },
  { label:'General',   keys:['festivo'] },
]

export default function FilterPanel({ prefs, toggle, toggleAll, onClose }) {
  const allOn  = Object.values(prefs).every(Boolean)
  const allOff = Object.values(prefs).every(v => !v)

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position:'fixed', inset:0, zIndex:49 }}
      />

      {/* Panel */}
      <div style={{
        position:'absolute',
        top:46, right:0,
        zIndex:50,
        background:'#fff',
        borderRadius:16,
        boxShadow:'0 12px 40px rgba(0,0,0,.16)',
        border:'1px solid #E2E8F0',
        width:260,
        padding:'14px 16px',
        animation:'fadeUp .18s ease both',
      }}>
        {/* Header */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
          <p style={{fontSize:12,fontWeight:800,color:C.primary,textTransform:'uppercase',letterSpacing:'.06em'}}>Filtrar eventos</p>
          <div style={{display:'flex',gap:6}}>
            <button onClick={()=>toggleAll(true)}
              style={{fontSize:10,color:C.accent,background:C.accentLight,border:'none',borderRadius:6,padding:'3px 8px',cursor:'pointer',fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>
              Todos
            </button>
            <button onClick={()=>toggleAll(false)}
              style={{fontSize:10,color:'#94A3B8',background:'#F1F5F9',border:'none',borderRadius:6,padding:'3px 8px',cursor:'pointer',fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>
              Ninguno
            </button>
          </div>
        </div>

        {GROUPS.map(g => (
          <div key={g.label} style={{marginBottom:10}}>
            <p style={{fontSize:10,fontWeight:700,color:'#CBD5E1',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:5}}>{g.label}</p>
            <div style={{display:'flex',flexDirection:'column',gap:3}}>
              {g.keys.map(k => {
                const c = EVENT_CFG[k]
                const on = prefs[k]
                return (
                  <div key={k}
                    onClick={() => toggle(k)}
                    style={{
                      display:'flex', alignItems:'center', gap:8,
                      padding:'5px 6px', borderRadius:8, cursor:'pointer',
                      background: on ? c.bg : '#F8FAFC',
                      transition:'all .12s',
                    }}
                  >
                    <div style={{
                      width:8, height:8, borderRadius:'50%', flexShrink:0,
                      background: on ? c.color : '#CBD5E1',
                      transition:'all .15s',
                    }}/>
                    <span style={{fontSize:12,color: on ? c.color : '#94A3B8',fontWeight: on ? 600 : 400,flex:1}}>
                      {c.icon} {c.label}
                    </span>
                    {/* Toggle pill */}
                    <div style={{
                      width:28,height:14,borderRadius:20,
                      background: on ? C.accent : '#E2E8F0',
                      position:'relative',transition:'all .2s',flexShrink:0,
                    }}>
                      <div style={{
                        position:'absolute',top:2,width:10,height:10,
                        borderRadius:'50%',background:'#fff',
                        boxShadow:'0 1px 3px rgba(0,0,0,.2)',
                        left: on ? 15 : 2,transition:'all .2s',
                      }}/>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
