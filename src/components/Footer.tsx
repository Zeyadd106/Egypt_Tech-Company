import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { siteConfig } from '../data/site'
import { useLang } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#20265e] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Egypt Tech logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{t.footer.note}</p>
          <div className="mt-5 flex gap-2">
            {[
              { abbr: 'Fb', label: 'Facebook', href: siteConfig.socials.facebook },
              { abbr: 'In', label: 'LinkedIn', href: siteConfig.socials.linkedin },
              { abbr: 'X', label: 'X', href: siteConfig.socials.x },
              { abbr: 'Ig', label: 'Instagram', href: siteConfig.socials.instagram },
            ].map(({ abbr, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={`${siteConfig.companyName} on ${label}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-slate-300 transition-colors hover:bg-amber-500 hover:text-[#20265e]"
              >
                {abbr}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">{t.footer.navigate}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { to: '/', label: t.footer.home },
              { to: '/about', label: t.footer.aboutUs },
              { to: '/products', label: t.footer.products },
              { to: '/contact', label: t.footer.contact },
            ].map((l) => (
              <li key={l.to + l.label}>
                <Link to={l.to} className="text-slate-400 transition-colors hover:text-amber-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">{t.footer.categories}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {['Air Compressors', 'Air Treatment', 'Spare Parts', 'Hydraulic Systems'].map((c) => (
              <li key={c}>
                <Link
                  to={`/products?category=${encodeURIComponent(c)}`}
                  className="text-slate-400 transition-colors hover:text-amber-400"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">{t.footer.contactTitle}</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
              <span>{siteConfig.address} (placeholder)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
              <span>{siteConfig.phone} (placeholder)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
              <span>{siteConfig.email} (placeholder)</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© {year} {siteConfig.companyName}. {t.footer.rights}</p>
          <p>{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
