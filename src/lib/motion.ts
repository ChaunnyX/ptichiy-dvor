import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export const REDUCED =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useLenis() {
  useEffect(() => {
    if (REDUCED) return
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
}

/** reveal всех .rv при входе во вьюпорт + страховка на не-сработавший observer */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv'))
    if (REDUCED) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            ;(en.target as HTMLElement).classList.add('in')
            io.unobserve(en.target)
          }
        }
      },
      // threshold 0: элементы с clip-path (.rv-clip) обрезаны до узкой полоски —
      // при пороге по площади они никогда не «пересекутся»
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )
    els.forEach((e) => io.observe(e))
    const safety = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.rv:not(.in)').forEach((e) => {
        const r = e.getBoundingClientRect()
        if (r.top < window.innerHeight) e.classList.add('in')
      })
    }, 2600)
    return () => {
      io.disconnect()
      window.clearTimeout(safety)
    }
  }, [])
}

export { gsap, ScrollTrigger }
