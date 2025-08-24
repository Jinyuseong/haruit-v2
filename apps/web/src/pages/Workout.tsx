import { useEffect, useState } from "react"
import CharacterRoom from "../components/CharacterRoom"
import Timer from "../components/Timer"
import TaskList from "../components/TaskList"

export default function Workout() {
  const [stopKey, setStopKey] = useState(0)
  const [action, setAction] = useState<"idle" | "workout">("idle")

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "pastel")
    return () => setStopKey(k => k + 1)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <CharacterRoom action={action === "workout" ? "workout" : "idle"} equipped={{
        bg: "/assets/room/bg_default.png",
        decoLeft: "/assets/room/deco_plant.png",
        decoRight: "/assets/room/deco_shelf.png",
      }} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-xl lg:col-span-2">
          <div className="card-body">
            <h3 className="card-title">운동 타이머</h3>
            <Timer
              title="운동 타이머"
              defaultMinutes={15}
              onRequestStart={() => true}
              stopKey={stopKey}
              onRunningChange={(r) => setAction(r ? "workout" : "idle")}
              onComplete={() => {
                const next = (Number(localStorage.getItem('coins')||0) + 10)
                localStorage.setItem('coins', String(next))
              }}
            />
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">운동 할 일</h3>
            <TaskList storageKey="tasks-workout" defaultTasks={["스트레칭", "맨몸운동 15분", "물 마시기"]} />
          </div>
        </div>
      </div>
    </div>
  )
}