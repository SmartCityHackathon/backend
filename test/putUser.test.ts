import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { app } from '../src/app';
import {
    createAuthenticatedRequestAdmin,
    createAuthenticatedRequestTeacher,
} from './testUtils/createAuthenticatedRequest';
import { MOCK_NEW_PARENT_DATA, MOCK_NEW_TEACHER_DATA } from '../src/mockData';

export default describe('putUser route', () => {
    it('should not add user because of unauthorized', () =>
        request(app)
            .put(`/user`)
            .send(MOCK_NEW_TEACHER_DATA)
            .expect(401));

    it('should add and edit teacher user', () =>
        createAuthenticatedRequestAdmin((req: SuperTest<Test>) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_TEACHER_DATA)
                .expect(200)
                .end((err, res) => {
                    req
                        .get(`/user/${res.body.userId}`)
                        .expect(200)
                        .expect(MOCK_NEW_TEACHER_DATA);
                });
        }));

    it('should fail, because teacher cant create another teacher', () =>
        createAuthenticatedRequestTeacher((req: SuperTest<Test>) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_TEACHER_DATA)
                .expect(403);
        }));

    it('should add new parent user', () =>
        createAuthenticatedRequestTeacher((req: SuperTest<Test>) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_PARENT_DATA)
                .expect(200)
                .end((err, res) => {
                    req
                        .get(`/user/${res.body.userId}`)
                        .expect(200)
                        .expect(MOCK_NEW_PARENT_DATA);
                });
        }));
});