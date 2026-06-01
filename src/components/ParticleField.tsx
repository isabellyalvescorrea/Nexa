import { useEffect, useRef } from 'react'
import { cn } from '@/utils/cn'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  phase: number
  color: string
  depth: number
}

type ParticleFieldProps = {
  density?: 'low' | 'medium' | 'high'
  motion?: 'subtle' | 'cinematic'
  className?: string
}

const colors = ['#01A2ED', '#5562FF', '#5F3BFF', '#AE3CFF', '#F661FD']

export function ParticleField({ density = 'medium', motion = 'subtle', className }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const particleArea =
      density === 'high' ? (motion === 'cinematic' ? 2900 : 13000) : density === 'medium' ? 18000 : 26000
    const maxParticles = density === 'high' ? (motion === 'cinematic' ? 340 : 95) : density === 'medium' ? 68 : 42
    let particles: Particle[] = []
    let animationFrame = 0
    let width = 0
    let height = 0
    let dpr = 1

    const createParticle = (): Particle => {
      if (motion === 'subtle') {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.16,
          radius: 0.8 + Math.random() * 2.6,
          alpha: 0.18 + Math.random() * 0.56,
          phase: Math.random() * Math.PI * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          depth: 1,
        }
      }

      const depth = 0.48 + Math.random() * 1.12
      const direction = Math.random()
      const speed = 0.36 + Math.random() * 0.92
      const prominence = Math.random()
      const sizeMultiplier = prominence > 0.97 ? 1.32 : prominence > 0.82 ? 1.18 : 1
      const alphaBonus = prominence > 0.97 ? 0.07 : prominence > 0.82 ? 0.04 : 0
      const vx =
        direction < 0.28
          ? (0.18 + Math.random() * 0.48) * speed * depth
          : direction < 0.56
            ? -(0.16 + Math.random() * 0.44) * speed * depth
            : (Math.random() - 0.48) * speed * depth
      const vy =
        direction < 0.42
          ? -(0.34 + Math.random() * 0.54) * speed * depth
          : direction < 0.68
            ? (0.12 + Math.random() * 0.34) * speed * depth
            : (Math.random() - 0.46) * speed * (0.28 + depth * 0.34)

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        radius: (0.56 + Math.random() * 1.68) * depth * sizeMultiplier,
        alpha: Math.min(0.72, 0.21 + Math.random() * 0.44 + alphaBonus),
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        depth,
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      const targetCount = Math.min(maxParticles, Math.max(24, Math.floor((width * height) / particleArea)))
      particles = Array.from({ length: targetCount }, createParticle)
    }

    const drawParticle = (particle: Particle, time: number) => {
      const driftMultiplier = motion === 'cinematic' ? 6 : 4
      const driftX = (mouse.current.x - 0.5) * particle.radius * driftMultiplier * particle.depth
      const driftY = (mouse.current.y - 0.5) * particle.radius * driftMultiplier * particle.depth
      const pulse = 0.72 + Math.sin(time * 0.0018 + particle.phase) * 0.28
      const x = particle.x + driftX
      const y = particle.y + driftY

      const glowRadius = particle.radius * (motion === 'cinematic' ? 3.15 : 7)
      const gradient = context.createRadialGradient(x, y, 0, x, y, glowRadius)
      gradient.addColorStop(0, `${particle.color}${Math.floor(particle.alpha * pulse * 255).toString(16).padStart(2, '0')}`)
      gradient.addColorStop(1, `${particle.color}00`)

      context.fillStyle = gradient
      context.beginPath()
      context.arc(x, y, glowRadius, 0, Math.PI * 2)
      context.fill()

      context.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`
      context.beginPath()
      context.arc(x, y, particle.radius, 0, Math.PI * 2)
      context.fill()
    }

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const first = particles[i]
          const second = particles[j]
          const distance = Math.hypot(first.x - second.x, first.y - second.y)
          const maxDistance = motion === 'cinematic' ? 96 : 135
          if (distance < maxDistance) {
            context.strokeStyle = `rgba(174, 60, 255, ${(1 - distance / maxDistance) * (motion === 'cinematic' ? 0.045 : 0.12)})`
            context.lineWidth = motion === 'cinematic' ? 0.42 : 0.7
            context.beginPath()
            context.moveTo(first.x, first.y)
            context.lineTo(second.x, second.y)
            context.stroke()
          }
        }
      }
    }

    const render = (time: number) => {
      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'lighter'

      drawConnections()
      particles.forEach((particle) => {
        if (!reducedMotion) {
          particle.x += particle.vx
          particle.y += particle.vy
          if (particle.x < -24) particle.x = width + 24
          if (particle.x > width + 24) particle.x = -24
          if (particle.y < -24) particle.y = height + 24
          if (particle.y > height + 24) particle.y = -24
        }
        drawParticle(particle, time)
      })

      context.globalCompositeOperation = 'source-over'
      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(render)
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      }
    }

    resize()
    render(0)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [density, motion])

  return <canvas ref={canvasRef} aria-hidden="true" className={cn('pointer-events-none absolute inset-0 h-full w-full', className)} />
}
