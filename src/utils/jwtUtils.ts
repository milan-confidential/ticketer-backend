import jwt from "jsonwebtoken";

/**
 * Generate a JWT token for a user
 * @param payload - data to encode in JWT (usually user id and role)
 * @returns signed JWT token as string
 */
export const generateToken = (payload: object): string => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

    if (!JWT_SECRET) {
        throw new Error("Missing JWT_SECRET in environment");
    }

    const expiresIn = JWT_EXPIRES_IN || "1d";

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn
    } as any);
};
