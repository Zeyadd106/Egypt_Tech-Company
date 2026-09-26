/** Core domain types for Egypt Tech catalog site. */

export type ProductSpecifications = Record<string, string | number | boolean>

export interface Product {
  id: string
  name: string
  slug: string
  category: string
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
  category?: string // 'All' means no category filter
  sort?: 'featured' | 'name-asc' | 'name-desc' | 'newest'
}
