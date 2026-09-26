# Egypt Tech — Professional Hardware Catalog Website

A production-ready **digital brochure / product catalog** website for a hardware
products company. Visitors browse company info, discover products, read
technical specifications, and submit **business inquiries** — no cart, no
checkout, no prices, no login.

**Name:** Egypt Tech · **Stack:** React + Vite + TypeScript + Tailwind CSS v4 +
Framer Motion + Supabase (Postgres + Storage) + React Router + Lucide icons.

**Languages:** English + Arabic (RTL) via a lightweight `src/i18n` dictionary —
toggle in the navbar, persisted in `localStorage`, full RTL layout mirroring.
Product catalog data itself stays in its Supabase-stored language.

---

## 1. Project overview

| Page | Route | Purpose |
| --- | --- | --- |
| Home | `/` | Hero, intro, featured products, why-us, categories, CTA |
| About | `/about` | Mission, vision, values, capabilities (placeholder) |
| Products | `/products` | Search + category filter + sort, product grid |
| Product details | `/products/:slug` | Gallery, specs, inquiry CTA |
| Contact | `/contact` | General form + product inquiry (`?product=slug`) |
| 404 | `*` | Not-found page |

Key rules enforced: **no prices, no cart/checkout/payment, no auth.**

## 2. Technologies

- React 19, Vite 8, TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`), theme tokens in `src/index.css` (`@theme`)
- Framer Motion (subtle reveals/hovers), Lucide React icons
- `@supabase/supabase-js`, React Router v7

## 3. Installation & running locally

```bash
npm install
cp .env.example .env   # then fill in values (see §5)
npm run dev             # http://localhost:5173
npm run build           # production build (tsc + vite)
npm run preview         # preview the build
```

> The site **works immediately without Supabase**: when env vars are missing it
> serves the demo catalog from `src/data/demoProducts.ts` and simulates form
> submissions (stored in `localStorage` under `egypttech_demo_inbox`).

## 4. Project structure

```
src/
  components/  Navbar, Footer, HeroSlider, ProductCard,
               ProductGrid, ProductSidebar, Pagination, ProductGallery,
               ProductSpecs, AboutBanner, PageCrumbs, AboutSection,
               WhyChooseBand, Decorations, ContactForm, Breadcrumb,
               WhyChooseUs, CategoryGrid, SectionTitle,
               States (loading/error/empty), Reveal, Seo, ScrollToTop
  pages/       Home, About, Products, ProductDetails, Contact, NotFound
  lib/         supabase.ts (client + demo-mode flag)
  services/    productService.ts (getProducts/getFeatured/getBySlug/getCategories)
               contactService.ts (submitContactMessage/submitProductInquiry)
  hooks/       useProducts.ts (useProducts/useFeatured/useProduct/useDebouncedValue)
  i18n/        translations.ts (EN/AR dictionary), LanguageContext.tsx
  types/       product.ts, contact.ts
  data/        demoProducts.ts (PLACEHOLDER catalog), site.ts (contact data,
               media, links, office location)
supabase/      schema.sql (tables + RLS + storage), seed.sql (demo products)
public/        favicon.svg, og-cover.svg, placeholder-product.svg
```

## 5. Environment variables

`.env.example`:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

- Never commit `.env` (already git-ignored).
- Never use the Supabase **service-role** key in the frontend — anon key only.
- On Vercel: Project → Settings → Environment Variables → add both vars → redeploy.

## 6. Supabase setup (database)

1. Create a project at https://supabase.com → get **Project URL** + **anon key**.
2. Dashboard → **SQL Editor** → run `supabase/schema.sql` (creates `products`,
   `contact_messages`, RLS policies, storage bucket reference).
3. Run `supabase/seed.sql` for demo products (optional; skip/replace for real data).

### Database schema

**products**

| column | type | notes |
| --- | --- | --- |
| id | uuid PK | default `gen_random_uuid()` |
| name / slug | text | slug unique, used in `/products/:slug` |
| category | text | free-form; filters derive from DB |
| short_description / description | text | card vs detail copy |
| image_url | text | main image (Storage public URL) |
| gallery | jsonb | string array of extra image URLs |
| specifications | jsonb | `{ "Label": "Value" }` — rendered dynamically |
| featured | bool | homepage selection |
| display_order | int | sort order |
| created_at / updated_at | timestamptz | trigger keeps `updated_at` fresh |

**contact_messages**: `id, name, email, phone, company, subject, message,
product_id (FK→products, nullable), product_name, status
('new'|'contacted'|'resolved'), created_at`.

### Security (RLS)

- `products`: public `SELECT` only.
- `contact_messages`: public `INSERT` only (no read/update/delete for visitors).
- Manage data via the Supabase Dashboard (service-role side), never from the site.

## 7. Storage setup (product images)

1. Dashboard → **Storage** → bucket `product-images`, **Public: ON**.
2. Upload photos → **Copy public URL** → paste into `products.image_url`
   (and extra URLs as a JSON array into `gallery`).
3. `schema.sql` already adds a public-read policy for that bucket.

## 8. Seed / demo data

- `supabase/seed.sql` inserts 6 clearly-marked demo products (picsum placeholders).
- `src/data/demoProducts.ts` mirrors them for offline/demo mode.
- Both are **placeholder-only** — delete/replace when real data arrives.

## 9. How to add / edit products (no code changes)

Via Supabase Dashboard → **Table Editor → products → Insert row**:

- `name`, unique URL-safe `slug` (e.g. `acme-nvme-1tb`), `category`
  (new categories appear in filters automatically),
- `short_description`, `description`, `image_url`, `gallery` (JSON array),
- `specifications` (JSON object — any keys), `featured` (true = homepage),
  `display_order` (1, 2, 3…).

New/updated rows appear on the site immediately.

## 10. How to replace product images

Upload to the `product-images` bucket → copy each public URL → update the
product's `image_url` / `gallery`. `ProductGallery` handles 1…n images,
lazy-loads, and falls back to `/placeholder-product.svg` on error.

## 11. How to change company information

Edit one file: `src/data/site.ts` (`siteConfig` — name, tagline, hero copy,
email/phone/address/hours, socials; `whyChooseUs`; `aboutContent`).
Branding colors: `src/index.css` → `@theme` tokens. No other code changes needed.

## 12. Deployment (Vercel)

1. Push to GitHub → https://vercel.com → **Add New Project** → import repo.
2. Framework preset: **Vite**. Build command `npm run build`, output `dist`.
3. Add env vars `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
4. Deploy. No `localhost` URLs are hard-coded; canonical/OG tags are relative.

## 13. Quality checklist (verified)

Home / About / Products / Detail / Contact / 404 / navbar (+mobile) / footer /
search / category filter / sort / Supabase-driven data + demo fallback /
featured / gallery + lightbox / dynamic specs / inquiry flow saves to Supabase
(or simulated in demo) / loading-error-empty states / no prices, no auth, no
cart-checkout-payment / responsive / a11y basics (skip link, labels, focus,
alt text, keyboard lightbox) / SEO basics (titles, meta, OG, slugs) /
RLS in schema / secrets via env / `.env.example` / `npm run build` passes.
