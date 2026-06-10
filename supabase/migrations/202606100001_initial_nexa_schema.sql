create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  country text,
  avatar_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.profile_tests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  result_area text,
  compatibility_score integer check (compatibility_score between 0 and 100),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.study_paths (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  area text not null,
  steps jsonb not null default '[]'::jsonb,
  progress integer not null default 0 check (progress between 0 and 100),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.action_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tasks jsonb not null default '[]'::jsonb,
  progress integer not null default 0 check (progress between 0 and 100),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.skill_maps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  skills jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists profile_tests_user_id_idx on public.profile_tests(user_id);
create index if not exists study_paths_user_id_idx on public.study_paths(user_id);
create index if not exists action_plans_user_id_idx on public.action_plans(user_id);
create index if not exists skill_maps_user_id_idx on public.skill_maps(user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (
    id,
    full_name,
    email,
    country
  )
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email,
    nullif(new.raw_user_meta_data ->> 'country', '')
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    email = excluded.email,
    country = excluded.country,
    updated_at = timezone('utc', now());

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

drop trigger if exists study_paths_set_updated_at on public.study_paths;
create trigger study_paths_set_updated_at
  before update on public.study_paths
  for each row execute procedure public.set_updated_at();

drop trigger if exists action_plans_set_updated_at on public.action_plans;
create trigger action_plans_set_updated_at
  before update on public.action_plans
  for each row execute procedure public.set_updated_at();

drop trigger if exists skill_maps_set_updated_at on public.skill_maps;
create trigger skill_maps_set_updated_at
  before update on public.skill_maps
  for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.profile_tests enable row level security;
alter table public.study_paths enable row level security;
alter table public.action_plans enable row level security;
alter table public.skill_maps enable row level security;

revoke all on public.profiles from anon;
revoke all on public.profile_tests from anon;
revoke all on public.study_paths from anon;
revoke all on public.action_plans from anon;
revoke all on public.skill_maps from anon;

grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.profile_tests to authenticated;
grant select, insert, update, delete on public.study_paths to authenticated;
grant select, insert, update, delete on public.action_plans to authenticated;
grant select, insert, update, delete on public.skill_maps to authenticated;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check ((select auth.uid()) = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "Users can delete own profile" on public.profiles;
create policy "Users can delete own profile"
  on public.profiles for delete
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Users can read own profile tests" on public.profile_tests;
create policy "Users can read own profile tests"
  on public.profile_tests for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own profile tests" on public.profile_tests;
create policy "Users can insert own profile tests"
  on public.profile_tests for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own profile tests" on public.profile_tests;
create policy "Users can update own profile tests"
  on public.profile_tests for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own profile tests" on public.profile_tests;
create policy "Users can delete own profile tests"
  on public.profile_tests for delete
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can read own study paths" on public.study_paths;
create policy "Users can read own study paths"
  on public.study_paths for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own study paths" on public.study_paths;
create policy "Users can insert own study paths"
  on public.study_paths for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own study paths" on public.study_paths;
create policy "Users can update own study paths"
  on public.study_paths for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own study paths" on public.study_paths;
create policy "Users can delete own study paths"
  on public.study_paths for delete
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can read own action plans" on public.action_plans;
create policy "Users can read own action plans"
  on public.action_plans for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own action plans" on public.action_plans;
create policy "Users can insert own action plans"
  on public.action_plans for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own action plans" on public.action_plans;
create policy "Users can update own action plans"
  on public.action_plans for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own action plans" on public.action_plans;
create policy "Users can delete own action plans"
  on public.action_plans for delete
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can read own skill maps" on public.skill_maps;
create policy "Users can read own skill maps"
  on public.skill_maps for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own skill maps" on public.skill_maps;
create policy "Users can insert own skill maps"
  on public.skill_maps for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own skill maps" on public.skill_maps;
create policy "Users can update own skill maps"
  on public.skill_maps for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own skill maps" on public.skill_maps;
create policy "Users can delete own skill maps"
  on public.skill_maps for delete
  to authenticated
  using ((select auth.uid()) = user_id);
