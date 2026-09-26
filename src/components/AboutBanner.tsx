import { aboutBannerMedia } from '../data/site'

/**
 * Atlas-style slanted photo strip for page banners.
 * Media comes from `aboutBannerMedia` in data/site.ts.
 */
export default function AboutBanner() {
  return (
    <div
      className="flex h-36 overflow-hidden bg-[#20265e] sm:h-48 lg:h-56"
      aria-hidden="true"
    >
      {aboutBannerMedia.map((img, i) => (
        <div
          key={img.fallback}
          className="relative h-full min-w-0 flex-1 -ms-5 first:ms-0 sm:-ms-8 sm:first:ms-0"
          style={{
            clipPath: 'polygon(14% 0, 100% 0, 86% 100%, 0 100%)',
            zIndex: aboutBannerMedia.length - i,
          }}
        >
          <img
            src={img.src}
            alt=""
            loading="eager"
            className="h-full w-full object-cover"
            onError={(e) => {
              const target = e.currentTarget
              if (target.src !== img.fallback) target.src = img.fallback
            }}
          />
          <div className="absolute inset-0 bg-[#20265e]/10" />
        </div>
      ))}
    </div>
  )
}
