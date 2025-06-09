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
        return await prisma.user.findMany();
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

/**
 * Changes a user's password after verifying old password and validating new password requirements
 * @param userId - ID of the user changing their password
 * @param oldPassword - Current active password for verification
 * @param newPassword - New password to set
 * @returns Success message or throws an error
 */
export const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
    try {
        // =================================
        // 1. CURRENT PASSWORD VERIFICATION
        // =================================
        // Retrieve the currently active password
        const currentPassword = await prisma.password.findFirst({
            where: {
                userId,
                isActive: true
            },
            select: {
                id: true,
                hash: true
            }
        });

        // Verify an active password exists
        if (!currentPassword) {
            throw new AppError("No active password found", 404);
        }

        // Validate that the provided old password matches
        const isOldPasswordValid = await comparePassword(oldPassword, currentPassword.hash);
        if (!isOldPasswordValid) {
            throw new AppError("Old password is incorrect", 401);
        }

        // ====================================
        // 2. NEW PASSWORD VALIDATION CHECKS
        // ====================================
        // Prevent using the same password as current
        const isSameAsCurrent = await comparePassword(newPassword, currentPassword.hash);
        if (isSameAsCurrent) {
            throw new AppError("New password cannot be the same as current password", 400);
        }

        // Check against recent password history (last 5 passwords)
        const previousPasswords = await prisma.password.findMany({
            where: {
                userId,
                id: { not: currentPassword.id } // Exclude current password
            },
            orderBy: { createdAt: 'desc' }, // Get most recent first
            take: 5, // Limit to last 5 passwords
            select: { hash: true }
        });

        // Verify new password doesn't match any historical passwords
        for (const password of previousPasswords) {
            const isHistoricalMatch = await comparePassword(newPassword, password.hash);
            if (isHistoricalMatch) {
                throw new AppError(
                    "New password cannot be the same as any of your last 5 passwords",
                    400
                );
            }
        }

        // ==============================
        // 3. PASSWORD UPDATE OPERATIONS
        // ==============================
        // Generate secure hash of the new password
        const newPasswordHash = await hashPassword(newPassword);

        // Execute as atomic transaction
        return await prisma.$transaction(async (tx) => {
            // 3a. Deactivate all existing passwords
            await tx.password.updateMany({
                where: { userId },
                data: { isActive: false }
            });

            // 3b. Create new active password record
            await tx.password.create({
                data: {
                    userId,
                    hash: newPasswordHash,
                    isActive: true,
                    createdAt: new Date() // Explicit timestamp
                }
            });

            return {
                message: "Password changed successfully"
            };
        });

    } catch (error) {
        // Handle any errors that occur during the process
        throw handlePrismaError(error);
    }
};

/**
 * Resets a user's password after verifying the new password doesn't match any existing passwords
 * @param email - User's email address
 * @param newPassword - New password to set
 * @returns Success message or throws an error
 */
export const resetPassword = async (email: string, newPassword: string) => {
    try {
        // ======================
        // 1. USER VERIFICATION
        // ======================
        // Find user by email to ensure they exist
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true } // Only select the ID we need
        });

        if (!user) {
            throw new AppError("User not found", 404);
        }

        // ==============================
        // 2. PASSWORD HISTORY VALIDATION
        // ==============================
        // Retrieve all existing passwords for this user
        const existingPasswords = await prisma.password.findMany({
            where: { userId: user.id },
            select: { hash: true } // Only need the hashes for comparison
        });

        // Check if new password matches any existing password (current or historical)
        for (const password of existingPasswords) {
            const isMatch = await comparePassword(newPassword, password.hash);
            if (isMatch) {
                throw new AppError(
                    "New password cannot be the same as current or previous passwords",
                    400
                );
            }
        }

        // ========================
        // 3. PASSWORD UPDATE FLOW
        // ========================
        // Hash the new password before storing
        const newPasswordHash = await hashPassword(newPassword);

        // Execute as a transaction to ensure data consistency
        return await prisma.$transaction(async (tx) => {
            // 3a. Deactivate all existing passwords
            await tx.password.updateMany({
                where: { userId: user.id },
                data: { isActive: false }
            });

            // 3b. Create new active password record
            await tx.password.create({
                data: {
                    userId: user.id,
                    hash: newPasswordHash,
                    isActive: true,
                },
            });

            return { message: "Password reset successfully" };
        });

    } catch (error) {
        // Handle any errors that occur during the process
        throw handlePrismaError(error);
    }
};