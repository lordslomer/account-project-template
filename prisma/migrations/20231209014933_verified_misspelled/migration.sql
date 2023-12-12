/*
  Warnings:

  - You are about to drop the column `VerifiyDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `VerifiyToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "VerifiyDate",
DROP COLUMN "VerifiyToken",
ADD COLUMN     "verifyDate" TIMESTAMP(3),
ADD COLUMN     "verifyToken" TEXT;
