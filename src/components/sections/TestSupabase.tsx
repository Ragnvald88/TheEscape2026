'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react'

export default function TestSupabase() {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Auto-test on load
    testConnection()
  }, [])

  const testConnection = async () => {
    setStatus('testing')
    setMessage('Supabase connectie testen...')

    try {
      // Check if environment variables are set (Next.js will replace these at build time)
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

      if (!url || url === 'your_supabase_url_here' || !key || key === 'your_supabase_anon_key_here') {
        setStatus('error')
        setMessage('⚠️ Supabase is NIET geconfigureerd! Volg de instructies in SUPABASE_SETUP.md')
        return
      }

      // Try to connect to Supabase
      const response = await fetch(`${url}/rest/v1/`, {
        headers: {
          'apikey': key,
        }
      })

      if (response.ok) {
        setStatus('success')
        setMessage('✅ Supabase is correct geconfigureerd en klaar voor gebruik!')
        // Hide after 3 seconds if successful
        setTimeout(() => {
          setIsVisible(false)
        }, 3000)
      } else {
        setStatus('error')
        setMessage('❌ Supabase credentials zijn ingesteld maar connection faalt. Check je keys.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('❌ Kan niet verbinden met Supabase. Check SUPABASE_SETUP.md voor instructies.')
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50" data-testid="supabase-status">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm">
        <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          Supabase Status
        </h3>
        
        {status === 'idle' && (
          <div>
            <p className="text-xs text-gray-600 mb-3">
              Test of account creation echt werkt
            </p>
            <button
              onClick={testConnection}
              className="text-xs bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
            >
              Test Connectie
            </button>
          </div>
        )}

        {status === 'testing' && (
          <p className="text-xs text-gray-600">{message}</p>
        )}

        {status === 'success' && (
          <div className="text-xs text-green-600 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>{message}</div>
          </div>
        )}

        {status === 'error' && (
          <div className="text-xs text-red-600">
            <div className="flex items-start gap-2 mb-2">
              <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>{message}</div>
            </div>
            <div className="text-gray-600 mt-2">
              <p className="font-semibold">Wat nu?</p>
              <ol className="list-decimal list-inside space-y-1 mt-1">
                <li>Open SUPABASE_SETUP.md</li>
                <li>Volg alle stappen</li>
                <li>Update .env.local</li>
                <li>Restart de server</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}