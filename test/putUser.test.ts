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
        createAuthenticatedRequestAdmin(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_TEACHER_DATA)
                .set('Authorization', token)
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    req
                        .get(`/user/${res.body.userId}`)
                        .set('Authorization', token)
                        .expect(200)
                        .expect(MOCK_NEW_TEACHER_DATA);
                });
        }));

    it('should fail, because teacher cant create another teacher', () =>
        createAuthenticatedRequestTeacher(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/user`)
                .set('Authorization', token)
                .send(MOCK_NEW_TEACHER_DATA)
                .expect(403);
        }));

    it('should add new parent user', () =>
        createAuthenticatedRequestTeacher(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_PARENT_DATA)
                .set('Authorization', token)
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    req
                        .get(`/user/${res.body.userId}`)
                        .set('Authorization', token)
                        .expect(200)
                        .expect(MOCK_NEW_PARENT_DATA);
                });
        }));
});