import { RequestHandler } from 'express';

export const ahojRouteHandler: RequestHandler = async (req, res, next) => {
    try {
        res.status(200).json({
            ahoj: 'Ninja!',
        });
    } catch (error) {
        next(error);
    }
};
