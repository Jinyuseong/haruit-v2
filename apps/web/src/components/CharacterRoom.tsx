// src/components/CharacterRoom.tsx
type Action = "idle" | "study" | "workout"
type Equipped = { bg?: string; decoLeft?: string; decoRight?: string }

export default function CharacterRoom({
  action,
  equipped,
}: { action: Action; equipped?: Equipped }) {
  // 이미지 경로가 하나도 없으면 플레이스홀더 모드로
  const noImages =
    !equipped?.bg && !equipped?.decoLeft && !equipped?.decoRight

  if (noImages) {
    const emoji = action === "study" ? "📖" : action === "workout" ? "🏃‍♂️" : "🙂"
    return (
      <div className="relative w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-xl
                      bg-gradient-to-br from-base-100 to-base-200 grid place-items-center">
        <div className="absolute top-4 left-4 badge">플레이스홀더</div>
        <div className="text-7xl md:text-8xl drop-shadow">{emoji}</div>
        <div className="absolute bottom-4 text-sm opacity-60">
          이미지 없이도 미리보기 중
        </div>
      </div>
    )
  }

  // ✅ 이미지가 있을 때 렌더
  const charSrc =
    action === "study"
      ? "/room/char_study.gif"
      : action === "workout"
      ? "/room/char_workout.gif"
      : "/room/char_idle.png"

  const bgSrc    = equipped?.bg       || "/room/bg_default.png"
  const leftSrc  = equipped?.decoLeft || "/room/deco_plant.png"
  const rightSrc = equipped?.decoRight|| "/room/deco_shelf.png"

  return (
    <div className="relative w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-xl bg-base-100">
      <img src={bgSrc}    alt="bg"    className="absolute inset-0 w-full h-full object-cover" />
      {leftSrc  && <img src={leftSrc}  alt="left"  className="absolute left-4 bottom-6 w-24 md:w-28 opacity-95" />}
      {rightSrc && <img src={rightSrc} alt="right" className="absolute right-4 bottom-6 w-28 md:w-32 opacity-95" />}

      <div className="absolute inset-0 grid place-items-end">
        <img src={charSrc} alt={action} className="w-36 md:w-44 mb-4 drop-shadow-[0_8px_18px_rgba(2,6,23,0.25)]" />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-3 w-40 h-4 rounded-full bg-black/15 blur-sm" />
    </div>
  )
}