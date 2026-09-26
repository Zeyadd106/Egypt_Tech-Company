import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroSlider from '../components/HeroSlider'
import AboutSection from '../components/AboutSection'
import WhyChooseBand from '../components/WhyChooseBand'
import SectionTitle from '../components/SectionTitle'
import Reveal from '../components/Reveal'
import ProductGrid from '../components/ProductGrid'
import CategoryGrid from '../components/CategoryGrid'
import Seo from '../components/Seo'
import { useFeaturedProducts, useProducts } from '../hooks/useProducts'
import { useLang } from '../i18n/LanguageContext'

export default function Home() {
  const { t } = useLang()
  const { products: featured, loading } = useFeaturedProducts(6)
  const { categories } = useProducts()

  return (
    <>
      <Seo
        title={t.seo.homeTitle}
        description={t.seo.homeDesc}
        path="/"
      />
      <HeroSlider />
      <AboutSection />
      <WhyChooseBand />

      {/* Featured products */}
      <section className="border-y border-slate-200 bg-slate-100/70 py-14 lg:py-16" aria-label={t.featured.title}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <SectionTitle
                align="left"
                eyebrow={t.featured.eyebrow}
                title={t.featured.title}
                text={t.featured.text}
              />
              <Link
                to="/products"
                className="group inline-flex shrink-0 items-center gap-1.5 bg-[#20265e] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#2f3788]"
              >
                {t.featured.viewAll}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-8">
            <ProductGrid products={featured} loading={loading} />
          </div>
        </div>
      </section>

      <CategoryGrid categories={categories} />
    </>
  )
}
