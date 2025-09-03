# 🚀 QUICK START GUIDE - TheEscape 2026

## Start Here! (5 minutes to running app)

### 1. Initialize Project with Claude Code:
```bash
cd /Users/macbookpro_ronald/Documents/Personal/03_Development/TheEscape2026
claude /init-project
```

### 2. Or Manual Setup:
```bash
# Create Next.js app
npx create-next-app@latest . --typescript --tailwind --app --src-dir

# Install all dependencies
npm install @supabase/supabase-js gsap framer-motion zustand @tanstack/react-query leaflet react-leaflet lucide-react next-themes

# Initialize shadcn
npx shadcn@latest init -y

# Add core components
npx shadcn@latest add button card toast dialog
```

### 3. Start Development:
```bash
npm run dev
# Open http://localhost:3000
```

---

## 🎨 Create Countdown (Priority #1)

Using Claude Code:
```bash
claude /create-countdown
```

Or ask Claude:
"Create a luxury countdown timer component for October 1st with GSAP flip animations"

---

## 🗺️ Build Map Voting

Using Claude Code:
```bash
claude /create-map-voting
```

Or ask Claude:
"Build the interactive European map voting system with Leaflet and real-time Supabase updates"

---

## 🧪 Test Everything

```bash
# Run E2E tests
claude /test-app

# Or manually
npm run test:e2e:ui
```

---

## 🚀 Deploy to Production

```bash
# Quick deploy
claude /deploy-prod

# Or manually
vercel --prod
```

---

## 📚 Key MCP Commands

### File Operations:
- `DC: list_directory .` - See project structure
- `DC: read_file CLAUDE.md` - Read any file
- `DC: write_file` - Create/edit files

### Documentation:
- `context7: resolve-library-id next` - Get Next.js docs
- `web_search: gsap animation examples` - Find inspiration

### Testing:
- `playwright: browser_navigate http://localhost:3000` - Test locally
- `playwright: browser_take_screenshot` - Capture UI

---

## 🎯 Daily Workflow

1. **Morning:**
   - Check PROJECT_PLAN.md for today's tasks
   - Run `npm run dev`
   - Review yesterday's work

2. **Development:**
   - Use `/commands` for common tasks
   - Commit after each feature
   - Test on mobile frequently

3. **Evening:**
   - Run tests: `npm run test`
   - Deploy preview: `vercel`
   - Update PROJECT_PLAN.md

---

## ⚡ Pro Tips

1. **Always use MCPs:**
   - Faster than manual coding
   - Consistent code style
   - Built-in best practices

2. **Commit Often:**
   ```bash
   git add .
   git commit -m "feat: countdown timer complete"
   ```

3. **Mobile First:**
   - Test at 375px width
   - Reduce animations on mobile
   - Touch targets minimum 44px

4. **Performance:**
   - Images: Use Cloudinary
   - Fonts: Self-host Inter
   - Bundle: <200KB initial

---

## 🆘 Common Issues

### "Module not found"
```bash
rm -rf node_modules
npm install
```

### "Type errors"
```bash
npm run type-check
# Fix any TypeScript issues
```

### "Hydration mismatch"
- Check for client-only code in SSR
- Use `'use client'` directive
- Wrap with Suspense

### "Supabase connection failed"
- Check .env.local variables
- Verify Supabase project is running
- Check network/firewall

---

## 📞 Quick Commands Cheatsheet

| Task | Claude Command | Manual Command |
|------|---------------|----------------|
| Start dev | `claude dev` | `npm run dev` |
| Build | `claude build` | `npm run build` |
| Test | `claude /test-app` | `npm test` |
| Deploy | `claude /deploy-prod` | `vercel --prod` |
| Add component | `claude add button` | `npx shadcn add button` |

---

## 🎯 October 1st Checklist

- [ ] Countdown timer working
- [ ] GSAP animations smooth
- [ ] Mobile responsive
- [ ] Deployed to Vercel
- [ ] Custom domain active
- [ ] Share with friends!

---

**Remember:** Keep it simple, make it beautiful, ship it fast! 🚀

*Questions? Check CLAUDE.md for detailed guidelines*