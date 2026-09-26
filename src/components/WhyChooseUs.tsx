import { Cog, Headset, ShieldCheck, Wrench } from 'lucide-react'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'
import { useLang } from '../i18n/LanguageContext'

const icons: Record<string, typeof ShieldCheck> = {
  shield: ShieldCheck,
  wrench: Wrench,
  cog: Cog,
  headset: Headset,
}

export default function WhyChooseUs() {
  const { t } = useLang()
  return (
    <section className="bg-white py-16 lg:py-20" aria-label="Why choose us">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            eyebrow={t.whyUs.eyebrow}
            title={t.whyUs.title}
            text={t.whyUs.text}
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.whyUs.items.map((item, i) => {
            const Icon = icons[item.icon] ?? ShieldCheck
            return (
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-slate-200 bg-slate-50/60 p-6 transition-shadow hover:shadow-md">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#20265e] text-amber-400">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
