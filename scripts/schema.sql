-- Registrations for every sign-on path on the site: the Delta 1 founder
-- waitlist and partner path, the Delta 2 launch list, and the six Project:
-- Waterfall lanes. One table, because the lanes differ by which optional
-- fields they collect, not by what a record fundamentally is.

create table if not exists registrations (
  id          bigint generated always as identity primary key,
  email       text        not null,
  list        text        not null,
  name        text        not null default '',
  org         text        not null default '',
  note        text        not null default '',
  role        text        not null default '',
  city        text        not null default '',
  use_case    text        not null default '',
  commitments text[]      not null default '{}',
  at          timestamptz not null default now()
);

-- Reading this table means asking "who signed on to which lane, most recent
-- first" almost every time.
create index if not exists registrations_list_at_idx
  on registrations (list, at desc);

-- The same person may legitimately sign on to more than one lane, so email is
-- deliberately not unique. This index just makes looking someone up cheap.
create index if not exists registrations_email_idx
  on registrations (lower(email));

-- Niagara Tech Week keeps its own table rather than a lane in `registrations`.
-- It is a different event on a different domain with its own retention and its
-- own unsubscribe path, and a list that may one day be handed to a co-convenor
-- should not be a `where list = ...` away from every Diaphora sign-on.
create table if not exists niagara_tech_week_signups (
  id        bigint generated always as identity primary key,
  email     text        not null,
  interests text[]      not null default '{}',
  at        timestamptz not null default now()
);

-- The list is read newest-first when it is read at all.
create index if not exists ntw_signups_at_idx
  on niagara_tech_week_signups (at desc);

-- Someone who signs up twice should update their interests rather than appear
-- twice, and a unique index is what lets the route say `on conflict`. The route
-- lowercases the address on the way in, so a plain column index is enough --
-- an expression index would have to be matched exactly by the conflict target,
-- which is a footgun for the sake of nothing.
create unique index if not exists ntw_signups_email_idx
  on niagara_tech_week_signups (email);

-- Niagara Tech Week event submissions. One row per proposed event, and the
-- same row carries it through review to the calendar: the listing fields
-- (venue, link) start empty and are filled in closer to the week, the way
-- Toronto Tech Week's host form works.
--
-- There are no accounts. A host edits their submission through a secret link, and
-- only its SHA-256 is stored, so a leaked copy of this table cannot be used to
-- edit anyone's event.
create table if not exists niagara_tech_week_events (
  id          bigint generated always as identity primary key,
  email       text        not null,
  host_name   text        not null,
  org         text        not null default '',
  title       text        not null,
  concept     text        not null,
  kind        text        not null default 'tech',
  lifestyle_tag text      not null default '',
  format      text        not null,
  side        text        not null,
  streams     text[]      not null default '{}',
  size        text        not null default 'unsure',
  days        text[]      not null default '{}',
  audience    text        not null default '',
  cohosts     text        not null default '',
  needs       text[]      not null default '{}',
  stream_other text       not null default '',
  visibility  text        not null default 'public',
  venue       text        not null default '',
  link        text        not null default '',
  notes       text        not null default '',
  status      text        not null default 'proposed',
  edit_hash   text        not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- The reviewer's question is "what is waiting, oldest first".
create index if not exists ntw_events_status_idx
  on niagara_tech_week_events (status, created_at);

-- One host may propose several events, so email is not unique.
create index if not exists ntw_events_email_idx
  on niagara_tech_week_events (email);

create unique index if not exists ntw_events_edit_hash_idx
  on niagara_tech_week_events (edit_hash);

-- Brought forward for tables created before these columns existed. Each is a
-- no-op on a fresh database. `public` was a yes/no, and visibility replaced it with
-- three states, and only withdrawn test rows ever held it, so it is dropped
-- rather than carried across.
alter table niagara_tech_week_events add column if not exists stream_other text not null default '';
alter table niagara_tech_week_events add column if not exists visibility text not null default 'public';
alter table niagara_tech_week_events drop column if exists public;

-- Venues offering space to hosts. Kept apart from events because a venue is
-- matched to many events and outlives any one of them, and because the two are
-- reviewed by different questions: "is this a real room" against "is this a
-- real event". Same edit-link scheme as the events.
create table if not exists niagara_tech_week_venues (
  id                bigint generated always as identity primary key,
  email             text        not null,
  contact_name      text        not null,
  org               text        not null default '',
  venue_name        text        not null,
  address           text        not null default '',
  city              text        not null,
  side              text        not null,
  capacity_seated   integer     not null default 0,
  capacity_standing integer     not null default 0,
  spaces            text        not null default '',
  days              text[]      not null default '{}',
  offer             text        not null,
  amenities         text[]      not null default '{}',
  formats           text[]      not null default '{}',
  streams           text[]      not null default '{}',
  lifestyle_ok      boolean     not null default true,
  link              text        not null default '',
  notes             text        not null default '',
  status            text        not null default 'proposed',
  edit_hash         text        not null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists ntw_venues_status_idx
  on niagara_tech_week_venues (status, created_at);

create unique index if not exists ntw_venues_edit_hash_idx
  on niagara_tech_week_venues (edit_hash);

-- Sponsors. Matched to events by industry: a sponsor names the streams they
-- want to be seen in, and events that asked for sponsorship in those streams
-- are put in front of them. Same edit-link scheme as events and venues.
create table if not exists niagara_tech_week_sponsors (
  id           bigint generated always as identity primary key,
  email        text        not null,
  contact_name text        not null,
  org          text        not null,
  site         text        not null default '',
  support      text[]      not null default '{}',
  streams      text[]      not null default '{}',
  stream_other text        not null default '',
  budget       text        not null default 'unsure',
  goals        text        not null default '',
  notes        text        not null default '',
  status       text        not null default 'proposed',
  edit_hash    text        not null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists ntw_sponsors_status_idx
  on niagara_tech_week_sponsors (status, created_at);

create unique index if not exists ntw_sponsors_edit_hash_idx
  on niagara_tech_week_sponsors (edit_hash);
