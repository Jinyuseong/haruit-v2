import { Outlet, useLocation, Link } from 'react-router-dom'
import { Home, BookOpen, Dumbbell, Store } from 'lucide-react'

// ✅ 우리가 만든 코인 & 보상 훅
import { useCoins } from '../hooks/useCoins'
import { usePresenceRewards } from '../hooks/usePresenceRewards'

export default function RootLayout() {
  const loc = useLocation()
  const isActive = (p: string) => (loc.pathname === p ? 'active text-primary' : 'text-base-content/70')

  // ✅ 코인 전역 상태
  const { coins, addCoins } = useCoins()

  // ✅ 접속 시간 보상 훅 (5분당 1코인, 하루 최대 10)
  const { grantedToday, dailyLimit } = usePresenceRewards({
    minutesPerCoin: 0.0833,       // 5분당 1코인
    dailyLimit: 3,          // 하루 최대 10코인
    inactivitySec: 5,       // 30초 동안 입력 없으면 비활동
    storageKey: 'presence-reward',
    onReward: (amt) => addCoins(amt),
      
  })

  return (
    <div className="min-h-screen bg-base-200 pb-24">
      {/* 상단바 */}
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-40">
        <div className="flex-1 px-2 text-lg font-semibold">하루잇</div>
        <div className="flex-none gap-2 pr-3">
          <div className="badge badge-primary badge-lg">코인 {coins}</div>
        </div>
      </div>

      {/* 페이지 컨텐츠 */}
      <div className="container mx-auto px-4 py-6 max-w-screen-sm md:max-w-3xl">
        {/* (선택) 오늘 접속 보상 현황 표시 */}
        <div className="text-sm opacity-60 mb-2">
          접속 보상 {grantedToday}/{dailyLimit}
        </div>
        <Outlet />
      </div>

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 z-40">
        <div className="btm-nav w-full bg-base-100 shadow-xl border-t border-base-300
                        pb-[max(env(safe-area-inset-bottom),0.5rem)]">
          <Link to="/" className={isActive('/')}>
            <Home size={22} />
            <span className="btm-nav-label">홈</span>
          </Link>
          <Link to="/study" className={isActive('/study')}>
            <BookOpen size={22} />
            <span className="btm-nav-label">공부</span>
          </Link>
          <Link to="/workout" className={isActive('/workout')}>
            <Dumbbell size={22} />
            <span className="btm-nav-label">운동</span>
          </Link>
          <Link to="/shop" className={isActive('/shop')}>
            <Store size={22} />
            <span className="btm-nav-label">상점</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}