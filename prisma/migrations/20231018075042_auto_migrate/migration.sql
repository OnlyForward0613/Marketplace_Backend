/*
  Warnings:

  - You are about to drop the column `address` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `assetUrl` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `imgUrl` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `nftId` on the `NFT` table. All the data in the column will be lost.
  - Added the required column `image` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenAddress` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenId` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenUri` to the `NFT` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NFT" DROP COLUMN "address",
DROP COLUMN "assetUrl",
DROP COLUMN "imgUrl",
DROP COLUMN "nftId",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "tokenAddress" TEXT NOT NULL,
ADD COLUMN     "tokenId" TEXT NOT NULL,
ADD COLUMN     "tokenUri" TEXT NOT NULL;
