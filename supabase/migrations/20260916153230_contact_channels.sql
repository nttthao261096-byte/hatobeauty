-- Deploy this additive migration before the matching application release.
-- No customer data is deleted; old phone-based submissions remain valid.
begin;
alter table public.booking_requests
  alter column phone drop not null,
  add column contact_preference text not null default 'phone',
  add column email varchar(254),
  add column social_contact varchar(300),
  add column service_option_id text;
alter table public.booking_requests
  add constraint booking_contact_channel_check check (contact_preference in ('phone','email','whatsapp','instagram','facebook')),
  add constraint booking_contact_present_check check (coalesce(nullif(phone,''),nullif(email,''),nullif(social_contact,'')) is not null);
alter table public.contact_requests
  add column contact_preference text not null default 'phone',
  add column social_contact varchar(300);
alter table public.contact_requests drop constraint if exists contact_requests_check;
alter table public.contact_requests
  add constraint contact_channel_check check (contact_preference in ('phone','email','whatsapp','instagram','facebook')),
  add constraint contact_present_check check (coalesce(nullif(phone,''),nullif(email,''),nullif(social_contact,'')) is not null);
update public.contact_requests set contact_preference='email' where nullif(phone,'') is null and nullif(email,'') is not null;
-- Existing RLS and service_role-only grants are deliberately unchanged.
commit;
