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
