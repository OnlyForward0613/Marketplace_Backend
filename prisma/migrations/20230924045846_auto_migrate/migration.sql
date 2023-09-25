/*
  Warnings:

  - You are about to drop the column `lastName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "lastName",
DROP COLUMN "name",
ADD COLUMN     "discord" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "reddit" TEXT,
ADD COLUMN     "twitter" TEXT;

-- CreateTable
CREATE TABLE "Launchpad" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "coverUrl" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "launchDate" INTEGER NOT NULL,
    "mintPrice" INTEGER NOT NULL,
    "twitter" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "supply" INTEGER NOT NULL,
    "royalty" INTEGER NOT NULL,
    "collectionAddress" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Launchpad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Launchpad_id_key" ON "Launchpad"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Launchpad_userId_key" ON "Launchpad"("userId");

-- AddForeignKey
ALTER TABLE "Launchpad" ADD CONSTRAINT "Launchpad_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
