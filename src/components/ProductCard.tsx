import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MessageSquareText } from 'lucide-react'
import type { Product } from '../types/product'
import { fmt } from '../i18n/translations'
import { categoryLabel } from '../data/catalog'
import { useLang } from '../i18n/LanguageContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const images = [product.image_url, ...(product.gallery ?? [])].filter(Boolean)
  const mainImage = images[0] ?? '/placeholder-product.svg'

  const askAbout = () => {
    navigate(`/contact?product=${encodeURIComponent(product.slug)}`)
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <Link
        to={`/products/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-slate-100"
        aria-label={fmt(t.card.viewLabel, { name: product.name })}
      >
        <img
          src={mainImage}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const t = e.currentTarget
            if (!t.src.endsWith('placeholder-product.svg')) t.src = '/placeholder-product.svg'
          }}
        />
        <span className="absolute start-3 top-3 rounded-full bg-[#20265e]/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          {categoryLabel(product.category, lang)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold leading-snug text-slate-900">
          <Link to={`/products/${product.slug}`} className="transition-colors hover:text-amber-700">
            {product.name}
          </Link>
        </h3>
        <p className="clamp-2 mt-2 flex-1 text-sm leading-relaxed text-slate-600">
          {product.short_description}
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <Link
            to={`/products/${product.slug}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#20265e] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2f3788]"
          >
            {t.card.view}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={askAbout}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-amber-600/40 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-100"
          >
            <MessageSquareText className="h-4 w-4" aria-hidden="true" />
            {t.card.ask}
          </button>
        </div>
      </div>
    </motion.article>
  )
}
