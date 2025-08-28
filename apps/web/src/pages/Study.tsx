import { useEffect, useState } from "react"
import CharacterRoom from "../components/CharacterRoom"
import Timer from "../components/Timer"
import TaskList from "../components/TaskList"

export default function Study() {
  const [stopKey, setStopKey] = useState(0)
  const [action, setAction] = useState<"idle" | "study">("idle")

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "app")
    // 페이지 떠날 때 타이머 자동 정지
    return () => setStopKey(k => k + 1)
  }, [])

  return (
    <div className="space-y-6">
      {/* 캐릭터룸 */}
      <div className="pt-2">
        <CharacterRoom 
          action={action === "study" ? "study" : "idle"} 
          equipped={{
            bg: "default",
            deco: "plant",
          }} 
        />
      </div>

      {/* 타이머와 할일 목록 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 공부 타이머 */}
        <div className="card bg-base-100 shadow-lg lg:col-span-2">
          <div className="card-body p-6">
            <h3 className="card-title text-xl mb-4">공부 타이머</h3>
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

        {/* 공부 할 일 */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-6">
            <h3 className="card-title text-xl mb-4">공부 할 일</h3>
            <TaskList 
              storageKey="tasks-study" 
              defaultTasks={["노트 정리", "복습 25분", "문제 10개"]} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}