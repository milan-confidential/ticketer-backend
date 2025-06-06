import {PrismaClient, Role} from "@prisma/client"
import {handlePrismaError} from "../../utils/prismaErrorHandler";
import {hashPassword, comparePassword} from "../../utils/passwordUtils";
import {AppError} from "../../utils/AppError";

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

export const getUserById = async (id: string) => {
    try {
        return await prisma.user.findUnique({
            where: {id},
            select: {
                id: true,
                email: true,
                role: true,
            }
        });
    } catch (error) {
        throw handlePrismaError(error);
    }
};

export const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
    try {
        // 1. Verify current password
        const currentPassword = await prisma.password.findFirst({
            where: { userId, isActive: true },
            select: { id: true, hash: true }
        });

        if (!currentPassword) throw new AppError("No active password found", 404);

        if (!await comparePassword(oldPassword, currentPassword.hash)) {
            throw new AppError("Old password is incorrect", 401);
        }

        // 2. Check if new password matches current
        if (await comparePassword(newPassword, currentPassword.hash)) {
            throw new AppError("New password cannot be same as current", 400);
        }

        // 3. Check against password history (last 5 passwords)
        const previousPasswords = await prisma.password.findMany({
            where: {
                userId,
                id: { not: currentPassword.id }
            },
            orderBy: { createdAt: 'desc' },
            take: 5,
            select: { hash: true }
        });

        for (const p of previousPasswords) {
            if (await comparePassword(newPassword, p.hash)) {
                throw new AppError("New password cannot be same as any of the last 5 passwords", 400);
            }
        }

        // 4. Hash the new password
        const newHash = await hashPassword(newPassword);

        // 5. Perform the password change in a transaction
        return await prisma.$transaction(async (prisma) => {
            // Deactivate all passwords for this user
            await prisma.password.updateMany({
                where: { userId },
                data: { isActive: false }
            });

            // Create new active password
            await prisma.password.create({
                data: {
                    userId,
                    hash: newHash,
                    isActive: true
                }
            });

            return { message: "Password changed successfully" };
        });

    } catch (error) {
        throw handlePrismaError(error);
    }
}