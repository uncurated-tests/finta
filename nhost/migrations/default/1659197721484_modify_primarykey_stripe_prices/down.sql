alter table "stripe"."prices" drop constraint "prices_pkey";
alter table "stripe"."prices"
    add constraint "prices_pkey"
    primary key ("product_id");
