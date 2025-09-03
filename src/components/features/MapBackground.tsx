'use client'

import { MapPin } from 'lucide-react'

const destinations = [
  { name: 'Dublin', x: '42%', y: '25%', visited: true },
  { name: 'Genua', x: '52%', y: '48%', visited: true },
  { name: 'Milan', x: '53%', y: '46%', visited: true },
  { name: 'Lisboa', x: '35%', y: '58%' },
  { name: 'Porto', x: '36%', y: '54%' },
  { name: 'Barcelona', x: '47%', y: '55%' },
  { name: 'Paris', x: '47%', y: '38%' },
  { name: 'Amsterdam', x: '49%', y: '28%' },
  { name: 'Prague', x: '57%', y: '36%' },
  { name: 'Vienna', x: '59%', y: '40%' },
  { name: 'Copenhagen', x: '54%', y: '22%' },
  { name: 'Stockholm', x: '60%', y: '15%' },
  { name: 'Azores', x: '25%', y: '58%' },
  { name: 'Marrakech', x: '35%', y: '75%' },
]

export const MapBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/90 z-10" />
      
      {/* Map container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-7xl mx-auto">
          {/* Europe outline (simplified) */}
          <svg
            viewBox="0 0 800 600"
            className="absolute inset-0 w-full h-full opacity-10"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M 200 150 Q 250 100 350 120 L 450 100 Q 500 110 520 130 L 550 120 Q 600 100 650 130 L 680 180 Q 650 220 600 250 L 580 300 L 550 350 L 500 380 L 450 400 L 400 420 L 350 400 L 300 380 L 250 350 L 200 300 Z"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            {/* North Africa outline */}
            <path
              d="M 150 450 L 350 450 Q 400 460 450 450 L 550 450 L 550 500 L 450 520 L 350 520 L 250 500 L 150 480 Z"
              fill="none"
              stroke="black"
              strokeWidth="1"
              opacity="0.5"
            />
            {/* Azores (dots) */}
            <circle cx="150" cy="350" r="3" fill="black" opacity="0.3" />
            <circle cx="130" cy="355" r="3" fill="black" opacity="0.3" />
            <circle cx="140" cy="365" r="3" fill="black" opacity="0.3" />
          </svg>
          
          {/* Destination markers */}
          {destinations.map((dest) => (
            <div
              key={dest.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
              style={{ left: dest.x, top: dest.y }}
            >
              <div className="relative">
                <MapPin
                  className={`w-6 h-6 transition-all duration-300 ${
                    dest.visited
                      ? 'text-black fill-black'
                      : 'text-gray-400 group-hover:text-black'
                  }`}
                />
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded shadow-sm">
                  {dest.name}
                </span>
              </div>
            </div>
          ))}
          
          {/* Connection lines between visited cities */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <line
              x1="42%"
              y1="25%"
              x2="52%"
              y2="48%"
              stroke="black"
              strokeWidth="1"
              strokeDasharray="5,5"
              opacity="0.3"
            />
            <line
              x1="52%"
              y1="48%"
              x2="53%"
              y2="46%"
              stroke="black"
              strokeWidth="1"
              strokeDasharray="5,5"
              opacity="0.3"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}