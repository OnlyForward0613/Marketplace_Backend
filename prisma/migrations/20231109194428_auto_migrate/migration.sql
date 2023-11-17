/*
  Warnings:

  - You are about to drop the `NotificationSetting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NotificationSetting" DROP CONSTRAINT "NotificationSetting_userId_fkey";

-- DropTable
DROP TABLE "NotificationSetting";
