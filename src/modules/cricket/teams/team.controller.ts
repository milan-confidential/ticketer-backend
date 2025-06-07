import {NextFunction, Request, Response} from 'express';
import * as teamService from './team.service';
import {AppError} from '../../../utils/AppError';

export const getTeams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const teams = await teamService.getAll();
        res.json(teams);
    } catch (error) {
        next(error);
    }
}

export const getTeamById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {
        const { id } = req.params;
        const team = await teamService.getById(id);

        if (!team) {
            throw new AppError('Team not found', 404);
        }
        res.json(team);
    } catch (error) {
        next(error);
    }
}

export const createTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, type } = req.body;

        if (!name || !type ) {
            throw new AppError('Name and type are required', 400);
        }

        const newTeam = await teamService.createTeam(req.body);
        res.status(201).json(newTeam);
    } catch (error) {
        next(error);
    }
}

export const updateTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new AppError('Team ID is required', 400);
        }

        const updatedTeam = await teamService.updateTeam(id, req.body);
        res.json(updatedTeam);
    } catch (error) {
        next(error);
    }
}

export const deleteTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new AppError('Team ID is required', 400);
        }

        await teamService.deleteTeam(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}