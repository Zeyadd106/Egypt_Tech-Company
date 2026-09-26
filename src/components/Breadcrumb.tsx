import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

interface Crumb {
  label: string
  to?: string
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const { t } = useLang()
  return (
    <nav aria-label={t.breadcrumb.label}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400 rtl:rotate-180" aria-hidden="true" />}
              {item.to && !last ? (
                <Link to={item.to} className="font-medium text-slate-500 transition-colors hover:text-amber-700">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'font-semibold text-slate-900' : 'text-slate-500'}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
