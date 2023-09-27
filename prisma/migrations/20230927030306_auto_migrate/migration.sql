/*
  Warnings:

  - Added the required column `BaseUri` to the `Launchpad` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Launchpad_creatorId_key";

-- AlterTable
ALTER TABLE "Launchpad" ADD COLUMN     "BaseUri" TEXT NOT NULL;
