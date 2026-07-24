/*
  Warnings:

  - You are about to drop the column `title` on the `cv` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cv" DROP COLUMN "title";

-- CreateTable
CREATE TABLE "CVProject" (
    "cvId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "CVProject_pkey" PRIMARY KEY ("cvId","projectId")
);

-- AddForeignKey
ALTER TABLE "CVProject" ADD CONSTRAINT "CVProject_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CVProject" ADD CONSTRAINT "CVProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
