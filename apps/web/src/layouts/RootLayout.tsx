import { Outlet, Link } from "react-router-dom"
import { useCoins } from "../hooks/useCoins"
import { usePresenceRewards } from "../hooks/usePresenceRewards"
import BottomNav from "../components/BottomNav"

export default function RootLayout() {
  const { coins, addCoins } = useCoins()

  // (테스트 값이면 그대로 두고, 실제 운영시 분/한도 올리세요)
  usePresenceRewards({
    minutesPerCoin: 0.0833, // 5초/코인(테스트)
    dailyLimit: 3,
    inactivitySec: 5,
    storageKey: "presence-reward",
    onReward: (amt) => addCoins(amt),
  })

  return (
    <div className="min-h-screen bg-base-200">
      {/* 상단바 */}
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-[80] min-h-[60px]">
        <div className="w-full max-w-screen-lg mx-auto px-6 flex items-center justify-between">
          {/* 좌측: 앱 제목 (홈 링크) */}
          <div>
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-xl font-bold text-primary cursor-pointer">하루잇</h1>
            </Link>
          </div>
          
          {/* 우측: 코인 표시 */}
          <div>
            <div className="badge badge-primary badge-lg gap-2">
              <span className="text-xs">💰</span>
              <span className="font-bold">{coins}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 본문: 하단 여백 제거 */}
      <div className="w-full max-w-screen-sm md:max-w-2xl lg:max-w-4xl mx-auto px-6 py-6">
        <Outlet />
      </div>

      {/* 하단 네비게이션 (일반 레이아웃에 포함) */}
      <BottomNav />
    </div>
  )
}