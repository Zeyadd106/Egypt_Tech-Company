/**
 * Central company data — Egypt Tech (Compressed Air Technology).
 * Display STRINGS live in src/i18n/translations.ts (EN/AR).
 * This file holds only data: contact details, media, links.
 * Contact details remain placeholders until the client confirms them.
 */

export const siteConfig = {
  companyName: 'Egypt Tech',
  email: 'info@example.com', // TODO: replace with real company email
  phone: '+20 XXX XXX XXXX', // TODO: replace with real company phone
  address: 'Cairo, Egypt', // TODO: replace with real company address
  hours: 'Sun – Thu, 9:00 AM – 6:00 PM', // TODO: replace with real hours
  socials: {
    facebook: '#',
    linkedin: '#',
    x: '#',
    instagram: '#',
  },
} as const

/**
 * Office location (client-provided Google Maps pin).
 * Used for the Contact page map embed.
 */
export const officeLocation = {
  lat: 30.087632,
  lng: 31.302551,
  label: 'Egypt Tech office',
} as const

/**
 * Homepage hero slider media. Slide TEXT lives in translations.ts
 * (t.hero.slides) in matching order. These are the client-provided
 * product photos (transparent cutouts) stored in public/hero/.
 * The slider showcases them in a rotating product display.
 */
export const heroSlideMedia = Array.from({ length: 15 }, (_, i) => ({
  image: `/hero/hero-${i + 1}.${i === 14 ? 'jpeg' : 'png'}`,
  fallback: '/hero/hero-1.png',
  link: '/products',
}))

/** Homepage About section media. TEXT lives in translations.ts (t.homeAbout). */
export const homeAboutMedia = {
  image:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=70',
  fallbackImage: 'https://picsum.photos/seed/egypttech-office/900/1100',
  link: '/about',
}

/**
 * Page slanted photo banner (About, Products, Contact).
 * Uses the client's product photos from public/hero/.
 */
export const aboutBannerMedia: { src: string; fallback: string }[] = [
  { src: '/hero/hero-1.png', fallback: '/hero/hero-1.png' },
  { src: '/hero/hero-4.png', fallback: '/hero/hero-1.png' },
  { src: '/hero/hero-7.png', fallback: '/hero/hero-1.png' },
  { src: '/hero/hero-10.png', fallback: '/hero/hero-1.png' },
  { src: '/hero/hero-13.png', fallback: '/hero/hero-1.png' },
]
