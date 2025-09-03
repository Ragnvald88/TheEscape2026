'use client'

import { Calendar, Gamepad2, Trophy, Plane } from 'lucide-react'

export default function TimelineSection() {
  const timeline = [
    {
      date: 'Oct 1-7, 2025',
      title: 'Date Selection',
      description: 'Vote for your preferred travel dates in June 2026',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      date: 'Oct 8 - Nov 4, 2025',
      title: 'Destination Game',
      description: '4 weeks of interactive voting battles',
      icon: Gamepad2,
      color: 'bg-purple-500'
    },
    {
      date: 'Nov 4, 2025',
      title: 'The Big Reveal',
      description: 'Winner announced & bookings begin',
      icon: Trophy,
      color: 'bg-green-500'
    },
    {
      date: 'June 2026',
      title: 'The Escape',
      description: 'Our adventure begins',
      icon: Plane,
      color: 'bg-orange-500'
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-display font-bold text-gray-900 mb-4">
            The Journey Ahead
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A carefully orchestrated process to democratically choose our next adventure
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200" />

          <div className="space-y-12 md:space-y-24">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <div className="card-premium max-w-md mx-auto md:mx-0">
                    <p className="text-sm font-semibold text-gray-500 mb-2">{item.date}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>

                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}