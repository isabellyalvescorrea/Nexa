export type MarketingSectionId = 'inicio' | 'sobre' | 'ferramentas'

export const marketingLinks = [
  { id: 'inicio', label: 'Início', href: '/#inicio' },
  { id: 'sobre', label: 'Sobre nós', href: '/#sobre' },
  { id: 'ferramentas', label: 'Ferramentas', href: '/#ferramentas' },
] satisfies Array<{ id: MarketingSectionId; label: string; href: string }>

export const dashboardNav = [
  { label: 'Visão geral', href: '/painel' },
  { label: 'Teste de perfil', href: '/painel/teste-perfil' },
  { label: 'Áreas compatíveis', href: '/painel/areas-compativeis' },
  { label: 'Trilhas de estudo', href: '/painel/trilhas-de-estudo' },
  { label: 'Plano de ação', href: '/painel/plano-de-acao' },
  { label: 'Recursos recomendados', href: '/painel/recursos-recomendados' },
  { label: 'Desafios e missões', href: '/painel/desafios-e-missoes' },
  { label: 'Explorar profissões', href: '/painel/explorar-profissoes' },
  { label: 'Mentor IA', href: '/painel/mentor-ia' },
  { label: 'Mapa de habilidades', href: '/painel/mapa-de-habilidades' },
  { label: 'Configurações', href: '/painel/configuracoes' },
] as const
