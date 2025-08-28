export const Wallpaper = ({ theme = "default" as "default"|"mint"|"lavender"}) => {
  const g = theme === "mint"
    ? ["#e6fffb", "#ecfeff"]
    : theme === "lavender"
    ? ["#f5f3ff", "#eef2ff"]
    : ["#f8fafc", "#eef2ff"]

  return (
    <svg viewBox="0 0 800 450" className="w-full h-full">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor={g[0]}/>
          <stop offset="1" stopColor={g[1]}/>
        </linearGradient>
        <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="2" fill="#e5e7eb"/>
        </pattern>
      </defs>
      {/* 벽 */}
      <rect width="800" height="450" fill="url(#g)"/>
      {/* 바닥 */}
      <rect width="800" height="220" y="230" fill="#e5e7eb"/>
      {/* 벽 패턴 */}
      <rect width="800" height="230" fill="url(#dots)" opacity=".35"/>
    </svg>
  )
}

export const Plant = () => (
  <svg viewBox="0 0 100 140" className="w-24 md:w-28">
    <rect x="35" y="100" width="30" height="20" rx="4" fill="#a3e635"/>
    <path d="M50 100 C40 80, 60 60, 50 40" stroke="#16a34a" strokeWidth="4" fill="none"/>
    <ellipse cx="50" cy="40" rx="12" ry="18" fill="#22c55e"/>
    <ellipse cx="60" cy="60" rx="10" ry="14" fill="#10b981"/>
    <ellipse cx="42" cy="60" rx="10" ry="14" fill="#34d399"/>
  </svg>
)

export const Shelf = () => (
  <svg viewBox="0 0 160 90" className="w-28 md:w-32">
    <rect x="0" y="40" width="160" height="12" rx="3" fill="#a16207"/>
    <rect x="10" y="10" width="26" height="30" rx="3" fill="#f59e0b"/>
    <rect x="44" y="20" width="22" height="20" rx="3" fill="#22d3ee"/>
    <rect x="72" y="14" width="30" height="26" rx="3" fill="#ef4444"/>
    <rect x="106" y="18" width="18" height="22" rx="3" fill="#a78bfa"/>
  </svg>
)