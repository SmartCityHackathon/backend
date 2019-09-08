import { RequestHandler } from 'express';
import { jsonStorage, Storage } from '../jsonStorage';
import { User } from '../structure/User';
import { Child } from '../structure/Child';

export const postCalendarRouteHandler: RequestHandler = async (req, res, next) => {
    try {
        const userId = jsonStorage.sessions[req.header('Authorization') || ''];
        if (!userId) return res.status(401).json({ error: 'SomeError', where: 'up' });

        const storage: Storage = jsonStorage.load();
        const matchingUsers: User[] = storage.users.filter(
            user => user.userId === userId);

        if (matchingUsers.length > 0) {
            const user: User = matchingUsers[0];
            const childId: string = req.params.childId;

            const children: Child[] = storage.children.filter(child => childId === child.childId);
            if (children.length === 0) return res.status(403).json({ error: 'ChildDoesNotExist' });

            if (user.children.filter(child => child === childId).length === 0)
                return res.status(403).json({ error: 'NotYourChildren' });

            const child = children[0];
            for (let key in req.body.going) {
                console.log(key);
                child.going[key] = req.body.going[key];
            }

            console.log('child: ', child);

            jsonStorage.save(storage);
            return res.status(200).json();
        } else {
            return res.status(401).json({ error: 'SomeError', where: 'down' });
        }
    } catch (error) {
        return next(error);
    }
};
