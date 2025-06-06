import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import {AppError} from "../../utils/AppError";

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            throw new AppError("Email and password are required", 400);
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
        next(error);
    }
}

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id, email, password, role } = req.body;

        if (!id) {
            throw new AppError("User ID is required for update", 400);
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
        next(error)
    }
};

/**
 * Controller to get logged-in user's profile
 */
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Assuming you have userId stored in req.user from auth middleware
        const userId = req.user?.id;
        if (!userId) {
            throw new AppError("Unauthorized", 401);
        }

        const user = await userService.getUserById(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = req.user?.id;
        const { oldPassword, newPassword } = req.body;

        if (!userId || !oldPassword || !newPassword) {
            throw new AppError("User ID, old password, and new password are required", 400);
        }

        const updatedUser = await userService.changePassword(userId, oldPassword, newPassword);

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};