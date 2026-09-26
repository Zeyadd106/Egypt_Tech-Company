import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Languages, Menu, X } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

/** White corporate header with logo + menu + EN/AR language switcher. */
export default function Navbar() {
  const { t, lang, toggle } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/products', label: t.nav.products },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  const langButton = (
    <button
      type="button"
      onClick={() => {
        toggle()
        closeMenu()
      }}
      aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-2.5 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-amber-500 hover:text-amber-700 sm:px-3"
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      <span className="hidden min-[400px]:inline">{t.toggleLabel}</span>
    </button>
  )

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white transition-shadow ${
        scrolled ? 'border-slate-200 shadow-md' : 'border-slate-200 shadow-sm'
      }`}
    >
      {/* amber top rule — industrial accent */}
      <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600" aria-hidden="true" />
      <nav
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link to="/" className="flex items-center" aria-label="Egypt Tech home">
          <img
            src="/logo.png"
            alt="Egypt Tech logo"
            className="h-12 w-auto object-contain"
          />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                  isActive ? 'text-amber-700' : 'text-slate-700 hover:text-[#20265e]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded bg-amber-500 transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="ms-3 rounded-lg bg-[#20265e] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#2f3788]"
          >
            {t.nav.contactUs}
          </Link>
          <span className="ms-2">{langButton}</span>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {langButton}
          <button
            type="button"
            className="rounded-lg p-2 text-slate-800 hover:bg-slate-100"
            aria-expanded={open}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wide ${
                      isActive
                        ? 'bg-[#20265e] text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={closeMenu}
                className="block rounded-lg bg-amber-500 px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-[#20265e] hover:bg-amber-400"
              >
                {t.nav.contactUs}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
