/**
 * Product navigation hierarchy — single source of truth for the
 * categories / subcategories shown across the site (navbar, sidebar,
 * category grid, footer).
 *
 * Nodes carry only a stable `id` + `icon`; display labels live in
 * src/i18n/translations.ts (`catalog.labels`) and are resolved by id,
 * so the same tree renders in both English and Arabic.
 */
import type { CategoryNode, Product } from '../types/product'
import { strings, type Lang } from '../i18n/translations'

export const categoryTree: CategoryNode[] = [
  {
    id: 'air-compressors',
    icon: 'wind',
    children: [
      { id: 'screw-compressor-vortex', icon: 'fan' },
      {
        id: 'spare-parts',
        icon: 'cog',
        children: [
          { id: 'gear-kit', icon: 'settings2' },
          { id: 'solenoid-valve', icon: 'toggle-left' },
        ],
      },
      { id: 'service-kits', icon: 'package-check' },
    ],
  },
  {
    id: 'air-treatment',
    icon: 'droplets',
    children: [
      {
        id: 'air-dryer',
        icon: 'air-vent',
        children: [
          { id: 'air-dryer-micro-robur', icon: 'snowflake' },
          { id: 'air-dryer-omi', icon: 'snowflake' },
          { id: 'air-dryer-vortex', icon: 'snowflake' },
        ],
      },
      {
        id: 'industrial-filters',
        icon: 'list-filter',
        children: [
          { id: 'industrial-filters-complete', icon: 'package' },
          { id: 'industrial-filters-elements', icon: 'layers' },
        ],
      },
      {
        id: 'drain',
        icon: 'droplet-off',
        children: [
          { id: 'drain-automatic', icon: 'droplet-off' },
          { id: 'drain-manual', icon: 'droplet' },
          { id: 'drain-zero-loss', icon: 'recycle' },
        ],
      },
      { id: 'water-separator', icon: 'glass-water' },
    ],
  },
  {
    id: 'equipment-filters',
    icon: 'funnel',
    children: [
      {
        id: 'oil-separator',
        icon: 'layers',
        children: [
          { id: 'oil-separator-original', icon: 'layers' },
          { id: 'oil-separator-tg-italy', icon: 'layers' },
          { id: 'oil-separator-micro-robur', icon: 'layers' },
        ],
      },
      {
        id: 'air-filter',
        icon: 'wind',
        children: [
          { id: 'air-filter-original', icon: 'wind' },
          { id: 'air-filter-tg-italy', icon: 'wind' },
          { id: 'air-filter-micro-robur', icon: 'wind' },
        ],
      },
      {
        id: 'oil-filter',
        icon: 'droplet',
        children: [
          { id: 'oil-filter-original', icon: 'droplet' },
          { id: 'oil-filter-tg-italy', icon: 'droplet' },
          { id: 'oil-filter-micro-robur', icon: 'droplet' },
        ],
      },
    ],
  },
  { id: 'oil-coolant', icon: 'thermometer-snowflake' },
  { id: 'technical-consulting', icon: 'headset' },
]

/** Localized label for a catalog node id (falls back to the raw id). */
export function categoryLabel(id: string | undefined, lang: Lang): string {
  if (!id) return ''
  return strings[lang].catalog.labels[id] ?? id
}

/** Depth-first flattening of a category tree (defaults to the full tree). */
export function flattenCategoryTree(nodes: CategoryNode[] = categoryTree): CategoryNode[] {
  const out: CategoryNode[] = []
  const visit = (list: CategoryNode[]) => {
    for (const node of list) {
      out.push(node)
      if (node.children?.length) visit(node.children)
    }
  }
  visit(nodes)
  return out
}

/** Find a node by id anywhere in the tree. */
export function getCategoryNode(
  id: string | undefined,
  nodes: CategoryNode[] = categoryTree,
): CategoryNode | undefined {
  if (!id) return undefined
  for (const node of nodes) {
    if (node.id === id) return node
    const found = node.children && getCategoryNode(id, node.children)
    if (found) return found
  }
  return undefined
}

function findCategoryPath(
  id: string,
  nodes: CategoryNode[],
  trail: CategoryNode[],
): CategoryNode[] | null {
  for (const node of nodes) {
    if (node.id === id) return trail
    if (node.children?.length) {
      const found = findCategoryPath(id, node.children, [...trail, node])
      if (found) return found
    }
  }
  return null
}

/** Ancestor path (root → node) for the given id, excluding the node itself. */
export function getCategoryPath(id: string | undefined): CategoryNode[] {
  if (!id) return []
  return findCategoryPath(id, categoryTree, []) ?? []
}

/** All ids contained in the subtree rooted at `id` (includes `id`). */
export function getSubtreeIds(id: string): Set<string> {
  const ids = new Set<string>()
  const node = getCategoryNode(id)
  if (!node) return ids
  const visit = (n: CategoryNode) => {
    ids.add(n.id)
    n.children?.forEach(visit)
  }
  visit(node)
  return ids
}

/** Category ids a product belongs to, including all ancestor nodes. */
export function getProductCategoryIds(
  product: Pick<Product, 'category' | 'subcategory'>,
): string[] {
  const ids = new Set<string>()
  if (product.category) ids.add(product.category)
  for (const ancestor of getCategoryPath(product.subcategory)) ids.add(ancestor.id)
  if (product.subcategory) ids.add(product.subcategory)
  return [...ids]
}

/** True when a product sits anywhere inside the selected node's subtree. */
export function productMatchesCategory(
  product: Pick<Product, 'category' | 'subcategory'>,
  categoryId: string | undefined,
): boolean {
  if (!categoryId || categoryId === 'All') return true
  const subtree = getSubtreeIds(categoryId)
  if (subtree.size === 0) return product.category === categoryId
  return getProductCategoryIds(product).some((id) => subtree.has(id))
}

/**
 * The canonical tree merged with any categories discovered in the
 * database that are not part of the predefined hierarchy — keeps the
 * navigation organized while remaining dynamic.
 */
export function buildCategoryTree(dynamicIds: string[] = []): CategoryNode[] {
  const known = new Set(flattenCategoryTree().map((n) => n.id))
  const extras = dynamicIds
    .filter((id) => id && !known.has(id))
    .map((id) => ({ id }))
  return extras.length ? [...categoryTree, ...extras] : categoryTree
}
