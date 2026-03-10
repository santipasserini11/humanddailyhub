import { ROLE_DATA } from '../../constants/data.js'
import { SectionTitle } from '../layout/Atoms.jsx'

export default function Nudges({ role }) {
  const items = ROLE_DATA[role]?.nudges || []

  return (
    <div className="anim-up3">
      <SectionTitle>💡 Recordatorios inteligentes</SectionTitle>
      <div style={{display:'flex', flexDirection:'column', gap:6}}>
        {items.map((n,i) => (
          <div key={i} style={{
            background:`${n.color}11`,
            border:`1px solid ${n.color}22`,
            borderRadius:10,
            padding:'9px 12px',
            display:'flex', alignItems:'flex-start', gap:8,
            animation:`fadeUp .3s ${i*.07}s ease both`,
          }}>
            <span style={{fontSize:15, flexShrink:0}}>{n.icon}</span>
            <span style={{fontSize:11, color:n.color, fontWeight:600, lineHeight:1.45}}>{n.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
