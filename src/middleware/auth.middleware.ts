import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

interface JwtPayload {
    id: string;
    role: string;
    iat: number;
    exp: number;
}

export const authenticateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError("Authorization header missing or invalid", 401);
    }

    const token = authHeader.split(" ")[1];

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("Missing JWT_SECRET");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

        // Attach user info to request for downstream usage
        req.user = {
            id: decoded.id,
            role: decoded.role,
        };

        next();
    } catch (error) {
        throw new AppError("Invalid or expired token", 401);
    }
};
