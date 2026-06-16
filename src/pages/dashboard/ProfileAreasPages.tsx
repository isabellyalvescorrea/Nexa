import {
  BarChart3,
  Brain,
  Lightbulb,
  Sparkles,
  Star,
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
import { compatibleAreas, profileDemonstrates, profileScores, resultTraits } from '@/data/dashboard/internal'

const strengths = [
  'Raciocínio lógico e análise de dados',
  'Curiosidade intelectual e aprendizado contínuo',
  'Autonomia para tomar decisões',
  'Visão estratégica e foco em soluções',
]

const environments = [
  'Projetos práticos e desafiadores',
  'Resolução de problemas complexos',
  'Inovação e melhoria contínua',
  'Tecnologia e ferramentas digitais',
  'Colaboração orientada a objetivos',
]

export function ProfileTestPage() {
  return (
    <div>
      <DashboardPageHeader
        eyebrow="Teste de perfil"
        title={<span className={dashboardTitleGradient}>Seu perfil está pronto.</span>}
        description="Com base nas suas respostas, identificamos seu estilo de interesse, pontos fortes e tendências profissionais. Este resultado serve como base para suas próximas escolhas dentro da Nexa."
      />

      <div className="grid grid-cols-[minmax(0,1fr)_390px] gap-5 max-2xl:grid-cols-[minmax(0,1fr)_340px] max-xl:grid-cols-1">
        <div className="space-y-5">
          <DashPanel accent className="grid min-h-[300px] grid-cols-[190px_1fr] items-center gap-7 max-md:grid-cols-1">
            <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border-4 border-[#5562FF] bg-[#090626] text-[#C061FF] shadow-[0_0_35px_rgba(174,60,255,.35),inset_0_0_26px_rgba(1,162,237,.13)]">
              <Brain className="h-20 w-20" strokeWidth={1.45} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Perfil analítico, criativo e estratégico</h2>
              <p className="mt-3 max-w-2xl leading-7 text-white/72">
                Você tende a combinar lógica, curiosidade, criatividade prática e vontade de resolver problemas reais. Seu perfil
                valoriza pensamento estruturado aliado à inovação e impacto.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3 max-sm:grid-cols-1">
                {profileScores.map((score) => (
                  <div key={score.label} className="rounded-lg border border-[#5562FF]/25 bg-white/[0.025] p-3 text-center">
                    <p className="text-xs text-white/62">{score.label}</p>
                    <p className="mt-1 font-display text-2xl font-bold gradient-text">{score.value}%</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <DashboardButton to="/painel/areas-compativeis" variant="primary">Ver áreas compatíveis</DashboardButton>
                <DashboardButton to="/painel/explorar-profissoes">Explorar profissões</DashboardButton>
              </div>
            </div>
          </DashPanel>

          <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1">
            <DashPanel>
              <SectionTitle><span className="flex items-center gap-3"><Star className="text-[#C35CFF]" />Seus principais pontos fortes</span></SectionTitle>
              <ul className="space-y-4">
                {strengths.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/72"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C35CFF]" />{item}</li>)}
              </ul>
            </DashPanel>
            <DashPanel>
              <SectionTitle><span className="flex items-center gap-3"><BarChart3 className="text-[#2DA8FF]" />Ambientes em que você tende a se destacar</span></SectionTitle>
              <ul className="space-y-4">
                {environments.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/72"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2DA8FF]" />{item}</li>)}
              </ul>
            </DashPanel>
            <DashPanel>
              <SectionTitle><span className="flex items-center gap-3"><Sparkles className="text-[#D46BFF]" />Como a Nexa pode te ajudar agora</span></SectionTitle>
              <p className="text-sm leading-7 text-white/72">
                A Nexa sugere áreas compatíveis com seu perfil, monta trilhas de estudo personalizadas, recomenda recursos de
                qualidade e organiza um plano de ação para você evoluir com clareza e foco.
              </p>
            </DashPanel>
          </div>

          <DashPanel>
            <p className="mb-4 font-semibold text-[#D38AFF]">Ações rápidas para continuar sua jornada</p>
            <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
              <DashboardButton to="/painel/areas-compativeis">Ir para Áreas compatíveis</DashboardButton>
              <DashboardButton to="/painel/trilhas-de-estudo">Montar trilha de estudos</DashboardButton>
              <DashboardButton to="/painel/plano-de-acao">Criar plano de ação</DashboardButton>
              <DashboardButton to="/painel/mentor-ia">Abrir Mentor IA</DashboardButton>
            </div>
          </DashPanel>
        </div>

        <aside className="space-y-5">
          <DashPanel className="h-fit">
            <SectionTitle>O que seu resultado revela</SectionTitle>
            <div className="space-y-5">
              {resultTraits.map((trait) => (
                <div key={trait.label}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="text-white/78">{trait.label}</span><strong>{trait.value}%</strong>
                  </div>
                  <ProgressBar value={trait.value} />
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-white/64">Essas tendências ajudam a entender como você aprende, decide e se adapta a diferentes áreas.</p>
          </DashPanel>

          <DashPanel>
            <SectionTitle>Próximos passos recomendados</SectionTitle>
            <div className="grid gap-2">
              <DashboardButton to="/painel/areas-compativeis">Explorar áreas compatíveis</DashboardButton>
              <DashboardButton to="/painel/trilhas-de-estudo">Montar trilha de estudos</DashboardButton>
              <DashboardButton to="/painel/plano-de-acao">Criar plano de ação</DashboardButton>
              <DashboardButton to="/painel/explorar-profissoes">Descobrir profissões alinhadas</DashboardButton>
            </div>
          </DashPanel>

          <DashPanel className="flex gap-4">
            <IconTile icon={Lightbulb} />
            <div>
              <h2 className="text-lg font-semibold text-white">Este resultado não limita suas possibilidades.</h2>
              <p className="mt-2 text-sm leading-6 text-white/67">Ele funciona como um ponto de partida para orientar sua jornada.</p>
            </div>
          </DashPanel>
        </aside>
      </div>
    </div>
  )
}

export function CompatibleAreasPage() {
  const mainArea = compatibleAreas[0]
  return (
    <div>
      <DashboardPageHeader
        eyebrow="Áreas compatíveis"
        title={<span className={dashboardTitleGradient}>Descubra onde seu perfil tem mais afinidade.</span>}
        description="Compatibilidades estimadas com base no seu teste de perfil. Elas indicam afinidades e não determinam seu futuro."
      />

      <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-5 max-xl:grid-cols-1">
        <div className="space-y-5">
          <div className="grid grid-cols-[1.05fr_.95fr] gap-4 max-lg:grid-cols-1">
            <DashPanel accent className="grid grid-cols-[108px_1fr] items-center gap-5 max-sm:grid-cols-1">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#F661FD]/70 bg-[#AE3CFF]/8 text-[#D361FF] shadow-neon">
                <span className="font-mono text-4xl">&lt;/&gt;</span>
              </div>
              <div>
                <StatChip>#1</StatChip>
                <p className="mt-3 text-white/74">Sua maior compatibilidade é com</p>
                <h2 className="mt-1 font-display text-3xl font-bold text-[#4C75FF]">{mainArea.name} — {mainArea.value}%</h2>
                <p className="mt-4 text-sm leading-6 text-white/58">{mainArea.reason}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <DashboardButton to="/painel/explorar-profissoes" variant="primary">Explorar área principal</DashboardButton>
                  <DashboardButton to="/painel/trilhas-de-estudo">Gerar trilha para esta área</DashboardButton>
                </div>
              </div>
            </DashPanel>

            <DashPanel>
              <SectionTitle>Compatibilidade por área</SectionTitle>
              <div className="space-y-5">
                {compatibleAreas.map((area, index) => (
                  <div key={area.name} className="grid grid-cols-[150px_1fr_45px] items-center gap-3 max-sm:grid-cols-[110px_1fr_38px]">
                    <span className="text-sm text-white/75">{area.name}</span>
                    <ProgressBar value={area.value} color={index % 2 ? 'blue' : 'gradient'} />
                    <strong className="text-right text-sm">{area.value}%</strong>
                  </div>
                ))}
              </div>
            </DashPanel>
          </div>

          <div className="grid grid-cols-5 gap-3 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {compatibleAreas.map((area, index) => (
              <DashPanel key={area.name} accent={index === 0} className="flex h-full flex-col p-4">
                <h2 className="text-lg font-semibold text-white">{area.name}</h2>
                <p className="mt-1 text-2xl font-bold text-white">{area.value}%</p>
                <p className="text-xs text-white/58">Compatibilidade estimada</p>
                <h3 className="mt-5 text-xs font-semibold text-white">Por que combina com você</h3>
                <p className="mt-2 flex-1 text-xs leading-6 text-white/68">{area.reason}</p>
                <h3 className="mt-4 text-xs font-semibold text-white">Habilidades principais</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {area.skills.map((skill) => <span key={skill} className="rounded border border-white/8 bg-white/[0.025] px-2 py-1 text-[10px] text-white/68">{skill}</span>)}
                </div>
                <h3 className="mt-4 text-xs font-semibold text-white">Profissões relacionadas</h3>
                <p className="mt-2 min-h-16 text-xs leading-6 text-white/66">{area.professions}</p>
                <DashboardButton to="/painel/explorar-profissoes" variant={index === 0 ? 'primary' : 'outline'} className="mt-4 w-full">Explorar área</DashboardButton>
              </DashPanel>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <DashPanel>
            <SectionTitle>O que seu perfil demonstra</SectionTitle>
            <div className="space-y-4">
              {profileDemonstrates.map((item, index) => (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-sm"><span className="text-white/72">{item.label}</span><strong>{item.value}%</strong></div>
                  <ProgressBar value={item.value} color={index % 2 ? 'pink' : 'gradient'} />
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-white/60">Essas tendências explicam por que você se destaca em certas áreas.</p>
          </DashPanel>

          <DashPanel>
            <SectionTitle>Ações rápidas</SectionTitle>
            <div className="grid grid-cols-2 gap-3">
              <DashboardButton to="/painel/explorar-profissoes" icon={false}>Explorar área principal</DashboardButton>
              <DashboardButton to="/painel/trilhas-de-estudo" icon={false}>Gerar trilha para esta área</DashboardButton>
              <DashboardButton to="/painel/plano-de-acao" variant="danger" icon={false}>Criar plano de ação</DashboardButton>
              <DashboardButton to="/painel/areas-compativeis" icon={false}>Comparar com outra área</DashboardButton>
              <DashboardButton to="/painel/teste-perfil" variant="cyan" icon={false}>Refazer teste</DashboardButton>
              <DashboardButton icon={false}>Salvar resultado</DashboardButton>
            </div>
          </DashPanel>
        </aside>
      </div>
    </div>
  )
}
