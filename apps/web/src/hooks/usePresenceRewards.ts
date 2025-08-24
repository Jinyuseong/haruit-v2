import { useEffect, useRef, useState } from "react"

type Options = {
  minutesPerCoin?: number    // 몇 분에 1코인
  dailyLimit?: number        // 하루 최대 코인
  inactivitySec?: number     // 비활동으로 판단할 시간(초)
  storageKey?: string        // 일일 기록 키
  onReward?: (amount: number) => void // 코인 지급 함수
}

function todayKey(base: string) {
  const day = new Date().toISOString().slice(0,10) // YYYY-MM-DD
  return `${base}:${day}`
}

export function usePresenceRewards({
  minutesPerCoin = 5,
  dailyLimit = 10,
  inactivitySec = 30,
  storageKey = "presence-reward",
  onReward,
}: Options) {
  const [grantedToday, setGrantedToday] = useState(0)
  const lastActivityRef = useRef<number>(Date.now())
  const accMsRef = useRef<number>(0) // 누적 활동 시간(ms)
  const intervalRef = useRef<number | null>(null)

  // 오늘치 기록 불러오기
  useEffect(() => {
    const key = todayKey(storageKey)
    const raw = localStorage.getItem(key)
    const count = raw ? Number(raw) : 0
    setGrantedToday(count)
  }, [storageKey])

  // 활동 이벤트로 최근 활동 갱신
  useEffect(() => {
    const bump = () => { lastActivityRef.current = Date.now() }
    const opts = { passive: true } as AddEventListenerOptions
    window.addEventListener("mousemove", bump, opts)
    window.addEventListener("mousedown", bump, opts)
    window.addEventListener("keydown", bump, opts)
    window.addEventListener("touchstart", bump, opts)
    window.addEventListener("scroll", bump, opts)
    window.addEventListener("focus", bump)
    return () => {
      window.removeEventListener("mousemove", bump)
      window.removeEventListener("mousedown", bump)
      window.removeEventListener("keydown", bump)
      window.removeEventListener("touchstart", bump)
      window.removeEventListener("scroll", bump)
      window.removeEventListener("focus", bump)
    }
  }, [])

  // 메인 루프: 1초마다 활동 체크
  useEffect(() => {
    function tick() {
      const visible = document.visibilityState === "visible"
      const focused = document.hasFocus()
      const activeWithin = (Date.now() - lastActivityRef.current) / 1000 < inactivitySec

      if (visible && focused && activeWithin && grantedToday < dailyLimit) {
        accMsRef.current += 1000
        const needMs = minutesPerCoin * 60 * 1000
        if (accMsRef.current >= needMs) {
          accMsRef.current -= needMs
          // 코인 지급
          onReward?.(1)
          const key = todayKey(storageKey)
          const next = grantedToday + 1
          localStorage.setItem(key, String(next))
          setGrantedToday(next)
        }
      }
    }

    // 시작/정지 제어: 탭 상태 바뀌면 즉시 반영
    const start = () => {
      if (intervalRef.current == null) {
        intervalRef.current = window.setInterval(tick, 1000) as unknown as number
      }
    }
    const stop = () => {
      if (intervalRef.current != null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    start()
    const vis = () => { /* 가시성 변경 시 상태만 갱신하면 됨 */ }
    document.addEventListener("visibilitychange", vis)
    window.addEventListener("blur", () => { /* tick에서 처리 */ })
    window.addEventListener("focus", () => { /* tick에서 처리 */ })

    return () => {
      stop()
      document.removeEventListener("visibilitychange", vis)
      window.removeEventListener("blur", () => {})
      window.removeEventListener("focus", () => {})
    }
  }, [minutesPerCoin, dailyLimit, inactivitySec, storageKey, grantedToday, onReward])

  return { grantedToday, dailyLimit }
}