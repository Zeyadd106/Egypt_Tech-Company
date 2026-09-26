import { ListChecks } from 'lucide-react'
import type { ProductSpecifications } from '../types/product'
import { useLang } from '../i18n/LanguageContext'

/** Dynamically renders any specification map from Supabase (JSONB). */
export default function ProductSpecs({ specs }: { specs: ProductSpecifications }) {
  const { t } = useLang()
  const entries = Object.entries(specs ?? {})
  if (entries.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
        {t.detail.specsEmpty}
      </p>
    )
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-5 py-3.5">
        <ListChecks className="h-4 w-4 text-amber-700" aria-hidden="true" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
          {t.detail.specs}
        </h2>
      </div>
      <dl>
        {entries.map(([key, value], i) => (
          <div
            key={key}
            className={`grid grid-cols-1 gap-1 px-5 py-3.5 sm:grid-cols-[220px_1fr] sm:gap-4 ${
              i % 2 === 1 ? 'bg-slate-50/70' : 'bg-white'
            } ${i !== entries.length - 1 ? 'border-b border-slate-100' : ''}`}
          >
            <dt className="text-sm font-semibold text-slate-500">{key}</dt>
            <dd className="text-sm font-medium text-slate-900">{String(value)}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
