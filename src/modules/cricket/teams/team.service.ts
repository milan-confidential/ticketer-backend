import {PrismaClient, TeamType } from "@prisma/client";
import {handlePrismaError} from "../../../utils/prismaErrorHandler";
import {AppError} from "../../../utils/AppError";

const prisma = new PrismaClient();

interface Team {
    name: string;
    type: TeamType;
}

export const getAll = async () => {
    try {
        return await prisma.team.findMany();
    } catch (error) {
        throw handlePrismaError(error);
    }
}

export const getById = async (teamId: string) => {
    try {
        return await prisma.team.findUnique({
            where: { id: teamId },
        })
    } catch (error) {
        throw handlePrismaError(error);
    }
}

export const createTeam = async (teamData: Team) => {
    try {
        return await prisma.team.create({
            data: teamData
        });
    } catch (error) {
        throw handlePrismaError(error);
    }
}

export const updateTeam = async (teamId: string, teamData: Team) => {
    try {

        // Validate that the team exists before updating
        const existingTeam = await prisma.team.findUnique({
            where: { id: teamId },
        });
        if (!existingTeam) {
            throw new AppError('Team not found', 404);
        }

        return await prisma.team.update({
            where: { id: teamId },
            data: teamData
        });
    } catch (error) {
        throw handlePrismaError(error);
    }
}

export const deleteTeam = async (teamId: string) => {
    try {
        // Validate that the team exists before deleting
        const existingTeam = await prisma.team.findUnique({
            where: { id: teamId },
        });
        if (!existingTeam) {
            throw new AppError('Team not found', 404);
        }

        return await prisma.team.delete({
            where: { id: teamId },
        });
    } catch (error) {
        throw handlePrismaError(error);
    }
}