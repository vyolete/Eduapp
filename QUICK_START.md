# ⚡ Quick Start - EduApp ITM

Guía rápida para poner en marcha la aplicación en 15 minutos.

## 📋 Requisitos

- Node.js 18+
- Cuenta de Supabase (gratuita)
- Git

## 🚀 Pasos Rápidos

### 1. Clonar y Configurar (2 min)

```bash
git clone https://github.com/tu-usuario/eduapp-itm.git
cd eduapp-itm/frontend
npm install
cp .env.example .env.local
```

### 2. Crear Proyecto en Supabase (3 min)

1. Ve a https://supabase.com
2. Click "New Project"
3. Copia:
   - Project URL
   - anon/public key

### 3. Configurar Variables (1 min)

Edita `frontend/.env.local`:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
VITE_API_BASE_URL=https://tu-proyecto.supabase.co
VITE_APP_NAME="EduApp ITM"
VITE_APP_URL=http://localhost:5173
```

### 4. Crear Base de Datos (3 min)

1. Abre: https://supabase.com/dashboard → Tu Proyecto → SQL Editor
2. Copia TODO el contenido de `supabase-setup.sql`
3. Pega y click "Run"

### 5. Crear Usuario Admin (2 min)

En Supabase Dashboard → Authentication → Users:

1. Click "Add User"
2. Email: `admin@itm.edu.co`
3. Password: `admin123`
4. Auto Confirm: ✅
5. User Metadata:
   ```json
   {"role": "admin", "name": "Administrador ITM"}
   ```
6. Copia el UUID del usuario

En SQL Editor:
```sql
INSERT INTO usuarios (id, email, nombre, rol, activo)
VALUES ('UUID-AQUI', 'admin@itm.edu.co', 'Administrador ITM', 'admin', true);
```

### 6. Ejecutar (1 min)

```bash
cd frontend
npm run dev
```

Abre http://localhost:5173

**Login:**
- Email: `admin@itm.edu.co`
- Password: `admin123`

## ✅ Verificar

Deberías ver:
- ✅ Dashboard con 1 curso
- ✅ 4 módulos
- ✅ 6 evaluaciones

## 🚀 Desplegar en Vercel (10 min)

### Opción A: GitHub + Vercel

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

1. Ve a https://vercel.com
2. Import tu repositorio
3. Root Directory: `frontend`
4. Framework: Vite
5. Agrega variables de entorno
6. Deploy

### Opción B: Vercel CLI

```bash
npm install -g vercel
cd frontend
vercel
```

## 🐛 Problemas Comunes

### "Invalid API key"
- Verifica que copiaste la clave completa
- Debe tener ~200 caracteres

### "No courses found"
- Ejecuta `supabase-setup.sql` completo
- Verifica en Table Editor que hay datos

### "Login failed"
- Verifica que el usuario existe en Authentication
- Verifica que existe en tabla `usuarios`

## 📚 Más Información

- `README.md` - Documentación completa
- `CONTRIBUTING.md` - Guía de contribución
- `DEPLOYMENT_CHECKLIST.md` - Checklist de despliegue

## 🎯 Siguiente Paso

Personaliza la aplicación:
- Cambia colores en `tailwind.config.js`
- Agrega tu logo en `frontend/public/`
- Modifica módulos en Supabase

---

**¿Problemas?** Abre un issue en GitHub o contacta: correo@itm.edu.co
