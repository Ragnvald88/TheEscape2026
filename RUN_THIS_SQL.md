# 🚨 BELANGRIJK: Database Setup voor Account Creation

## Stap 1: Ga naar je Supabase SQL Editor
👉 **KLIK HIER**: https://supabase.com/dashboard/project/ydyrlmlnoscbflqlbcdk/sql/new

## Stap 2: Kopieer & Plak deze SQL
```sql
-- Maak profiles tabel voor gebruikers
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  is_crew_member BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Profiles viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, is_crew_member)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'name',
    new.email,
    true
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## Stap 3: Klik "RUN" 
Rechtsonder in de SQL editor

## Stap 4: Email Templates Instellen

1. Ga naar: https://supabase.com/dashboard/project/ydyrlmlnoscbflqlbcdk/auth/templates
2. Klik op "Confirm signup"
3. Vervang met:
```html
<h2>Welkom bij De Ontsnapping 2026!</h2>
<p>Hoi {{ .Data.name }},</p>
<p>Klik hier om je account te activeren:</p>
<a href="{{ .ConfirmationURL }}">Activeer Account</a>
```
4. Klik "Save"

## Stap 5: SMTP voor Email (OPTIONEEL maar aangeraden)
Voor echte emails naar Ronald:

1. Ga naar: https://supabase.com/dashboard/project/ydyrlmlnoscbflqlbcdk/settings/auth
2. Scroll naar "SMTP Settings"
3. Enable "Custom SMTP"
4. Gebruik bijvoorbeeld SendGrid of Resend:
   - Host: smtp.sendgrid.net
   - Port: 587
   - Username: apikey
   - Password: [je SendGrid API key]
   - Sender email: noreply@theescape2026.nl

## ✅ KLAAR!

Test het nu:
1. Ga naar http://localhost:3002
2. Klik "Doe Mee Aan Het Avontuur"
3. Registreer met een van de namen: Ronald, Yoram, Roel, Bram, André
4. Check je email voor verificatie!