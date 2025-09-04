import HeroSection from '@/components/sections/HeroSection'
import TimelineSection from '@/components/sections/TimelineSection'
import FriendsSection from '@/components/sections/FriendsSection'
import MapSection from '@/components/sections/MapSection'
import MemoriesSection from '@/components/sections/MemoriesSection'
import StoriesSection from '@/components/sections/StoriesSection'
import AccountSection from '@/components/sections/AccountSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TimelineSection />
      <FriendsSection />
      <MapSection />
      <MemoriesSection />
      <StoriesSection />
      <AccountSection />
      
      <footer className="bg-black text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-2">De Ontsnapping 2026</h3>
          <p className="text-gray-400 text-sm">
            Een exclusief avontuur voor Ronald, Yoram, Roel, Bram & André
          </p>
          <p className="text-xs text-gray-500 mt-4">
            Tramps like us.. baby we were born to run! 🌍
          </p>
        </div>
      </footer>
    </main>
  )
}