import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { app } from '../src/app';
import { createAuthenticatedRequest } from './testUtils/createAuthenticatedRequest';
import { MOCK_PARENT_CHILDREN, MOCK_PARENT_EMAIL, MOCK_PARENT_FULLNAME } from '../src/mockData';

export default describe('getUserInfo route', () => {
    it('should not get user info because of unauthorized', () =>
        request(app)
            .get(`/user`)
            .expect(401));

    it('should get test parent user info', (done) =>
        createAuthenticatedRequest(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .get(`/user`)
                .set('Authorization', token)
                .expect(200)
                .expect({
                    fullname: MOCK_PARENT_FULLNAME,
                    email: MOCK_PARENT_EMAIL,
                    children: MOCK_PARENT_CHILDREN,
                    type: 'parent',
                })
                .end(done);
        }));
});