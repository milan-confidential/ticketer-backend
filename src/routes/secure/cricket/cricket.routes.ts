import { Router } from 'express';
import countryRoutes from '../../../modules/cricket/country/country.routes';
import teamRoutes from '../../../modules/cricket/teams/team.routes';
import playerRoutes from '../../../modules/cricket/players/player.routes';
import seriesRoutes from '../../../modules/cricket/Series/series.router';

const router = Router();

router.use('/country', countryRoutes);
router.use('/teams', teamRoutes);
router.use('/players', playerRoutes);
router.use('/series', seriesRoutes);

export default router;
