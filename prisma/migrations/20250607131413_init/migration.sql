/*
  Warnings:

  - You are about to drop the column `country` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `SeriesHostCountry` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Team` table. All the data in the column will be lost.
  - Added the required column `teamId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `SeriesHostCountry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "country",
ADD COLUMN     "teamId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SeriesHostCountry" DROP COLUMN "country",
ADD COLUMN     "teamId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "country";

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesHostCountry" ADD CONSTRAINT "SeriesHostCountry_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
