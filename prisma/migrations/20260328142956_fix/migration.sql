-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "stripeCheckoutSessionId" DROP DEFAULT,
ALTER COLUMN "stripePaymentIntentId" DROP DEFAULT;
