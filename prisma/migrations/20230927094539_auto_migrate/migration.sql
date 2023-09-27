/*
  Warnings:

  - You are about to drop the column `collectionId` on the `Launchpad` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[launchpadId]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `collectionUri` to the `Launchpad` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Launchpad" DROP CONSTRAINT "Launchpad_collectionId_fkey";

-- DropIndex
DROP INDEX "Launchpad_collectionId_key";

-- DropIndex
DROP INDEX "Launchpad_creatorId_key";

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "launchpadId" TEXT;

-- AlterTable
ALTER TABLE "Launchpad" DROP COLUMN "collectionId",
ADD COLUMN     "collectionUri" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Collection_launchpadId_key" ON "Collection"("launchpadId");

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_launchpadId_fkey" FOREIGN KEY ("launchpadId") REFERENCES "Launchpad"("id") ON DELETE SET NULL ON UPDATE CASCADE;
