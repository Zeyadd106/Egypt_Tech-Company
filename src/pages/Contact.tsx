import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone, XCircle } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import AboutBanner from '../components/AboutBanner'
import PageCrumbs from '../components/PageCrumbs'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { useProduct } from '../hooks/useProducts'
import { officeLocation, siteConfig } from '../data/site'
import { fmt } from '../i18n/translations'
import { useLang } from '../i18n/LanguageContext'

/** Office map: Google Maps embed of the client's exact pin (no API key needed). */
const MAP_SRC = `https://www.google.com/maps?q=${officeLocation.lat},${officeLocation.lng}&z=17&output=embed`

export default function Contact() {
  const { t } = useLang()
  const c = t.contact
  const [params, setParams] = useSearchParams()
  const productSlug = params.get('product')
  const { product } = useProduct(productSlug ?? undefined)

  const productContext = useMemo(() => {
    if (!productSlug) return null
    return { slug: productSlug, name: product?.name ?? productSlug, id: product?.id ?? null }
  }, [productSlug, product])

  const clearProduct = () => {
    params.delete('product')
    setParams(params, { replace: true })
  }

  const infoItems = [
    { icon: Mail, label: c.emailLabel, value: siteConfig.email },
    { icon: Phone, label: c.callLabel, value: siteConfig.phone },
    { icon: MapPin, label: c.visitLabel, value: siteConfig.address },
    { icon: Clock, label: c.hoursLabel, value: siteConfig.hours },
  ]

  const socials = [
    { abbr: 'Fb', label: 'Facebook', href: siteConfig.socials.facebook },
    { abbr: 'In', label: 'LinkedIn', href: siteConfig.socials.linkedin },
    { abbr: 'X', label: 'X', href: siteConfig.socials.x },
    { abbr: 'Ig', label: 'Instagram', href: siteConfig.socials.instagram },
  ]

  return (
    <>
      <Seo
        title={productContext ? fmt(t.seo.inquiryTitle, { name: productContext.name }) : t.seo.contactTitle}
        description={t.seo.contactDesc}
        path="/contact"
      />
      <AboutBanner />
      <PageCrumbs
        title={productContext ? c.inquiryCrumb : c.crumb}
        trail={[{ label: t.homeCrumb, to: '/' }, { label: c.crumb }]}
      />

      {/* Office map with overlay card */}
      <section className="relative" aria-label="Office location">
        <iframe
          title={c.mapTitle}
          src={MAP_SRC}
          loading="lazy"
          className="h-[300px] w-full border-0 sm:h-[340px]"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative py-6 md:static md:py-0">
            <div className="relative bg-[#20265e] p-6 text-white shadow-lg md:absolute md:end-8 md:top-1/2 md:w-64 md:-translate-y-1/2 lg:end-12">
              <h2 className="text-base font-bold">{c.office}</h2>
              <p className="mt-3 flex items-start gap-2 text-[13px] leading-relaxed text-slate-200">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <span>
                  {siteConfig.companyName}
                  <br />
                  {siteConfig.address}
                </span>
              </p>
              <div
                className="absolute -bottom-4 start-8 h-4 w-8 bg-[#20265e] [clip-path:polygon(0_0,100%_0,0_100%)] rtl:-scale-x-100"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="border-b border-slate-200 bg-white" aria-label="Contact channels">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {infoItems.map(({ icon: Icon, label, value }, i) => (
            <Reveal key={label} delay={i * 0.06}>
              <div className="flex items-start gap-3">
                <Icon className="h-8 w-8 shrink-0 text-amber-600" aria-hidden="true" strokeWidth={1.5} />
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-slate-500">{label}</p>
                  <p className="break-words text-sm font-bold text-slate-800">{value}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Write a message */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8" aria-label={c.writeTitle}>
        <Reveal>
          <h1 className="text-center text-2xl font-medium tracking-tight text-slate-800">
            {c.writeTitle}
          </h1>
        </Reveal>
        <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <Reveal>
            <div className="text-[13px] leading-[1.9] text-slate-600">
              <p>{c.writeText}</p>
              <p className="mt-6 text-slate-500">{c.socialTitle}</p>
              <div className="mt-3 flex gap-2">
                {socials.map(({ abbr, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={`${siteConfig.companyName} on ${label}`}
                    className="flex h-9 w-9 items-center justify-center border border-slate-300 text-xs font-bold text-slate-500 transition-colors hover:border-amber-500 hover:bg-amber-500 hover:text-[#20265e]"
                  >
                    {abbr}
                  </a>
                ))}
              </div>
              <p className="mt-6 rounded-xl bg-slate-100 px-4 py-3 text-xs text-slate-500">
                {c.dataNote}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              {productContext && product && (
                <div className="mb-6 flex items-center justify-between gap-3 border border-amber-300 bg-amber-50 px-4 py-3">
                  <p className="text-sm">
                    <span className="font-semibold text-amber-900">{c.inquiring} </span>
                    <Link
                      to={`/products/${product.slug}`}
                      className="font-bold text-amber-800 underline underline-offset-2 hover:text-amber-900"
                    >
                      {product.name}
                    </Link>
                  </p>
                  <button
                    type="button"
                    onClick={clearProduct}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-100"
                    aria-label={c.clearLabel}
                  >
                    <XCircle className="h-4 w-4" aria-hidden="true" />
                    {c.clear}
                  </button>
                </div>
              )}
              <ContactForm
                key={productContext?.slug ?? 'general'}
                compact
                productName={productContext ? (product?.name ?? productContext.name) : null}
                productId={productContext ? (product?.id ?? null) : null}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
