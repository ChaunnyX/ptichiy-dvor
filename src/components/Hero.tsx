import { useEffect, useRef } from 'react'
import { gsap, REDUCED } from '../lib/motion'

function Kinetic({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="kin" aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span className="kin-w" key={i} style={{ animationDelay: `${delay + i * 0.07}s` }}>
          {w}
        </span>
      ))}
    </span>
  )
}

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (REDUCED) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-img', { scale: 1.12 }, { scale: 1, duration: 2.4, ease: 'power2.out' })
      gsap.to('.hero-img', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.fromTo(
        '.hero-stamp',
        { scale: 2.1, opacity: 0, rotate: 8 },
        { scale: 1, opacity: 1, rotate: -8, duration: 0.55, delay: 1.05, ease: 'power3.in', clearProps: 'scale' },
      )
      gsap.fromTo('.hero-stamp', { y: 0 }, { y: -3, yoyo: true, repeat: 1, duration: 0.09, delay: 1.6 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={root} id="top">
      <div className="hero-bg">
        <img className="hero-img" src="/ptichiy-dvor/img/hero-pasture.jpg" alt="Куры на выгуле — наша ферма" fetchPriority="high" />
        <div className="hero-shade" />
      </div>

      <div className="wrap hero-in">
        <p className="hero-eyebrow mono rv in">Семейная ферма · 90 км от Москвы</p>
        <h1 className="hero-h">
          <span className="hero-l1">
            <Kinetic text="С нашего двора —" delay={0.15} />
          </span>
          <span className="hero-l2">
            <Kinetic text="к вашему столу" delay={0.5} />
          </span>
          <span className="hero-l3 mono">
            <Kinetic text="за 24 часа после забоя" delay={0.85} />
          </span>
        </h1>
        <p className="hero-sub">
          Курица, бройлер, индейка и домашние яйца. Растим на зерне и траве, бьём под заказ
          и привозим охлаждёнкой — уже завтра утром.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#catalog">
            Выбрать к ужину
          </a>
          <a className="btn btn-ghost" href="#farm">
            Как мы растим
          </a>
        </div>
        <ul className="hero-trust">
          <li>
            <b>4,9 ★</b> — 1 200+ семей
          </li>
          <li>Ветконтроль каждой партии</li>
          <li>Оплата при получении</li>
        </ul>
      </div>

      <span className="stamp hero-stamp" aria-hidden="true">
        свежее
        <br />
        забой
        <br />
        чт 05:00
      </span>

      <div className="hero-scroll mono" aria-hidden="true">
        листайте ↓
      </div>
    </section>
  )
}

export function MarqueeBand() {
  const items = ['без антибиотиков', 'зерно и трава', 'охлаждёнка — не заморозка', 'выгул на пастбище', 'забой под заказ']
  const row = [...items, ...items, ...items]
  return (
    <div className="band" aria-hidden="true">
      <div className="band-track">
        {row.map((t, i) => (
          <span key={i}>
            {t} <i>✳</i>
          </span>
        ))}
      </div>
    </div>
  )
}
