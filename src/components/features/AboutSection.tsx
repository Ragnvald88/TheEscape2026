'use client'

import { ArrowRight, Calendar, Dice6, Trophy, Plane } from 'lucide-react'

export const AboutSection = () => {
  const steps = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Oct 1-7: Date Voting',
      description: 'The platform opens. Vote for your preferred travel dates in June 2026.',
    },
    {
      icon: <Dice6 className="w-6 h-6" />,
      title: 'Oct 8 - Nov 4: Destination Game',
      description: '4 weeks of interactive voting. Destinations compete in elimination rounds.',
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Nov 4: Final Reveal',
      description: 'The winning date and destination are announced. Bookings begin immediately.',
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: 'June 2026: The Escape',
      description: 'We embark on our next unforgettable adventure together.',
    },
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            The Voting Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Two phases of democratic decision-making: First we choose when, then we choose where.
            Every friend has equal power in shaping our 2026 adventure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-black text-white rounded-lg p-6 h-full">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300 text-sm">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 text-gray-300" />
              )}
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold mb-8 text-center">The Destination Game</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-3">How It Works</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-black font-bold">Week 1:</span>
                  Initial nominations - everyone suggests destinations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black font-bold">Week 2:</span>
                  Quarter-finals - top 8 destinations compete
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black font-bold">Week 3:</span>
                  Semi-finals - narrowed down to final 4
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black font-bold">Week 4:</span>
                  Grand finale - the winner is decided
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-3">Interactive Elements</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Live voting rounds with real-time results
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Destination profiles with photos and highlights
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Head-to-head battles between cities
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Discussion forum for making your case
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              From pubs to beaches, from mountains to music festivals - 
              where will The Escape 2026 take us?
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}