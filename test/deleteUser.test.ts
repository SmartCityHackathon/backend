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

    it('should delete new teacher user', (done) =>
        createAuthenticatedRequestAdmin(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_TEACHER_DATA)
                .set('Authorization', token)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        done(err);
                        return;
                    }
                    req
                        .delete(`/user/${res.body.userId}`)
                        .set('Authorization', token)
                        .expect(200)
                        .end((err, res) => {
                            if (err) {
                                done(err);
                                return;
                            }
                            req
                                .get(`/user/${res.body.userId}`)
                                .set('Authorization', token)
                                .expect(404)
                                .end(done);
                        });
                });
        }));

    it('should not delete user, because teacher cant delete teacher', (done) =>
        createAuthenticatedRequestAdmin(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_TEACHER_DATA)
                .set('Authorization', token)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        done(err);
                        return;
                    }
                    createAuthenticatedRequestTeacher(request(app), (req: SuperTest<Test>, token: string) => {
                        req
                            .delete(`/user/${res.body.userId}`)
                            .set('Authorization', token)
                            .expect(403)
                            .end(done);
                    });
                });
        }));

    it('should delete new parent user', (done) =>
        createAuthenticatedRequestAdmin(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_PARENT_DATA)
                .set('Authorization', token)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        done(err);
                        return;
                    }
                    req
                        .delete(`/user/${res.body.userId}`)
                        .set('Authorization', token)
                        .expect(200)
                        .end((err, res) => {
                            if (err) {
                                done(err);
                                return;
                            }
                            req
                                .get(`/user/${res.body.userId}`)
                                .set('Authorization', token)
                                .expect(404)
                                .end(done);
                        });
                });
        }));
});