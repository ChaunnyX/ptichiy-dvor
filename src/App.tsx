import { useState } from 'react'
import { CartProvider } from './lib/cart'
import { useLenis, useReveal } from './lib/motion'
import { Header, Ticker } from './components/Header'
import { Hero, MarqueeBand } from './components/Hero'
import { Categories, Catalog } from './components/Catalog'
import type { CatId } from './components/Catalog'
import { Cuts } from './components/Cuts'
import { Timeline24 } from './components/Timeline24'
import { Farm, Eggs } from './components/Story'
import { Reviews, HowTo, RecipeBanner, Footer, CartDrawer } from './components/Closing'

export default function App() {
  useLenis()
  useReveal()
  const [cat, setCat] = useState<CatId>('all')

  return (
    <CartProvider>
      <div className="grain">
        <Ticker />
        <Header />
        <main>
          <Hero />
          <MarqueeBand />
          <Categories onPick={setCat} />
          <Cuts />
          <Catalog cat={cat} onCat={setCat} />
          <Timeline24 />
          <Farm />
          <Eggs />
          <Reviews />
          <RecipeBanner />
          <HowTo />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  )
}
