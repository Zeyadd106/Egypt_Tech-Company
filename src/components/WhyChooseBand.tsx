import Reveal from './Reveal'
import { CubesDecoration } from './Decorations'
import { useLang } from '../i18n/LanguageContext'

/** Homepage "Why Choose" band: gray band, text + geometric cubes. Text from dictionary. */
export default function WhyChooseBand() {
  const { t } = useLang()
  const c = t.whyBand

  return (
    <section
      className="relative overflow-hidden border-y border-slate-200 bg-[#eef0f3] py-14 lg:py-16"
      aria-label="Why choose Egypt Tech"
    >
      <CubesDecoration className="pointer-events-none absolute -end-16 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 md:block lg:end-0 lg:h-[480px] lg:w-[480px] rtl:-scale-x-100" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <Reveal>
            <h2 className="text-xl font-semibold tracking-tight text-slate-800 sm:text-2xl">
              {c.headingLead}
              <span className="text-amber-600">{c.headingAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-5 space-y-4 text-[13px] leading-[1.9] text-slate-600">
              {c.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
