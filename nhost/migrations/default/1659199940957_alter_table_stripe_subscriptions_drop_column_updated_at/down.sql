alter table "stripe"."subscriptions" alter column "updated_at" drop not null;
alter table "stripe"."subscriptions" add column "updated_at" timestamptz;
