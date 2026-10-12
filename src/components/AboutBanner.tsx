import { aboutBannerMedia } from '../data/site'

/**
 * Slanted photo strip for page banners (About, Products, Contact).
 * Media comes from `aboutBannerMedia` in data/site.ts — client product
 * cutouts shown on the brand navy band.
 */
export default function AboutBanner() {
  return (
    <div
      className="flex h-36 overflow-hidden bg-[#20265e] sm:h-48 lg:h-56"
      aria-hidden="true"
    >
      {aboutBannerMedia.map((img, i) => (
        <div
          key={img.src}
          className="relative h-full min-w-0 flex-1 -ms-5 first:ms-0 sm:-ms-8 sm:first:ms-0"
          style={{
            clipPath: 'polygon(14% 0, 100% 0, 86% 100%, 0 100%)',
            zIndex: aboutBannerMedia.length - i,
          }}
        >
          <div className={`absolute inset-0 ${i % 2 === 0 ? 'bg-white/[0.06]' : 'bg-white/[0.02]'}`} />
          <div
            className="absolute inset-0 animate-[banner-pulse_5s_ease-in-out_infinite] bg-[radial-gradient(circle_at_center,rgba(244,141,36,0.22),transparent_65%)]"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
          <img
            src={img.src}
            alt=""
            loading="eager"
            className={`absolute inset-0 h-full w-full object-contain p-6 drop-shadow-[0_18px_22px_rgba(0,0,0,0.45)] sm:p-8 ${
              i % 2 === 0
                ? 'animate-[hero-float_7s_ease-in-out_infinite]'
                : 'animate-[hero-float-sub_8s_ease-in-out_infinite]'
            }`}
            style={{ animationDelay: `${i * 0.35}s`, animationDuration: `${6 + (i % 3) * 0.9}s` }}
            onError={(e) => {
              const target = e.currentTarget
              if (target.src !== img.fallback) target.src = img.fallback
            }}
          />
        </div>
      ))}
    </div>
  )
}
