-- CreateTable
CREATE TABLE "ProfileAttributeValue" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "attributeId" INTEGER NOT NULL,
    "value" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfileAttributeValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfileAttributeValue_profileId_attributeId_key" ON "ProfileAttributeValue"("profileId", "attributeId");

-- AddForeignKey
ALTER TABLE "ProfileAttributeValue" ADD CONSTRAINT "ProfileAttributeValue_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileAttributeValue" ADD CONSTRAINT "ProfileAttributeValue_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
