interface SectionTitleProps {
  eyebrow?: string
  title: string
  text?: string
  align?: 'left' | 'center'
}

export default function SectionTitle({ eyebrow, title, text, align = 'center' }: SectionTitleProps) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-start'
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {text && <p className="mt-3 text-slate-600">{text}</p>}
    </div>
  )
}
