/*
  Warnings:

  - You are about to drop the column `quantityKg` on the `OrderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "stripeCheckoutSessionId" SET DEFAULT '',
ALTER COLUMN "stripePaymentIntentId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "quantityKg",
ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1;
