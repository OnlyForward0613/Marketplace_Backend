/*
  Warnings:

  - You are about to drop the column `category` on the `Launchpad` table. All the data in the column will be lost.
  - You are about to drop the column `collectionAddress` on the `Launchpad` table. All the data in the column will be lost.
  - You are about to drop the column `coverUrl` on the `Launchpad` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Launchpad` table. All the data in the column will be lost.
  - You are about to drop the column `launchDate` on the `Launchpad` table. All the data in the column will be lost.
  - You are about to drop the column `logoUrl` on the `Launchpad` table. All the data in the column will be lost.
  - You are about to drop the column `royalty` on the `Launchpad` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Launchpad` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Launchpad` table. All the data in the column will be lost.
  - You are about to drop the column `tokenAddress` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `tokenId` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the `CollectionAttribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[address]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[avatarId]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bannerId]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[creatorId]` on the table `Launchpad` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[logoId]` on the table `Launchpad` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `Launchpad` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[collectionId]` on the table `Launchpad` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Launchpad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enableReserveTokens` to the `Launchpad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Launchpad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxPerTx` to the `Launchpad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxPerWallet` to the `Launchpad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `Launchpad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Launchpad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol` to the `Launchpad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wlEnabled` to the `Launchpad` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Launchpad` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `address` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assetUrl` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractType` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minterId` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nftId` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `royalty` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `NFT` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('MINTED', 'LISTED', 'UNLISTED', 'CHANGE_PRICE', 'SOLD', 'CREATED_OFFER', 'CHANGE_OFFER', 'CANCELED_OFFER', 'ACCPETED_OFFER');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('SOLD', 'NEW_OFFER', 'OFFER_ACCEPTED', 'OFFER_REJECTED');

-- CreateEnum
CREATE TYPE "LaunchpadStatus" AS ENUM ('APPLIED', 'ACCEPTED', 'REJECTED', 'PROCESSING', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('CREATED', 'CANCELED', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('ERC721', 'ERC1155');

-- DropForeignKey
ALTER TABLE "CollectionAttribute" DROP CONSTRAINT "CollectionAttribute_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Launchpad" DROP CONSTRAINT "Launchpad_userId_fkey";

-- DropForeignKey
ALTER TABLE "NFT" DROP CONSTRAINT "NFT_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_listingId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_nftId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_sellerId_fkey";

-- DropIndex
DROP INDEX "Launchpad_userId_key";

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "avatarId" TEXT,
ADD COLUMN     "bannerId" TEXT,
ADD COLUMN     "desc" TEXT,
ADD COLUMN     "discord" TEXT,
ADD COLUMN     "network" "Network" NOT NULL,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "Launchpad" DROP COLUMN "category",
DROP COLUMN "collectionAddress",
DROP COLUMN "coverUrl",
DROP COLUMN "imageUrl",
DROP COLUMN "launchDate",
DROP COLUMN "logoUrl",
DROP COLUMN "royalty",
DROP COLUMN "userId",
DROP COLUMN "website",
ADD COLUMN     "collectionId" TEXT,
ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "desc" TEXT,
ADD COLUMN     "enableReserveTokens" BOOLEAN NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "imageId" TEXT,
ADD COLUMN     "logoId" TEXT,
ADD COLUMN     "maxPerTx" INTEGER NOT NULL,
ADD COLUMN     "maxPerWallet" INTEGER NOT NULL,
ADD COLUMN     "network" "Network" NOT NULL,
ADD COLUMN     "ownerRoyalties" INTEGER[],
ADD COLUMN     "owners" TEXT[],
ADD COLUMN     "reddit" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "symbol" TEXT NOT NULL,
ADD COLUMN     "wlAddresses" TEXT[],
ADD COLUMN     "wlEnabled" BOOLEAN NOT NULL,
ALTER COLUMN "mintPrice" SET DATA TYPE BIGINT,
ALTER COLUMN "twitter" DROP NOT NULL,
ALTER COLUMN "discord" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "LaunchpadStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ALTER COLUMN "price" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "NFT" DROP COLUMN "tokenAddress",
DROP COLUMN "tokenId",
DROP COLUMN "userId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "assetUrl" TEXT NOT NULL,
ADD COLUMN     "contractType" "ContractType" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imgUrl" TEXT NOT NULL,
ADD COLUMN     "minterId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "nftId" TEXT NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "royalty" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "CollectionAttribute";

-- DropTable
DROP TABLE "Order";

-- DropEnum
DROP TYPE "CONTRACT_TYPE";

-- DropEnum
DROP TYPE "OrderStatus";

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "buyerId" TEXT,
    "offerPrice" BIGINT NOT NULL,
    "txHash" TEXT,
    "status" "OfferStatus" NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "buyerId" TEXT,
    "price" BIGINT NOT NULL,
    "actionType" "ActivityType" NOT NULL,
    "txHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hide" (
    "id" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationSetting" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "notifyEmail" TEXT NOT NULL,
    "minOfferTokenAddress" TEXT NOT NULL,
    "minOfferThreshold" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "activityId" TEXT NOT NULL,
    "acknowledged" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Offer_id_key" ON "Offer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_id_key" ON "Activity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Hide_id_key" ON "Hide"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_id_key" ON "Like"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationSetting_id_key" ON "NotificationSetting"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationSetting_userId_key" ON "NotificationSetting"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_id_key" ON "Notification"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_activityId_key" ON "Notification"("activityId");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_address_key" ON "Collection"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_avatarId_key" ON "Collection"("avatarId");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_bannerId_key" ON "Collection"("bannerId");

-- CreateIndex
CREATE UNIQUE INDEX "Launchpad_creatorId_key" ON "Launchpad"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "Launchpad_logoId_key" ON "Launchpad"("logoId");

-- CreateIndex
CREATE UNIQUE INDEX "Launchpad_imageId_key" ON "Launchpad"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "Launchpad_collectionId_key" ON "Launchpad"("collectionId");

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_minterId_fkey" FOREIGN KEY ("minterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Launchpad" ADD CONSTRAINT "Launchpad_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Launchpad" ADD CONSTRAINT "Launchpad_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Launchpad" ADD CONSTRAINT "Launchpad_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Launchpad" ADD CONSTRAINT "Launchpad_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hide" ADD CONSTRAINT "Hide_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hide" ADD CONSTRAINT "Hide_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationSetting" ADD CONSTRAINT "NotificationSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
