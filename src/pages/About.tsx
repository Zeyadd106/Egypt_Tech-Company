import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Eye, Gem, Rocket } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import AboutBanner from '../components/AboutBanner'
import PageCrumbs from '../components/PageCrumbs'
import WhyChooseUs from '../components/WhyChooseUs'
import Seo from '../components/Seo'
import { WavesDecoration, Zigzag } from '../components/Decorations'
import { useLang } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLang()
  const a = t.about
  const bandItems = [
    { icon: Eye, title: a.bandVision, text: a.vision },
    { icon: Rocket, title: a.bandMission, text: a.mission },
    { icon: Gem, title: a.bandValues, text: a.valuesSummary },
  ]

  return (
    <>
      <Seo
        title={t.seo.aboutTitle}
        description={t.seo.aboutDesc}
        path="/about"
      />

      <AboutBanner />
      <PageCrumbs title={a.crumb} trail={[{ label: a.homeCrumb, to: '/' }, { label: a.crumb }]} />

      {/* Who We Are — logo + story (Atlas-style) */}
      <section className="relative overflow-hidden bg-white py-14 lg:py-16" aria-label="Who we are">
        <WavesDecoration className="pointer-events-none absolute inset-y-0 start-0 h-full w-64 opacity-70" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-center text-3xl font-medium tracking-tight text-slate-800 sm:text-4xl">
              {a.whoLead}<span className="text-amber-600">{a.whoAccent}</span>
            </h1>
            <Zigzag className="mx-auto mt-4 h-3 w-12" />
          </Reveal>

          <div className="mt-10 grid items-start gap-10 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <Reveal>
              <img
                src="/logo.png"
                alt="Egypt Tech company logo"
                className="w-full rounded-sm border border-slate-200 object-cover shadow-md"
              />
            </Reveal>
            <Reveal delay={0.08}>
              <div className="space-y-4 text-[13px] leading-[1.9] text-slate-600">
                {a.story.map((p, i) => (
                  <p key={p.slice(0, 24)}>
                    {i === 0 ? (
                      <>
                        <strong className="font-bold text-slate-800">{a.companyBold} </strong>
                        {p.replace(new RegExp(`^${a.companyBold}\\s*`), '')}
                      </>
                    ) : (
                      p
                    )}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision / Mission / Values band */}
      <section className="bg-[#20265e] py-14 lg:py-16" aria-label="Vision, mission and values">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {bandItems.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="flex items-start gap-4">
                <Icon className="h-9 w-9 shrink-0 text-amber-400" aria-hidden="true" strokeWidth={1.5} />
                <div>
                  <h2 className="text-lg font-bold text-white">{title}</h2>
                  <p className="mt-2 text-[13px] leading-[1.9] text-slate-300">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" aria-label="Capabilities">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionTitle
              align="left"
              eyebrow={a.capEyebrow}
              title={a.capTitle}
              text={a.capText}
            />
            <Link
              to="/products"
              className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-[#20265e] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2f3788]"
            >
              {a.browse}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="space-y-3">
              {a.capabilities.map((c) => (
                <li key={c} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden="true" />
                  <span className="text-sm font-medium text-slate-800">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <WhyChooseUs />
    </>
  )
}
