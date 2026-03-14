import { useState } from 'react'
import { C, EVENT_CFG } from '../../constants/tokens.js'

const OPTIONS_BY_ROLE = {
  colaborador: [
    { type:'reunion',      label:'Reunión con Humand Live',  desc:'Video llamada nativa en la plataforma' },
    { type:'onboarding',   label:'Tarea personal',           desc:'Recordatorio o checklist para mí' },
    { type:'capacitacion', label:'Solicitar capacitación',   desc:'Pedir acceso a un nuevo curso' },
  ],
  manager: [
    { type:'reunion',    label:'Reunión de equipo',      desc:'Convocar a mi equipo con Humand Live' },
    { type:'onboarding', label:'Asignar tarea',          desc:'Delegar una tarea a un colaborador' },
    { type:'evaluacion', label:'Agendar 1:1',            desc:'Check-in individual con un colaborador' },
    { type:'objetivo',   label:'Revisión de objetivos',  desc:'Sesión de seguimiento de OKRs' },
  ],
  hr: [
    { type:'noticia',    label:'Noticia de empresa',          desc:'Publicar en el feed + calendario' },
    { type:'livestream', label:'Evento All-Company',          desc:'Transmisión para toda la empresa' },
    { type:'evaluacion', label:'Abrir evaluación / encuesta', desc:'Nuevo ciclo de evaluación o clima' },
    { type:'objetivo',   label:'Evento de OKR',               desc:'Apertura o cierre de ciclo de objetivos' },
    { type:'onboarding', label:'Plan de onboarding',          desc:'Crear proceso para nuevo ingreso' },
  ],
}

const DURATIONS = ['30 min','1 hora','1.5 horas','2 horas','3 horas']

export default function CreateModal({ role, onClose }) {
  const [step,     setStep]     = useState(0)
  const [selected, setSelected] = useState(null)
  const [saved,    setSaved]    = useState(false)
  const [form,     setForm]     = useState({ title:'', date:'', time:'', duration:'1 hora' })

  const opts = OPTIONS_BY_ROLE[role] || OPTIONS_BY_ROLE.colaborador

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => { setSaved(false); onClose() }, 1200)
  }

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
          background:C.white, borderRadius:22,
          width:'100%', maxWidth:400, margin:16,
          overflow:'hidden',
          boxShadow:'0 20px 50px rgba(0,0,0,.2)',
        }}
      >
        {/* Header */}
        <div style={{padding:'20px 22px', borderBottom:'1px solid #F1F5F9', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <h3 style={{fontSize:16,fontWeight:700,color:C.primary}}>Agregar al calendario</h3>
            <p style={{fontSize:11,color:C.gray400,marginTop:2}}>¿Qué querés crear?</p>
          </div>
          <button onClick={onClose} style={{width:28,height:28,borderRadius:8,border:'none',background:'#F1F5F9',cursor:'pointer',color:C.gray500,fontSize:15,display:'flex',alignItems:'center',justifyContent:'center'}}>×</button>
        </div>

        <div style={{padding:'14px 22px 22px', maxHeight:'70vh', overflowY:'auto'}}>

          {/* Step 0 — choose type */}
          {step === 0 && (
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {opts.map((o,i) => {
                const c = EVENT_CFG[o.type]
                return (
                  <div key={i}
                    onClick={() => { setSelected(o); setStep(1) }}
                    style={{
                      display:'flex', alignItems:'center', gap:12,
                      padding:'12px 14px',
                      border:`1.5px solid ${c.color}18`,
                      borderRadius:12, cursor:'pointer',
                      transition:'all .15s', background:C.white,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background=c.bg; e.currentTarget.style.borderColor=c.color+'40' }}
                    onMouseLeave={e => { e.currentTarget.style.background=C.white; e.currentTarget.style.borderColor=c.color+'18' }}
                  >
                    <div style={{width:38,height:38,borderRadius:10,background:c.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{c.icon}</div>
                    <div>
                      <p style={{fontSize:13,fontWeight:700,color:C.primary}}>{o.label}</p>
                      <p style={{fontSize:11,color:C.gray500,marginTop:1}}>{o.desc}</p>
                    </div>
                    <span style={{marginLeft:'auto',color:'#CBD5E1',fontSize:14}}>›</span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Step 1 — fill form */}
          {step === 1 && selected && (() => {
            const c = EVENT_CFG[selected.type]
            return (
              <div>
                <button
                  onClick={() => setStep(0)}
                  style={{fontSize:11,color:C.accent,background:'none',border:'none',cursor:'pointer',marginBottom:14,fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}
                >← Volver</button>

                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:18}}>
                  <div style={{width:40,height:40,borderRadius:12,background:c.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>{c.icon}</div>
                  <p style={{fontSize:14,fontWeight:700,color:C.primary}}>{selected.label}</p>
                </div>

                {[
                  { key:'title',    label:'Título',         type:'text',   ph:'Nombre del evento...' },
                  { key:'date',     label:'Fecha',          type:'date',   ph:'' },
                  { key:'time',     label:'Hora de inicio', type:'time',   ph:'' },
                ].map(f => (
                  <div key={f.key} style={{marginBottom:12}}>
                    <label style={{display:'block',fontSize:11,fontWeight:700,color:C.gray500,marginBottom:5,textTransform:'uppercase',letterSpacing:'.05em'}}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.ph}
                      value={form[f.key]}
                      onChange={e => setForm(v => ({...v, [f.key]:e.target.value}))}
                      style={{width:'100%',padding:'9px 12px',border:'1.5px solid #E2E8F0',borderRadius:10,fontSize:12,color:'#334155',background:'#FAFAFA'}}
                    />
                  </div>
                ))}

                <div style={{marginBottom:14}}>
                  <label style={{display:'block',fontSize:11,fontWeight:700,color:C.gray500,marginBottom:5,textTransform:'uppercase',letterSpacing:'.05em'}}>Duración</label>
                  <select
                    value={form.duration}
                    onChange={e => setForm(v => ({...v, duration:e.target.value}))}
                    style={{width:'100%',padding:'9px 12px',border:'1.5px solid #E2E8F0',borderRadius:10,fontSize:12,color:'#334155',background:'#FAFAFA'}}
                  >
                    {DURATIONS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>

                {(selected.type==='reunion'||selected.type==='livestream') && (
                  <div style={{background:'#FEF2F2',border:'1px solid #FCA5A5',borderRadius:10,padding:'10px 12px',marginBottom:14,display:'flex',alignItems:'center',gap:8}}>
                    <span>📡</span>
                    <p style={{fontSize:11,fontWeight:600,color:C.danger}}>Se generará un link de Humand Live automáticamente</p>
                  </div>
                )}

                {saved ? (
                  <div style={{padding:'12px',background:'#D1FAE5',color:C.success,borderRadius:12,fontSize:13,fontWeight:700,textAlign:'center'}}>
                    ✓ ¡Evento creado!
                  </div>
                ) : (
                  <button onClick={handleSave} className="btn"
                    style={{width:'100%',padding:'12px',background:c.color,color:'#fff',borderRadius:12,fontSize:13,fontWeight:700}}>
                    ✓ Crear evento
                  </button>
                )}
              </div>
            )
          })()}
        </div>
      </div>
    </div>
  )
}
