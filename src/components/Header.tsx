import { useEffect, useState } from 'react'
import { useCart } from '../lib/cart'

const NAV = [
  { href: '#catalog', label: 'Каталог' },
  { href: '#cuts', label: 'Разделка' },
  { href: '#fresh', label: 'Свежесть' },
  { href: '#farm', label: 'Ферма' },
  { href: '#delivery', label: 'Доставка' },
]

export function Ticker() {
  const items = [
    'Забой — вторник и пятница, доставка на следующий день',
    'Бесплатная доставка от 3 000 ₽',
    'Охлаждёнка, не заморозка',
    'Москва и область до 50 км',
  ]
  const row = [...items, ...items]
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {row.map((t, i) => (
          <span key={i}>
            {t}
            <em>◆</em>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Header() {
  const { count, setOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className={`hdr${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap hdr-in">
        <a className="hdr-logo" href="#top" aria-label="Птичий двор — на главную">
          <svg viewBox="0 0 34 34" width="30" height="30" aria-hidden="true">
            <path
              d="M8 21c0-6 4-11 10-11 4 0 7 3 7 6 0 2-1 4-4 4h-5l6 7H10c-1.4 0-2-1-2-2.5V21Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinejoin="round"
            />
            <circle cx="20.4" cy="14.6" r="1.2" fill="currentColor" />
            <path d="M25 15.8l3.4-1-2.4 2.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
          <span>
            Птичий двор
            <i className="mono">ферма · с 2016</i>
          </span>
        </a>

        <nav className={`hdr-nav${menu ? ' open' : ''}`}>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setMenu(false)}>
              {n.label}
            </a>
          ))}
          <a className="hdr-phone" href="tel:+74951234567" onClick={() => setMenu(false)}>
            +7 495 123-45-67
          </a>
        </nav>

        <div className="hdr-right">
          <a className="hdr-phone hdr-phone-top" href="tel:+74951234567">
            +7 495 123-45-67
          </a>
          <button className="hdr-cart" onClick={() => setOpen(true)} aria-label="Открыть корзину">
            <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.9">
              <path d="M4 7h16l-1.6 11.2a2 2 0 0 1-2 1.8H7.6a2 2 0 0 1-2-1.8L4 7Z" strokeLinejoin="round" />
              <path d="M8.5 9.5V6a3.5 3.5 0 0 1 7 0v3.5" strokeLinecap="round" />
            </svg>
            Корзина
            {count > 0 && <b key={count}>{count}</b>}
          </button>
          <button className="hdr-burger" onClick={() => setMenu((v) => !v)} aria-label="Меню">
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
