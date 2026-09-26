-- ============================================================
-- Egypt Tech — DEMO seed data (PLACEHOLDER ONLY)
-- Themed around the client business lines (compressors, air
-- treatment, spare parts, hydraulics). Run AFTER schema.sql.
-- Replace with real client products later. Upload real images to
-- the `product-images` bucket and put the public URLs into
-- image_url / gallery.
-- ============================================================

-- Demo images use picsum placeholders. Swap for Supabase Storage URLs:
-- https://<project>.supabase.co/storage/v1/object/public/product-images/<file>

insert into public.products
  (name, slug, category, short_description, description, image_url, gallery, specifications, featured, display_order)
values
  (
    'VORTEX Screw Air Compressor 7.5 kW (Demo)',
    'vortex-screw-air-compressor-7-5kw',
    'Air Compressors',
    'Oil-injected screw compressor for professional compressed-air supply.',
    'VORTEX screw air compressor (demo product). Egypt Tech is the sole agent for VORTEX compressors, dryers, tanks and air filters. Replace with real model data when available.',
    'https://picsum.photos/seed/egypttech-compressor-75/900/675',
    '["https://picsum.photos/seed/egypttech-compressor-75/900/675", "https://picsum.photos/seed/egypttech-compressor-75-2/900/675"]',
    '{"Type": "Oil-injected screw (Demo)", "Brand": "VORTEX (Made in Turkey)", "Power": "7.5 kW", "Pressure": "7-10 bar", "Capacity": "+-1.1 m3/min"}',
    true, 1
  ),
  (
    'VORTEX Screw Air Compressor 37 kW (Demo)',
    'vortex-screw-air-compressor-37kw',
    'Air Compressors',
    'Higher-capacity screw compressor for industrial air networks.',
    'VORTEX 37 kW screw compressor (demo product). Replace with real model data when available.',
    'https://picsum.photos/seed/egypttech-compressor-37/900/675',
    '["https://picsum.photos/seed/egypttech-compressor-37/900/675", "https://picsum.photos/seed/egypttech-compressor-37-2/900/675"]',
    '{"Type": "Oil-injected screw (Demo)", "Brand": "VORTEX (Made in Turkey)", "Power": "37 kW", "Pressure": "7-13 bar", "Capacity": "+-6.2 m3/min"}',
    false, 2
  ),
  (
    'VORTEX Refrigerant Air Dryer (Demo)',
    'vortex-refrigerant-air-dryer',
    'Air Treatment',
    'Refrigerant dryer for clean, dry compressed air (VORTEX / OMI range).',
    'Refrigerant air dryer (demo product) from the air-treatment line. Replace with real model data when available.',
    'https://picsum.photos/seed/egypttech-dryer/900/675',
    '["https://picsum.photos/seed/egypttech-dryer/900/675", "https://picsum.photos/seed/egypttech-dryer-2/900/675"]',
    '{"Type": "Refrigerant dryer (Demo)", "Brands": "VORTEX (Turkey), OMI (Italy)", "Pressure Dew Point": "+3 C (Demo)", "Max Pressure": "16 bar"}',
    true, 3
  ),
  (
    'Compressed Air Line Filter Set (Demo)',
    'compressed-air-line-filter-set',
    'Air Treatment',
    'Line filters for air purification from impurities and oil.',
    'Line filter set (demo product). Replace with real data when available.',
    'https://picsum.photos/seed/egypttech-linefilter/900/675',
    '["https://picsum.photos/seed/egypttech-linefilter/900/675"]',
    '{"Type": "Coalescing + particulate (Demo)", "Filtration": "0.01 micron (Demo)", "Drains": "Automatic + Manual (Demo)"}',
    false, 4
  ),
  (
    'Oil & Air Separator Element (Demo)',
    'oil-air-separator-element',
    'Spare Parts',
    'Separator elements for all screw compressors, original and alternative.',
    'Separator element (demo product). Replace with real part numbers when available.',
    'https://picsum.photos/seed/egypttech-separator/900/675',
    '["https://picsum.photos/seed/egypttech-separator/900/675", "https://picsum.photos/seed/egypttech-separator-2/900/675"]',
    '{"Type": "Spin-on / cartridge (Demo)", "Compatibility": "All screw compressors (Demo)", "Quality": "Original & alternative (Demo)"}',
    true, 5
  ),
  (
    'Screw Compressor Service Kit (Demo)',
    'screw-compressor-service-kit',
    'Spare Parts',
    'Specialized original service kits: filters, oil, separator, valves.',
    'Service kit (demo product). Replace with real data when available.',
    'https://picsum.photos/seed/egypttech-servicekit/900/675',
    '["https://picsum.photos/seed/egypttech-servicekit/900/675"]',
    '{"Contents": "Filters + oil + separator (Demo)", "Interval": "2000 / 4000 h (Demo)", "Parts": "Air end, cooler, PLC, solenoids (Demo)"}',
    false, 6
  ),
  (
    'Rexroth Hydraulic Gear Pump (Demo)',
    'rexroth-hydraulic-gear-pump',
    'Hydraulic Systems',
    'Global-brand hydraulic oil pump with dedicated service kits.',
    'Hydraulic gear pump (demo product). Replace with real model data when available.',
    'https://picsum.photos/seed/egypttech-pump/900/675',
    '["https://picsum.photos/seed/egypttech-pump/900/675", "https://picsum.photos/seed/egypttech-pump-2/900/675"]',
    '{"Type": "External gear pump (Demo)", "Brands": "Rexroth, Bosch (Demo)", "Displacement": "11-45 cm3/rev (Demo)", "Max Pressure": "250 bar (Demo)"}',
    true, 7
  ),
  (
    'High-Pressure Hydraulic Filter Unit (Demo)',
    'high-pressure-hydraulic-filter-unit',
    'Hydraulic Systems',
    'Oil purification filters and elements from leading global brands.',
    'Hydraulic filter unit (demo product). Replace with real data when available.',
    'https://picsum.photos/seed/egypttech-hydfilter/900/675',
    '["https://picsum.photos/seed/egypttech-hydfilter/900/675"]',
    '{"Type": "Pressure-line filter (Demo)", "Brands": "Hydac, Internorman, MP, Parker (Demo)", "Filtration": "10 / 25 micron (Demo)"}',
    false, 8
  )
on conflict (slug) do nothing;
