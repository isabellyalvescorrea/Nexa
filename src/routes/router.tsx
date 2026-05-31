import { createBrowserRouter } from 'react-router-dom'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { AboutPage } from '@/pages/AboutPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'
import { ToolsPage } from '@/pages/ToolsPage'

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/sobre', element: <AboutPage /> },
  { path: '/ferramentas', element: <ToolsPage /> },
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
