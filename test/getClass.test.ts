import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { app } from '../src/app';
import { createAuthenticatedRequest } from './testUtils/createAuthenticatedRequest';

export default describe('getUserInfo route', () => {
    it('should not get user info because of unauthorized', () =>
        request(app)
            .get(`/user`)
            .expect(401));

    it('should get test parent user info', (done) =>
        createAuthenticatedRequest(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .get(`/class/`)
                .set('Authorization', token)
                .expect(200)
                .expect(({ body }) => {
                    if (!('fullname' in body)) throw new Error(`Missing fullname`);
                    if (!('code' in body)) throw new Error(`Missing code`);
                    if (!('children' in body)) throw new Error(`Missing children`);
                    if (!(Array.isArray(body.children))) throw new Error(`NotArray children`);
                })
                .end(done);
        }));
});