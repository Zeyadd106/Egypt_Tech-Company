import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { demoProducts } from '../data/demoProducts'
import type { Product, ProductFilters } from '../types/product'

function sortProducts(products: Product[], sort: ProductFilters['sort']): Product[] {
  const list = [...products]
  switch (sort) {
    case 'name-asc':
      return list.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return list.sort((a, b) => b.name.localeCompare(a.name))
    case 'newest':
      return list.sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? ''))
    case 'featured':
    default:
      return list.sort(
        (a, b) => a.display_order - b.display_order || a.name.localeCompare(b.name),
      )
  }
}

function applyLocalFilters(products: Product[], filters: ProductFilters = {}): Product[] {
  const q = (filters.search ?? '').trim().toLowerCase()
  let list = products
  if (filters.category && filters.category !== 'All') {
    list = list.filter((p) => p.category === filters.category)
  }
  if (q) {
    list = list.filter((p) =>
      [p.name, p.short_description, p.description, p.category]
        .join(' ')
        .toLowerCase()
        .includes(q),
    )
  }
  return sortProducts(list, filters.sort ?? 'featured')
}

function normalizeRow(row: Record<string, unknown>): Product {
  const gallery = Array.isArray(row.gallery) ? (row.gallery as string[]) : []
  const specs =
    row.specifications && typeof row.specifications === 'object'
      ? (row.specifications as Product['specifications'])
      : {}
  return {
    id: String(row.id),
    name: String(row.name ?? ''),
    slug: String(row.slug ?? ''),
    category: String(row.category ?? 'General'),
    short_description: String(row.short_description ?? ''),
    description: String(row.description ?? ''),
    image_url: String(row.image_url ?? ''),
    gallery,
    specifications: specs,
    featured: Boolean(row.featured),
    display_order: Number(row.display_order ?? 0),
    created_at: row.created_at ? String(row.created_at) : undefined,
    updated_at: row.updated_at ? String(row.updated_at) : undefined,
  }
}

/** Fetch products (Supabase first, demo fallback). */
export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) {
    return applyLocalFilters(demoProducts, filters)
  }
  try {
    let query = supabase
      .from('products')
      .select('*')
      .order('display_order', { ascending: true })

    if (filters.category && filters.category !== 'All') {
      query = query.eq('category', filters.category)
    }
    if (filters.search?.trim()) {
      const q = filters.search.trim()
      query = query.or(
        `name.ilike.%${q}%,short_description.ilike.%${q}%,description.ilike.%${q}%,category.ilike.%${q}%`,
      )
    }

    const { data, error } = await query
    if (error) throw error
    const products = (data ?? []).map((r) =>
      normalizeRow(r as Record<string, unknown>),
    )
    return sortProducts(products, filters.sort ?? 'featured')
  } catch {
    // Never break the brochure on backend errors — fall back to demo data.
    return applyLocalFilters(demoProducts, filters)
  }
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) {
    return demoProducts.filter((p) => p.featured).slice(0, limit)
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('display_order', { ascending: true })
      .limit(limit)
    if (error) throw error
    return (data ?? []).map((r) => normalizeRow(r as Record<string, unknown>))
  } catch {
    return demoProducts.filter((p) => p.featured).slice(0, limit)
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured || !supabase) {
    return demoProducts.find((p) => p.slug === slug) ?? null
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) throw error
    return data ? normalizeRow(data as Record<string, unknown>) : null
  } catch {
    return demoProducts.find((p) => p.slug === slug) ?? null
  }
}

/** Categories derived from DB when possible (no hard-coded list). */
export async function getCategories(): Promise<string[]> {
  if (!isSupabaseConfigured || !supabase) {
    return Array.from(new Set(demoProducts.map((p) => p.category))).sort()
  }
  try {
    const { data, error } = await supabase.from('products').select('category')
    if (error) throw error
    const cats = Array.from(
      new Set(
        (data ?? [])
          .map((r) => (r as { category?: unknown }).category)
          .filter((c): c is string => typeof c === 'string' && c.length > 0),
      ),
    ).sort()
    return cats.length > 0
      ? cats
      : Array.from(new Set(demoProducts.map((p) => p.category))).sort()
  } catch {
    return Array.from(new Set(demoProducts.map((p) => p.category))).sort()
  }
}

/** True when the site is serving demo data (Supabase not configured). */
export function isDemoMode(): boolean {
  return !isSupabaseConfigured
}
