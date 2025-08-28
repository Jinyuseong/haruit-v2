// src/components/BottomNav.tsx
import { Link, useLocation } from "react-router-dom"
import { Home, BookOpen, Dumbbell, Store } from "lucide-react"

export default function BottomNav() {
  const loc = useLocation()
  const is = (p: string) =>
    loc.pathname === p ? "text-primary" : "text-base-content/70"

  return (
    <nav className="w-full bg-base-100 border-t border-base-300">
      <div className="w-full max-w-screen-sm md:max-w-2xl lg:max-w-4xl mx-auto px-2">
        <ul className="flex h-8 items-center justify-around">
          <li className="flex-1 max-w-[60px]">
            <Link to="/" className={`flex flex-col items-center gap-0 p-0.5 rounded transition-colors ${is("/")}`}>
              <Home size={14} />
              <span className="text-xs font-medium">홈</span>
            </Link>
          </li>
          <li className="flex-1 max-w-[60px]">
            <Link to="/study" className={`flex flex-col items-center gap-0 p-0.5 rounded transition-colors ${is("/study")}`}>
              <BookOpen size={14} />
              <span className="text-xs font-medium">공부</span>
            </Link>
          </li>
          <li className="flex-1 max-w-[60px]">
            <Link to="/workout" className={`flex flex-col items-center gap-0 p-0.5 rounded transition-colors ${is("/workout")}`}>
              <Dumbbell size={14} />
              <span className="text-xs font-medium">운동</span>
            </Link>
          </li>
          <li className="flex-1 max-w-[60px]">
            <Link to="/shop" className={`flex flex-col items-center gap-0 p-0.5 rounded transition-colors ${is("/shop")}`}>
              <Store size={14} />
              <span className="text-xs font-medium">상점</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}