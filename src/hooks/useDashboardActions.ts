import { useOutletContext } from 'react-router-dom'

export type DashboardDemoAction = {
  title: string
  description?: string
  variant?: 'default' | 'trail'
}

export type DashboardActionsContext = {
  requestLogout: () => void
  openDemoAction: (action: DashboardDemoAction | string) => void
}

export function useDashboardActions() {
  return useOutletContext<DashboardActionsContext>()
}
