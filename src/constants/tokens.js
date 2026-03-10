export const C = {
  primary:      '#182E7B',
  accent:       '#496BE3',
  accentLight:  '#EEF2FF',
  bg:           '#F1F5F9',
  white:        '#FFFFFF',
  success:      '#059669',
  warn:         '#D97706',
  danger:       '#DC2626',
  pink:         '#DB2777',
  violet:       '#7C3AED',
  cyan:         '#0891B2',
  orange:       '#EA580C',
  slate:        '#475569',
  gray50:       '#F8FAFC',
  gray100:      '#F1F5F9',
  gray200:      '#E2E8F0',
  gray400:      '#94A3B8',
  gray500:      '#64748B',
  gray700:      '#334155',
}

export const EVENT_CFG = {
  reunion:      { label:'Reunión',       color:C.accent,   bg:'#EEF2FF', icon:'🎥' },
  turno:        { label:'Turno',         color:C.slate,    bg:'#F1F5F9', icon:'🕘' },
  vacacion:     { label:'Ausencia',      color:C.warn,     bg:'#FEF3C7', icon:'🏖️' },
  festivo:      { label:'Festivo',       color:'#94A3B8',  bg:'#E2E8F0', icon:'📅' },
  cumpleanos:   { label:'Cumpleaños',    color:C.pink,     bg:'#FCE7F3', icon:'🎂' },
  aniversario:  { label:'Aniversario',   color:C.orange,   bg:'#FFEDD5', icon:'🏆' },
  evaluacion:   { label:'Evaluación',    color:C.violet,   bg:'#EDE9FE', icon:'📊' },
  capacitacion: { label:'Capacitación',  color:C.success,  bg:'#D1FAE5', icon:'📚' },
  objetivo:     { label:'Objetivo',      color:C.warn,     bg:'#FEF3C7', icon:'🎯' },
  onboarding:   { label:'Onboarding',    color:C.cyan,     bg:'#CFFAFE', icon:'🚀' },
  noticia:      { label:'Noticia',       color:C.primary,  bg:'#EEF2FF', icon:'📢' },
  livestream:   { label:'Live',          color:C.danger,   bg:'#FEE2E2', icon:'📡' },
}

export const ROLES = [
  { id:'colaborador', label:'Colaborador', icon:'👤', name:'Martina López',  dept:'Producto' },
  { id:'manager',     label:'Manager',     icon:'👥', name:'Diego Romero',   dept:'Líder de equipo' },
  { id:'hr',          label:'RRHH',        icon:'🏢', name:'Ana Pérez',      dept:'People & Culture' },
]

export const WEEK_DAYS = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom']
export const HOURS = Array.from({ length:15 }, (_,i) => i + 7)
export const TODAY = new Date(2026,2,10)

export const NAV_ITEMS = [
  { icon:'◻', label:'Muro' },
  { icon:'📰', label:'Noticias' },
  { icon:'💬', label:'Chats' },
  { icon:'⭐', label:'Reconocim.' },
  { icon:'📅', label:'Calendario', active:true },
  { icon:'📋', label:'Formularios' },
  { icon:'👥', label:'Personas' },
  { icon:'📊', label:'Desempeño' },
  { icon:'🎯', label:'Objetivos' },
  { icon:'📚', label:'Capacitac.' },
  { icon:'🗂', label:'Archivos' },
]
