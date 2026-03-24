# 🚀 Desplegar en Vercel

Tu código ya está en GitHub: https://github.com/vyolete/Eduapp

Ahora vamos a desplegarlo en Vercel.

## 📋 Pasos para Desplegar

### 1. Ir a Vercel

Abre: https://vercel.com

### 2. Importar Proyecto

1. Click en "Add New..." → "Project"
2. Click en "Import Git Repository"
3. Busca: `vyolete/Eduapp`
4. Click en "Import"

### 3. Configurar Proyecto

En la pantalla de configuración:

**Project Name:**
```
eduapp-itm
```

**Framework Preset:**
```
Vite
```

**Root Directory:**
```
frontend
```
(Click en "Edit" y selecciona la carpeta `frontend`)

**Build Command:**
```
npm run build
```

**Output Directory:**
```
dist
```

**Install Command:**
```
npm install
```

### 4. Configurar Variables de Entorno

Click en "Environment Variables" y agrega:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://mtlvcliwhspzbjkjntxp.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10bHZjbGl3aHNwemJqa2pudHhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMjU1NDMsImV4cCI6MjA4OTgwMTU0M30.wdbOHrcELpp2JTjWKe-y6G6sYVYj9bqizD1lxMezKhM` |
| `VITE_API_BASE_URL` | `https://mtlvcliwhspzbjkjntxp.supabase.co` |
| `VITE_APP_NAME` | `EduApp ITM` |
| `VITE_APP_URL` | `https://eduapp-itm.vercel.app` (o tu URL de Vercel) |

**Importante:** Asegúrate de agregar las variables para todos los entornos:
- ✅ Production
- ✅ Preview
- ✅ Development

### 5. Deploy

Click en "Deploy"

Vercel comenzará a:
1. Clonar el repositorio
2. Instalar dependencias
3. Ejecutar el build
4. Desplegar

**Tiempo estimado:** 2-3 minutos

### 6. Verificar Despliegue

Una vez completado:

1. Click en "Visit" o abre la URL que te da Vercel
2. Deberías ver la página de login
3. Intenta hacer login con:
   - Email: `admin@itm.edu.co`
   - Password: `admin123`

---

## ⚠️ Antes de Probar

**IMPORTANTE:** Antes de que funcione completamente, necesitas:

### 1. Ejecutar SQL en Supabase

Si no lo has hecho aún:

1. Ve a: https://supabase.com/dashboard/project/mtlvcliwhspzbjkjntxp/sql/new
2. Copia el contenido de `supabase-setup.sql`
3. Pega y ejecuta

### 2. Crear Usuario Admin

En Supabase Dashboard → Authentication → Users:

1. Add User
2. Email: `admin@itm.edu.co`
3. Password: `admin123`
4. User Metadata: `{"role": "admin", "name": "Administrador ITM"}`
5. Copia el UUID

En SQL Editor:
```sql
INSERT INTO usuarios (id, email, nombre, rol, activo)
VALUES ('UUID-AQUI', 'admin@itm.edu.co', 'Administrador ITM', 'admin', true);
```

---

## 🔄 Actualizaciones Automáticas

Vercel está configurado para:

✅ **Auto-deploy en cada push a `main`**
- Haces cambios localmente
- `git push origin main`
- Vercel despliega automáticamente

✅ **Preview deployments en PRs**
- Abres un Pull Request
- Vercel crea un preview deployment
- Puedes probar antes de mergear

---

## 🔧 Configuración Avanzada

### Dominios Personalizados

1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Add Domain
4. Sigue las instrucciones para configurar DNS

### Variables de Entorno por Branch

Puedes tener diferentes variables para:
- Production (main)
- Preview (otras branches)
- Development (local)

### Build & Development Settings

Si necesitas cambiar algo:

1. Settings → General
2. Modifica:
   - Build Command
   - Output Directory
   - Install Command
   - Development Command

---

## 📊 Monitoreo

### Analytics

Vercel incluye analytics gratuitos:

1. Ve a tu proyecto
2. Click en "Analytics"
3. Ve métricas de:
   - Visitas
   - Performance
   - Errores

### Logs

Para ver logs de build o runtime:

1. Ve a tu proyecto
2. Click en un deployment
3. Click en "Logs"

---

## 🐛 Troubleshooting

### Error: "Build failed"

**Causa:** Error en el build de Vite

**Solución:**
1. Ve a los logs del deployment
2. Busca el error específico
3. Arréglalo localmente
4. Push de nuevo

### Error: "Module not found"

**Causa:** Dependencia faltante

**Solución:**
```bash
cd frontend
npm install
git add package.json package-lock.json
git commit -m "fix: add missing dependency"
git push
```

### Error: "Environment variable not found"

**Causa:** Variable de entorno no configurada

**Solución:**
1. Settings → Environment Variables
2. Verifica que todas las variables estén configuradas
3. Redeploy

### Página en blanco

**Causa:** Error de JavaScript en runtime

**Solución:**
1. Abre DevTools (F12)
2. Ve a Console
3. Busca errores
4. Verifica variables de entorno

---

## 🎯 URLs Importantes

**Tu Repositorio:**
https://github.com/vyolete/Eduapp

**Vercel Dashboard:**
https://vercel.com/dashboard

**Supabase Dashboard:**
https://supabase.com/dashboard/project/mtlvcliwhspzbjkjntxp

**Tu App (después del deploy):**
https://eduapp-itm.vercel.app (o la URL que te asigne Vercel)

---

## ✅ Checklist Post-Deployment

Después de desplegar, verifica:

- [ ] La app carga correctamente
- [ ] Login funciona
- [ ] Dashboard muestra datos
- [ ] Courses muestra el curso
- [ ] No hay errores en la consola
- [ ] Las imágenes cargan
- [ ] Los estilos se ven bien
- [ ] La navegación funciona

---

## 🎉 ¡Listo!

Tu aplicación está desplegada y accesible desde cualquier lugar.

**Próximos pasos:**
1. Comparte la URL con tus estudiantes
2. Crea más usuarios (teachers, students)
3. Agrega más cursos y módulos
4. Personaliza según tus necesidades

**¿Necesitas ayuda?** Abre un issue en GitHub o contacta al equipo de desarrollo.
