/*
  Warnings:

  - You are about to drop the column `Likes` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `Tags` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "Likes",
DROP COLUMN "Tags",
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tags" TEXT[];
