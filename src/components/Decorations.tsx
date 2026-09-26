/**
 * Pure-SVG decorative graphics (Atlas-style geometric accents),
 * recolored to the Egypt Tech brand. Decorative only — aria-hidden.
 */

/** Cluster of isometric cubes in brand orange (right side of Why band). */
export function CubesDecoration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 420"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <g id="et-cube">
          <polygon points="0,-34 30,-17 0,0 -30,-17" fill="#f7b955" />
          <polygon points="-30,-17 0,0 0,34 -30,17" fill="#d97508" />
          <polygon points="30,-17 0,0 0,34 30,17" fill="#f48d24" />
        </g>
      </defs>
      <g>
        <use href="#et-cube" transform="translate(90,120)" />
        <use href="#et-cube" transform="translate(150,154)" />
        <use href="#et-cube" transform="translate(210,120)" />
        <use href="#et-cube" transform="translate(270,154)" />
        <use href="#et-cube" transform="translate(330,120)" />
        <use href="#et-cube" transform="translate(390,154)" />
        <use href="#et-cube" transform="translate(120,222)" opacity="0.9" />
        <use href="#et-cube" transform="translate(180,188)" />
        <use href="#et-cube" transform="translate(240,222)" opacity="0.9" />
        <use href="#et-cube" transform="translate(300,188)" />
        <use href="#et-cube" transform="translate(360,222)" opacity="0.9" />
        <use href="#et-cube" transform="translate(420,188)" />
        <use href="#et-cube" transform="translate(150,290)" opacity="0.75" />
        <use href="#et-cube" transform="translate(210,256)" opacity="0.9" />
        <use href="#et-cube" transform="translate(270,290)" opacity="0.75" />
        <use href="#et-cube" transform="translate(330,256)" opacity="0.9" />
        <use href="#et-cube" transform="translate(240,324)" opacity="0.6" />
        <use href="#et-cube" transform="translate(300,358)" opacity="0.45" />
      </g>
    </svg>
  )
}

/** Small zigzag divider in brand orange (Atlas-style heading ornament). */
export function Zigzag({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 12"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <polyline
        points="2,8 10,2 18,8 26,2 34,8 42,2 46,6"
        fill="none"
        stroke="#f48d24"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Faint gray contour waves (left side of About section). */
export function WavesDecoration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 560"
      preserveAspectRatio="xMinYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="#dfe3ea" strokeWidth="1.5">
        <path d="M-40,60 C60,90 90,170 40,240 C-10,310 30,400 120,440 C180,466 220,500 230,560" />
        <path d="M-60,40 C50,70 80,160 30,230 C-20,300 20,395 115,435 C180,462 225,500 235,560" />
        <path d="M-80,20 C40,50 70,150 20,220 C-30,290 10,390 110,430 C180,458 230,500 240,560" />
        <path d="M-100,0 C30,30 60,140 10,210 C-40,280 0,385 105,425 C180,454 235,500 245,560" />
        <path d="M-20,80 C70,110 100,180 55,245 C10,310 45,395 130,430" />
      </g>
    </svg>
  )
}
