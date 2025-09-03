# TheEscape 2026 - AI Coding Assistant Configuration

## Project Overview
Interactive travel planning website for 5 friends voting on European destinations for June 2026 holiday.
- **Phase 1**: Countdown timer to October 1st launch (PRIORITY)
- **Phase 2**: Authentication + voting system
- **Phase 3**: Photo galleries + trip planning

## Tech Stack
- **Framework**: Next.js 15.5 (App Router)
- **Language**: TypeScript 5.5
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: Supabase (PostgreSQL + Auth + Realtime)
- **Animations**: GSAP 3.12 + Framer Motion
- **Maps**: Leaflet.js + OpenStreetMap
- **State**: Zustand + React Query v5
- **Forms**: React Hook Form + Zod
- **Media**: Cloudinary (images) + PhotoSwipe (galleries)
- **Icons**: Lucide React
- **Deployment**: Vercel (frontend) + Supabase (backend)

## Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login/register)
│   ├── (dashboard)/       # Protected routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # shadcn components (Button, Card, etc)
│   ├── features/          # Feature components (Map, Countdown, etc)
│   └── layout/            # Layout components (Header, Footer)
├── lib/
│   ├── supabase/          # Supabase client + types
│   ├── animations/        # GSAP animations
│   └── utils.ts           # cn() utility + helpers
├── hooks/                 # Custom React hooks
├── stores/                # Zustand stores
└── types/                 # TypeScript types
```

## Available MCP Tools
- **desktop-commander**: File operations, process management (prefix: DC:)
- **playwright**: Browser testing, E2E tests
- **web_search/web_fetch**: Documentation lookup, inspiration
- **Canva**: Asset creation, graphics generation
- **context7**: Library documentation (Next.js, React, Supabase)
- **Hugging Face**: Background image generation
- **Filesystem**: Direct file operations

## Commands
```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build           # Production build
npm run type-check      # TypeScript validation
npm run lint            # ESLint check
npm run format          # Prettier formatting

# Component Management
npx shadcn@latest add   # Add shadcn component
npx supabase gen types  # Generate TypeScript types

# Testing
npm run test            # Jest unit tests
npm run e2e             # Playwright E2E tests
```

## Code Style Rules
- **Imports**: Use ES modules, no CommonJS (require)
- **Components**: Function components with arrow syntax
- **Naming**: PascalCase components, camelCase functions
- **State**: Zustand for global, useState for local
- **Async**: Always use async/await over .then()
- **CSS**: Tailwind only, no inline styles
- **Files**: Max 200 lines per file, extract if larger

## Component Patterns
```tsx
// ✅ Correct pattern
export const ComponentName = ({ prop1, prop2 }: ComponentProps) => {
  return <div className="flex gap-4">...</div>
}

// ❌ Never use
function ComponentName(props) { ... }
export default ComponentName
```

## Supabase Patterns
- Always use Row Level Security (RLS)
- Type all queries with generated types
- Handle errors with toast notifications
- Use real-time subscriptions for voting

## Animation Guidelines
- GSAP for complex sequences (countdown, reveals)
- Framer Motion for micro-interactions
- Always use will-change for animated elements
- Prefer transform over position changes
- Mobile: Reduce or disable animations

## File Naming Convention
```
components/features/MapVoting.tsx    # Components: PascalCase
hooks/useCountdown.ts                # Hooks: use prefix
lib/supabase/client.ts              # Utilities: camelCase
types/destination.ts                # Types: lowercase
app/api/vote/route.ts               # API: lowercase folders
```

## Git Workflow
- Branch naming: `feature/component-name` or `fix/issue-description`
- Commit format: `type: description` (feat/fix/docs/style/refactor)
- Always commit after completing a component
- Never commit .env.local or sensitive data

## Testing Requirements
- Unit test all utility functions
- E2E test critical paths (login, voting)
- Test responsive breakpoints: 375px, 768px, 1024px
- Accessibility: WCAG 2.1 AA compliance

## Performance Targets
- Lighthouse score: >90 all categories
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Bundle size: <200KB initial
- Images: WebP/AVIF with lazy loading

## Security Rules
- Environment variables in .env.local only
- Never expose Supabase service key
- Validate all user inputs with Zod
- Sanitize map markers data
- Rate limit API routes (5 req/sec)

## Documentation Standards
```tsx
/**
 * @description Brief description
 * @param {Type} param - Parameter description
 * @returns {Type} Return description
 */
```

## Error Handling
- Use try/catch for async operations
- Show user-friendly toast messages
- Log errors to console in development
- Report to Sentry in production

## Responsive Design
- Mobile-first approach
- Breakpoints: sm:640px md:768px lg:1024px xl:1280px
- Test on actual devices, not just browser resize

## Do NOT
- Edit files in node_modules
- Use any/unknown TypeScript types
- Import entire libraries (use tree-shaking)
- Hardcode API keys or secrets
- Create files >300 lines
- Use localStorage for sensitive data
- Skip error boundaries
- Ignore TypeScript errors

## Phase 1 Priorities (Countdown - Due Oct 1st)
1. Basic Next.js setup with TypeScript
2. Countdown component with GSAP animations
3. Responsive hero section
4. Deploy to Vercel
5. Custom domain setup

## Phase 2 Features (Oct-Nov)
1. Supabase authentication
2. Friend invitation system (5 users)
3. Interactive Leaflet map
4. Voting mechanism with real-time updates
5. Vote history and analytics

## Phase 3 Enhancements (December)
1. Photo gallery with Cloudinary
2. Trip timeline component
3. Advanced GSAP scroll animations
4. PWA capabilities
5. Performance optimization

## MCP Usage Guidelines
### File Operations (desktop-commander/Filesystem)
- Use for creating project structure
- Batch file operations with desktop-commander
- Single file reads with Filesystem

### Testing (playwright)
```javascript
// Always use data-testid attributes
<button data-testid="vote-button">Vote</button>

// E2E test pattern
await page.goto('/');
await page.click('[data-testid="vote-button"]');
```

### Documentation (context7)
- Resolve library IDs first: `resolve-library-id`
- Then fetch docs: `get-library-docs`
- Libraries: next, react, supabase, leaflet, gsap

### Asset Creation (Canva)
- Logo and brand assets
- Social media previews
- Loading animations

### Research (web_search)
- Latest Next.js 15 patterns
- Supabase best practices
- GSAP animation examples
- Performance optimization techniques

## Common Fixes
- **Hydration errors**: Check for client-only code in SSR
- **TypeScript errors**: Run `npm run type-check`
- **Build failures**: Clear .next folder and node_modules
- **Supabase connection**: Check NEXT_PUBLIC_SUPABASE_URL

## Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_SITE_URL=https://theescape2026.nl
```

## Quick Start for Claude Code
1. Read this entire file first
2. Check project structure with `DC: list_directory .`
3. Initialize if needed: `npm create next-app@latest . --typescript --tailwind --app`
4. For any library docs: Use context7 MCP
5. For testing: Use playwright MCP
6. Always commit after major changes

## Remember
- You're building for 5 friends, not millions - optimize accordingly
- October 1st deadline is non-negotiable for countdown
- Keep it simple, make it beautiful
- Mobile experience is crucial (60%+ usage)
- This is about creating excitement for the trip