import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  PanelPreferencesContext,
  panelPreferenceStorageKeys,
  type PanelFontSize,
  type PanelPreferencesContextValue,
  type PanelTheme,
} from '@/hooks/usePanelPreferences'

function readTheme(): PanelTheme {
  if (typeof window === 'undefined') return 'dark'
  return window.localStorage.getItem(panelPreferenceStorageKeys.theme) === 'light' ? 'light' : 'dark'
}

function readContrast(): boolean {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(panelPreferenceStorageKeys.contrast) === 'true'
}

function readFontSize(): PanelFontSize {
  if (typeof window === 'undefined') return 'default'
  const stored = window.localStorage.getItem(panelPreferenceStorageKeys.fontSize)
  return stored === 'medium' || stored === 'large' ? stored : 'default'
}

export function PanelPreferencesProvider({ children }: { children: ReactNode }) {
  const [panelTheme, setPanelTheme] = useState<PanelTheme>(readTheme)
  const [highContrast, setHighContrast] = useState(readContrast)
  const [fontSize, setFontSize] = useState<PanelFontSize>(readFontSize)

  useEffect(() => {
    window.localStorage.setItem(panelPreferenceStorageKeys.theme, panelTheme)
  }, [panelTheme])

  useEffect(() => {
    window.localStorage.setItem(panelPreferenceStorageKeys.contrast, String(highContrast))
  }, [highContrast])

  useEffect(() => {
    window.localStorage.setItem(panelPreferenceStorageKeys.fontSize, fontSize)
  }, [fontSize])

  const value = useMemo<PanelPreferencesContextValue>(
    () => ({
      panelTheme,
      setPanelTheme,
      highContrast,
      setHighContrast,
      fontSize,
      setFontSize,
    }),
    [fontSize, highContrast, panelTheme],
  )

  return <PanelPreferencesContext.Provider value={value}>{children}</PanelPreferencesContext.Provider>
}
