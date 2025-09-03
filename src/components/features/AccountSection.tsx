'use client'

import { useState } from 'react'
import { User, Mail, Check, AlertCircle } from 'lucide-react'

export const AccountSection = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !name) {
      setError('Please fill in all fields')
      return
    }

    // For now, just show success - will integrate with Supabase later
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
      setName('')
    }, 3000)
  }

  const eligibleFriends = [
    'Ronald', 'Friend 2', 'Friend 3', 'Friend 4', 'Friend 5'
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Reserve Your Spot
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Only the original 5 friends can participate in the voting
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <User className="w-6 h-6" />
              Eligible Participants
            </h3>
            
            <div className="space-y-3">
              {eligibleFriends.map((friend, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{friend}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Only these 5 friends can create accounts and vote. This ensures our trip remains an intimate adventure among close friends.
              </p>
            </div>
          </div>

          <div className="bg-black text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">
              Create Your Account
            </h3>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full pl-10 pr-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-none"
                    />
                  </div>
                </div>
                
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
                
                {error && (
                  <div className="text-red-400 text-sm">{error}</div>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Reserve My Spot
                </button>
                
                <p className="text-xs text-gray-400 text-center">
                  You'll receive login credentials when voting opens on October 1st
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Spot Reserved!</h4>
                <p className="text-gray-400">
                  We'll email you when voting opens
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}