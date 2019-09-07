import * as request from 'supertest';
import { app } from '../src/app';
import {
    TEST_PARENT_NONEXISTING_PASSWORD,
    TEST_PARENT_NONEXISTING_USERNAME,
    TEST_PARENT_PASSWORD,
    TEST_PARENT_USERNAME,
} from '../src/config';

export default describe('Login route', () => {
    it('should not login with invalid username', () =>
        request(app)
            .post(`/user/login`)
            .send({ username: TEST_PARENT_NONEXISTING_USERNAME, password: TEST_PARENT_PASSWORD })
            .expect(403));

    it('should not login with not invalid password', () =>
        request(app)
            .post(`/user/login`)
            .send({ username: TEST_PARENT_USERNAME, password: TEST_PARENT_NONEXISTING_PASSWORD })
            .expect(403));

    it('should login with correct username and password', () =>
        request(app)
            .post(`/user/login`)
            .send({ username: TEST_PARENT_USERNAME, password: TEST_PARENT_PASSWORD })
            .expect(200)
            .expect(({ body }) => {
                if (!('token' in body)) throw new Error(`Missing token`);
            }));
});
