import type { PropsWithChildren } from 'react'

export function GradientText({ children }: PropsWithChildren) {
  return <span className="gradient-text">{children}</span>
}
