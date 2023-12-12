/*
  Warnings:

  - You are about to drop the column `isVerifed` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isVerifed",
DROP COLUMN "verifyDate",
DROP COLUMN "verifyToken",
ADD COLUMN     "VerifiyDate" TIMESTAMP(3),
ADD COLUMN     "VerifiyToken" TEXT,
ADD COLUMN     "isVerifiied" BOOLEAN NOT NULL DEFAULT false;
