import { useState, useEffect } from 'react'
import { C } from '../../constants/tokens.js'

/* Aparece la primera vez que el usuario entra, apunta al role switcher */
export default function RoleTooltip() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Mostrar solo si es la primera visita de esta sesión
    if (!sessionStorage.getItem('role_tip_seen')) {
      const t = setTimeout(() => setShow(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  if (!show) return null

  const dismiss = () => {
    sessionStorage.setItem('role_tip_seen', '1')
    setShow(false)
  }

  return (
    <>
      {/* Overlay semitransparente */}
      <div
        onClick={dismiss}
        style={{
          position: 'fixed', inset: 0, zIndex: 90,
          background: 'rgba(0,0,0,.35)',
          backdropFilter: 'blur(2px)',
          animation: 'fadeIn .25s ease',
        }}
      />

      {/* Tooltip bubble apuntando al role switcher (top right) */}
      <div style={{
        position: 'fixed',
        top: 66,
        right: 80,
        zIndex: 91,
        background: C.white,
        borderRadius: 16,
        padding: '20px 22px',
        boxShadow: '0 12px 40px rgba(0,0,0,.2)',
        maxWidth: 290,
        border: `2px solid ${C.accent}30`,
        animation: 'fadeUp .3s ease both',
      }}>
        {/* Arrow */}
        <div style={{
          position: 'absolute',
          top: -8, right: 80,
          width: 16, height: 16,
          background: C.white,
          border: `2px solid ${C.accent}30`,
          borderBottom: 'none', borderRight: 'none',
          transform: 'rotate(45deg)',
        }}/>

        <div style={{display:'flex',alignItems:'flex-start',gap:10,marginBottom:12}}>
          <span style={{fontSize:22}}>👆</span>
          <div>
            <p style={{fontSize:14,fontWeight:800,color:C.primary,marginBottom:4}}>
              Cambiá de rol para ver el calendario
            </p>
            <p style={{fontSize:12,color:'#64748B',lineHeight:1.5}}>
              Con el selector de arriba podés ver la experiencia de un <strong>Colaborador</strong>, un <strong>Manager</strong> o un usuario de <strong>RRHH</strong>. Cada uno ve su propio Daily Hub.
            </p>
          </div>
        </div>

        <button
          onClick={dismiss}
          style={{
            width: '100%',
            padding: '9px',
            background: C.accent,
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ¡Entendido! →
        </button>
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </>
  )
}
