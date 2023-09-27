/*
  Warnings:

  - You are about to drop the column `BaseUri` on the `Launchpad` table. All the data in the column will be lost.
  - Added the required column `baseUri` to the `Launchpad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Launchpad" DROP COLUMN "BaseUri",
ADD COLUMN     "baseUri" TEXT NOT NULL;
