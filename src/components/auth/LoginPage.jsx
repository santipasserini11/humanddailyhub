import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth.jsx'
import { C } from '../../constants/tokens.js'
import HumandLogo from '../layout/HumandLogo.jsx'

export default function LoginPage() {
  const { signIn } = useAuth()
  const [email,   setEmail]   = useState('')
  const [pass,    setPass]    = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [step,    setStep]    = useState(0) // 0=email, 1=password

  const handleContinue = async (e) => {
    e.preventDefault()
    if (step === 0) { setStep(1); return }

    setLoading(true)
    setError('')
    const { error } = await signIn(email, pass)
    if (error) setError('Usuario o contraseña incorrectos.')
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* ── LEFT — ilustración (lavanda, igual que humand.co) ── */}
      <div style={{
        flex: 1,
        background: '#E4E9FF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Círculo decorativo suave */}
        <div style={{position:'absolute',top:'-60px',right:'-60px',width:'320px',height:'320px',borderRadius:'50%',background:'rgba(73,107,227,.06)',pointerEvents:'none'}}/>
        <div style={{position:'absolute',bottom:'-80px',left:'-40px',width:'260px',height:'260px',borderRadius:'50%',background:'rgba(24,46,123,.04)',pointerEvents:'none'}}/>

        {/* Mockup del calendario */}
        <div style={{
          background:'#fff',
          borderRadius:20,
          boxShadow:'0 20px 60px rgba(24,46,123,.15)',
          width:'100%',
          maxWidth:440,
          overflow:'hidden',
          position:'relative',
          zIndex:1,
        }}>
          {/* Mockup topbar */}
          <div style={{background:C.primary,padding:'10px 16px',display:'flex',alignItems:'center',gap:10}}>
            <div style={{color:'#fff',fontFamily:'Comfortaa, sans-serif',fontWeight:700,fontSize:14}}>humand</div>
            <div style={{flex:1}}/>
            {['Daily Hub','Semana','Mes'].map(t => (
              <div key={t} style={{
                fontSize:10,color:'rgba(255,255,255,.6)',
                padding:'3px 8px',borderRadius:6,
                background: t==='Daily Hub' ? 'rgba(255,255,255,.2)' : 'transparent',
                fontWeight: t==='Daily Hub' ? 700 : 400,
              }}>{t}</div>
            ))}
          </div>

          {/* Mockup content */}
          <div style={{padding:'14px 16px',background:'#F8FAFF'}}>
            {/* Hero mini */}
            <div style={{
              background:`linear-gradient(135deg, ${C.primary}, ${C.accent})`,
              borderRadius:12, padding:'12px 14px', marginBottom:10,
              display:'flex', alignItems:'center', justifyContent:'space-between',
            }}>
              <div>
                <div style={{color:'rgba(255,255,255,.6)',fontSize:9,marginBottom:3}}>Buen día, Martina ✨</div>
                <div style={{color:'#fff',fontWeight:700,fontSize:12}}>Martes 10 de marzo · 2026</div>
              </div>
              <div style={{color:'#fff',fontWeight:700,fontSize:18}}>10:24</div>
            </div>

            {/* Stats row */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6,marginBottom:10}}>
              {[
                {icon:'🎥',val:2,label:'Reuniones'},
                {icon:'📚',val:1,label:'Cursos'},
                {icon:'✅',val:3,label:'Tareas'},
                {icon:'🎂',val:1,label:'Cumples'},
              ].map((s,i) => (
                <div key={i} style={{background:'#fff',borderRadius:8,padding:'8px 4px',textAlign:'center',border:'1px solid #E8EEFF'}}>
                  <div style={{fontSize:14}}>{s.icon}</div>
                  <div style={{fontWeight:800,fontSize:13,color:C.primary}}>{s.val}</div>
                  <div style={{fontSize:8,color:'#94A3B8',marginTop:1}}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Event cards mini */}
            {[
              {color:'#EEF2FF',border:C.accent,icon:'🎥',text:'Sync producto semanal',time:'10:00'},
              {color:'#D1FAE5',border:'#059669',icon:'📚',text:'Comunicación asertiva',time:'14:00'},
              {color:'#FCE7F3',border:'#DB2777',icon:'🎂',text:'Cumpleaños Juan López',time:'Hoy'},
            ].map((e,i) => (
              <div key={i} style={{
                background:e.color, border:`1px solid ${e.border}22`,
                borderRadius:8, padding:'7px 10px',
                display:'flex',alignItems:'center',gap:7,
                marginBottom:5,
              }}>
                <span style={{fontSize:12}}>{e.icon}</span>
                <span style={{flex:1,fontSize:10,fontWeight:600,color:'#334155'}}>{e.text}</span>
                <span style={{fontSize:9,color:'#94A3B8'}}>{e.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tagline debajo del mockup */}
        <p style={{
          marginTop:24, fontSize:13, color:'#6B7FCC',
          fontWeight:500, textAlign:'center', maxWidth:320,
          lineHeight:1.6, position:'relative', zIndex:1,
        }}>
          Organizá tu día laboral, conectá con tu equipo y no te perdas nada importante.
        </p>
      </div>

      {/* ── RIGHT — formulario (blanco, igual que humand.co) ── */}
      <div style={{
        width: 480,
        flexShrink: 0,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 56px',
        overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{marginBottom:40}}>
          <HumandLogo size="xl" dark />
        </div>

        {/* Título */}
        <h2 style={{
          fontSize:26, fontWeight:800,
          color:'#111827',
          lineHeight:1.25, marginBottom:8,
        }}>
          Inicia sesión en el<br/>Smart Calendar
        </h2>
        <p style={{fontSize:14, color:'#9CA3AF', marginBottom:36}}>
          Ingresá con tu cuenta de Humand
        </p>

        {/* Form */}
        <form onSubmit={handleContinue}>
          <div style={{marginBottom:16}}>
            <label style={{
              display:'block', fontSize:14, fontWeight:600,
              color:'#374151', marginBottom:7,
            }}>
              Usuario
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@empresa.com"
              autoFocus
              style={{
                width:'100%', padding:'13px 16px',
                border:'1.5px solid #E5E7EB',
                borderRadius:10, fontSize:14,
                color:'#111827', background:'#fff',
                boxSizing:'border-box',
                transition:'border-color .15s',
              }}
            />
          </div>

          {step === 1 && (
            <div style={{marginBottom:16, animation:'fadeUp .2s ease both'}}>
              <label style={{display:'block',fontSize:14,fontWeight:600,color:'#374151',marginBottom:7}}>
                Contraseña
              </label>
              <input
                type="password"
                value={pass}
                onChange={e => setPass(e.target.value)}
                placeholder="••••••••"
                autoFocus
                style={{
                  width:'100%', padding:'13px 16px',
                  border:'1.5px solid #E5E7EB',
                  borderRadius:10, fontSize:14,
                  color:'#111827', background:'#fff',
                  boxSizing:'border-box',
                }}
              />
            </div>
          )}

          {error && (
            <p style={{fontSize:13,color:'#DC2626',marginBottom:14,fontWeight:500}}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !email}
            style={{
              width:'100%', padding:'14px',
              background: C.accent,
              color:'#fff', border:'none',
              borderRadius:10, fontSize:15,
              fontWeight:700, cursor: email ? 'pointer' : 'not-allowed',
              opacity: (!email || loading) ? .5 : 1,
              fontFamily:"'DM Sans', sans-serif",
              transition:'all .15s',
            }}
            onMouseEnter={e => { if(email && !loading) e.currentTarget.style.background = C.primary }}
            onMouseLeave={e => { e.currentTarget.style.background = C.accent }}
          >
            {loading ? 'Ingresando...' : step === 0 ? 'Continuar' : 'Ingresar →'}
          </button>
        </form>

        {/* Separador */}
        <div style={{display:'flex',alignItems:'center',gap:12,margin:'28px 0'}}>
          <div style={{flex:1,height:1,background:'#F3F4F6'}}/>
          <span style={{fontSize:13,color:'#9CA3AF'}}>O inicia sesión con</span>
          <div style={{flex:1,height:1,background:'#F3F4F6'}}/>
        </div>

        {/* SSO buttons (decorativos) */}
        <div style={{display:'flex', gap:12}}>
          {[
            { label:'Microsoft', color:'#F3F4F6', icon:'🪟' },
            { label:'Google',    color:'#F3F4F6', icon:'G'  },
            { label:'Okta',      color:'#F3F4F6', icon:'⚙'  },
          ].map(s => (
            <button key={s.label}
              style={{
                flex:1, padding:'12px 8px',
                background:s.color, border:'1.5px solid #E5E7EB',
                borderRadius:10, cursor:'pointer',
                display:'flex', flexDirection:'column',
                alignItems:'center', gap:5,
                fontFamily:"'DM Sans', sans-serif",
                transition:'all .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor='#D1D5DB'}
              onMouseLeave={e => e.currentTarget.style.borderColor='#E5E7EB'}
            >
              <span style={{fontSize:18}}>{s.icon}</span>
              <span style={{fontSize:12,color:'#374151',fontWeight:500}}>{s.label}</span>
            </button>
          ))}
        </div>

        <p style={{textAlign:'center',fontSize:11,color:'#D1D5DB',marginTop:32}}>
          © 2026 Humand · Smart Calendar Hackathon
        </p>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @media (max-width: 768px) {
          div[data-login-left] { display: none !important; }
          div[data-login-right] { width: 100% !important; padding: 40px 28px !important; }
        }
      `}</style>
    </div>
  )
}
