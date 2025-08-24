import { useEffect, useMemo, useState } from "react"
import CharacterRoom from "../components/CharacterRoom"
import { Link } from "react-router-dom"

export default function Home() {
  const name = useMemo(() => localStorage.getItem("name") || "버디", [])
  const [coins, setCoins] = useState(Number(localStorage.getItem("coins") || 0))
  const [streak] = useState(3)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "pastel")
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <CharacterRoom action="idle" equipped={{
        bg: "/assets/room/bg_default.png",
        decoLeft: "/assets/room/deco_plant.png",
        decoRight: "/assets/room/deco_shelf.png",
      }} />

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl">환영합니다, {name}! 🎉</h2>
          <p className="opacity-70">오늘도 한 걸음. 꾸준함은 힘 💪</p>
          <div className="mt-3 flex gap-3">
            <div className="badge badge-primary badge-lg">코인 {coins}</div>
            <div className="badge badge-secondary">연속 {streak}일</div>
          </div>
          <div className="card-actions mt-4">
            <Link className="btn btn-primary" to="/study">공부 시작</Link>
            <Link className="btn btn-outline" to="/workout">운동 시작</Link>
          </div>
        </div>
      </div>
    </div>
  )
}