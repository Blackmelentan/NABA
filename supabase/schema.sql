-- =====================================================================
-- NABA — Supabase Complete Schema
-- Project Ref: qaxozohjsbezanbazrhz
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/qaxozohjsbezanbazrhz/sql
-- =====================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. EVENTS TABLE
create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  date text,
  location text,
  category text default 'Community',
  description text,
  link text,
  image_url text,
  status text default 'published',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. NEWS TABLE
create table if not exists public.news (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  tag text default 'News',
  excerpt text,
  body text,
  image_url text,
  status text default 'published',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. GALLERY TABLE
create table if not exists public.gallery (
  id uuid primary key default uuid_generate_v4(),
  caption text not null,
  category text default 'Community',
  image_url text not null,
  status text default 'published',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. MEMBERS (DIRECTORY) TABLE
create table if not exists public.members (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text default 'Community',
  location text,
  phone text,
  email text,
  website text,
  description text,
  image_url text,
  status text default 'published',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. YOUTH HUB TABLE
create table if not exists public.youth_hub_entries (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  category text default 'Mentorship',
  eligibility text,
  deadline text,
  description text,
  link text,
  status text default 'published',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. VOLUNTEER APPLICATIONS TABLE
create table if not exists public.volunteer_applications (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  interest text,
  availability text,
  message text,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. PARTNER ENQUIRIES TABLE
create table if not exists public.partner_enquiries (
  id uuid primary key default uuid_generate_v4(),
  company text,
  name text not null,
  email text not null,
  phone text,
  message text,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. CONTACT MESSAGES TABLE
create table if not exists public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. NEWSLETTER SIGNUPS TABLE
create table if not exists public.newsletter_signups (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  status text default 'subscribed',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================

alter table public.events enable row level security;
alter table public.news enable row level security;
alter table public.gallery enable row level security;
alter table public.members enable row level security;
alter table public.youth_hub_entries enable row level security;
alter table public.volunteer_applications enable row level security;
alter table public.partner_enquiries enable row level security;
alter table public.contact_messages enable row level security;
alter table public.newsletter_signups enable row level security;

-- Public can view published content
create policy "Allow public read on events" on public.events for select using (true);
create policy "Allow public read on news" on public.news for select using (true);
create policy "Allow public read on gallery" on public.gallery for select using (true);
create policy "Allow public read on members" on public.members for select using (true);
create policy "Allow public read on youth_hub_entries" on public.youth_hub_entries for select using (true);

-- Public can submit contact, volunteer, partner, newsletter
create policy "Allow public insert on volunteer_applications" on public.volunteer_applications for insert with check (true);
create policy "Allow public insert on partner_enquiries" on public.partner_enquiries for insert with check (true);
create policy "Allow public insert on contact_messages" on public.contact_messages for insert with check (true);
create policy "Allow public insert on newsletter_signups" on public.newsletter_signups for insert with check (true);

-- Authenticated staff have full access
create policy "Allow auth full on events" on public.events for all using (auth.role() = 'authenticated');
create policy "Allow auth full on news" on public.news for all using (auth.role() = 'authenticated');
create policy "Allow auth full on gallery" on public.gallery for all using (auth.role() = 'authenticated');
create policy "Allow auth full on members" on public.members for all using (auth.role() = 'authenticated');
create policy "Allow auth full on youth_hub_entries" on public.youth_hub_entries for all using (auth.role() = 'authenticated');
create policy "Allow auth full on volunteer_applications" on public.volunteer_applications for all using (auth.role() = 'authenticated');
create policy "Allow auth full on partner_enquiries" on public.partner_enquiries for all using (auth.role() = 'authenticated');
create policy "Allow auth full on contact_messages" on public.contact_messages for all using (auth.role() = 'authenticated');
create policy "Allow auth full on newsletter_signups" on public.newsletter_signups for all using (auth.role() = 'authenticated');

-- Storage Bucket Setup for 'naba-site'
insert into storage.buckets (id, name, public)
values ('naba-site', 'naba-site', true)
on conflict (id) do nothing;

create policy "Allow public view naba-site images"
on storage.objects for select using (bucket_id = 'naba-site');

create policy "Allow authenticated upload naba-site images"
on storage.objects for insert with check (bucket_id = 'naba-site' and auth.role() = 'authenticated');
