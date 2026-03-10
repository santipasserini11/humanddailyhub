import { C } from '../../constants/tokens.js'
import { ROLE_DATA } from '../../constants/data.js'
import { ROLES } from '../../constants/tokens.js'

export default function HeroHub({ role }) {
  const data  = ROLE_DATA[role]
  const rInfo = ROLES.find(r => r.id === role) || ROLES[0]
  const now   = new Date()
  const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`

  const shiftLabels = {
    colaborador: '🕘 Turno: 09:00 – 18:00',
    manager:     '👥 Equipo: 12 colaboradores',
    hr:          '📋 Vista global · Empresa',
  }

  return (
    <div className="anim-up" style={{
      borderRadius:18,
      padding:'22px 24px',
      marginBottom:16,
      overflow:'hidden',
      position:'relative',
      background:`linear-gradient(135deg, ${C.primary} 0%, #243fa3 55%, ${C.accent} 100%)`,
    }}>
      {/* Decorative blobs */}
      <div style={{position:'absolute',top:-40,right:-30,width:180,height:180,borderRadius:'50%',background:'rgba(255,255,255,.06)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:-50,left:80,width:130,height:130,borderRadius:'50%',background:'rgba(255,255,255,.04)',pointerEvents:'none'}}/>

      <div style={{position:'relative',zIndex:1}}>
        {/* Top row */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:18}}>
          <div>
            <p style={{color:'#93C5FD',fontSize:12,fontWeight:500,marginBottom:3}}>
              Buen día, {rInfo.name.split(' ')[0]} ✨
            </p>
            <h2 style={{color:'#fff',fontSize:18,fontWeight:700,lineHeight:1.2,fontFamily:"'Playfair Display', serif"}}>
              Martes 10 de marzo · 2026
            </h2>
            <p style={{color:'#93C5FD',fontSize:11,marginTop:5}}>{shiftLabels[role]}</p>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{color:'#fff',fontSize:28,fontWeight:700,fontVariantNumeric:'tabular-nums',lineHeight:1}}>
              {timeStr}
            </div>
            <div style={{color:'#93C5FD',fontSize:10,marginTop:3}}>ARG · UTC–3</div>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
          {(data?.stats || []).map((s,i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,.13)',
              backdropFilter:'blur(4px)',
              borderRadius:12,
              padding:'10px 6px',
              textAlign:'center',
              animation:`fadeUp .35s ${i*.07}s ease both`,
            }}>
              <div style={{fontSize:18,marginBottom:3}}>{s.icon}</div>
              <div style={{color:'#fff',fontWeight:700,fontSize:18,lineHeight:1}}>{s.val}</div>
              <div style={{color:'#93C5FD',fontSize:10,marginTop:2,lineHeight:1.2}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Planning nudge */}
        <div style={{
          marginTop:14,
          background:'rgba(255,255,255,.12)',
          backdropFilter:'blur(4px)',
          borderRadius:12, padding:'10px 14px',
          display:'flex', alignItems:'center', gap:10,
          animation:'fadeUp .4s .25s ease both',
          cursor:'pointer',
        }}>
          <span style={{fontSize:16}}>✨</span>
          <p style={{color:'rgba(255,255,255,.88)', fontSize:12, fontWeight:500, lineHeight:1.4, flex:1}}>
            <strong style={{color:'#fff'}}>Empezá a planear tu día.</strong> Tenés {data?.stats?.[0]?.val || 2} eventos programados. ¿Todo listo?
          </p>
          <span style={{color:'#93C5FD', fontSize:11, fontWeight:700, flexShrink:0}}>Ver agenda →</span>
        </div>
      </div>
    </div>
  )
}
