/*
  Warnings:

  - You are about to drop the column `txHash` on the `Offer` table. All the data in the column will be lost.
  - Added the required column `signature` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signature` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Made the column `buyerId` on table `Offer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_buyerId_fkey";

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "signature" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "txHash",
ADD COLUMN     "signature" TEXT NOT NULL,
ALTER COLUMN "buyerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
