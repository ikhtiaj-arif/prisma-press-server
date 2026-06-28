-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "status" "CommentStatus" NOT NULL DEFAULT 'APPROVED';
