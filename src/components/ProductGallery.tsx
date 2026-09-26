import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { fmt } from '../i18n/translations'
import { useLang } from '../i18n/LanguageContext'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

/** Premium gallery: main image + thumbnails + lightbox, keyboard accessible. */
export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const { t } = useLang()
  const list = images.length > 0 ? images : ['/placeholder-product.svg']
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const prev = useCallback(() => setActive((i) => (i - 1 + list.length) % list.length), [list.length])
  const next = useCallback(() => setActive((i) => (i + 1) % list.length), [list.length])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, prev, next])

  useEffect(() => setActive(0), [productName])

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={list[active]}
            src={list[active]}
            alt={fmt(t.detail.imageOf, { name: productName, current: active + 1, total: list.length })}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="aspect-[4/3] w-full object-cover"
            onError={(e) => {
              const t = e.currentTarget
              if (!t.src.endsWith('placeholder-product.svg')) t.src = '/placeholder-product.svg'
            }}
          />
        </AnimatePresence>

        {list.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label={t.detail.prevImage}
              className="absolute start-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur transition-colors hover:bg-black/70"
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={t.detail.nextImage}
              className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur transition-colors hover:bg-black/70"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => setLightbox(true)}
          aria-label={t.detail.openPreview}
          className="absolute bottom-3 end-3 inline-flex items-center gap-1.5 rounded-lg bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-black/75"
        >
          <Expand className="h-3.5 w-3.5" aria-hidden="true" />
          {t.detail.openPreview}
        </button>
      </div>

      {list.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5" role="tablist" aria-label={t.detail.productImages}>
          {list.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={fmt(t.detail.showImage, { n: i + 1 })}
              onClick={() => setActive(i)}
              className={`overflow-hidden rounded-xl border-2 transition-all ${
                i === active ? 'border-amber-500' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="aspect-square w-full object-cover"
                onError={(e) => {
                  const t = e.currentTarget
                  if (!t.src.endsWith('placeholder-product.svg')) t.src = '/placeholder-product.svg'
                }}
              />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={fmt(t.detail.previewDialog, { name: productName })}
            onClick={() => setLightbox(false)}
          >
            <button
              type="button"
              aria-label={t.detail.closePreview}
              className="absolute end-4 top-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <img
              src={list[active]}
              alt={fmt(t.detail.enlarged, { name: productName })}
              className="max-h-[85vh] max-w-full rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                const t = e.currentTarget
                if (!t.src.endsWith('placeholder-product.svg')) t.src = '/placeholder-product.svg'
              }}
            />
            {list.length > 1 && (
              <div className="absolute bottom-6 flex gap-3" onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={prev} aria-label={t.detail.prevImage} className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20">
                  <ChevronLeft className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
                </button>
                <button type="button" onClick={next} aria-label={t.detail.nextImage} className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20">
                  <ChevronRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
