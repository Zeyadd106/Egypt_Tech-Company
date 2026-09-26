import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { submitContactMessage } from '../services/contactService'
import { fmt } from '../i18n/translations'
import { useLang } from '../i18n/LanguageContext'

interface ContactFormProps {
  /** Pre-selected product context (slug-based inquiry). */
  productName?: string | null
  productId?: string | null
  compact?: boolean
}

interface Errors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm({ productName, productId, compact }: ContactFormProps) {
  const { t } = useLang()
  const f = t.contact.form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState(productName ? f.defaultMessage : '')
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [failure, setFailure] = useState<string | null>(null)

  function validate(): Errors {
    const e: Errors = {}
    if (name.trim().length < 2) e.name = f.errName
    if (!EMAIL_RE.test(email.trim())) e.email = f.errEmail
    if (phone.trim().length < 6) e.phone = f.errPhone
    if (message.trim().length < 10) e.message = f.errMessage
    return e
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (submitting) return
    setSuccess(null)
    setFailure(null)
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length > 0) return
    setSubmitting(true)
    try {
      const res = await submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim() || undefined,
        subject: productName ? `${f.productSubjectPrefix}${productName}` : f.generalSubject,
        message: message.trim(),
        product_id: productId ?? null,
        product_name: productName ?? null,
      })
      setSuccess(res.ok ? f.successDefault : res.message)
      setName('')
      setEmail('')
      setPhone('')
      setCompany('')
      setMessage(productName ? f.defaultMessage : '')
      setErrors({})
    } catch {
      setFailure(f.fail)
    } finally {
      setSubmitting(false)
    }
  }

  const inputCls = (bad?: string) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none ${
      bad ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-amber-600'
    }`

  return (
    <form onSubmit={onSubmit} noValidate className={compact ? 'space-y-4' : 'space-y-5'}>
      {productName && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm" aria-live="polite">
          <p className="font-semibold text-amber-900">{fmt(f.askingAbout, { name: productName })}</p>
          <p className="mt-0.5 text-xs text-amber-800">
            {fmt(f.subjectLine, { name: productName })}
          </p>
        </div>
      )}

      {success && (
        <div className="flex items-start gap-3 rounded-xl border border-green-300 bg-green-50 px-4 py-3.5" role="status">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden="true" />
          <div>
            <p className="text-sm font-bold text-green-900">{f.successTitle}</p>
            <p className="mt-0.5 text-sm text-green-800">{success}</p>
          </div>
        </div>
      )}
      {failure && (
        <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800" role="alert">
          {failure}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-semibold text-slate-800">
            {f.name}
          </label>
          <input id="cf-name" value={name} onChange={(e) => setName(e.target.value)} placeholder={f.namePh} className={inputCls(errors.name)} autoComplete="name" />
          {errors.name && <p className="mt-1 text-xs font-medium text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-semibold text-slate-800">
            {f.email}
          </label>
          <input id="cf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={f.emailPh} className={inputCls(errors.email)} autoComplete="email" dir="ltr" />
          {errors.email && <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-semibold text-slate-800">
            {f.phone}
          </label>
          <input id="cf-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={f.phonePh} className={inputCls(errors.phone)} autoComplete="tel" dir="ltr" />
          {errors.phone && <p className="mt-1 text-xs font-medium text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="cf-company" className="mb-1.5 block text-sm font-semibold text-slate-800">
            {f.company} <span className="font-normal text-slate-500">{f.companyOptional}</span>
          </label>
          <input id="cf-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder={f.companyPh} className={inputCls()} autoComplete="organization" />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-semibold text-slate-800">
          {f.message}
        </label>
        <textarea id="cf-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={compact ? 4 : 5} placeholder={f.messagePh} className={`${inputCls(errors.message)} resize-y`} />
        {errors.message && <p className="mt-1 text-xs font-medium text-red-600">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#20265e] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#2f3788] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {f.sending}
          </>
        ) : (
          <>
            <Send className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
            {productName ? f.sendInquiry : f.send}
          </>
        )}
      </button>
    </form>
  )
}
