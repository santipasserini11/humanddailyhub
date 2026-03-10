import { useState } from 'react'
import { C } from '../../constants/tokens.js'
import { useAuth } from '../../hooks/useAuth.jsx'
import { initials } from '../../constants/utils.js'
import { ROLES } from '../../constants/tokens.js'
import HumandLogo from './HumandLogo.jsx'
import FilterPanel from './FilterPanel.jsx'

export default function TopBar({
  view, setView,
  weekOffset, setWeekOffset,
  weekLabel,
  onCreateClick,
  prefs, toggle, toggleAll,
}) {
  const { role, signOut } = useAuth()
  const currentRole = ROLES.find(r => r.id === role) || ROLES[0]
  const [showFilter, setShowFilter] = useState(false)

  // Count how many filters are OFF
  const offCount = Object.values(prefs || {}).filter(v => !v).length

  return (
    <div style={{
      background: C.white,
      borderBottom: '1px solid #E2E8F0',
      padding: '0 24px',
      height: 56,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexShrink: 0, zIndex: 10, gap: 16,
    }}>

      {/* LEFT */}
      <div style={{display:'flex', alignItems:'center', gap:16}}>
        <HumandLogo size="sm" />
        <div style={{width:1, height:22, background:'#E2E8F0'}}/>

        {/* Tabs */}
        <div style={{display:'flex'}}>
          {[
            { id:'hub',   label:'Daily Hub' },
            { id:'week',  label:'Semana' },
            { id:'month', label:'Mes' },
          ].map(t => (
            <button key={t.id} onClick={() => setView(t.id)}
              className={`tab-btn${view === t.id ? ' active' : ''}`}
              style={{ padding:'18px 14px 16px', fontSize:13,
                fontWeight: view===t.id ? 700 : 500,
                color: view===t.id ? C.accent : C.gray500,
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Week nav */}
        {view !== 'hub' && (
          <div style={{display:'flex', alignItems:'center', gap:4}}>
            <button className="btn" onClick={() => setWeekOffset(0)}
              style={{fontSize:11,padding:'4px 10px',background:C.accent,color:'#fff',borderRadius:7,fontWeight:700}}>
              Hoy
            </button>
            <button className="btn" onClick={() => setWeekOffset(w => w-1)}
              style={{width:27,height:27,border:'1px solid #E2E8F0',background:C.white,borderRadius:7,fontSize:14,color:C.gray500}}>‹</button>
            <span style={{fontSize:12,fontWeight:600,color:C.gray500,minWidth:140,textAlign:'center'}}>{weekLabel}</span>
            <button className="btn" onClick={() => setWeekOffset(w => w+1)}
              style={{width:27,height:27,border:'1px solid #E2E8F0',background:C.white,borderRadius:7,fontSize:14,color:C.gray500}}>›</button>
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div style={{display:'flex', alignItems:'center', gap:8}}>

        {/* Filter button — with badge if some are OFF */}
        <div style={{position:'relative'}}>
          <button onClick={() => setShowFilter(s => !s)}
            style={{
              height:32, padding:'0 12px',
              border: `1.5px solid ${offCount > 0 ? C.accent : '#E2E8F0'}`,
              borderRadius:9, background: offCount > 0 ? C.accentLight : C.white,
              cursor:'pointer', fontSize:13,
              color: offCount > 0 ? C.accent : C.gray500,
              display:'flex', alignItems:'center', gap:5,
              fontFamily:"'DM Sans',sans-serif", fontWeight:600,
              transition:'all .15s',
            }}>
            <span>⚡</span>
            <span style={{fontSize:12}}>Filtros</span>
            {offCount > 0 && (
              <span style={{
                width:16, height:16, borderRadius:'50%',
                background:C.accent, color:'#fff',
                fontSize:10, fontWeight:800,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>{offCount}</span>
            )}
          </button>

          {showFilter && (
            <FilterPanel
              prefs={prefs}
              toggle={toggle}
              toggleAll={toggleAll}
              onClose={() => setShowFilter(false)}
            />
          )}
        </div>

        {/* + Crear */}
        <button onClick={onCreateClick} className="btn"
          style={{width:32,height:32,borderRadius:9,background:C.accent,border:'none',color:'#fff',fontSize:20,fontWeight:300,display:'flex',alignItems:'center',justifyContent:'center'}}>
          +
        </button>

        {/* Notificaciones */}
        <div style={{position:'relative',cursor:'pointer'}}>
          <div style={{width:32,height:32,borderRadius:9,background:'#F1F5F9',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15}}>🔔</div>
          <div style={{position:'absolute',top:5,right:5,width:7,height:7,borderRadius:'50%',background:C.danger,border:'2px solid #fff'}}/>
        </div>

        {/* Avatar */}
        <div
          title={`${currentRole.name} · Cerrar sesión`}
          onClick={signOut}
          style={{width:32,height:32,borderRadius:'50%',background:C.accent,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:11,cursor:'pointer',transition:'all .15s'}}
          onMouseEnter={e => e.currentTarget.style.background = C.primary}
          onMouseLeave={e => e.currentTarget.style.background = C.accent}
        >
          {initials(currentRole.name)}
        </div>
      </div>
    </div>
  )
}
