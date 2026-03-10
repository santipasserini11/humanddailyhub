# 🗓 Humand Smart Calendar

> Employee Experience Platform · Daily Hub · Hackathon MVP 2026

---

## Stack

| Herramienta | Rol |
|---|---|
| **React + Vite** | Frontend |
| **Supabase** | Auth + Base de datos |
| **Vercel** | Hosting + Deploy |
| **GitHub** | Repositorio |

---

## Guía de deploy: 0 → URL pública en ~20 minutos

---

### PASO 1 — GitHub (5 min)

```bash
# 1. Creá un repo nuevo en github.com (nombre: humand-smart-calendar)
# 2. En tu máquina:

git init
git add .
git commit -m "feat: Humand Smart Calendar MVP"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/humand-smart-calendar.git
git push -u origin main
```

---

### PASO 2 — Supabase (7 min)

1. Ir a **https://supabase.com** → New project
2. Nombre: `humand-calendar` · Region: South America (São Paulo)
3. Esperar que cargue (~2 min)
4. Ir a **SQL Editor** → pegar y ejecutar el contenido de `supabase-setup.sql`
5. Ir a **Authentication → Users → Add user** y crear los 3 usuarios:
   - `colaborador@humand.demo` / `humand2026`
   - `manager@humand.demo` / `humand2026`
   - `hr@humand.demo` / `humand2026`
6. Ir a **Settings → API** → copiar:
   - `Project URL` → va a `VITE_SUPABASE_URL`
   - `anon public` key → va a `VITE_SUPABASE_ANON_KEY`

---

### PASO 3 — Vercel (5 min)

1. Ir a **https://vercel.com** → Add New Project
2. Importar el repo de GitHub (`humand-smart-calendar`)
3. Framework preset: **Vite** (se detecta automático)
4. En **Environment Variables** agregar:
   ```
   VITE_SUPABASE_URL       = https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY  = eyJhbGciOi...
   ```
5. Click **Deploy**
6. ✅ URL pública lista: `humand-smart-calendar.vercel.app`

---

### PASO 4 — Desarrollo local

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus claves de Supabase

# Correr en local
npm run dev
# → http://localhost:3000
```

---

## Usuarios demo

| Email | Password | Rol |
|---|---|---|
| `colaborador@humand.demo` | `humand2026` | Colaborador (Martina López) |
| `manager@humand.demo`     | `humand2026` | Manager (Diego Romero) |
| `hr@humand.demo`          | `humand2026` | RRHH (Ana Pérez) |

> **Sin Supabase configurado**: la app funciona igual en modo demo. Los botones de usuario demo hacen login sin backend.

---

## Estructura del proyecto

```
src/
├── components/
│   ├── auth/           LoginPage.jsx
│   ├── layout/         Sidebar, TopBar, Atoms
│   ├── hub/            DailyHub, AlertBar, HeroHub, UpCard, CultureCard, TeamGrid, CompanyPanel, Nudges
│   ├── calendar/       WeekView, MonthView
│   ├── sidebar/        SidebarWidgets (MiniCal, Lives, Agenda, LayerToggle)
│   └── modals/         EventDrawer, LiveModal, CreateModal
├── constants/
│   ├── tokens.js       Colores, tipos de evento, roles, nav
│   ├── data.js         Todos los eventos mock, datos de roles
│   └── utils.js        Helpers (fechas, strings)
├── hooks/
│   └── useAuth.jsx     Auth context con Supabase
├── lib/
│   └── supabase.js     Cliente de Supabase
├── App.jsx             Root component + auth gate
├── main.jsx            Entry point
└── index.css           Global styles + animaciones
```

---

## Features

- ✅ **Daily Hub** — Vista personalizada por rol (Colaborador / Manager / RRHH)
- ✅ **3 roles** — Cada uno ve alertas, stats y agenda diferente
- ✅ **Vista Semanal** — Grilla con hora actual en tiempo real
- ✅ **Vista Mensual** — Calendario mensual completo
- ✅ **12 tipos de eventos** — Con color coding y acciones contextuales
- ✅ **Humand Live** — Modal de videollamada con chat funcional
- ✅ **Creación de eventos** — Flujo por tipo y rol
- ✅ **Capas configurables** — Toggle por tipo de evento
- ✅ **Cultura** — Felicitar cumpleaños, reconocimientos
- ✅ **Alerta crítica** — Barra contextual por rol
- ✅ **Auth con Supabase** — 3 usuarios reales + modo demo sin backend
- ✅ **Deploy en Vercel** — Build automático con cada push

---

## Próximas features (post-hackathon)

- [ ] Persistencia de eventos en Supabase
- [ ] Notificaciones push reales
- [ ] Integración con módulo de vacaciones real
- [ ] Vista de configuración (festivos, horario, privacidad)
- [ ] Mobile responsive
