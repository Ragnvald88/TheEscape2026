'use client'

import { Quote, Beer, Music, Home, Sparkles } from 'lucide-react'

export default function StoriesSection() {
  const stories = [
    {
      icon: Beer,
      title: "To The Beaarr!",
      author: "Roel",
      content: "Het Guinness Museum in Dublin was mijn persoonlijke hoogtepunt. De combinatie van bier, geschiedenis en die view over Dublin... 'To the beaarr!' is sindsdien onze strijdkreet.",
      year: "2023",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: Music,
      title: "Van Hater tot Believer",
      author: "Bram",
      content: "Ik gaf Bruce 2 maanden te leven in Genua. Was blij dat ik niet mee hoefde. Maar San Siro? Man, dat was het ALLERVETSTE concert ooit! Die energie, die muziek... ik ben om!",
      year: "2024-2025",
      color: "from-orange-400 to-orange-600"
    },
    {
      icon: Sparkles,
      title: "De Prato Held",
      author: "Ronald",
      content: "Laatste minuut, iedereen had de hoop opgegeven. Maar ik kreeg het voor elkaar: 4 Prato A tickets voor San Siro. De jongens keken me aan alsof ik water in wijn had veranderd.",
      year: "2025",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Home,
      title: "Villa in Como",
      author: "De Groep",
      content: "Een villa met zwembad aan het Comomeer als uitvalsbasis voor San Siro. We leefden als koningen. De perfecte mix van luxe, vriendschap en rock 'n roll.",
      year: "2025",
      color: "from-red-400 to-red-600"
    }
  ]

  return (
    <section className="section-padding bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-display font-bold mb-4">
            Legendes & Verhalen
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            De momenten die we nooit zullen vergeten
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${story.color} flex items-center justify-center flex-shrink-0`}>
                  <story.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{story.title}</h3>
                  <p className="text-sm text-gray-400">{story.author} • {story.year}</p>
                </div>
              </div>
              
              <Quote className="w-8 h-8 text-white/10 mb-3" />
              
              <p className="text-gray-300 leading-relaxed italic">
                "{story.content}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4">
            <p className="text-lg font-medium text-gray-300">
              2026: Tijd voor nieuwe verhalen...
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Geen Bruce, maar wel episch
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}