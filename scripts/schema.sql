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
