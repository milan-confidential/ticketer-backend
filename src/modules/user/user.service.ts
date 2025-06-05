import {PrismaClient, Role} from "@prisma/client"

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
        console.error("Error fetching users:", error);
        throw error;
    }
}

export const createUser = async (userData: User) => {
    try {

        return await prisma.user.create({
            data: userData,
        });

    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export const updateUser = async (id: string, userData: Partial<User>) => {
    try {
        return await prisma.user.update({
            where: {id},
            data: userData,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};