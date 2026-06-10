import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export const authenticationRequiredMessage = 'Crie uma conta ou faça login para salvar sua jornada.'

export function useRequireAuth() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  return useCallback(
    (callback?: () => void) => {
      if (isAuthenticated) {
        callback?.()
        return true
      }

      navigate('/login', {
        state: {
          from: `${location.pathname}${location.search}${location.hash}`,
          message: authenticationRequiredMessage,
        },
      })
      return false
    },
    [isAuthenticated, location.hash, location.pathname, location.search, navigate],
  )
}

