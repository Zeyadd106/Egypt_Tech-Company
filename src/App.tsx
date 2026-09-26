import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import { useLang } from './i18n/LanguageContext'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'

export default function App() {
  const { t } = useLang()
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-amber-500 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#20265e]"
        >
          {t.nav.skip}
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
