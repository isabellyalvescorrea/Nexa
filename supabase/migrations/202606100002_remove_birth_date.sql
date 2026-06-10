alter table if exists public.profiles
  drop column if exists birth_date;

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
