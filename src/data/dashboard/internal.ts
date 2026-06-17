export const profileScores = [
  { label: 'Análise', value: 92, color: 'blue' as const },
  { label: 'Criatividade', value: 84, color: 'pink' as const },
  { label: 'Planejamento', value: 79, color: 'cyan' as const },
]

export const resultTraits = [
  { label: 'Solução de problemas', value: 91 },
  { label: 'Criatividade', value: 84 },
  { label: 'Comunicação', value: 68 },
  { label: 'Liderança', value: 63 },
  { label: 'Organização', value: 79 },
]

export const compatibleAreas = [
  {
    name: 'Tecnologia',
    value: 97,
    reason: 'Você tem forte raciocínio lógico, gosta de resolver problemas complexos e se interessa por inovação.',
    skills: ['Lógica de programação', 'Algoritmos', 'Pensamento analítico', 'Inovação'],
    professions: 'Desenvolvedor, Analista de Dados, Engenheiro de Software e mais.',
  },
  {
    name: 'Design e Criatividade',
    value: 84,
    reason: 'Você tem sensibilidade estética, curte criar soluções visuais e pensa fora da caixa.',
    skills: ['Design visual', 'Criatividade', 'Prototipagem', 'Comunicação visual'],
    professions: 'Designer, UX/UI, Diretor de Arte, Ilustrador e mais.',
  },
  {
    name: 'Negócios e Gestão',
    value: 76,
    reason: 'Você tem visão estratégica, gosta de organizar e buscar resultados com eficiência.',
    skills: ['Gestão', 'Planejamento', 'Análise de dados', 'Negociação'],
    professions: 'Gestor de Projetos, Consultor, Analista de Negócios e mais.',
  },
  {
    name: 'Educação',
    value: 68,
    reason: 'Você gosta de aprender e ensinar, tem empatia e facilidade para comunicar ideias.',
    skills: ['Didática', 'Comunicação', 'Empatia', 'Organização'],
    professions: 'Professor, Pedagogo, Instrutor, Tutor e mais.',
  },
  {
    name: 'Saúde',
    value: 54,
    reason: 'Você tem interesse em cuidar de pessoas e contribuir para o bem-estar coletivo.',
    skills: ['Empatia', 'Atenção aos detalhes', 'Resiliência', 'Ética'],
    professions: 'Enfermeiro, Psicólogo, Fisioterapeuta, Nutricionista e mais.',
  },
]

export const profileDemonstrates = [
  { label: 'Solução de problemas', value: 60 },
  { label: 'Criatividade', value: 55 },
  { label: 'Tecnologia', value: 48 },
  { label: 'Comunicação', value: 35 },
  { label: 'Liderança', value: 30 },
]

export const skillBars = [
  { label: 'Resolução de problemas', value: 92 },
  { label: 'Raciocínio lógico', value: 89 },
  { label: 'Aprendizado contínuo', value: 90 },
  { label: 'Organização', value: 81 },
  { label: 'Criatividade', value: 78 },
  { label: 'Comunicação', value: 74 },
  { label: 'Trabalho em equipe', value: 68 },
  { label: 'Liderança', value: 63 },
]

export const skillCategories = [
  { title: 'Técnicas', description: 'Competências ligadas a ferramentas, lógica e resolução de problemas.', skills: ['Análise de dados', 'Lógica', 'Programação', 'SQL', 'Modelagem de dados'] },
  { title: 'Comportamentais', description: 'Como você se relaciona, decide e trabalha com outras pessoas.', skills: ['Disciplina', 'Curiosidade', 'Adaptabilidade', 'Resiliência', 'Comunicação'] },
  { title: 'Acadêmicas', description: 'Base do conhecimento e pensamento estruturado.', skills: ['Matemática', 'Estatística', 'Pesquisa', 'Inglês', 'Pensamento crítico'] },
  { title: 'Profissionais', description: 'Habilidades aplicadas ao contexto de carreira e resultados.', skills: ['Gestão de tempo', 'Foco', 'Planejamento', 'Autonomia', 'Orientação a dados'] },
]

export const skillsToImprove = [
  { label: 'Comunicação', value: 42 },
  { label: 'Gestão do tempo', value: 48 },
  { label: 'Tomada de decisão', value: 44 },
  { label: 'Análise de dados', value: 49 },
  { label: 'Inglês técnico', value: 41 },
]

export const recentEvolution = [
  { label: 'Comunicação', previous: 62, current: 74 },
  { label: 'Organização', previous: 76, current: 81 },
  { label: 'Liderança', previous: 55, current: 63 },
  { label: 'Criatividade', previous: 71, current: 78 },
]

export const professionCards = [
  { title: 'Desenvolvedor de Software', area: 'Tecnologia', description: 'Cria soluções digitais, sistemas e aplicações que transformam ideias em realidade.', tags: ['Lógica', 'Resolução', 'Remoto'] },
  { title: 'Analista de Dados', area: 'Tecnologia', description: 'Transforma dados em insights para apoiar decisões estratégicas e impulsionar resultados.', tags: ['Análise', 'Excel/SQL', 'Insights'] },
  { title: 'UX/UI Designer', area: 'Design', description: 'Projeta experiências digitais intuitivas, acessíveis e centradas nas pessoas.', tags: ['Criatividade', 'Design', 'Pesquisa'] },
  { title: 'Especialista em Marketing Digital', area: 'Marketing', description: 'Cria estratégias e campanhas para conectar marcas ao público certo no digital.', tags: ['Estratégia', 'Conteúdo', 'Análise'] },
]

export const savedResources = [
  { type: 'Playlist de vídeos', title: 'Fundamentos de Data Science', meta: '8 vídeos • 2h 45m', progress: 65, color: 'pink' as const },
  { type: 'Guia introdutório', title: 'Guia de Machine Learning para iniciantes', meta: 'Leitura • 24 páginas', progress: 80, color: 'blue' as const },
  { type: 'Exercícios práticos', title: 'Exercícios de Python para análise de dados', meta: '12 exercícios • Intermediário', progress: 40, color: 'cyan' as const },
]

export const recommendedResources = [
  { type: 'Artigo', title: 'Como construir um portfólio de dados do zero', description: 'Dicas práticas para criar projetos que recrutadores valorizam.', meta: '7 min de leitura' },
  { type: 'Vídeo', title: 'Visualização de dados com Python e Seaborn', description: 'Aprenda técnicas para criar gráficos impactantes e informativos.', meta: '18 min' },
  { type: 'Trilha', title: 'Trilha: Análise de Dados com Python', description: 'Roteiro completo com conteúdos para você evoluir passo a passo.', meta: '5 módulos' },
  { type: 'Guia', title: 'Guia de SQL essencial para análise', description: 'Do básico ao avançado para extrair insights de bancos de dados.', meta: '22 páginas' },
]

export const activeMissions = [
  { type: 'Estudo', title: 'Concluir módulo introdutório de lógica', description: 'Revise os conceitos básicos de lógica e estruturas condicionais.', progress: 70, deadline: 'hoje', action: 'Continuar' },
  { type: 'Vídeo', title: 'Assistir playlist inicial de programação', description: 'Assista aos vídeos introdutórios selecionados para você.', progress: 45, deadline: '2 dias', action: 'Retomar' },
  { type: 'Prática', title: 'Resolver 10 exercícios básicos', description: 'Pratique lógica e algoritmos com exercícios essenciais.', progress: 80, deadline: '3 dias', action: 'Praticar' },
  { type: 'Planejamento', title: 'Registrar seu objetivo da semana', description: 'Defina o foco da semana para manter sua direção clara.', progress: 100, deadline: 'hoje', action: 'Finalizar' },
]

export const aiMissions = [
  { title: 'Explorar fundamentos de front-end', description: 'Recomendada com base na sua trilha atual.' },
  { title: 'Fazer diagnóstico de habilidades em lógica', description: 'Recomendada para fortalecer sua base em lógica.' },
  { title: 'Montar rotina de estudos de 7 dias', description: 'Recomendada para aumentar sua consistência.' },
]

export const mentorInitialMessages = [
  { author: 'Você', time: '10:32', text: 'Tenho interesse em tecnologia e criatividade, mas estou em dúvida entre UX/UI, Front-end e Ciência de Dados. Qual caminho combina mais comigo?' },
  {
    author: 'NexaAI',
    time: '10:33',
    text: 'Ótima pergunta! Pelo seu perfil, você tem alta compatibilidade com Tecnologia (97%) e Criatividade (84%). UX/UI surge como um ponto de partida forte porque combina criatividade, pensamento de interface e foco na experiência do usuário. Front-end é um próximo passo natural para transformar essas interfaces em experiências reais. Ciência de Dados também é um caminho sólido caso você descubra maior afinidade com análise, lógica e decisões orientadas por dados.',
  },
  { author: 'Você', time: '10:38', text: 'Pode montar um plano rápido para meus próximos 7 dias?' },
  {
    author: 'NexaAI',
    time: '10:38',
    text: 'Claro! Dia 1: entenda os fundamentos de UX/UI. Dia 2: explore o Figma. Dia 3: estude Design Thinking. Dia 4: inspire-se em portfólios. Dia 5: crie wireframes. Dia 6: transforme os wireframes em um protótipo. Dia 7: teste com alguém real e colete feedback.',
  },
]

export const panelThemeOptions = [
  {
    id: 'nexa',
    title: 'Nexa Padrão',
    description: 'Paleta original com roxo, azul e magenta para preservar a identidade aprovada.',
    colors: ['#F661FD', '#AE3CFF', '#5F3BFF', '#01A2ED'],
  },
  {
    id: 'galaxy',
    title: 'Galaxy',
    description: 'Tons profundos de violeta e azul para uma sensação cósmica e sofisticada.',
    colors: ['#9B5CFF', '#6A4DFF', '#2F5BFF', '#39C6FF'],
  },
  {
    id: 'aurora',
    title: 'Aurora',
    description: 'Combina magenta, ciano e verde neon para uma leitura mais vibrante.',
    colors: ['#F661FD', '#8F5BFF', '#00D8FF', '#28F0B7'],
  },
  {
    id: 'cyber-blue',
    title: 'Cyber Blue',
    description: 'Azuis intensos com apoio violeta para um painel mais técnico e limpo.',
    colors: ['#01A2ED', '#3297FF', '#5F3BFF', '#8E5BEA'],
  },
  {
    id: 'violet-premium',
    title: 'Violet Premium',
    description: 'Violeta dominante com magenta e azul profundo para uma experiência mais luxuosa.',
    colors: ['#F661FD', '#C64BFF', '#7A28FF', '#5184F1'],
  },
  {
    id: 'minimal-neon',
    title: 'Minimal Neon',
    description: 'Neon mais contido, com contraste elegante e menor intensidade visual.',
    colors: ['#AE3CFF', '#7D67FF', '#2DA8FF', '#18D6C7'],
  },
  {
    id: 'emerald-tech',
    title: 'Emerald Tech',
    description: 'Verde esmeralda e ciano em uma base tecnologica, com roxo como apoio discreto.',
    colors: ['#10B981', '#22D3EE', '#0F5C7A', '#5562FF'],
  },
  {
    id: 'solar-dark',
    title: 'Solar Dark',
    description: 'Amber, dourado e cobre sobre base escura para um destaque quente e sofisticado.',
    colors: ['#F59E0B', '#FBBF24', '#C26A1B', '#3B2B4F'],
  },
  {
    id: 'monochrome',
    title: 'Monochrome',
    description: 'Preto, branco e cinza com acento azul para um painel mais serio e direto.',
    colors: ['#F8FAFC', '#94A3B8', '#334155', '#2DA8FF'],
  },
] as const

export const layoutOptions = [
  { id: 'default', title: 'Padrão', description: 'Equilíbrio entre informações, atalhos e visão geral da sua jornada.' },
  { id: 'compact', title: 'Compacto', description: 'Mais conteúdo visível com espaçamentos reduzidos para trabalho frequente.' },
  { id: 'comfortable', title: 'Confortável', description: 'Mais respiro entre blocos para leitura calma e acompanhamento prolongado.' },
  { id: 'focus', title: 'Foco', description: 'Prioriza a atividade atual e reduz a intensidade dos elementos secundários.' },
] as const
