'use client'

import { useEffect, useRef } from 'react'
import { useCountdown } from '@/hooks/useCountdown'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

interface CountdownProps {
  targetDate: string
  className?: string
}

export const Countdown = ({ targetDate, className }: CountdownProps) => {
  const timeLeft = useCountdown(targetDate)
  const containerRef = useRef<HTMLDivElement>(null)
  const numbersRef = useRef<(HTMLDivElement | null)[]>([])
  const prevTimeRef = useRef(timeLeft)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
      }
    )
  }, [])

  useEffect(() => {
    const animateNumber = (index: number, prevValue: number, newValue: number) => {
      if (prevValue !== newValue && numbersRef.current[index]) {
        gsap.fromTo(
          numbersRef.current[index],
          {
            y: -20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          }
        )
      }
    }

    animateNumber(0, prevTimeRef.current.days, timeLeft.days)
    animateNumber(1, prevTimeRef.current.hours, timeLeft.hours)
    animateNumber(2, prevTimeRef.current.minutes, timeLeft.minutes)
    animateNumber(3, prevTimeRef.current.seconds, timeLeft.seconds)

    prevTimeRef.current = timeLeft
  }, [timeLeft])

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ]

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex flex-wrap justify-center gap-4 md:gap-8',
        className
      )}
    >
      {timeUnits.map((unit, index) => (
        <div
          key={unit.label}
          className="flex flex-col items-center"
        >
          <div
            ref={(el) => {
              numbersRef.current[index] = el
            }}
            className="relative"
          >
            <div className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg">
              {String(unit.value).padStart(2, '0')}
            </div>
          </div>
          <span className="text-sm md:text-base lg:text-lg text-white/80 mt-2 uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}