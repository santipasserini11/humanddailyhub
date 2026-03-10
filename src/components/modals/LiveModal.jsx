import { useState } from 'react'
import { C } from '../../constants/tokens.js'

const FAKE_PARTICIPANTS = ['Diego R.','Ana P.','Carlos M.','Lucía T.','Andrés P.','Tú']

export default function LiveModal({ event, onClose }) {
  const [joined,  setJoined]  = useState(false)
  const [joining, setJoining] = useState(false)
  const [chat,    setChat]    = useState([
    { user:'Diego R.',  msg:'¡Arrancamos en 2 minutos! 🚀',        time:'09:58' },
    { user:'Ana P.',    msg:'Listos por acá 👋',                    time:'09:59' },
    { user:'Carlos M.', msg:'Conectado desde Córdoba 🎉',           time:'10:00' },
    { user:'Sistema',   msg:'La sesión comenzó. Bienvenidos.',      time:'10:00' },
  ])
  const [msg,     setMsg]     = useState('')
  const [muted,   setMuted]   = useState(true)
  const [camOn,   setCamOn]   = useState(false)
  const viewers = 8 + Math.floor(Math.random()*20)

  if (!event) return null

  const handleJoin = () => {
    setJoining(true)
    setTimeout(() => { setJoining(false); setJoined(true) }, 1600)
  }

  const sendMsg = () => {
    if (!msg.trim()) return
    const now = new Date()
    setChat(c => [...c, {
      user: 'Tú',
      msg,
      time: `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`,
    }])
    setMsg('')
  }

  return (
    <div
      style={{
        position:'fixed', inset:0, zIndex:70,
        display:'flex', alignItems:'flex-end', justifyContent:'center',
        background:'rgba(5,10,30,.88)', backdropFilter:'blur(8px)',
      }}
      onClick={!joined ? onClose : undefined}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="anim-up"
        style={{
          width:'100%', maxWidth:500,
          borderRadius:'28px 28px 0 0',
          overflow:'hidden',
          boxShadow:'0 -20px 60px rgba(0,0,0,.4)',
          maxHeight:'92vh',
          display:'flex', flexDirection:'column',
        }}
      >
        {/* Video area */}
        <div style={{
          background:'#060D1F', padding:'20px 20px 14px',
          position:'relative', minHeight:220,
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        }}>
          {/* Grid overlay */}
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:'linear-gradient(rgba(73,107,227,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(73,107,227,.07) 1px,transparent 1px)',
            backgroundSize:'32px 32px', pointerEvents:'none',
          }}/>

          {/* Top badges */}
          <div style={{position:'absolute',top:14,left:16,display:'flex',alignItems:'center',gap:8,zIndex:2}}>
            <div style={{display:'flex',alignItems:'center',gap:5,background:'rgba(220,38,38,.9)',padding:'4px 10px',borderRadius:20}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'#fff',display:'inline-block'}} className="live-dot"/>
              <span style={{color:'#fff',fontSize:11,fontWeight:800}}>EN VIVO</span>
            </div>
            <div style={{background:'rgba(0,0,0,.5)',padding:'4px 10px',borderRadius:20,display:'flex',alignItems:'center',gap:4}}>
              <span style={{fontSize:12}}>👁</span>
              <span style={{color:'#fff',fontSize:11,fontWeight:600}}>{viewers} personas</span>
            </div>
          </div>

          {/* Close */}
          <div style={{position:'absolute',top:14,right:16,zIndex:2}}>
            <button onClick={onClose} style={{width:28,height:28,borderRadius:8,border:'none',background:'rgba(255,255,255,.1)',cursor:'pointer',fontSize:14,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>×</button>
          </div>

          {/* Pre-join state */}
          {!joined && !joining && (
            <div style={{textAlign:'center', position:'relative', zIndex:2}}>
              <div style={{width:72,height:72,borderRadius:20,background:'rgba(220,38,38,.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:34,margin:'0 auto 12px'}} className="live-dot">📡</div>
              <h3 style={{color:'#fff',fontSize:16,fontWeight:700,marginBottom:5,fontFamily:"'Playfair Display', serif"}}>{event.title}</h3>
              <p style={{color:'#94A3B8',fontSize:12,marginBottom:18}}>{event.liveUrl}</p>
              <button onClick={handleJoin} className="btn"
                style={{background:C.danger,color:'#fff',borderRadius:12,padding:'12px 36px',fontSize:14,fontWeight:700}}>
                ▶ Unirse ahora
              </button>
            </div>
          )}

          {/* Joining spinner */}
          {joining && (
            <div style={{textAlign:'center',zIndex:2,position:'relative'}}>
              <div className="spin" style={{width:40,height:40,borderRadius:'50%',border:'3px solid rgba(73,107,227,.3)',borderTopColor:C.accent,margin:'0 auto 12px'}}/>
              <p style={{color:'#93C5FD',fontSize:13}}>Conectando a Humand Live...</p>
            </div>
          )}

          {/* Joined — participant grid */}
          {joined && (
            <div style={{width:'100%',position:'relative',zIndex:2}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6}}>
                {FAKE_PARTICIPANTS.map((name,i) => (
                  <div key={i} style={{
                    background:`hsl(${220+i*15},50%,${14+i*2}%)`,
                    borderRadius:10, padding:'12px 8px', textAlign:'center',
                    border: name==='Tú' ? `2px solid ${C.accent}` : '2px solid transparent',
                  }}>
                    <div style={{
                      width:32, height:32, borderRadius:'50%',
                      background: name==='Tú' ? C.accent : `hsl(${210+i*20},60%,50%)`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:'#fff', fontSize:11, fontWeight:700, margin:'0 auto 5px',
                    }}>
                      {name.slice(0,2)}
                    </div>
                    <p style={{color:'#fff',fontSize:9,fontWeight:600}}>{name}</p>
                    <span style={{fontSize:13}}>{i%3===0?'🎤':'🔇'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Chat (visible after join) */}
        {joined && (
          <div style={{background:'#0D1530', flex:1, display:'flex', flexDirection:'column', minHeight:0, maxHeight:200}}>
            <div style={{flex:1,overflowY:'auto',padding:'10px 14px',display:'flex',flexDirection:'column',gap:5}}>
              {chat.map((m,i) => (
                <div key={i} style={{display:'flex',gap:7,alignItems:'flex-start'}}>
                  <div style={{
                    width:22, height:22, borderRadius:'50%',
                    background: m.user==='Tú' ? C.accent : m.user==='Sistema' ? '#334155' : '#1E2D5A',
                    flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
                    color:'#fff', fontSize:9, fontWeight:700,
                  }}>{m.user.slice(0,2)}</div>
                  <div>
                    <span style={{fontSize:9,color:C.accent,fontWeight:700}}>{m.user} </span>
                    <span style={{fontSize:9,color:'#475569'}}>{m.time}</span>
                    <p style={{fontSize:11,color:'#CBD5E1',marginTop:1,lineHeight:1.4}}>{m.msg}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Input */}
            <div style={{padding:'8px 12px',borderTop:'1px solid rgba(255,255,255,.06)',display:'flex',gap:6}}>
              <input
                value={msg}
                onChange={e => setMsg(e.target.value)}
                onKeyDown={e => e.key==='Enter' && sendMsg()}
                placeholder="Escribir en el chat..."
                style={{
                  flex:1, background:'rgba(255,255,255,.07)',
                  border:'1px solid rgba(255,255,255,.1)',
                  borderRadius:10, padding:'7px 11px',
                  color:'#fff', fontSize:12,
                }}
              />
              <button onClick={sendMsg} className="btn"
                style={{background:C.accent,color:'#fff',borderRadius:10,padding:'7px 13px',fontSize:12,fontWeight:700}}>
                →
              </button>
            </div>
          </div>
        )}

        {/* Controls */}
        {joined && (
          <div style={{background:'#060D1F',padding:'10px 16px',display:'flex',justifyContent:'center',gap:8}}>
            {[
              { icon: muted ? '🔇':'🎤',  label: muted?'Activar':'Silenciar', action:()=>setMuted(m=>!m) },
              { icon: camOn ? '📷':'📷',  label: camOn?'Apagar':'Cámara',     action:()=>setCamOn(c=>!c) },
              { icon:'🖥',  label:'Pantalla', action:()=>{} },
              { icon:'✋', label:'Mano',     action:()=>{} },
            ].map(b => (
              <button key={b.label} onClick={b.action}
                style={{
                  display:'flex', flexDirection:'column', alignItems:'center', gap:3,
                  background:'rgba(255,255,255,.08)', border:'none', borderRadius:12,
                  padding:'7px 12px', cursor:'pointer', transition:'all .15s', fontFamily:"'DM Sans',sans-serif",
                }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.15)'}
                onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.08)'}
              >
                <span style={{fontSize:16}}>{b.icon}</span>
                <span style={{fontSize:9,color:'#94A3B8',fontWeight:600}}>{b.label}</span>
              </button>
            ))}
            <button onClick={onClose}
              style={{
                background:C.danger, border:'none', borderRadius:12,
                padding:'7px 18px', cursor:'pointer', color:'#fff',
                fontSize:12, fontWeight:700, fontFamily:"'DM Sans',sans-serif",
              }}>
              Salir
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
