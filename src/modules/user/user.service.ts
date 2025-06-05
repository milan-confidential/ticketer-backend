import {PrismaClient, Role} from "@prisma/client"
import {handlePrismaError} from "../../utils/prismaErrorHandler";
import {comparePassword, hashPassword} from "../../utils/passwordUtils";

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

/**
 * Authenticate user by email and password.
 *
 * @param email - User's email from login form
 * @param plainPassword - Password from login form (plaintext)
 * @throws Error if user not found or password invalid
 * @returns User object if authenticated successfully
 */
export const authenticateUser = async (
    email: string,
    plainPassword: string
) => {
    // Fetch user along with active password entry
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            passwords: {
                where: { isActive: true },
                take: 1,
            },
        },
    });

    if (!user || user.passwords.length === 0) {
        throw new Error("Invalid email or password");
    }

    const hashedPassword = user?.passwords?.[0]?.hash;

    // Compare entered password with hashed password
    const isMatch = await comparePassword(plainPassword, hashedPassword);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    // Return user data (without password ideally, you can customize)
    return user;
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
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};