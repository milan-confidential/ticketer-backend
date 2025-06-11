-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('SCHEDULED', 'LIVE', 'COMPLETED', 'CANCELLED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "TossDecision" AS ENUM ('BAT', 'BOWL');

-- CreateEnum
CREATE TYPE "ResultType" AS ENUM ('WIN', 'LOSS', 'DRAW', 'TIE', 'NO_RESULT');

-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "capacity" INTEGER,
    "pitchType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "seriesId" TEXT NOT NULL,
    "seriesFormatId" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "team1Id" TEXT NOT NULL,
    "team2Id" TEXT NOT NULL,
    "matchDate" TIMESTAMP(3) NOT NULL,
    "format" "MatchFormat" NOT NULL,
    "status" "MatchStatus" NOT NULL DEFAULT 'SCHEDULED',
    "matchSummary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Toss" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "winningTeamId" TEXT NOT NULL,
    "decision" "TossDecision" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Toss_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchSquad" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "isCaptain" BOOLEAN NOT NULL DEFAULT false,
    "isWicketkeeper" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchSquad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Innings" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "inningsOrder" INTEGER NOT NULL,
    "battingTeamId" TEXT NOT NULL,
    "bowlingTeamId" TEXT NOT NULL,
    "totalRuns" INTEGER NOT NULL,
    "wickets" INTEGER NOT NULL,
    "overs" DOUBLE PRECISION NOT NULL,
    "extrasByes" INTEGER NOT NULL DEFAULT 0,
    "extrasLegByes" INTEGER NOT NULL DEFAULT 0,
    "extrasWides" INTEGER NOT NULL DEFAULT 0,
    "extrasNoBalls" INTEGER NOT NULL DEFAULT 0,
    "extrasPenalty" INTEGER NOT NULL DEFAULT 0,
    "declared" BOOLEAN NOT NULL DEFAULT false,
    "inningsDuration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Innings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BattingScorecard" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "seriesId" TEXT NOT NULL,
    "inningsId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "battingPosition" INTEGER,
    "runs" INTEGER NOT NULL,
    "ballsFaced" INTEGER NOT NULL,
    "fours" INTEGER NOT NULL,
    "sixes" INTEGER NOT NULL,
    "outType" TEXT NOT NULL,
    "dismissalBowlerId" TEXT,
    "dismissalFielderId" TEXT,
    "dismissalOver" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BattingScorecard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BowlingScorecard" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "seriesId" TEXT NOT NULL,
    "inningsId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "overs" DOUBLE PRECISION NOT NULL,
    "maidens" INTEGER NOT NULL,
    "runsConceded" INTEGER NOT NULL,
    "wickets" INTEGER NOT NULL,
    "wides" INTEGER NOT NULL,
    "noballs" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BowlingScorecard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchResult" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "resultType" "ResultType" NOT NULL,
    "winningTeamId" TEXT,
    "margin" TEXT NOT NULL,
    "playerOfMatchId" TEXT,
    "matchHighlights" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Venue_countryId_idx" ON "Venue"("countryId");

-- CreateIndex
CREATE INDEX "Match_seriesId_matchDate_idx" ON "Match"("seriesId", "matchDate");

-- CreateIndex
CREATE INDEX "Match_venueId_matchDate_idx" ON "Match"("venueId", "matchDate");

-- CreateIndex
CREATE INDEX "Match_team1Id_matchDate_idx" ON "Match"("team1Id", "matchDate");

-- CreateIndex
CREATE INDEX "Match_team2Id_matchDate_idx" ON "Match"("team2Id", "matchDate");

-- CreateIndex
CREATE UNIQUE INDEX "Toss_matchId_key" ON "Toss"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchSquad_matchId_teamId_playerId_key" ON "MatchSquad"("matchId", "teamId", "playerId");

-- CreateIndex
CREATE UNIQUE INDEX "Innings_matchId_inningsOrder_key" ON "Innings"("matchId", "inningsOrder");

-- CreateIndex
CREATE INDEX "BattingScorecard_playerId_idx" ON "BattingScorecard"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "BattingScorecard_inningsId_playerId_key" ON "BattingScorecard"("inningsId", "playerId");

-- CreateIndex
CREATE INDEX "BowlingScorecard_playerId_idx" ON "BowlingScorecard"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "BowlingScorecard_inningsId_playerId_key" ON "BowlingScorecard"("inningsId", "playerId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchResult_matchId_key" ON "MatchResult"("matchId");

-- CreateIndex
CREATE INDEX "Team_countryId_idx" ON "Team"("countryId");

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_seriesFormatId_fkey" FOREIGN KEY ("seriesFormatId") REFERENCES "SeriesFormat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Toss" ADD CONSTRAINT "Toss_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Toss" ADD CONSTRAINT "Toss_winningTeamId_fkey" FOREIGN KEY ("winningTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSquad" ADD CONSTRAINT "MatchSquad_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSquad" ADD CONSTRAINT "MatchSquad_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSquad" ADD CONSTRAINT "MatchSquad_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Innings" ADD CONSTRAINT "Innings_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Innings" ADD CONSTRAINT "Innings_battingTeamId_fkey" FOREIGN KEY ("battingTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Innings" ADD CONSTRAINT "Innings_bowlingTeamId_fkey" FOREIGN KEY ("bowlingTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattingScorecard" ADD CONSTRAINT "BattingScorecard_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattingScorecard" ADD CONSTRAINT "BattingScorecard_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattingScorecard" ADD CONSTRAINT "BattingScorecard_inningsId_fkey" FOREIGN KEY ("inningsId") REFERENCES "Innings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattingScorecard" ADD CONSTRAINT "BattingScorecard_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattingScorecard" ADD CONSTRAINT "BattingScorecard_dismissalBowlerId_fkey" FOREIGN KEY ("dismissalBowlerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattingScorecard" ADD CONSTRAINT "BattingScorecard_dismissalFielderId_fkey" FOREIGN KEY ("dismissalFielderId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BowlingScorecard" ADD CONSTRAINT "BowlingScorecard_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BowlingScorecard" ADD CONSTRAINT "BowlingScorecard_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BowlingScorecard" ADD CONSTRAINT "BowlingScorecard_inningsId_fkey" FOREIGN KEY ("inningsId") REFERENCES "Innings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BowlingScorecard" ADD CONSTRAINT "BowlingScorecard_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_winningTeamId_fkey" FOREIGN KEY ("winningTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_playerOfMatchId_fkey" FOREIGN KEY ("playerOfMatchId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
