import { useLocation, useNavigate, Link } from "react-router-dom"
import { useState } from "react"

export default function Login() {
  const nav = useNavigate()
  const location = useLocation()
  const from = (location.state as any)?.from?.pathname || "/"  // 원래 가려던 곳

  const [email, setEmail] = useState("")
  const [pw, setPw] = useState("")

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 실제 인증 붙이기 전, 임시 통과
    localStorage.setItem("loggedIn", "1")
    localStorage.setItem("name", email.split("@")[0] || "버디")
    nav(from, { replace: true })
  }

  return (
    <div className="max-w-md mx-auto card bg-base-100 shadow-xl">
      <form className="card-body" onSubmit={onSubmit}>
        <h2 className="card-title">로그인</h2>
        <input className="input input-bordered" placeholder="이메일" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input input-bordered" placeholder="비밀번호" type="password" value={pw} onChange={e=>setPw(e.target.value)} />
        <button className="btn btn-primary mt-2" type="submit">로그인</button>
        <div className="text-sm mt-2">
          계정이 없나요? <Link to="/signup" className="link">회원가입</Link>
        </div>
      </form>
    </div>
  )
}