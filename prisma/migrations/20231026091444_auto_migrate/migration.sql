/*
  Warnings:

  - Added the required column `period` to the `Stat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PeriodType" AS ENUM ('H_1', 'H_6', 'H_24', 'D_7', 'ALL');

-- AlterTable
ALTER TABLE "Stat" ADD COLUMN     "period" "PeriodType" NOT NULL;
