import { useEffect, useMemo, useState } from "react"
import CharacterRoom from "../components/CharacterRoom"
import { CheckCircle, Circle, Play, Pause, Edit2, X } from "lucide-react"

interface Task {
  id: string
  title: string
  completed: boolean
  category: 'study' | 'workout' | 'daily'
  estimatedTime: number // 분 단위
}

export default function Home() {
  const name = useMemo(() => localStorage.getItem("name") || "버디", [])
  const [coins, setCoins] = useState(Number(localStorage.getItem("coins") || 0))
  const [streak] = useState(3)
  
  // 할일 편집 상태
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState("")
  
  // 기본 할일 목록
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: '아침 공부 25분', completed: false, category: 'study', estimatedTime: 25 },
    { id: '2', title: '운동 30분', completed: false, category: 'workout', estimatedTime: 30 },
    { id: '3', title: '독서 15분', completed: false, category: 'daily', estimatedTime: 15 },
    { id: '4', title: '일기 쓰기', completed: false, category: 'daily', estimatedTime: 10 },
  ])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "app")
    // localStorage에서 저장된 할일 불러오기
    const savedTasks = localStorage.getItem("home-tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  // 할일 완료 상태 변경
  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
    localStorage.setItem("home-tasks", JSON.stringify(updatedTasks))
    
    // 완료 시 코인 지급
    const task = tasks.find(t => t.id === taskId)
    if (task && !task.completed) {
      const reward = Math.floor(task.estimatedTime / 5) + 1 // 5분당 1코인 + 기본 1코인
      setCoins(prev => {
        const newCoins = prev + reward
        localStorage.setItem("coins", String(newCoins))
        return newCoins
      })
    }
  }

  // 할일 추가
  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: '',
      completed: false,
      category: 'daily',
      estimatedTime: 15
    }
    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    localStorage.setItem("home-tasks", JSON.stringify(updatedTasks))
    
    // 바로 편집 모드로 전환
    setEditingTask(newTask.id)
    setEditingTitle('')
  }

  // 할일 삭제
  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId)
    setTasks(updatedTasks)
    localStorage.setItem("home-tasks", JSON.stringify(updatedTasks))
  }

  // 할일 편집 시작
  const startEditing = (task: Task) => {
    setEditingTask(task.id)
    setEditingTitle(task.title)
  }

  // 할일 편집 완료
  const saveEdit = (taskId: string) => {
    if (editingTitle.trim()) {
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, title: editingTitle.trim() } : task
      )
      setTasks(updatedTasks)
      localStorage.setItem("home-tasks", JSON.stringify(updatedTasks))
    }
    setEditingTask(null)
    setEditingTitle("")
  }

  // 할일 편집 취소
  const cancelEdit = () => {
    setEditingTask(null)
    setEditingTitle("")
  }

  const completedCount = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length

  return (
    <div className="space-y-6">
      {/* 캐릭터룸 */}
      <div className="pt-2">
        <CharacterRoom 
          action="idle" 
          equipped={{
            bg: "default",
            deco: "plant",
          }} 
        />
      </div>

      {/* 환영 메시지 */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-6 items-center text-center">
          <h2 className="card-title text-2xl mb-3">환영합니다, {name}! 🎉</h2>
          <p className="opacity-70 mb-4">오늘도 한 걸음. 꾸준함은 힘 💪</p>
          <div className="flex gap-3 mb-4">
            <div className="badge badge-primary badge-lg">코인 {coins}</div>
            <div className="badge badge-secondary badge-lg">연속 {streak}일</div>
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">오늘 진행률</span>
              <span className="text-sm text-primary font-bold">{completedCount}/{totalTasks}</span>
            </div>
            <progress 
              className="progress progress-primary w-full h-3" 
              value={totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0} 
              max="100" 
            />
          </div>
        </div>
      </div>

      {/* 할일 체크리스트 */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="card-title text-xl">오늘의 루틴</h3>
            <button 
              className="btn btn-primary btn-sm" 
              onClick={addTask}
            >
              + 할일 추가
            </button>
          </div>
          
          <div className="space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  task.completed 
                    ? 'bg-base-200 border-success/20' 
                    : 'bg-base-50 border-base-300'
                }`}
              >
                {/* 체크박스 */}
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex-shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle className="w-6 h-6 text-success" />
                  ) : (
                    <Circle className="w-6 h-6 text-base-content/40" />
                  )}
                </button>

                {/* 할일 내용 */}
                <div className="flex-1 min-w-0">
                  {editingTask === task.id ? (
                    // 편집 모드
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="input input-bordered input-sm flex-1"
                        placeholder="할일을 입력하세요"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit(task.id)
                          if (e.key === 'Escape') cancelEdit()
                        }}
                      />
                      <button
                        onClick={() => saveEdit(task.id)}
                        className="btn btn-success btn-xs"
                      >
                        저장
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="btn btn-ghost btn-xs"
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    // 표시 모드
                    <>
                      <div className={`font-medium ${task.completed ? 'line-through text-base-content/60' : ''}`}>
                        {task.title || '할일을 입력하세요'}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`badge badge-sm ${
                          task.category === 'study' ? 'badge-primary' :
                          task.category === 'workout' ? 'badge-secondary' :
                          'badge-neutral'
                        }`}>
                          {task.category === 'study' ? '📚' : 
                           task.category === 'workout' ? '🏃‍♂️' : '📝'}
                          {task.category === 'study' ? '공부' : 
                           task.category === 'workout' ? '운동' : '일상'}
                        </span>
                        <span className="text-xs text-base-content/60">
                          예상 {task.estimatedTime}분
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* 편집/삭제 버튼 */}
                <div className="flex gap-1">
                  {editingTask !== task.id && (
                    <button
                      onClick={() => startEditing(task)}
                      className="btn btn-ghost btn-xs"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="btn btn-ghost btn-xs text-error"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {tasks.length === 0 && (
            <div className="text-center py-8 text-base-content/60">
              <p>아직 할일이 없습니다.</p>
              <p className="text-sm">+ 할일 추가 버튼을 눌러보세요!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}