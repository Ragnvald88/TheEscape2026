import { HeroSection } from '@/components/features/HeroSection'
import { AboutSection } from '@/components/features/AboutSection'
import { MemoriesSection } from '@/components/features/MemoriesSection'
import { AccountSection } from '@/components/features/AccountSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <MemoriesSection />
      <AccountSection />
      
      <footer className="bg-black text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 mb-2">The Escape 2026</p>
          <p className="text-sm text-gray-500">
            An exclusive voting platform for 5 friends planning their next adventure
          </p>
        </div>
      </footer>
    </main>
  )
}