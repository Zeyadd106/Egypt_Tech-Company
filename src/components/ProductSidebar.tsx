import { Search } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

interface ProductSidebarProps {
  search: string
  onSearch: (v: string) => void
  category: string
  onCategory: (v: string) => void
  categories: string[]
  counts: Record<string, number>
  total: number
}

/** Atlas-style left sidebar: search box, category filter list, help box. */
export default function ProductSidebar({
  search,
  onSearch,
  category,
  onCategory,
  categories,
  counts,
  total,
}: ProductSidebarProps) {
  const { t } = useLang()
  return (
    <aside className="w-72 shrink-0 space-y-8" aria-label={t.products.filterGroup}>
      {/* Search */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-800">
          {t.products.searchLabel}
        </h2>
        <div className="mt-3 flex">
          <label htmlFor="sidebar-search" className="sr-only">
            {t.products.searchLabel}
          </label>
          <input
            id="sidebar-search"
            type="search"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={t.products.searchPh}
            autoComplete="off"
            className="min-w-0 flex-1 border border-e-0 border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => onSearch(search)}
            className="inline-flex items-center gap-1.5 bg-amber-500 px-4 py-2 text-sm font-bold text-[#20265e] transition-colors hover:bg-amber-400"
            aria-label={t.products.searchBtn}
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            {t.products.searchBtn}
          </button>
        </div>
      </div>

      {/* Categories */}
      <nav aria-label={t.products.filterGroup}>
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-800">
          {t.products.filterTitle}
        </h2>
        <ul className="mt-3 divide-y divide-slate-100 border-y border-slate-200">
          {['All', ...categories].map((c) => {
            const active = category === c
            const count = c === 'All' ? total : (counts[c] ?? 0)
            return (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => onCategory(c)}
                  aria-pressed={active}
                  className={`flex w-full items-center justify-between px-1 py-2.5 text-start text-sm transition-colors ${
                    active
                      ? 'font-bold text-amber-700'
                      : 'text-slate-600 hover:text-[#20265e]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={`h-3.5 w-1 ${active ? 'bg-amber-500' : 'bg-slate-200'}`}
                    />
                    {c === 'All' ? t.products.allProducts : c}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      active ? 'bg-amber-500/15 text-amber-800' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

    </aside>
  )
}
