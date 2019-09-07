import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { app } from '../src/app';
import {
    createAuthenticatedRequestAdmin,
    createAuthenticatedRequestTeacher,
} from './testUtils/createAuthenticatedRequest';
import { MOCK_NEW_PARENT_DATA, MOCK_NEW_TEACHER_DATA } from '../src/mockData';

export default describe('DeleteUser route', () => {
    it('should not delete user because of unauthorized', () =>
        request(app)
            .delete(`/user/${'SomeUserId'}`)
            .expect(401));

    it('should delete new teacher user', () =>
        createAuthenticatedRequestAdmin((req: SuperTest<Test>) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_TEACHER_DATA)
                .expect(200)
                .end((err, res) => {
                    req
                        .delete(`/user/${res.body.userId}`)
                        .expect(200)
                        .end((err, res) => {
                            req
                                .get(`/user/${res.body.userId}`)
                                .expect(404);
                        });
                });
        }));

    it('should not delete user, because teacher cant delete teacher', () =>
        createAuthenticatedRequestAdmin((req: SuperTest<Test>) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_TEACHER_DATA)
                .expect(200)
                .end((err, res) => {
                    createAuthenticatedRequestTeacher((req: SuperTest<Test>) => {
                        req
                            .delete(`/user/${res.body.userId}`)
                            .expect(403);
                    });
                });
        }));

    it('should delete new parent user', () =>
        createAuthenticatedRequestAdmin((req: SuperTest<Test>) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_PARENT_DATA)
                .expect(200)
                .end((err, res) => {
                    req
                        .delete(`/user/${res.body.userId}`)
                        .expect(200)
                        .end((err, res) => {
                            req
                                .get(`/user/${res.body.userId}`)
                                .expect(404);
                        });
                });
        }));
});