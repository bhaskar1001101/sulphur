'use client'

import { Navbar } from "@/components/Navbar"
import { MarketCategories } from "@/components/MarketCategories"
import { MarketCard } from "@/components/MarketCard"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0b14] text-white">
      <Navbar />
      <MarketCategories />

      <main className="px-6 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MarketCard
            id="bitcoin-100k"
            title="Will Bitcoin hit $100k in 2024?"
            chance={70}
            volume="13m"
          />
          <MarketCard
            id="us-election-2024"
            title="US Presidential Election 2024 Winner?"
            chance={45}
            volume="4.8m"
          />
          <MarketCard
            id="apple-vision-pro"
            title="Will Apple release Vision Pro before March 2024?"
            chance={82}
            volume="2.1m"
          />
        </div>
      </main>
    </div>
  )
}

