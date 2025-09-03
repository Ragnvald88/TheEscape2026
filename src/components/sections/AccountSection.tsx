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

  const eligibleFriends = ['Ronald', 'Yoram', 'Roel', 'Bram', 'Andre']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (mode === 'register') {
      if (!email || !name || !password) {
        setError('Please fill in all fields')
        return
      }

      // Check if name is in eligible list
      if (!eligibleFriends.includes(name)) {
        setError('Only the original 5 friends can register')
        return
      }
    } else {
      if (!email || !password) {
        setError('Please enter your email and password')
        return
      }
    }

    // For now, just show success - will integrate with Supabase later
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
      setPassword('')
      setName('')
    }, 3000)
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-display font-bold text-gray-900 mb-4">
            Join the Adventure
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Exclusive access for the original crew only
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Eligible Friends List */}
          <div className="card-premium">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <User className="w-6 h-6" />
              The Exclusive Five
            </h3>
            
            <div className="space-y-4">
              {eligibleFriends.map((friend, index) => (
                <div key={friend} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black text-white rounded-full flex items-center justify-center font-bold">
                    {friend[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{friend}</p>
                    <p className="text-sm text-gray-500">Voting Member #{index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Only these 5 friends can create accounts. This ensures our trip remains exclusive.
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
                Register
              </button>
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  mode === 'login' 
                    ? 'bg-white text-black' 
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                Login
              </button>
            </div>
            
            <h3 className="text-2xl font-bold mb-6">
              {mode === 'register' ? 'Create Your Account' : 'Welcome Back'}
            </h3>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-none appearance-none cursor-pointer"
                      >
                        <option value="">Select your name</option>
                        {eligibleFriends.map(friend => (
                          <option key={friend} value={friend}>{friend}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-none"
                    />
                  </div>
                </div>
                
                {error && (
                  <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  {mode === 'register' ? 'Create Account' : 'Login'}
                </button>
                
                <p className="text-xs text-gray-400 text-center">
                  {mode === 'register' 
                    ? "You'll be able to vote when the platform opens on October 1st"
                    : "Access your voting dashboard and trip details"
                  }
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">
                  {mode === 'register' ? 'Account Created!' : 'Welcome Back!'}
                </h4>
                <p className="text-gray-400">
                  {mode === 'register' 
                    ? "You're all set for October 1st"
                    : 'Redirecting to your dashboard...'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}