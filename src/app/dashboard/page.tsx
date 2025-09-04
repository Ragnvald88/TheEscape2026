'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User, LogOut, MapPin, Users, Calendar, Trophy, Vote, Clock, CheckCircle } from 'lucide-react'

interface Destination {
  id: string
  name: string
  emoji: string
  description: string
  votes: number
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [votedFor, setVotedFor] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Popular destinations to vote for
  const popularDestinations: Destination[] = [
    { id: '1', name: 'Barcelona', emoji: '🏖️', description: 'Gaudi, tapas & strand', votes: 0 },
    { id: '2', name: 'Lissabon', emoji: '🌊', description: 'Fado, surfen & pastéis', votes: 0 },
    { id: '3', name: 'Praag', emoji: '🍺', description: 'Bier & bruggen', votes: 0 },
    { id: '4', name: 'Berlijn', emoji: '🎨', description: 'Kunst, geschiedenis & techno', votes: 0 },
    { id: '5', name: 'Kopenhagen', emoji: '🚴', description: 'Hygge & nieuwe Noordse keuken', votes: 0 },
    { id: '6', name: 'Reykjavik', emoji: '🌋', description: 'Geisers & Blue Lagoon', votes: 0 },
    { id: '7', name: 'Edinburgh', emoji: '🥃', description: 'Whisky & Highlands', votes: 0 },
    { id: '8', name: 'Porto', emoji: '🍷', description: 'Port wijn & azulejos', votes: 0 },
  ]

  useEffect(() => {
    checkUser()
    setDestinations(popularDestinations)
    
    // Countdown timer
    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-10-01T00:00:00')
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  async function checkUser() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/')
      return
    }
    
    setUser(user)
    setLoading(false)
  }

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleVote = (destinationId: string) => {
    setVotedFor(destinationId)
    // TODO: Save vote to database
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Laden...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6" />
              <h1 className="text-xl font-bold">De Ontsnapping 2026 - Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welkom, {user?.user_metadata?.name || user?.email?.split('@')[0]}!
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Uitloggen
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welkom bij het stemplatform!
          </h2>
          <p className="text-lg opacity-90">
            Het platform opent officieel op 1 oktober 2025. Je kunt alvast rondkijken en je voorkeuren aangeven.
          </p>
          
          {/* Countdown */}
          <div className="mt-6 flex gap-4">
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">{timeLeft.days}</div>
              <div className="text-xs uppercase">Dagen</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">{timeLeft.hours}</div>
              <div className="text-xs uppercase">Uren</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">{timeLeft.minutes}</div>
              <div className="text-xs uppercase">Min</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">{timeLeft.seconds}</div>
              <div className="text-xs uppercase">Sec</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Voting Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Vote className="w-6 h-6" />
                Stem op je favoriete bestemming
              </h3>
              
              <div className="grid gap-4">
                {destinations.map((dest) => (
                  <div 
                    key={dest.id}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      votedFor === dest.id 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                    onClick={() => handleVote(dest.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{dest.emoji}</span>
                        <div>
                          <h4 className="font-bold text-lg">{dest.name}</h4>
                          <p className="text-sm text-gray-600">{dest.description}</p>
                        </div>
                      </div>
                      {votedFor === dest.id && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                    </div>
                    {/* Vote bar */}
                    <div className="mt-3">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                          style={{ width: `${Math.random() * 80 + 10}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Tip:</strong> Het stemmen opent officieel op 1 oktober. 
                  Je kunt je keuze dan nog aanpassen tot de deadline.
                </p>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Trip Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Reis Informatie
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Periode:</span>
                  <span className="font-medium">Juni 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-orange-500">Stemming binnenkort</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deelnemers:</span>
                  <span className="font-medium">5 vrienden</span>
                </div>
              </div>
            </div>

            {/* Crew Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Crew Status
              </h3>
              <div className="space-y-3">
                {['Ronald', 'Yoram', 'Roel', 'Bram', 'André'].map((friend) => (
                  <div key={friend} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {friend[0]}
                      </div>
                      <span className="text-sm font-medium">{friend}</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      Actief
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Previous Trips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Vorige Reizen
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🍀</span>
                  <div>
                    <div className="font-medium">Dublin 2023</div>
                    <div className="text-xs text-gray-500">Springsteen @ Croke Park</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇮🇹</span>
                  <div>
                    <div className="font-medium">Genua 2024</div>
                    <div className="text-xs text-gray-500">Concert geannuleerd</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎸</span>
                  <div>
                    <div className="font-medium">San Siro 2025</div>
                    <div className="text-xs text-gray-500">The Boss finale</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}