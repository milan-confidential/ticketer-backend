import { Router } from 'express';
import userRoutes from '../../modules/user/user.routes';
import cricketRoutes from "./cricket/cricket.routes";

const router = Router();

router.use('/user', userRoutes);
router.use('/cricket', cricketRoutes);

export default router;
