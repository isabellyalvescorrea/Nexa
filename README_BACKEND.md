# Backend Supabase - NEXA

## Estado atual

O frontend está preparado para:

- cadastro com e-mail e senha;
- login com sessão persistente;
- logout;
- confirmação de e-mail;
- login com Google;
- painel público em modo visitante;
- proteção de ações que salvam a jornada;
- perfil e tabelas iniciais protegidas por RLS.

Sem variáveis de ambiente, o site continua funcionando em modo visitante. As operações de autenticação exibem uma mensagem de configuração pendente.

## 1. Criar o projeto Supabase

1. Acesse [supabase.com/dashboard](https://supabase.com/dashboard).
2. Crie um projeto.
3. Em **Project Settings > API**, copie:
   - Project URL;
   - anon/public key ou publishable key.
4. Crie `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA
```

Nunca use a chave `service_role` no frontend.

## 2. Criar tabelas e políticas

Como o Supabase CLI não está vinculado neste projeto:

1. Abra **SQL Editor** no painel Supabase.
2. Copie o conteúdo de:
   - `supabase/migrations/202606100001_initial_nexa_schema.sql`
3. Execute o script.

O script cria:

- `profiles`;
- `profile_tests`;
- `study_paths`;
- `action_plans`;
- `skill_maps`;
- trigger de criação automática de perfil;
- índices, constraints, timestamps e políticas RLS.

Cada usuário autenticado só pode acessar registros vinculados ao próprio `auth.uid()`.

## 3. Configurar autenticação por e-mail

Em **Authentication > Providers > Email**:

- mantenha Email habilitado;
- escolha se o usuário precisa confirmar o e-mail.

Em **Authentication > URL Configuration**:

- Site URL em desenvolvimento: `http://localhost:5173`;
- Redirect URLs:
  - `http://localhost:5173/painel`;
  - `http://127.0.0.1:5173/painel`;
  - a URL de produção seguida de `/painel`.

Com confirmação habilitada, o cadastro informa que o usuário precisa verificar o e-mail. Sem confirmação, a sessão é criada e o usuário entra diretamente no painel.

## 4. Configurar Google

1. No Google Auth Platform, crie um OAuth Client do tipo **Web application**.
2. Adicione as origens:
   - `http://localhost:5173`;
   - `http://127.0.0.1:5173`;
   - domínio de produção.
3. Use como Authorized Redirect URI a callback exibida em:
   - **Supabase > Authentication > Providers > Google**.
4. Cole Client ID e Client Secret no provider Google do Supabase e ative-o.
5. Confirme que `/painel` está nas Redirect URLs do Supabase.

## 5. Rodar e testar

```powershell
npm.cmd install
npm.cmd run dev
```

Testes principais:

1. Acesse `/painel` sem login: o painel deve permanecer visível.
2. Clique em Teste de perfil, Trilhas, Plano de ação, Mapa de habilidades, Configurações ou em um botão Continuar: deve abrir `/login` com a mensagem de autenticação.
3. Cadastre um usuário.
4. Confirme o e-mail, se essa opção estiver ativa.
5. Entre e recarregue a página: a sessão deve persistir.
6. A inicial do nome/e-mail deve aparecer no avatar.
7. Clique em Sair: a sessão deve terminar e a página inicial deve abrir.

## Partes futuras

As tabelas estão prontas, mas o conteúdo dos testes, trilhas, planos e mapas ainda usa dados mockados. A próxima etapa será conectar cada tela interna ao CRUD correspondente no Supabase.

