'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { MapPin, Calendar, Heart } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const memories = [
  {
    id: 1,
    city: 'Budapest',
    year: '2023',
    highlights: ['Thermal Baths', 'Ruin Bars', 'Danube Cruise'],
    image: '/memories/budapest.jpg',
    quote: 'Where friendships were forged in thermal waters',
  },
  {
    id: 2,
    city: 'Rome',
    year: '2024',
    highlights: ['Colosseum', 'Vatican', 'Trastevere Nights'],
    image: '/memories/rome.jpg',
    quote: 'Eternal city, eternal memories',
  },
  {
    id: 3,
    city: 'Barcelona',
    year: '2025',
    highlights: ['Sagrada Familia', 'Beach Days', 'Tapas Tours'],
    image: '/memories/barcelona.jpg',
    quote: 'Sun, sangria, and endless laughter',
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
            Three cities, countless memories, one unbreakable bond
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {memories.map((memory, index) => (
            <div
              key={memory.id}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-gray-400" />
                </div>
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                  {memory.year}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{memory.city}</h3>
                <p className="text-gray-600 italic mb-4">"{memory.quote}"</p>
                
                <div className="space-y-2">
                  {memory.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-black text-white px-8 py-4 rounded-lg">
            <p className="text-2xl font-bold mb-2">Next Stop: ???</p>
            <p className="text-gray-300">You decide where we go in 2026</p>
          </div>
        </div>
      </div>
    </section>
  )
}