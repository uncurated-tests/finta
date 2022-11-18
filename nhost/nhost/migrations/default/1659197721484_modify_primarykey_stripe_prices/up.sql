BEGIN TRANSACTION;
ALTER TABLE "stripe"."prices" DROP CONSTRAINT "prices_pkey";

ALTER TABLE "stripe"."prices"
    ADD CONSTRAINT "prices_pkey" PRIMARY KEY ("id");
COMMIT TRANSACTION;
