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
        createAuthenticatedRequestAdmin(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_TEACHER_DATA)
                .set('Authorization', token)
                .expect(200)
                .end((err, res) => {
                    req
                        .delete(`/user/${res.body.userId}`)
                        .set('Authorization', token)
                        .expect(200)
                        .end((err, res) => {
                            req
                                .get(`/user/${res.body.userId}`)
                                .set('Authorization', token)
                                .expect(404);
                        });
                });
        }));

    it('should not delete user, because teacher cant delete teacher', () =>
        createAuthenticatedRequestAdmin(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_TEACHER_DATA)
                .set('Authorization', token)
                .expect(200)
                .end((err, res) => {
                    createAuthenticatedRequestTeacher(request(app), (req: SuperTest<Test>, token: string) => {
                        req
                            .delete(`/user/${res.body.userId}`)
                            .set('Authorization', token)
                            .expect(403);
                    });
                });
        }));

    it('should delete new parent user', () =>
        createAuthenticatedRequestAdmin(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_PARENT_DATA)
                .set('Authorization', token)
                .expect(200)
                .end((err, res) => {
                    req
                        .delete(`/user/${res.body.userId}`)
                        .set('Authorization', token)
                        .expect(200)
                        .end((err, res) => {
                            req
                                .get(`/user/${res.body.userId}`)
                                .set('Authorization', token)
                                .expect(404);
                        });
                });
        }));
});