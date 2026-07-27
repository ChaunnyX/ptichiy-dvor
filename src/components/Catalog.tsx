import { useEffect, useState } from 'react'
import { PRODUCTS } from '../data/products'
import type { Product } from '../data/products'
import { fmt, useCart } from '../lib/cart'

const CATS = [
  { id: 'chicken', label: 'Курица', from: 490, img: '/ptichiy-dvor/img/product-chicken-board.jpg', pos: 'center 55%' },
  { id: 'broiler', label: 'Бройлер', from: 495, img: '/ptichiy-dvor/img/product-broiler-dark.jpg', pos: 'center 45%' },
  { id: 'turkey', label: 'Индейка', from: 590, img: '/ptichiy-dvor/img/turkey-grazing.jpg', pos: 'center 40%' },
  { id: 'eggs', label: 'Яйца', from: 220, img: '/ptichiy-dvor/img/eggs-basket.jpg', pos: 'center 60%' },
] as const

type CatId = (typeof CATS)[number]['id'] | 'all'

export function Categories({ onPick }: { onPick: (c: CatId) => void }) {
  return (
    <section className="cats wrap" aria-label="Категории">
      <div className="cats-head rv">
        <h2>Что сегодня на витрине</h2>
        <p className="mono">цены — за килограмм и десяток</p>
      </div>
      <div className="cats-grid">
        {CATS.map((c, i) => (
          <a
            key={c.id}
            href="#catalog"
            className={`cat-tile rv rv-clip rv-d${i % 4}`}
            onClick={() => onPick(c.id)}
          >
            <img src={c.img} alt={c.label} loading="lazy" style={{ objectPosition: c.pos }} />
            <span className="cat-name">{c.label}</span>
            <span className="cat-price mono">от {c.from} ₽</span>
            <span className="cat-arrow" aria-hidden="true">
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

function Card({ p }: { p: Product }) {
  const { add } = useCart()
  return (
    <article className="card rv">
      <div className={`card-media${p.cookedImg ? ' has-cooked' : ''}`}>
        <img src={p.img} alt={p.title} loading="lazy" />
        {p.cookedImg && (
          <>
            <img className="card-cooked" src={p.cookedImg} alt="" loading="lazy" aria-hidden="true" />
            <span className="card-cooked-hint mono">так будет готово →</span>
          </>
        )}
        {p.tag && <span className="card-tag">{p.tag}</span>}
      </div>
      <div className="card-body">
        <h3>{p.title}</h3>
        <p className="card-note">{p.note}</p>
        <div className="card-row">
          <div className="card-price">
            <b>{fmt(p.price)}</b>
            <span className="mono">{p.unit}</span>
            {p.oldPrice && <s>{fmt(p.oldPrice)}</s>}
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => add(p.id, p.title)}>
            В корзину
          </button>
        </div>
      </div>
    </article>
  )
}

/** до ближайшего забоя: вторник или пятница, 05:00 */
function nextSlaughter(): { label: string; left: string } {
  const now = new Date()
  const target = new Date(now)
  for (let d = 0; d < 8; d++) {
    target.setTime(now.getTime() + d * 86400000)
    const dow = target.getDay()
    if (dow === 2 || dow === 5) {
      target.setHours(5, 0, 0, 0)
      if (target.getTime() > now.getTime()) break
    }
  }
  const ms = target.getTime() - now.getTime()
  const days = Math.floor(ms / 86400000)
  const hours = Math.floor((ms % 86400000) / 3600000)
  const mins = Math.floor((ms % 3600000) / 60000)
  const label = target.getDay() === 2 ? 'вторник' : 'пятница'
  return { label, left: `${days > 0 ? days + ' д ' : ''}${hours} ч ${String(mins).padStart(2, '0')} мин` }
}

function SlaughterCountdown() {
  const [state, setState] = useState(nextSlaughter)
  useEffect(() => {
    const t = window.setInterval(() => setState(nextSlaughter()), 30000)
    return () => window.clearInterval(t)
  }, [])
  return (
    <p className="catalog-count mono">
      следующий забой — {state.label} 05:00 · приём заказов ещё <b>{state.left}</b>
    </p>
  )
}

export function Catalog({ cat, onCat }: { cat: CatId; onCat: (c: CatId) => void }) {
  const list = PRODUCTS.filter((p) => cat === 'all' || p.cat === cat)
  return (
    <section className="catalog wrap" id="catalog">
      <div className="catalog-head rv">
        <div>
          <h2>Свежий забой — под ваш заказ</h2>
          <SlaughterCountdown />
        </div>
        <div className="catalog-filters" role="tablist" aria-label="Фильтр каталога">
          {(
            [
              ['all', 'Всё'],
              ['chicken', 'Курица'],
              ['broiler', 'Бройлер'],
              ['turkey', 'Индейка'],
              ['eggs', 'Яйца'],
            ] as [CatId, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={cat === id}
              className={`chip${cat === id ? ' on' : ''}`}
              onClick={() => onCat(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="catalog-grid">
        {list.map((p) => (
          <Card key={p.id} p={p} />
        ))}
      </div>
      <p className="catalog-note mono rv">
        вес тушки — примерный: птица не по ГОСТ-калибру. взвешиваем при сборке, пишем точную сумму в WhatsApp
      </p>
    </section>
  )
}

export type { CatId }
