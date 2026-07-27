import { useEffect, useRef, useState } from 'react'
import { CUTS } from '../data/products'
import { fmt, useCart } from '../lib/cart'
import { gsap, REDUCED } from '../lib/motion'

/* стилизованный силуэт курицы (вид сбоку, смотрит влево) + пунктирные линии разделки */
const BODY =
  'M46 34 C40 26 46 18 52 22 C54 14 64 14 65 22 C72 18 78 24 72 31 ' +
  'C88 36 104 34 122 30 C150 24 168 12 186 8 C182 22 176 32 166 42 ' +
  'C176 44 184 42 192 38 C188 52 176 62 160 66 C158 92 138 112 110 116 ' +
  'C102 118 92 118 84 116 C86 122 86 128 84 134 L78 134 C78 128 78 124 76 119 ' +
  'C74 124 74 128 74 134 L68 134 C66 126 66 120 66 114 C48 106 36 90 36 70 ' +
  'C36 56 40 44 46 34 Z'

const CUT_LINES = [
  'M66 62 C76 74 92 82 108 82', // грудка / бедро
  'M92 42 C96 56 96 70 92 84', // крыло
  'M108 82 C114 92 116 100 114 110', // бедро / голень
  'M64 40 C78 50 96 54 116 52', // спинка / грудка
]

export function Cuts() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const { add } = useCart()
  const cut = CUTS[active]

  useEffect(() => {
    if (REDUCED) return
    const ctx = gsap.context(() => {
      const path = root.current?.querySelector<SVGPathElement>('.cuts-body')
      if (!path) return
      const len = path.getTotalLength()
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
      })
      gsap.fromTo(
        '.cuts-line',
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.12,
          duration: 0.5,
          scrollTrigger: { trigger: root.current, start: 'top 34%' },
        },
      )
      gsap.fromTo(
        '.cuts-dot',
        { scale: 0, transformOrigin: 'center' },
        {
          scale: 1,
          stagger: 0.09,
          duration: 0.45,
          ease: 'back.out(2.4)',
          scrollTrigger: { trigger: root.current, start: 'top 30%' },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="cuts" id="cuts" ref={root}>
      <div className="wrap cuts-in">
        <header className="cuts-head rv">
          <p className="mono cuts-eyebrow">схема разделки</p>
          <h2>Разбираем птицу без остатка</h2>
          <p className="cuts-lead">
            Наведите на часть — покажем отруб, цену и что из него готовить. Разделываем при вас
            в день доставки.
          </p>
        </header>

        <div className="cuts-stage">
          <div className="cuts-fig rv">
            <svg viewBox="0 0 200 150" role="img" aria-label="Схема разделки курицы">
              <path className="cuts-body" d={BODY} />
              {CUT_LINES.map((d, i) => (
                <path key={i} className="cuts-line" d={d} />
              ))}
              {/* ценник-чип у активной точки (под точками, чтобы не перекрывать) */}
              <g
                className="cuts-chip"
                key={`chip-${cut.id}`}
                transform={`translate(${(cut.x / 100) * 200} ${(cut.y / 100) * 150 - 19})`}
                pointerEvents="none"
              >
                <rect x={-(String(cut.price).length * 4.6 + 22) / 2} y="-8" rx="4.5" width={String(cut.price).length * 4.6 + 22} height="13" />
                <text y="1.4" textAnchor="middle">{cut.price} ₽/кг</text>
              </g>
              {CUTS.map((c, i) => (
                <g
                  key={c.id}
                  className={`cuts-dot${i === active ? ' on' : ''}`}
                  transform={`translate(${(c.x / 100) * 200} ${(c.y / 100) * 150})`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  role="button"
                  aria-label={c.name}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActive(i)}
                >
                  <circle className="cuts-dot-halo" r="9" />
                  <circle className="cuts-dot-core" r="4.6" />
                  <text y="1.8" textAnchor="middle">
                    {i + 1}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <aside className="cuts-card" key={cut.id}>
            <div className="cuts-card-media">
              <img src={cut.img} alt={cut.name} loading="lazy" />
              <span className="mono cuts-card-idx">
                {String(active + 1).padStart(2, '0')} / {String(CUTS.length).padStart(2, '0')}
              </span>
            </div>
            <h3>{cut.name}</h3>
            <p>{cut.desc}</p>
            <div className="cuts-card-row">
              <b>
                {fmt(cut.price)} <span className="mono">₽/кг</span>
              </b>
              <button className="btn btn-primary btn-sm" onClick={() => add(mapCutToProduct(cut.id), cut.name)}>
                В корзину
              </button>
            </div>
            <ol className="cuts-legend mono">
              {CUTS.map((c, i) => (
                <li key={c.id} className={i === active ? 'on' : ''} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}>
                  {i + 1}. {c.name}
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  )
}

function mapCutToProduct(cutId: string): string {
  switch (cutId) {
    case 'breast':
      return 'fillet'
    case 'drumstick':
      return 'drumsticks'
    case 'thigh':
    case 'wing':
    case 'carcass':
    default:
      return 'broiler-whole'
  }
}
