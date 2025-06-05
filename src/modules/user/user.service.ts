import {PrismaClient, Role} from "@prisma/client"
import {handlePrismaError} from "../../utils/prismaErrorHandler";
import {hashPassword} from "../../utils/passwordUtils";

const prisma = new PrismaClient();

interface User {
    email: string;
    password?: string;
    role?: Role;
}

export const getUsers = async () => {
    try {
        return await prisma.user.findMany({
            include: {
                passwords: true,  // This fetches the related passwords for each user
            },
        });
    } catch (error) {
        throw handlePrismaError(error);
    }
}

/**
 * Create a new user with a hashed password.
 * Stores password separately in the Password table.
 * @returns The created user record
 * @param userData
 */
export const createUser = async (userData: User) => {
    try {

        // Step 1: Create the user without password
        const user = await prisma.user.create({
            data: {
                email: userData.email
            },
        });

        // Step 2: Hash the password
        const hashed = await hashPassword(userData.password || "");

        // Step 3: Save hashed password in Password table
        await prisma.password.create({
            data: {
                userId: user.id,
                hash: hashed,
                isActive: true,
            },
        });

        return user;

    } catch (error) {
        throw handlePrismaError(error);
    }
}

export const updateUser = async (id: string, userData: Partial<User>) => {
    try {
        return await prisma.user.update({
            where: {id},
            data: userData,
        });
    } catch (error) {
        throw handlePrismaError(error);
    }
};