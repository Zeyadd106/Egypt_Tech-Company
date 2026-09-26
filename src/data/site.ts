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
 * (t.hero.slides) in matching order. PLACEHOLDER imagery.
 */
export const heroSlideMedia = [
  {
    image:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=70',
    fallback: 'https://picsum.photos/seed/egypttech-hero-1/1600/700',
    link: '/products',
  },
  {
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=70',
    fallback: 'https://picsum.photos/seed/egypttech-hero-2/1600/700',
    link: '/products',
  },
  {
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1600&q=70',
    fallback: 'https://picsum.photos/seed/egypttech-hero-3/1600/700',
    link: '/contact',
  },
]

/** Homepage About section media. TEXT lives in translations.ts (t.homeAbout). */
export const homeAboutMedia = {
  image:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=70',
  fallbackImage: 'https://picsum.photos/seed/egypttech-office/900/1100',
  link: '/about',
}

/**
 * About page slanted photo banner. ALT TEXT lives in translations.ts
 * (t.about.bannerAlts). PLACEHOLDER imagery.
 */
export const aboutBannerMedia: { src: string; fallback: string }[] = [
  {
    src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=60',
    fallback: 'https://picsum.photos/seed/egypttech-about-1/600/400',
  },
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=60',
    fallback: 'https://picsum.photos/seed/egypttech-about-2/600/400',
  },
  {
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=60',
    fallback: 'https://picsum.photos/seed/egypttech-about-3/600/400',
  },
  {
    src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=60',
    fallback: 'https://picsum.photos/seed/egypttech-about-4/600/400',
  },
  {
    src: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=600&q=60',
    fallback: 'https://picsum.photos/seed/egypttech-about-5/600/400',
  },
]
