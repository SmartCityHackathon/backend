import { json } from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import * as express from 'express';
import { expressLogger } from './utils/logger';
import { aboutRouteHandler } from './routes/about';
import { ahojRouteHandler } from './routes/ahoj';
import { loginRouteHandler } from './routes/login';

export const app = createApp();

export function createApp(): express.Express {
    const app = express();

    app.use(json({ limit: '1mb' }));
    app.use(cors());
    app.use(expressLogger());
    app.set('json spaces', 4);

    app.use(express.static(path.join(__dirname, '..', 'static')));

    app.get(['/', '/about'], aboutRouteHandler);

    app.get('/ahoj', ahojRouteHandler);
    app.post('/user/login', loginRouteHandler);
    // app.post('/user/change-password', ahojRouteHandler);

    return app;
}
