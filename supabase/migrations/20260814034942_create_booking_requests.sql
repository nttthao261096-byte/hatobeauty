create table public.booking_requests (
  id bigint generated always as identity primary key,
  full_name varchar(120) not null check (char_length(trim(full_name)) between 2 and 120),
  phone varchar(30) not null check (char_length(trim(phone)) between 8 and 30),
  service_slug text not null check (
    service_slug in ('skin', 'scalp', 'brow-lash', 'hair-removal', 'waxing', 'body')
  ),
  preferred_date date not null,
  locale varchar(2) not null default 'vi' check (locale in ('vi', 'en')),
  status text not null default 'pending' check (
    status in ('pending', 'contacted', 'confirmed', 'completed', 'cancelled')
  ),
  source text not null default 'hato-website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.booking_requests is
  'Private consultation and appointment requests submitted through the Hato Beauty website.';

create index booking_requests_status_created_at_idx
  on public.booking_requests (status, created_at desc);

create index booking_requests_active_date_idx
  on public.booking_requests (preferred_date, created_at)
  where status in ('pending', 'contacted', 'confirmed');

alter table public.booking_requests enable row level security;

revoke all on table public.booking_requests from anon, authenticated;
revoke all on sequence public.booking_requests_id_seq from anon, authenticated;
grant insert on table public.booking_requests to service_role;
grant usage, select on sequence public.booking_requests_id_seq to service_role;
