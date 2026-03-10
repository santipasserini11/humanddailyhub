import { C } from './tokens.js'

export const ALL_EVENTS = [
  // Turnos
  { id:1,  type:'turno',       title:'Turno laboral',              day:9,  startH:9,   endH:18, allDay:false, desc:'Horario regular · 09:00–18:00' },
  { id:2,  type:'turno',       title:'Turno laboral',              day:10, startH:9,   endH:18, allDay:false, desc:'Horario regular · 09:00–18:00' },
  { id:3,  type:'turno',       title:'Turno laboral',              day:11, startH:9,   endH:18, allDay:false },
  { id:4,  type:'turno',       title:'Turno laboral',              day:12, startH:9,   endH:18, allDay:false },
  { id:5,  type:'turno',       title:'Turno laboral',              day:13, startH:9,   endH:18, allDay:false },
  // Reuniones
  { id:10, type:'reunion',     title:'Sync producto semanal',      day:10, startH:10,  endH:11, allDay:false, live:true, liveUrl:'humand.live/sync-prod',   desc:'Review roadmap Q1 · Participantes: Diego R., Ana P., Carlos M.', participants:['Diego R.','Ana P.','Carlos M.','Martina L.'] },
  { id:11, type:'reunion',     title:'1:1 con Diego Romero',       day:12, startH:9,   endH:9.5,allDay:false, live:true, liveUrl:'humand.live/1on1-diego',  desc:'Check-in mensual con líder directo.', participants:['Diego R.','Martina L.'] },
  { id:12, type:'reunion',     title:'Retrospectiva sprint 22',    day:14, startH:10,  endH:11, allDay:false, live:true, liveUrl:'humand.live/retro-s22',   desc:'Cierre sprint 22 · Todo el equipo de producto.', participants:['Diego R.','Martina L.','Carlos M.','Lucía T.'] },
  { id:13, type:'reunion',     title:'Planning Q2',                day:13, startH:15,  endH:17, allDay:false, live:true, liveUrl:'humand.live/planning-q2', desc:'Planning de objetivos del segundo trimestre.', participants:['Diego R.','Ana P.'] },
  // Capacitaciones
  { id:20, type:'capacitacion',title:'Comunicación asertiva',      day:10, startH:14,  endH:15.5,allDay:false, desc:'Módulo 3 de 5 · Asignada por RRHH', progress:40 },
  { id:21, type:'capacitacion',title:'Excel avanzado',             day:13, startH:10,  endH:12, allDay:false, desc:'Herramientas de análisis de datos', progress:0 },
  { id:22, type:'capacitacion',title:'Liderazgo situacional',      day:11, startH:16,  endH:17, allDay:false, desc:'Módulo 1 de 4 · Para managers', progress:20 },
  // Evaluaciones
  { id:30, type:'evaluacion',  title:'Cierra evaluación 360°',     day:12, startH:0,   endH:0,  allDay:true,  urgent:true, desc:'Fecha límite para completar la evaluación de desempeño Q4. Faltan 3 personas por evaluar.' },
  { id:31, type:'evaluacion',  title:'Apertura encuesta de clima', day:11, startH:0,   endH:0,  allDay:true,  desc:'Encuesta de clima organizacional · 5 minutos.' },
  // Cumpleaños / Aniversarios
  { id:40, type:'cumpleanos',  title:'🎂 Juan López',              day:10, startH:0,   endH:0,  allDay:true,  person:'Juan López',  desc:'Juan cumple 32 años hoy 🎂' },
  { id:41, type:'aniversario', title:'🏆 3 años · Ana Pérez',      day:13, startH:0,   endH:0,  allDay:true,  person:'Ana Pérez',   desc:'Ana cumple 3 años en la empresa hoy 🏆' },
  { id:42, type:'cumpleanos',  title:'🎂 Laura Gómez',             day:12, startH:0,   endH:0,  allDay:true,  person:'Laura Gómez', desc:'Laura cumple 28 años hoy 🎂' },
  { id:43, type:'aniversario', title:'🏆 5 años · Carlos Méndez',  day:11, startH:0,   endH:0,  allDay:true,  person:'Carlos Méndez', desc:'Carlos cumple 5 años en Humand 🏆' },
  // Objetivos
  { id:50, type:'objetivo',    title:'Cierre ciclo OKR Q1',        day:13, startH:0,   endH:0,  allDay:true,  desc:'Recordatorio: actualizar estado de todos los objetivos del ciclo Q1.' },
  { id:51, type:'objetivo',    title:'Apertura OKR Q2',            day:15, startH:0,   endH:0,  allDay:true,  desc:'Inicio del ciclo de objetivos Q2 2026.' },
  // Onboarding
  { id:60, type:'onboarding',  title:'Completar legajo AFIP',      day:10, startH:16,  endH:17, allDay:false, task:true, desc:'Subir documentación personal al portal.' },
  { id:61, type:'onboarding',  title:'Reunión bienvenida al equipo',day:11,startH:11,  endH:12, allDay:false, live:true, liveUrl:'humand.live/bienvenida', desc:'Conocé a tu equipo en la primera sesión de integración.' },
  // Vacaciones equipo
  { id:70, type:'vacacion',    title:'Carlos M. — Vacaciones',     day:11, startH:0,   endH:0,  allDay:true,  person:'Carlos Méndez', desc:'Licencia vacacional aprobada.' },
  { id:71, type:'vacacion',    title:'Sofía R. — Ausente',         day:11, startH:0,   endH:0,  allDay:true,  person:'Sofía Romero',  private:true, desc:'Ausencia registrada.' },
  { id:72, type:'vacacion',    title:'Carlos M. — Vacaciones',     day:12, startH:0,   endH:0,  allDay:true,  person:'Carlos Méndez' },
  { id:73, type:'vacacion',    title:'Valeria G. — Lic. médica',   day:13, startH:0,   endH:0,  allDay:true,  person:'Valeria García', desc:'Licencia médica aprobada.' },
  // Festivos
  { id:80, type:'festivo',     title:'Día Nacional del Trabajo',   day:14, startH:0,   endH:0,  allDay:true,  desc:'Festivo nacional · Argentina 🇦🇷' },
  // Noticias
  { id:90, type:'noticia',     title:'📢 Lanzamiento v3.0',        day:11, startH:11,  endH:12, allDay:false, live:true, liveUrl:'humand.live/launch-v3', desc:'All-hands: presentación del nuevo lanzamiento de producto.' },
  // Livestream
  { id:100,type:'livestream',  title:'CEO Town Hall Q1',           day:12, startH:15,  endH:16, allDay:false, live:true, liveUrl:'humand.live/townhall-q1', desc:'Sesión en vivo con el CEO. Preguntas abiertas al final.', participants:['Toda la empresa · 142 personas'] },
]

export const TEAM_MEMBERS = [
  { name:'Martina L.',  avatar:'ML', status:'active',  turno:'09–18',       dept:'Producto' },
  { name:'Carlos M.',   avatar:'CM', status:'absent',  turno:'Vacaciones',  dept:'Producto' },
  { name:'Sofía R.',    avatar:'SR', status:'pending', turno:'Pend. aprobación', dept:'Diseño' },
  { name:'Lucía T.',    avatar:'LT', status:'active',  turno:'09–18',       dept:'Producto' },
  { name:'Andrés P.',   avatar:'AP', status:'active',  turno:'12–21',       dept:'Tech' },
  { name:'Valeria G.',  avatar:'VG', status:'absent',  turno:'Lic. médica', dept:'Tech' },
  { name:'Pedro F.',    avatar:'PF', status:'active',  turno:'09–18',       dept:'Marketing' },
  { name:'Camila S.',   avatar:'CS', status:'active',  turno:'10–19',       dept:'Diseño' },
  { name:'Tomás R.',    avatar:'TR', status:'active',  turno:'09–18',       dept:'Tech' },
]

export const COMPANY_STATS = [
  { label:'Activos hoy',          val:'138', sub:'↑ 3 vs ayer',                   color:C.success },
  { label:'Ausencias',            val:'12',  sub:'4 aprobadas · 3 pendientes',     color:C.warn },
  { label:'En onboarding',        val:'4',   sub:'Pedro F., Camila S. +2',         color:C.cyan },
  { label:'Evaluac. abiertas',    val:'2',   sub:'360° y Clima · cierra 12/03',    color:C.violet },
  { label:'Solicitudes pendientes',val:'7',  sub:'Licencias · Trámites',           color:C.orange },
  { label:'Festivos del mes',     val:'1',   sub:'Viernes 14 · Día del Trabajo',   color:'#94A3B8' },
]

export const ROLE_DATA = {
  colaborador: {
    alert: {
      text:'Cierra en 2 días: Evaluación 360°',
      sub:'Faltan 3 personas por evaluar',
      cta:'Completar ahora',
      color:C.violet, bg:'#EDE9FE',
    },
    stats:[
      { icon:'🎥', label:'Reuniones',  val:2, color:C.accent },
      { icon:'📚', label:'Capacitac.', val:1, color:C.success },
      { icon:'✅', label:'Tareas',     val:3, color:C.warn },
      { icon:'🎂', label:'Cumples',    val:1, color:C.pink },
    ],
    upcoming: [10,20,60],
    nudges:[
      { icon:'🎯', text:'Tenés 1 objetivo sin actualizar esta semana.',            color:C.warn },
      { icon:'📊', text:'Abrió la encuesta de clima organizacional · 5 min.',      color:C.violet },
      { icon:'📚', text:'Tenés una capacitación asignada que no iniciaste aún.',    color:C.success },
    ],
  },
  manager: {
    alert: {
      text:'3 solicitudes de ausencia pendientes de aprobación',
      sub:'Lucía M., Carlos T., Sofía R. esperan respuesta',
      cta:'Aprobar',
      color:C.warn, bg:'#FEF3C7',
    },
    stats:[
      { icon:'👥', label:'En oficina',  val:9,  color:C.success },
      { icon:'🏖️', label:'Ausentes',    val:3,  color:C.warn },
      { icon:'📊', label:'Eval. pend.', val:4,  color:C.violet },
      { icon:'✅', label:'Tasks',       val:7,  color:C.accent },
    ],
    upcoming: [10,30,12],
    nudges:[
      { icon:'🎯', text:'2 colaboradores sin objetivos cargados para Q1.',          color:C.warn },
      { icon:'🏆', text:'Ana Pérez cumple 3 años en la empresa mañana.',             color:C.orange },
      { icon:'📊', text:'Quedan 4 evaluaciones pendientes de tu equipo.',            color:C.violet },
    ],
  },
  hr: {
    alert: {
      text:'Apertura OKR Q2 · faltan 5 días',
      sub:'48 colaboradores sin objetivos del ciclo anterior cerrados',
      cta:'Ver reporte',
      color:C.primary, bg:'#EEF2FF',
    },
    stats:[
      { icon:'👥', label:'Activos',    val:138, color:C.success },
      { icon:'🏖️', label:'Ausencias',  val:12,  color:C.warn },
      { icon:'🚀', label:'Onboarding', val:4,   color:C.cyan },
      { icon:'📊', label:'Eval. abier.',val:2,  color:C.violet },
    ],
    upcoming: [100,90,61],
    nudges:[
      { icon:'📡', text:'Town Hall hoy a las 15:00 · Recordatorio enviado a 138 personas.', color:C.danger },
      { icon:'🎂', text:'3 cumpleaños esta semana · Notificaciones automáticas activas.',     color:C.pink },
      { icon:'📋', text:'7 solicitudes de trámites sin resolver esta semana.',                color:C.warn },
    ],
  },
}
