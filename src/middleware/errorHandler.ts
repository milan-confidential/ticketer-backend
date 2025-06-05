import { Request, Response, NextFunction } from "express";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);

    const statusCode = err.statusCode || 500;
    const message =
        err.isOperational && err.message
            ? err.message
            : "Something went wrong, please try again later";

    res.status(statusCode).json({ error: message });
}
