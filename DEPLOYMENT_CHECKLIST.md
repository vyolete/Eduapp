# ✅ Checklist de Despliegue

## 📦 Archivos para Compartir en Git

### ✅ Código Fuente
- `frontend/src/` - Todo el código de la aplicación
- `frontend/public/` - Assets públicos
- `frontend/package.json` - Dependencias
- `frontend/vite.config.ts` - Configuración de Vite
- `frontend/tailwind.config.js` - Configuración de Tailwind
- `frontend/tsconfig.json` - Configuración de TypeScript

### ✅ Configuración
- `frontend/.env.example` - Plantilla de variables (SIN credenciales)
- `.gitignore` - Archivos a ignorar
- `supabase-setup.sql` - Script de base de datos

### ✅ Documentación
- `README.md` - Documentación principal
- `LICENSE` - Licencia MIT
- `CONTRIBUTING.md` - Guía de contribución
- `frontend/README.md` - Documentación del frontend
- `BRANCHING_STRATEGY.md` - Estrategia de Git

### ✅ Archivos Originales (Referencia)
- `eduplatform (1).tsx` - Versión original hardcodeada
- `macros-module.tsx` - Módulo de macros original
- `vba-lesson.tsx` - Lección VBA original

---

## 🚫 Archivos que NO se Suben (Ignorados)

### 🔐 Credenciales y Secretos
- `frontend/.env.local` - **NUNCA subir** (contiene credenciales)
- Cualquier archivo con claves API

### 📝 Documentación Interna
- `DEPLOYMENT_STATUS.md`
- `INTEGRATION_COMPLETE.md`
- `NEXT_STEPS.md`
- `EXECUTE_SQL_INSTRUCTIONS.md`
- `insert-data-only.sql`
- `frontend/ENV_STATUS.md`
- `frontend/GET_SUPABASE_KEYS.md`
- `frontend/CONNECTION_SUCCESS.md`

### 🛠️ Scripts de Desarrollo
- `frontend/verify-env.js`
- `frontend/test-connection.js`
- `frontend/insert-initial-data.js`

### 📁 Carpetas de Desarrollo
- `.kiro/specs/` - Specs de desarrollo interno
- `node_modules/` - Dependencias (se instalan con npm)
- `frontend/dist/` - Build de producción
- `.vscode/` - Configuración de IDE

---

## 🚀 Pasos para Desplegar

### 1. Preparar el Repositorio

```bash
# Verificar qué archivos se van a subir
git status

# Agregar archivos
git add .

# Commit
git commit -m "feat: initial commit - EduApp ITM platform"

# Push a GitHub
git push origin main
```

### 2. Verificar .gitignore

Asegúrate de que `.env.local` NO aparece en `git status`:

```bash
git status | grep .env.local
# No debería mostrar nada
```

### 3. Desplegar en Vercel

**Desde GitHub:**

1. Ve a [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import tu repositorio de GitHub
4. Configuración:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. **Environment Variables:**
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key
   VITE_API_BASE_URL=https://tu-proyecto.supabase.co
   VITE_APP_NAME=EduApp ITM
   VITE_APP_URL=https://tu-app.vercel.app
   ```

6. Click "Deploy"

### 4. Verificar Despliegue

1. Abre la URL de Vercel
2. Verifica que carga correctamente
3. Prueba el login
4. Verifica que los datos se muestran

---

## 🔒 Seguridad

### ✅ Buenas Prácticas

1. **NUNCA subir credenciales:**
   - `.env.local` debe estar en `.gitignore`
   - Usa `.env.example` como plantilla

2. **Usar variables de entorno:**
   - En Vercel: Settings → Environment Variables
   - En local: `.env.local`

3. **Rotar claves si se exponen:**
   - Si accidentalmente subes credenciales
   - Regenera las claves en Supabase
   - Actualiza en Vercel

4. **RLS activo en Supabase:**
   - Verifica que las policies están activas
   - Prueba con diferentes roles

### ⚠️ Qué Hacer si Subes Credenciales por Error

1. **Inmediatamente:**
   ```bash
   # Eliminar del historio de Git
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch frontend/.env.local" \
     --prune-empty --tag-name-filter cat -- --all
   
   # Force push
   git push origin --force --all
   ```

2. **Regenerar claves en Supabase:**
   - Settings → API → Reset API keys

3. **Actualizar en Vercel:**
   - Settings → Environment Variables
   - Actualizar con las nuevas claves

---

## 📊 Checklist Final

Antes de compartir el repositorio:

- [ ] `.env.local` está en `.gitignore`
- [ ] No hay credenciales en el código
- [ ] README.md está actualizado
- [ ] LICENSE está incluido
- [ ] `.env.example` tiene todas las variables (sin valores)
- [ ] `supabase-setup.sql` está incluido
- [ ] Documentación está completa
- [ ] Tests pasan (`npm run test`)
- [ ] Build funciona (`npm run build`)
- [ ] No hay warnings en la consola

---

## 📝 Notas para Docentes

Si vas a compartir este proyecto con otros docentes:

1. **Incluye instrucciones claras:**
   - Cómo configurar Supabase
   - Cómo obtener las credenciales
   - Cómo crear el primer usuario

2. **Proporciona datos de ejemplo:**
   - El script SQL incluye datos iniciales
   - Explica cómo personalizarlos

3. **Documenta personalizaciones:**
   - Cómo cambiar colores
   - Cómo agregar módulos
   - Cómo modificar evaluaciones

4. **Ofrece soporte:**
   - Email de contacto
   - Issues en GitHub
   - Documentación adicional

---

## 🎯 Resultado Final

Tu repositorio en GitHub tendrá:

✅ Código fuente completo y funcional
✅ Documentación clara para otros docentes
✅ Instrucciones de instalación paso a paso
✅ Script SQL para configurar la base de datos
✅ Licencia MIT para uso libre
✅ Sin credenciales ni información sensible

**Listo para compartir con la comunidad educativa** 🎓
