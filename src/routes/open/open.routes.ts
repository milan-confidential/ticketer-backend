import { Router } from 'express';
import { login, logout } from '../../modules/auth/auth.controller';
import { registerUser, resetPassword } from '../../modules/user/user.controller';

const router = Router();

/**
 * Public Auth Routes
 */
router.post('/auth/login', login);
router.post('/auth/logout', logout);

/**
 * Public User Routes
 */
router.post('/user/register', registerUser);
router.post('/user/reset-password', resetPassword);

export default router;