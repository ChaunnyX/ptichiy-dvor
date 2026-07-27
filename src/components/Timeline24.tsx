import { useEffect, useRef, useState } from 'react'
import { gsap, REDUCED } from '../lib/motion'

const STEPS = [
  {
    time: '05:00',
    title: 'Забой под ваш заказ',
    text: 'Бьём ровно столько, сколько заказано на завтра. Ничего не лежит на складе неделями.',
    img: '/ptichiy-dvor/img/farm-yard-dark.jpg',
  },
  {
    time: '08:30',
    title: 'Воздушное охлаждение',
    text: 'Не «мокрый» хлор-чан, как на комбинатах, а холодный воздух: мясо не набирает воду.',
    img: '/ptichiy-dvor/img/product-broiler-dark.jpg',
  },
  {
    time: '13:00',
    title: 'Разделка и упаковка',
    text: 'Ветврач ставит клеймо на партию, разделываем по вашему списку, вакуумируем.',
    img: '/ptichiy-dvor/img/prep-seasoning.jpg',
  },
  {
    time: '09:00',
    title: 'Утром — у вашей двери',
    text: 'Везём в рефрижераторе при +2 °C. От двора до вашей плиты — меньше суток.',
    img: '/ptichiy-dvor/img/roast-basting.jpg',
    next: true,
  },
]

export function Timeline24() {
  const root = useRef<HTMLElement>(null)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (REDUCED) return
    const ctx = gsap.context(() => {
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: `+=${STEPS.length * 90}%`,
          pin: true,
          scrub: 0.4,
          onUpdate: (self) => {
            const i = Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length))
            setIdx((prev) => (prev === i ? prev : i))
          },
        },
      })
      st.to('.tl-progress', { scaleX: 1, ease: 'none' }, 0)
    }, root)
    return () => ctx.revert()
  }, [])

  const s = STEPS[idx]

  return (
    <section className="tl" id="fresh" ref={root}>
      <div className="tl-media" aria-hidden="true">
        {STEPS.map((st, i) => (
          <img key={st.img} src={st.img} alt="" className={i === idx ? 'on' : ''} loading="lazy" />
        ))}
        <div className="tl-shade" />
      </div>

      <div className="wrap tl-in">
        <p className="mono tl-eyebrow">почему у нас вкуснее · 24 часа</p>
        <div className="tl-clock" aria-live="polite">
          <span className="tl-time mono" key={s.time}>
            {s.time}
          </span>
          {s.next && <span className="tl-next mono">+1 день</span>}
        </div>
        <h2 className="tl-title" key={`t${idx}`}>
          {s.title}
        </h2>
        <p className="tl-text" key={`x${idx}`}>
          {s.text}
        </p>

        <div className="tl-bar">
          <i className="tl-progress" />
          {STEPS.map((st, i) => (
            <em key={st.time} className={`mono${i <= idx ? ' passed' : ''}`} style={{ left: `${(i / (STEPS.length - 1)) * 100}%` }}>
              {st.time}
            </em>
          ))}
        </div>
      </div>
    </section>
  )
}
