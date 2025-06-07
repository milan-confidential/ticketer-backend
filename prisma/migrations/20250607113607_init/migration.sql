/*
  Warnings:

  - The values [Test] on the enum `MatchFormat` will be removed. If these variants are still used in the database, this will fail.
  - The values [Batsman,Bowler,AllRounder,Wicketkeeper] on the enum `PlayerRole` will be removed. If these variants are still used in the database, this will fail.
  - The values [Bilateral,League,Knockout,RoundRobin] on the enum `SeriesType` will be removed. If these variants are still used in the database, this will fail.
  - The values [International,Domestic,League] on the enum `TeamType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MatchFormat_new" AS ENUM ('TEST', 'ODI', 'T20');
ALTER TABLE "SeriesFormat" ALTER COLUMN "format" TYPE "MatchFormat_new" USING ("format"::text::"MatchFormat_new");
ALTER TYPE "MatchFormat" RENAME TO "MatchFormat_old";
ALTER TYPE "MatchFormat_new" RENAME TO "MatchFormat";
DROP TYPE "MatchFormat_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PlayerRole_new" AS ENUM ('BATSMAN', 'BOWLER', 'ALLROUNDER', 'WICKETKEEPER');
ALTER TABLE "Player" ALTER COLUMN "role" TYPE "PlayerRole_new" USING ("role"::text::"PlayerRole_new");
ALTER TYPE "PlayerRole" RENAME TO "PlayerRole_old";
ALTER TYPE "PlayerRole_new" RENAME TO "PlayerRole";
DROP TYPE "PlayerRole_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SeriesType_new" AS ENUM ('BILATERAL', 'LEAGUE', 'KNOCKOUT', 'ROUNDROBIN');
ALTER TABLE "Series" ALTER COLUMN "type" TYPE "SeriesType_new" USING ("type"::text::"SeriesType_new");
ALTER TYPE "SeriesType" RENAME TO "SeriesType_old";
ALTER TYPE "SeriesType_new" RENAME TO "SeriesType";
DROP TYPE "SeriesType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TeamType_new" AS ENUM ('INTERNATIONAL', 'DOMESTIC', 'LEAGUE');
ALTER TABLE "Team" ALTER COLUMN "type" TYPE "TeamType_new" USING ("type"::text::"TeamType_new");
ALTER TYPE "TeamType" RENAME TO "TeamType_old";
ALTER TYPE "TeamType_new" RENAME TO "TeamType";
DROP TYPE "TeamType_old";
COMMIT;
