# Guía de Contribución

¡Gracias por tu interés en contribuir a EduApp ITM! Esta guía te ayudará a empezar.

## 🎯 Para Docentes

Si eres docente y quieres usar esta plataforma en tu institución:

### Personalización Básica

1. **Cambiar el nombre de la aplicación:**
   - Edita `frontend/.env.local`:
     ```env
     VITE_APP_NAME="Tu Institución"
     ```

2. **Personalizar colores:**
   - Edita `frontend/tailwind.config.js`
   - Modifica los colores en la sección `theme.extend.colors`

3. **Agregar tu logo:**
   - Coloca tu logo en `frontend/public/logo.png`
   - Actualiza el componente Header en `frontend/src/components/layout/Header.tsx`

### Agregar Nuevos Módulos

1. Crea el módulo en Supabase:
   ```sql
   INSERT INTO modulos (curso_id, nombre, color, orden)
   VALUES ('curso-id', 'Nuevo Módulo', '#color', orden);
   ```

2. Agrega temas al módulo:
   ```sql
   INSERT INTO temas (modulo_id, titulo, tipo, orden)
   VALUES ('modulo-id', 'Tema 1', 'text', 1);
   ```

### Agregar Nuevas Evaluaciones

```sql
INSERT INTO evaluaciones (curso_id, modulo_id, nombre, porcentaje, semana)
VALUES ('curso-id', 'modulo-id', 'Taller 1', 15, 3);
```

## 💻 Para Desarrolladores

### Configurar Entorno de Desarrollo

1. **Fork y clonar:**
   ```bash
   git clone https://github.com/tu-usuario/eduapp-itm.git
   cd eduapp-itm
   ```

2. **Instalar dependencias:**
   ```bash
   cd frontend
   npm install
   ```

3. **Configurar Supabase:**
   - Crea un proyecto en Supabase
   - Ejecuta `supabase-setup.sql`
   - Configura `.env.local`

4. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

### Estructura de Branches

- `main` - Producción estable
- `develop` - Desarrollo activo
- `feature/*` - Nuevas funcionalidades
- `bugfix/*` - Corrección de bugs
- `hotfix/*` - Correcciones urgentes

### Convenciones de Código

#### TypeScript

- Usa tipos explícitos siempre que sea posible
- Evita `any`, usa `unknown` si es necesario
- Interfaces para objetos, types para uniones

#### React

- Componentes funcionales con hooks
- Props con TypeScript interfaces
- Nombres de componentes en PascalCase
- Archivos de componentes con extensión `.tsx`

#### Estilos

- Usa Tailwind CSS para estilos
- Evita CSS inline excepto para estilos dinámicos
- Componentes UI reutilizables en `components/ui/`

### Commits

Usa [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: agregar módulo de reportes
fix: corregir error en cálculo de notas
docs: actualizar README con instrucciones
style: formatear código con prettier
refactor: reorganizar estructura de stores
test: agregar tests para API de cursos
chore: actualizar dependencias
```

### Pull Requests

1. Crea una rama desde `develop`
2. Haz tus cambios
3. Escribe tests si es necesario
4. Actualiza documentación
5. Abre PR hacia `develop`
6. Espera revisión

**Template de PR:**

```markdown
## Descripción
Breve descripción de los cambios

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## Checklist
- [ ] El código sigue las convenciones del proyecto
- [ ] He actualizado la documentación
- [ ] He agregado tests
- [ ] Todos los tests pasan
- [ ] No hay warnings en la consola
```

## 🧪 Testing

### Ejecutar Tests

```bash
cd frontend
npm run test
```

### Escribir Tests

Usa Vitest y React Testing Library:

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

## 📝 Documentación

### Documentar Componentes

Usa JSDoc para componentes:

```typescript
/**
 * Button component with multiple variants
 * 
 * @param {string} variant - Button style variant (default, primary, danger)
 * @param {ReactNode} children - Button content
 * @param {Function} onClick - Click handler
 */
export function Button({ variant = 'default', children, onClick }: ButtonProps) {
  // ...
}
```

### Documentar Funciones API

```typescript
/**
 * Get all courses from Supabase
 * 
 * @returns {Promise<Course[]>} Array of courses
 * @throws {Error} If database query fails
 */
export const getAll = async (): Promise<Course[]> => {
  // ...
}
```

## 🐛 Reportar Bugs

Usa el template de issues en GitHub:

```markdown
**Descripción del bug**
Descripción clara del problema

**Pasos para reproducir**
1. Ve a '...'
2. Click en '...'
3. Scroll hasta '...'
4. Ver error

**Comportamiento esperado**
Lo que debería pasar

**Screenshots**
Si aplica, agrega screenshots

**Entorno**
- OS: [e.g. macOS, Windows]
- Browser: [e.g. Chrome, Firefox]
- Version: [e.g. 22]
```

## 💡 Sugerir Funcionalidades

Abre un issue con el template de feature request:

```markdown
**¿El problema está relacionado con algo?**
Descripción del problema

**Solución propuesta**
Cómo te gustaría que funcionara

**Alternativas consideradas**
Otras soluciones que consideraste

**Contexto adicional**
Cualquier otra información relevante
```

## 📧 Contacto

- Issues: [GitHub Issues](https://github.com/tu-usuario/eduapp-itm/issues)
- Discussions: [GitHub Discussions](https://github.com/tu-usuario/eduapp-itm/discussions)
- Email: correo@itm.edu.co

## 🙏 Agradecimientos

Gracias a todos los docentes y desarrolladores que contribuyen a este proyecto.

---

**Nota:** Este proyecto es de código abierto bajo licencia MIT. Siéntete libre de usarlo y modificarlo según tus necesidades.
