alter table "stripe"."plans" alter column "updated_at" drop not null;
alter table "stripe"."plans" add column "updated_at" timestamptz;
