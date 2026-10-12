import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import AboutBanner from '../components/AboutBanner'
import PageCrumbs from '../components/PageCrumbs'
import ProductGrid from '../components/ProductGrid'
import ProductSidebar from '../components/ProductSidebar'
import Pagination from '../components/Pagination'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { ErrorState } from '../components/States'
import { useDebouncedValue, useProducts } from '../hooks/useProducts'
import { getProducts } from '../services/productService'
import { buildCategoryTree, categoryLabel, getProductCategoryIds } from '../data/catalog'
import { fmt } from '../i18n/translations'
import { useLang } from '../i18n/LanguageContext'

export type SortOption = 'featured' | 'name-asc' | 'name-desc' | 'newest'

const PAGE_SIZE = 9

export default function Products() {
  const { t, lang } = useLang()
  const [params, setParams] = useSearchParams()
  const initialCategory = params.get('category') ?? 'All'

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(initialCategory)
  const [sort, setSort] = useState<SortOption>('featured')
  const [page, setPage] = useState(1)
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [totalAll, setTotalAll] = useState(0)
  const gridTopRef = useRef<HTMLDivElement>(null)

  const debouncedSearch = useDebouncedValue(search, 350)

  const query = useMemo(
    () => ({ search: debouncedSearch, category, sort }),
    [debouncedSearch, category, sort],
  )
  const { products, categories, loading, error } = useProducts(query)

  // Category counts for the sidebar (full catalog, fetched once).
  useEffect(() => {
    let cancelled = false
    getProducts()
      .then((all) => {
        if (cancelled) return
        const c: Record<string, number> = {}
        for (const p of all) {
          for (const id of getProductCategoryIds(p)) c[id] = (c[id] ?? 0) + 1
        }
        setCounts(c)
        setTotalAll(all.length)
      })
      .catch(() => undefined)
    return () => {
      cancelled = true
    }
  }, [])

  // Reset to first page whenever filters change.
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, category, sort])

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paged = products.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  const from = products.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1
  const to = Math.min(safePage * PAGE_SIZE, products.length)

  const changeCategory = (c: string) => {
    setCategory(c)
    if (c === 'All') params.delete('category')
    else params.set('category', c)
    setParams(params, { replace: true })
  }

  const changePage = (p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages))
    gridTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Seo
        title={t.seo.productsTitle}
        description={t.seo.productsDesc}
        path="/products"
      />
      <AboutBanner />
      <PageCrumbs
        title={t.products.crumb}
        trail={[{ label: t.homeCrumb, to: '/' }, { label: t.products.crumb }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Mobile search + categories */}
        <div className="mb-6 lg:hidden">
          <label className="relative block" htmlFor="product-search-mobile">
            <Search
              className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="product-search-mobile"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.products.searchPh}
              autoComplete="off"
              className="w-full border border-slate-300 bg-white py-3 ps-10 pe-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:outline-none"
            />
          </label>
          <div
            className="mt-3 flex gap-2 overflow-x-auto pb-1"
            role="group"
            aria-label="Filter by category"
          >
            {['All', ...buildCategoryTree(categories).map((n) => n.id)].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => changeCategory(c)}
                aria-pressed={category === c}
                className={`shrink-0 border px-4 py-2 text-sm font-semibold transition-colors ${
                  category === c
                    ? 'border-[#20265e] bg-[#20265e] text-white'
                    : 'border-slate-300 bg-white text-slate-700'
                }`}
              >
                {c === 'All' ? t.products.all : categoryLabel(c, lang)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-8">
          <div className="hidden lg:block">
            <ProductSidebar
              search={search}
              onSearch={setSearch}
              category={category}
              onCategory={changeCategory}
              categories={categories}
              counts={counts}
              total={totalAll}
            />
          </div>

          <div className="min-w-0 flex-1" ref={gridTopRef}>
            {/* Toolbar */}
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500" role="status" aria-live="polite">
                {loading
                  ? t.products.loading
                  : fmt(t.products.showing, { from, to, total: products.length })}
              </p>
              <label className="flex items-center gap-2 text-sm text-slate-600" htmlFor="product-sort">
                {t.products.sortBy}
                <select
                  id="product-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 focus:border-amber-600 focus:outline-none"
                >
                  <option value="featured">{t.products.sortFeatured}</option>
                  <option value="name-asc">{t.products.sortNameAsc}</option>
                  <option value="name-desc">{t.products.sortNameDesc}</option>
                  <option value="newest">{t.products.sortNewest}</option>
                </select>
              </label>
            </div>

            <div className="mt-6">
              {error ? (
                <ErrorState message={t.states.errProducts} onRetry={() => window.location.reload()} />
              ) : (
                <Reveal>
                  <ProductGrid
                    products={paged}
                    loading={loading}
                    searchActive={Boolean(debouncedSearch || category !== 'All')}
                  />
                </Reveal>
              )}
              {!loading && !error && (
                <Pagination page={safePage} totalPages={totalPages} onChange={changePage} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
