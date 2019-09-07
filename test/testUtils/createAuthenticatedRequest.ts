import {
    MOCK_ADMIN_PASSWORD,
    MOCK_ADMIN_USERNAME,
    MOCK_PARENT_PASSWORD,
    MOCK_PARENT_USERNAME,
    MOCK_TEACHER_PASSWORD,
    MOCK_TEACHER_USERNAME,
} from '../../src/mockData';
import { SuperTest, Test } from 'supertest';

export function createAuthenticatedRequest(request: SuperTest<Test>, callback: any) {
    request
        .post('/user/login')
        .send({ username: MOCK_PARENT_USERNAME, password: MOCK_PARENT_PASSWORD })
        .expect(200)
        .end((err: any, { body }: any) => {
            if (err) throw err;
            callback(request, body.token);
        });
}

export function createAuthenticatedRequestTeacher(request: SuperTest<Test>, callback: any) {
    request
        .post('/user/login')
        .send({ username: MOCK_TEACHER_USERNAME, password: MOCK_TEACHER_PASSWORD })
        .expect(200)
        .end((err: any, { body }: any) => {
            if (err) throw err;
            callback(request, body.token);
        });
}

export function createAuthenticatedRequestAdmin(request: SuperTest<Test>, callback: any) {
    request
        .post('/user/login')
        .send({ username: MOCK_ADMIN_USERNAME, password: MOCK_ADMIN_PASSWORD })
        .expect(200)
        .end((err: any, { body }: any) => {
            if (err) throw err;
            callback(request, body.token);
        });
}