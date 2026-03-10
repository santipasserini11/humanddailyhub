import { C, ROLES } from '../../constants/tokens.js'
import { ROLE_DATA } from '../../constants/data.js'

export default function HeroHub({ role }) {
  const data  = ROLE_DATA[role]
  const rInfo = ROLES.find(r => r.id === role) || ROLES[0]

  const shiftLabels = {
    colaborador: { icon:'🕘', text:'Turno: 09:00 – 18:00' },
    manager:     { icon:'👥', text:'Equipo · 12 colaboradores activos' },
    hr:          { icon:'🏢', text:'Vista global · Empresa' },
  }
  const shift = shiftLabels[role]

  return (
    <div className="anim-up" style={{ marginBottom:16 }}>
      {/* Date + context bar */}
      <div style={{
        background:'#fff',
        borderRadius:16,
        padding:'18px 22px',
        marginBottom:10,
        border:'1px solid #E8EEFF',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        flexWrap:'wrap', gap:12,
      }}>
        <div>
          <h2 style={{
            fontSize:22, fontWeight:800,
            color:C.primary, lineHeight:1.1,
            fontFamily:"'DM Sans', sans-serif",
          }}>
            Martes 10 de marzo · 2026
          </h2>
          <p style={{fontSize:13, color:C.gray500, marginTop:4}}>
            {shift.icon} {shift.text}
          </p>
        </div>

        {/* Role badge */}
        <div style={{
          background:C.accentLight,
          border:`1.5px solid ${C.accent}28`,
          borderRadius:10, padding:'7px 14px',
          display:'flex', alignItems:'center', gap:8,
          flexShrink:0,
        }}>
          <span style={{fontSize:16}}>{rInfo.icon}</span>
          <div>
            <p style={{fontSize:12,fontWeight:700,color:C.primary}}>{rInfo.name}</p>
            <p style={{fontSize:10,color:C.accent}}>{rInfo.dept}</p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8}}>
        {(data?.stats || []).map((s,i) => (
          <div key={i} className="card-hover" style={{
            background:'#fff',
            border:'1px solid #E8EEFF',
            borderRadius:12, padding:'12px 8px',
            textAlign:'center',
            animation:`fadeUp .32s ${i*.07}s ease both`,
            cursor:'pointer',
          }}>
            <div style={{fontSize:20,marginBottom:4}}>{s.icon}</div>
            <div style={{fontWeight:800,fontSize:20,color:s.color,lineHeight:1}}>{s.val}</div>
            <div style={{fontSize:10,color:C.gray400,marginTop:3,lineHeight:1.3}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Planning nudge */}
      <div style={{
        marginTop:10,
        background:`linear-gradient(135deg, ${C.primary} 0%, ${C.accent} 100%)`,
        borderRadius:12, padding:'11px 16px',
        display:'flex', alignItems:'center', gap:10,
        animation:'fadeUp .4s .25s ease both',
        cursor:'pointer',
      }}>
        <span style={{fontSize:16}}>✨</span>
        <p style={{color:'rgba(255,255,255,.9)', fontSize:12, fontWeight:500, lineHeight:1.4, flex:1}}>
          <strong style={{color:'#fff'}}>Empezá a planear tu día.</strong> Tenés {data?.stats?.[0]?.val || 2} eventos programados hoy. ¿Estás listo?
        </p>
        <span style={{color:'rgba(255,255,255,.7)', fontSize:11, fontWeight:700, flexShrink:0, whiteSpace:'nowrap'}}>Ver agenda →</span>
      </div>
    </div>
  )
}
