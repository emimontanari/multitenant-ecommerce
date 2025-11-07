# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A multitenant e-commerce platform built with Next.js 15, Payload CMS v3, and tRPC. The application uses MongoDB for data persistence and follows a modular, feature-based architecture.

## Core Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Package Manager**: Bun (note: lockfile is `bun.lockb`)
- **CMS**: Payload CMS v3 with MongoDB adapter
- **API Layer**: tRPC v11 for type-safe APIs
- **Database**: MongoDB (via @payloadcms/db-mongodb)
- **UI**: Tailwind CSS 4 + shadcn/ui components (Radix UI primitives)
- **State Management**: TanStack Query (React Query) v5
- **Type Safety**: TypeScript with strict mode enabled

## Development Commands

```bash
# Development
bun dev                    # Start Next.js dev server on localhost:3000

# Build & Production
bun run build              # Build for production
bun start                  # Start production server

# Code Quality
bun run lint               # Run ESLint

# Database Operations
bun run db:fresh           # Reset database (runs Payload migrations from scratch)
bun run db:seed            # Seed database with predefined categories (runs src/seed.ts)

# Payload CMS
bun run generate:types     # Generate TypeScript types from Payload collections
```

## Architecture & Code Organization

### Route Structure (Next.js App Router)

The app uses **route groups** to organize different parts of the application:

- **`src/app/(app)/`** - Main application routes
  - `(home)/` - Nested route group for home-related pages (about, contact, features, pricing, search-filters)
  - `api/trpc/[trpc]/` - tRPC API endpoint (dynamic route handler)
  - `layout.tsx` - Root layout with TRPCReactProvider and global styles

- **`src/app/(payload)/`** - Payload CMS admin interface
  - `admin/[[...segments]]/` - Payload admin panel (catch-all route)
  - `api/[...slug]/` - Payload REST API endpoints
  - `api/graphql/` - Payload GraphQL API
  - `layout.tsx` - Separate layout for Payload admin

Route groups (directories with parentheses) don't affect the URL structure but help organize code with different layouts.

### tRPC Integration

tRPC provides a type-safe API layer between client and server:

1. **Router Definition** (`src/trpc/routers/_app.ts`)
   - Main app router that combines feature routers
   - Exports `AppRouter` type used for client-side type inference

2. **Initialization** (`src/trpc/init.ts`)
   - Creates tRPC context with Payload CMS instance
   - Defines `baseProcedure` that injects Payload as `ctx.db`
   - All procedures use `baseProcedure` to access the database

3. **Client Setup** (`src/trpc/client.tsx`)
   - Client-side provider wrapping React Query
   - Exports `TRPCReactProvider` used in root layout
   - Uses HTTP batch link for efficient request batching

4. **Server Setup** (`src/trpc/server.tsx`)
   - Server-side tRPC client for use in Server Components
   - Enables direct API calls without HTTP overhead

5. **API Route** (`src/app/(app)/api/trpc/[trpc]/route.ts`)
   - Next.js route handler that connects tRPC router to HTTP
   - Handles both GET and POST requests

### Module-Based Organization

Features are organized in `src/modules/` with a consistent structure:

```
src/modules/{feature}/
├── types.ts              # TypeScript interfaces/types
├── server/
│   └── procedures.tsx    # tRPC router with server-side logic
└── client/               # (when needed) Client components and hooks
```

**Example**: Categories module
- `src/modules/categories/types.ts` - TypeScript definitions
- `src/modules/categories/server/procedures.tsx` - tRPC router with `getMany` query
  - Uses `baseProcedure.query()` to define queries
  - Accesses Payload via `ctx.db.find()`, `ctx.db.create()`, etc.

### Payload CMS Collections

Collections are defined in `src/collections/` and configured in `src/payload.config.ts`:

- **Categories** (`src/collections/Categories.ts`)
  - Hierarchical structure with self-referencing `parent` field
  - Virtual `subcategories` join field for reverse relationships
  - Fields: name, slug (unique, indexed), color, parent

- **Users** (`src/collections/Users.ts`)
  - Built-in authentication with `auth: true`
  - Used as admin user collection

- **Media** (`src/collections/Media.ts`)
  - File uploads with Sharp image processing

After modifying collections, run `bun run generate:types` to update `src/payload-types.ts`.

### Path Aliases

TypeScript path aliases configured in `tsconfig.json`:

- `@/*` → `src/*`
- `@payload-config` → `src/payload.config.ts`

Always use path aliases for imports (e.g., `@/lib/utils` instead of relative paths).

## Key Patterns

### Adding a New Feature Module

1. Create directory structure: `src/modules/{feature}/`
2. Define types in `types.ts`
3. Create tRPC router in `server/procedures.tsx` using `baseProcedure`
4. Add router to `src/trpc/routers/_app.ts`
5. Use in components via `useTRPC()` hook from `@/trpc/client`

### Adding a New Payload Collection

1. Create collection config in `src/collections/{Name}.ts`
2. Add to collections array in `src/payload.config.ts`
3. Run `bun run generate:types` to generate TypeScript types
4. Run `bun run db:fresh` if schema changes require migration
5. Update `src/seed.ts` if collection needs seeding

### Database Seeding

The seed script (`src/seed.ts`) uses upsert logic (create or update):
- Searches for existing records by slug
- Updates if found, creates if not found
- Useful for idempotent seeding during development

## Environment Variables

Required environment variables (create `.env.local`):

```bash
DATABASE_URI=          # MongoDB connection string
PAYLOAD_SECRET=        # Secret key for Payload CMS (generate random string)
NEXT_PUBLIC_APP_URL=   # (Optional) Public app URL for SSR tRPC calls
```

## shadcn/ui Components

UI components are in `src/components/ui/` (managed by shadcn/ui CLI):
- Pre-configured with Tailwind CSS and Radix UI
- See `components.json` for configuration
- Add components via: `npx shadcn@latest add {component}`

## Important Notes

- **Bun is the package manager** - use `bun install`, not npm/pnpm/yarn
- **Payload types are auto-generated** - don't manually edit `src/payload-types.ts`
- **tRPC context includes Payload** - access database via `ctx.db` in procedures
- **Route groups** - (app) and (payload) don't appear in URLs, only organize code
- **Strict TypeScript** - project uses strict mode, ensure type safety
