import {PrismaClient, TeamType } from "@prisma/client";
import {handlePrismaError} from "../../../utils/prismaErrorHandler";
import {AppError} from "../../../utils/AppError";

const prisma = new PrismaClient();

interface Country {
    name: string;
    code: string
}

export const getAll = async () => {
    try {
        return await prisma.country.findMany();
    } catch (error) {
        throw handlePrismaError(error);
    }
};

export const getById = async (countryId: string) => {
    try {
        return await prisma.country.findUnique({
            where: { id: countryId },
        });
    } catch (error) {
        throw handlePrismaError(error);
    }
};

export const createCountry = async (countryData: Country) => {
    try {
        return await prisma.country.create({
            data: countryData
        });
    } catch (error) {
        throw handlePrismaError(error);
    }
};

export const updateCountry = async (countryId: string, countryData: Country) => {
    try {
        // Validate that the country exists before updating
        const existingCountry = await prisma.country.findUnique({
            where: { id: countryId },
        });
        if (!existingCountry) {
            throw new AppError('Country not found', 404);
        }

        return await prisma.country.update({
            where: { id: countryId },
            data: countryData
        });
    } catch (error) {
        throw handlePrismaError(error);
    }
};

export const deleteCountry = async (countryId: string) => {
    try {
        // Validate that the country exists before deleting
        const existingCountry = await prisma.country.findUnique({
            where: { id: countryId },
        });
        if (!existingCountry) {
            throw new AppError('Country not found', 404);
        }

        return await prisma.country.delete({
            where: { id: countryId },
        });
    } catch (error) {
        throw handlePrismaError(error);
    }
}