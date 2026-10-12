import { heroSlideMedia } from '../data/site'
import { useLang } from '../i18n/LanguageContext'

/** One infinite, seamless scrolling row of product photos. */
function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...heroSlideMedia, ...heroSlideMedia]
  return (
    <div className="group/row flex overflow-hidden">
      <div
        className={`flex w-max gap-5 ${
          reverse
            ? 'animate-[marquee-rev_38s_linear_infinite]'
            : 'animate-[marquee_34s_linear_infinite]'
        } group-hover/row:[animation-play-state:paused]`}
      >
        {items.map((media, i) => (
          <div
            key={`${media.image}-${i}`}
            aria-hidden={i >= heroSlideMedia.length}
            className="group/card relative flex h-40 w-40 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-amber-400/60 hover:bg-white/10 sm:h-44 sm:w-44"
          >
            <span className="absolute inset-5 rounded-full bg-accent-500/0 blur-2xl transition-colors duration-300 group-hover/card:bg-accent-500/25" />
            <img
              src={media.image}
              alt=""
              loading="lazy"
              className="relative h-full w-full object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.35)]"
              onError={(e) => {
                const target = e.currentTarget
                if (target.src !== media.fallback) target.src = media.fallback
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

/** About-page product gallery: dual auto-scrolling marquee bands. */
export default function ProductMarquee() {
  const { t } = useLang()
  const a = t.about

  return (
    <section className="relative overflow-hidden bg-[#20265e] py-14 lg:py-16" aria-label={a.galleryTitle}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-32 top-0 h-72 w-72 rounded-full bg-accent-500/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-32 bottom-0 h-72 w-72 rounded-full bg-ink-700/50 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">{a.galleryEyebrow}</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            {a.galleryTitle}
          </h2>
          <p className="mt-3 text-slate-300">{a.galleryText}</p>
        </div>
      </div>

      <div
        dir="ltr"
        className="relative mt-10 space-y-5 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      >
        <Row />
        <Row reverse />
      </div>
    </section>
  )
}
