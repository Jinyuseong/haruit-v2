// apps/web/src/pages/SignUp.tsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const emailOk = (v:string) => /\S+@\S+\.\S+/.test(v)

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [agree, setAgree] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const nav = useNavigate()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim())    return setErr('이름을 입력해 주세요.')
    if (!emailOk(email)) return setErr('이메일 형식을 확인해 주세요.')
    if (pw.length < 8)   return setErr('비밀번호는 8자 이상이에요.')
    if (pw !== pw2)      return setErr('비밀번호가 서로 달라요.')
    if (!agree)          return setErr('약관에 동의해 주세요.')
    setErr(null)
    localStorage.setItem('loggedIn', '1')
    nav('/home')
  }

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form className="card-body" onSubmit={onSubmit}>
          <h2 className="card-title justify-center text-3xl">회원가입</h2>

          <label className="form-control">
            <span className="label-text">이름</span>
            <input className="input input-bordered" placeholder="버디"
                   value={name} onChange={(e)=>setName(e.target.value)} />
          </label>

          <label className="form-control">
            <span className="label-text">이메일</span>
            <input className="input input-bordered" placeholder="you@example.com"
                   value={email} onChange={(e)=>setEmail(e.target.value)} />
          </label>

          <label className="form-control">
            <span className="label-text">비밀번호</span>
            <input className="input input-bordered" type="password" placeholder="8자 이상"
                   value={pw} onChange={(e)=>setPw(e.target.value)} />
          </label>

          <label className="form-control">
            <span className="label-text">비밀번호 확인</span>
            <input className="input input-bordered" type="password" placeholder="다시 입력"
                   value={pw2} onChange={(e)=>setPw2(e.target.value)} />
          </label>

          <label className="label cursor-pointer justify-start gap-3 mt-1">
            <input type="checkbox" className="checkbox"
                   checked={agree} onChange={(e)=>setAgree(e.target.checked)} />
            <span className="label-text">이용약관에 동의합니다</span>
          </label>

          {err && <p className="text-error text-sm">{err}</p>}

          <div className="card-actions mt-2">
            <button className="btn btn-primary btn-block">가입하기</button>
          </div>

          <p className="text-center text-sm text-base-content/70 mt-2">
            이미 계정이 있나요? <Link to="/login" className="link link-primary">로그인</Link>
          </p>
        </form>
      </div>
    </div>
  )
}