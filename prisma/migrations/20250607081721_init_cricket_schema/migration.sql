-- CreateEnum
CREATE TYPE "CountryCode" AS ENUM ('IND', 'AUS', 'ENG', 'PAK', 'SA', 'NZ', 'SL', 'BAN', 'WI', 'AFG', 'ZIM', 'IRE', 'NAM', 'SCO', 'NEP');

-- CreateEnum
CREATE TYPE "TeamType" AS ENUM ('International', 'Domestic', 'League');

-- CreateEnum
CREATE TYPE "SeriesType" AS ENUM ('Bilateral', 'League', 'Knockout', 'RoundRobin');

-- CreateEnum
CREATE TYPE "MatchFormat" AS ENUM ('Test', 'ODI', 'T20');

-- CreateEnum
CREATE TYPE "PlayerRole" AS ENUM ('Batsman', 'Bowler', 'AllRounder', 'Wicketkeeper');

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" "CountryCode" NOT NULL,
    "type" "TeamType" NOT NULL,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "country" "CountryCode" NOT NULL,
    "battingStyle" TEXT NOT NULL,
    "bowlingStyle" TEXT NOT NULL,
    "role" "PlayerRole" NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerTeam" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayerTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "SeriesType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeriesHostCountry" (
    "id" TEXT NOT NULL,
    "seriesId" TEXT NOT NULL,
    "country" "CountryCode" NOT NULL,

    CONSTRAINT "SeriesHostCountry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeriesFormat" (
    "id" TEXT NOT NULL,
    "seriesId" TEXT NOT NULL,
    "format" "MatchFormat" NOT NULL,
    "matchCount" INTEGER NOT NULL,

    CONSTRAINT "SeriesFormat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeriesFormatTeam" (
    "id" TEXT NOT NULL,
    "seriesFormatId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "SeriesFormatTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeriesFormatTeamPlayer" (
    "id" TEXT NOT NULL,
    "seriesFormatId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "isCaptain" BOOLEAN NOT NULL DEFAULT false,
    "isWicketkeeper" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SeriesFormatTeamPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlayerTeam_playerId_endDate_idx" ON "PlayerTeam"("playerId", "endDate");

-- CreateIndex
CREATE INDEX "Series_startDate_endDate_idx" ON "Series"("startDate", "endDate");

-- AddForeignKey
ALTER TABLE "PlayerTeam" ADD CONSTRAINT "PlayerTeam_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTeam" ADD CONSTRAINT "PlayerTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesHostCountry" ADD CONSTRAINT "SeriesHostCountry_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesFormat" ADD CONSTRAINT "SeriesFormat_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesFormatTeam" ADD CONSTRAINT "SeriesFormatTeam_seriesFormatId_fkey" FOREIGN KEY ("seriesFormatId") REFERENCES "SeriesFormat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesFormatTeam" ADD CONSTRAINT "SeriesFormatTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesFormatTeamPlayer" ADD CONSTRAINT "SeriesFormatTeamPlayer_seriesFormatId_fkey" FOREIGN KEY ("seriesFormatId") REFERENCES "SeriesFormat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesFormatTeamPlayer" ADD CONSTRAINT "SeriesFormatTeamPlayer_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesFormatTeamPlayer" ADD CONSTRAINT "SeriesFormatTeamPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
