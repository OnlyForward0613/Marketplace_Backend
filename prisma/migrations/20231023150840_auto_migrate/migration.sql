/*
  Warnings:

  - Added the required column `supply` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "supply" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Stat" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "owners" INTEGER NOT NULL,
    "listedItems" INTEGER NOT NULL,
    "salesItems" INTEGER NOT NULL,
    "floorPrice" BIGINT NOT NULL,
    "volume" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stat_id_key" ON "Stat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Stat_collectionId_key" ON "Stat"("collectionId");

-- AddForeignKey
ALTER TABLE "Stat" ADD CONSTRAINT "Stat_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
