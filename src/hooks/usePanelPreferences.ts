import { createContext, useContext } from 'react'

export type PanelTheme = 'dark' | 'light'
export type PanelFontSize = 'default' | 'medium' | 'large'

export type PanelPreferencesContextValue = {
  panelTheme: PanelTheme
  setPanelTheme: (theme: PanelTheme) => void
  highContrast: boolean
  setHighContrast: (enabled: boolean) => void
  fontSize: PanelFontSize
  setFontSize: (size: PanelFontSize) => void
}

export const PanelPreferencesContext = createContext<PanelPreferencesContextValue | null>(null)

export const panelPreferenceStorageKeys = {
  theme: 'nexa-panel-theme',
  contrast: 'nexa-panel-high-contrast',
  fontSize: 'nexa-panel-font-size',
} as const

export function usePanelPreferences() {
  const context = useContext(PanelPreferencesContext)

  if (!context) {
    throw new Error('usePanelPreferences must be used within PanelPreferencesProvider')
  }

  return context
}
