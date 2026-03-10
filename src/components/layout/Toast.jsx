import { useEffect, useState } from 'react'
import { C } from '../../constants/tokens.js'

/* Uso: <Toast message="..." emoji="🎉" onDone={()=>setToast(null)} /> */
export default function Toast({ message, emoji = '✅', color = C.success, onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 300)
    }, 3200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      bottom: 28,
      left: '50%',
      transform: `translateX(-50%) translateY(${visible ? 0 : 16}px)`,
      opacity: visible ? 1 : 0,
      transition: 'all .28s ease',
      zIndex: 200,
      background: '#fff',
      border: `1.5px solid ${color}30`,
      borderRadius: 14,
      padding: '12px 20px',
      boxShadow: `0 8px 32px rgba(0,0,0,.14)`,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      minWidth: 260,
      maxWidth: 400,
      pointerEvents: 'none',
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10,
        background: color + '18',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, flexShrink: 0,
      }}>
        {emoji}
      </div>
      <p style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', lineHeight: 1.4 }}>
        {message}
      </p>
      <div style={{
        marginLeft: 'auto', width: 4, height: 34,
        background: color, borderRadius: 4, flexShrink: 0,
      }}/>
    </div>
  )
}
