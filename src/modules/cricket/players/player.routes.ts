import { Router } from 'express';
import * as controller from './player.controller';

const router = Router();

router.get('/', controller.getPlayers);
router.get('/:playerId', controller.getPlayerById);
router.post('/', controller.createPlayer);
router.put('/:playerId', controller.updatePlayer);
router.delete('/:playerId', controller.deletePlayer);
router.get('/team/:teamId', controller.getPlayersByTeam);


export default router;
