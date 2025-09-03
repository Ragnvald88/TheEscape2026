'use client'

import { ArrowRight, Target, Vote, Plane, Trophy } from 'lucide-react'

export const AboutSection = () => {
  const steps = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'October 1st - Platform Opens',
      description: 'The voting platform launches. Each friend logs in with their account.',
    },
    {
      icon: <Vote className="w-6 h-6" />,
      title: 'October - November - Voting Period',
      description: 'Browse destinations, discuss options, cast your votes. Democracy in action.',
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'December 1st - Destination Revealed',
      description: 'The winning destination is announced. Planning begins immediately.',
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: 'June 2026 - The Escape',
      description: 'We embark on our next unforgettable adventure together.',
    },
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A democratic process to choose our next adventure. Every vote counts, 
            every opinion matters, and the majority decides where we create our next memories.
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
          <h3 className="text-3xl font-bold mb-8 text-center">Why This Platform?</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-3">The Problem</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-black">•</span>
                  Group chats get messy with destination ideas
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black">•</span>
                  Hard to track who wants to go where
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black">•</span>
                  Decisions drag on without clear deadlines
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black">•</span>
                  Some voices get lost in the discussion
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-3">Our Solution</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Organized voting platform with clear options
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Visual destination galleries and information
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Fixed timeline with definitive decision date
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Equal voting power for all 5 friends
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}