import type { ReactNode } from 'react'
import {
  ArrowLeft,
  Check,
  Focus,
  LayoutDashboard,
  LogOut,
  Moon,
  Palette,
  Save,
  Settings2,
  Sun,
  WandSparkles,
} from 'lucide-react'
import {
  DashPanel,
  DashboardButton,
  DashboardPageHeader,
  dashboardTitleGradient,
  MetricRing,
  ProgressBar,
  SectionTitle,
  StatChip,
} from '@/components/dashboard/DashboardPrimitives'
import {
  layoutOptions,
  panelThemeOptions,
  recentEvolution,
  skillBars,
  skillCategories,
  skillsToImprove,
} from '@/data/dashboard/internal'
import { usePanelPreferences } from '@/hooks/usePanelPreferences'
import { useDashboardActions } from '@/hooks/useDashboardActions'
import { cn } from '@/utils/cn'

export function SkillMapPage() {
  const { openDemoAction } = useDashboardActions()

  return (
    <div>
      <DashboardPageHeader
        title={<span className={dashboardTitleGradient}>Mapa de habilidades</span>}
        description="Veja seus pontos fortes atuais, o que está em desenvolvimento e as habilidades que merecem mais foco."
      />

      <div className="grid grid-cols-[minmax(0,1fr)_350px] gap-5 max-xl:grid-cols-1">
        <div className="space-y-5">
          <DashPanel accent className="grid grid-cols-[350px_1fr] gap-7 max-lg:grid-cols-1">
            <div>
              <h2 className="text-xl font-semibold text-white">Seu perfil de habilidades</h2>
              <p className="mt-2 text-sm leading-6 text-white/66">Você tem um perfil analítico forte, com alta curiosidade e disciplina no aprendizado. Suas habilidades de comunicação estão em crescimento.</p>
              <div className="mt-5 flex items-center gap-5"><MetricRing value={76} label="Índice geral" /><StatChip>Perfil Analítico</StatChip></div>
            </div>
            <div className="space-y-3">
              {skillBars.map((skill) => (
                <div key={skill.label} className="grid grid-cols-[150px_1fr_42px] items-center gap-3 max-sm:grid-cols-[110px_1fr_36px]">
                  <span className="text-sm text-white/70">{skill.label}</span><ProgressBar value={skill.value} /><strong className="text-sm">{skill.value}%</strong>
                </div>
              ))}
            </div>
          </DashPanel>

          <DashPanel>
            <SectionTitle>Habilidades em destaque</SectionTitle>
            <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {skillCategories.map((category, index) => (
                <div key={category.title} className="rounded-lg border border-[#5562FF]/16 bg-white/[0.018] p-4">
                  <h3 className={cn('text-lg font-semibold', index % 2 ? 'text-[#DA5FFF]' : 'text-[#3CAEFF]')}>{category.title}</h3>
                  <p className="mt-2 min-h-12 text-xs leading-5 text-white/60">{category.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">{category.skills.map((skill) => <span key={skill} className="rounded border border-white/8 bg-white/[0.025] px-2 py-1 text-[10px] text-white/66">{skill}</span>)}</div>
                </div>
              ))}
            </div>
          </DashPanel>

          <div className="grid grid-cols-[.8fr_1fr] gap-4 max-lg:grid-cols-1">
            <DashPanel>
              <SectionTitle>Habilidades para evoluir</SectionTitle>
              <p className="mb-4 text-xs text-white/58">Competências que ainda estão em desenvolvimento.</p>
              <div className="space-y-3">
                {skillsToImprove.map((skill) => (
                  <div key={skill.label} className="grid grid-cols-[130px_38px_1fr] items-center gap-3 text-xs"><span className="text-white/70">{skill.label}</span><span>{skill.value}%</span><ProgressBar value={skill.value} color="pink" /></div>
                ))}
              </div>
            </DashPanel>
            <DashPanel>
              <SectionTitle>Evolução recente</SectionTitle>
              <p className="mb-4 text-xs text-white/58">Comparativo do seu desempenho nas principais habilidades.</p>
              <div className="space-y-4">
                {recentEvolution.map((skill) => (
                  <div key={skill.label} className="grid grid-cols-[120px_42px_1fr_20px_42px_58px] items-center gap-2 text-xs max-sm:grid-cols-[100px_1fr_42px]">
                    <span className="text-white/68">{skill.label}</span><span className="max-sm:hidden">{skill.previous}%</span><ProgressBar value={skill.current} /><span className="text-white/42 max-sm:hidden">→</span><strong>{skill.current}%</strong><span className="text-emerald-400 max-sm:hidden">+{skill.current - skill.previous} p.p.</span>
                  </div>
                ))}
              </div>
            </DashPanel>
          </div>
        </div>

        <aside className="space-y-5">
          <DashPanel>
            <SectionTitle><span className="text-[#B862FF]">Leitura do seu perfil</span></SectionTitle>
            <div className="space-y-3">
              {['Você aprende melhor por prática e experimentação.', 'Seu perfil tende a se destacar em áreas analíticas e tecnológicas.', 'Comunicação e liderança são as habilidades com maior potencial de crescimento.'].map((text) => <p key={text} className="border-l-2 border-[#D05CFF] bg-white/[0.025] p-4 text-sm leading-6 text-white/68">{text}</p>)}
            </div>
          </DashPanel>
          <DashPanel>
            <SectionTitle><span className="text-[#B862FF]">Próximos focos</span></SectionTitle>
            <p className="mb-3 text-xs text-white/55">Prioridades sugeridas para seu desenvolvimento</p>
            <div className="space-y-2">
              {['Melhorar comunicação oral', 'Desenvolver liderança em projetos', 'Aprofundar análise de dados', 'Exercitar colaboração em equipe'].map((item, index) => <div key={item} className="grid grid-cols-[38px_1fr] overflow-hidden rounded-md border border-white/7"><span className="flex items-center justify-center border-r border-[#AE3CFF]/35 text-xs text-[#D36AFF]">0{index + 1}</span><span className="p-3 text-xs text-white/70">{item}</span></div>)}
            </div>
          </DashPanel>
          <DashPanel className="grid gap-3">
            <DashboardButton to="/painel/areas-compativeis" variant="primary">Ver áreas relacionadas</DashboardButton>
            <DashboardButton to="/painel/plano-de-acao">Gerar plano de evolução</DashboardButton>
            <DashboardButton to="/painel/mentor-ia">Abrir Mentor IA</DashboardButton>
            <DashboardButton icon={false} onClick={() => openDemoAction('Salvar mapa')}><Save className="h-4 w-4" />Salvar mapa</DashboardButton>
          </DashPanel>
        </aside>
      </div>
    </div>
  )
}

export function SettingsPage() {
  const {
    panelTheme,
    setPanelTheme,
    panelVisualTheme,
    highContrast,
    setHighContrast,
    fontSize,
    setFontSize,
  } = usePanelPreferences()
  const { requestLogout } = useDashboardActions()
  const selectedVisualTheme = panelThemeOptions.find((theme) => theme.id === panelVisualTheme) ?? panelThemeOptions[0]

  return (
    <div className="max-w-[1160px]">
      <DashboardPageHeader
        eyebrow="Configurações"
        title={<span className={dashboardTitleGradient}>Configurações</span>}
        description="Personalize sua experiência na Nexa de acordo com as suas preferências."
      />

      <div className="space-y-4">
        <DashPanel>
          <SettingsHeading>Aparência</SettingsHeading>
          <div className="grid grid-cols-[1fr_440px] items-center gap-6 max-lg:grid-cols-1">
            <div><h3 className="font-semibold text-white">Modo de tema</h3><p className="mt-2 text-sm text-white/60">Escolha como a plataforma é exibida.</p></div>
            <Segmented>
              <Segment active={panelTheme === 'dark'} onClick={() => setPanelTheme('dark')}><Moon className="h-5 w-5" />Escuro</Segment>
              <Segment active={panelTheme === 'light'} onClick={() => setPanelTheme('light')}><Sun className="h-5 w-5" />Claro</Segment>
            </Segmented>
          </div>
        </DashPanel>

        <DashPanel>
          <SettingsHeading>Acessibilidade</SettingsHeading>
          <div className="grid grid-cols-[1fr_auto] items-center gap-5 border-b border-white/8 pb-5">
            <div><h3 className="font-semibold text-white">Maior contraste</h3><p className="mt-2 text-sm text-white/60">Aumenta o contraste de elementos para melhorar a legibilidade.</p></div>
            <button type="button" role="switch" aria-checked={highContrast} onClick={() => setHighContrast(!highContrast)} className={cn('dashboard-switch relative h-9 w-16 rounded-full border transition', highContrast ? 'border-[#01A2ED] bg-[#5562FF]/45' : 'border-white/16 bg-[#11152c]')}><span className={cn('dashboard-switch-knob absolute top-1 h-7 w-7 rounded-full bg-white transition', highContrast ? 'left-8' : 'left-1')} /></button>
          </div>
          <div className="mt-5 grid grid-cols-[1fr_440px] items-center gap-6 max-lg:grid-cols-1">
            <div><h3 className="font-semibold text-white">Aumentar letras</h3><p className="mt-2 text-sm text-white/60">Ajusta o tamanho do texto nas telas internas do painel.</p></div>
            <Segmented>
              {([['default', 'Padrão'], ['medium', 'Médio'], ['large', 'Grande']] as const).map(([value, label]) => <Segment key={value} active={fontSize === value} onClick={() => setFontSize(value)}>{label}</Segment>)}
            </Segmented>
          </div>
        </DashPanel>

        <DashPanel>
          <SettingsHeading>Temas</SettingsHeading>
          <div className="flex items-center justify-between gap-6 max-md:flex-col max-md:items-start">
            <div>
              <h3 className="font-semibold text-white">Personalize as cores do painel.</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                Personalize as cores do painel e escolha uma paleta visual que combine com seu estilo.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {selectedVisualTheme.colors.map((color) => (
                  <span
                    key={color}
                    className="h-4 w-4 rounded-full border border-white/20 shadow-[0_0_10px_currentColor]"
                    style={{ backgroundColor: color, color }}
                  />
                ))}
                <span className="text-xs font-semibold text-white/56">{selectedVisualTheme.title}</span>
              </div>
            </div>
            <DashboardButton to="/painel/configuracoes/temas" className="min-w-52" icon={false}>
              <Palette className="h-4 w-4" />
              Explorar temas
            </DashboardButton>
          </div>
        </DashPanel>

        <DashPanel>
          <SettingsHeading>Layouts</SettingsHeading>
          <div className="flex items-center justify-between gap-6 max-md:flex-col max-md:items-start">
            <div><h3 className="font-semibold text-white">Organize a visualização da plataforma do seu jeito.</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">Escolha entre diferentes layouts pensados para seu fluxo de estudo e navegação.</p></div>
            <DashboardButton to="/painel/configuracoes/layouts" className="min-w-52">Ver layouts</DashboardButton>
          </div>
        </DashPanel>

        <DashPanel>
          <SettingsHeading>Conta e sessão</SettingsHeading>
          <div className="flex items-center justify-between gap-6 max-sm:flex-col max-sm:items-start"><div><h3 className="font-semibold text-white">Encerrar sessão neste dispositivo.</h3></div><DashboardButton variant="danger" icon={false} onClick={requestLogout} className="min-w-52"><LogOut className="h-4 w-4" />Sair</DashboardButton></div>
        </DashPanel>
      </div>
    </div>
  )
}

function SettingsHeading({ children }: { children: string }) {
  return <h2 className="mb-5 flex items-center gap-3 text-xl font-semibold text-white"><span className="h-6 w-1 rounded-full bg-gradient-to-b from-[#F661FD] to-[#5562FF]" />{children}</h2>
}

function Segmented({ children }: { children: ReactNode }) {
  return <div className="dashboard-segmented grid auto-cols-fr grid-flow-col overflow-hidden rounded-lg border border-white/10 bg-[#08071a] p-1">{children}</div>
}

function Segment({ children, active, onClick }: { children: ReactNode; active: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={cn('dashboard-segment flex min-h-12 items-center justify-center gap-2 rounded-md px-4 text-sm text-white/70 transition', active && 'dashboard-segment--active border border-[#AE3CFF]/80 bg-[#10132f] text-white shadow-[0_0_14px_rgba(95,59,255,.22)]')}>{children}</button>
}

const layoutIcons = [LayoutDashboard, Settings2, WandSparkles, Focus]

export function ThemesPage() {
  const { panelVisualTheme, setPanelVisualTheme } = usePanelPreferences()

  return (
    <div className="max-w-[1200px]">
      <DashboardPageHeader
        eyebrow="Configurações"
        title={<span className={dashboardTitleGradient}>Temas</span>}
        description="Escolha uma paleta visual para personalizar as cores do painel sem alterar sua estrutura."
      />
      <div className="grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-md:grid-cols-1">
        {panelThemeOptions.map((theme) => {
          const active = panelVisualTheme === theme.id
          return (
            <DashPanel key={theme.id} accent={active} className="relative flex h-full flex-col">
              {active && (
                <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#AE3CFF]/15 px-3 py-1 text-xs text-[#D874FF]">
                  <Check className="h-3.5 w-3.5" />
                  Selecionado
                </span>
              )}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#AE3CFF]/35 bg-[#AE3CFF]/10 text-[#F661FD]">
                <Palette className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-white">{theme.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-white/64">{theme.description}</p>
              <div className="mt-5 flex gap-2">
                {theme.colors.map((color) => (
                  <span
                    key={color}
                    className="h-9 flex-1 rounded-md border border-white/10 shadow-[0_0_14px_currentColor]"
                    style={{ backgroundColor: color, color }}
                  />
                ))}
              </div>
              <DashboardButton
                variant={active ? 'primary' : 'outline'}
                className="mt-5 w-full"
                icon={false}
                onClick={() => setPanelVisualTheme(theme.id)}
              >
                {active ? 'Selecionado' : 'Aplicar'}
              </DashboardButton>
            </DashPanel>
          )
        })}
      </div>
      <DashPanel className="mt-6">
        <p className="text-sm leading-6 text-white/64">
          Os temas alteram apenas as cores do painel. A estrutura das telas permanece igual.
        </p>
      </DashPanel>
      <div className="mt-6">
        <DashboardButton to="/painel/configuracoes" icon={false}>
          <ArrowLeft className="h-4 w-4" />
          Voltar para configurações
        </DashboardButton>
      </div>
    </div>
  )
}

export function LayoutsPage() {
  const { panelLayout, setPanelLayout } = usePanelPreferences()

  return (
    <div className="max-w-[1200px]">
      <DashboardPageHeader
        eyebrow="Configurações"
        title={<span className={dashboardTitleGradient}>Layouts</span>}
        description="Escolha a organização que melhor acompanha seu ritmo e a forma como você usa a Nexa."
      />
      <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
        {layoutOptions.map((layout, index) => {
          const Icon = layoutIcons[index]
          const active = panelLayout === layout.id
          return (
            <DashPanel key={layout.id} accent={active} className="relative">
              {active && <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#AE3CFF]/15 px-3 py-1 text-xs text-[#D874FF]"><Check className="h-3.5 w-3.5" />Selecionado</span>}
              <Icon className="h-10 w-10 text-[#B75DFF]" />
              <h2 className="mt-5 text-2xl font-semibold text-white">{layout.title}</h2>
              <p className="mt-3 min-h-14 text-sm leading-6 text-white/64">{layout.description}</p>
              <div className="dashboard-layout-preview mt-5 grid h-36 grid-cols-4 gap-2 rounded-lg border border-white/8 bg-[#050214] p-3" aria-hidden="true">
                <span className="dashboard-layout-preview-sidebar rounded bg-[#141333]" />
                <span className={cn('col-span-3 grid gap-2', layout.id === 'compact' && 'gap-1', layout.id === 'comfortable' && 'gap-3')}>
                  <i className={cn('dashboard-layout-preview-main rounded bg-[#1B1741]', layout.id === 'focus' && 'opacity-90')} />
                  <i className={cn('dashboard-layout-preview-muted rounded bg-[#11142f]', layout.id === 'focus' && 'opacity-35')} />
                </span>
              </div>
              <DashboardButton
                variant={active ? 'primary' : 'outline'}
                className="mt-5 w-full"
                icon={false}
                onClick={() => setPanelLayout(layout.id)}
              >
                {active ? 'Selecionado' : 'Aplicar'}
              </DashboardButton>
            </DashPanel>
          )
        })}
      </div>
      <DashPanel className="mt-6">
        <p className="text-sm leading-6 text-white/64">
          Você pode mudar quando quiser. Seu progresso e dados não serão alterados.
        </p>
      </DashPanel>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <DashboardButton to="/painel/configuracoes" icon={false}><ArrowLeft className="h-4 w-4" />Voltar para configurações</DashboardButton>
      </div>
    </div>
  )
}
