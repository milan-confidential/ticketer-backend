import {PrismaClient } from "@prisma/client";
import {handlePrismaError} from "../../../utils/prismaErrorHandler";
import {AppError} from "../../../utils/AppError";

const prisma = new PrismaClient();

export const getAll = async () => {
    try {
        return await prisma.series.findMany();
    } catch (error) {
        throw handlePrismaError(error);
    }
};

export const getById = async (seriesId: string) => {
    try {

        const series = await prisma.series.findUnique({
            where: { id: seriesId },
            include: {
                hosts: { include: { country: true } },
                seriesTeams: { include: { team: true } },
                formats: {
                    include: {
                        formatTeams: {
                            include: {
                                team: true,
                                formatTeamPlayers: {
                                    include: {
                                        player: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!series) throw new Error("Series not found");

        return series;

    } catch (error) {
        throw handlePrismaError(error);
    }
};

export const createSeries = async (data: any) => {
    const {
        name,
        description,
        type,
        startDate,
        endDate,
        hostCountryIds,
        seriesFormats,
        seriesTeamIds,
    } = data;

    // Validate required fields
    if (!name || !type || !startDate || !endDate) {
        throw new Error("Missing required fields: name, type, startDate, endDate");
    }

    // Start a transaction to maintain atomicity
    return prisma.$transaction(async (tx) => {
        // 1. Create main Series entry
        const series = await tx.series.create({
            data: {
                name,
                description,
                type,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            },
        });

        // 2. Add host countries if provided
        if (Array.isArray(hostCountryIds) && hostCountryIds.length > 0) {
            const hostData = hostCountryIds.map((countryId) => ({
                seriesId: series.id,
                countryId,
            }));

            await tx.seriesHostCountry.createMany({ data: hostData });
        }

        // 3. Add participating teams if provided
        if (Array.isArray(seriesTeamIds) && seriesTeamIds.length > 0) {
            const teamData = seriesTeamIds.map((teamId) => ({
                seriesId: series.id,
                teamId,
            }));

            await tx.seriesTeam.createMany({ data: teamData });
        }

        // 4. Add formats like ODI, T20, etc., if provided
        if (Array.isArray(seriesFormats) && seriesFormats.length > 0) {
            const formatData = seriesFormats.map((item) => ({
                seriesId: series.id,
                format: item.format,
                matchCount: item.matchCount,
            }));

            await tx.seriesFormat.createMany({ data: formatData });
        }

        // 5. Return the full created series with optional includes
        return tx.series.findUnique({
            where: { id: series.id },
            include: {
                hosts: { include: { country: true } },
                seriesTeams: { include: { team: true } },
                formats: true,
            },
        });
    });
};

export const updateSeries = async (seriesId: string, data: any) => {
    try {
        // Validate required fields
        if (!seriesId) {
            throw new AppError("Series ID is required", 400);
        }

        // Update the series
        return await prisma.series.update({
            where: { id: seriesId },
            data: data
        });
    } catch (error) {
        throw handlePrismaError(error);
    }
};

export const deleteSeries = async (seriesId: string) => {
    try {
        // Validate required fields
        if (!seriesId) {
            throw new AppError("Series ID is required", 400);
        }

        // Delete the series
        return await prisma.series.delete({
            where: { id: seriesId },
        });
    } catch (error) {
        throw handlePrismaError(error);
    }
};

export const updateSeriesHosts = async (seriesId: string, hostCountryIds: string[]) => {
    try {
        // Validate required fields
        if (!seriesId) {
            throw new AppError("Series ID is required", 400);
        }

        await prisma.seriesHostCountry.deleteMany({
            where: { seriesId },
        });

        return await prisma.seriesHostCountry.createMany({
            data: hostCountryIds.map((countryId) => ({
                seriesId,
                countryId,
            })),
        })
    } catch (error) {
        throw handlePrismaError(error);
    }
};

export const updateSeriesTeams = async (seriesId: string, teamIds: string[]) => {
    try {
        // Validate required fields
        if (!seriesId) {
            throw new AppError("Series ID is required", 400);
        }

        await prisma.seriesTeam.deleteMany({
            where: { seriesId },
        });

        return await prisma.seriesTeam.createMany({
            data: teamIds.map((teamId) => ({
                seriesId,
                teamId,
            })),
        });
    } catch (error) {
        throw handlePrismaError(error);
    }
};

export const updateSeriesFormats = async (seriesId: string, formats: any[]) => {
    try {
        // Validate required fields
        if (!seriesId) {
            throw new AppError("Series ID is required", 400);
        }

        await prisma.seriesFormat.deleteMany({
            where: { seriesId },
        });

        return await prisma.seriesFormat.createMany({
            data: formats.map((format) => ({
                seriesId,
                format: format.format,
                matchCount: format.matchCount,
            })),
        });
    } catch (error) {
        throw handlePrismaError(error);
    }
};