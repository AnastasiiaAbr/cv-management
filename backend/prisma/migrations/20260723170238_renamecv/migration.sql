/*
  Warnings:

  - You are about to drop the `CV` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CV" DROP CONSTRAINT "CV_positionId_fkey";

-- DropForeignKey
ALTER TABLE "CV" DROP CONSTRAINT "CV_profileId_fkey";

-- DropForeignKey
ALTER TABLE "CVAttributeValue" DROP CONSTRAINT "CVAttributeValue_cvId_fkey";

-- DropTable
DROP TABLE "CV";

-- CreateTable
CREATE TABLE "cv" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    "positionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cv_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cv_profileId_positionId_key" ON "cv"("profileId", "positionId");

-- AddForeignKey
ALTER TABLE "cv" ADD CONSTRAINT "cv_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cv" ADD CONSTRAINT "cv_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CVAttributeValue" ADD CONSTRAINT "CVAttributeValue_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;
