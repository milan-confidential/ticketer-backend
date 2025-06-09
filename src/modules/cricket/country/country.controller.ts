import {NextFunction, Request, Response} from 'express';
import * as teamService from './country.service';
import {AppError} from '../../../utils/AppError';

export const getCountries = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const countries = await teamService.getAll();
        res.json(countries);
    } catch (error) {
        next(error);
    }
};

export const getCountryById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { countryId } = req.params;
        const country = await teamService.getById(countryId);

        if (!country) {
            throw new AppError('Country not found', 404);
        }
        res.json(country);
    } catch (error) {
        next(error);
    }
};

export const createCountry = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name } = req.body;

        if (!name) {
            throw new AppError('Name is required', 400);
        }

        const newCountry = await teamService.createCountry(req.body);
        res.status(201).json(newCountry);
    } catch (error) {
        next(error);
    }
};

export const updateCountry = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { countryId } = req.params;
        const { name } = req.body;

        if (!name) {
            throw new AppError('Name is required', 400);
        }

        const updatedCountry = await teamService.updateCountry(countryId, req.body);
        res.json(updatedCountry);
    } catch (error) {
        next(error);
    }
};

export const deleteCountry = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { countryId } = req.params;

        if (!countryId) {
            throw new AppError('Country ID is required', 400);
        }

        await teamService.deleteCountry(countryId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};