'use client'

import { useEffect, useRef } from 'react'
import { Countdown } from './Countdown'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

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
  }, [])

  const targetDate = '2026-06-01T00:00:00'

  return (
    <div
      ref={heroRef}
      className={cn(
        'relative min-h-screen flex flex-col items-center justify-center px-4',
        'bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900',
        className
      )}
    >
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4"
        >
          The Escape 2026
        </h1>
        
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12"
        >
          5 Friends. 1 Epic Journey. Unlimited Memories.
        </p>
        
        <div className="countdown-container">
          <p className="text-lg md:text-xl text-white/80 mb-8">
            Countdown to our European Adventure
          </p>
          <Countdown targetDate={targetDate} />
        </div>
        
        <div className="mt-16 text-white/60 text-sm md:text-base">
          <p>Voting opens October 1st, 2025</p>
        </div>
      </div>
    </div>
  )
}