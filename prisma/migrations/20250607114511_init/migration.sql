/*
  Warnings:

  - The values [ALLROUNDER,WICKETKEEPER] on the enum `PlayerRole` will be removed. If these variants are still used in the database, this will fail.
  - The values [ROUNDROBIN] on the enum `SeriesType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlayerRole_new" AS ENUM ('BATSMAN', 'BOWLER', 'ALL_ROUNDER', 'WICKET_KEEPER');
ALTER TABLE "Player" ALTER COLUMN "role" TYPE "PlayerRole_new" USING ("role"::text::"PlayerRole_new");
ALTER TYPE "PlayerRole" RENAME TO "PlayerRole_old";
ALTER TYPE "PlayerRole_new" RENAME TO "PlayerRole";
DROP TYPE "PlayerRole_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SeriesType_new" AS ENUM ('BILATERAL', 'LEAGUE', 'KNOCKOUT', 'ROUND_ROBIN');
ALTER TABLE "Series" ALTER COLUMN "type" TYPE "SeriesType_new" USING ("type"::text::"SeriesType_new");
ALTER TYPE "SeriesType" RENAME TO "SeriesType_old";
ALTER TYPE "SeriesType_new" RENAME TO "SeriesType";
DROP TYPE "SeriesType_old";
COMMIT;
