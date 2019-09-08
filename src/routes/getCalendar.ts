import { RequestHandler } from 'express';
import { jsonStorage, Storage } from '../jsonStorage';
import { User } from '../structure/User';
import { Child } from '../structure/Child';
import { arrayContains } from '../CustomUtils';

export const getCalendarRouteHandler: RequestHandler = async (req, res, next) => {
    try {
        const userId = jsonStorage.sessions[req.header('Authorization') || ''];
        if (!userId) return res.status(401).json({ error: 'SomeError', where: 'up' });

        const storage: Storage = jsonStorage.load();
        const matchingUsers: User[] = storage.users.filter(
            user => user.userId === userId);

        if (matchingUsers.length > 0) {
            const user: User = matchingUsers[0];
            const childrenIds: string[] = user.children;

            const children: Child[] = storage.children.filter(child => arrayContains(childrenIds, child.childId));
            console.log(children);

            return res.status(200).json({
                children: children.map(child => child.going),
            });
        } else {
            return res.status(401).json({ error: 'SomeError', where: 'down' });
        }
    } catch (error) {
        return next(error);
    }
};
