import { createElement } from 'react'
import { getCategoryIcon } from '../lib/categoryIcons'

interface CategoryIconProps {
  icon?: string
  className?: string
}

/** Renders a catalog icon by key. Centralizes icon resolution for reuse. */
export default function CategoryIcon({ icon, className }: CategoryIconProps) {
  return createElement(getCategoryIcon(icon), { className, 'aria-hidden': true })
}
