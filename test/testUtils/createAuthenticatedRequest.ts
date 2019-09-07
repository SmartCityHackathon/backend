import * as request from 'superagent';
import {
    MOCK_ADMIN_PASSWORD,
    MOCK_ADMIN_USERNAME,
    MOCK_PARENT_PASSWORD,
    MOCK_PARENT_USERNAME,
    MOCK_TEACHER_PASSWORD,
    MOCK_TEACHER_USERNAME,
} from '../../src/mockData';

export function createAuthenticatedRequest(callback: any) {
    const authenticatedRequest = request.agent();
    authenticatedRequest
        .post('/user/login')
        .send({ username: MOCK_PARENT_USERNAME, password: MOCK_PARENT_PASSWORD })
        .end((error) => {
            if (error) {
                throw error;
            }
            callback(authenticatedRequest);
        });
}

export function createAuthenticatedRequestTeacher(callback: any) {
    const authenticatedRequest = request.agent();
    authenticatedRequest
        .post('/user/login')
        .send({ username: MOCK_TEACHER_USERNAME, password: MOCK_TEACHER_PASSWORD })
        .end((error) => {
            if (error) {
                throw error;
            }
            callback(authenticatedRequest);
        });
}

export function createAuthenticatedRequestAdmin(callback: any) {
    const authenticatedRequest = request.agent();
    authenticatedRequest
        .post('/user/login')
        .send({ username: MOCK_ADMIN_USERNAME, password: MOCK_ADMIN_PASSWORD })
        .end((error) => {
            if (error) {
                throw error;
            }
            callback(authenticatedRequest);
        });
}