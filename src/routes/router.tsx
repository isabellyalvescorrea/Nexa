import { createBrowserRouter, Navigate } from 'react-router-dom'
import { GuestOnlyRoute } from '@/components/GuestOnlyRoute'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/sobre', element: <Navigate to="/#sobre" replace /> },
  { path: '/ferramentas', element: <Navigate to="/#ferramentas" replace /> },
  {
    path: '/login',
    element: (
      <GuestOnlyRoute>
        <LoginPage />
      </GuestOnlyRoute>
    ),
  },
  {
    path: '/cadastro',
    element: (
      <GuestOnlyRoute>
        <SignupPage />
      </GuestOnlyRoute>
    ),
  },
  {
    path: '/painel',
    element: (
      <DashboardLayout>
        <DashboardPage />
      </DashboardLayout>
    ),
  },
  { path: '*', element: <LandingPage /> },
])
