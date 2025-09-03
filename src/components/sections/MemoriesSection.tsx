'use client'

import { MapPin, Music, Lock, Image as ImageIcon } from 'lucide-react'

export default function MemoriesSection() {
  const memories = [
    {
      year: '2023',
      title: 'Dublin',
      type: 'city',
      highlights: ['Temple Bar', 'Guinness Storehouse', 'Irish Whiskey'],
      quote: 'Where it all began'
    },
    {
      year: '2024',
      title: 'Genua',
      type: 'city',
      highlights: ['Cinque Terre', 'Focaccia', 'Porto Antico'],
      quote: 'Italian coastal vibes'
    },
    {
      year: '2025',
      title: 'Bruce Springsteen',
      subtitle: 'San Siro, Milan',
      type: 'concert',
      highlights: ['Born to Run', 'The Boss', '65,000 fans'],
      quote: 'Legendary night'
    }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-display font-bold text-gray-900 mb-4">
            The Story So Far
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three years, three adventures, countless memories
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {memories.map((memory) => (
            <div key={memory.year} className="card-premium text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                {memory.type === 'concert' ? (
                  <Music className="w-10 h-10 text-gray-600" />
                ) : (
                  <MapPin className="w-10 h-10 text-gray-600" />
                )}
              </div>
              
              <p className="text-sm font-bold text-gray-500 mb-2">{memory.year}</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{memory.title}</h3>
              {memory.subtitle && (
                <p className="text-sm text-gray-600 mb-3">{memory.subtitle}</p>
              )}
              
              <p className="text-gray-600 italic mb-4">"{memory.quote}"</p>
              
              <div className="space-y-1">
                {memory.highlights.map((highlight) => (
                  <p key={highlight} className="text-sm text-gray-500">
                    {highlight}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="bg-black text-white rounded-2xl p-12 text-center">
          <Lock className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-bold mb-2">Photo & Video Gallery</h3>
          <p className="text-gray-400 mb-6">
            Coming Soon • Exclusive access for the crew only
          </p>
          <div className="flex justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              100+ Photos
            </span>
            <span className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              Epic Moments
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}