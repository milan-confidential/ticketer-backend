import {PrismaClient } from "@prisma/client";
import {handlePrismaError} from "../../../utils/prismaErrorHandler";
import {AppError} from "../../../utils/AppError";

const prisma = new PrismaClient();


export const getAll = async () => {
    try {
        return await prisma.player.findMany()
    } catch (error) {
        throw handlePrismaError(error);
    }
}

export const getById = async (id: string) => {
    try {
        return await prisma.player.findUnique({
            where: { id },
        })
    } catch (error) {
        throw handlePrismaError(error);
    }
}

export const createPlayer = async (playerData: any) => {
    try {
        const teamId = playerData?.teamId;
        if (teamId) {
            // Validate that the team exists before creating a player
            const existingTeam = await prisma.team.findUnique({
                where: { id: teamId },
            });
            if (!existingTeam) {
                throw new AppError('Team not found', 404);
            }
        }

        // Create the player
        delete playerData.teamId; // Remove teamId if it's not needed in player data

        const player = await prisma.player.create({
            data: playerData
        });
        // If teamId was provided, link the player to the team
        if (teamId) {
            await prisma.playerTeam.create({
                data: {
                    playerId: player.id,
                    teamId: teamId,
                    startDate: new Date(), // you can allow this as input too
                },
            });
        }
        return player;
    } catch (error) {
        throw handlePrismaError(error);
    }
}

export const updatePlayer = async (id: string, playerData: any) => {
    try {

        // Validate that the player exists before updating
        const existingPlayer = await prisma.player.findUnique({
            where: { id },
        });
        if (!existingPlayer) {
            throw new AppError('Player not found', 404);
        }

        return await prisma.player.update({
            where: { id },
            data: playerData
        });
    } catch (error) {
        throw handlePrismaError(error);
    }
}

export const deletePlayer = async (id: string) => {
    try {
        // Validate that the player exists before deleting
        const existingPlayer = await prisma.player.findUnique({
            where: { id },
        });
        if (!existingPlayer) {
            throw new AppError('Player not found', 404);
        }

        // Delete any player-team relationships first
        await prisma.playerTeam.deleteMany({
            where: { playerId: id },
        });

        return await prisma.player.delete({
            where: { id },
        });
    } catch (error) {
        throw handlePrismaError(error);
    }
}

export const getPlayersByTeam = async (teamId: string) => {
    try {

        const playerTeams = await prisma.playerTeam.findMany({
            where: { teamId, },
            select: {
                startDate: true,
                endDate: true,
                teamId: true,
                player: {
                    select: {
                        id: true,
                        fullName: true,
                        dob: true,
                        country: true,
                        battingStyle: true,
                        bowlingStyle: true,
                        role: true,
                        active: true,
                    },
                },
            },
        });

        // Clean transformation
        return playerTeams.map((pt) => {
            const { player, startDate, endDate, teamId } = pt;

            return {
                ...player,
                teamInfo: {
                    teamId,
                    startDate,
                    endDate,
                },
            };
        });

    } catch (error) {
        throw handlePrismaError(error);
    }
}