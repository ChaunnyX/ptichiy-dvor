import { useState } from 'react'
import { useCart, fmt } from '../lib/cart'

const REVIEWS = [
  {
    name: 'Марина К.',
    place: 'Одинцово',
    text: 'Бульон из вашей курицы — золотой, как у бабушки. Дети сначала не поверили, что «магазинная» и домашняя — это одна и та же птица.',
    initials: 'МК',
    hue: '#4a6b3a',
  },
  {
    name: 'Дмитрий С.',
    place: 'Москва, Юго-Запад',
    text: 'Беру филе индейки и десяток яиц каждую пятницу уже полгода. Привозят к 9 утра, мясо реально охлаждённое, не «отмороженное».',
    initials: 'ДС',
    hue: '#b23a26',
  },
  {
    name: 'Анна и Пётр',
    place: 'Красногорск',
    text: 'Заказали бройлера на день рождения — гости спрашивали, где берём. Теперь заказываем на два дома, с родителями.',
    initials: 'АП',
    hue: '#e9a13b',
  },
]

export function Reviews() {
  return (
    <section className="reviews wrap">
      <div className="reviews-head rv">
        <h2>Нас советуют соседям</h2>
        <p className="mono">4,9 из 5 · 340 отзывов в WhatsApp-чате фермы</p>
      </div>
      <div className="reviews-grid">
        {REVIEWS.map((r, i) => (
          <blockquote key={r.name} className={`review rv rv-d${i}`}>
            <p>«{r.text}»</p>
            <footer>
              <i style={{ background: r.hue }}>{r.initials}</i>
              <span>
                <b>{r.name}</b>
                <em className="mono">{r.place}</em>
              </span>
              <u aria-label="5 звёзд">★★★★★</u>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}

export function HowTo() {
  const steps = [
    { n: '01', t: 'Выбираете на сайте', d: 'До вторника или пятницы — дни забоя. Минимальный заказ 1 500 ₽.' },
    { n: '02', t: 'Подтверждаем в WhatsApp', d: 'Пишем точный вес тушек и сумму, согласуем окно доставки.' },
    { n: '03', t: 'Привозим утром', d: 'Рефрижератор, +2 °C. Оплата при получении — наличными или переводом.' },
  ]
  return (
    <section className="howto" id="delivery">
      <div className="wrap">
        <div className="howto-grid">
          <div className="howto-copy rv">
            <p className="mono">доставка</p>
            <h2>Как заказать</h2>
            <p className="howto-zone">
              Москва и область до 50 км от МКАД. Бесплатно от 3 000 ₽, иначе — 350 ₽.
              Самовывоз с фермы — в любой день, заодно посмотрите двор.
            </p>
          </div>
          <ol className="howto-steps">
            {steps.map((s, i) => (
              <li key={s.n} className={`rv rv-d${i}`}>
                <span className="mono">{s.n}</span>
                <b>{s.t}</b>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export function RecipeBanner() {
  return (
    <section className="recipe">
      <img src="/ptichiy-dvor/img/roast-rotisserie.jpg" alt="Воскресная курица на вертеле" loading="lazy" />
      <div className="recipe-shade" />
      <div className="wrap recipe-in rv">
        <p className="mono">рецепт недели</p>
        <h2>Воскресная курица на вертеле</h2>
        <p>Бройлер целиком, соль, чеснок, час двадцать в духовке. Больше ничего не нужно — вкус сделает птица.</p>
        <a className="btn btn-light" href="#catalog">
          Взять бройлера — 495 ₽/кг
        </a>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <div className="foot-brand">
          <b>Птичий двор</b>
          <p>Семейная птицеферма, Тульская область, д. Лужки. Работаем с 2016 года.</p>
          <p className="mono">ЛПХ Морозов С. В. · ОГРНИП 3167154...212</p>
        </div>
        <div className="foot-col">
          <span className="mono">Покупателям</span>
          <a href="#catalog">Каталог</a>
          <a href="#cuts">Схема разделки</a>
          <a href="#delivery">Доставка и оплата</a>
        </div>
        <div className="foot-col">
          <span className="mono">Ферма</span>
          <a href="#farm">Как мы растим</a>
          <a href="#fresh">24 часа свежести</a>
          <a href="tel:+74951234567">+7 495 123-45-67</a>
        </div>
        <div className="foot-col">
          <span className="mono">Мы на связи</span>
          <a href="#">WhatsApp</a>
          <a href="#">Telegram</a>
          <a href="#">Дзен фермы</a>
        </div>
      </div>
      <div className="wrap foot-low mono">
        <span>© 2026 Птичий двор</span>
        <span>Оплата: при получении · перевод · карта</span>
      </div>
    </footer>
  )
}

export function CartDrawer() {
  const { items, open, setOpen, total, setQty, remove, toast } = useCart()
  const [sent, setSent] = useState(false)
  return (
    <>
      {toast && <div className="toast">{toast}</div>}
      <div className={`drawer-veil${open ? ' on' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`drawer${open ? ' on' : ''}`} aria-label="Корзина" aria-hidden={!open}>
        <header>
          <h3>Корзина</h3>
          <button onClick={() => setOpen(false)} aria-label="Закрыть">
            ✕
          </button>
        </header>
        {items.length === 0 && !sent && <p className="drawer-empty">Пока пусто. Начните с бройлера — его берут чаще всего.</p>}
        {sent && (
          <p className="drawer-empty">
            Заявка отправлена! Через пару минут напишем в WhatsApp — подтвердим вес и время доставки.
          </p>
        )}
        {!sent && (
          <ul className="drawer-list">
            {items.map((i) => (
              <CartRow key={i.id} id={i.id} qty={i.qty} setQty={setQty} remove={remove} />
            ))}
          </ul>
        )}
        {items.length > 0 && !sent && (
          <footer>
            <div className="drawer-total">
              <span>Итого, примерно</span>
              <b>{fmt(total)} ₽</b>
            </div>
            <p className="mono">точный вес и сумму подтвердим в WhatsApp</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSent(true)
                setTimeout(() => {
                  setOpen(false)
                  setSent(false)
                  items.forEach((i) => remove(i.id))
                }, 2600)
              }}
            >
              Оформить заказ
            </button>
          </footer>
        )}
      </aside>
    </>
  )
}

import { PRODUCTS } from '../data/products'

function CartRow({
  id,
  qty,
  setQty,
  remove,
}: {
  id: string
  qty: number
  setQty: (id: string, q: number) => void
  remove: (id: string) => void
}) {
  const p = PRODUCTS.find((x) => x.id === id)
  if (!p) return null
  return (
    <li className="drawer-row">
      <img src={p.img} alt="" />
      <div>
        <b>{p.title}</b>
        <span className="mono">
          {fmt(p.price)} {p.unit}
        </span>
      </div>
      <div className="drawer-qty">
        <button onClick={() => setQty(id, qty - 1)} aria-label="Меньше">
          −
        </button>
        <span>{qty}</span>
        <button onClick={() => setQty(id, qty + 1)} aria-label="Больше">
          +
        </button>
      </div>
      <button className="drawer-x" onClick={() => remove(id)} aria-label="Убрать">
        ✕
      </button>
    </li>
  )
}
