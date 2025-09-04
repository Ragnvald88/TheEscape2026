'use client'

import { useState } from 'react'
import { User, Mail, Lock, Check, AlertCircle } from 'lucide-react'

export default function AccountSection() {
  const [mode, setMode] = useState<'register' | 'login'>('register')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const eligibleFriends = ['Ronald', 'Yoram', 'Roel', 'Bram', 'André']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (mode === 'register') {
      if (!email || !name || !password) {
        setError('Vul alle velden in')
        return
      }

      // Check if name is in eligible list
      if (!eligibleFriends.includes(name)) {
        setError('Alleen de originele 5 vrienden kunnen registreren')
        return
      }

      try {
        // Call the registration API
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            name
          })
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.error || 'Registratie mislukt')
          return
        }

        setIsSubmitted(true)
        
        // Keep success message visible longer for registration
        setTimeout(() => {
          setIsSubmitted(false)
          setEmail('')
          setPassword('')
          setName('')
        }, 5000)

      } catch (err) {
        setError('Er ging iets mis. Probeer het later opnieuw.')
        console.error('Registration error:', err)
      }
    } else {
      // Login logic
      if (!email || !password) {
        setError('Vul je email en wachtwoord in')
        return
      }
      
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password
          })
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.error || 'Inloggen mislukt')
          return
        }

        setIsSubmitted(true)
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 2000)

      } catch (err) {
        setError('Er ging iets mis. Probeer het later opnieuw.')
        console.error('Login error:', err)
      }
    }
  }

  return (
    <section id="account-section" className="section-padding bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-display font-bold text-gray-900 mb-4">
            Doe Mee Aan Het Avontuur
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Exclusieve toegang voor de originele bemanning
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Eligible Friends List */}
          <div className="card-premium">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <User className="w-6 h-6" />
              De Exclusieve Vijf
            </h3>
            
            <div className="space-y-4">
              {eligibleFriends.map((friend, index) => (
                <div key={friend} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black text-white rounded-full flex items-center justify-center font-bold">
                    {friend[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{friend}</p>
                    <p className="text-sm text-gray-500">Stemlid #{index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Alleen deze 5 vrienden kunnen accounts aanmaken. Dit zorgt ervoor dat onze reis exclusief blijft.
              </p>
            </div>
          </div>

          {/* Login/Register Form */}
          <div className="card-premium bg-black text-white">
            {/* Tab Switcher */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setMode('register')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  mode === 'register' 
                    ? 'bg-white text-black' 
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                Registreren
              </button>
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  mode === 'login' 
                    ? 'bg-white text-black' 
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                Inloggen
              </button>
            </div>
            
            <h3 className="text-2xl font-bold mb-6">
              {mode === 'register' ? 'Maak Je Account' : 'Welkom Terug'}
            </h3>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label htmlFor="name-select" className="block text-sm font-medium mb-2">
                      Je Naam
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="name-select"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-label="Selecteer je naam"
                        className="w-full pl-10 pr-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Kies je naam...</option>
                        {eligibleFriends.map(friend => (
                          <option key={friend} value={friend}>{friend}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="email-input" className="block text-sm font-medium mb-2">
                    E-mailadres
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=""
                      aria-label="E-mailadres"
                      className="w-full pl-10 pr-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password-input" className="block text-sm font-medium mb-2">
                    Wachtwoord
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password-input"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder=""
                      aria-label="Wachtwoord"
                      className="w-full pl-10 pr-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 placeholder-gray-400"
                    />
                  </div>
                </div>
                
                {error && (
                  <div className="form-error text-red-400 text-sm bg-red-900/20 p-3 rounded-lg" data-testid="form-error" role="alert">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-4 focus:ring-white/50"
                >
                  <span className="hidden sm:inline">
                    {mode === 'register' ? 'Account Aanmaken' : 'Inloggen'}
                  </span>
                  <span className="sm:hidden">
                    {mode === 'register' ? 'Aanmelden' : 'Inloggen'}
                  </span>
                </button>
                
                <p className="text-xs text-gray-400 text-center">
                  {mode === 'register' 
                    ? "Je kunt stemmen wanneer het platform opent op 1 oktober"
                    : "Toegang tot je stem-dashboard en reisdetails"
                  }
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">
                  {mode === 'register' ? 'Account Aangemaakt!' : 'Welkom Terug!'}
                </h4>
                <p className="text-gray-400 mb-3">
                  {mode === 'register' 
                    ? "Check je email voor de verificatie link!"
                    : 'Je wordt doorgestuurd naar het dashboard...'
                  }
                </p>
                {mode === 'register' ? (
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>📧 Verificatie email verzonden</p>
                    <p>📬 Ronald krijgt een notificatie</p>
                    <p>✅ Je bent klaar voor 1 oktober!</p>
                  </div>
                ) : (
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>🚀 Welkom terug!</p>
                    <p>📊 Dashboard wordt geladen...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}