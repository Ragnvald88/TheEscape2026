'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [48.5, 10], // Center of Europe
      zoom: 4,
      zoomControl: false,
      scrollWheelZoom: false
    })

    // Add tile layer with a clean style
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map)

    // Custom icon for visited cities
    const visitedIcon = L.divIcon({
      html: '<div class="w-8 h-8 bg-black rounded-full flex items-center justify-center"><div class="w-3 h-3 bg-white rounded-full"></div></div>',
      className: 'custom-marker',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    })

    // Custom icon for potential destinations
    const potentialIcon = L.divIcon({
      html: '<div class="w-6 h-6 bg-white border-2 border-black rounded-full"></div>',
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    })

    // Add visited cities
    const visited = [
      { name: 'Dublin', coords: [53.3498, -6.2603] },
      { name: 'Genua', coords: [44.4056, 8.9463] },
      { name: 'Milan (San Siro)', coords: [45.4642, 9.1900] }
    ]

    visited.forEach(city => {
      L.marker(city.coords as [number, number], { icon: visitedIcon })
        .addTo(map)
        .bindPopup(`<strong>${city.name}</strong><br/>Already visited`)
    })

    // Add potential destinations
    const potential = [
      { name: 'Lisboa', coords: [38.7223, -9.1393] },
      { name: 'Barcelona', coords: [41.3851, 2.1734] },
      { name: 'Amsterdam', coords: [52.3676, 4.9041] },
      { name: 'Prague', coords: [50.0755, 14.4378] },
      { name: 'Copenhagen', coords: [55.6761, 12.5683] },
      { name: 'Azores', coords: [37.7412, -25.6756] },
      { name: 'Marrakech', coords: [31.6295, -7.9811] }
    ]

    potential.forEach(city => {
      L.marker(city.coords as [number, number], { icon: potentialIcon })
        .addTo(map)
        .bindPopup(`<strong>${city.name}</strong><br/>Potential destination`)
    })

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return <div ref={mapRef} className="h-[500px] w-full" />
}