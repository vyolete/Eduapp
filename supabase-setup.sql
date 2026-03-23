-- ═══════════════════════════════════════════════════════════════
-- EDUAPP ITM — SUPABASE SCHEMA
-- Ejecuta en: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════════

-- 1. EXTENSIONES
create extension if not exists "uuid-ossp";

-- 2. SEMESTRES
create table if not exists semestres (
  id         uuid primary key default uuid_generate_v4(),
  nombre     text not null unique,
  activo     boolean default true,
  created_at timestamptz default now()
);

-- 3. USUARIOS
create table if not exists usuarios (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null unique,
  nombre      text not null,
  rol         text not null check (rol in ('admin','teacher','student')),
  semestre_id uuid references semestres(id),
  activo      boolean default true,
  created_at  timestamptz default now()
);

-- 4. CURSOS
create table if not exists cursos (
  id          uuid primary key default uuid_generate_v4(),
  nombre      text not null,
  programa    text,
  creditos    int default 3,
  competencia text,
  docente_id  uuid references usuarios(id),
  activo      boolean default true,
  created_at  timestamptz default now()
);

-- 5. GRUPOS
create table if not exists grupos (
  id          uuid primary key default uuid_generate_v4(),
  nombre      text not null,
  curso_id    uuid references cursos(id),
  semestre_id uuid references semestres(id),
  activo      boolean default true,
  created_at  timestamptz default now()
);

-- 6. GRUPO_ESTUDIANTES
create table if not exists grupo_estudiantes (
  grupo_id      uuid references grupos(id) on delete cascade,
  estudiante_id uuid references usuarios(id) on delete cascade,
  primary key (grupo_id, estudiante_id)
);

-- 7. MODULOS
create table if not exists modulos (
  id           uuid primary key default uuid_generate_v4(),
  curso_id     uuid references cursos(id),
  nombre       text not null,
  color        text default '#7c6af7',
  orden        int  not null default 0,
  activo       boolean default true,
  notebook_url text,
  created_at   timestamptz default now()
);

-- 8. TEMAS
create table if not exists temas (
  id           uuid primary key default uuid_generate_v4(),
  modulo_id    uuid references modulos(id) on delete cascade,
  titulo       text not null,
  tipo         text check (tipo in ('text','video','slides','pdf','interactive')),
  contenido    text,
  descripcion  text,
  notebook_url text,
  orden        int default 0,
  activo       boolean default true,
  created_at   timestamptz default now()
);

-- 9. PROGRESO_TEMAS
create table if not exists progreso_temas (
  id               uuid primary key default uuid_generate_v4(),
  estudiante_id    uuid references usuarios(id) on delete cascade,
  tema_id          uuid references temas(id) on delete cascade,
  completado       boolean default false,
  puntos           int default 0,
  intentos         int default 0,
  ultimo_acceso    timestamptz default now(),
  fecha_completado timestamptz,
  unique (estudiante_id, tema_id)
);

-- 10. EVALUACIONES
create table if not exists evaluaciones (
  id          uuid primary key default uuid_generate_v4(),
  curso_id    uuid references cursos(id),
  modulo_id   uuid references modulos(id),
  nombre      text not null,
  porcentaje  numeric(5,2) not null,
  semana      int,
  descripcion text,
  activo      boolean default true,
  created_at  timestamptz default now()
);

-- 11. NOTAS
create table if not exists notas (
  id              uuid primary key default uuid_generate_v4(),
  estudiante_id   uuid references usuarios(id) on delete cascade,
  evaluacion_id   uuid references evaluaciones(id) on delete cascade,
  valor           numeric(3,1) check (valor >= 0 and valor <= 5),
  observacion     text,
  registrado_por  uuid references usuarios(id),
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),
  unique (estudiante_id, evaluacion_id)
);

-- 12. ENTREGAS
create table if not exists entregas (
  id            uuid primary key default uuid_generate_v4(),
  estudiante_id uuid references usuarios(id),
  evaluacion_id uuid references evaluaciones(id),
  archivo_url   text,
  comentario    text,
  estado        text default 'pendiente' check (estado in ('pendiente','entregado','calificado')),
  nota          numeric(3,1),
  feedback      text,
  created_at    timestamptz default now()
);

-- 13. MATERIALES
create table if not exists materiales (
  id         uuid primary key default uuid_generate_v4(),
  tema_id    uuid references temas(id) on delete cascade,
  nombre     text not null,
  tipo       text check (tipo in ('pdf','video','link','doc')),
  url        text,
  subido_por uuid references usuarios(id),
  created_at timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════

alter table usuarios          enable row level security;
alter table semestres         enable row level security;
alter table cursos            enable row level security;
alter table grupos            enable row level security;
alter table grupo_estudiantes enable row level security;
alter table modulos           enable row level security;
alter table temas             enable row level security;
alter table progreso_temas    enable row level security;
alter table evaluaciones      enable row level security;
alter table notas             enable row level security;
alter table entregas          enable row level security;
alter table materiales        enable row level security;

-- Politicas
create policy "usuario_ve_su_perfil" on usuarios
  for select using (auth.uid() = id);

create policy "admin_teacher_ven_todos" on usuarios
  for all using (
    exists (select 1 from usuarios u2 where u2.id = auth.uid() and u2.rol in ('admin','teacher'))
  );

create policy "todos_ven_semestres" on semestres
  for select using (auth.role() = 'authenticated');

create policy "todos_ven_cursos" on cursos
  for select using (auth.role() = 'authenticated');

create policy "todos_ven_grupos" on grupos
  for select using (auth.role() = 'authenticated');

create policy "todos_ven_modulos" on modulos
  for select using (auth.role() = 'authenticated');

create policy "todos_ven_temas_activos" on temas
  for select using (auth.role() = 'authenticated' and activo = true);

create policy "teacher_admin_gestionan_temas" on temas
  for all using (
    exists (select 1 from usuarios u2 where u2.id = auth.uid() and u2.rol in ('admin','teacher'))
  );

create policy "progreso_propio" on progreso_temas
  for all using (
    auth.uid() = estudiante_id or
    exists (select 1 from usuarios u2 where u2.id = auth.uid() and u2.rol in ('admin','teacher'))
  );

create policy "notas_lectura" on notas
  for select using (
    auth.uid() = estudiante_id or
    exists (select 1 from usuarios u2 where u2.id = auth.uid() and u2.rol in ('admin','teacher'))
  );

create policy "notas_escritura_teacher" on notas
  for all using (
    exists (select 1 from usuarios u2 where u2.id = auth.uid() and u2.rol in ('admin','teacher'))
  );

create policy "evaluaciones_lectura" on evaluaciones
  for select using (auth.role() = 'authenticated');

create policy "entregas_propias" on entregas
  for all using (
    auth.uid() = estudiante_id or
    exists (select 1 from usuarios u2 where u2.id = auth.uid() and u2.rol in ('admin','teacher'))
  );

create policy "materiales_lectura" on materiales
  for select using (auth.role() = 'authenticated');

-- ═══════════════════════════════════════════════════════════════
-- VISTA: reporte por semestre
-- ═══════════════════════════════════════════════════════════════
create or replace view reporte_semestre as
select
  s.nombre                                                          as semestre,
  u.nombre                                                          as estudiante,
  u.email,
  g.nombre                                                          as grupo,
  count(distinct pt.tema_id) filter (where pt.completado = true)   as temas_completados,
  coalesce(sum(pt.puntos), 0)                                       as puntos_temas,
  round(
    sum(n.valor * e.porcentaje) / nullif(sum(e.porcentaje), 0), 1
  )                                                                 as promedio_general
from usuarios u
join semestres s           on s.id = u.semestre_id
join grupo_estudiantes ge  on ge.estudiante_id = u.id
join grupos g              on g.id = ge.grupo_id
join cursos c              on c.id = g.curso_id
left join progreso_temas pt on pt.estudiante_id = u.id
left join notas n           on n.estudiante_id = u.id
left join evaluaciones e    on e.id = n.evaluacion_id and e.curso_id = c.id
where u.rol = 'student'
group by s.nombre, u.nombre, u.email, g.nombre, u.id, c.id;

-- ═══════════════════════════════════════════════════════════════
-- DATOS INICIALES
-- ═══════════════════════════════════════════════════════════════

insert into semestres (id, nombre)
values ('a1b2c3d4-e5f6-7890-abcd-ef1234560001', '2026-1')
on conflict (nombre) do nothing;

insert into cursos (id, nombre, programa, creditos, competencia)
values (
  'a1b2c3d4-e5f6-7890-abcd-ef1234560002',
  'Informatica para la Gestion',
  'Tecnologia en Analisis de Costos y Presupuestos',
  3,
  'Gestiona informacion operativa y financiera en un entorno empresarial mediante el uso de las tecnologias de la informacion para la toma de decisiones.'
) on conflict (id) do nothing;

insert into grupos (id, nombre, curso_id, semestre_id)
values (
  'a1b2c3d4-e5f6-7890-abcd-ef1234560003',
  'Herramientas 2026',
  'a1b2c3d4-e5f6-7890-abcd-ef1234560002',
  'a1b2c3d4-e5f6-7890-abcd-ef1234560001'
) on conflict (id) do nothing;

insert into modulos (id, curso_id, nombre, color, orden, notebook_url)
values
  ('a1b2c3d4-e5f6-7890-abcd-ef1234560011', 'a1b2c3d4-e5f6-7890-abcd-ef1234560002', 'Hoja de Calculo',   '#7c6af7', 1, 'https://colab.research.google.com'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234560012', 'a1b2c3d4-e5f6-7890-abcd-ef1234560002', 'Bases de Datos',    '#1db87a', 2, 'https://colab.research.google.com'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234560013', 'a1b2c3d4-e5f6-7890-abcd-ef1234560002', 'Sistema ERP',       '#e05555', 3, 'https://colab.research.google.com'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234560014', 'a1b2c3d4-e5f6-7890-abcd-ef1234560002', 'Macros y Seguridad','#3a8fe8', 4, 'https://colab.research.google.com')
on conflict (id) do nothing;

insert into temas (modulo_id, titulo, tipo, orden, activo)
values
  ('a1b2c3d4-e5f6-7890-abcd-ef1234560014', 'Tipos de datos y variables',         'interactive', 1, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234560014', 'Funciones y estructuras de control', 'interactive', 2, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234560014', 'Grabadora de macros',                'interactive', 3, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234560014', 'Editor VBA y primer procedimiento',  'interactive', 4, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234560014', 'CRUD Facturacion',                   'interactive', 5, false),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234560014', 'Proteccion Seguridad y Firma',       'text',        6, false);

insert into evaluaciones (curso_id, modulo_id, nombre, porcentaje, semana)
values
  ('a1b2c3d4-e5f6-7890-abcd-ef1234560002', 'a1b2c3d4-e5f6-7890-abcd-ef1234560011', 'Taller Analisis de datos',                15, 3),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234560002', 'a1b2c3d4-e5f6-7890-abcd-ef1234560011', 'Taller Aplicaciones financieras',         10, 5),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234560002', 'a1b2c3d4-e5f6-7890-abcd-ef1234560014', 'Taller Programacion de macros',           15, 8),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234560002', 'a1b2c3d4-e5f6-7890-abcd-ef1234560012', 'Taller Bases de datos',                   20, 12),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234560002', 'a1b2c3d4-e5f6-7890-abcd-ef1234560013', 'Taller Gestion de recursos',              20, 15),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234560002', null,                                    'Proyecto de curso',                       20, 16);
