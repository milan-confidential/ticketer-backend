import { Router } from 'express';
import * as controller from './team.controller';

const router = Router();

router.get('/', controller.getTeams);
router.get('/:teamId', controller.getTeamById);
router.post('/', controller.createTeam);
router.put('/:teamId', controller.updateTeam);
router.delete('/:teamId', controller.deleteTeam);

export default router;
