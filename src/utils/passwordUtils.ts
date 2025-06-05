import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * Hash a plain password
 * @param plainPassword - User's raw password
 * @returns hashed password
 */
export const hashPassword = async (plainPassword: string): Promise<string> => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(plainPassword, salt);
};

/**
 * Compare plain password with hashed password
 * @param plainPassword - Raw password entered by user
 * @param hashedPassword - Hashed password stored in DB
 * @returns boolean indicating if passwords match
 */
export const comparePassword = async (
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> => {
    return bcrypt.compare(plainPassword, hashedPassword);
};
