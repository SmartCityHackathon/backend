import * as request from 'superagent';
import { MOCK_PARENT_PASSWORD, MOCK_PARENT_USERNAME } from '../../src/mockData';

export function createAuthenticatedRequest(callback: any) {
    const authenticatedRequest = request.agent();
    authenticatedRequest
        .post('/user/loginZ')
        .send({ username: MOCK_PARENT_USERNAME, password: MOCK_PARENT_PASSWORD })
        .end((error) => {
            if (error) {
                throw error;
            }
            callback(authenticatedRequest);
        });
}