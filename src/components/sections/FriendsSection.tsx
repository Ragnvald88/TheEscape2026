'use client'

import { User } from 'lucide-react'

export default function FriendsSection() {
  const friends = [
    { name: 'Ronald', role: 'The Leader', color: 'from-blue-400 to-blue-600' },
    { name: 'Yoram', role: 'The Connoisseur', color: 'from-green-400 to-green-600' },
    { name: 'Roel', role: 'The Grote Beer', color: 'from-purple-400 to-purple-600' },
    { name: 'Bram', role: 'The Acid Cowboy', color: 'from-orange-400 to-orange-600' },
    { name: 'Andre', role: 'The Playfull Daddy', color: 'from-red-400 to-red-600' }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-display font-bold text-gray-900 mb-4">
            The Crew
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Five friends, five votes, one unforgettable adventure
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
              <p className="text-sm text-gray-500">{friend.role}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Equal Voting Power</h3>
            <p className="text-gray-600 mb-4">
              Every friend has one vote. The majority decides our destination.
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