/** Core domain types for Egypt Tech catalog site. */

export type ProductSpecifications = Record<string, string | number | boolean>

/**
 * A node in the product navigation hierarchy.
 * Supports arbitrary nesting (categories → subcategories → deeper levels).
 * Labels are resolved through i18n by `id` (see src/data/catalog.ts).
 */
export interface CategoryNode {
  /** Stable identifier used in URLs and stored on product records. */
  id: string
  /** Icon key resolved via src/lib/categoryIcons.ts. */
  icon?: string
  /** Nested child nodes (subcategories, sub-subcategories, …). */
  children?: CategoryNode[]
}

export interface Product {
  id: string
  name: string
  slug: string
  /** Top-level category id (see categoryTree). */
  category: string
  /** Optional subcategory id nested under the category. */
  subcategory?: string
  short_description: string
  description: string
  image_url: string
  /** Optional extra images (Supabase Storage URLs). */
  gallery: string[]
  specifications: ProductSpecifications
  featured: boolean
  display_order: number
  created_at?: string
  updated_at?: string
}

export interface ProductFilters {
  search?: string
  /** Selected node id — may be a category or any nested subcategory. */
  category?: string // 'All' means no category filter
  subcategory?: string
  sort?: 'featured' | 'name-asc' | 'name-desc' | 'newest'
}
