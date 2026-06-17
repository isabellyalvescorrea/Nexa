import { createBrowserRouter, Navigate } from 'react-router-dom'
import { GuestOnlyRoute } from '@/components/GuestOnlyRoute'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import {
  ActionPlanPage,
  CompatibleAreasPage,
  LayoutsPage,
  MentorPage,
  MissionsPage,
  ProfessionsPage,
  ProfileTestPage,
  RecommendedResourcesPage,
  SettingsPage,
  SkillMapPage,
  StudyTrailsPage,
  ThemesPage,
} from '@/pages/dashboard'
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
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'teste-perfil', element: <ProfileTestPage /> },
      { path: 'areas-compativeis', element: <CompatibleAreasPage /> },
      { path: 'trilhas-de-estudo', element: <StudyTrailsPage /> },
      { path: 'plano-de-acao', element: <ActionPlanPage /> },
      { path: 'recursos-recomendados', element: <RecommendedResourcesPage /> },
      { path: 'desafios-e-missoes', element: <MissionsPage /> },
      { path: 'explorar-profissoes', element: <ProfessionsPage /> },
      { path: 'mentor-ia', element: <MentorPage /> },
      { path: 'mapa-de-habilidades', element: <SkillMapPage /> },
      { path: 'configuracoes', element: <SettingsPage /> },
      { path: 'configuracoes/temas', element: <ThemesPage /> },
      { path: 'configuracoes/layouts', element: <LayoutsPage /> },
    ],
  },
  { path: '*', element: <LandingPage /> },
])
