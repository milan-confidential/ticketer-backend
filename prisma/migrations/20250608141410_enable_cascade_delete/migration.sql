-- DropForeignKey
ALTER TABLE "SeriesFormat" DROP CONSTRAINT "SeriesFormat_seriesId_fkey";

-- DropForeignKey
ALTER TABLE "SeriesFormatTeam" DROP CONSTRAINT "SeriesFormatTeam_seriesFormatId_fkey";

-- DropForeignKey
ALTER TABLE "SeriesFormatTeamPlayer" DROP CONSTRAINT "SeriesFormatTeamPlayer_seriesFormatTeamId_fkey";

-- DropForeignKey
ALTER TABLE "SeriesHostCountry" DROP CONSTRAINT "SeriesHostCountry_seriesId_fkey";

-- DropForeignKey
ALTER TABLE "SeriesTeam" DROP CONSTRAINT "SeriesTeam_seriesId_fkey";

-- AddForeignKey
ALTER TABLE "SeriesHostCountry" ADD CONSTRAINT "SeriesHostCountry_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesTeam" ADD CONSTRAINT "SeriesTeam_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesFormat" ADD CONSTRAINT "SeriesFormat_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesFormatTeam" ADD CONSTRAINT "SeriesFormatTeam_seriesFormatId_fkey" FOREIGN KEY ("seriesFormatId") REFERENCES "SeriesFormat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesFormatTeamPlayer" ADD CONSTRAINT "SeriesFormatTeamPlayer_seriesFormatTeamId_fkey" FOREIGN KEY ("seriesFormatTeamId") REFERENCES "SeriesFormatTeam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
