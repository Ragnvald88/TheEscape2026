'use client'

import { useState, useEffect } from 'react'
import { Menu, X, MapPin, Users, Calendar, Clock, Trophy, Camera } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { label: 'Home', href: '#hero', icon: MapPin },
    { label: 'Planning', href: '#timeline', icon: Calendar },
    { label: 'De Crew', href: '#friends', icon: Users },
    { label: 'Kaart', href: '#map', icon: MapPin },
    { label: 'Herinneringen', href: '#memories', icon: Clock },
    { label: 'Verhalen', href: '#stories', icon: Trophy },
    { label: 'Account', href: '#account', icon: Users }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-black" />
              <span className={`font-bold text-lg ${isScrolled ? 'text-black' : 'text-white'}`}>
                De Ontsnapping 2026
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
              aria-label="Menu openen"
            >
              {isOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-black' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-black' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="fixed right-0 top-16 bottom-0 w-64 bg-white shadow-xl">
            <div className="p-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <item.icon className="w-5 h-5 text-gray-500" />
                  <span className="font-medium text-gray-900">{item.label}</span>
                </button>
              ))}
            </div>
            
            {/* Extra Info in Mobile Menu */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Platform opent 1 oktober 2025
              </p>
              <p className="text-xs text-gray-400 text-center mt-1">
                Exclusief voor de originele 5
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}