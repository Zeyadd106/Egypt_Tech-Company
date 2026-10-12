/**
 * Maps catalog icon keys (CategoryNode.icon) to lucide-react icons.
 * Keeps lucide imports in one place so data files stay framework-free.
 */
import {
  AirVent,
  Cog,
  Cpu,
  Droplet,
  DropletOff,
  Droplets,
  Fan,
  Funnel,
  GlassWater,
  Headset,
  Layers,
  ListFilter,
  Package,
  PackageCheck,
  Recycle,
  Settings2,
  Snowflake,
  ThermometerSnowflake,
  ToggleLeft,
  Wind,
  type LucideIcon,
} from 'lucide-react'

const categoryIcons: Record<string, LucideIcon> = {
  wind: Wind,
  fan: Fan,
  cog: Cog,
  settings2: Settings2,
  'toggle-left': ToggleLeft,
  'package-check': PackageCheck,
  package: Package,
  droplets: Droplets,
  'air-vent': AirVent,
  snowflake: Snowflake,
  'list-filter': ListFilter,
  'droplet-off': DropletOff,
  'glass-water': GlassWater,
  funnel: Funnel,
  layers: Layers,
  droplet: Droplet,
  'thermometer-snowflake': ThermometerSnowflake,
  recycle: Recycle,
  headset: Headset,
}

/** Resolve an icon key to a component (falls back to a generic chip icon). */
export function getCategoryIcon(key?: string): LucideIcon {
  return (key && categoryIcons[key]) || Cpu
}
