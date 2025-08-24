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
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between gap-3">
          <h3 className="card-title">{title}</h3>
          <label className="flex items-center gap-2 text-sm">
            <span className="opacity-60">목표(분)</span>
            <input
              type="number"
              min={1}
              className="input input-bordered input-sm w-20"
              value={goalMin}
              onChange={(e) => {
                const v = Number(e.target.value || 0)
                setGoalMin(Math.max(1, v))
                setCompleted(false)
              }}
            />
          </label>
        </div>

        <div className="text-5xl font-bold text-center tracking-wider mt-2">
          {format(elapsed)}
        </div>

        <progress className="progress progress-primary w-full mt-3" value={progress} max={100} />

        <div className="card-actions mt-3 justify-center">
          <button className={`btn ${running ? "btn-warning" : "btn-primary"} w-32`} onClick={handleStartPause}>
            {running ? "일시정지" : "시작"}
          </button>
          <button className="btn btn-outline w-32" onClick={handleReset}>
            리셋
          </button>
        </div>

        {completed && <div className="alert alert-success mt-3">목표 달성! 🎉</div>}
      </div>
    </div>
  )
}