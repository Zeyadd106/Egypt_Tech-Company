import { Link } from 'react-router-dom'
import { Home, SearchX } from 'lucide-react'
import Seo from '../components/Seo'
import { useLang } from '../i18n/LanguageContext'

export default function NotFound() {
  const { t } = useLang()
  return (
    <>
      <Seo title={t.notFound.title} description={t.notFound.desc} path="/404" />
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
          <SearchX className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="mt-6 text-6xl font-extrabold tracking-tight text-slate-900">404</p>
        <h1 className="mt-2 text-xl font-bold text-slate-800">{t.notFound.heading}</h1>
        <p className="mt-2 text-sm text-slate-600">
          {t.notFound.text}
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#20265e] px-6 py-3 text-sm font-bold text-white hover:bg-[#2f3788]"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            {t.notFound.home}
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            {t.notFound.browse}
          </Link>
        </div>
      </div>
    </>
  )
}
