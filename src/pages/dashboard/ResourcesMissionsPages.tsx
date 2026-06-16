import {
  Bookmark,
  CheckCircle2,
  Clock3,
  Code2,
  FileText,
  Filter,
  Play,
  RefreshCw,
  Sparkles,
  Star,
  Target,
  Trophy,
  Video,
  Zap,
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
import { activeMissions, aiMissions, recommendedResources, savedResources } from '@/data/dashboard/internal'
import { useRequireAuth } from '@/hooks/useRequireAuth'

const resourceIcons = [Video, FileText, Code2]

export function RecommendedResourcesPage() {
  const requireAuth = useRequireAuth()

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Recursos recomendados"
        title={<span className={dashboardTitleGradient}>Recursos recomendados</span>}
        description="Conteúdos e ferramentas personalizados com base no seu perfil, áreas selecionadas e progresso nos estudos."
      />

      <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-5 max-xl:grid-cols-1">
        <div className="space-y-5">
          <DashPanel accent className="grid grid-cols-[150px_1fr] items-center gap-6 max-sm:grid-cols-1">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-dashed border-[#F661FD] text-[#F661FD] shadow-neon">
              <Star className="h-14 w-14" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Seus recursos em destaque</h2>
              <p className="mt-2 max-w-3xl leading-7 text-white/70">Você já avançou bastante! Selecionamos novos conteúdos para impulsionar seus estudos e aprofundar seus conhecimentos.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <StatChip>Personalizado</StatChip><StatChip color="blue">32 salvos</StatChip><StatChip color="green">5 em andamento</StatChip>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <DashboardButton to="/painel/trilhas-de-estudo" variant="primary">Continuar aprendendo</DashboardButton>
                <DashboardButton onClick={() => requireAuth(() => undefined)}>Explorar recursos</DashboardButton>
              </div>
            </div>
          </DashPanel>

          <section>
            <SectionTitle action={<button className="text-sm text-[#3F9CFF]">Ver todos os salvos →</button>}>Recursos salvos</SectionTitle>
            <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
              {savedResources.map((resource, index) => {
                const Icon = resourceIcons[index]
                return (
                  <DashPanel key={resource.title} className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <IconTile icon={Icon} color={resource.color} />
                      <Bookmark className="h-5 w-5 text-[#8D8DFF]" />
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-wide text-[#D765FF]">{resource.type}</p>
                    <h3 className="mt-2 flex-1 text-lg font-semibold text-white">{resource.title}</h3>
                    <p className="mt-2 text-sm text-white/58">{resource.meta}</p>
                    <div className="mt-5 flex items-center gap-3"><ProgressBar value={resource.progress} color={resource.color} className="flex-1" /><span className="text-sm">{resource.progress}%</span></div>
                    <DashboardButton className="mt-4 w-fit" icon={false} onClick={() => requireAuth(() => undefined)}>{index === 0 ? 'Retomar' : index === 1 ? 'Continuar lendo' : 'Praticar agora'}</DashboardButton>
                  </DashPanel>
                )
              })}
            </div>
          </section>

          <section>
            <SectionTitle action={<button className="text-sm text-[#3F9CFF]">Ver todas as recomendações →</button>}>Recomendados para seu momento</SectionTitle>
            <div className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1">
              {recommendedResources.map((resource, index) => (
                <DashPanel key={resource.title} className="flex h-full flex-col">
                  <div className="flex items-start justify-between"><StatChip color={index === 2 ? 'cyan' : index === 1 ? 'blue' : 'pink'}>{resource.type}</StatChip><Bookmark className="h-5 w-5 text-[#C25AFF]" /></div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{resource.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-white/64">{resource.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-xs text-white/58"><Clock3 className="h-4 w-4" />{resource.meta}</span><DashboardButton icon={false} onClick={() => requireAuth(() => undefined)}>{index % 2 ? 'Salvar' : 'Abrir'}</DashboardButton></div>
                </DashPanel>
              ))}
            </div>
            <button type="button" className="mt-4 w-full rounded-lg border border-[#5562FF]/22 py-3 text-sm text-white/72 transition hover:border-[#AE3CFF]/50 hover:text-white">Mostrar mais recomendações ↓</button>
          </section>
        </div>

        <aside className="space-y-4">
          <DashPanel>
            <SectionTitle>Baseado no seu perfil</SectionTitle>
            <div className="space-y-4 text-sm">
              <ProfileRow label="Área principal" value="Ciência de Dados" />
              <ProfileRow label="Trilha atual" value="Análise de Dados" />
              <ProfileRow label="Nível" value="Intermediário" />
            </div>
            <DashboardButton to="/painel/plano-de-acao" className="mt-5 w-full">Ver seu plano de ação</DashboardButton>
          </DashPanel>
          <DashPanel>
            <SectionTitle>Seu progresso com recursos</SectionTitle>
            <div className="space-y-5">
              <div className="flex items-center gap-4"><IconTile icon={Bookmark} /><div><strong className="text-3xl text-white">32</strong><p className="text-sm text-white/62">Recursos salvos</p></div></div>
              <div className="border-t border-white/8 pt-5 flex items-center gap-4"><IconTile icon={CheckCircle2} color="cyan" /><div><strong className="text-3xl text-white">18</strong><p className="text-sm text-white/62">Recursos concluídos</p></div></div>
            </div>
          </DashPanel>
          <DashPanel>
            <SectionTitle>Último acessado</SectionTitle>
            <div className="flex gap-4"><IconTile icon={Play} /><div><p className="text-xs text-[#D25BFF]">VÍDEO</p><h3 className="mt-1 font-semibold text-white">Introdução ao Pandas</h3><ProgressBar value={40} className="mt-3 w-32" /></div></div>
            <DashboardButton className="mt-5 w-full" onClick={() => requireAuth(() => undefined)}>Retomar agora</DashboardButton>
          </DashPanel>
          <DashPanel>
            <SectionTitle>Ações rápidas</SectionTitle>
            <div className="grid gap-2">
              <DashboardButton icon={false} onClick={() => requireAuth(() => undefined)}>Salvar recurso</DashboardButton>
              <DashboardButton icon={false}><Filter className="h-4 w-4" />Filtrar por área</DashboardButton>
              <DashboardButton icon={false}><Star className="h-4 w-4" />Ver apenas favoritos</DashboardButton>
              <DashboardButton icon={false}><RefreshCw className="h-4 w-4" />Atualizar recomendações</DashboardButton>
            </div>
          </DashPanel>
        </aside>
      </div>
    </div>
  )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center gap-3"><Target className="h-5 w-5 text-[#C65AFF]" /><div><p className="text-xs text-white/52">{label}</p><p className="mt-1 text-white/82">{value}</p></div></div>
}

export function MissionsPage() {
  const requireAuth = useRequireAuth()

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Desafios e missões"
        title={<span className={dashboardTitleGradient}>Mantenha sua evolução em movimento.</span>}
        description="Complete missões práticas, crie consistência e avance passo a passo na sua jornada de desenvolvimento."
      />

      <div className="grid grid-cols-[minmax(0,1fr)_350px] gap-5 max-xl:grid-cols-1">
        <div className="space-y-5">
          <DashPanel accent>
            <div className="grid grid-cols-[90px_1fr] items-center gap-5 max-sm:grid-cols-1">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#AE3CFF]/55 text-[#B667FF] shadow-neon"><Trophy className="h-10 w-10" /></div>
              <div>
                <h2 className="text-2xl font-bold text-white">Suas missões em andamento</h2>
                <p className="mt-2 text-white/68">Você já tem missões ativas. Continue de onde parou e mantenha o ritmo!</p>
                <div className="mt-4 flex flex-wrap gap-3"><StatChip color="blue">4 ativas</StatChip><StatChip>2 concluídas esta semana</StatChip><StatChip color="cyan">1 recomendada pela IA</StatChip></div>
                <div className="mt-5 flex gap-3"><DashboardButton variant="primary" onClick={() => requireAuth(() => undefined)}>Continuar missão</DashboardButton><DashboardButton icon={false}>Ver todas</DashboardButton></div>
              </div>
            </div>
          </DashPanel>

          <section>
            <SectionTitle>Missões ativas</SectionTitle>
            <div className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1">
              {activeMissions.map((mission, index) => (
                <DashPanel key={mission.title} className="flex h-full flex-col p-4">
                  <StatChip color={index === 2 ? 'cyan' : index === 1 ? 'blue' : 'pink'}>{mission.type}</StatChip>
                  <h3 className="mt-3 text-base font-semibold text-white">{mission.title}</h3>
                  <p className="mt-2 flex-1 text-xs leading-5 text-white/62">{mission.description}</p>
                  <div className="mt-4 flex items-center gap-3"><ProgressBar value={mission.progress} color={index === 2 ? 'cyan' : index === 1 ? 'blue' : 'gradient'} className="flex-1" /><span className="text-sm">{mission.progress}%</span></div>
                  <p className="mt-3 text-xs text-[#FFC447]">Prazo: {mission.deadline}</p>
                  <DashboardButton className="mt-3 w-full" icon={false} onClick={() => requireAuth(() => undefined)}>{mission.action}</DashboardButton>
                </DashPanel>
              ))}
            </div>
          </section>

          <DashPanel>
            <SectionTitle>Missões recomendadas pela IA</SectionTitle>
            <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
              {aiMissions.map((mission, index) => (
                <div key={mission.title} className="flex gap-4 rounded-lg border border-white/8 bg-white/[0.018] p-4">
                  <IconTile icon={index === 0 ? Code2 : index === 1 ? Sparkles : Clock3} color={index === 2 ? 'cyan' : index === 1 ? 'blue' : 'pink'} />
                  <div className="flex min-w-0 flex-1 flex-col"><h3 className="font-semibold text-white">{mission.title}</h3><p className="mt-1 flex-1 text-xs leading-5 text-white/60">{mission.description}</p><DashboardButton className="mt-3" icon={false} onClick={() => requireAuth(() => undefined)}>Adicionar missão</DashboardButton></div>
                </div>
              ))}
            </div>
          </DashPanel>
        </div>

        <aside className="space-y-5">
          <DashPanel>
            <SectionTitle>Seu momento atual</SectionTitle>
            <div className="divide-y divide-white/8 text-sm">
              <div className="flex justify-between py-3"><span className="text-white/60">Área foco:</span><strong>Tecnologia</strong></div>
              <div className="flex justify-between py-3"><span className="text-white/60">Trilha atual:</span><strong>Introdução à Programação</strong></div>
              <div className="flex justify-between py-3"><span className="text-white/60">Ritmo:</span><strong className="text-[#4EB4FF]">Consistente</strong></div>
            </div>
            <DashboardButton to="/painel/plano-de-acao" className="mt-4 w-full">Ver plano de ação</DashboardButton>
          </DashPanel>
          <DashPanel>
            <SectionTitle><span className="flex items-center gap-3">Ações rápidas <Zap className="text-[#B45DFF]" /></span></SectionTitle>
            <div className="grid gap-2">{['Nova missão', 'Filtrar por categoria', 'Ver concluídas', 'Atualizar recomendações'].map((action) => <DashboardButton key={action} onClick={() => requireAuth(() => undefined)}>{action}</DashboardButton>)}</div>
          </DashPanel>
          <DashPanel>
            <SectionTitle>Concluídas recentemente</SectionTitle>
            <div className="divide-y divide-white/8">
              {[['Criar sua primeira trilha', 'Ontem'], ['Salvar área compatível', '2 dias atrás'], ['Definir meta inicial', '3 dias atrás']].map(([task, date]) => <div key={task} className="flex items-center justify-between gap-4 py-3 text-sm"><span className="flex items-center gap-3 text-white/75"><CheckCircle2 className="h-5 w-5 text-[#6574FF]" />{task}</span><span className="text-xs text-white/48">{date}</span></div>)}
            </div>
            <DashboardButton className="mt-5 w-full" icon={false}>Ver todas as concluídas</DashboardButton>
          </DashPanel>
        </aside>
      </div>
    </div>
  )
}
