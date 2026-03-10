import { C, NAV_ITEMS } from '../../constants/tokens.js'

export default function Sidebar() {
  return (
    <div style={{
      width:60, background:C.primary,
      display:'flex', flexDirection:'column', alignItems:'center',
      paddingTop:14, paddingBottom:14, gap:2, flexShrink:0, zIndex:20,
    }}>
      {/* Logo mark */}
      <div style={{
        width:36, height:36, borderRadius:10,
        background:'rgba(255,255,255,.15)',
        display:'flex', alignItems:'center', justifyContent:'center',
        marginBottom:14, cursor:'pointer',
        border:'1px solid rgba(255,255,255,.1)',
      }}>
        <span style={{
          fontFamily:'Comfortaa, sans-serif',
          fontWeight:700, fontSize:17, color:'#fff',
        }}>H</span>
      </div>

      {/* Nav items */}
      {NAV_ITEMS.map(item => (
        <button
          key={item.label}
          title={item.label}
          className={`nav-item${item.active ? ' active' : ''}`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  )
}
