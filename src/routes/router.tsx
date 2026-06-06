import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/sobre', element: <Navigate to="/#sobre" replace /> },
  { path: '/ferramentas', element: <Navigate to="/#ferramentas" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/cadastro', element: <SignupPage /> },
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
