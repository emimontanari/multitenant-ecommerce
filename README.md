# Multitenant E-Commerce Platform

Plataforma de e-commerce multitenant construida con las últimas tecnologías web, ofreciendo un sistema completo de gestión de contenido, APIs type-safe y una arquitectura modular escalable.

## 🚀 Descripción del Proyecto

Esta aplicación es una plataforma de comercio electrónico multitenant que combina la potencia de Next.js 15 con Payload CMS v3 para la gestión de contenido, tRPC para APIs type-safe, y MongoDB como base de datos. La arquitectura está diseñada para ser modular, escalable y fácil de mantener.

## 🛠️ Stack Tecnológico

### Core Framework & Runtime
- **[Next.js](https://nextjs.org)** `15.2.4` - Framework React con App Router
- **[React](https://react.dev)** `19.0.0` - Librería UI
- **[TypeScript](https://www.typescriptlang.org)** `5.x` - Lenguaje de programación con tipos estáticos
- **[Bun](https://bun.sh)** - Runtime y package manager (reemplaza npm/yarn/pnpm)

### Backend & APIs
- **[Payload CMS](https://payloadcms.com)** `3.49.1` - Headless CMS con admin panel
- **[tRPC](https://trpc.io)** `11.0.3` - APIs end-to-end type-safe
- **[MongoDB](https://www.mongodb.com)** - Base de datos NoSQL (via `@payloadcms/db-mongodb` `3.49.1`)
- **[Zod](https://zod.dev)** `3.24.2` - Validación de esquemas TypeScript-first

### State Management & Data Fetching
- **[TanStack Query (React Query)](https://tanstack.com/query)** `5.72.1` - Gestión de estado asíncrono y cache
- **[SuperJSON](https://github.com/blitz-js/superjson)** `2.2.2` - Serialización de datos con soporte para Date, Map, Set, etc.

### UI & Styling
- **[Tailwind CSS](https://tailwindcss.com)** `4.x` - Framework CSS utility-first
- **[shadcn/ui](https://ui.shadcn.com)** - Componentes UI basados en Radix UI
- **[Radix UI](https://www.radix-ui.com)** - Primitivos UI accesibles y sin estilos
- **[Lucide React](https://lucide.dev)** `0.525.0` - Iconos
- **[next-themes](https://github.com/pacocoursey/next-themes)** `0.4.6` - Gestión de temas (dark/light mode)

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com)** `7.60.0` - Gestión de formularios
- **[Hookform Resolvers](https://github.com/react-hook-form/resolvers)** `5.1.1` - Integración con Zod

### Editor & Rich Text
- **[Lexical](https://lexical.dev)** (via `@payloadcms/richtext-lexical` `3.49.1`) - Editor de texto enriquecido

### Utilities & Helpers
- **[date-fns](https://date-fns.org)** `4.1.0` - Manipulación de fechas
- **[clsx](https://github.com/lukeed/clsx)** `2.1.1` + **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** `3.3.1` - Gestión de clases CSS
- **[class-variance-authority](https://cva.style)** `0.7.1` - Variantes de componentes
- **[Sharp](https://sharp.pixelplumbing.com)** - Procesamiento de imágenes

### Development Tools
- **[ESLint](https://eslint.org)** `9.x` - Linter para calidad de código
- **[PostCSS](https://postcss.org)** - Transformación de CSS

## 📁 Arquitectura del Proyecto

### Estructura de Directorios

```
multitenant-ecommerce/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (app)/               # Route group - Aplicación principal
│   │   │   ├── (home)/          # Nested route group - Páginas públicas
│   │   │   │   ├── about/       # Página "Acerca de"
│   │   │   │   ├── contact/     # Página de contacto
│   │   │   │   ├── features/    # Página de características
│   │   │   │   ├── pricing/     # Página de precios
│   │   │   │   └── search-filters/ # Página de búsqueda
│   │   │   ├── api/
│   │   │   │   └── trpc/[trpc]/ # Endpoint tRPC
│   │   │   ├── globals.css      # Estilos globales
│   │   │   └── layout.tsx       # Layout principal con providers
│   │   └── (payload)/           # Route group - Payload CMS
│   │       ├── admin/           # Admin panel de Payload
│   │       └── api/             # APIs de Payload (REST + GraphQL)
│   │
│   ├── collections/             # Colecciones de Payload CMS
│   │   ├── Categories.ts        # Categorías jerárquicas
│   │   ├── Media.ts            # Gestión de archivos
│   │   └── Users.ts            # Usuarios con autenticación
│   │
│   ├── modules/                 # Módulos de funcionalidades
│   │   └── categories/         # Módulo de categorías
│   │       ├── types.ts        # Tipos TypeScript
│   │       └── server/
│   │           └── procedures.tsx # Procedimientos tRPC
│   │
│   ├── trpc/                    # Configuración tRPC
│   │   ├── init.ts             # Inicialización y contexto
│   │   ├── client.tsx          # Cliente tRPC (React Query)
│   │   ├── server.tsx          # Cliente servidor tRPC
│   │   ├── query-client.ts     # Configuración React Query
│   │   └── routers/
│   │       └── _app.ts         # Router principal
│   │
│   ├── components/              # Componentes React
│   │   └── ui/                 # Componentes shadcn/ui
│   │
│   ├── lib/                     # Utilidades y helpers
│   │   └── utils.ts            # Funciones auxiliares
│   │
│   ├── hooks/                   # React hooks personalizados
│   ├── payload.config.ts        # Configuración de Payload CMS
│   ├── payload-types.ts         # Tipos generados automáticamente
│   └── seed.ts                  # Script de seeding de datos
│
├── public/                      # Archivos estáticos
├── .gitignore
├── bun.lockb                    # Lockfile de Bun
├── components.json              # Configuración shadcn/ui
├── eslint.config.mjs            # Configuración ESLint
├── next.config.ts               # Configuración Next.js
├── package.json
├── postcss.config.mjs           # Configuración PostCSS
├── tsconfig.json                # Configuración TypeScript
├── CLAUDE.md                    # Documentación para Claude Code
└── README.md
```

### Principios Arquitectónicos

#### 1. **Route Groups de Next.js**

El proyecto utiliza **route groups** (directorios con paréntesis) para organizar rutas sin afectar las URLs:

- `(app)` - Aplicación principal del usuario
- `(payload)` - Admin panel de Payload CMS
- `(home)` - Páginas públicas anidadas

**Ejemplo**: `src/app/(app)/(home)/about/page.tsx` → URL: `/about`

#### 2. **Integración tRPC**

La arquitectura de tRPC sigue un flujo completo:

1. **Definición de Procedimientos** (`src/modules/*/server/procedures.tsx`)
   - Usa `baseProcedure` que inyecta Payload CMS como `ctx.db`
   - Define queries y mutations type-safe

2. **Router Principal** (`src/trpc/routers/_app.ts`)
   - Combina todos los routers de módulos
   - Exporta tipo `AppRouter` para inferencia de tipos

3. **Cliente React** (`src/trpc/client.tsx`)
   - Integra con TanStack Query
   - Provider `TRPCReactProvider` en layout principal

4. **Endpoint HTTP** (`src/app/(app)/api/trpc/[trpc]/route.ts`)
   - Maneja requests GET y POST
   - Conecta router con Next.js

#### 3. **Organización Modular**

Cada feature sigue una estructura consistente:

```
src/modules/{feature}/
├── types.ts              # Interfaces TypeScript
├── server/
│   └── procedures.tsx    # Lógica del servidor (tRPC)
└── client/               # (opcional) Componentes y hooks
```

**Ventajas**:
- Código organizado por funcionalidad
- Facilita el trabajo en equipo
- Escalabilidad horizontal

#### 4. **Payload CMS como Backend**

Payload CMS actúa como:
- **Headless CMS** - Gestión de contenido via admin panel
- **Base de datos abstraction** - API unificada para MongoDB
- **Sistema de autenticación** - Gestión de usuarios y roles
- **API REST y GraphQL** - Endpoints automáticos

**Acceso a la base de datos**:
```typescript
// En procedimientos tRPC
const data = await ctx.db.find({
  collection: 'categories',
  where: { ... },
})
```

#### 5. **Colecciones de Payload**

##### **Categories** (Jerárquicas)
- Campo `parent` (self-reference) para anidación
- Campo virtual `subcategories` (join) para relación inversa
- Indexado por `slug` para búsquedas rápidas

##### **Users** (Autenticación)
- Configuración `auth: true` habilita login
- Usado como colección de admin users

##### **Media** (Archivos)
- Procesamiento con Sharp
- Upload de imágenes optimizado

## 🔧 Instalación y Configuración

### Prerrequisitos

- **Bun** >= 1.0.0 ([Instalar Bun](https://bun.sh/docs/installation))
- **MongoDB** >= 4.4 (local o servicio como MongoDB Atlas)
- **Node.js** >= 18.x (para compatibilidad con Bun)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd multitenant-ecommerce
   ```

2. **Instalar dependencias**
   ```bash
   bun install
   ```

3. **Configurar variables de entorno**

   Crear archivo `.env.local` en la raíz del proyecto:
   ```bash
   # Database
   DATABASE_URI=mongodb://localhost:27017/multitenant-ecommerce
   # o para MongoDB Atlas:
   # DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

   # Payload CMS
   PAYLOAD_SECRET=your-super-secret-key-here-min-32-chars

   # Next.js (opcional)
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   **Generar PAYLOAD_SECRET**:
   ```bash
   openssl rand -base64 32
   ```

4. **Inicializar la base de datos**
   ```bash
   # Reset y aplicar migraciones
   bun run db:fresh

   # Seed con datos de ejemplo
   bun run db:seed
   ```

5. **Iniciar el servidor de desarrollo**
   ```bash
   bun dev
   ```

6. **Acceder a la aplicación**
   - **App principal**: [http://localhost:3000](http://localhost:3000)
   - **Admin Payload**: [http://localhost:3000/admin](http://localhost:3000/admin)

## 📜 Scripts Disponibles

```bash
# Desarrollo
bun dev                    # Servidor de desarrollo (localhost:3000)

# Producción
bun run build              # Build optimizado para producción
bun start                  # Servidor de producción

# Calidad de código
bun run lint               # Ejecutar ESLint

# Base de datos
bun run db:fresh           # Reset completo de la base de datos
bun run db:seed            # Poblar base de datos con categorías

# Payload CMS
bun run generate:types     # Generar tipos TypeScript desde colecciones
```

### Workflow Recomendado

1. Modificar colecciones de Payload → `bun run generate:types`
2. Cambios en schema de base de datos → `bun run db:fresh`
3. Agregar datos de ejemplo → `bun run db:seed`

## 🎨 Componentes UI

El proyecto usa **shadcn/ui**, una colección de componentes reutilizables construidos con Radix UI y Tailwind CSS.

### Agregar nuevos componentes

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

Los componentes se instalan en `src/components/ui/`.

### Componentes Disponibles

Ya instalados en el proyecto:
- Accordion, Alert Dialog, Aspect Ratio, Avatar
- Button, Checkbox, Collapsible, Context Menu
- Dialog, Dropdown Menu, Form, Hover Card
- Input OTP, Label, Menubar, Navigation Menu
- Popover, Progress, Radio Group, Resizable
- Scroll Area, Select, Separator, Slider
- Switch, Tabs, Textarea, Toggle, Tooltip
- Drawer, Command Menu, Carousel
- Y más...

## 🔐 Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `DATABASE_URI` | Connection string de MongoDB | ✅ |
| `PAYLOAD_SECRET` | Clave secreta para Payload CMS (min 32 chars) | ✅ |
| `NEXT_PUBLIC_APP_URL` | URL pública de la aplicación (para SSR) | ⚠️ Recomendada |

## 🧩 Características Principales

### ✅ Actualmente Implementado

- **Sistema de Categorías Jerárquicas**
  - Categorías padre-hijo infinitamente anidables
  - API tRPC para consultas type-safe
  - Seeding automático con 11 categorías principales + 50 subcategorías

- **Admin Panel de Payload CMS**
  - Interface completa para gestión de contenido
  - CRUD para todas las colecciones
  - Upload de media con procesamiento de imágenes

- **APIs Type-Safe con tRPC**
  - Inferencia automática de tipos end-to-end
  - Integración con React Query para cache y revalidación
  - Batch requests para optimización

- **Sistema de Autenticación**
  - Login/logout con Payload
  - Gestión de usuarios y roles

### 🚧 Roadmap

- [ ] Sistema de productos (Products collection)
- [ ] Carrito de compras
- [ ] Checkout y pagos
- [ ] Multitenancy (tenants/stores)
- [ ] Panel de vendedor
- [ ] Sistema de reviews y ratings
- [ ] Notificaciones en tiempo real
- [ ] Internacionalización (i18n)

## 📚 Documentación Adicional

- **[CLAUDE.md](./CLAUDE.md)** - Guía para desarrollo asistido por IA
- **[Next.js Docs](https://nextjs.org/docs)** - Documentación de Next.js
- **[Payload CMS Docs](https://payloadcms.com/docs)** - Documentación de Payload
- **[tRPC Docs](https://trpc.io/docs)** - Documentación de tRPC
- **[shadcn/ui Docs](https://ui.shadcn.com)** - Componentes UI

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto es privado y propietario.

## 🆘 Soporte

Para reportar bugs o solicitar features, crear un issue en el repositorio.

---

**Desarrollado con ❤️ usando Next.js 15, Payload CMS v3 y tRPC**
