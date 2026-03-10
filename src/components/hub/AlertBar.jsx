import { C } from '../../constants/tokens.js'
import { ROLE_DATA } from '../../constants/data.js'

export default function AlertBar({ role }) {
  const a = ROLE_DATA[role]?.alert
  if (!a) return null

  return (
    <div className="anim-up" style={{
      background:a.bg,
      border:`1.5px solid ${a.color}40`,
      borderRadius:12,
      padding:'10px 14px',
      display:'flex', alignItems:'center', gap:10,
      marginBottom:14,
    }}>
      <div className="live-dot" style={{
        width:8, height:8, borderRadius:'50%',
        background:a.color, flexShrink:0,
      }}/>
      <div style={{flex:1, minWidth:0}}>
        <span style={{fontSize:12, fontWeight:700, color:a.color}}>{a.text}</span>
        <span style={{fontSize:11, color:C.gray500, marginLeft:8}}>{a.sub}</span>
      </div>
      <button className="btn" style={{
        background:a.color, color:'#fff', borderRadius:8,
        padding:'5px 12px', fontSize:11, fontWeight:700, flexShrink:0,
      }}>
        {a.cta} →
      </button>
    </div>
  )
}
