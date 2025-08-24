import { useNavigate } from 'react-router-dom'

export default function App() {
  const nav = useNavigate()
  return (
    <div className="min-h-screen grid place-items-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h1 className="card-title text-3xl">하루잇</h1>
          <p className="text-base-content/70">하루 하나, 꾸준함을 키우자</p>

          <div className="card-actions mt-4 w-full">
            <button className="btn btn-primary btn-block" onClick={() => nav('/login')}>
              로그인
            </button>
            <button className="btn btn-outline btn-block" onClick={() => nav('/signup')}>
              회원가입
            </button>
            <button className="btn btn-primary">파란 버튼?</button>
          </div>
        </div>
      </div>
    </div>
  )
}