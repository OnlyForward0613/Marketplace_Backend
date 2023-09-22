/*
  Warnings:

  - You are about to drop the column `lastName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `status` to the `Launchpad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Launchpad" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "lastName",
DROP COLUMN "name",
ADD COLUMN     "discord" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "reddit" TEXT,
ADD COLUMN     "twitter" TEXT;
