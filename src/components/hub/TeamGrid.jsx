import { C } from '../../constants/tokens.js'
import { TEAM_MEMBERS } from '../../constants/data.js'
import { Av } from '../layout/Atoms.jsx'
import { SectionTitle } from '../layout/Atoms.jsx'

const STATUS = {
  active:  { color:C.success, bg:'#D1FAE5', label:'Activo' },
  absent:  { color:C.warn,    bg:'#FEF3C7', label:'Ausente' },
  pending: { color:C.cyan,    bg:'#CFFAFE', label:'Pendiente' },
}

export default function TeamGrid() {
  return (
    <div className="anim-up2">
      <SectionTitle>👥 Mi equipo hoy</SectionTitle>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8}}>
        {TEAM_MEMBERS.map((m,i) => {
          const s = STATUS[m.status]
          return (
            <div key={i}
              className="card-hover"
              style={{
                background:C.white,
                border:`1.5px solid ${s.color}28`,
                borderRadius:12,
                padding:'10px 8px',
                textAlign:'center',
                cursor:'pointer',
                animation:`fadeUp .25s ${i*.04}s ease both`,
              }}
            >
              <Av name={m.name} size={34} color={s.color}/>
              <p style={{fontSize:11,fontWeight:700,color:C.primary,marginTop:6,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{m.name}</p>
              <p style={{fontSize:9,color:s.color,fontWeight:600,marginTop:2}}>{m.turno}</p>
              <span style={{display:'inline-block',marginTop:4,fontSize:9,background:s.bg,color:s.color,padding:'1px 7px',borderRadius:20,fontWeight:700}}>
                {s.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
