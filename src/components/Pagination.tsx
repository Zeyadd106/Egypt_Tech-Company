import { ChevronLeft, ChevronRight } from 'lucide-react'
import { fmt } from '../i18n/translations'
import { useLang } from '../i18n/LanguageContext'

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

function pageWindow(page: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const set = new Set<number>([1, 2, page - 1, page, page + 1, total - 1, total])
  const nums = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
  const out: (number | '…')[] = []
  let prev = 0
  for (const n of nums) {
    if (n - prev > 1) out.push('…')
    out.push(n)
    prev = n
  }
  return out
}

/** Numbered pagination (Atlas-style shop pages). */
export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const { t } = useLang()
  if (totalPages <= 1) return null
  const btn =
    'flex h-9 min-w-9 items-center justify-center border px-2 text-sm font-semibold transition-colors'

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-1.5" aria-label={t.pages.navLabel}>
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label={t.pages.prev}
        className={`${btn} border-slate-300 bg-white text-slate-600 hover:border-[#20265e] hover:text-[#20265e] disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <ChevronLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
      </button>
      {pageWindow(page, totalPages).map((p, i) =>
        p === '…' ? (
          <span key={`gap-${i}`} className="px-1 text-sm text-slate-400" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-label={fmt(t.pages.goTo, { n: p })}
            aria-current={p === page ? 'page' : undefined}
            className={
              p === page
                ? `${btn} border-amber-500 bg-amber-500 text-[#20265e]`
                : `${btn} border-slate-300 bg-white text-slate-600 hover:border-[#20265e] hover:text-[#20265e]`
            }
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label={t.pages.next}
        className={`${btn} border-slate-300 bg-white text-slate-600 hover:border-[#20265e] hover:text-[#20265e] disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
      </button>
    </nav>
  )
}
