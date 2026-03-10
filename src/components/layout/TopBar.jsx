import { C, ROLES } from '../../constants/tokens.js'
import { useAuth } from '../../hooks/useAuth.jsx'
import { initials } from '../../constants/utils.js'

export default function TopBar({
  view, setView,
  weekOffset, setWeekOffset,
  weekLabel,
  showLayers, setShowLayers,
  onCreateClick,
}) {
  const { role, switchRole, signOut, session } = useAuth()
  const currentRole = ROLES.find(r => r.id === role) || ROLES[0]

  return (
    <div style={{
      background:C.white,
      borderBottom:'1px solid #E2E8F0',
      padding:'0 20px',
      height:56,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      flexShrink:0, zIndex:10,
      gap:12,
    }}>

      {/* LEFT — Logo + title */}
      <div style={{display:'flex', alignItems:'center', gap:10, flexShrink:0}}>
        {/* Humand wordmark */}
        <div style={{display:'flex', alignItems:'center', gap:6}}>
          <div style={{
            width:30, height:30, borderRadius:8,
            background:C.primary,
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <span style={{fontFamily:'Comfortaa, sans-serif', fontWeight:700, fontSize:14, color:'#fff'}}>H</span>
          </div>
          <span style={{fontFamily:'Comfortaa, sans-serif', fontWeight:700, fontSize:16, color:C.primary, letterSpacing:'-0.3px'}}>
            umand
          </span>
        </div>

        {/* Divider */}
        <div style={{width:1, height:22, background:'#E2E8F0', margin:'0 2px'}}/>

        {/* View tabs */}
        <div style={{display:'flex', borderBottom:'1px solid transparent', gap:0}}>
          {[
            { id:'hub',   label:'Daily Hub',  emoji:'🏠' },
            { id:'week',  label:'Semana',     emoji:'📅' },
            { id:'month', label:'Mes',        emoji:'🗓' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setView(t.id)}
              className={`tab-btn${view === t.id ? ' active' : ''}`}
              style={{
                padding:'18px 12px 16px',
                fontSize:12,
                fontWeight: view === t.id ? 700 : 500,
                color: view === t.id ? C.accent : C.gray500,
              }}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {/* Week nav — only for week/month views */}
        {view !== 'hub' && (
          <div style={{display:'flex', alignItems:'center', gap:4, marginLeft:8}}>
            <button
              className="btn"
              onClick={() => setWeekOffset(0)}
              style={{fontSize:11, padding:'4px 10px', background:C.accent, color:'#fff', borderRadius:7, fontWeight:700}}
            >Hoy</button>
            <button
              className="btn"
              onClick={() => setWeekOffset(w => w-1)}
              style={{width:27, height:27, border:'1px solid #E2E8F0', background:C.white, borderRadius:7, fontSize:14, color:C.gray500}}
            >‹</button>
            <span style={{fontSize:12, fontWeight:600, color:C.gray500, minWidth:130, textAlign:'center'}}>
              {weekLabel}
            </span>
            <button
              className="btn"
              onClick={() => setWeekOffset(w => w+1)}
              style={{width:27, height:27, border:'1px solid #E2E8F0', background:C.white, borderRadius:7, fontSize:14, color:C.gray500}}
            >›</button>
          </div>
        )}
      </div>

      {/* CENTER — Daily Hub title (only on hub view) */}
      {view === 'hub' && (
        <div style={{flex:1, display:'flex', justifyContent:'center', alignItems:'center', pointerEvents:'none'}}>
          <span style={{
            fontFamily:"'Playfair Display', serif",
            fontSize:18, fontWeight:700,
            color:C.primary,
            letterSpacing:'-0.3px',
          }}>Daily Hub</span>
          <span style={{
            marginLeft:8,
            fontSize:11, background:C.accentLight, color:C.accent,
            padding:'2px 9px', borderRadius:20, fontWeight:700,
            pointerEvents:'auto',
          }}>Smart</span>
        </div>
      )}
      {view !== 'hub' && <div style={{flex:1}}/>}

      {/* RIGHT — role switcher + actions */}
      <div style={{display:'flex', alignItems:'center', gap:8, flexShrink:0}}>

        {/* Role switcher */}
        <div style={{display:'flex', background:'#F1F5F9', borderRadius:10, padding:3, gap:2}}>
          {ROLES.map(r => (
            <button
              key={r.id}
              onClick={() => switchRole(r.id)}
              style={{
                padding:'4px 11px', borderRadius:7, border:'none', cursor:'pointer',
                fontSize:11, fontWeight: role===r.id ? 700 : 500,
                fontFamily:"'DM Sans', sans-serif",
                background: role===r.id ? C.white : 'transparent',
                color: role===r.id ? C.primary : C.gray500,
                boxShadow: role===r.id ? '0 1px 4px rgba(0,0,0,.09)' : 'none',
                transition:'all .15s',
                display:'flex', alignItems:'center', gap:4,
              }}
            >
              {r.icon} {r.label}
            </button>
          ))}
        </div>

        {/* Layers toggle */}
        <button
          onClick={() => setShowLayers(s => !s)}
          style={{
            padding:'5px 10px', borderRadius:8,
            border:`1.5px solid ${showLayers ? C.accent : '#E2E8F0'}`,
            background: showLayers ? C.accentLight : C.white,
            cursor:'pointer', fontSize:11, fontWeight:600,
            color: showLayers ? C.accent : C.gray500,
            transition:'all .15s', fontFamily:"'DM Sans', sans-serif",
          }}
        >⚙ Capas</button>

        {/* Create event */}
        <button
          onClick={onCreateClick}
          className="btn"
          style={{
            width:32, height:32, borderRadius:9,
            background:C.accent, border:'none',
            color:'#fff', fontSize:18, fontWeight:300,
            display:'flex', alignItems:'center', justifyContent:'center',
          }}
        >+</button>

        {/* Notifications */}
        <div style={{position:'relative', cursor:'pointer'}}>
          <div style={{
            width:32, height:32, borderRadius:9,
            background:'#F1F5F9',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:15,
          }}>🔔</div>
          <div style={{
            position:'absolute', top:5, right:5,
            width:7, height:7, borderRadius:'50%',
            background:C.danger, border:'2px solid #fff',
          }}/>
        </div>

        {/* Avatar + logout */}
        <div
          title={`${currentRole.name} · Cerrar sesión`}
          onClick={signOut}
          style={{
            width:32, height:32, borderRadius:'50%',
            background:C.accent,
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#fff', fontWeight:700, fontSize:11,
            cursor:'pointer', flexShrink:0,
            transition:'all .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = C.primary}
          onMouseLeave={e => e.currentTarget.style.background = C.accent}
        >
          {initials(currentRole.name)}
        </div>
      </div>
    </div>
  )
}
