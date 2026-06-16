import { Check, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import dashboardAtmosphere from '@/assets/generated/dashboard-atmosphere.webp'
import { fadeUp, softTransition, staggerContainer } from '@/animations/motion'
import { NeonButton } from '@/components/NeonButton'
import { actionTasks, continueRows, journeyStats, progressPoints, studyBars } from '@/data/dashboard'
import { useRequireAuth } from '@/hooks/useRequireAuth'

function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`glass-panel rounded-nexa p-7 ${className}`}>{children}</section>
}

function ProgressChart() {
  const points = progressPoints.map((point, index) => {
    const x = 20 + index * 78
    const y = 162 - point.value * 1.55
    return { ...point, x, y }
  })
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
  const areaPath = `${path} L ${points[points.length - 1].x} 170 L ${points[0].x} 170 Z`

  return (
    <div className="mt-3 h-[205px] w-full overflow-hidden">
      <svg viewBox="0 0 440 200" className="h-full w-full" role="img" aria-label="Evolução mensal do progresso">
        <defs>
          <linearGradient id="lineGradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#AE3CFF" />
            <stop offset="52%" stopColor="#F661FD" />
            <stop offset="100%" stopColor="#01A2ED" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#AE3CFF" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#AE3CFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#areaGradient)" />
        <motion.path
          d={path}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="5" fill="#AE3CFF" filter="drop-shadow(0 0 8px #AE3CFF)" />
            <text x={point.x - 10} y="194" fill="rgba(255,255,255,.66)" fontSize="13">
              {point.label}
            </text>
          </g>
        ))}
        <text x="310" y="44" fill="#fff" fontSize="15" fontWeight="700">
          67%
        </text>
      </svg>
    </div>
  )
}

function RingProgress() {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference * 0.5

  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(85,98,255,.16)" strokeWidth="12" />
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="url(#ringGradient)"
          strokeLinecap="round"
          strokeWidth="12"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="ringGradient" x1="0" x2="1">
            <stop stopColor="#AE3CFF" />
            <stop offset="1" stopColor="#F661FD" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">50%</span>
    </div>
  )
}

function StudyBars() {
  return (
    <div className="mt-5 flex h-40 items-end gap-7 border-t border-white/8 px-4 pt-4 max-sm:gap-4">
      {studyBars.map((bar) => (
        <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: bar.value * 6 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="w-full max-w-8 rounded-t-md bg-nexa-gradient-hot shadow-neon"
          />
          <span className="text-xs text-white/65">{bar.label}</span>
        </div>
      ))}
    </div>
  )
}

export function DashboardPage() {
  const requireAuth = useRequireAuth()

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-[minmax(0,1fr)_452px] gap-6 max-xl:grid-cols-1">
      <div className="space-y-6">
        <motion.div variants={fadeUp} transition={softTransition}>
          <Panel className="grid min-h-[286px] grid-cols-[240px_1fr] items-center gap-6 max-lg:grid-cols-1">
            <div>
              <h2 className="text-2xl font-bold text-white">Seu progresso geral</h2>
              <p className="mt-2 text-white/70">Você está no caminho certo!</p>
              <div className="mt-7 font-display text-[4.6rem] font-bold leading-none gradient-text">67%</div>
              <p className="mt-2 text-white/70">do seu plano concluído</p>
              <div className="mt-7 h-2.5 rounded-full bg-white/8">
                <div className="h-full w-[67%] rounded-full bg-nexa-gradient shadow-neon" />
              </div>
            </div>
            <ProgressChart />
          </Panel>
        </motion.div>

        <motion.div variants={fadeUp} transition={softTransition}>
          <h2 className="mb-4 text-2xl font-bold text-white">Resumo da sua jornada</h2>
          <div className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1">
            {journeyStats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -6 }}
                className="glass-panel rounded-lg p-6 transition hover:shadow-neon"
              >
                <p className="text-sm text-white/72">{stat.label}</p>
                <p className="mt-5 font-display text-5xl font-bold gradient-text">{stat.value}</p>
                <p className="mt-3 text-white/68">{stat.caption}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} transition={softTransition}>
          <Panel>
            <h2 className="mb-5 text-2xl font-bold text-white">Continue de onde parou</h2>
            <div className="space-y-4">
              {continueRows.map((row, index) => (
                <motion.div
                  key={row.title}
                  whileHover={{ x: 3 }}
                  className="grid grid-cols-[168px_1fr_auto] items-center gap-6 rounded-lg border border-white/8 bg-white/[0.025] p-3 max-md:grid-cols-1"
                >
                  <div
                    className="h-24 rounded-md bg-cover bg-center shadow-[0_0_30px_rgba(174,60,255,0.24)]"
                    style={{ backgroundImage: `url(${dashboardAtmosphere})`, backgroundPosition: index === 0 ? '15% 72%' : '18% 86%' }}
                  />
                  <div>
                    <h3 className="font-semibold text-white">{row.title}</h3>
                    <div className="mt-5 flex items-center gap-4">
                      <div className="h-2 flex-1 rounded-full bg-white/8">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${row.progress}%` }}
                          transition={{ duration: 0.9 }}
                          className="h-full rounded-full bg-nexa-gradient"
                        />
                      </div>
                      <span className="text-sm text-white/68">{row.caption}</span>
                    </div>
                  </div>
                  <NeonButton variant="ghost" className="min-w-[122px]" onClick={() => requireAuth()}>
                    {row.action}
                  </NeonButton>
                </motion.div>
              ))}
            </div>
          </Panel>
        </motion.div>
      </div>

      <div className="space-y-5">
        <motion.div variants={fadeUp} transition={softTransition}>
          <Panel>
            <p className="text-xl font-semibold text-nexa-violet">Próximo passo</p>
            <h2 className="mt-3 text-xl font-bold text-white">Continuar sua trilha de estudo</h2>
              <p className="mt-6 text-white/72">Tecnologia — Primeiros passos</p>
              <div className="mt-5 flex items-center gap-4">
                <div className="h-2.5 flex-1 rounded-full bg-white/8">
                <div className="h-full w-[32%] rounded-full bg-nexa-gradient shadow-neon" />
              </div>
              <span className="text-white/72">32%</span>
            </div>
            <NeonButton block className="mt-7 min-h-[58px]" onClick={() => requireAuth()}>
              Continuar estudando
            </NeonButton>
          </Panel>
        </motion.div>

        <motion.div variants={fadeUp} transition={softTransition}>
          <Panel>
            <p className="text-xl font-semibold text-nexa-violet">Seu plano de ação</p>
            <p className="mt-3 text-sm text-white/74">3 de 6 tarefas concluídas</p>
            <div className="mt-6 flex items-center gap-7 max-sm:flex-col">
              <RingProgress />
              <div className="space-y-3">
                {actionTasks.map((task) => (
                  <div key={task.label} className="flex items-center gap-3 text-sm text-white/72">
                    <span
                      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        task.done ? 'border-nexa-violet bg-nexa-gradient-hot text-white shadow-neon' : 'border-white/14 text-transparent'
                      }`}
                    >
                      {task.done && <Check className="h-3 w-3" />}
                    </span>
                    {task.label}
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </motion.div>

        <motion.div variants={fadeUp} transition={softTransition}>
          <Panel>
            <h2 className="text-xl font-semibold text-nexa-violet">Desempenho nos estudos</h2>
            <p className="mt-1 text-sm text-white/70">Horas de estudo por semana</p>
            <StudyBars />
          </Panel>
        </motion.div>

        <motion.div variants={fadeUp} transition={softTransition}>
          <Panel className="flex items-center gap-5">
            <Quote className="h-11 w-11 shrink-0 fill-nexa-violet text-nexa-violet" />
            <p className="text-xl leading-8 text-white/78">
              Cada passo que você dá hoje, constrói o <span className="text-nexa-pink">futuro</span> que você deseja.
            </p>
          </Panel>
        </motion.div>
      </div>
    </motion.div>
  )
}
