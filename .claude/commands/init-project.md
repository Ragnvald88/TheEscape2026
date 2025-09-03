# Initialize TheEscape 2026 Project

Initialize the complete project structure with all dependencies and configurations for TheEscape 2026.

## Steps:
1. Create Next.js 15 project with TypeScript and Tailwind
2. Install all required dependencies (GSAP, Framer Motion, Supabase, etc.)
3. Setup project folder structure
4. Initialize shadcn/ui with New York style
5. Create base configuration files
6. Setup Supabase client
7. Create initial countdown component
8. Setup Git repository

## Commands to execute:

```bash
# Create Next.js project if not exists
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"

# Install core dependencies
npm install @supabase/supabase-js @supabase/ssr
npm install gsap framer-motion
npm install zustand @tanstack/react-query
npm install react-hook-form @hookform/resolvers zod
npm install leaflet react-leaflet @types/leaflet
npm install photoswipe lucide-react
npm install next-themes class-variance-authority clsx tailwind-merge
npm install --save-dev @types/node

# Initialize shadcn/ui
npx shadcn@latest init -y

# Add essential shadcn components
npx shadcn@latest add button card dialog toast form
```

## File structure to create:
- src/components/features/Countdown.tsx
- src/components/layout/Header.tsx
- src/lib/supabase/client.ts
- src/lib/utils.ts (if not created by shadcn)
- src/stores/app.store.ts
- src/types/index.ts
- .env.local (template)

Remember to update NEXT_PUBLIC environment variables!