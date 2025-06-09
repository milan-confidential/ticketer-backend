import { NextFunction, Request, Response } from "express";
import * as seriesService from "./series.service";
import {AppError} from "../../../utils/AppError";

export const getSeries = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const series = await seriesService.getAll();
        res.json(series);
    } catch (error) {
        next(error);
    }
};

export const getSeriesById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { seriesId } = req.params;

        if (!seriesId) {
            throw new AppError('Series ID is required', 400);
        }

        const series = await seriesService.getById(seriesId);
        res.json(series);
    } catch (error) {
        next(error);
    }
};

export const createSeries = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const seriesData = req.body;
        const newSeries = await seriesService.createSeries(seriesData);
        res.status(201).json(newSeries);
    } catch (error) {
        next(error);
    }
};

export const updateSeries = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { seriesId } = req.params;
        const seriesData = req.body;

        if (!seriesId) {
            throw new AppError('Series ID is required', 400);
        }

        const updatedSeries = await seriesService.updateSeries(seriesId, seriesData);
        res.json(updatedSeries);
    } catch (error) {
        next(error);
    }
};

export const deleteSeries = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { seriesId } = req.params;

        if (!seriesId) {
            throw new AppError('Series ID is required', 400);
        }

        await seriesService.deleteSeries(seriesId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export const updateSeriesHosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { seriesId } = req.params;
        const { hostCountryIds } = req.body;

        if (!seriesId) {
            throw new AppError('Series ID is required', 400);
        }

        const updatedSeries = await seriesService.updateSeriesHosts(seriesId, hostCountryIds);
        res.json(updatedSeries);
    } catch (error) {
        next(error);
    }
};

export const updateSeriesTeams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { seriesId } = req.params;
        const { teamIds } = req.body;

        if (!seriesId) {
            throw new AppError('Series ID is required', 400);
        }

        const updatedSeries = await seriesService.updateSeriesTeams(seriesId, teamIds);
        res.json(updatedSeries);
    } catch (error) {
        next(error);
    }
};

export const updateSeriesFormats = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { seriesId } = req.params;
        const { formats } = req.body;

        if (!seriesId) {
            throw new AppError('Series ID is required', 400);
        }

        const updatedSeries = await seriesService.updateSeriesFormats(seriesId, formats);
        res.json(updatedSeries);
    } catch (error) {
        next(error);
    }
};