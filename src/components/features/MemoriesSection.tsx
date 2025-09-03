'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Music, Lock, Play } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const memories = [
  {
    id: 1,
    city: 'Dublin',
    year: '2023',
    highlights: ['Temple Bar Nights', 'Guinness Storehouse', 'Irish Whiskey Museum'],
    image: '/memories/dublin.jpg',
    quote: 'Where the journey began with a pint of Guinness',
    type: 'city',
  },
  {
    id: 2,
    city: 'Genua',
    year: '2024',
    highlights: ['Cinque Terre', 'Focaccia Mornings', 'Porto Antico'],
    image: '/memories/genua.jpg',
    quote: 'Italian riviera vibes and endless pesto',
    type: 'city',
  },
  {
    id: 3,
    city: 'Bruce Springsteen',
    venue: 'San Siro Milano',
    year: '2025',
    highlights: ['Born to Run', 'Dancing in the Dark', '65,000 voices as one'],
    image: '/memories/springsteen.jpg',
    quote: 'The Boss brought us together in Milan',
    type: 'concert',
  },
]

export const MemoriesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return
        
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Our Journey So Far
          </h2>
          <p className="text-xl text-gray-600">
            From Irish pubs to Italian coastlines to legendary concerts
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {memories.map((memory, index) => (
            <div
              key={memory.id}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative"
            >
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  {memory.type === 'concert' ? (
                    <Music className="w-12 h-12 text-gray-400" />
                  ) : (
                    <MapPin className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                  {memory.year}
                </div>
                {memory.type === 'concert' && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    CONCERT
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1">
                  {memory.city}
                </h3>
                {memory.venue && (
                  <p className="text-sm text-gray-500 mb-2">{memory.venue}</p>
                )}
                <p className="text-gray-600 italic mb-4">"{memory.quote}"</p>
                
                <div className="space-y-2">
                  {memory.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full" />
                      <span className="text-sm text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-black text-white rounded-xl p-8 text-center">
          <Lock className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-bold mb-2">Photos & Videos Coming Soon</h3>
          <p className="text-gray-400 mb-4">
            Exclusive access to our trip memories will be available to registered friends only
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Play className="w-4 h-4" />
            <span>100+ photos and videos from our adventures</span>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-white border-4 border-black px-8 py-4 rounded-lg">
            <p className="text-3xl font-bold mb-2">What's Next?</p>
            <p className="text-gray-600">The 2026 destination awaits your vote</p>
          </div>
        </div>
      </div>
    </section>
  )
}