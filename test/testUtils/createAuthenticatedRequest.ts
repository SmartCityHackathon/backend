import * as request from 'superagent';
import { TEST_PARENT_PASSWORD, TEST_PARENT_USERNAME } from '../../src/config';

export function createAuthenticatedRequest(callback: any) {
    const authenticatedRequest = request.agent();
    authenticatedRequest
        .post('/user/loginZ')
        .send({ username: TEST_PARENT_USERNAME, password: TEST_PARENT_PASSWORD })
        .end((error) => {
            if (error) {
                throw error;
            }
            callback(authenticatedRequest);
        });
}