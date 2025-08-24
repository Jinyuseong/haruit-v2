import { useEffect, useState } from "react"
import CharacterRoom from "../components/CharacterRoom"
import Timer from "../components/Timer"
import TaskList from "../components/TaskList"

export default function Study() {
  const [stopKey, setStopKey] = useState(0)
  const [action, setAction] = useState<"idle" | "study">("idle")

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "pastel")
    // 페이지 떠날 때 타이머 자동 정지
    return () => setStopKey(k => k + 1)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <CharacterRoom action={action === "study" ? "study" : "idle"} equipped={{
        bg: "/assets/room/bg_default.png",
        decoLeft: "/assets/room/deco_plant.png",
        decoRight: "/assets/room/deco_shelf.png",
      }} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-xl lg:col-span-2">
          <div className="card-body">
            <h3 className="card-title">공부 타이머</h3>
            <Timer
              title="공부 타이머"
              defaultMinutes={25}
              onRequestStart={() => true}
              stopKey={stopKey}
              onRunningChange={(r) => setAction(r ? "study" : "idle")}
              onComplete={() => {
                const next = (Number(localStorage.getItem('coins')||0) + 10)
                localStorage.setItem('coins', String(next))
              }}
            />
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">공부 할 일</h3>
            <TaskList storageKey="tasks-study" defaultTasks={["노트 정리", "복습 25분", "문제 10개"]} />
          </div>
        </div>
      </div>
    </div>
  )
}