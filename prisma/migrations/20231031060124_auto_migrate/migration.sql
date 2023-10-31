/*
  Warnings:

  - A unique constraint covering the columns `[collectionId]` on the table `Launchpad` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_launchpadId_fkey";

-- AlterTable
ALTER TABLE "Launchpad" ADD COLUMN     "collectionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Launchpad_collectionId_key" ON "Launchpad"("collectionId");

-- AddForeignKey
ALTER TABLE "Launchpad" ADD CONSTRAINT "Launchpad_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
