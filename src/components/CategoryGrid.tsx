import { Link } from 'react-router-dom'
import { Cpu, Cog, Droplets, Gauge, Wind, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'
import { useLang } from '../i18n/LanguageContext'

const iconMap: Record<string, typeof Cpu> = {
  'Air Compressors': Wind,
  'Air Treatment': Droplets,
  'Spare Parts': Cog,
  'Hydraulic Systems': Gauge,
}

interface CategoryGridProps {
  categories: string[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const { t } = useLang()
  const list = categories.length > 0 ? categories : ['Air Compressors', 'Air Treatment', 'Spare Parts', 'Hydraulic Systems']
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20" aria-label="Product categories">
      <Reveal>
        <SectionTitle
          eyebrow={t.categories.eyebrow}
          title={t.categories.title}
          text={t.categories.text}
        />
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {list.map((cat, i) => {
          const Icon = iconMap[cat] ?? Cpu
          return (
            <Reveal key={cat} delay={i * 0.05}>
              <Link
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-7 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#20265e] transition-colors group-hover:bg-amber-500">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="text-sm font-bold text-slate-800">{cat}</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 opacity-0 transition-opacity group-hover:opacity-100">
                  {t.categories.browse} <ArrowRight className="h-3 w-3 rtl:rotate-180" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
