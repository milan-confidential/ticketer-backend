/*
  Warnings:

  - You are about to drop the column `teamId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `seriesFormatId` on the `SeriesFormatTeamPlayer` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `SeriesFormatTeamPlayer` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `SeriesHostCountry` table. All the data in the column will be lost.
  - You are about to drop the column `countryCode` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[seriesId,format]` on the table `SeriesFormat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[seriesFormatId,teamId]` on the table `SeriesFormatTeam` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[seriesFormatTeamId,playerId]` on the table `SeriesFormatTeamPlayer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[seriesId,countryId]` on the table `SeriesHostCountry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `countryId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SeriesFormatTeam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seriesFormatTeamId` to the `SeriesFormatTeamPlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SeriesFormatTeamPlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `SeriesHostCountry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_teamId_fkey";

-- DropForeignKey
ALTER TABLE "SeriesFormatTeamPlayer" DROP CONSTRAINT "SeriesFormatTeamPlayer_seriesFormatId_fkey";

-- DropForeignKey
ALTER TABLE "SeriesFormatTeamPlayer" DROP CONSTRAINT "SeriesFormatTeamPlayer_teamId_fkey";

-- DropForeignKey
ALTER TABLE "SeriesHostCountry" DROP CONSTRAINT "SeriesHostCountry_teamId_fkey";

-- DropIndex
DROP INDEX "PlayerTeam_playerId_endDate_idx";

-- DropIndex
DROP INDEX "Series_startDate_endDate_idx";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "teamId",
ADD COLUMN     "countryId" TEXT NOT NULL,
ALTER COLUMN "battingStyle" DROP NOT NULL,
ALTER COLUMN "bowlingStyle" DROP NOT NULL,
ALTER COLUMN "active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "SeriesFormatTeam" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SeriesFormatTeamPlayer" DROP COLUMN "seriesFormatId",
DROP COLUMN "teamId",
ADD COLUMN     "seriesFormatTeamId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SeriesHostCountry" DROP COLUMN "teamId",
ADD COLUMN     "countryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "countryCode",
ADD COLUMN     "countryId" TEXT;

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "flagUrl" TEXT,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeriesTeam" (
    "id" TEXT NOT NULL,
    "seriesId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "SeriesTeam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE UNIQUE INDEX "SeriesTeam_seriesId_teamId_key" ON "SeriesTeam"("seriesId", "teamId");

-- CreateIndex
CREATE INDEX "PlayerTeam_playerId_idx" ON "PlayerTeam"("playerId");

-- CreateIndex
CREATE INDEX "PlayerTeam_teamId_idx" ON "PlayerTeam"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "SeriesFormat_seriesId_format_key" ON "SeriesFormat"("seriesId", "format");

-- CreateIndex
CREATE UNIQUE INDEX "SeriesFormatTeam_seriesFormatId_teamId_key" ON "SeriesFormatTeam"("seriesFormatId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "SeriesFormatTeamPlayer_seriesFormatTeamId_playerId_key" ON "SeriesFormatTeamPlayer"("seriesFormatTeamId", "playerId");

-- CreateIndex
CREATE UNIQUE INDEX "SeriesHostCountry_seriesId_countryId_key" ON "SeriesHostCountry"("seriesId", "countryId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesHostCountry" ADD CONSTRAINT "SeriesHostCountry_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesTeam" ADD CONSTRAINT "SeriesTeam_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesTeam" ADD CONSTRAINT "SeriesTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesFormatTeamPlayer" ADD CONSTRAINT "SeriesFormatTeamPlayer_seriesFormatTeamId_fkey" FOREIGN KEY ("seriesFormatTeamId") REFERENCES "SeriesFormatTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
