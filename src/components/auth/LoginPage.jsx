import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth.jsx'
import { C } from '../../constants/tokens.js'

const DEMO_USERS = [
  {
    email:    'colaborador@humand.demo',
    password: 'humand2026',
    role:     'Colaborador',
    name:     'Martina López',
    dept:     'Producto',
    icon:     '👤',
    color:    C.accent,
  },
  {
    email:    'manager@humand.demo',
    password: 'humand2026',
    role:     'Manager',
    name:     'Diego Romero',
    dept:     'Líder de equipo',
    icon:     '👥',
    color:    C.success,
  },
  {
    email:    'hr@humand.demo',
    password: 'humand2026',
    role:     'RRHH',
    name:     'Ana Pérez',
    dept:     'People & Culture',
    icon:     '🏢',
    color:    C.violet,
  },
]

export default function LoginPage() {
  const { signIn, switchRole } = useAuth()
  const [email, setEmail]     = useState('')
  const [pass, setPass]       = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await signIn(email, pass)
    if (error) setError('Credenciales incorrectas.')
    setLoading(false)
  }

  const handleDemo = async (user) => {
    setLoading(true)
    setError('')
    const { error } = await signIn(user.email, user.password)
    if (error) {
      // Supabase not configured — enter demo mode directly
      switchRole(user.role.toLowerCase() === 'rrhh' ? 'hr' : user.role.toLowerCase())
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      background:`linear-gradient(135deg, ${C.primary} 0%, #243fa3 60%, ${C.accent} 100%)`,
      padding:'20px', fontFamily:"'DM Sans', sans-serif",
    }}>
      {/* Background decoration */}
      <div style={{position:'fixed',top:'-10%',right:'-5%',width:'500px',height:'500px',borderRadius:'50%',background:'rgba(255,255,255,.04)',pointerEvents:'none'}}/>
      <div style={{position:'fixed',bottom:'-15%',left:'-5%',width:'400px',height:'400px',borderRadius:'50%',background:'rgba(255,255,255,.03)',pointerEvents:'none'}}/>

      <div style={{width:'100%',maxWidth:440, animation:'fadeUp .4s ease both'}}>

        {/* Logo */}
        <div style={{textAlign:'center',marginBottom:36}}>
          <div style={{display:'inline-flex',alignItems:'center',justifyContent:'center',
            width:60,height:60,borderRadius:18,background:'rgba(255,255,255,.15)',
            backdropFilter:'blur(8px)',marginBottom:14,border:'1.5px solid rgba(255,255,255,.2)'}}>
            <span style={{fontFamily:"Comfortaa, sans-serif",fontWeight:700,fontSize:28,color:'#fff'}}>H</span>
          </div>
          <h1 style={{fontFamily:"Comfortaa, sans-serif",fontWeight:700,fontSize:26,color:'#fff',letterSpacing:'-0.5px'}}>
            Humand
          </h1>
          <p style={{color:'rgba(255,255,255,.6)',fontSize:13,marginTop:4,fontFamily:"'Playfair Display', serif",fontStyle:'italic'}}>
            Smart Calendar
          </p>
        </div>

        {/* Card */}
        <div style={{background:'rgba(255,255,255,.97)',borderRadius:24,padding:'32px 28px',
          boxShadow:'0 30px 80px rgba(0,0,0,.25)'}}>

          <h2 style={{fontSize:18,fontWeight:700,color:C.primary,marginBottom:6}}>Iniciar sesión</h2>
          <p style={{fontSize:12,color:C.gray400,marginBottom:24}}>Ingresá con tu cuenta o usá un usuario de demo</p>

          <form onSubmit={handleLogin}>
            <div style={{marginBottom:12}}>
              <label style={{display:'block',fontSize:11,fontWeight:700,color:C.gray500,marginBottom:5,textTransform:'uppercase',letterSpacing:'.05em'}}>Email</label>
              <input
                type="email" value={email} onChange={e=>setEmail(e.target.value)}
                placeholder="tu@empresa.com"
                style={{width:'100%',padding:'10px 14px',border:'1.5px solid #E2E8F0',borderRadius:10,
                  fontSize:13,color:C.gray700,background:'#FAFAFA'}}
              />
            </div>
            <div style={{marginBottom:16}}>
              <label style={{display:'block',fontSize:11,fontWeight:700,color:C.gray500,marginBottom:5,textTransform:'uppercase',letterSpacing:'.05em'}}>Contraseña</label>
              <input
                type="password" value={pass} onChange={e=>setPass(e.target.value)}
                placeholder="••••••••"
                style={{width:'100%',padding:'10px 14px',border:'1.5px solid #E2E8F0',borderRadius:10,
                  fontSize:13,color:C.gray700,background:'#FAFAFA'}}
              />
            </div>
            {error && <p style={{fontSize:12,color:C.danger,marginBottom:12,fontWeight:500}}>{error}</p>}
            <button type="submit" disabled={loading}
              style={{width:'100%',padding:'11px',background:C.primary,color:'#fff',
                border:'none',borderRadius:12,fontSize:13,fontWeight:700,cursor:'pointer',
                opacity:loading?.6:1,transition:'all .15s'}}>
              {loading ? 'Ingresando...' : 'Ingresar →'}
            </button>
          </form>

          {/* Divider */}
          <div style={{display:'flex',alignItems:'center',gap:10,margin:'20px 0'}}>
            <div style={{flex:1,height:1,background:'#E2E8F0'}}/>
            <span style={{fontSize:11,color:C.gray400,fontWeight:600}}>o ingresá como demo</span>
            <div style={{flex:1,height:1,background:'#E2E8F0'}}/>
          </div>

          {/* Demo cards */}
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {DEMO_USERS.map(u => (
              <button key={u.email} onClick={()=>handleDemo(u)} disabled={loading}
                className="card-hover"
                style={{display:'flex',alignItems:'center',gap:12,padding:'11px 14px',
                  border:`1.5px solid ${u.color}25`,borderRadius:12,background:'#FAFAFA',
                  cursor:'pointer',textAlign:'left',transition:'all .15s',width:'100%'}}>
                <div style={{width:38,height:38,borderRadius:12,background:u.color+'18',
                  display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>
                  {u.icon}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{fontSize:12,fontWeight:700,color:C.primary}}>{u.name}</p>
                  <p style={{fontSize:11,color:u.color,fontWeight:600}}>{u.role} · {u.dept}</p>
                </div>
                <span style={{fontSize:11,color:u.color,fontWeight:700}}>Entrar →</span>
              </button>
            ))}
          </div>

          <p style={{textAlign:'center',fontSize:10,color:C.gray400,marginTop:18,lineHeight:1.5}}>
            Contraseña demo: <code style={{background:'#F1F5F9',padding:'1px 5px',borderRadius:4}}>humand2026</code>
          </p>
        </div>

        <p style={{textAlign:'center',color:'rgba(255,255,255,.4)',fontSize:11,marginTop:20}}>
          Humand Smart Calendar · Hackathon MVP 2026
        </p>
      </div>

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}
