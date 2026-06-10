import type { AuthError } from '@supabase/supabase-js'

const messagesByCode: Record<string, string> = {
  invalid_credentials: 'E-mail ou senha inválidos.',
  email_not_confirmed: 'Confirme seu e-mail antes de entrar.',
  user_already_exists: 'Já existe uma conta com este e-mail.',
  email_exists: 'Já existe uma conta com este e-mail.',
  weak_password: 'A senha precisa ter pelo menos 6 caracteres.',
  signup_disabled: 'Novos cadastros estão temporariamente desabilitados.',
  over_request_rate_limit: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
  over_email_send_rate_limit: 'O limite temporário de e-mails foi atingido. Aguarde alguns minutos e tente novamente.',
  provider_disabled: 'O login com Google ainda não foi ativado.',
  validation_failed: 'Revise os dados informados e tente novamente.',
}

export function getAuthErrorMessage(error: AuthError | null | undefined, fallback: string) {
  if (!error) return fallback
  if (error.code && messagesByCode[error.code]) return messagesByCode[error.code]

  const message = error.message.toLowerCase()

  if (message.includes('invalid login credentials')) return messagesByCode.invalid_credentials
  if (message.includes('email not confirmed')) return messagesByCode.email_not_confirmed
  if (message.includes('already registered') || message.includes('already exists')) return messagesByCode.user_already_exists
  if (message.includes('provider is not enabled')) return messagesByCode.provider_disabled
  if (message.includes('password')) return messagesByCode.weak_password

  return fallback
}
