/*
  Warnings:

  - The values [H_1,H_6,H_24,D_7] on the enum `PeriodType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PeriodType_new" AS ENUM ('HOUR', 'SIX_HOURS', 'DAY', 'WEEK', 'ALL');
ALTER TABLE "Stat" ALTER COLUMN "period" TYPE "PeriodType_new" USING ("period"::text::"PeriodType_new");
ALTER TYPE "PeriodType" RENAME TO "PeriodType_old";
ALTER TYPE "PeriodType_new" RENAME TO "PeriodType";
DROP TYPE "PeriodType_old";
COMMIT;
