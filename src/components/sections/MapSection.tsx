'use client'

import dynamic from 'next/dynamic'
import { MapPin } from 'lucide-react'

// Dynamically import the Map component with no SSR
const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-gray-100 flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  )
})

export default function MapSection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-display font-bold text-gray-900 mb-4">
            Waar Nu Heen?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Van Dublin's pubs naar Genua's kust naar Milaan's San Siro. De kaart wacht op onze volgende pin.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <DynamicMap />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="text-gray-700 font-medium">Bezocht</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white border-2 border-black rounded-full" />
            <span className="text-gray-700 font-medium">Mogelijke Bestemmingen</span>
          </div>
        </div>
      </div>
    </section>
  )
}