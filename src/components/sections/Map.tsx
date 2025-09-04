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
      { name: 'Dublin 🍀', coords: [53.3498, -6.2603], detail: '2023 - Springsteen @ Croke Park' },
      { name: 'Genua 🇮🇹', coords: [44.4056, 8.9463], detail: '2024 - Concert geannuleerd, stad ontdekt' },
      { name: 'Milaan (San Siro) 🎸', coords: [45.4642, 9.1900], detail: '2025 - The Boss finale show' }
    ]

    visited.forEach(city => {
      L.marker(city.coords as [number, number], { icon: visitedIcon })
        .addTo(map)
        .bindPopup(`<strong>${city.name}</strong><br/><em>${city.detail}</em><br/>Al bezocht`)
    })

    // Add potential destinations - veel meer opties!
    const potential = [
      // Zuid-Europa
      { name: 'Lissabon 🌊', coords: [38.7223, -9.1393], detail: 'Fado, surfen & pastéis' },
      { name: 'Barcelona 🏖️', coords: [41.3851, 2.1734], detail: 'Gaudi, tapas & strand' },
      { name: 'Valencia 🍊', coords: [39.4699, -0.3763], detail: 'Paella, strand & feesten' },
      { name: 'Sevilla 💃', coords: [37.3891, -5.9845], detail: 'Flamenco & sangria' },
      { name: 'Porto 🍷', coords: [41.1579, -8.6291], detail: 'Port wijn & azulejos' },
      { name: 'Nice 🏝️', coords: [43.7102, 7.2620], detail: 'Rivièra & rosé' },
      { name: 'Napels 🍕', coords: [40.8518, 14.2681], detail: 'Pizza, Pompeii & Amalfi' },
      
      // Oost-Europa  
      { name: 'Praag 🍺', coords: [50.0755, 14.4378], detail: 'Bier & bruggen' },
      { name: 'Boedapest 🛁', coords: [47.4979, 19.0402], detail: 'Thermale baden & ruïnebars' },
      { name: 'Krakau 🏰', coords: [50.0647, 19.9450], detail: 'Geschiedenis & wodka' },
      { name: 'Belgrado 🎉', coords: [44.7866, 20.4489], detail: 'Nachtleven & rakija' },
      
      // Noord-Europa
      { name: 'Kopenhagen 🚴', coords: [55.6761, 12.5683], detail: 'Hygge & nieuwe Noordse keuken' },
      { name: 'Stockholm 🌲', coords: [59.3293, 18.0686], detail: 'Archipel & ABBA' },
      { name: 'Reykjavik 🌋', coords: [64.1466, -21.9426], detail: 'Geisers & Blue Lagoon' },
      { name: 'Edinburgh 🥃', coords: [55.9533, -3.1883], detail: 'Whisky & Highlands' },
      
      // Centraal-Europa
      { name: 'Berlijn 🎨', coords: [52.5200, 13.4050], detail: 'Kunst, geschiedenis & techno' },
      { name: 'München 🍻', coords: [48.1351, 11.5820], detail: 'Oktoberfest & Alpen' },
      { name: 'Wenen 🎵', coords: [48.2082, 16.3738], detail: 'Klassieke muziek & Sachertorte' },
      { name: 'Zürich ⛰️', coords: [47.3769, 8.5417], detail: 'Alpen & fondue' },
      
      // Eilanden & Special
      { name: 'Ibiza 🎧', coords: [38.9067, 1.4206], detail: 'Stranden & clubs' },
      { name: 'Kreta 🏛️', coords: [35.2401, 24.8093], detail: 'Geschiedenis & stranden' },
      { name: 'Malta 🏖️', coords: [35.8989, 14.5146], detail: 'Duiken & historie' },
      { name: 'Azoren 🐋', coords: [37.7412, -25.6756], detail: 'Walvissen & natuur' },
      
      // Benelux classics
      { name: 'Amsterdam 🌷', coords: [52.3676, 4.9041], detail: 'Grachten & gezelligheid' },
      { name: 'Antwerpen 💎', coords: [51.2194, 4.4025], detail: 'Diamanten & De Koninck' },
      { name: 'Brugge 🍫', coords: [51.2093, 3.2247], detail: 'Chocola & kanalen' }
    ]

    potential.forEach(city => {
      L.marker(city.coords as [number, number], { icon: potentialIcon })
        .addTo(map)
        .bindPopup(`<strong>${city.name}</strong><br/><em>${city.detail}</em><br/>Mogelijke bestemming 2026`)
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