import { AlertTriangle, PackageSearch } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

export function LoadingState({ message }: { message?: string }) {
  const { t } = useLang()
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-14" role="status" aria-live="polite">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-amber-600"
        aria-hidden="true"
      />
      <p className="text-sm font-medium text-slate-600">{message ?? t.products.loading}</p>
    </div>
  )
}

export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="aspect-[4/3] bg-slate-200" />
          <div className="space-y-3 p-5">
            <div className="h-3 w-1/3 rounded bg-slate-200" />
            <div className="h-5 w-3/4 rounded bg-slate-200" />
            <div className="h-3 w-full rounded bg-slate-100" />
            <div className="h-9 w-full rounded-lg bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  const { t } = useLang()
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center" role="alert">
      <AlertTriangle className="h-8 w-8 text-red-500" aria-hidden="true" />
      <p className="font-semibold text-red-800">{t.states.errTitle}</p>
      <p className="max-w-md text-sm text-red-700">{message ?? t.states.errProducts}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          {t.states.tryAgain}
        </button>
      )}
    </div>
  )
}

export function EmptyState({ title, text }: { title?: string; text?: string }) {
  const { t } = useLang()
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <PackageSearch className="h-10 w-10 text-slate-400" aria-hidden="true" />
      <p className="font-semibold text-slate-800">{title ?? t.states.emptyNone}</p>
      <p className="max-w-md text-sm text-slate-500">{text ?? t.states.emptyHint}</p>
    </div>
  )
}
