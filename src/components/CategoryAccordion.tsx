import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { CategoryNode } from '../types/product'
import CategoryIcon from './CategoryIcon'
import { categoryLabel } from '../data/catalog'
import { useLang } from '../i18n/LanguageContext'

interface CategoryAccordionProps {
  nodes: CategoryNode[]
  onNavigate?: () => void
  depth?: number
}

/** Recursive, animated category tree for the mobile navigation drawer. */
export default function CategoryAccordion({ nodes, onNavigate, depth = 0 }: CategoryAccordionProps) {
  return (
    <ul className={depth === 0 ? 'space-y-1' : 'mt-1 space-y-1'}>
      {nodes.map((node) => (
        <AccordionItem
          key={node.id}
          node={node}
          onNavigate={onNavigate}
          depth={depth}
        />
      ))}
    </ul>
  )
}

interface AccordionItemProps {
  node: CategoryNode
  onNavigate?: () => void
  depth: number
}

function AccordionItem({ node, onNavigate, depth }: AccordionItemProps) {
  const { lang } = useLang()
  const [open, setOpen] = useState(false)
  const hasChildren = Boolean(node.children?.length)

  return (
    <li>
      <div className="flex items-center gap-1">
        <Link
          to={`/products?category=${encodeURIComponent(node.id)}`}
          onClick={onNavigate}
          className="flex flex-1 items-center gap-2.5 rounded-lg py-2.5 pe-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          style={{ paddingInlineStart: `${0.75 + depth * 1.1}rem` }}
        >
          <CategoryIcon icon={node.icon} className="h-4 w-4 shrink-0 text-amber-600" />
          <span>{categoryLabel(node.id, lang)}</span>
        </Link>
        {hasChildren && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={categoryLabel(node.id, lang)}
            className="me-1 rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
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
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <CategoryAccordion
              nodes={node.children!}
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}
