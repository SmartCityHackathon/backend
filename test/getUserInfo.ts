import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { app } from '../src/app';
import { TEST_PARENT_EMAIL, TEST_PARENT_FULLNAME, TEST_PARENT_KIDS } from '../src/config';
import { createAuthenticatedRequest } from './testUtils/createAuthenticatedRequest';

export default describe('getUserInfo route', () => {
    it('should not get user info because of unauthorized', () =>
        request(app)
            .get(`/user`)
            .expect(401));

    it('should get test parent user info', () =>
        createAuthenticatedRequest((req: SuperTest<Test>) => {
            req
                .get(`/user`)
                .expect(200)
                .expect({
                    fullname: TEST_PARENT_FULLNAME,
                    email: TEST_PARENT_EMAIL,
                    kids: TEST_PARENT_KIDS,
                });
        }));
});