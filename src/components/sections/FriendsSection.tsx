'use client'

import { User } from 'lucide-react'

export default function FriendsSection() {
  const friends = [
    { name: 'Ronald', role: 'De Held', subtitle: 'Prato tickets fixer', color: 'from-blue-400 to-blue-600' },
    { name: 'Yoram', role: 'De Kenner', subtitle: 'Cultuur specialist', color: 'from-green-400 to-green-600' },
    { name: 'Roel', role: 'De Grote Beer', subtitle: 'Feestbeest', color: 'from-purple-400 to-purple-600' },
    { name: 'Bram', role: 'De Acid Cowboy', subtitle: 'Avonturier', color: 'from-orange-400 to-orange-600' },
    { name: 'André', role: 'De Speelse Papa', subtitle: 'Groepsverbinder', color: 'from-red-400 to-red-600' }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-display font-bold text-gray-900 mb-4">
            De Bemanning
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vijf vrienden, vijf stemmen, één onvergetelijk avontuur
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {friends.map((friend, index) => (
            <div
              key={friend.name}
              className="text-center group cursor-pointer"
            >
              <div className="relative mb-4">
                <div className={`w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full bg-gradient-to-br ${friend.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300`}>
                  <User className="w-12 h-12 md:w-16 md:h-16 text-white" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{friend.name}</h3>
              <p className="text-sm text-gray-700 font-medium">{friend.role}</p>
              {friend.subtitle && (
                <p className="text-xs text-gray-500 mt-1">{friend.subtitle}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Gelijke Stemkracht</h3>
            <p className="text-gray-600 mb-4">
              Iedere vriend heeft één stem. De meerderheid bepaalt onze bestemming.
            </p>
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-black rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}