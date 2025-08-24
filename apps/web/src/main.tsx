import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import AuthGuard from './routes/AuthGuard'
import './index.css'

import Home from './pages/Home'
import Study from './pages/Study'
import Workout from './pages/Workout'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Shop from './pages/Shop'

const router = createBrowserRouter([
  // 공개 라우트
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },

  // 보호 라우트
  { element: <AuthGuard />, children: [
    { path: '/', element: <RootLayout />, children: [
      { index: true, element: <Home /> },
      { path: 'study', element: <Study /> },
      { path: 'workout', element: <Workout /> },
      { path: 'shop', element: <Shop /> },          // ✅ 상점
      { path: 'home', element: <Navigate to="/" replace /> },
    ]},
  ]},
])

  // (선택) 404
  // { path: '*', element: <NotFound /> },


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)