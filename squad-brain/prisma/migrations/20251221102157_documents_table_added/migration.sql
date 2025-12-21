-- AlterTable
ALTER TABLE "SCHEMA"."Project" ADD COLUMN     "creatorName" TEXT;

-- CreateTable
CREATE TABLE "SCHEMA"."Documents" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SCHEMA"."Documents" ADD CONSTRAINT "Documents_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "SCHEMA"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
