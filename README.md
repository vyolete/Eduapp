# EduApp ITM - Plataforma Educativa

Plataforma educativa para el curso "Informática para la Gestión" del ITM (Institución Universitaria).

## 🎯 Características

- ✅ Gestión de cursos, módulos y evaluaciones
- ✅ Sistema de autenticación con roles (admin, teacher, student)
- ✅ Dashboard con estadísticas en tiempo real
- ✅ Seguimiento de progreso de estudiantes
- ✅ Gestión de grupos y asignaciones
- ✅ Módulos interactivos (VBA, Bases de Datos, ERP)

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **React Router** - Navegación
- **Zustand** - State management
- **Tailwind CSS** - Estilos

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Row Level Security (RLS)
  - Real-time subscriptions

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase (gratuita)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/eduapp-itm.git
cd eduapp-itm
```

### 2. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ve a Settings → API y copia:
   - Project URL
   - anon/public key

### 3. Configurar variables de entorno

```bash
cd frontend
cp .env.example .env.local
```

Edita `frontend/.env.local` con tus credenciales:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
VITE_API_BASE_URL=https://tu-proyecto.supabase.co
VITE_APP_NAME="EduApp ITM"
VITE_APP_URL=http://localhost:5173
```

### 4. Crear el schema de base de datos

1. Ve a Supabase Dashboard → SQL Editor
2. Copia el contenido de `supabase-setup.sql`
3. Pega y ejecuta

Esto creará:
- Todas las tablas con relaciones
- RLS policies para seguridad
- Datos iniciales de ejemplo

### 5. Crear usuario administrador

En Supabase Dashboard → Authentication → Users:

1. Click "Add User"
2. Email: `admin@itm.edu.co`
3. Password: `admin123`
4. User Metadata:
   ```json
   {
     "role": "admin",
     "name": "Administrador ITM"
   }
   ```
5. Copia el UUID del usuario creado
6. En SQL Editor, ejecuta:
   ```sql
   INSERT INTO usuarios (id, email, nombre, rol, activo)
   VALUES (
     'UUID-DEL-USUARIO',
     'admin@itm.edu.co',
     'Administrador ITM',
     'admin',
     true
   );
   ```

### 6. Instalar dependencias y ejecutar

```bash
cd frontend
npm install
npm run dev
```

Abre http://localhost:5173

**Login:**
- Email: `admin@itm.edu.co`
- Password: `admin123`

## 📁 Estructura del Proyecto

```
eduapp-itm/
├── frontend/                 # Aplicación React
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   │   ├── layout/      # Header, Sidebar, Footer
│   │   │   ├── ui/          # Button, Card, Input, etc.
│   │   │   └── modules/     # Componentes específicos
│   │   ├── pages/           # Páginas de la aplicación
│   │   ├── lib/
│   │   │   ├── api/         # Funciones API de Supabase
│   │   │   ├── types/       # TypeScript interfaces
│   │   │   └── utils/       # Utilidades
│   │   ├── store/           # Zustand stores
│   │   ├── contexts/        # React contexts
│   │   └── hooks/           # Custom hooks
│   ├── .env.example         # Plantilla de variables de entorno
│   └── package.json
├── supabase-setup.sql       # Script de base de datos
├── .gitignore
└── README.md
```

## 🔐 Roles y Permisos

### Admin
- Gestión completa de usuarios
- Crear/editar cursos y módulos
- Ver reportes y estadísticas
- Gestionar grupos

### Teacher
- Ver y editar módulos
- Gestionar evaluaciones
- Calificar estudiantes
- Ver grupos asignados

### Student
- Ver contenido de cursos
- Realizar evaluaciones
- Ver sus calificaciones
- Seguir su progreso

## 🗄️ Modelo de Datos

### Tablas Principales

- `usuarios` - Usuarios del sistema
- `semestres` - Períodos académicos
- `cursos` - Cursos disponibles
- `modulos` - Módulos de cada curso
- `temas` - Contenido de los módulos
- `evaluaciones` - Evaluaciones y talleres
- `notas` - Calificaciones de estudiantes
- `grupos` - Grupos de estudiantes
- `grupo_estudiantes` - Relación estudiantes-grupos
- `progreso_temas` - Seguimiento de progreso
- `materiales` - Archivos y recursos
- `entregas` - Entregas de trabajos

## 🚀 Despliegue en Vercel

### 1. Preparar el proyecto

```bash
cd frontend
npm run build
```

### 2. Desplegar

**Opción A: Desde GitHub**

1. Push a GitHub
2. Conecta el repositorio en [Vercel](https://vercel.com)
3. Configura:
   - Root Directory: `frontend`
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

**Opción B: Desde CLI**

```bash
npm install -g vercel
cd frontend
vercel
```

### 3. Configurar variables de entorno en Vercel

En Settings → Environment Variables, agrega:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_API_BASE_URL`
- `VITE_APP_NAME`
- `VITE_APP_URL` (tu URL de Vercel)

## 📚 Documentación Adicional

- `frontend/README.md` - Documentación específica del frontend
- `frontend/ENV_VARIABLES.md` - Guía de variables de entorno
- `BRANCHING_STRATEGY.md` - Estrategia de branches de Git

## 🤝 Contribuir

Si eres docente y quieres usar o mejorar esta plataforma:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **ITM** - Institución Universitaria
- **Curso:** Informática para la Gestión
- **Programa:** Tecnología en Análisis de Costos y Presupuestos

## 📧 Contacto

Para preguntas o soporte, contacta a: [correo@itm.edu.co]

---

**Nota:** Este es un proyecto educativo. Las credenciales de ejemplo deben cambiarse en producción.
