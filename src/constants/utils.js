import { TODAY } from './tokens.js'

export function getWeekDates(offset = 0) {
  const d = new Date(TODAY)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff + offset * 7)
  return Array.from({ length: 7 }, (_, i) => {
    const dd = new Date(d)
    dd.setDate(d.getDate() + i)
    return dd
  })
}

export function fmt(d) {
  return d.toLocaleDateString('es-AR', { day:'2-digit', month:'short' }).replace('.','')
}

export function sameDay(a, b) {
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth()
}

export function timeStr(h) {
  const hh = String(Math.floor(h)).padStart(2, '0')
  const mm = h % 1 === 0.5 ? '30' : '00'
  return `${hh}:${mm}`
}

export function initials(name = '') {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}
