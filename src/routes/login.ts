import { RequestHandler } from 'express';
import { jsonStorage, Storage } from '../jsonStorage';
import { User } from '../structure/User';
import uuid = require('uuid');

export const loginRouteHandler: RequestHandler = async (req, res, next) => {
    try {
        const storage: Storage = jsonStorage.load();
        const matchingUsers: User[] = storage.users.filter(
            user => user.email == req.body.username && user.password == req.body.password);
        if (matchingUsers.length > 0) {
            const token: string = uuid();
            jsonStorage.sessions[token] = matchingUsers[0].userId;
            res.status(200).json({ token });
        } else {
            res.status(403).json({ error: 'NotValidLoginCredentials' });
        }
    } catch (error) {
        next(error);
    }
};
