export type MarketingSectionId = 'inicio' | 'sobre' | 'ferramentas'

export const marketingLinks = [
  { id: 'inicio', label: 'Início', href: '/#inicio' },
  { id: 'sobre', label: 'Sobre nós', href: '/#sobre' },
  { id: 'ferramentas', label: 'Ferramentas', href: '/#ferramentas' },
] satisfies Array<{ id: MarketingSectionId; label: string; href: string }>

export const dashboardNav = [
  'Visão geral',
  'Teste de perfil',
  'Áreas compatíveis',
  'Trilhas de estudo',
  'Plano de ação',
  'Dashboard',
  'Recursos recomendados',
  'Desafios e missões',
  'Explorar profissões',
  'Mentor IA',
  'Mapa de habilidades',
  'Configurações',
]
