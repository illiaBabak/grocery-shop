-- Empty string is not NULL; @unique + default "" only allowed one Order row.
UPDATE "Order" SET "stripeCheckoutSessionId" = NULL WHERE "stripeCheckoutSessionId" = '';
UPDATE "Order" SET "stripePaymentIntentId" = NULL WHERE "stripePaymentIntentId" = '';
