import { RequestHandler } from 'express';

export const testTokenHandler: RequestHandler = async (req, res, next) => {
    try {
        res.status(200).json({
            token: 'Ninja!',
        });
    } catch (error) {
        next(error);
    }
};
