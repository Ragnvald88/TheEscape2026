import Navigation from '@/components/layout/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import TimelineSection from '@/components/sections/TimelineSection'
import FriendsSection from '@/components/sections/FriendsSection'
import MapSection from '@/components/sections/MapSection'
import MemoriesSection from '@/components/sections/MemoriesSection'
import StoriesSection from '@/components/sections/StoriesSection'
import AccountSection from '@/components/sections/AccountSection'
import TestSupabase from '@/components/sections/TestSupabase'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function Home() {
  return (
    <>
      <Navigation />
      <TestSupabase />
      <main className="min-h-screen">
        <ErrorBoundary>
          <div id="hero">
            <HeroSection />
          </div>
        </ErrorBoundary>
        <ErrorBoundary>
          <div id="timeline">
            <TimelineSection />
          </div>
        </ErrorBoundary>
        <ErrorBoundary>
          <div id="friends">
            <FriendsSection />
          </div>
        </ErrorBoundary>
        <ErrorBoundary>
          <div id="map">
            <MapSection />
          </div>
        </ErrorBoundary>
        <ErrorBoundary>
          <div id="memories">
            <MemoriesSection />
          </div>
        </ErrorBoundary>
        <ErrorBoundary>
          <div id="stories">
            <StoriesSection />
          </div>
        </ErrorBoundary>
        <ErrorBoundary>
          <div id="account">
            <AccountSection />
          </div>
        </ErrorBoundary>
        
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
    </>
  )
}