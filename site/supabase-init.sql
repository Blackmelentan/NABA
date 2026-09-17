-- Supabase initial schema for NABA site
-- Enable pgcrypto for gen_random_uuid()
create extension if not exists pgcrypto;

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date text,
  location text,
  description text,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  tag text,
  title text not null,
  body text,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  caption text,
  image_url text not null,
  created_at timestamptz default now()
);

create table if not exists volunteer_applications (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  interest text,
  availability text,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists partner_enquiries (
  id uuid primary key default gen_random_uuid(),
  company text,
  email text,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz default now()
);

-- End of file
