import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { app } from '../src/app';
import { createAuthenticatedRequest } from './testUtils/createAuthenticatedRequest';
import {
    MOCK_CHANGE_NEW_PASSWORD,
    MOCK_PARENT_NONEXISTING_PASSWORD,
    MOCK_PARENT_PASSWORD,
    MOCK_PARENT_USERNAME,
} from '../src/mockData';

export default describe('changePassword route', () => {
    it('should not try to change password if user is not logged in', () =>
        request(app)
            .post(`/user/change-password`)
            .send({ username: MOCK_PARENT_PASSWORD, password: MOCK_CHANGE_NEW_PASSWORD })
            .expect(401));

    it('should not change password if original password was wrong', () =>
        createAuthenticatedRequest(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .post(`/user/change-password`)
                .set('Authorization', token)
                .send({ original: MOCK_PARENT_NONEXISTING_PASSWORD, new: MOCK_CHANGE_NEW_PASSWORD })
                .expect(403);
        }));

    it('should change password', () =>
        createAuthenticatedRequest(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .post(`/user/change-password`)
                .send({ original: MOCK_PARENT_NONEXISTING_PASSWORD, new: MOCK_CHANGE_NEW_PASSWORD })
                .set('Authorization', token)
                .expect(200)
                .end(() => {
                    req
                        .post(`/user/login`)
                        .send({ username: MOCK_PARENT_USERNAME, password: MOCK_CHANGE_NEW_PASSWORD })
                        .expect(200);
                });
        }));
});
