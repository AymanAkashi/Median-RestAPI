-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "countArticles" INTEGER NOT NULL DEFAULT 0;
