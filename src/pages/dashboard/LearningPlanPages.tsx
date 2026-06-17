import {
  BarChart3,
  CalendarDays,
  Check,
  Clock3,
  Code2,
  Compass,
  FileText,
  Flag,
  Gauge,
  Layers3,
  MoreHorizontal,
  PenTool,
  Play,
  Sparkles,
  Target,
  Trash2,
} from 'lucide-react'
import {
  DashPanel,
  DashboardButton,
  DashboardPageHeader,
  dashboardTitleGradient,
  IconTile,
  ProgressBar,
  SectionTitle,
  StatChip,
} from '@/components/dashboard/DashboardPrimitives'
import { useDashboardActions } from '@/hooks/useDashboardActions'

const trailPhases = [
  { number: '01', title: 'Primeiro contato', active: true },
  { number: '02', title: 'Fundamentos' },
  { number: '03', title: 'Prática' },
  { number: '04', title: 'Avançado' },
]

const playlistItems = [
  { title: 'Introdução à lógica', time: '08:45', tone: 'pink' },
  { title: 'Como funciona a programação', time: '12:30', tone: 'blue' },
  { title: 'Primeiros conceitos', time: '09:15', tone: 'cyan' },
]

const aiLessons = [
  { number: '01', title: 'Visão geral da área', text: 'Entenda de que o universo é feito e por que importa.' },
  { number: '02', title: 'Conceitos essenciais', text: 'Os princípios centrais para começar com segurança.' },
  { number: '03', title: 'Glossário inicial', text: 'Termos-chave que todo iniciante deve conhecer.' },
]

const practicalExercises = [
  { number: '01', title: 'Questões rápidas', text: 'Teste seus conhecimentos iniciais.' },
  { number: '02', title: 'Mini desafio', text: 'Desafio prático para fixar o conteúdo.' },
  { number: '03', title: 'Reflexão guiada', text: 'Pense, conecte o que aprendeu no seu contexto.' },
]

const addedTrails = [
  { title: 'Tecnologia — Primeiros passos', status: 'Em andamento', progress: 32, icon: Code2, color: 'pink' as const },
  { title: 'Design e Criatividade — Introdução', status: 'Em andamento', progress: 45, icon: PenTool, color: 'pink' as const },
  { title: 'Negócios e Gestão — Exploração inicial', status: 'Não iniciada', progress: 0, icon: BarChart3, color: 'blue' as const },
]

const rhythmMetrics = [
  { label: 'Tempo de estudo esta semana', value: '4h 22m', icon: Clock3 },
  { label: 'Módulos concluídos', value: '5', icon: Layers3 },
  { label: 'Consistência', value: '6 dias', caption: 'Sequência atual', icon: CalendarDays },
]

const planDefinition = [
  { title: 'Prioridade atual', text: 'Começar pela base e ganhar familiaridade com a área', icon: Target },
  { title: 'Área de foco', text: 'Tecnologia e raciocínio lógico', icon: Compass },
  { title: 'Rotina sugerida', text: 'Estudo leve e consistente ao longo da semana', icon: CalendarDays },
  { title: 'Ritmo recomendado', text: 'Equilibrado, com avanço progressivo', icon: Gauge },
]

const planStructure = [
  { title: '1. Objetivo definido', text: 'Seu objetivo principal foi estabelecido.' },
  { title: '2. Área foco escolhida', text: 'A área de foco foi definida com base nas suas respostas.' },
  { title: '3. Rotina organizada', text: 'Sua rotina semanal foi ajustada ao seu ritmo e disponibilidade.' },
  { title: '4. Direção inicial gerada', text: 'Seu plano foi estruturado e está pronto para te guiar.' },
]

export function StudyTrailsPage() {
  const { openDemoAction } = useDashboardActions()
  const openTrailDemo = () => openDemoAction({ title: 'Continuar trilha', variant: 'trail' })
  const openDemo = (title: string) => openDemoAction(title)

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Trilhas de estudo"
        title={<span className={dashboardTitleGradient}>Sua jornada de aprendizado</span>}
        description="As trilhas aparecem com base nas áreas que você adiciona em Áreas compatíveis. Você tem total controle para escolher o que deseja estudar e avançar no seu ritmo."
      />

      <div className="grid grid-cols-[minmax(0,1fr)_300px] gap-5 max-2xl:grid-cols-1">
        <div className="space-y-5">
          <DashPanel accent className="dashboard-primary-panel">
            <div className="grid grid-cols-[minmax(0,0.86fr)_minmax(440px,1.14fr)] gap-6 max-xl:grid-cols-1">
              <div className="min-w-0">
                <StatChip>Em andamento</StatChip>
                <h2 className="mt-4 max-w-[640px] text-[clamp(1.45rem,1.85vw,2rem)] font-bold leading-tight text-white">Tecnologia — Primeiros passos</h2>
                <div className="mt-7 grid grid-cols-[1fr_auto] items-center gap-5">
                  <ProgressBar value={32} className="h-3" />
                  <strong className="font-display text-2xl text-white">32%</strong>
                </div>
                <p className="mt-5 text-sm leading-6 text-white/66">
                  Esta trilha foi adicionada por você com base nas suas áreas de interesse.
                </p>
              </div>

              <div className="min-w-0 space-y-5">
                <div className="grid grid-cols-[repeat(4,minmax(112px,1fr))] items-stretch gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                  {trailPhases.map((phase, index) => (
                    <div key={phase.title} className="relative">
                      {index > 0 && <span className="absolute -left-4 top-1/2 hidden w-4 border-t border-dotted border-[#AE3CFF]/60 md:block" />}
                      <div className={phase.active ? 'flex min-h-[104px] flex-col rounded-lg border border-[#AE3CFF]/70 bg-[#11103a]/72 p-3.5 shadow-neon' : 'flex min-h-[104px] flex-col rounded-lg border border-white/10 bg-white/[0.018] p-3.5'}>
                        <p className="text-xs text-white/70">{phase.number}</p>
                        <h3 className="mt-auto text-sm font-semibold leading-snug text-white sm:text-base">{phase.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,.85fr)_minmax(0,.9fr)] gap-3 max-md:grid-cols-1">
                  <DashboardButton variant="primary" className="w-full px-4" onClick={openTrailDemo}>Continuar trilha</DashboardButton>
                  <DashboardButton className="w-full px-4" onClick={() => openDemo('Ver detalhes')} icon={false}>Ver detalhes</DashboardButton>
                  <DashboardButton variant="danger" className="w-full px-4" onClick={() => openDemo('Excluir trilha')} icon={false}>
                    <Trash2 className="h-4 w-4" />
                    Excluir trilha
                  </DashboardButton>
                </div>
              </div>
            </div>
          </DashPanel>

          <div className="grid grid-cols-3 items-stretch gap-4 max-lg:grid-cols-1">
            <DashPanel className="flex h-full min-h-[344px] flex-col">
              <SectionTitle>Playlist recomendada</SectionTitle>
              <p className="mb-4 text-sm leading-6 text-white/65">Nossa IA selecionou uma playlist do YouTube para o seu primeiro contato com a área.</p>
              <div className="flex-1 space-y-2">
                {playlistItems.map((item, index) => (
                  <div key={item.title} className="grid grid-cols-[82px_1fr] items-center gap-3 rounded-lg border border-white/8 bg-white/[0.018] p-2">
                    <VideoThumb tone={item.tone} active={index === 0} />
                    <div className="min-w-0">
                      <h3 className="font-semibold leading-snug text-white">{item.title}</h3>
                      <p className="mt-1 text-xs text-white/58">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <DashboardButton className="mt-auto w-full" onClick={() => openDemo('Abrir playlist no YouTube')}>Abrir playlist no YouTube</DashboardButton>
            </DashPanel>

            <LearningCard title="Aulas da IA" description="Módulos em texto gerados pela IA para você aprender os fundamentos da área." items={aiLessons} action="Ver todas as aulas" />
            <LearningCard title="Exercícios práticos" description="Pratique o que aprendeu com atividades pensadas para o seu estágio atual." items={practicalExercises} action="Ver todos os exercícios" />
          </div>

          <div>
            <SectionTitle>Suas trilhas adicionadas</SectionTitle>
            <p className="mb-3 text-sm text-white/58">Trilhas escolhidas por você. Avance no seu ritmo e retome de onde parou.</p>
            <div className="grid grid-cols-3 items-stretch gap-4 max-lg:grid-cols-1">
              {addedTrails.map((trail) => (
                <TrailMiniCard key={trail.title} trail={trail} onProtectedAction={() => openDemo(`Abrir trilha: ${trail.title}`)} />
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-white/45">Você adiciona e remove trilhas quando quiser. O controle é sempre seu.</p>
          </div>
        </div>

        <aside className="space-y-5">
          <DashPanel>
            <SectionTitle>Próximo passo</SectionTitle>
            <p className="text-sm leading-6 text-white/66">
              Assista à próxima aula da playlist recomendada e continue evoluindo. “Visão geral da área” nas Aulas da IA.
            </p>
            <DashboardButton className="mt-5 w-full" onClick={openTrailDemo}>Ir para próximo passo</DashboardButton>
          </DashPanel>
          <DashPanel>
            <SectionTitle>Seu ritmo</SectionTitle>
            <div className="space-y-3">
              {rhythmMetrics.map((metric) => <RhythmMetric key={metric.label} {...metric} />)}
            </div>
          </DashPanel>
          <DashPanel>
            <SectionTitle>Adicionar nova trilha</SectionTitle>
            <p className="text-sm leading-6 text-white/66">Explore novas áreas e monte trilhas personalizadas com base nas suas áreas compatíveis.</p>
            <DashboardButton to="/painel/areas-compativeis" className="mt-5 w-full">Adicionar trilha</DashboardButton>
          </DashPanel>
        </aside>
      </div>
    </div>
  )
}

function VideoThumb({ tone, active }: { tone: string; active?: boolean }) {
  const toneClass = {
    pink: 'from-[#AE3CFF]/28 to-[#F661FD]/8 border-[#F661FD]/55',
    blue: 'from-[#5562FF]/26 to-[#01A2ED]/8 border-[#01A2ED]/38',
    cyan: 'from-[#01A2ED]/22 to-[#5F3BFF]/12 border-[#01A2ED]/46',
  }[tone]

  return (
    <span className={`flex h-14 items-center justify-center rounded-md border bg-gradient-to-br ${toneClass}`}>
      {active ? <Play className="h-6 w-6 fill-white text-white" /> : <FileText className="h-6 w-6 text-[#D870FF]" />}
    </span>
  )
}

function LearningCard({
  title,
  description,
  items,
  action,
}: {
  title: string
  description: string
  items: typeof aiLessons
  action: string
}) {
  const { openDemoAction } = useDashboardActions()

  return (
    <DashPanel className="flex h-full flex-col">
      <SectionTitle>{title}</SectionTitle>
      <p className="mb-4 text-sm leading-6 text-white/65">{description}</p>
      <div className="flex-1 space-y-2">
        {items.map((item) => (
          <div key={item.number} className="grid grid-cols-[42px_1fr] items-center gap-3 rounded-lg border border-white/8 bg-white/[0.018] p-3">
            <span className="flex h-9 w-9 items-center justify-center rounded bg-[#AE3CFF]/18 font-semibold text-[#F661FD]">{item.number}</span>
            <div>
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-xs text-white/58">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      <DashboardButton className="mt-auto w-full" onClick={() => openDemoAction(action)}>{action}</DashboardButton>
    </DashPanel>
  )
}

function TrailMiniCard({
  trail,
  onProtectedAction,
}: {
  trail: (typeof addedTrails)[number]
  onProtectedAction: () => void
}) {
  return (
    <DashPanel className="flex h-full flex-col">
      <div className="flex items-start gap-4">
        <IconTile icon={trail.icon} color={trail.color} className="h-14 w-14 rounded-xl" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="min-w-0 max-w-full text-base font-semibold leading-snug text-white [overflow-wrap:anywhere]">{trail.title}</h3>
            <span className="shrink-0">
              <StatChip>{trail.status}</StatChip>
            </span>
          </div>
          <div className="mt-4 grid grid-cols-[1fr_42px] items-center gap-3">
            <ProgressBar value={trail.progress} />
            <span className="text-sm font-semibold text-white">{trail.progress}%</span>
          </div>
        </div>
      </div>
      <div className="mt-auto flex gap-3 pt-4">
        <DashboardButton onClick={onProtectedAction} className="min-h-10 flex-1 px-3 py-2 text-center">Abrir trilha</DashboardButton>
        <DashboardButton icon={false} onClick={onProtectedAction} className="min-h-10 shrink-0 px-3 py-2">
          <MoreHorizontal className="h-4 w-4" />
        </DashboardButton>
      </div>
    </DashPanel>
  )
}

function RhythmMetric({ icon: Icon, label, value, caption }: { icon: typeof Clock3; label: string; value: string; caption?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/8 bg-white/[0.018] p-4">
      <span className="flex items-center gap-3 text-sm text-white/68"><Icon className="h-5 w-5 text-[#C756FF]" />{label}</span>
      <span className="text-right"><strong className="block text-white">{value}</strong>{caption && <small className="text-xs text-white/48">{caption}</small>}</span>
    </div>
  )
}

export function ActionPlanPage() {
  const { openDemoAction } = useDashboardActions()

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Plano de ação"
        title={<><span className="text-white">Seu plano já está </span><span className={dashboardTitleGradient}>pronto para guiar seus próximos passos.</span></>}
        description="Com base nas suas escolhas, a Nexa organizou uma direção inicial com foco, prioridade e ritmo ideal para sua evolução."
      />

      <div className="grid grid-cols-[minmax(0,1fr)_330px] gap-5 max-xl:grid-cols-1">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
            <DashPanel accent>
              <div className="flex gap-5 max-sm:flex-col">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#AE3CFF]/45 text-[#D55CFF] shadow-neon">
                  <Check className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Seu plano foi criado com sucesso</h2>
                  <p className="mt-2 text-sm leading-6 text-white/68">Agora você já tem uma direção inicial definida para seguir com mais clareza, constância e foco.</p>
                </div>
              </div>
              <div className="mt-5 divide-y divide-white/7">
                {[
                  ['Objetivo principal', 'Descobrir se tecnologia combina com você e desenvolver base prática'],
                  ['Área foco', 'Tecnologia'],
                  ['Rotina semanal', '5 dias por semana • 1h30 por dia'],
                  ['Ritmo ideal', 'Equilibrado'],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[145px_1fr] gap-4 py-3 text-sm max-sm:grid-cols-1">
                    <span className="text-white/58">{label}:</span><span className="text-white/78">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <DashboardButton variant="primary" onClick={() => openDemoAction('Ver meu plano')} icon={false}>Ver meu plano</DashboardButton>
                <DashboardButton onClick={() => openDemoAction('Editar plano')} icon={false}>Editar plano</DashboardButton>
              </div>
            </DashPanel>

            <DashPanel>
              <SectionTitle>O que seu plano define</SectionTitle>
              <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                {planDefinition.map((item) => (
                  <div key={item.title} className="rounded-lg border border-white/7 bg-white/[0.018] p-4">
                    <item.icon className="h-7 w-7 text-[#D45BFF]" />
                    <h3 className="mt-3 font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-white/62">{item.text}</p>
                  </div>
                ))}
              </div>
            </DashPanel>
          </div>

          <DashPanel>
            <SectionTitle>Estrutura do seu plano</SectionTitle>
            <div className="relative grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
              <div className="absolute left-[10%] right-[10%] top-5 border-t border-dashed border-[#AE3CFF]/45 max-lg:hidden" />
              {planStructure.map((step) => (
                <div key={step.title} className="relative z-10 text-center">
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#F661FD]/70 bg-[#08051b] text-[#F661FD] shadow-neon"><Check className="h-5 w-5" /></span>
                  <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/62">{step.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-white/58">Seu plano está pronto e pode ser ajustado sempre que sua meta ou rotina mudar.</p>
          </DashPanel>

          <DashPanel>
            <SectionTitle>Seu plano inclui</SectionTitle>
            <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {[
                [Target, 'Direção estratégica', 'Visão clara do que priorizar agora'],
                [Sparkles, 'Prioridades da semana', 'Foco prático para começar sem se perder'],
                [Clock3, 'Ritmo recomendado', 'Organização adaptada ao seu tempo'],
                [Flag, 'Próximos focos', 'Sugestões do que explorar depois'],
              ].map(([Icon, title, text]) => (
                <div key={String(title)} className="flex gap-3 rounded-lg border border-white/7 p-4">
                  <IconTile icon={Icon as typeof Target} />
                  <div><h3 className="font-semibold text-white">{String(title)}</h3><p className="mt-1 text-xs leading-5 text-white/60">{String(text)}</p></div>
                </div>
              ))}
            </div>
          </DashPanel>
        </div>

        <aside className="space-y-5">
          <DashPanel>
            <SectionTitle>Resumo atual</SectionTitle>
            <div className="divide-y divide-white/7">
              {[['Status do plano', 'Ativo'], ['Área foco', 'Tecnologia'], ['Objetivo', 'Explorar a área e iniciar fundamentos'], ['Rotina semanal', '5x por semana'], ['Nível de personalização', 'Personalizado']].map(([label, value], index) => (
                <div key={label} className="flex justify-between gap-4 py-3 text-sm"><span className="text-white/58">{label}:</span><span className={index === 0 ? 'text-emerald-400' : index === 4 ? 'text-[#E45BFF]' : 'text-right text-white/78'}>{value}</span></div>
              ))}
            </div>
          </DashPanel>
          <DashPanel>
            <SectionTitle>Próximos passos</SectionTitle>
            <ul className="space-y-4 text-sm text-white/68">
              {['Seguir a trilha inicial recomendada', 'Ajustar sua rotina se necessário', 'Revisar o plano conforme sua evolução'].map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[#C75BFF]" />{item}</li>)}
            </ul>
          </DashPanel>
          <DashPanel>
            <SectionTitle>Ações rápidas</SectionTitle>
            <div className="grid grid-cols-2 gap-3">
              {['Ver plano', 'Editar objetivo', 'Atualizar rotina', 'Gerar nova versão'].map((action) => <DashboardButton key={action} icon={false} onClick={() => openDemoAction(action)}>{action}</DashboardButton>)}
            </div>
          </DashPanel>
        </aside>
      </div>
    </div>
  )
}
