import { AnimatePresence } from 'framer-motion'
import type { Product } from '../types/product'
import ProductCard from './ProductCard'
import { EmptyState, LoadingGrid } from './States'
import { useLang } from '../i18n/LanguageContext'

interface ProductGridProps {
  products: Product[]
  loading: boolean
  searchActive?: boolean
}

export default function ProductGrid({ products, loading, searchActive }: ProductGridProps) {
  const { t } = useLang()
  if (loading) return <LoadingGrid />
  if (products.length === 0) {
    return (
      <EmptyState
        title={searchActive ? t.states.emptySearch : t.states.emptyNone}
        text={searchActive ? t.states.emptySearchHint : t.states.emptyHint}
      />
    )
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </AnimatePresence>
    </div>
  )
}
