-- ============================================================
-- Egypt Tech — DEMO seed data (PLACEHOLDER ONLY)
-- Themed around the client business lines (compressors, air
-- treatment, equipment filters, oil coolant, consulting). Run
-- AFTER schema.sql. Replace with real client products later.
-- `category` / `subcategory` use the catalog ids defined in
-- src/data/catalog.ts. Upload real images to the
-- `product-images` bucket and put the public URLs into
-- image_url / gallery.
-- ============================================================

-- Demo images use picsum placeholders. Swap for Supabase Storage URLs:
-- https://<project>.supabase.co/storage/v1/object/public/product-images/<file>

insert into public.products
  (name, slug, category, subcategory, short_description, description, image_url, gallery, specifications, featured, display_order)
values
  (
    'VORTEX Screw Air Compressor 7.5 kW (Demo)',
    'vortex-screw-air-compressor-7-5kw',
    'air-compressors', 'screw-compressor-vortex',
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
    'air-compressors', 'screw-compressor-vortex',
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
    'air-treatment', 'air-dryer-vortex',
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
    'air-treatment', 'industrial-filters-complete',
    'Line filters for air purification from impurities and oil.',
    'Line filter set (demo product). Replace with real data when available.',
    'https://picsum.photos/seed/egypttech-linefilter/900/675',
    '["https://picsum.photos/seed/egypttech-linefilter/900/675"]',
    '{"Type": "Coalescing + particulate (Demo)", "Filtration": "0.01 micron (Demo)", "Drains": "Automatic + Manual (Demo)"}',
    false, 4
  ),
  (
    'Compressor Gear Kit (Demo)',
    'compressor-gear-kit',
    'air-compressors', 'gear-kit',
    'Precision gear sets and internals for screw compressor overhaul.',
    'Compressor gear kit (demo product). Replace with real part numbers when available.',
    'https://picsum.photos/seed/egypttech-gearkit/900/675',
    '["https://picsum.photos/seed/egypttech-gearkit/900/675"]',
    '{"Type": "Gear set / internals (Demo)", "Compatibility": "All screw compressors (Demo)", "Quality": "Original & alternative (Demo)"}',
    false, 5
  ),
  (
    'Compressor Solenoid Valve (Demo)',
    'compressor-solenoid-valve',
    'air-compressors', 'solenoid-valve',
    'Replacement solenoid valves for loading and control circuits.',
    'Solenoid valve (demo product). Replace with real part numbers when available.',
    'https://picsum.photos/seed/egypttech-solenoid/900/675',
    '["https://picsum.photos/seed/egypttech-solenoid/900/675"]',
    '{"Type": "Solenoid / control valve (Demo)", "Voltage": "24 V DC / 220 V AC (Demo)", "Compatibility": "All screw compressors (Demo)"}',
    false, 6
  ),
  (
    'Screw Compressor Service Kit (Demo)',
    'screw-compressor-service-kit',
    'air-compressors', 'service-kits',
    'Specialized original service kits: filters, oil, separator, valves.',
    'Service kit (demo product). Replace with real data when available.',
    'https://picsum.photos/seed/egypttech-servicekit/900/675',
    '["https://picsum.photos/seed/egypttech-servicekit/900/675"]',
    '{"Contents": "Filters + oil + separator (Demo)", "Interval": "2000 / 4000 h (Demo)", "Parts": "Air end, cooler, PLC, solenoids (Demo)"}',
    true, 7
  ),
  (
    'Automatic Condensate Drain (Demo)',
    'automatic-condensate-drain',
    'air-treatment', 'drain-automatic',
    'Automatic and manual drains for condensate removal from air lines.',
    'Condensate drain (demo product). Replace with real data when available.',
    'https://picsum.photos/seed/egypttech-drain/900/675',
    '["https://picsum.photos/seed/egypttech-drain/900/675"]',
    '{"Type": "Automatic + manual (Demo)", "Connection": "1/2 inch (Demo)", "Max Pressure": "16 bar"}',
    false, 8
  ),
  (
    'Compressed Air Water Separator (Demo)',
    'compressed-air-water-separator',
    'air-treatment', 'water-separator',
    'Cyclonic separators that remove bulk water and condensate.',
    'Water separator (demo product). Replace with real data when available.',
    'https://picsum.photos/seed/egypttech-watersep/900/675',
    '["https://picsum.photos/seed/egypttech-watersep/900/675"]',
    '{"Type": "Cyclonic separator (Demo)", "Efficiency": "Up to 95% (Demo)", "Max Pressure": "16 bar"}',
    false, 9
  ),
  (
    'Oil & Air Separator Element (Demo)',
    'oil-air-separator-element',
    'equipment-filters', 'oil-separator-original',
    'Separator elements for all screw compressors, original and alternative.',
    'Separator element (demo product). Replace with real part numbers when available.',
    'https://picsum.photos/seed/egypttech-separator/900/675',
    '["https://picsum.photos/seed/egypttech-separator/900/675", "https://picsum.photos/seed/egypttech-separator-2/900/675"]',
    '{"Type": "Spin-on / cartridge (Demo)", "Compatibility": "All screw compressors (Demo)", "Quality": "Original & alternative (Demo)"}',
    true, 10
  ),
  (
    'Compressor Air Filter Element (Demo)',
    'compressor-air-filter-element',
    'equipment-filters', 'air-filter-original',
    'High-efficiency air intake and line filter elements.',
    'Air filter element (demo product). Replace with real part numbers when available.',
    'https://picsum.photos/seed/egypttech-airfilter/900/675',
    '["https://picsum.photos/seed/egypttech-airfilter/900/675"]',
    '{"Type": "Intake / line element (Demo)", "Filtration": "3-10 micron (Demo)", "Compatibility": "All screw compressors (Demo)"}',
    false, 11
  ),
  (
    'Compressor Oil Filter Element (Demo)',
    'compressor-oil-filter-element',
    'equipment-filters', 'oil-filter-original',
    'Oil filter elements that protect the compressor air-end.',
    'Oil filter element (demo product). Replace with real part numbers when available.',
    'https://picsum.photos/seed/egypttech-oilfilter/900/675',
    '["https://picsum.photos/seed/egypttech-oilfilter/900/675"]',
    '{"Type": "Spin-on / cartridge (Demo)", "Filtration": "10 micron (Demo)", "Compatibility": "All screw compressors (Demo)"}',
    false, 12
  ),
  (
    'VORTEX Compressor Oil Coolant (Demo)',
    'vortex-compressor-oil-coolant',
    'oil-coolant', null,
    'Industrial coolant oils for compressors and hydraulic systems.',
    'Compressor oil coolant (demo product). Replace with real data when available.',
    'https://picsum.photos/seed/egypttech-oil/900/675',
    '["https://picsum.photos/seed/egypttech-oil/900/675"]',
    '{"Type": "Synthetic / mineral (Demo)", "Viscosity": "46 / 32 (Demo)", "Use": "Compressors & hydraulics (Demo)"}',
    true, 13
  ),
  (
    'Air Network Technical Consultation (Demo)',
    'air-network-technical-consultation',
    'technical-consulting', null,
    'Engineering, technical and executive consultations for air networks.',
    'Technical consultation (demo listing). Replace with real service details when available.',
    'https://picsum.photos/seed/egypttech-consulting/900/675',
    '["https://picsum.photos/seed/egypttech-consulting/900/675"]',
    '{"Scope": "Sizing, audits, efficiency (Demo)", "Delivery": "On-site & remote (Demo)", "Team": "Specialized engineers (Demo)"}',
    false, 14
  )
on conflict (slug) do nothing;
