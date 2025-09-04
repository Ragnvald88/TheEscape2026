# TheEscape2026 - Manual Setup Requirements

## ✅ Completed Automatically
- ✅ Project structure and dependencies installed
- ✅ TypeScript configuration
- ✅ Tailwind CSS setup
- ✅ Next.js 15.5 with App Router
- ✅ SEO meta tags and Open Graph configuration
- ✅ PWA manifest created
- ✅ Error boundaries implemented
- ✅ Mobile responsive fixes applied
- ✅ Development server running on port 3000

## 🔧 Manual Setup Required

### 1. Supabase Configuration (PRIORITY)
You need to set up your Supabase account and database:

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Sign up for a free account
   - Create a new project (name: "theescape2026")

2. **Get Your Credentials**
   - Go to Settings → API in your Supabase dashboard
   - Copy your Project URL and anon/public key

3. **Update Environment Variables**
   ```bash
   # Edit .env.local file
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

4. **Run Database Setup**
   - Open SQL editor in Supabase dashboard
   - Copy and run the SQL from `RUN_THIS_SQL.md`

### 2. Cloudinary Setup (For Image Management)
1. **Create Account**
   - Sign up at https://cloudinary.com
   - Get your Cloud Name from dashboard

2. **Update Environment**
   ```bash
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   ```

### 3. Domain Configuration
1. **Vercel Deployment**
   - Connect GitHub repo to Vercel
   - Deploy with automatic builds

2. **Custom Domain**
   - Add domain "theescape2026.nl" in Vercel dashboard
   - Update DNS records at your domain registrar

### 4. Create Required Assets
You need to create these image files and place them in `/public`:

1. **PWA Icons**
   - `/public/icon-192.png` - 192x192px app icon
   - `/public/icon-512.png` - 512x512px app icon
   - `/public/apple-touch-icon.png` - 180x180px Apple icon
   - `/public/favicon.ico` - 16x16 and 32x32 favicon

2. **Open Graph Image**
   - `/public/og-image.jpg` - 1200x630px social share image

### 5. Friend Photos
Add photos for each friend in `/public/friends/`:
- ronald.jpg
- yoram.jpg
- roel.jpg
- bram.jpg
- andre.jpg

(Or update the URLs in FriendsSection.tsx to use external URLs)

### 6. Map Configuration
The Leaflet map requires destination coordinates. Update `/src/components/sections/MapSection.tsx` with:
- Real destination coordinates
- Custom map markers
- Voting destinations list

### 7. GSAP License (Optional)
For production use with advanced GSAP features:
- Consider GSAP Club GreenSock membership
- Or stick with free features only

### 8. Analytics & Monitoring (Recommended)
1. **Google Analytics**
   ```bash
   NEXT_PUBLIC_GA_ID=your_ga_id
   ```

2. **Sentry Error Tracking**
   ```bash
   NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
   ```

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Supabase credentials configured
- [ ] Database tables created
- [ ] Authentication tested
- [ ] Images optimized and uploaded
- [ ] PWA icons created
- [ ] Domain DNS configured
- [ ] Environment variables set in Vercel
- [ ] SSL certificate active
- [ ] Performance tested (Lighthouse score >90)
- [ ] Mobile responsiveness verified

## 📱 Testing Commands

```bash
# Type checking
npm run type-check

# Build test
npm run build

# Production preview
npm run build && npm run start

# Lighthouse audit
npx lighthouse http://localhost:3000
```

## 🔐 Security Notes

1. **Never commit `.env.local`** - It's already in .gitignore
2. **Use Row Level Security** in Supabase
3. **Validate all user inputs** with Zod schemas
4. **Rate limit API routes** to prevent abuse
5. **Keep dependencies updated** regularly

## 📞 Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vercel Support**: https://vercel.com/support

## 🎯 Priority Order

1. **First**: Set up Supabase (blocks authentication)
2. **Second**: Create image assets (visual experience)
3. **Third**: Deploy to Vercel (go live)
4. **Fourth**: Configure custom domain
5. **Optional**: Analytics, monitoring, optimizations

---

**Note**: The application will work locally without completing all steps, but authentication and data persistence require Supabase setup.