import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { app } from '../src/app';
import {
    createAuthenticatedRequestAdmin,
    createAuthenticatedRequestTeacher,
} from './testUtils/createAuthenticatedRequest';
import {
    MOCK_NEW_PARENT_DATA,
    MOCK_NEW_PARENT_DATA_EDIT_REQUEST,
    MOCK_NEW_PARENT_DATA_EDITED,
    MOCK_NEW_TEACHER_DATA,
    MOCK_NEW_TEACHER_DATA_EDIT_REQUEST,
    MOCK_NEW_TEACHER_DATA_EDITED,
} from '../src/mockData';

export default describe('PatchUser route', () => {
    it('should not edit user because of unauthorized', () =>
        request(app)
            .patch(`/user/${'SomeUserId'}`)
            .send({})
            .expect(401));

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
                            .put(`/user/${res.body.userId}`)
                            .set('Authorization', token)
                            .expect(403)
                            .end(done);
                    });
                });
        }));


    it('should edit new teacher user', (done) =>
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
                        .patch(`/user/${res.body.userId}`)
                        .send(MOCK_NEW_TEACHER_DATA_EDIT_REQUEST)
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
                                .expect(MOCK_NEW_TEACHER_DATA_EDITED)
                                .end(done);
                        });
                });
        }));

    it('should edit new parent user', (done) =>
        createAuthenticatedRequestTeacher(request(app), (req: SuperTest<Test>, token: string) => {
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
                        .patch(`/user/${res.body.userId}`)
                        .send(MOCK_NEW_PARENT_DATA_EDIT_REQUEST)
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
                                .expect(MOCK_NEW_PARENT_DATA_EDITED)
                                .end(done);
                        });
                });
        }));
});