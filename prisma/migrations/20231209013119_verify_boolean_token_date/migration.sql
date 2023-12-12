-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerifed" TEXT,
ADD COLUMN     "verifyDate" TIMESTAMP(3),
ADD COLUMN     "verifyToken" TEXT;
