# Supabase Setup Guide voor The Escape 2026

## ⚠️ BELANGRIJK: Account Creation werkt alleen met echte Supabase setup!

De website heeft nu een basis authenticatie systeem, maar om het **ECHT werkend** te krijgen met emails naar ronaldhoogenberg@hotmail.com, moet je deze stappen volgen:

## 📝 Stap 1: Maak een Supabase Account

1. Ga naar https://supabase.com
2. Klik op "Start your project"
3. Login met GitHub of maak een account
4. Maak een nieuw project aan:
   - **Project name**: TheEscape2026
   - **Database Password**: (bewaar deze goed!)
   - **Region**: Europe (Frankfurt) voor beste performance

## 🔑 Stap 2: Haal je API Keys op

1. Ga naar je project dashboard
2. Klik op "Settings" → "API"
3. Kopieer deze twee keys:
   - **Project URL** (bijv: https://xxxxx.supabase.co)
   - **Anon/Public Key** (een lange string)

## 📋 Stap 3: Update .env.local

Open `.env.local` en vervang de placeholder waardes:

```env
NEXT_PUBLIC_SUPABASE_URL=jouw_project_url_hier
NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw_anon_key_hier
ADMIN_EMAIL=ronaldhoogenberg@hotmail.com
```

## 📧 Stap 4: Setup Email Templates

1. Ga naar "Authentication" → "Email Templates" in Supabase
2. Pas de "Confirm signup" template aan:

```html
<h2>Welkom bij De Ontsnapping 2026!</h2>
<p>Hoi {{ .Data.name }},</p>
<p>Een van de originele 5 is klaar voor het avontuur!</p>
<p>Klik op de link hieronder om je account te bevestigen:</p>
<p><a href="{{ .ConfirmationURL }}">Bevestig je account</a></p>
<p>Tot snel op het platform!</p>
<p>- The Escape 2026 Team</p>
```

## 🔔 Stap 5: Admin Notificaties (OPTIONEEL maar aangeraden)

Voor automatische emails naar Ronald wanneer iemand zich registreert:

### Optie A: Gebruik Supabase Edge Functions (Geavanceerd)
1. Installeer Supabase CLI
2. Maak een edge function voor email notificaties
3. Deploy naar je project

### Optie B: Gebruik een Email Service (Makkelijker)
1. Gebruik Resend.com of SendGrid
2. Voeg API key toe aan .env.local
3. Update de register API route

## ✅ Stap 6: Test de Setup

1. Restart de development server:
```bash
npm run dev
```

2. Ga naar http://localhost:3002
3. Klik op "Doe Mee Aan Het Avontuur"
4. Probeer te registreren met:
   - Naam: Een van de 5 (Ronald, Yoram, Roel, Bram, André)
   - Email: Je test email
   - Wachtwoord: Minimaal 6 karakters

## 🎯 Wat gebeurt er nu?

### MET Supabase Setup:
✅ Account wordt aangemaakt in database
✅ Verificatie email wordt verstuurd
✅ User kan inloggen na email verificatie
✅ Data wordt veilig opgeslagen

### ZONDER Supabase Setup (huidige staat):
❌ Form toont alleen success message
❌ Geen echte account creation
❌ Geen emails
❌ Geen database opslag

## 🚀 Production Deployment

Voor de live versie op theescape2026.nl:
1. Deploy naar Vercel
2. Voeg environment variables toe in Vercel dashboard
3. Update NEXT_PUBLIC_SITE_URL naar https://theescape2026.nl
4. Zet Supabase project op production mode

## 📊 Database Schema (wordt automatisch aangemaakt)

Supabase Auth maakt automatisch een `auth.users` tabel met:
- id (UUID)
- email
- created_at
- user metadata (name, is_crew_member)

## 🆘 Hulp Nodig?

- Supabase Docs: https://supabase.com/docs
- Next.js + Supabase: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

---

**Let op**: Voor een volledig werkende oplossing met admin notificaties naar ronaldhoogenberg@hotmail.com is een echte Supabase setup vereist. De code is er klaar voor, maar heeft de Supabase credentials nodig!