import type { Product } from '../types/product'

/**
 * ------------------------------------------------------------------
 * DEMO / PLACEHOLDER CATALOG — NOT real client data.
 * Themed around the client's business lines (compressors, air
 * treatment, equipment filters, oil coolant, consulting) so the site
 * looks correct until real products are entered in Supabase.
 * `category` follows the top-level catalog ids and `subcategory`
 * follows the nested ones (see src/data/catalog.ts).
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
    id: 'demo-2',
    name: 'VORTEX Screw Air Compressor 37 kW',
    slug: 'vortex-screw-air-compressor-37kw',
    category: 'air-compressors',
    subcategory: 'screw-compressor-vortex',
    short_description:
      'Higher-capacity screw compressor for industrial air networks.',
    description:
      'VORTEX 37 kW screw compressor (demo product) — placeholder for the higher-capacity range. Replace with real model data when available.',
    image_url: img('egypttech-compressor-37'),
    gallery: [img('egypttech-compressor-37'), img('egypttech-compressor-37-2')],
    specifications: {
      Type: 'Oil-injected screw',
      Brand: 'VORTEX (Made in Turkey)',
      Power: '37 kW',
      Pressure: '7–13 bar',
      Capacity: '±6.2 m³/min',
      Cooling: 'Air-cooled',
    },
    featured: false,
    display_order: 2,
  },
  {
    id: 'demo-3',
    name: 'VORTEX Refrigerant Air Dryer',
    slug: 'vortex-refrigerant-air-dryer',
    category: 'air-treatment',
    subcategory: 'air-dryer-vortex',
    short_description:
      'Refrigerant dryer for clean, dry compressed air (VORTEX / OMI range).',
    description:
      'Refrigerant air dryer (demo product) — placeholder from the air-treatment line (VORTEX Made in Turkey, OMI Made in Italy). Replace with real model data when available.',
    image_url: img('egypttech-dryer'),
    gallery: [img('egypttech-dryer'), img('egypttech-dryer-2')],
    specifications: {
      Type: 'Refrigerant dryer',
      Brands: 'VORTEX (Turkey), OMI (Italy)',
      'Pressure Dew Point': '+3 °C',
      'Max Pressure': '16 bar',
      Refrigerant: 'R134a / R407C',
    },
    featured: true,
    display_order: 3,
  },
  {
    id: 'demo-4',
    name: 'Complete Filter',
    slug: 'compressed-air-line-filter-set',
    category: 'air-treatment',
    subcategory: 'industrial-filters-complete',
    short_description:
      'Line filters for air purification from impurities and oil.',
    description:
      'Line filter set (demo product) — placeholder for VORTEX / OMI purification filters plus industrial elements (Atlas Copco, Ingersoll Rand, Compair, Domnick Hunter, MTA). Replace with real data when available.',
    image_url: img('egypttech-linefilter'),
    gallery: [img('egypttech-linefilter')],
    specifications: {
      Type: 'Coalescing + particulate',
      Filtration: '0.01 micron',
      'Oil Carryover': '0.01 ppm',
      Elements: 'Atlas Copco / IR / Compair / DH / MTA',
      Drains: 'Automatic + Manual',
    },
    featured: false,
    display_order: 4,
  },
  {
    id: 'demo-5',
    name: 'Compressor Gear Kit',
    slug: 'compressor-gear-kit',
    category: 'air-compressors',
    subcategory: 'gear-kit',
    short_description:
      'Precision gear sets and internals for screw compressor overhaul.',
    description:
      'Compressor gear kit (demo product) — placeholder for the spare-parts gear-set range used during compressor overhauls. Replace with real part numbers when available.',
    image_url: img('egypttech-gearkit'),
    gallery: [img('egypttech-gearkit')],
    specifications: {
      Type: 'Gear set / internals',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
      Service: 'With overhaul kits',
    },
    featured: false,
    display_order: 5,
  },
  {
    id: 'demo-6',
    name: 'Compressor Solenoid Valve',
    slug: 'compressor-solenoid-valve',
    category: 'air-compressors',
    subcategory: 'solenoid-valve',
    short_description:
      'Replacement solenoid valves for loading and control circuits.',
    description:
      'Solenoid valve (demo product) — placeholder for the spare-parts valve range covering loading, unloading and control circuits. Replace with real part numbers when available.',
    image_url: img('egypttech-solenoid'),
    gallery: [img('egypttech-solenoid')],
    specifications: {
      Type: 'Solenoid / control valve',
      Voltage: '24 V DC / 220 V AC',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 6,
  },
  {
    id: 'demo-7',
    name: 'Screw Compressor Service Kit',
    slug: 'screw-compressor-service-kit',
    category: 'air-compressors',
    subcategory: 'service-kits',
    short_description:
      'Specialized original service kits: filters, oil, separator, valves.',
    description:
      'Service kit (demo product) — placeholder for preventive-maintenance kits including filters, oil and separator plus air-end, cooler, PLC controller, solenoid and gear-set parts. Replace with real data when available.',
    image_url: img('egypttech-servicekit'),
    gallery: [img('egypttech-servicekit')],
    specifications: {
      Contents: 'Filters + oil + separator',
      Interval: '2000 / 4000 h',
      Parts: 'Air end, cooler, PLC, solenoids',
      Oils: 'All industrial compressor oils',
    },
    featured: true,
    display_order: 7,
  },
  {
    id: 'demo-26',
    name: 'Unloader-Throttle Valve Kits',
    slug: 'unloader-throttle-valve-kits',
    category: 'air-compressors',
    subcategory: 'service-kits',
    short_description:
      'Unloader and throttle valve kits for compressor control circuits.',
    description:
      'Unloader-throttle valve kit (demo product) — placeholder for the service-kit range. Replace with real part numbers when available.',
    image_url: img('egypttech-unloader-valve-kit'),
    gallery: [img('egypttech-unloader-valve-kit')],
    specifications: {
      Type: 'Unloader / throttle valve kit',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 26,
  },
  {
    id: 'demo-27',
    name: 'Min. Pressure Valve Kits',
    slug: 'min-pressure-valve-kits',
    category: 'air-compressors',
    subcategory: 'service-kits',
    short_description:
      'Minimum pressure valve kits for stable air networks.',
    description:
      'Minimum pressure valve kit (demo product) — placeholder for the service-kit range. Replace with real part numbers when available.',
    image_url: img('egypttech-min-pressure-valve-kit'),
    gallery: [img('egypttech-min-pressure-valve-kit')],
    specifications: {
      Type: 'Minimum pressure valve kit',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 27,
  },
  {
    id: 'demo-28',
    name: 'Check Valve Kits',
    slug: 'check-valve-kits',
    category: 'air-compressors',
    subcategory: 'service-kits',
    short_description:
      'Check valve kits for compressor air and oil circuits.',
    description:
      'Check valve kit (demo product) — placeholder for the service-kit range. Replace with real part numbers when available.',
    image_url: img('egypttech-check-valve-kit'),
    gallery: [img('egypttech-check-valve-kit')],
    specifications: {
      Type: 'Check valve kit',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 28,
  },
  {
    id: 'demo-29',
    name: 'Oil Stop Valve Kits',
    slug: 'oil-stop-valve-kits',
    category: 'air-compressors',
    subcategory: 'service-kits',
    short_description:
      'Oil stop valve kits for compressor lubrication circuits.',
    description:
      'Oil stop valve kit (demo product) — placeholder for the service-kit range. Replace with real part numbers when available.',
    image_url: img('egypttech-oil-stop-valve-kit'),
    gallery: [img('egypttech-oil-stop-valve-kit')],
    specifications: {
      Type: 'Oil stop valve kit',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 29,
  },
  {
    id: 'demo-30',
    name: 'Vent Valve Kits',
    slug: 'vent-valve-kits',
    category: 'air-compressors',
    subcategory: 'service-kits',
    short_description:
      'Vent valve kits for compressor blow-off and control circuits.',
    description:
      'Vent valve kit (demo product) — placeholder for the service-kit range. Replace with real part numbers when available.',
    image_url: img('egypttech-vent-valve-kit'),
    gallery: [img('egypttech-vent-valve-kit')],
    specifications: {
      Type: 'Vent valve kit',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 30,
  },
  {
    id: 'demo-31',
    name: 'Shuttle Valve Kits',
    slug: 'shuttle-valve-kits',
    category: 'air-compressors',
    subcategory: 'service-kits',
    short_description:
      'Shuttle valve kits for compressor control circuits.',
    description:
      'Shuttle valve kit (demo product) — placeholder for the service-kit range. Replace with real part numbers when available.',
    image_url: img('egypttech-shuttle-valve-kit'),
    gallery: [img('egypttech-shuttle-valve-kit')],
    specifications: {
      Type: 'Shuttle valve kit',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 31,
  },
  {
    id: 'demo-32',
    name: 'Solenoid Valve Kits',
    slug: 'solenoid-valve-kits',
    category: 'air-compressors',
    subcategory: 'service-kits',
    short_description:
      'Solenoid valve kits for loading and control circuits.',
    description:
      'Solenoid valve kit (demo product) — placeholder for the service-kit range. Replace with real part numbers when available.',
    image_url: img('egypttech-solenoid-valve-kit'),
    gallery: [img('egypttech-solenoid-valve-kit')],
    specifications: {
      Type: 'Solenoid valve kit',
      Voltage: '24 V DC / 220 V AC',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 32,
  },
  {
    id: 'demo-33',
    name: 'Pressure Transducers',
    slug: 'pressure-transducers',
    category: 'air-compressors',
    subcategory: 'service-kits',
    short_description:
      'Pressure transducers for compressor monitoring and control.',
    description:
      'Pressure transducer (demo product) — placeholder for the service-kit range. Replace with real part numbers when available.',
    image_url: img('egypttech-pressure-transducer'),
    gallery: [img('egypttech-pressure-transducer')],
    specifications: {
      Type: 'Pressure transducer',
      Output: '4–20 mA / 0–10 V',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 33,
  },
  {
    id: 'demo-34',
    name: 'Temperature Sensors',
    slug: 'temperature-sensors',
    category: 'air-compressors',
    subcategory: 'service-kits',
    short_description:
      'Temperature sensors for compressor monitoring and control.',
    description:
      'Temperature sensor (demo product) — placeholder for the service-kit range. Replace with real part numbers when available.',
    image_url: img('egypttech-temperature-sensor'),
    gallery: [img('egypttech-temperature-sensor')],
    specifications: {
      Type: 'Temperature sensor',
      Output: 'PT100 / PT1000',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 34,
  },
  {
    id: 'demo-35',
    name: 'D. P. Sensors',
    slug: 'dp-sensors',
    category: 'air-compressors',
    subcategory: 'service-kits',
    short_description:
      'Differential pressure sensors for filter and separator monitoring.',
    description:
      'D. P. sensor (demo product) — placeholder for the service-kit range. Replace with real part numbers when available.',
    image_url: img('egypttech-dp-sensor'),
    gallery: [img('egypttech-dp-sensor')],
    specifications: {
      Type: 'Differential pressure sensor',
      Output: '4–20 mA',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 35,
  },
  {
    id: 'demo-36',
    name: 'Coolers / Heat Exchangers',
    slug: 'coolers-heat-exchangers',
    category: 'air-compressors',
    subcategory: 'service-kits',
    short_description:
      'Coolers and heat exchangers for compressor thermal management.',
    description:
      'Cooler / heat exchanger (demo product) — placeholder for the service-kit range. Replace with real part numbers when available.',
    image_url: img('egypttech-cooler-heat-exchanger'),
    gallery: [img('egypttech-cooler-heat-exchanger')],
    specifications: {
      Type: 'Air / oil cooler',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 36,
  },
  {
    id: 'demo-37',
    name: 'Flexible Rubber Hoses',
    slug: 'flexible-rubber-hoses',
    category: 'air-compressors',
    subcategory: 'service-kits',
    short_description:
      'Flexible rubber hoses for compressor air and oil lines.',
    description:
      'Flexible rubber hose (demo product) — placeholder for the service-kit range. Replace with real part numbers when available.',
    image_url: img('egypttech-rubber-hose'),
    gallery: [img('egypttech-rubber-hose')],
    specifications: {
      Type: 'Flexible rubber hose',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 37,
  },
  {
    id: 'demo-38',
    name: 'Rubber Coupling Elements',
    slug: 'rubber-coupling-elements',
    category: 'air-compressors',
    subcategory: 'service-kits',
    short_description:
      'Rubber coupling elements for compressor drive assemblies.',
    description:
      'Rubber coupling element (demo product) — placeholder for the service-kit range. Replace with real part numbers when available.',
    image_url: img('egypttech-rubber-coupling'),
    gallery: [img('egypttech-rubber-coupling')],
    specifications: {
      Type: 'Rubber coupling element',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 38,
  },
  {
    id: 'demo-39',
    name: 'Coolers Fans',
    slug: 'coolers-fans',
    category: 'air-compressors',
    subcategory: 'service-kits',
    short_description:
      'Cooling fans for compressor coolers and heat exchangers.',
    description:
      'Cooler fan (demo product) — placeholder for the service-kit range. Replace with real part numbers when available.',
    image_url: img('egypttech-cooler-fan'),
    gallery: [img('egypttech-cooler-fan')],
    specifications: {
      Type: 'Cooling fan',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 39,
  },
  {
    id: 'demo-40',
    name: 'Lip Seal',
    slug: 'lip-seal',
    category: 'air-compressors',
    subcategory: 'service-kits',
    short_description:
      'Lip seals for compressor shafts and rotating assemblies.',
    description:
      'Lip seal (demo product) — placeholder for the service-kit range. Replace with real part numbers when available.',
    image_url: img('egypttech-lip-seal'),
    gallery: [img('egypttech-lip-seal')],
    specifications: {
      Type: 'Lip seal',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 40,
  },
  {
    id: 'demo-8',
    name: 'Automatic Condensate Drain',
    slug: 'automatic-condensate-drain',
    category: 'air-treatment',
    subcategory: 'drain-automatic',
    short_description:
      'Automatic and manual drains for condensate removal from air lines.',
    description:
      'Condensate drain (demo product) — placeholder for the air-treatment drain range (automatic + manual) for receivers, dryers and filters. Replace with real data when available.',
    image_url: img('egypttech-drain'),
    gallery: [img('egypttech-drain')],
    specifications: {
      Type: 'Automatic + manual',
      Connection: '1/2"',
      'Max Pressure': '16 bar',
      Discharge: 'Electronic timer',
    },
    featured: false,
    display_order: 8,
  },
  {
    id: 'demo-9',
    name: 'Compressed Air Water Separator',
    slug: 'compressed-air-water-separator',
    category: 'air-treatment',
    subcategory: 'water-separator',
    short_description:
      'Cyclonic separators that remove bulk water and condensate.',
    description:
      'Water separator (demo product) — placeholder for cyclonic separators protecting dryers and line filters. Replace with real data when available.',
    image_url: img('egypttech-watersep'),
    gallery: [img('egypttech-watersep')],
    specifications: {
      Type: 'Cyclonic separator',
      Efficiency: 'Up to 95%',
      'Max Pressure': '16 bar',
      Connection: '1/2"–2"',
    },
    featured: false,
    display_order: 9,
  },
  {
    id: 'demo-15',
    name: 'Micro Robur Refrigerant Air Dryer',
    slug: 'micro-robur-refrigerant-air-dryer',
    category: 'air-treatment',
    subcategory: 'air-dryer-micro-robur',
    short_description:
      'Refrigerant dryer from the Micro Robur air-treatment range.',
    description:
      'Micro Robur refrigerant air dryer (demo product) — placeholder from the air-treatment range. Replace with real model data when available.',
    image_url: img('egypttech-dryer-micro-robur'),
    gallery: [img('egypttech-dryer-micro-robur')],
    specifications: {
      Type: 'Refrigerant dryer',
      Brand: 'Micro Robur',
      'Pressure Dew Point': '+3 °C',
      'Max Pressure': '16 bar',
      Refrigerant: 'R134a / R407C',
    },
    featured: false,
    display_order: 15,
  },
  {
    id: 'demo-16',
    name: 'OMI Refrigerant Air Dryer',
    slug: 'omi-refrigerant-air-dryer',
    category: 'air-treatment',
    subcategory: 'air-dryer-omi',
    short_description:
      'Refrigerant dryer from the OMI (Made in Italy) air-treatment range.',
    description:
      'OMI refrigerant air dryer (demo product) — placeholder from the air-treatment line. Replace with real model data when available.',
    image_url: img('egypttech-dryer-omi'),
    gallery: [img('egypttech-dryer-omi')],
    specifications: {
      Type: 'Refrigerant dryer',
      Brand: 'OMI (Made in Italy)',
      'Pressure Dew Point': '+3 °C',
      'Max Pressure': '16 bar',
      Refrigerant: 'R134a / R407C',
    },
    featured: false,
    display_order: 16,
  },
  {
    id: 'demo-17',
    name: 'Filters Elements',
    slug: 'industrial-filter-elements',
    category: 'air-treatment',
    subcategory: 'industrial-filters-elements',
    short_description:
      'Replacement elements for industrial compressed-air line filters.',
    description:
      'Industrial filter elements (demo product) — placeholder for the air-treatment filter element range. Replace with real part numbers when available.',
    image_url: img('egypttech-filter-elements'),
    gallery: [img('egypttech-filter-elements')],
    specifications: {
      Type: 'Coalescing + particulate element',
      Filtration: '0.01 micron',
      'Oil Carryover': '0.01 ppm',
      Compatibility: 'VORTEX / OMI / Atlas Copco / IR / Compair / DH / MTA',
    },
    featured: false,
    display_order: 17,
  },
  {
    id: 'demo-18',
    name: 'Manual Condensate Drain',
    slug: 'manual-condensate-drain',
    category: 'air-treatment',
    subcategory: 'drain-manual',
    short_description:
      'Manual drains for condensate removal from receivers and lines.',
    description:
      'Manual condensate drain (demo product) — placeholder for the air-treatment manual drain range. Replace with real data when available.',
    image_url: img('egypttech-drain-manual'),
    gallery: [img('egypttech-drain-manual')],
    specifications: {
      Type: 'Manual drain',
      Connection: '1/2"',
      'Max Pressure': '16 bar',
    },
    featured: false,
    display_order: 18,
  },
  {
    id: 'demo-19',
    name: 'Zero Air Loss Condensate Drain',
    slug: 'zero-air-loss-condensate-drain',
    category: 'air-treatment',
    subcategory: 'drain-zero-loss',
    short_description:
      'Zero air-loss drains that discharge condensate without losing air.',
    description:
      'Zero air loss condensate drain (demo product) — placeholder for the air-treatment zero-loss drain range. Replace with real data when available.',
    image_url: img('egypttech-drain-zero-loss'),
    gallery: [img('egypttech-drain-zero-loss')],
    specifications: {
      Type: 'Zero air loss drain',
      Connection: '1/2"–1"',
      'Max Pressure': '16 bar',
      Discharge: 'Level-sensed / electronic',
    },
    featured: false,
    display_order: 19,
  },
  {
    id: 'demo-10',
    name: 'Oil Separator - Original',
    slug: 'oil-air-separator-element',
    category: 'equipment-filters',
    subcategory: 'oil-separator-original',
    short_description:
      'Separator elements for all screw compressors, original and alternative.',
    description:
      'Separator element (demo product) — placeholder for the equipment-filters line covering all screw compressors. Replace with real part numbers when available.',
    image_url: img('egypttech-separator'),
    gallery: [img('egypttech-separator'), img('egypttech-separator-2')],
    specifications: {
      Type: 'Spin-on / cartridge',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
      Service: 'With service kits',
    },
    featured: true,
    display_order: 10,
  },
  {
    id: 'demo-11',
    name: 'Air Filter - Original',
    slug: 'compressor-air-filter-element',
    category: 'equipment-filters',
    subcategory: 'air-filter-original',
    short_description:
      'High-efficiency air intake and line filter elements.',
    description:
      'Air filter element (demo product) — placeholder for the equipment-filters air range. Replace with real part numbers when available.',
    image_url: img('egypttech-airfilter'),
    gallery: [img('egypttech-airfilter')],
    specifications: {
      Type: 'Intake / line element',
      Filtration: '3–10 micron',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 11,
  },
  {
    id: 'demo-12',
    name: 'Oil Filter - Original',
    slug: 'compressor-oil-filter-element',
    category: 'equipment-filters',
    subcategory: 'oil-filter-original',
    short_description:
      'Oil filter elements that protect the compressor air-end.',
    description:
      'Oil filter element (demo product) — placeholder for the equipment-filters oil range. Replace with real part numbers when available.',
    image_url: img('egypttech-oilfilter'),
    gallery: [img('egypttech-oilfilter')],
    specifications: {
      Type: 'Spin-on / cartridge',
      Filtration: '10 micron',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 12,
  },
  {
    id: 'demo-20',
    name: 'Oil Separator - TG Italy',
    slug: 'oil-separator-tg-italy',
    category: 'equipment-filters',
    subcategory: 'oil-separator-tg-italy',
    short_description:
      'Oil separator elements from the TG (Made in Italy) range.',
    description:
      'Oil separator element (demo product) — placeholder for the TG Italy oil-separator range. Replace with real part numbers when available.',
    image_url: img('egypttech-separator-tg-italy'),
    gallery: [img('egypttech-separator-tg-italy')],
    specifications: {
      Type: 'Spin-on / cartridge',
      Brand: 'TG (Made in Italy)',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 20,
  },
  {
    id: 'demo-21',
    name: 'Oil Separator - Micro Robur Turkey',
    slug: 'oil-separator-micro-robur',
    category: 'equipment-filters',
    subcategory: 'oil-separator-micro-robur',
    short_description:
      'Oil separator elements from the Micro Robur (Made in Turkey) range.',
    description:
      'Oil separator element (demo product) — placeholder for the Micro Robur Turkey oil-separator range. Replace with real part numbers when available.',
    image_url: img('egypttech-separator-micro-robur'),
    gallery: [img('egypttech-separator-micro-robur')],
    specifications: {
      Type: 'Spin-on / cartridge',
      Brand: 'Micro Robur (Made in Turkey)',
      Compatibility: 'All screw compressors',
      Quality: 'Original & alternative',
    },
    featured: false,
    display_order: 21,
  },
  {
    id: 'demo-22',
    name: 'Air Filter - TG Italy',
    slug: 'air-filter-tg-italy',
    category: 'equipment-filters',
    subcategory: 'air-filter-tg-italy',
    short_description:
      'Air filter elements from the TG (Made in Italy) range.',
    description:
      'Air filter element (demo product) — placeholder for the TG Italy air-filter range. Replace with real part numbers when available.',
    image_url: img('egypttech-airfilter-tg-italy'),
    gallery: [img('egypttech-airfilter-tg-italy')],
    specifications: {
      Type: 'Intake / line element',
      Brand: 'TG (Made in Italy)',
      Filtration: '3–10 micron',
      Compatibility: 'All screw compressors',
    },
    featured: false,
    display_order: 22,
  },
  {
    id: 'demo-23',
    name: 'Air Filter - Micro Robur Turkey',
    slug: 'air-filter-micro-robur',
    category: 'equipment-filters',
    subcategory: 'air-filter-micro-robur',
    short_description:
      'Air filter elements from the Micro Robur (Made in Turkey) range.',
    description:
      'Air filter element (demo product) — placeholder for the Micro Robur Turkey air-filter range. Replace with real part numbers when available.',
    image_url: img('egypttech-airfilter-micro-robur'),
    gallery: [img('egypttech-airfilter-micro-robur')],
    specifications: {
      Type: 'Intake / line element',
      Brand: 'Micro Robur (Made in Turkey)',
      Filtration: '3–10 micron',
      Compatibility: 'All screw compressors',
    },
    featured: false,
    display_order: 23,
  },
  {
    id: 'demo-24',
    name: 'Oil Filter - TG Italy',
    slug: 'oil-filter-tg-italy',
    category: 'equipment-filters',
    subcategory: 'oil-filter-tg-italy',
    short_description:
      'Oil filter elements from the TG (Made in Italy) range.',
    description:
      'Oil filter element (demo product) — placeholder for the TG Italy oil-filter range. Replace with real part numbers when available.',
    image_url: img('egypttech-oilfilter-tg-italy'),
    gallery: [img('egypttech-oilfilter-tg-italy')],
    specifications: {
      Type: 'Spin-on / cartridge',
      Brand: 'TG (Made in Italy)',
      Filtration: '10 micron',
      Compatibility: 'All screw compressors',
    },
    featured: false,
    display_order: 24,
  },
  {
    id: 'demo-25',
    name: 'Oil Filter - Micro Robur Turkey',
    slug: 'oil-filter-micro-robur',
    category: 'equipment-filters',
    subcategory: 'oil-filter-micro-robur',
    short_description:
      'Oil filter elements from the Micro Robur (Made in Turkey) range.',
    description:
      'Oil filter element (demo product) — placeholder for the Micro Robur Turkey oil-filter range. Replace with real part numbers when available.',
    image_url: img('egypttech-oilfilter-micro-robur'),
    gallery: [img('egypttech-oilfilter-micro-robur')],
    specifications: {
      Type: 'Spin-on / cartridge',
      Brand: 'Micro Robur (Made in Turkey)',
      Filtration: '10 micron',
      Compatibility: 'All screw compressors',
    },
    featured: false,
    display_order: 25,
  },
  {
    id: 'demo-13',
    name: 'VORTEX Compressor Oil Coolant',
    slug: 'vortex-compressor-oil-coolant',
    category: 'oil-coolant',
    short_description:
      'Industrial coolant oils for compressors and hydraulic systems.',
    description:
      'Compressor oil coolant (demo product) — placeholder for the oil & coolant range (all industrial compressor oils), including lubricants for hydraulic systems. Replace with real data when available.',
    image_url: img('egypttech-oil'),
    gallery: [img('egypttech-oil')],
    specifications: {
      Type: 'Synthetic / mineral',
      Viscosity: '46 / 32',
      Interval: '4000 / 8000 h',
      Use: 'Compressors & hydraulics',
    },
    featured: true,
    display_order: 13,
  },
  {
    id: 'demo-14',
    name: 'Air Network Technical Consultation',
    slug: 'air-network-technical-consultation',
    category: 'technical-consulting',
    short_description:
      'Engineering, technical and executive consultations for air networks.',
    description:
      'Technical consultation (demo listing) — placeholder describing Egypt Tech engineering support for compressed-air networks (sizing, efficiency, audits). Replace with real service details when available.',
    image_url: img('egypttech-consulting'),
    gallery: [img('egypttech-consulting')],
    specifications: {
      Scope: 'Sizing, audits, efficiency',
      Delivery: 'On-site & remote',
      Team: 'Specialized engineers',
    },
    featured: false,
    display_order: 14,
  },
]

export const demoCategories = Array.from(
  new Set(demoProducts.map((p) => p.category)),
).sort()
