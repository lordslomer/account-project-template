-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetDate" TIMESTAMP(3),
ADD COLUMN     "resetToken" TEXT;
