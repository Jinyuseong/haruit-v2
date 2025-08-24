import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function AuthGuard() {
  const location = useLocation()
  const loggedIn = localStorage.getItem("loggedIn") === "1"

  // 로그인 안 된 상태면 /login 으로 리다이렉트
  if (!loggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  // 통과하면 자식 라우트 보여줌
  return <Outlet />
}