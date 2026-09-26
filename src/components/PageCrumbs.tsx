import Breadcrumb from './Breadcrumb'

interface PageCrumbsProps {
  title: string
  trail: { label: string; to?: string }[]
}

/** Light breadcrumb bar under the page banner (Atlas-style: title left, trail right). */
export default function PageCrumbs({ title, trail }: PageCrumbsProps) {
  return (
    <div className="border-b border-slate-200 bg-slate-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <span className="text-lg font-medium text-slate-500">{title}</span>
        <Breadcrumb items={trail} />
      </div>
    </div>
  )
}
