import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import {AppError} from "../../utils/AppError";
import { generateToken } from "../../utils/jwtUtils";

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
 * Handle login HTTP POST request
 *
 * @param req - Express Request object containing email and password in body
 * @param res - Express Response object to send back response
 * @param next - Express NextFunction for error handling middleware
 */
export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new AppError("Email and password are required", 400);
        }

        const user = await userService.authenticateUser(email, password);

        // Generate JWT token with user id and role in payload
        const token = generateToken({ id: user.id, role: user.role });

        res.status(200).json({
            message: "Login successful",
            token, // Send token to client
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
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