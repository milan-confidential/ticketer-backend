import { Request, Response } from "express";
import * as userService from "./user.service";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error in /users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required" });
            return;
        }

        const newUser = await userService.createUser({ email, password });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error("Error in /register:", error);
        res.status(500).json({ error: "Registration failed" });
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, email, password, role } = req.body;

        if (!id) {
            res.status(400).json({ error: "User ID is required for update" });
            return;
        }

        const updatedUser = await userService.updateUser(id, { email, password, role });

        res.status(200).json({
            message: "User updated successfully",
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                role: updatedUser.role,
            },
        });
    } catch (error) {
        console.error("Error in /update:", error);
        res.status(500).json({ error: "Update failed" });
    }
};
