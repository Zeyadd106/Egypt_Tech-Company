import type { Product } from '../types/product'

/**
 * ------------------------------------------------------------------
 * DEMO / PLACEHOLDER CATALOG — NOT real client data.
 * Themed around the client's business lines (compressors, air
 * treatment, spare parts, hydraulics) so the site looks correct
 * until real products are entered in Supabase.
 * Replace by adding real rows to the Supabase `products` table —
 * no website code changes required.
 * Images below are generic placeholders (picsum) — replace with
 * real product photos in Supabase Storage.
 * ------------------------------------------------------------------
 */

const img = (seed: string, w = 900, h = 675) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

export const demoProducts: Product[] = [
  {
    id: 'demo-1',
    name: 'VORTEX Screw Air Compressor 7.5 kW (Demo)',
    slug: 'vortex-screw-air-compressor-7-5kw',
    category: 'Air Compressors',
    short_description:
      'Oil-injected screw compressor for professional compressed-air supply.',
    description:
      'VORTEX screw air compressor (demo product) — placeholder entry showing how a compressor listing looks on Egypt Tech. Egypt Tech is the sole agent for VORTEX compressors, dryers, tanks and air filters. Replace with the real model data when available.',
    image_url: img('egypttech-compressor-75'),
    gallery: [img('egypttech-compressor-75'), img('egypttech-compressor-75-2')],
    specifications: {
      Type: 'Oil-injected screw (Demo)',
      Brand: 'VORTEX (Made in Turkey)',
      Power: '7.5 kW',
      Pressure: '7–10 bar',
      Capacity: '±1.1 m³/min',
      Drive: 'Direct / Belt (Demo)',
    },
    featured: true,
    display_order: 1,
  },
  {
    id: 'demo-2',
    name: 'VORTEX Screw Air Compressor 37 kW (Demo)',
    slug: 'vortex-screw-air-compressor-37kw',
    category: 'Air Compressors',
    short_description:
      'Higher-capacity screw compressor for industrial air networks.',
    description:
      'VORTEX 37 kW screw compressor (demo product) — placeholder for the higher-capacity range. Replace with real model data when available.',
    image_url: img('egypttech-compressor-37'),
    gallery: [img('egypttech-compressor-37'), img('egypttech-compressor-37-2')],
    specifications: {
      Type: 'Oil-injected screw (Demo)',
      Brand: 'VORTEX (Made in Turkey)',
      Power: '37 kW',
      Pressure: '7–13 bar',
      Capacity: '±6.2 m³/min',
      Cooling: 'Air-cooled (Demo)',
    },
    featured: false,
    display_order: 2,
  },
  {
    id: 'demo-3',
    name: 'VORTEX Refrigerant Air Dryer (Demo)',
    slug: 'vortex-refrigerant-air-dryer',
    category: 'Air Treatment',
    short_description:
      'Refrigerant dryer for clean, dry compressed air (VORTEX / OMI range).',
    description:
      'Refrigerant air dryer (demo product) — placeholder from the air-treatment line (VORTEX Made in Turkey, OMI Made in Italy). Replace with real model data when available.',
    image_url: img('egypttech-dryer'),
    gallery: [img('egypttech-dryer'), img('egypttech-dryer-2')],
    specifications: {
      Type: 'Refrigerant dryer (Demo)',
      Brands: 'VORTEX (Turkey), OMI (Italy)',
      'Pressure Dew Point': '+3 °C (Demo)',
      'Max Pressure': '16 bar',
      Refrigerant: 'R134a / R407C (Demo)',
    },
    featured: true,
    display_order: 3,
  },
  {
    id: 'demo-4',
    name: 'Compressed Air Line Filter Set (Demo)',
    slug: 'compressed-air-line-filter-set',
    category: 'Air Treatment',
    short_description:
      'Line filters for air purification from impurities and oil.',
    description:
      'Line filter set (demo product) — placeholder for VORTEX / OMI purification filters plus industrial elements (Atlas Copco, Ingersoll Rand, Compair, Domnick Hunter, MTA). Replace with real data when available.',
    image_url: img('egypttech-linefilter'),
    gallery: [img('egypttech-linefilter')],
    specifications: {
      Type: 'Coalescing + particulate (Demo)',
      Filtration: '0.01 micron (Demo)',
      'Oil Carryover': '0.01 ppm (Demo)',
      Elements: 'Atlas Copco / IR / Compair / DH / MTA (Demo)',
      Drains: 'Automatic + Manual (Demo)',
    },
    featured: false,
    display_order: 4,
  },
  {
    id: 'demo-5',
    name: 'Oil & Air Separator Element (Demo)',
    slug: 'oil-air-separator-element',
    category: 'Spare Parts',
    short_description:
      'Separator elements for all screw compressors, original and alternative.',
    description:
      'Separator element (demo product) — placeholder for the spare-parts line covering all screw compressors. Replace with real part numbers when available.',
    image_url: img('egypttech-separator'),
    gallery: [img('egypttech-separator'), img('egypttech-separator-2')],
    specifications: {
      Type: 'Spin-on / cartridge (Demo)',
      Compatibility: 'All screw compressors (Demo)',
      Quality: 'Original & alternative (Demo)',
      Service: 'With service kits (Demo)',
    },
    featured: true,
    display_order: 5,
  },
  {
    id: 'demo-6',
    name: 'Screw Compressor Service Kit (Demo)',
    slug: 'screw-compressor-service-kit',
    category: 'Spare Parts',
    short_description:
      'Specialized original service kits: filters, oil, separator, valves.',
    description:
      'Service kit (demo product) — placeholder for preventive-maintenance kits including filters, oil and separator plus air-end, cooler, PLC controller, solenoid and gear-set parts. Replace with real data when available.',
    image_url: img('egypttech-servicekit'),
    gallery: [img('egypttech-servicekit')],
    specifications: {
      Contents: 'Filters + oil + separator (Demo)',
      Interval: '2000 / 4000 h (Demo)',
      Parts: 'Air end, cooler, PLC, solenoids (Demo)',
      Oils: 'All industrial compressor oils (Demo)',
    },
    featured: false,
    display_order: 6,
  },
  {
    id: 'demo-7',
    name: 'Rexroth Hydraulic Gear Pump (Demo)',
    slug: 'rexroth-hydraulic-gear-pump',
    category: 'Hydraulic Systems',
    short_description:
      'Global-brand hydraulic oil pump with dedicated service kits.',
    description:
      'Hydraulic gear pump (demo product) — placeholder for the hydraulics line (Rexroth, Bosch pumps and service kits). Replace with real model data when available.',
    image_url: img('egypttech-pump'),
    gallery: [img('egypttech-pump'), img('egypttech-pump-2')],
    specifications: {
      Type: 'External gear pump (Demo)',
      Brands: 'Rexroth, Bosch (Demo)',
      Displacement: '11–45 cm³/rev (Demo)',
      'Max Pressure': '250 bar (Demo)',
      Service: 'Special service kits (Demo)',
    },
    featured: true,
    display_order: 7,
  },
  {
    id: 'demo-8',
    name: 'High-Pressure Hydraulic Filter Unit (Demo)',
    slug: 'high-pressure-hydraulic-filter-unit',
    category: 'Hydraulic Systems',
    short_description:
      'Oil purification filters and elements from leading global brands.',
    description:
      'Hydraulic filter unit (demo product) — placeholder covering low and high-pressure filters and elements (Hydac, Internorman, MP, Parker) plus flow-meter valves for hydraulic circuits. Replace with real data when available.',
    image_url: img('egypttech-hydfilter'),
    gallery: [img('egypttech-hydfilter')],
    specifications: {
      Type: 'Pressure-line filter (Demo)',
      Brands: 'Hydac, Internorman, MP, Parker (Demo)',
      Filtration: '10 / 25 micron (Demo)',
      Extras: 'Flow meter valve (Demo)',
    },
    featured: false,
    display_order: 8,
  },
]

export const demoCategories = Array.from(
  new Set(demoProducts.map((p) => p.category)),
).sort()
