import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronRight } from 'lucide-react'
import CategoryIcon from './CategoryIcon'
import { buildCategoryTree, categoryLabel } from '../data/catalog'
import { useLang } from '../i18n/LanguageContext'

interface ProductsMenuProps {
  /** Top-level category ids discovered in the database (dynamic extras). */
  categories?: string[]
}

/**
 * Desktop "Products" mega-menu. A top-level column drives a panel that
 * expands the selected category into grouped subcategory columns — the
 * layout scales to any nesting depth without off-screen flyouts.
 */
export default function ProductsMenu({ categories = [] }: ProductsMenuProps) {
  const { t, lang } = useLang()
  const { pathname } = useLocation()
  const active = pathname.startsWith('/products')
  const [open, setOpen] = useState(false)
  const tree = useMemo(() => buildCategoryTree(categories), [categories])
  const [activeId, setActiveId] = useState<string>(() => tree[0]?.id ?? '')

  const close = () => setOpen(false)
  const activeNode = tree.find((n) => n.id === activeId) ?? tree[0]

  const href = (id: string) => `/products?category=${encodeURIComponent(id)}`

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={close}
      onKeyDown={(e) => {
        if (e.key === 'Escape') close()
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`relative inline-flex items-center gap-1 px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
          active || open ? 'text-amber-700' : 'text-slate-700 hover:text-[#20265e]'
        }`}
      >
        {t.nav.products}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
        <span
          aria-hidden="true"
          className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded bg-amber-500 transition-opacity ${
            active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute end-0 top-full z-50 pt-2"
          >
            <div className="flex max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
              {/* Top-level categories */}
              <ul className="w-64 shrink-0 border-e border-slate-100 py-2">
                {tree.map((node) => {
                  const isActive = node.id === activeNode?.id
                  const hasChildren = Boolean(node.children?.length)
                  const rowClass = `flex w-full items-center gap-3 px-4 py-2.5 text-start text-sm font-semibold transition-colors ${
                    isActive ? 'bg-slate-100 text-[#20265e]' : 'text-slate-700 hover:bg-slate-50'
                  }`
                  const inner = (
                    <>
                      <CategoryIcon
                        icon={node.icon}
                        className="h-4 w-4 shrink-0 text-amber-600"
                      />
                      <span className="flex-1">{categoryLabel(node.id, lang)}</span>
                      {hasChildren ? (
                        <ChevronRight
                          className="h-4 w-4 shrink-0 text-slate-400 rtl:rotate-180"
                          aria-hidden="true"
                        />
                      ) : null}
                    </>
                  )
                  return (
                    <li key={node.id}>
                      {hasChildren ? (
                        <button
                          type="button"
                          onMouseEnter={() => setActiveId(node.id)}
                          onFocus={() => setActiveId(node.id)}
                          onClick={() => setActiveId(node.id)}
                          aria-current={isActive}
                          className={rowClass}
                        >
                          {inner}
                        </button>
                      ) : (
                        <Link
                          to={href(node.id)}
                          onClick={close}
                          onMouseEnter={() => setActiveId(node.id)}
                          onFocus={() => setActiveId(node.id)}
                          className={rowClass}
                        >
                          {inner}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>

              {/* Subcategory panel for the active category */}
              <div className="max-h-[70vh] w-[min(42rem,60vw)] shrink-0 overflow-y-auto p-5">
                <AnimatePresence mode="wait">
                  {activeNode && (
                    <motion.div
                      key={activeNode.id}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                    >
                      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <Link
                          to={href(activeNode.id)}
                          onClick={close}
                          className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#20265e] transition-colors hover:text-amber-700"
                        >
                          <CategoryIcon
                            icon={activeNode.icon}
                            className="h-4 w-4 text-amber-600"
                          />
                          {categoryLabel(activeNode.id, lang)}
                        </Link>
                        <Link
                          to={href(activeNode.id)}
                          onClick={close}
                          className="shrink-0 text-xs font-bold text-amber-700 transition-colors hover:text-amber-800"
                        >
                          {t.catalog.viewAll}
                        </Link>
                      </div>

                      {activeNode.children?.length ? (
                        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-5">
                          {activeNode.children.map((child) => (
                            <div key={child.id} className="min-w-40 max-w-52">
                              <Link
                                to={href(child.id)}
                                onClick={close}
                                className="flex items-center gap-2 text-sm font-bold text-slate-800 transition-colors hover:text-amber-700"
                              >
                                <CategoryIcon
                                  icon={child.icon}
                                  className="h-4 w-4 shrink-0 text-amber-600/80"
                                />
                                <span>{categoryLabel(child.id, lang)}</span>
                              </Link>
                              {child.children?.length ? (
                                <ul className="mt-2 space-y-1.5 border-s border-slate-100 ps-3">
                                  {child.children.map((leaf) => (
                                    <li key={leaf.id}>
                                      <Link
                                        to={href(leaf.id)}
                                        onClick={close}
                                        className="block text-sm text-slate-600 transition-colors hover:text-[#20265e]"
                                      >
                                        {categoryLabel(leaf.id, lang)}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-4 text-sm text-slate-500">
                          {t.catalog.browse.replace('{name}', categoryLabel(activeNode.id, lang))}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
