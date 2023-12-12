/*
  Warnings:

  - The `isVerifed` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isVerifed",
ADD COLUMN     "isVerifed" BOOLEAN NOT NULL DEFAULT false;
