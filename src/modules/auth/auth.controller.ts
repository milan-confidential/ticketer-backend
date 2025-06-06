import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { AppError } from "../../utils/AppError";
import {generateToken} from "../../utils/jwtUtils";

/**
 * Controller to handle user login
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new AppError("Email and password are required", 400);
        }

        const user = await authService.authenticateUser(email, password);

        // Generate JWT token with user id and role in payload
        const token = generateToken({ id: user.id, role: user.role });

        res.status(200).json({
            message: "Login successful",
            token,
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

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        next(error);
    }
};
