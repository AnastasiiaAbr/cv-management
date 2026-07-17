-- CreateTable
CREATE TABLE "_AttributeToPosition" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AttributeToPosition_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AttributeToPosition_B_index" ON "_AttributeToPosition"("B");

-- AddForeignKey
ALTER TABLE "_AttributeToPosition" ADD CONSTRAINT "_AttributeToPosition_A_fkey" FOREIGN KEY ("A") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttributeToPosition" ADD CONSTRAINT "_AttributeToPosition_B_fkey" FOREIGN KEY ("B") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;
