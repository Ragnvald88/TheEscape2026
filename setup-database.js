const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupDatabase() {
  console.log('🚀 Setting up Supabase database...')
  
  try {
    // Read the SQL migration
    const fs = require('fs')
    const path = require('path')
    const migrationSQL = fs.readFileSync(
      path.join(__dirname, 'supabase/migrations/001_create_users_table.sql'),
      'utf8'
    )

    // Execute the migration
    const { error } = await supabase.rpc('exec_sql', {
      sql: migrationSQL
    }).single()

    if (error && !error.message.includes('already exists')) {
      throw error
    }

    console.log('✅ Database tables created successfully!')
    
    // Add some test destinations
    const destinations = [
      { name: 'Barcelona', emoji: '🏖️', description: 'Gaudi, tapas & strand' },
      { name: 'Lissabon', emoji: '🌊', description: 'Fado, surfen & pastéis' },
      { name: 'Praag', emoji: '🍺', description: 'Bier & bruggen' },
      { name: 'Berlijn', emoji: '🎨', description: 'Kunst, geschiedenis & techno' },
      { name: 'Kopenhagen', emoji: '🚴', description: 'Hygge & nieuwe Noordse keuken' }
    ]

    const { error: destError } = await supabase
      .from('destinations')
      .upsert(destinations, { onConflict: 'name' })

    if (destError && !destError.message.includes('does not exist')) {
      console.log('⚠️  Could not add destinations (table might not exist yet)')
    } else {
      console.log('✅ Sample destinations added!')
    }

    console.log('\n🎉 Database setup complete!')
    console.log('👉 You can now register accounts on the website!')
    
  } catch (error) {
    console.error('❌ Error setting up database:', error.message)
    console.log('\n📝 Manual setup required:')
    console.log('1. Go to https://supabase.com/dashboard/project/ydyrlmlnoscbflqlbcdk/sql')
    console.log('2. Copy the SQL from supabase/migrations/001_create_users_table.sql')
    console.log('3. Run it in the SQL editor')
  }
}

setupDatabase()