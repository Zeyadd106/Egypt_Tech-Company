import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import type { CategoryNode } from '../types/product'
import CategoryIcon from './CategoryIcon'
import { buildCategoryTree, categoryLabel, getCategoryPath } from '../data/catalog'
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

interface SidebarBranchProps {
  node: CategoryNode
  depth: number
  activeId: string
  isOpen: (id: string) => boolean
  onToggle: (id: string) => void
  onSelect: (id: string) => void
  counts: Record<string, number>
}

/** Atlas-style left sidebar: search box + nested category tree filter. */
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
  const tree = useMemo(() => buildCategoryTree(categories), [categories])

  // Branches opened automatically because they contain the active filter…
  const autoOpen = useMemo(
    () => new Set(getCategoryPath(category).map((n) => n.id)),
    [category],
  )
  // …combined with the user's manual open / collapse choices.
  const [opened, setOpened] = useState<Set<string>>(new Set())
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  const isOpen = (id: string) =>
    (autoOpen.has(id) || opened.has(id)) && !collapsed.has(id)

  const toggle = (id: string) => {
    const open = isOpen(id)
    setOpened((prev) => {
      const next = new Set(prev)
      if (open) next.delete(id)
      else next.add(id)
      return next
    })
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (open) next.add(id)
      else next.delete(id)
      return next
    })
  }

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
          <li>
            <button
              type="button"
              onClick={() => onCategory('All')}
              aria-pressed={category === 'All'}
              className={`flex w-full items-center justify-between px-1 py-2.5 text-start text-sm transition-colors ${
                category === 'All'
                  ? 'font-bold text-amber-700'
                  : 'text-slate-600 hover:text-[#20265e]'
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`h-3.5 w-1 ${category === 'All' ? 'bg-amber-500' : 'bg-slate-200'}`}
                />
                {t.products.allProducts}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  category === 'All'
                    ? 'bg-amber-500/15 text-amber-800'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {total}
              </span>
            </button>
          </li>
        </ul>

        <ul className="divide-y divide-slate-100 border-b border-slate-200">
          {tree.map((node) => (
            <SidebarBranch
              key={node.id}
              node={node}
              depth={0}
              activeId={category}
              isOpen={isOpen}
              onToggle={toggle}
              onSelect={onCategory}
              counts={counts}
            />
          ))}
        </ul>
      </nav>
    </aside>
  )
}

function SidebarBranch({
  node,
  depth,
  activeId,
  isOpen,
  onToggle,
  onSelect,
  counts,
}: SidebarBranchProps) {
  const { lang } = useLang()
  const hasChildren = Boolean(node.children?.length)
  const isActive = activeId === node.id
  const open = isOpen(node.id)
  const count = counts[node.id] ?? 0

  return (
    <li>
      <div className="flex items-center" style={{ paddingInlineStart: `${depth * 0.9}rem` }}>
        <button
          type="button"
          onClick={() => onSelect(node.id)}
          aria-pressed={isActive}
          className={`flex min-w-0 flex-1 items-center gap-2 px-1 py-2.5 text-start text-sm transition-colors ${
            isActive ? 'font-bold text-amber-700' : 'text-slate-600 hover:text-[#20265e]'
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-3.5 w-1 shrink-0 ${isActive ? 'bg-amber-500' : 'bg-slate-200'}`}
          />
          <CategoryIcon icon={node.icon} className="h-4 w-4 shrink-0 text-amber-600/70" />
          <span className="flex-1 truncate">{categoryLabel(node.id, lang)}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
              isActive ? 'bg-amber-500/15 text-amber-800' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {count}
          </span>
        </button>
        {hasChildren && (
          <button
            type="button"
            onClick={() => onToggle(node.id)}
            aria-expanded={open}
            aria-label={categoryLabel(node.id, lang)}
            className="me-1 rounded p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {hasChildren && open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            {node.children!.map((child) => (
              <SidebarBranch
                key={child.id}
                node={child}
                depth={depth + 1}
                activeId={activeId}
                isOpen={isOpen}
                onToggle={onToggle}
                onSelect={onSelect}
                counts={counts}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  )
}
