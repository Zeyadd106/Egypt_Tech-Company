import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, MessageSquareText } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import ProductGallery from '../components/ProductGallery'
import ProductSpecs from '../components/ProductSpecs'
import Seo from '../components/Seo'
import { ErrorState, LoadingState } from '../components/States'
import { useProduct } from '../hooks/useProducts'
import { fmt } from '../i18n/translations'
import { categoryLabel } from '../data/catalog'
import { useLang } from '../i18n/LanguageContext'

export default function ProductDetails() {
  const { t, lang } = useLang()
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { product, loading, error } = useProduct(slug)

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <LoadingState message={t.states.loadingProduct} />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <ErrorState
          message={error ?? t.detail.notFound}
          onRetry={() => navigate('/products')}
        />
        <div className="mt-6 text-center">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            {t.detail.back}
          </Link>
        </div>
      </div>
    )
  }

  const images = [product.image_url, ...(product.gallery ?? [])].filter(Boolean)
  const categoryText = [
    categoryLabel(product.category, lang),
    product.subcategory ? categoryLabel(product.subcategory, lang) : '',
  ]
    .filter(Boolean)
    .join(' › ')

  return (
    <>
      <Seo
        title={fmt(t.seo.detailTitle, { name: product.name })}
        description={product.short_description}
        path={`/products/${product.slug}`}
        image={product.image_url}
        type="product"
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <Breadcrumb
          items={[
            { label: t.homeCrumb, to: '/' },
            { label: t.products.crumb, to: '/products' },
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <ProductGallery images={images} productName={product.name} />

          <div>
            <span className="inline-block rounded-full bg-[#20265e] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
              {categoryText}
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-base font-medium leading-relaxed text-slate-600">
              {product.short_description}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{product.description}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to={`/contact?product=${encodeURIComponent(product.slug)}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-[#20265e] transition-colors hover:bg-amber-400"
              >
                <MessageSquareText className="h-4 w-4" aria-hidden="true" />
                {t.detail.ask}
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                {t.detail.all}
              </Link>
            </div>

            <dl className="mt-7 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
              <div className="min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3">
                <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{t.detail.category}</dt>
                <dd className="mt-1 break-words text-sm font-bold text-slate-900">{categoryText}</dd>
              </div>
              <div className="min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3">
                <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{t.detail.reference}</dt>
                <dd className="mt-1 break-all text-sm font-bold text-slate-900" dir="ltr">{product.slug}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-10">
          <ProductSpecs specs={product.specifications} />
        </div>
      </div>
    </>
  )
}
