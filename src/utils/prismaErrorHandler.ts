import { Prisma } from "@prisma/client";
import { AppError } from "./AppError";
import {PrismaErrorCodes} from "./prismaErrorCodes";

/**
 * Handles known Prisma client errors and throws friendly application errors.
 */
export const handlePrismaError = (error: unknown): never => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case PrismaErrorCodes.UNIQUE_CONSTRAINT_VIOLATION: {
                const field = (error.meta?.target as string[] | undefined)?.join(", ") || "field";
                throw new AppError(`A record with this ${field} already exists.`, 409);
            }
            case PrismaErrorCodes.RECORD_NOT_FOUND: {
                throw new AppError("Record not found.", 404);
            }
            case PrismaErrorCodes.FOREIGN_KEY_VIOLATION: {
                throw new AppError("Invalid reference to related data (foreign key error).", 400);
            }
        }
    }

    throw error;
};
