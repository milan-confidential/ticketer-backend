import {NextFunction, Request, Response} from 'express';
import * as playerService from './player.service';
import {AppError} from '../../../utils/AppError';


export const getPlayers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const players = await playerService.getAll();
        res.json(players);
    } catch (error) {
        next(error);
    }
}

export const getPlayerById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const player = await playerService.getById(id);
        if (!player) {
            throw new AppError('Player not found', 404);
        }
        res.json(player);
    } catch (error) {
        next(error);
    }
};

export const createPlayer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const playerData = req.body;
        const newPlayer = await playerService.createPlayer(playerData);
        res.status(201).json(newPlayer);
    } catch (error) {
        next(error);
    }
};

export const updatePlayer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const playerData = req.body;

        if (!id) {
            throw new AppError('Player ID is required for update', 400);
        }

        const updatedPlayer = await playerService.updatePlayer(id, playerData);
        res.json(updatedPlayer);
    } catch (error) {
        next(error);
    }
};

export const deletePlayer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new AppError('Player ID is required for deletion', 400);
        }
        await playerService.deletePlayer(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export const getPlayersByTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { teamId } = req.params;
        const players = await playerService.getPlayersByTeam(teamId);
        res.json(players);
    } catch (error) {
        next(error);
    }
};