alter table "public"."destinations" add column "table_configs" jsonb
 not null default jsonb_build_object('institutions', jsonb_build_object(), 'accounts', jsonb_build_object(), 'transactions', jsonb_build_object(), 'holdings', jsonb_build_object(), 'investment_transactions', jsonb_build_object());
