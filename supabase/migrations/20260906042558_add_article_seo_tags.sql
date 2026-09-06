alter table public.journal_articles
  add column if not exists tags_vi text not null default '',
  add column if not exists tags_en text not null default '';
