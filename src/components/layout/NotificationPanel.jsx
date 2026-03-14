import { useState } from 'react'
import { C } from '../../constants/tokens.js'
import { IconCapacitacion, IconOnboarding, IconNoticia, IconLivestream } from '../icons/HumandIcons.jsx'

// Icono de campana estilo Humand
export const IconBell = ({ size = 20, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

// Icono sobre/email
const IconEnvelope = ({ size = 18, color = C.primary }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 7L2 7" />
  </svg>
)

// Icono configuracion
const IconSettings = ({ size = 18, color = C.gray500 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-1.42 3.42 2 2 0 0 1-1.42-.59l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

// Icono grupos
const IconGrupos = ({ size = 18, color = C.gray500 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

// Datos de ejemplo de notificaciones
const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    type: 'grupo',
    title: 'Nuevo posteo en Celebramos Todos',
    description: 'Ana Martinez ha publicado',
    time: 'Hace 2 horas',
    source: 'Grupos',
    read: false,
  },
  {
    id: 2,
    type: 'capacitacion',
    title: 'Nueva capacitacion asignada',
    description: 'Comunicacion asertiva - Modulo 3',
    time: 'Hace 3 horas',
    source: 'Aprendizaje',
    read: false,
  },
  {
    id: 3,
    type: 'noticia',
    title: 'Nueva noticia institucional',
    description: 'Actualizacion de politicas Q2 2026',
    time: 'Hace 5 horas',
    source: 'Noticias',
    read: false,
  },
  {
    id: 4,
    type: 'grupo',
    title: 'Nuevo posteo en Novedades HR',
    description: 'Carlos Lopez ha publicado',
    time: 'Hace 9 horas',
    source: 'Grupos',
    read: true,
  },
  {
    id: 5,
    type: 'onboarding',
    title: 'Tarea pendiente',
    description: 'Completar legajo AFIP',
    time: 'Ayer',
    source: 'Onboarding',
    read: true,
  },
]

const getNotificationIcon = (type) => {
  switch (type) {
    case 'grupo': return IconGrupos
    case 'capacitacion': return IconCapacitacion
    case 'noticia': return IconNoticia
    case 'onboarding': return IconOnboarding
    case 'live': return IconLivestream
    default: return IconGrupos
  }
}

export default function NotificationPanel({ onClose }) {
  const [tab, setTab] = useState('todas')
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS)

  const filteredNotifications = tab === 'todas' 
    ? notifications 
    : notifications.filter(n => !n.read)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <>
      {/* Overlay */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
        }}
      />
      
      {/* Panel */}
      <div style={{
        position: 'absolute',
        top: 44,
        right: 0,
        width: 380,
        maxHeight: 520,
        background: C.white,
        borderRadius: 16,
        boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
        border: '1px solid #E2E8F0',
        zIndex: 100,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px 12px',
          borderBottom: '1px solid #E2E8F0',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: C.primary, margin: 0 }}>Notificaciones</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={markAllAsRead}
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  border: 'none', background: '#F1F5F9',
                  cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}
                title="Marcar todas como leidas"
              >
                <IconEnvelope size={16} color={C.primary} />
              </button>
              <button
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  border: 'none', background: '#F1F5F9',
                  cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}
                title="Configuracion"
              >
                <IconSettings size={16} color={C.gray500} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            background: '#F1F5F9',
            borderRadius: 10,
            padding: 4,
          }}>
            {[
              { id: 'todas', label: 'Todas' },
              { id: 'no_leidas', label: 'No leidas' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  flex: 1,
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: tab === t.id ? C.white : 'transparent',
                  color: tab === t.id ? C.primary : C.gray500,
                  fontWeight: tab === t.id ? 600 : 500,
                  fontSize: 13,
                  cursor: 'pointer',
                  boxShadow: tab === t.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s',
                }}
              >
                {t.label}
                {t.id === 'no_leidas' && unreadCount > 0 && (
                  <span style={{
                    marginLeft: 6,
                    background: C.danger,
                    color: '#fff',
                    borderRadius: 10,
                    padding: '2px 6px',
                    fontSize: 10,
                    fontWeight: 700,
                  }}>
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications list */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 0',
        }}>
          {filteredNotifications.length === 0 ? (
            <div style={{
              padding: 40,
              textAlign: 'center',
              color: C.gray400,
            }}>
              <p style={{ fontSize: 14 }}>No hay notificaciones</p>
            </div>
          ) : (
            filteredNotifications.map(n => {
              const IconComponent = getNotificationIcon(n.type)
              return (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  style={{
                    display: 'flex',
                    gap: 12,
                    padding: '12px 20px',
                    cursor: 'pointer',
                    background: n.read ? 'transparent' : `${C.accent}08`,
                    borderLeft: n.read ? '3px solid transparent' : `3px solid ${C.accent}`,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                  onMouseLeave={e => e.currentTarget.style.background = n.read ? 'transparent' : `${C.accent}08`}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: '#F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <IconComponent size={18} color={C.gray500} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: 13,
                      fontWeight: n.read ? 500 : 600,
                      color: C.primary,
                      margin: 0,
                      marginBottom: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {n.title}
                    </p>
                    <p style={{
                      fontSize: 12,
                      color: C.gray500,
                      margin: 0,
                      marginBottom: 4,
                    }}>
                      {n.description}
                    </p>
                    <p style={{
                      fontSize: 11,
                      color: C.accent,
                      margin: 0,
                      fontWeight: 500,
                    }}>
                      {n.time} · {n.source}
                    </p>
                  </div>
                  {!n.read && (
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: C.accent,
                      flexShrink: 0,
                      marginTop: 6,
                    }} />
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}
