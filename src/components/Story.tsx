import { useEffect, useRef } from 'react'
import { gsap, REDUCED } from '../lib/motion'

export function Farm() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    if (REDUCED) return
    const ctx = gsap.context(() => {
      // параллакс-глубина фото-ленты: соседние кадры плывут с разной скоростью
      const base = [0, 18, 0, 24, 0]
      const drift = [-16, 12, -22, 14, -10]
      root.current?.querySelectorAll<HTMLElement>('.farm-strip figure').forEach((f, i) => {
        gsap.fromTo(
          f,
          { y: base[i] - drift[i] },
          {
            y: base[i] + drift[i],
            ease: 'none',
            scrollTrigger: { trigger: '.farm-strip', start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="farm wrap" id="farm" ref={root}>
      <div className="farm-grid">
        <figure className="farm-photo rv">
          <img src="/ptichiy-dvor/img/farmer-rooster.jpg" alt="Фермер Сергей с петухом" loading="lazy" />
          <figcaption className="mono">Сергей — хозяин фермы, встаёт в 4:30</figcaption>
          <span className="stamp farm-stamp" aria-hidden="true">
            двор
            <br />
            №1 · 2016
          </span>
        </figure>

        <div className="farm-copy">
          <p className="mono farm-eyebrow rv">наша ферма · тульская область</p>
          <h2 className="rv rv-d1">Птица гуляет по траве, а не сидит в клетке</h2>
          <p className="rv rv-d2">
            С 2016 года держим двор в 90 км от Москвы. Куры и индейки живут на выгуле, едят
            зерно со своего поля и траву. Без стимуляторов роста и антибиотиков «для профилактики» —
            поэтому бройлер растёт 80 дней, а не 35, и вкус у него — как из детства, из деревни.
          </p>
          <dl className="farm-nums rv rv-d3">
            <div>
              <dt>4 200</dt>
              <dd>голов на выгуле</dd>
            </div>
            <div>
              <dt>1 200+</dt>
              <dd>семей забирают у нас еженедельно</dd>
            </div>
            <div>
              <dt>80 дней</dt>
              <dd>растёт бройлер — вдвое дольше магазинного</dd>
            </div>
          </dl>
          <ul className="farm-docs mono rv rv-d3">
            <li>Ветсвидетельство ф. №4 на каждую партию</li>
            <li>«Меркурий» — прослеживаемость РСХН</li>
            <li>Декларация ЕАЭС</li>
          </ul>
        </div>
      </div>

      <div className="farm-strip">
        {['/ptichiy-dvor/img/farm-hens-grass.jpg', '/ptichiy-dvor/img/hands-hen.jpg', '/ptichiy-dvor/img/chick-grass.jpg', '/ptichiy-dvor/img/turkey-pair.jpg', '/ptichiy-dvor/img/farm-flock-vivid.jpg'].map(
          (src, i) => (
            <figure key={src} className={`rv rv-clip rv-d${i % 4}`}>
              <img src={src} alt="Жизнь фермы" loading="lazy" />
            </figure>
          ),
        )}
      </div>
    </section>
  )
}

export function Eggs() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    if (REDUCED) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.eggs-word',
        { backgroundPositionY: '30%' },
        {
          backgroundPositionY: '70%',
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="eggs" ref={root} aria-labelledby="eggs-h">
      <h2 className="eggs-word" id="eggs-h" aria-label="Яйца">
        ЯЙЦА
      </h2>
      <div className="wrap eggs-in">
        <div className="eggs-copy rv">
          <p className="mono">собраны сегодня утром</p>
          <h3>Желток, который стоит ложкой</h3>
          <p>
            Куры на выгуле несут яйца с плотным оранжевым желтком — такие не купить в сетевом
            магазине. Собираем каждое утро, штампуем дату сбора на каждой коробке.
          </p>
          <div className="eggs-price rv rv-d1">
            <div>
              <b>220 ₽</b>
              <span className="mono">десяток С0</span>
            </div>
            <div>
              <b>560 ₽</b>
              <span className="mono">лоток 30 шт · −15%</span>
            </div>
          </div>
        </div>
        <figure className="eggs-photo rv rv-d1">
          <img src="/ptichiy-dvor/img/eggs-hand-dark.jpg" alt="Утренний сбор яиц в корзину" loading="lazy" />
          <span className="stamp eggs-stamp" aria-hidden="true">
            сбор
            <br />
            сегодня
          </span>
        </figure>
      </div>
    </section>
  )
}
