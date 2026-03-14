import { useState } from 'react'
import { C, TODAY } from '../../constants/tokens.js'
import { EVENT_CFG } from '../../constants/tokens.js'
import { EventIcon, IconLivestream } from '../icons/HumandIcons.jsx'

/* ── Mini calendar ── */
export function MiniCal() {
  const [offset, setOffset] = useState(0)
  const base = new Date(TODAY.getFullYear(), TODAY.getMonth() + offset, 1)
  const daysInMonth = new Date(base.getFullYear(), base.getMonth()+1, 0).getDate()
  const firstDay = base.getDay()
  const pad = firstDay === 0 ? 6 : firstDay - 1
  const label = base.toLocaleDateString('es-AR', { month:'long', year:'numeric' })

  return (
    <div style={{background:C.white, borderRadius:14, border:'1px solid #E2E8F0', padding:14, marginBottom:12}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
        <span style={{fontSize:11, fontWeight:700, color:C.primary, textTransform:'capitalize'}}>{label}</span>
        <div style={{display:'flex', gap:3}}>
          {['‹','›'].map((a,i) => (
            <button key={a} onClick={() => setOffset(o => o + (i===0?-1:1))}
              style={{width:20, height:20, border:'none', background:'#F1F5F9', borderRadius:5,
                cursor:'pointer', fontSize:11, color:C.gray500, display:'flex', alignItems:'center', justifyContent:'center'}}>
              {a}
            </button>
          ))}
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:1, textAlign:'center'}}>
        {['L','M','X','J','V','S','D'].map(d => (
          <span key={d} style={{fontSize:9, color:'#CBD5E1', fontWeight:600, padding:'2px 0'}}>{d}</span>
        ))}
        {Array.from({length:pad}).map((_,i) => <span key={`p${i}`}/>)}
        {Array.from({length:daysInMonth}, (_,i) => i+1).map(day => {
          const isT = day === TODAY.getDate() && offset === 0
          return (
            <button key={day} style={{
              width:22, height:22, borderRadius:'50%', border:'none', cursor:'pointer',
              fontSize:10, fontWeight: isT ? 700 : 400,
              margin:'1px auto', display:'flex', alignItems:'center', justifyContent:'center',
              background: isT ? C.accent : 'transparent',
              color: isT ? '#fff' : C.gray500,
            }}>
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Upcoming Lives ── */
export function SidebarLives({ events, onJoin }) {
  const lives = events.filter(e => e.live).slice(0,4)

  return (
    <div style={{background:C.white, borderRadius:14, border:'1px solid #E2E8F0', padding:14, marginBottom:12}}>
      <div style={{display:'flex', alignItems:'center', gap:5, marginBottom:10}}>
        <span className="live-dot" style={{width:7,height:7,borderRadius:'50%',background:C.danger,display:'inline-block'}}/>
        <span style={{fontSize:11, fontWeight:700, color:C.primary}}>Próximos LIVES</span>
      </div>
      {lives.map(e => {
        const c = EVENT_CFG[e.type] || EVENT_CFG.livestream
        return (
          <div key={e.id}
            style={{
              background:c.bg, border:`1px solid ${c.color}25`,
              borderRadius:10, padding:'9px 10px', marginBottom:7, cursor:'pointer',
              transition:'all .15s',
            }}
            onClick={() => onJoin(e)}
            onMouseEnter={ev => ev.currentTarget.style.opacity='.85'}
            onMouseLeave={ev => ev.currentTarget.style.opacity='1'}
          >
            <p style={{fontSize:11,fontWeight:700,color:c.color,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{e.title}</p>
            <div style={{display:'flex',alignItems:'center',gap:4,marginTop:2}}>
              <IconLivestream size={10} color={C.gray400} />
              <span style={{fontSize:9,color:C.gray400}}>{e.liveUrl}</span>
            </div>
            <button className="btn"
              onClick={ev => { ev.stopPropagation(); onJoin(e) }}
              style={{
                marginTop:6, width:'100%', background:C.danger, color:'#fff',
                borderRadius:7, padding:'5px 0', fontSize:10, fontWeight:700,
                display:'flex', alignItems:'center', justifyContent:'center', gap:4,
              }}
            >
              <span className="live-dot">●</span> Unirse
            </button>
          </div>
        )
      })}
    </div>
  )
}

/* ── Today's agenda ── */
export function SidebarAgenda({ events, onOpen, onJoin }) {
  const today = TODAY.getDate()
  const now = new Date()
  const currentHour = now.getHours() + now.getMinutes() / 60

  const sorted = events
    .filter(e => e.day === today && !e.allDay)
    .sort((a,b) => a.startH - b.startH)

  const formatTime = (h) => {
    const hours = Math.floor(h)
    const mins = h % 1 === 0.5 ? '30' : '00'
    return `${String(hours).padStart(2,'0')}:${mins}`
  }

  return (
    <div style={{background:C.white, borderRadius:14, border:'1px solid #E2E8F0', padding:14, marginBottom:12}}>
      <p style={{fontSize:11, fontWeight:700, color:C.primary, marginBottom:10}}>Agenda de hoy</p>
      {sorted.length === 0 && (
        <p style={{fontSize:11, color:C.gray400, textAlign:'center', padding:'8px 0'}}>Sin eventos</p>
      )}
      {sorted.map(e => {
        const c = EVENT_CFG[e.type] || EVENT_CFG.reunion
        const hasStarted = currentHour >= e.startH
        const endH = e.endH || (e.startH + 1)
        const isOngoing = hasStarted && currentHour < endH

        return (
          <div key={e.id}
            onClick={() => onOpen(e)}
            style={{
              display:'flex', alignItems:'center', gap:8,
              padding:'6px 6px', borderRadius:8, cursor:'pointer',
              transition:'all .12s', marginBottom:4,
              background: isOngoing ? `${c.color}10` : 'transparent',
            }}
            onMouseEnter={ev => ev.currentTarget.style.background= isOngoing ? `${c.color}15` : '#F8FAFC'}
            onMouseLeave={ev => ev.currentTarget.style.background= isOngoing ? `${c.color}10` : 'transparent'}
          >
            <div style={{width:3, height:36, borderRadius:3, background:c.color, flexShrink:0}}/>
            <div style={{flex:1, minWidth:0}}>
              <p style={{fontSize:11,fontWeight:600,color:C.primary,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{e.title}</p>
              <p style={{fontSize:10,color:C.gray400}}>
                {formatTime(e.startH)} - {formatTime(endH)}
              </p>
            </div>
            {hasStarted && isOngoing && e.liveUrl && onJoin && (
              <button
                onClick={(ev) => { ev.stopPropagation(); onJoin(e) }}
                style={{
                  background:C.danger, color:'#fff', border:'none',
                  borderRadius:6, padding:'4px 8px', fontSize:9, fontWeight:600,
                  cursor:'pointer', flexShrink:0,
                }}
              >
                Unirse
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Layer toggle ── */
export function LayerToggle({ layers, toggle }) {
  return (
    <div style={{background:C.white, borderRadius:14, border:'1px solid #E2E8F0', padding:14}}>
      <p style={{fontSize:11, fontWeight:700, color:C.primary, marginBottom:10}}>⚙ Capas del calendario</p>
      {layers.map(l => {
        const c = EVENT_CFG[l.key]
        return (
          <div key={l.key}
            className="layer-row"
            onClick={() => toggle(l.key)}
            style={{
              display:'flex', alignItems:'center', gap:7,
              padding:'5px 5px', borderRadius:7, marginBottom:1,
            }}
          >
            <div style={{
              width:10, height:10, borderRadius:'50%',
              background: l.on ? c.color : '#CBD5E1',
              flexShrink:0, transition:'all .15s',
            }}/>
            <div style={{display:'flex',alignItems:'center',gap:6,flex:1}}>
              <EventIcon type={l.key} size={14} color={l.on ? c.color : C.gray400} />
              <span style={{
                fontSize:11, transition:'all .15s',
                color: l.on ? c.color : C.gray400,
              }}>{c.label}</span>
            </div>
            {/* Toggle switch */}
            <div style={{
              width:30, height:16, borderRadius:20,
              background: l.on ? C.accent : '#E2E8F0',
              position:'relative', transition:'all .2s', flexShrink:0,
            }}>
              <div style={{
                position:'absolute', top:2, width:12, height:12,
                borderRadius:'50%', background:'#fff',
                boxShadow:'0 1px 3px rgba(0,0,0,.2)',
                left: l.on ? 15 : 2, transition:'all .2s',
              }}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}
