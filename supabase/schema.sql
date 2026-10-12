-- ============================================================
-- Egypt Tech — Supabase schema
-- Run in: Supabase Dashboard → SQL Editor (in order)
-- ============================================================

-- ---------- products table ----------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text not null default 'General',
  subcategory text,
  short_description text not null default '',
  description text not null default '',
  image_url text not null default '',
  gallery jsonb not null default '[]'::jsonb,
  specifications jsonb not null default '{}'::jsonb,
  featured boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Existing projects: add the subcategory column if it is missing.
alter table public.products add column if not exists subcategory text;

create index if not exists products_category_idx on public.products (category);
create index if not exists products_subcategory_idx on public.products (subcategory);
create index if not exists products_featured_idx on public.products (featured);
create index if not exists products_display_order_idx on public.products (display_order);
create index if not exists products_slug_idx on public.products (slug);

-- keep updated_at fresh
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();

-- ---------- contact_messages table ----------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null default '',
  company text,
  subject text not null default 'General Inquiry',
  message text not null,
  product_id uuid references public.products (id) on delete set null,
  product_name text,
  status text not null default 'new' check (status in ('new', 'contacted', 'resolved')),
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_status_idx on public.contact_messages (status);
create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);

-- ---------- Row Level Security ----------
alter table public.products enable row level security;
alter table public.contact_messages enable row level security;

-- Public read-only access to products (catalog brochure)
drop policy if exists "Public can read products" on public.products;
create policy "Public can read products"
  on public.products for select
  using (true);

-- Public can submit inquiries (insert only — no read/update/delete)
drop policy if exists "Public can submit inquiries" on public.contact_messages;
create policy "Public can submit inquiries"
  on public.contact_messages for insert
  with check (true);

-- ---------- Storage: product-images bucket ----------
-- Create via Dashboard → Storage → New bucket → name: product-images, Public: ON.
-- Or via SQL (works on most projects):
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Public read for product images
drop policy if exists "Public can read product images" on storage.objects;
create policy "Public can read product images"
  on storage.objects for select
  using (bucket_id = 'product-images');
