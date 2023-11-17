-- CreateEnum
CREATE TYPE "OfferToken" AS ENUM ('BNB', 'ETH');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "minOfferThreshold" TEXT,
ADD COLUMN     "offerToken" "OfferToken";
