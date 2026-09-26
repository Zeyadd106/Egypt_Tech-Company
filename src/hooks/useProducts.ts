import { useEffect, useState } from 'react'
import { getCategories, getFeaturedProducts, getProductBySlug, getProducts } from '../services/productService'
import type { Product, ProductFilters } from '../types/product'

export function useProducts(filters: ProductFilters = {}) {
  const search = filters.search ?? ''
  const category = filters.category ?? 'All'
  const sort = filters.sort ?? 'featured'
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const [items, cats] = await Promise.all([
          getProducts({ search, category, sort }),
          getCategories(),
        ])
        if (!cancelled) {
          setProducts(items)
          setCategories(cats)
        }
      } catch {
        if (!cancelled) setError('Unable to load products. Please try again later.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [search, category, sort])

  return { products, categories, loading, error }
}

export function useFeaturedProducts(limit = 6) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const items = await getFeaturedProducts(limit)
        if (!cancelled) setProducts(items)
      } catch {
        if (!cancelled) setError('Unable to load featured products.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [limit])

  return { products, loading, error }
}

export function useProduct(slug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null)
  // No fetch needed when there is no slug (e.g. general contact form).
  const [loading, setLoading] = useState<boolean>(() => Boolean(slug))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    const currentSlug: string = slug
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const item = await getProductBySlug(currentSlug)
        if (!cancelled) {
          if (item) setProduct(item)
          else setError('Product not found.')
        }
      } catch {
        if (!cancelled) setError('Unable to load this product. Please try again later.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [slug])

  return { product, loading, error }
}

/** Debounce a string value (used for product search). */
export function useDebouncedValue(value: string, delayMs = 350): string {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(t)
  }, [value, delayMs])
  return debounced
}
