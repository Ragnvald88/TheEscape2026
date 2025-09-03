'use client'

import { useEffect, useRef } from 'react'
import { Countdown } from './Countdown'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import { Calendar, Users, MapPin, Clock } from 'lucide-react'

interface HeroSectionProps {
  className?: string
}

export const HeroSection = ({ className }: HeroSectionProps) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.3'
      )
      .fromTo(
        '.countdown-container',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
        '-=0.5'
      )
      .fromTo(
        '.info-card',
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          stagger: 0.1
        },
        '-=0.3'
      )
  }, [])

  // October 1st, 2025 for voting launch
  const targetDate = '2025-10-01T00:00:00'

  return (
    <div
      ref={heroRef}
      className={cn(
        'relative min-h-screen flex flex-col items-center justify-center px-4 py-12',
        'bg-white',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-black text-white text-sm font-medium rounded-full">
            JUNE 2026 EUROPEAN ADVENTURE
          </span>
        </div>
        
        <h1
          ref={titleRef}
          className="text-6xl md:text-7xl lg:text-8xl font-bold text-black mb-4"
        >
          The Escape 2026
        </h1>
        
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto"
        >
          After our legendary trips to Budapest, Rome, and Barcelona, 
          it's time to choose our next destination together.
        </p>
        
        <div className="countdown-container mb-8">
          <p className="text-lg text-gray-600 mb-2 font-medium">
            VOTING OPENS IN
          </p>
          <Countdown 
            targetDate={targetDate} 
            className="text-black"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
          <div className="info-card bg-gray-50 rounded-lg p-6 border border-gray-200">
            <Calendar className="w-8 h-8 mb-3 mx-auto" />
            <h3 className="font-bold text-lg mb-2">October 1st, 2025</h3>
            <p className="text-gray-600 text-sm">
              Voting begins. Each friend nominates their top destinations.
            </p>
          </div>
          
          <div className="info-card bg-gray-50 rounded-lg p-6 border border-gray-200">
            <Users className="w-8 h-8 mb-3 mx-auto" />
            <h3 className="font-bold text-lg mb-2">5 Friends, 5 Votes</h3>
            <p className="text-gray-600 text-sm">
              Democratic decision. Everyone's voice matters equally.
            </p>
          </div>
          
          <div className="info-card bg-gray-50 rounded-lg p-6 border border-gray-200">
            <MapPin className="w-8 h-8 mb-3 mx-auto" />
            <h3 className="font-bold text-lg mb-2">New Destination</h3>
            <p className="text-gray-600 text-sm">
              Exploring uncharted territories. Creating new memories.
            </p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-black text-white rounded-lg max-w-2xl mx-auto">
          <Clock className="w-6 h-6 mb-3 mx-auto opacity-80" />
          <p className="text-lg font-medium mb-2">What Happens on October 1st?</p>
          <p className="text-gray-300 text-sm">
            The voting platform launches. Log in with your account, browse potential destinations, 
            cast your votes, and help decide where we'll create our next unforgettable memories.
          </p>
        </div>
      </div>
    </div>
  )
}