import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { heroSlideMedia } from '../data/site'
import { useLang } from '../i18n/LanguageContext'

const AUTOPLAY_MS = 6000

/** Atlas-style full-width rotating banner: photo + caption panel + arrows/dots. */
export default function HeroSlider() {
  const { t, lang } = useLang()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = heroSlideMedia.length

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + count) % count)
  }, [count])

  useEffect(() => {
    if (paused || count <= 1) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, count, index])

  const media = heroSlideMedia[index]
  const slide = t.hero.slides[index]

  return (
    <section
      aria-label="Featured highlights"
      aria-roledescription="carousel"
      className="relative overflow-hidden bg-[#20265e]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[440px] py-10 sm:h-[500px] sm:py-0 lg:h-[560px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}: ${slide.title}`}
          >
            <img
              src={media.image}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.currentTarget
                if (target.src !== media.fallback) target.src = media.fallback
              }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#20265e]/90 via-[#20265e]/45 to-transparent rtl:-scale-x-100"
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#20265e]/70 to-transparent"
              aria-hidden="true"
            />
          </motion.div>
        </AnimatePresence>

        {/* caption */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`caption-${index}`}
                initial={{ opacity: 0, x: lang === 'ar' ? 24 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.45 }}
                className="max-w-xl border-s-4 border-amber-500 bg-[#20265e]/55 py-5 pe-6 ps-5 backdrop-blur-[2px] sm:ps-7"
              >
                <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                  {slide.title}
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">
                  {slide.text}
                </p>
                <Link
                  to={media.link}
                  className="group mt-5 inline-flex items-center gap-2 bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#20265e] transition-colors hover:bg-amber-400"
                >
                  {slide.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
                </Link>
              </motion.div>
            </AnimatePresence>
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

        {/* dots */}
        {count > 1 && (
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2" role="tablist" aria-label="Choose slide">
            {t.hero.slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`${t.hero.goTo} ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-3 transition-all ${
                  i === index ? 'w-9 bg-amber-500' : 'w-3 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
