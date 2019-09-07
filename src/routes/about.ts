import { version } from '../../package.json';
import { RequestHandler } from 'express';

export const aboutRouteHandler: RequestHandler = async (req, res, next) => {
    try {
        res.status(200).json({
            version,
        });
    } catch (error) {
        next(error);
    }
};
