# Deploy to Production

Deploy TheEscape 2026 to Vercel with custom domain configuration.

## Pre-deployment Checklist:
- [ ] All tests passing
- [ ] Environment variables set
- [ ] Build succeeds locally
- [ ] Images optimized
- [ ] SEO meta tags added
- [ ] Performance audit >90

## Deployment Steps:

### 1. Vercel Setup:
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### 2. Environment Variables (Vercel Dashboard):
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_name
NEXT_PUBLIC_SITE_URL=https://theescape2026.nl
```

### 3. Custom Domain Setup:
- Add domain in Vercel dashboard
- Update DNS records:
  - A Record: 76.76.21.21
  - CNAME: cname.vercel-dns.com
- SSL certificate auto-provisioned

### 4. Performance Optimizations:
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
}
```

### 5. Post-deployment:
- Test all features on production
- Monitor Core Web Vitals
- Setup error tracking (Sentry)
- Configure analytics

## Rollback if needed:
```bash
vercel rollback
```

## Dutch Hosting Alternative (if preferred):
- Cloud86: €1.99/month
- Setup via cPanel
- Node.js 18+ support required
- PM2 for process management

Remember: October 1st deadline!