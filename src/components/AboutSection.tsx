import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import { WavesDecoration } from './Decorations'
import { homeAboutMedia } from '../data/site'
import { useLang } from '../i18n/LanguageContext'

/** Homepage About section: centered heading, photo + paragraphs. Text from dictionary. */
export default function AboutSection() {
  const { t } = useLang()
  const c = t.homeAbout
  const [first, ...rest] = c.paragraphs

  return (
    <section className="relative overflow-hidden bg-white py-14 lg:py-16" aria-label="About Egypt Tech">
      <WavesDecoration className="pointer-events-none absolute inset-y-0 start-0 h-full w-64 opacity-70" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-center text-xl font-semibold tracking-tight text-slate-800 sm:text-2xl">
            {c.headingLead}
            <span className="text-amber-600">{c.headingAccent}</span>
          </h2>
        </Reveal>

        <div className="mt-8 grid items-start gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <Reveal>
            <img
              src={homeAboutMedia.image}
              alt={c.imageAlt}
              loading="lazy"
              className="aspect-[3/4] w-full rounded-sm border border-slate-200 object-cover shadow-md"
              onError={(e) => {
                const target = e.currentTarget
                if (target.src !== homeAboutMedia.fallbackImage)
                  target.src = homeAboutMedia.fallbackImage
              }}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-4 pt-1 text-[13px] leading-[1.9] text-slate-600">
              {first && <p>{first}</p>}
              {rest.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <Link
              to={homeAboutMedia.link}
              className="group mt-6 inline-flex items-center gap-2 bg-[#20265e] px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#2f3788]"
            >
              {c.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
