import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

const ELIGIBLE_FRIENDS = ['Ronald', 'Yoram', 'Roel', 'Bram', 'André']
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ronaldhoogenberg@hotmail.com'

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    // Validate that the name is in the eligible list
    if (!ELIGIBLE_FRIENDS.includes(name)) {
      return NextResponse.json(
        { error: 'Alleen de originele 5 vrienden kunnen registreren' },
        { status: 403 }
      )
    }

    const supabase = createClient()

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          is_crew_member: true,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/welcome`,
      }
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    // TODO: Send notification email to Ronald
    // For now, we'll log it
    console.log(`New registration: ${name} (${email}) - Notify admin: ${ADMIN_EMAIL}`)

    return NextResponse.json({
      success: true,
      message: 'Registratie succesvol! Check je email voor verificatie.',
      requiresEmailConfirmation: true
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij de registratie' },
      { status: 500 }
    )
  }
}