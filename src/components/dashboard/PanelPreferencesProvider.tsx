import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  PanelPreferencesContext,
  panelPreferenceStorageKeys,
  type PanelFontSize,
  type PanelLayout,
  type PanelPreferencesContextValue,
  type PanelTheme,
  type PanelVisualTheme,
} from '@/hooks/usePanelPreferences'

function readTheme(): PanelTheme {
  if (typeof window === 'undefined') return 'dark'
  return window.localStorage.getItem(panelPreferenceStorageKeys.theme) === 'light' ? 'light' : 'dark'
}

function readContrast(): boolean {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(panelPreferenceStorageKeys.contrast) === 'true'
}

function readVisualTheme(): PanelVisualTheme {
  if (typeof window === 'undefined') return 'nexa'
  const stored = window.localStorage.getItem(panelPreferenceStorageKeys.visualTheme)
  return stored === 'galaxy' ||
    stored === 'aurora' ||
    stored === 'cyber-blue' ||
    stored === 'violet-premium' ||
    stored === 'minimal-neon' ||
    stored === 'emerald-tech' ||
    stored === 'solar-dark' ||
    stored === 'monochrome'
    ? stored
    : 'nexa'
}

function readPanelLayout(): PanelLayout {
  if (typeof window === 'undefined') return 'default'
  const stored = window.localStorage.getItem(panelPreferenceStorageKeys.layout)
  return stored === 'compact' || stored === 'comfortable' || stored === 'focus' || stored === 'default'
    ? stored
    : 'default'
}

function readFontSize(): PanelFontSize {
  if (typeof window === 'undefined') return 'default'
  const stored = window.localStorage.getItem(panelPreferenceStorageKeys.fontSize)
  return stored === 'medium' || stored === 'large' ? stored : 'default'
}

export function PanelPreferencesProvider({ children }: { children: ReactNode }) {
  const [panelTheme, setPanelTheme] = useState<PanelTheme>(readTheme)
  const [panelVisualTheme, setPanelVisualTheme] = useState<PanelVisualTheme>(readVisualTheme)
  const [panelLayout, setPanelLayout] = useState<PanelLayout>(readPanelLayout)
  const [highContrast, setHighContrast] = useState(readContrast)
  const [fontSize, setFontSize] = useState<PanelFontSize>(readFontSize)

  useEffect(() => {
    window.localStorage.setItem(panelPreferenceStorageKeys.theme, panelTheme)
  }, [panelTheme])

  useEffect(() => {
    window.localStorage.setItem(panelPreferenceStorageKeys.contrast, String(highContrast))
  }, [highContrast])

  useEffect(() => {
    window.localStorage.setItem(panelPreferenceStorageKeys.visualTheme, panelVisualTheme)
  }, [panelVisualTheme])

  useEffect(() => {
    window.localStorage.setItem(panelPreferenceStorageKeys.layout, panelLayout)
  }, [panelLayout])

  useEffect(() => {
    window.localStorage.setItem(panelPreferenceStorageKeys.fontSize, fontSize)
  }, [fontSize])

  const value = useMemo<PanelPreferencesContextValue>(
    () => ({
      panelTheme,
      setPanelTheme,
      panelVisualTheme,
      setPanelVisualTheme,
      panelLayout,
      setPanelLayout,
      highContrast,
      setHighContrast,
      fontSize,
      setFontSize,
    }),
    [fontSize, highContrast, panelLayout, panelTheme, panelVisualTheme],
  )

  return <PanelPreferencesContext.Provider value={value}>{children}</PanelPreferencesContext.Provider>
}
