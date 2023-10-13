/*
  Warnings:

  - Added the required column `endTime` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
