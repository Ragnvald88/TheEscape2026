'use client'

import { MapPin, Music, Lock, Image as ImageIcon } from 'lucide-react'

export default function MemoriesSection() {
  const memories = [
    {
      year: '2023',
      title: 'Dublin',
      type: 'city',
      highlights: ['Croke Park Concert', 'Guinness Museum 🍺', "Roel's droom: 'To the beaarr!'"],
      quote: 'The Boss in Dublin',
      detail: 'Bruce Springsteen + Grote Beer @ Guinness',
      story: "Roel's grootste droom kwam uit in het Guinness Museum. 'To the beaarr!' werd de kreet van de reis."
    },
    {
      year: '2024',
      title: 'Genua',
      type: 'city',
      highlights: ['Schitterende stad', 'Concert geannuleerd', "Bram's voorspelling"],
      quote: 'Plan B werd goud',
      detail: 'Bram verheugd: geen Bruce!',
      story: 'Bram was blij dat hij niet naar Springsteen hoefde en voorspelde dat Bruce "binnen 2 maanden dood" zou zijn. Die voorspelling kwam niet uit...'
    },
    {
      year: '2025',
      title: 'San Siro Milaan',
      subtitle: 'Villa in Como!',
      type: 'concert',
      highlights: ['Laatste minuut Prato A tickets', 'Villa met zwembad', "Bram: 'Allervetste concert ooit!'"],
      quote: 'Van hater naar believer',
      detail: 'Ronald scoorde 4x Prato A',
      story: "Bram's complete omkeer: 'Dit was het allervetste concert ooit!' Villa in Como met zwembad als uitvalsbasis."
    }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-display font-bold text-gray-900 mb-4">
            Het Verhaal Tot Nu Toe
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Drie jaar, drie avonturen, ontelbare herinneringen
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
              
              {memory.detail && (
                <p className="text-xs text-gray-400 mt-3 font-medium">
                  {memory.detail}
                </p>
              )}
              
              {memory.story && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-600 italic">
                    {memory.story}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="bg-black text-white rounded-2xl p-12 text-center">
          <Lock className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-bold mb-2">Foto & Video Galerij</h3>
          <p className="text-gray-400 mb-6">
            Binnenkort • Exclusieve toegang voor de bemanning
          </p>
          <div className="flex justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              100+ Foto's
            </span>
            <span className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              Epische Momenten
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}