import {PrismaClient} from "@prisma/client"
import {comparePassword} from "../../utils/passwordUtils";
import { AppError } from "../../utils/AppError";

const prisma = new PrismaClient();


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
        throw new AppError("Invalid email or password", 401);
    }

    const hashedPassword = user?.passwords?.[0]?.hash;

    // Compare entered password with hashed password
    const isMatch = await comparePassword(plainPassword, hashedPassword);

    if (!isMatch) {
        throw new AppError("Invalid email or password", 401);
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