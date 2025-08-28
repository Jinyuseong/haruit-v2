import { Wallpaper, Plant, Shelf } from "../assets/room-svg"

type Action = "idle" | "study" | "workout"
type Equipped = {
  bg?: "default" | "mint" | "lavender"
  deco?: "plant" | "shelf" | "none"
}

export default function CharacterRoom({
  action,
  equipped = { bg: "default", deco: "plant" },
}: {
  action: Action
  equipped?: Equipped
}) {
  // 캐릭터는 임시로 이모지 사용 (이미지 없이도 동작)
  const emoji = action === "study" ? "📖" : action === "workout" ? "🏃‍♂️" : "🙂"

  return (
    <div className="relative w-full h-[240px] md:h-[280px] rounded-2xl overflow-hidden shadow-lg bg-base-100 border border-base-300">
      {/* 배경 */}
      <div className="absolute inset-0">
        <Wallpaper theme={equipped.bg || "default"} />
      </div>

      {/* 데코 아이템 */}
      {equipped.deco !== "none" && (
        <>
          <div className="absolute left-4 bottom-4">
            {equipped.deco === "plant" ? <Plant/> : null}
          </div>
          <div className="absolute right-4 bottom-4">
            {equipped.deco === "shelf" ? <Shelf/> : null}
          </div>
        </>
      )}

      {/* 캐릭터 */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-4xl md:text-5xl drop-shadow-lg animate-pulse">
          {emoji}
        </div>
      </div>

      {/* 그림자 */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-24 h-2 rounded-full bg-black/15 blur-sm" />
      
      {/* 상태 표시 */}
      <div className="absolute top-3 right-3">
        <div className={`badge badge-sm ${action === "study" ? "badge-primary" : "badge-neutral"}`}>
          {action === "study" ? "공부 중" : action === "workout" ? "운동 중" : "대기 중"}
        </div>
      </div>
    </div>
  )
}