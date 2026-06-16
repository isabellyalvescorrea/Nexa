import { useState } from 'react'
import {
  BarChart3,
  Bookmark,
  Bot,
  BriefcaseBusiness,
  Code2,
  Megaphone,
  Radar,
  Search,
  Send,
  Sparkles,
  Target,
} from 'lucide-react'
import {
  DashPanel,
  DashboardButton,
  DashboardPageHeader,
  dashboardTitleGradient,
  IconTile,
  SectionTitle,
  StatChip,
} from '@/components/dashboard/DashboardPrimitives'
import { mentorInitialMessages, professionCards } from '@/data/dashboard/internal'
import { useRequireAuth } from '@/hooks/useRequireAuth'

const professionIcons = [Code2, BarChart3, Sparkles, Megaphone]

export function ProfessionsPage() {
  const requireAuth = useRequireAuth()

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Explorar profissões"
        title={<span className={dashboardTitleGradient}>Profissões para explorar no seu momento.</span>}
        description="Descubra carreiras que combinam com você, compare opções, salve favoritas e entenda rotinas, habilidades e possibilidades no mercado antes de decidir."
      />

      <div className="grid grid-cols-[minmax(0,1fr)_330px] gap-5 max-xl:grid-cols-1">
        <div className="space-y-5">
          <DashPanel accent className="grid grid-cols-[170px_1fr_auto] items-center gap-6 max-lg:grid-cols-[130px_1fr] max-sm:grid-cols-1">
            <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-[#AE3CFF]/55">
              {[1, 0.72, 0.44].map((scale) => <span key={scale} className="absolute rounded-full border border-[#F661FD]/65" style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }} />)}
              <Radar className="h-8 w-8 text-[#D05CFF]" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Seu radar profissional está ativo</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/68">Selecionamos opções alinhadas aos seus interesses, áreas compatíveis e interações recentes na plataforma.</p>
              <div className="mt-4 flex flex-wrap gap-3"><StatChip>Personalizado</StatChip><StatChip color="blue">8 profissões salvas</StatChip><StatChip color="cyan">3 comparadas recentemente</StatChip></div>
            </div>
            <div className="grid min-w-52 gap-3 max-lg:col-span-2 max-lg:grid-cols-2 max-sm:col-span-1 max-sm:grid-cols-1">
              <DashboardButton variant="primary">Explorar recomendações</DashboardButton>
              <DashboardButton>Ver profissões salvas</DashboardButton>
            </div>
          </DashPanel>

          <section>
            <SectionTitle action={<button className="text-sm text-[#8A66FF]">Ver todas →</button>}>Profissões recomendadas para você</SectionTitle>
            <div className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1">
              {professionCards.map((profession, index) => {
                const Icon = professionIcons[index]
                return (
                  <DashPanel key={profession.title} className="flex h-full flex-col p-4">
                    <div className="flex items-start justify-between"><IconTile icon={Icon} color={index === 1 ? 'blue' : 'pink'} /><Bookmark className="h-5 w-5 text-[#CE5AFF]" /></div>
                    <h3 className="mt-3 text-base font-semibold text-white">{profession.title}</h3>
                    <p className="mt-1 text-sm text-[#9B72FF]">{profession.area}</p>
                    <p className="mt-3 flex-1 text-xs leading-5 text-white/64">{profession.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">{profession.tags.map((tag) => <span key={tag} className="rounded border border-white/8 px-2 py-1 text-[10px] text-white/60">{tag}</span>)}</div>
                    <div className="mt-4 grid grid-cols-2 gap-2"><DashboardButton icon={false}>Ver profissão</DashboardButton><DashboardButton icon={false} onClick={() => requireAuth(() => undefined)}>Salvar</DashboardButton></div>
                  </DashPanel>
                )
              })}
            </div>
          </section>

          <section>
            <SectionTitle action={<button className="text-sm text-[#8A66FF]">Ver todas →</button>}>Comparadas recentemente</SectionTitle>
            <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
              {[['Desenvolvedor de Software', 'Analista de Dados'], ['UX/UI Designer', 'Marketing Digital']].map((comparison, index) => (
                <DashPanel key={comparison.join('-')} className="grid grid-cols-[1fr_auto_1fr_1.4fr] items-center gap-4 max-sm:grid-cols-1">
                  <strong className="text-sm text-white">{comparison[0]}</strong><span className="rounded-full bg-[#16205c] px-2 py-1 text-[10px] text-[#6F88FF]">VS</span><strong className="text-sm text-white">{comparison[1]}</strong>
                  <div className="text-xs leading-5 text-white/64"><p className="text-emerald-400">✓ Foco: {index ? 'Experiência vs Aquisição' : 'Desenvolvimento vs Análise'}</p><p>✓ Rotina: projetos e relatórios</p><DashboardButton className="mt-2 w-full py-1.5" icon={false}>Continuar comparação</DashboardButton></div>
                </DashPanel>
              ))}
            </div>
          </section>

          <DashPanel>
            <SectionTitle>O que você pode descobrir aqui</SectionTitle>
            <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
              {[
                [BriefcaseBusiness, 'Rotina real da profissão', 'Entenda o dia a dia, tarefas e desafios de quem já faz.'],
                [Sparkles, 'Habilidades necessárias', 'Veja quais competências desenvolver e como se destacar.'],
                [Target, 'Caminhos de entrada e crescimento', 'Descubra como começar, crescer e as possibilidades no mercado.'],
              ].map(([Icon, title, text]) => (
                <div key={String(title)} className="flex gap-4"><IconTile icon={Icon as typeof Target} /><div><h3 className="font-semibold text-white">{String(title)}</h3><p className="mt-1 text-sm leading-6 text-white/60">{String(text)}</p></div></div>
              ))}
            </div>
          </DashPanel>
        </div>

        <aside className="space-y-5">
          <DashPanel>
            <SectionTitle>Baseado no seu perfil</SectionTitle>
            <div className="space-y-5 text-sm">
              <ProfileFact label="Área principal" value="Tecnologia" />
              <ProfileFact label="Área secundária" value="Design e Criatividade" />
              <ProfileFact label="Objetivo atual" value="Descobrir carreiras com alta afinidade" />
            </div>
            <DashboardButton to="/painel/areas-compativeis" className="mt-5 w-full">Ver áreas compatíveis</DashboardButton>
          </DashPanel>
          <DashPanel>
            <SectionTitle>Ações rápidas</SectionTitle>
            <div className="grid gap-2">{['Comparar profissões', 'Salvar nova profissão', 'Ver favoritas', 'Atualizar recomendações'].map((item) => <DashboardButton key={item} onClick={() => requireAuth(() => undefined)}>{item}</DashboardButton>)}</div>
          </DashPanel>
          <DashPanel>
            <SectionTitle>Última profissão acessada</SectionTitle>
            <div className="flex items-center gap-4"><IconTile icon={BarChart3} /><div><h3 className="font-semibold text-white">Analista de Dados</h3><p className="mt-1 text-xs text-[#9B72FF]">Tecnologia • Salva</p></div></div>
            <DashboardButton variant="primary" className="mt-5 w-full" icon={false}>Retomar</DashboardButton>
          </DashPanel>
        </aside>
      </div>
    </div>
  )
}

function ProfileFact({ label, value }: { label: string; value: string }) {
  return <div className="flex gap-3"><Target className="h-5 w-5 shrink-0 text-[#B95DFF]" /><div><p className="text-xs text-white/50">{label}</p><p className="mt-1 text-white/78">{value}</p></div></div>
}

type MentorMessage = { author: string; time: string; text: string }

export function MentorPage() {
  const [messages, setMessages] = useState<MentorMessage[]>(mentorInitialMessages)
  const [message, setMessage] = useState('')
  const suggestions = ['Que profissão combina comigo?', 'Como começar do zero?', 'Monte um plano de estudos', 'Compare duas áreas']

  const sendMessage = (text = message) => {
    const normalized = text.trim()
    if (!normalized) return
    setMessages((current) => [
      ...current,
      { author: 'Você', time: 'agora', text: normalized },
      {
        author: 'NexaAI',
        time: 'agora',
        text: 'Com seu perfil analítico e criativo, eu começaria comparando uma experiência prática curta em UX/UI com um exercício introdutório de Front-end. Depois, use sua facilidade com lógica para experimentar análise de dados. Essa sequência permite perceber qual atividade mantém mais seu interesse antes de escolher uma trilha completa.',
      },
    ])
    setMessage('')
  }

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Mentor IA"
        title={<span className={dashboardTitleGradient}>NexaAI</span>}
        description="Sua assistente inteligente para tirar dúvidas, explorar carreiras e orientar seus próximos passos com base no seu perfil."
      />

      <DashPanel accent className="min-h-[calc(100vh-190px)] p-4 sm:p-6">
        <div className="flex min-h-[530px] flex-col">
          <div className="flex-1 space-y-5 overflow-y-auto pr-1">
            {messages.map((item, index) => {
              const isUser = item.author === 'Você'
              return (
                <div key={`${item.author}-${item.time}-${index}`} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  {!isUser && <div className="mentor-avatar mentor-avatar--ai mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#AE3CFF]/55 bg-[#0B0B2C] text-[#D35EFF]"><Bot className="h-6 w-6" /></div>}
                  <div className={`mentor-bubble max-w-[72%] rounded-lg border p-4 text-sm leading-6 max-md:max-w-[88%] ${isUser ? 'mentor-bubble--user border-[#5562FF]/18 bg-[#151a3a] text-white/82' : 'mentor-bubble--ai border-[#AE3CFF]/15 bg-[#11152f] text-white/80'}`}>
                    <p className="mb-1 text-xs"><strong className={isUser ? 'text-[#BC6AFF]' : 'text-[#D65DFF]'}>{item.author}</strong> <span className="text-white/42">• {item.time}</span></p>
                    {item.text}
                  </div>
                  {isUser && <span className="mentor-avatar mentor-avatar--user mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#AE3CFF]/55 bg-[#26145a] font-semibold text-[#C667FF]">V</span>}
                </div>
              )
            })}
          </div>

          <div className="mt-5">
            <div className="mentor-input-shell flex gap-3 rounded-lg border border-[#AE3CFF]/45 bg-[#11152f] p-1.5 focus-within:border-[#01A2ED]/70">
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') sendMessage()
                }}
                placeholder="Pergunte sobre carreira, estudos, profissões ou dúvidas..."
                className="mentor-input min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/42"
              />
              <button type="button" onClick={() => sendMessage()} aria-label="Enviar mensagem" className="inline-flex h-11 w-14 items-center justify-center rounded-md bg-nexa-gradient text-white shadow-neon">
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-white/76"><Search className="h-5 w-5 text-[#D65FFF]" />Sugestões de perguntas</div>
            <div className="mt-2 grid grid-cols-4 gap-2 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)} className="mentor-suggestion rounded-md border border-[#AE3CFF]/35 px-4 py-2.5 text-left text-sm text-white/68 transition hover:border-[#01A2ED]/60 hover:text-white">{suggestion} →</button>)}
            </div>
          </div>
        </div>
      </DashPanel>
    </div>
  )
}
