import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { strings, type Lang, type Strings } from './translations'

const STORAGE_KEY = 'egypttech_lang'

function initialLang(): Lang {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'ar' ? 'ar' : 'en'
  } catch {
    return 'en'
  }
}

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  t: Strings
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => undefined,
  toggle: () => undefined,
  t: strings.en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = strings[lang].dir
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* storage unavailable — language still applies for this session */
    }
  }, [lang])

  const setLang = (l: Lang) => setLangState(l)
  const toggle = () => setLangState((l) => (l === 'en' ? 'ar' : 'en'))

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t: strings[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang(): LangContextValue {
  return useContext(LangContext)
}
