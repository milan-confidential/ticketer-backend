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
        const { id } = req.params;

        if (!id) {
            throw new AppError('Series ID is required', 400);
        }

        const series = await seriesService.getById(id);
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
        const { id } = req.params;
        const seriesData = req.body;

        if (!id) {
            throw new AppError('Series ID is required', 400);
        }

        const updatedSeries = await seriesService.updateSeries(id, seriesData);
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
        const { id } = req.params;

        if (!id) {
            throw new AppError('Series ID is required', 400);
        }

        await seriesService.deleteSeries(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};