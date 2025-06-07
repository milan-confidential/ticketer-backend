import { Router } from 'express';
import * as controller from './player.controller';

const router = Router();

router.get('/', controller.getPlayers);
router.get('/:id', controller.getPlayerById);
router.post('/', controller.createPlayer);
router.put('/:id', controller.updatePlayer);
router.delete('/:id', controller.deletePlayer);
router.get('/team/:teamId', controller.getPlayersByTeam);


export default router;
