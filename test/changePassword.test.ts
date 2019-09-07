import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { app } from '../src/app';
import {
    TEST_CHANGE_NEW_PASSWORD,
    TEST_PARENT_NONEXISTING_PASSWORD,
    TEST_PARENT_PASSWORD,
    TEST_PARENT_USERNAME,
} from '../src/config';
import { createAuthenticatedRequest } from './testUtils/createAuthenticatedRequest';

export default describe('Login route', () => {
    it('should not try to change password if user is not logged in', () =>
        request(app)
            .post(`/user/change-password`)
            .send({ username: TEST_PARENT_PASSWORD, password: TEST_CHANGE_NEW_PASSWORD })
            .expect(401));

    it('should not change password if original password was wrong', () =>
        createAuthenticatedRequest((req: SuperTest<Test>) => {
            req
                .post(`/user/change-password`)
                .send({ original: TEST_PARENT_NONEXISTING_PASSWORD, new: TEST_CHANGE_NEW_PASSWORD })
                .expect(403);
        }));

    it('should change password', () =>
        createAuthenticatedRequest((req: SuperTest<Test>) => {
            req
                .post(`/user/change-password`)
                .send({ original: TEST_PARENT_NONEXISTING_PASSWORD, new: TEST_CHANGE_NEW_PASSWORD })
                .expect(200)
                .end(() => {
                    req
                        .post(`/user/login`)
                        .send({ username: TEST_PARENT_USERNAME, password: TEST_CHANGE_NEW_PASSWORD })
                        .expect(200);
                });
        }));
});
