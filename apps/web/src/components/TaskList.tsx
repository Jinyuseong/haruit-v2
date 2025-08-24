import { useEffect, useState } from "react"

type Task = { id: string; text: string; done: boolean }

export default function TaskList({
  storageKey,
  placeholder = "할 일을 입력하고 Enter",
  defaultTasks = [] as string[],
}: {
  storageKey: string
  placeholder?: string
  defaultTasks?: string[]
}) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState("")

  // 초기 로드 (없으면 기본값 생성)
  useEffect(() => {
    const raw = localStorage.getItem(storageKey)
    if (raw) {
      setTasks(JSON.parse(raw))
    } else if (defaultTasks.length) {
      const init = defaultTasks.map((t) => ({ id: crypto.randomUUID(), text: t, done: false }))
      setTasks(init)
      localStorage.setItem(storageKey, JSON.stringify(init))
    }
  }, [storageKey, defaultTasks])

  // 저장
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks))
  }, [tasks, storageKey])

  const addTask = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTasks((prev) => [{ id: crypto.randomUUID(), text: trimmed, done: false }, ...prev])
    setInput("")
  }

  const toggle = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const remove = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id))

  return (
    <div className="space-y-3">
      <div className="join w-full">
        <input
          className="input input-bordered join-item w-full"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask(input)}
        />
        <button className="btn btn-primary join-item" onClick={() => addTask(input)}>추가</button>
      </div>

      <ul className="menu bg-base-100 rounded-box shadow">
        {tasks.length === 0 && <li className="p-3 text-base-content/60">아직 할 일이 없어요.</li>}
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center gap-3">
            <label className="label cursor-pointer flex-1">
              <input type="checkbox" className="checkbox mr-3" checked={t.done} onChange={() => toggle(t.id)} />
              <span className={t.done ? "line-through opacity-60" : ""}>{t.text}</span>
            </label>
            <button className="btn btn-ghost btn-xs" onClick={() => remove(t.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  )
}