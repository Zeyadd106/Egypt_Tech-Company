import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { heroSlideMedia } from '../data/site'
import { useLang } from '../i18n/LanguageContext'

const AUTOPLAY_MS = 2000

/** Homepage hero — split showcase: animated caption on the left, a
 *  floating product display cycling through the client's photos on the right. */
export default function HeroSlider() {
  const { t, lang } = useLang()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = heroSlideMedia.length
  const captionCount = t.hero.slides.length

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count],
  )

  useEffect(() => {
    if (paused || count <= 1) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, count, index])

  const media = heroSlideMedia[index]
  const slide = t.hero.slides[index % captionCount]

  return (
    <section
      aria-label="Featured highlights"
      aria-roledescription="carousel"
      className="relative overflow-hidden bg-[#20265e]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* backdrop decor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-44 -top-44 h-[480px] w-[480px] rounded-full bg-accent-500/20 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -end-44 h-[540px] w-[540px] rounded-full bg-ink-700/50 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />

      <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-14 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-20">
        {/* ---- caption ---- */}
        <div className="order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={`caption-${index % captionCount}`}
              initial={{ opacity: 0, x: lang === 'ar' ? 28 : -28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 14 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${(index % captionCount) + 1} of ${captionCount}: ${slide.title}`}
              className="max-w-xl border-s-4 border-amber-500 bg-white/5 py-6 pe-6 ps-5 backdrop-blur-sm sm:ps-7"
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
                Egypt&nbsp;Tech · VORTEX
              </p>
              <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                {slide.title}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">
                {slide.text}
              </p>
              <Link
                to={media.link}
                className="group mt-6 inline-flex items-center gap-2 bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#20265e] transition-colors hover:bg-amber-400"
              >
                {slide.cta}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* progress tracks */}
          {count > 1 && (
            <div
              className="mt-8 flex w-full max-w-xl flex-wrap gap-1.5"
              role="tablist"
              aria-label="Choose slide"
            >
              {heroSlideMedia.map((m, i) => (
                <button
                  key={m.image}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`${t.hero.goTo} ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className="group relative h-1.5 grow basis-8 cursor-pointer overflow-hidden rounded-full bg-white/20 transition-colors hover:bg-white/40"
                >
                  <motion.span
                    className="absolute inset-0 origin-left rounded-full bg-amber-500 rtl:origin-right"
                    initial={false}
                    animate={
                      i === index
                        ? { scaleX: 1, transition: { duration: AUTOPLAY_MS / 1000, ease: 'linear' } }
                        : { scaleX: 0, transition: { duration: 0.25 } }
                    }
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ---- product showcase ---- */}
        <div className="order-2 mx-auto w-full max-w-[420px]">
          <div
            className="relative aspect-square w-full"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}: ${slide.title}`}
          >
            {/* counter badge */}
            <div className="absolute start-2 top-2 z-20 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.25em] text-white backdrop-blur">
              <span className="text-amber-400">{String(index + 1).padStart(2, '0')}</span>
              <span className="mx-1 text-white/40">/</span>
              {String(count).padStart(2, '0')}
            </div>

            {/* glow + rings */}
            <div
              aria-hidden="true"
              className="absolute inset-x-6 top-6 bottom-10 rounded-full bg-accent-500/25 blur-[90px]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-2 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute inset-10 animate-[hero-spin-slow_48s_linear_infinite]"
            >
              <div className="h-full w-full rounded-full border border-dashed border-amber-400/25" />
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-amber-400 shadow-[0_0_14px_3px_rgba(244,141,36,0.55)]" />
            </div>

            {/* rotating aurora halo */}
            <div
              aria-hidden="true"
              className="absolute inset-6 animate-[hero-spin-slow_22s_linear_infinite] rounded-full opacity-50 blur-2xl"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0%, rgba(244,141,36,0.55) 18%, transparent 38%, rgba(61,71,163,0.75) 60%, transparent 82%, rgba(242,211,49,0.4) 92%, transparent 100%)',
              }}
            />

            {/* floating product */}
            <AnimatePresence mode="wait">
              <motion.div
                key={media.image}
                initial={{ opacity: 0, scale: 0.88, y: 26, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.06, y: -20, rotate: 2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center p-10"
              >
                <div className="h-full w-full animate-[hero-float_7s_ease-in-out_infinite]">
                  <img
                    src={media.image}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-contain drop-shadow-[0_28px_30px_rgba(0,0,0,0.45)]"
                    onError={(e) => {
                      const target = e.currentTarget
                      if (target.src !== media.fallback) target.src = media.fallback
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* light sweep on each slide */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
            >
              <motion.span
                key={`shine-${media.image}`}
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="absolute inset-y-0 left-0 w-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </div>

            {/* platform glow */}
            <div
              aria-hidden="true"
              className="absolute bottom-[4%] left-1/2 h-5 w-[62%] -translate-x-1/2 rounded-[100%] bg-gradient-to-r from-transparent via-accent-500/60 to-transparent blur-[6px]"
            />
            {/* secondary floating image for depth */}
            <div
              aria-hidden="true"
              className="absolute -start-2 bottom-6 hidden w-16 animate-[hero-float-sub_9s_ease-in-out_infinite] opacity-0 lg:block lg:opacity-70"
            >
              <img
                src={heroSlideMedia[(index + 5) % count].image}
                alt=""
                className="h-full w-full object-contain drop-shadow-[0_14px_16px_rgba(0,0,0,0.35)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* arrows */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t.hero.prev}
            className="absolute start-3 top-1/2 hidden -translate-y-1/2 bg-black/40 p-2.5 text-white transition-colors hover:bg-amber-500 hover:text-[#20265e] sm:block"
          >
            <ChevronLeft className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t.hero.next}
            className="absolute end-3 top-1/2 hidden -translate-y-1/2 bg-black/40 p-2.5 text-white transition-colors hover:bg-amber-500 hover:text-[#20265e] sm:block"
          >
            <ChevronRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
          </button>
        </>
      )}
    </section>
  )
}