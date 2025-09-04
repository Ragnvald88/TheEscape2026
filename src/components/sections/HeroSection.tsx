'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Countdown logic
  useEffect(() => {
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

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline()
        .from('.hero-title', {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        })
        .from('.hero-subtitle', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.5')
        .from('.countdown-box', {
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        }, '-=0.3')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleJoinClick = () => {
    const accountSection = document.getElementById('account-section')
    if (accountSection) {
      accountSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #000 1px, transparent 1px),
                            radial-gradient(circle at 80% 80%, #000 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Journey Progress */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
            <span className="text-green-400">Dublin 2023</span>
            <span className="text-xs">🎸 Springsteen</span>
            <span className="opacity-40">→</span>
            <span className="text-blue-400">Genua 2024</span>
            <span className="text-xs">❌ Geannuleerd</span>
            <span className="opacity-40">→</span>
            <span className="text-red-400">San Siro 2025</span>
            <span className="text-xs">🎸 Finale</span>
            <span className="opacity-40">→</span>
            <span className="text-yellow-400 font-bold">2026 ???</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="hero-title text-hero font-black text-gray-900 mb-6">
          De Ontsnapping 2026
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle text-xl md:text-2xl text-gray-600 mb-16 max-w-3xl mx-auto">
          Vijf vrienden. Één epische bestemming. Het stemmen begint binnenkort.
        </p>

        {/* Countdown */}
        <div className="mb-16">
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-8 font-semibold">
            Platform Opent Over
          </p>
          
          <div className="flex justify-center gap-4 md:gap-6">
            {[
              { value: timeLeft.days, label: 'Dagen' },
              { value: timeLeft.hours, label: 'Uren' },
              { value: timeLeft.minutes, label: 'Minuten' },
              { value: timeLeft.seconds, label: 'Seconden' }
            ].map(({ value, label }) => (
              <div key={label} className="countdown-box">
                <div className="bg-black text-white rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px]">
                  <div className="text-3xl md:text-5xl font-bold tabular-nums">
                    {String(value).padStart(2, '0')}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <button 
            onClick={handleJoinClick} 
            className="btn-primary focus:outline-none focus:ring-4 focus:ring-black/20 focus:ring-offset-2"
            aria-label="Scroll naar account sectie om te registreren"
          >
            Doe Mee Aan Het Avontuur
          </button>
          <p className="text-sm text-gray-500">
            Exclusieve toegang voor Ronald, Yoram, Roel, Bram & André
          </p>
        </div>
      </div>
    </section>
  )
}