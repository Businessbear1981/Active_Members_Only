-- HALO Platform — initial schema
-- Run in Supabase SQL editor

-- Gate requests (NDA / access requests)
create table if not exists gate_requests (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  name        text not null,
  email       text not null,
  firm        text,
  message     text,
  role        text not null,  -- 'signed' | 'buyer' | 'lender' | 'broker'
  status      text not null default 'pending'  -- 'pending' | 'approved' | 'rejected' | 'sent'
);

-- Signed users (after NDA approved)
create table if not exists signed_users (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  user_id     uuid references auth.users(id),
  email       text not null,
  role        text not null,
  signed_at   timestamptz,
  doc_url     text
);

-- Piece interest / inquiries
create table if not exists piece_inquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  piece_slug  text not null,
  user_id     uuid references auth.users(id),
  email       text,
  message     text,
  status      text default 'new'
);

-- RLS: gate_requests — service role only (no public read/write)
alter table gate_requests enable row level security;
create policy "service only" on gate_requests using (false);

alter table signed_users enable row level security;
create policy "own row" on signed_users using (auth.uid() = user_id);

alter table piece_inquiries enable row level security;
create policy "own row" on piece_inquiries using (auth.uid() = user_id);
