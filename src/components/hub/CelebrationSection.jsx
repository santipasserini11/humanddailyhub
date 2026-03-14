import { useState } from 'react'
import { C, EVENT_CFG } from '../../constants/tokens.js'
import { EventIcon } from '../icons/HumandIcons.jsx'

export default function CelebrationSection({ events, onOpen, onToast }) {
  const [sentIds, setSentIds] = useState(new Set())

  // Separar cumpleanos y aniversarios
  const cumpleanos = events.filter(e => e.type === 'cumpleanos')
  const aniversarios = events.filter(e => e.type === 'aniversario')

  const handleFelicitar = (event) => {
    setSentIds(prev => new Set([...prev, event.id]))
    const name = event.person?.split(' ')[0] || 'tu companero'
    if (onToast) {
      if (event.type === 'cumpleanos') {
        onToast(`Felicitacion enviada a ${name}!`, null, C.pink)
      } else {
        onToast(`Felicitaste el logro de ${name}!`, null, C.orange)
      }
    }
  }

  const handleFelicitarTodos = (type) => {
    const items = type === 'cumpleanos' ? cumpleanos : aniversarios
    items.forEach(e => {
      if (!sentIds.has(e.id)) {
        setSentIds(prev => new Set([...prev, e.id]))
      }
    })
    if (onToast) {
      if (type === 'cumpleanos') {
        onToast(`Felicitaciones enviadas a ${items.length} personas!`, null, C.pink)
      } else {
        onToast(`Felicitaciones enviadas a ${items.length} personas!`, null, C.orange)
      }
    }
  }

  // Renderizar grupo de celebraciones
  const renderGroup = (items, type) => {
    if (items.length === 0) return null
    
    const c = EVENT_CFG[type]
    const allSent = items.every(e => sentIds.has(e.id))
    const pendingCount = items.filter(e => !sentIds.has(e.id)).length

    // Si hay 3 o mas, mostrar compacto
    if (items.length >= 3) {
      return (
        <div 
          key={type}
          style={{
            background: c.bg,
            border: `1.5px solid ${c.color}30`,
            borderRadius: 12,
            padding: '14px 16px',
            marginBottom: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <EventIcon type={type} size={18} color={c.color} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: c.color, margin: 0 }}>
                  {type === 'cumpleanos' ? `${items.length} cumpleanos hoy` : `${items.length} aniversarios hoy`}
                </p>
                <p style={{ fontSize: 11, color: C.gray500, margin: 0 }}>
                  {type === 'cumpleanos' ? 'Celebra a tus companeros' : 'Felicita sus logros'}
                </p>
              </div>
            </div>
            {!allSent ? (
              <button
                onClick={() => handleFelicitarTodos(type)}
                className="btn"
                style={{
                  background: c.color, color: '#fff', border: 'none',
                  borderRadius: 8, padding: '8px 14px', fontSize: 11, fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Felicitar a todos
              </button>
            ) : (
              <span style={{
                fontSize: 11, fontWeight: 600,
                background: '#D1FAE5', color: C.success,
                padding: '6px 12px', borderRadius: 8,
              }}>
                Enviado
              </span>
            )}
          </div>
          
          {/* Lista de personas */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {items.map(e => {
              const sent = sentIds.has(e.id)
              const firstName = e.person?.split(' ')[0] || e.title
              return (
                <div
                  key={e.id}
                  onClick={() => !sent && handleFelicitar(e)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: sent ? '#D1FAE5' : '#fff',
                    border: `1px solid ${sent ? C.success : c.color}30`,
                    borderRadius: 20, padding: '5px 10px',
                    cursor: sent ? 'default' : 'pointer',
                    transition: 'all .15s',
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 500, color: sent ? C.success : C.gray700 }}>
                    {firstName}
                  </span>
                  {sent && <span style={{ fontSize: 10, color: C.success }}>✓</span>}
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    // Si hay 1 o 2, mostrar tarjetas individuales
    return items.map(event => {
      const sent = sentIds.has(event.id)
      return (
        <div
          key={event.id}
          className="anim-up1"
          style={{
            background: c.bg,
            border: `1.5px solid ${c.color}30`,
            borderRadius: 12,
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 8,
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <EventIcon type={event.type} size={18} color={c.color} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: c.color, margin: 0 }}>{event.person || event.title}</p>
            <p style={{ fontSize: 11, color: C.gray500, marginTop: 2 }}>{event.desc}</p>
          </div>

          {!sent ? (
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <button
                onClick={() => handleFelicitar(event)}
                className="btn"
                style={{
                  background: c.color, color: '#fff', border: 'none',
                  borderRadius: 8, padding: '6px 12px', fontSize: 11, fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Felicitar
              </button>
              <button
                onClick={() => onOpen(event)}
                className="btn"
                style={{
                  background: '#fff', color: C.gray500, border: `1px solid ${C.gray200}`,
                  borderRadius: 8, padding: '6px 10px', fontSize: 11, fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Ver
              </button>
            </div>
          ) : (
            <span style={{
              fontSize: 11, fontWeight: 600,
              background: '#D1FAE5', color: C.success,
              padding: '6px 12px', borderRadius: 8, flexShrink: 0,
            }}>
              Enviado
            </span>
          )}
        </div>
      )
    })
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, color: C.gray900, marginBottom: 12 }}>
        Celebraciones del equipo
      </h2>
      {renderGroup(cumpleanos, 'cumpleanos')}
      {renderGroup(aniversarios, 'aniversario')}
    </div>
  )
}
