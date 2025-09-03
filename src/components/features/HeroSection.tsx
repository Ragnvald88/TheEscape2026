'use client'

import { useEffect, useRef } from 'react'
import { Countdown } from './Countdown'
import { MapBackground } from './MapBackground'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import { Calendar, MapPin, Dice6, Trophy } from 'lucide-react'

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
        '.timeline-card',
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
        'bg-white overflow-hidden',
        className
      )}
    >
      {/* Map Background */}
      <MapBackground />
      
      <div className="relative z-20 text-center max-w-6xl mx-auto">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-black text-white text-sm font-medium rounded-full">
            DUBLIN → GENUA → SAN SIRO → ???
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
          After Dublin's pubs, Genua's coastline, and The Boss in Milan,
          it's time to choose where we create our next legendary memories.
        </p>
        
        <div className="countdown-container mb-8 bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-100">
          <p className="text-lg text-gray-600 mb-2 font-medium">
            PLATFORM OPENS IN
          </p>
          <Countdown 
            targetDate={targetDate} 
            className="text-black"
          />
        </div>

        <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-16">
          <div className="timeline-card bg-white/95 backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-lg">
            <Calendar className="w-6 h-6 mb-2 mx-auto" />
            <h3 className="font-bold text-sm mb-1">Oct 1-7</h3>
            <p className="text-gray-600 text-xs">
              Date voting opens
            </p>
          </div>
          
          <div className="timeline-card bg-white/95 backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-lg">
            <Dice6 className="w-6 h-6 mb-2 mx-auto" />
            <h3 className="font-bold text-sm mb-1">Oct 8 - Nov 4</h3>
            <p className="text-gray-600 text-xs">
              Destination game: 4 weeks of interactive voting
            </p>
          </div>
          
          <div className="timeline-card bg-white/95 backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-lg">
            <Trophy className="w-6 h-6 mb-2 mx-auto" />
            <h3 className="font-bold text-sm mb-1">Nov 4</h3>
            <p className="text-gray-600 text-xs">
              Date & destination announced
            </p>
          </div>
          
          <div className="timeline-card bg-black text-white rounded-lg p-4">
            <MapPin className="w-6 h-6 mb-2 mx-auto" />
            <h3 className="font-bold text-sm mb-1">June 2026</h3>
            <p className="text-gray-300 text-xs">
              The Escape begins
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}