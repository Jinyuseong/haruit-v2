import { useEffect, useRef, useState } from "react"

type Props = {
  title: string
  defaultMinutes?: number
  onRequestStart?: () => boolean
  stopKey?: number
  onComplete?: () => void
  /** ✅ 시작/정지 상태를 부모(Home)로 알려줌 */
  onRunningChange?: (running: boolean) => void
}

function format(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  const hh = String(Math.floor(s / 3600)).padStart(2, "0")
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0")
  const ss = String(s % 60).padStart(2, "0")
  return `${hh}:${mm}:${ss}`
}

export default function Timer({
  title,
  defaultMinutes = 25,
  onRequestStart,
  stopKey,
  onComplete,
  onRunningChange,
}: Props) {
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [goalMin, setGoalMin] = useState(defaultMinutes)
  const [completed, setCompleted] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    onRunningChange?.(running)
  }, [running, onRunningChange])

  useEffect(() => {
    if (!running) return
    const startAt = performance.now() - elapsed
    const tick = (now: number) => {
      setElapsed(now - startAt)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [running])

  useEffect(() => {
    if (stopKey !== undefined) {
      setRunning(false)
    }
  }, [stopKey])

  const goalMs = Math.max(1, goalMin) * 60_000
  useEffect(() => {
    if (!completed && elapsed >= goalMs) {
      setCompleted(true)
      setRunning(false)
      onComplete?.()
    }
  }, [elapsed, goalMs, completed, onComplete])

  const handleStartPause = () => {
    if (running) {
      setRunning(false)
      return
    }
    if (onRequestStart && !onRequestStart()) return
    setRunning(true)
  }

  const handleReset = () => {
    setRunning(false)
    setElapsed(0)
    setCompleted(false)
  }

  const progress = Math.min(100, Math.floor((elapsed / goalMs) * 100))

  return (
    <div className="space-y-4">
      {/* 목표 시간 설정 */}
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-base-content/70">목표 시간</h4>
        <label className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            className="input input-bordered input-sm w-20 text-center"
            value={goalMin}
            onChange={(e) => {
              const v = Number(e.target.value || 0)
              setGoalMin(Math.max(1, v))
              setCompleted(false)
            }}
          />
          <span className="text-sm text-base-content/70">분</span>
        </label>
      </div>

      {/* 타이머 디스플레이 */}
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold tracking-wider text-primary">
          {format(elapsed)}
        </div>
        <div className="text-sm text-base-content/60 mt-1">
          목표: {goalMin}분
        </div>
      </div>

      {/* 진행률 바 */}
      <div className="w-full">
        <progress 
          className="progress progress-primary w-full h-3" 
          value={progress} 
          max={100} 
        />
        <div className="text-right text-xs text-base-content/60 mt-1">
          {progress}% 완료
        </div>
      </div>

      {/* 컨트롤 버튼 */}
      <div className="flex gap-3 justify-center">
        <button 
          className={`btn ${running ? "btn-warning" : "btn-primary"} min-w-24`} 
          onClick={handleStartPause}
        >
          {running ? "일시정지" : "시작"}
        </button>
        <button 
          className="btn btn-outline min-w-24" 
          onClick={handleReset}
        >
          리셋
        </button>
      </div>

      {/* 완료 알림 */}
      {completed && (
        <div className="alert alert-success">
          <span>🎉 목표 달성! 훌륭합니다!</span>
        </div>
      )}
    </div>
  )
}