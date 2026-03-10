-- ============================================================
-- Humand Smart Calendar — Supabase Setup
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Crear los 3 usuarios demo
-- (Hacelo desde Auth → Users → "Add user" o con este comando si tenés permisos)

-- OPCIÓN A: Crear usuarios desde el dashboard (recomendado)
-- Email: colaborador@humand.demo  |  Password: humand2026
-- Email: manager@humand.demo      |  Password: humand2026
-- Email: hr@humand.demo           |  Password: humand2026

-- OPCIÓN B: Con SQL (requiere service_role key)
-- SELECT auth.create_user('{"email":"colaborador@humand.demo","password":"humand2026"}');
-- SELECT auth.create_user('{"email":"manager@humand.demo","password":"humand2026"}');
-- SELECT auth.create_user('{"email":"hr@humand.demo","password":"humand2026"}');

-- ============================================================
-- 2. Tabla de eventos (opcional — para persistencia futura)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.events (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type        TEXT NOT NULL,
  title       TEXT NOT NULL,
  day         INT,
  start_h     FLOAT,
  end_h       FLOAT,
  all_day     BOOLEAN DEFAULT FALSE,
  description TEXT,
  live        BOOLEAN DEFAULT FALSE,
  live_url    TEXT,
  urgent      BOOLEAN DEFAULT FALSE,
  person      TEXT,
  private     BOOLEAN DEFAULT FALSE,
  participants TEXT[],
  progress    INT,
  task        BOOLEAN DEFAULT FALSE,
  created_by  UUID REFERENCES auth.users(id),
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Todos los usuarios autenticados pueden ver todos los eventos
CREATE POLICY "Events visible to authenticated users"
  ON public.events FOR SELECT
  TO authenticated
  USING (true);

-- Solo el creador puede insertar/editar/eliminar
CREATE POLICY "Users can insert their own events"
  ON public.events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own events"
  ON public.events FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- ============================================================
-- 3. Tabla de notificaciones (opcional)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.notifications (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID REFERENCES auth.users(id),
  title      TEXT NOT NULL,
  body       TEXT,
  type       TEXT,
  read       BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see their own notifications"
  ON public.notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
