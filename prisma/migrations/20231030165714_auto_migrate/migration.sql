/*
  Warnings:

  - You are about to drop the column `photoId` on the `FileEntity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FileEntity" DROP CONSTRAINT "FileEntity_photoId_fkey";

-- DropIndex
DROP INDEX "FileEntity_photoId_key";

-- AlterTable
ALTER TABLE "FileEntity" DROP COLUMN "photoId";

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_fileEntityId_fkey" FOREIGN KEY ("fileEntityId") REFERENCES "FileEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
