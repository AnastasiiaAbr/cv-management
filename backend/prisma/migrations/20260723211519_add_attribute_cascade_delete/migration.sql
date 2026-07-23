-- DropForeignKey
ALTER TABLE "CVAttributeValue" DROP CONSTRAINT "CVAttributeValue_attributeId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileAttributeValue" DROP CONSTRAINT "ProfileAttributeValue_attributeId_fkey";

-- AddForeignKey
ALTER TABLE "CVAttributeValue" ADD CONSTRAINT "CVAttributeValue_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileAttributeValue" ADD CONSTRAINT "ProfileAttributeValue_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
