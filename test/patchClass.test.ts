import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { app } from '../src/app';
import {
    createAuthenticatedRequestAdmin,
    createAuthenticatedRequestTeacher,
} from './testUtils/createAuthenticatedRequest';
import {
    MOCK_NEW_CLASS,
    MOCK_NEW_PARENT_DATA,
    MOCK_NEW_PARENT_DATA_EDIT_REQUEST,
    MOCK_NEW_PARENT_DATA_EDITED,
} from '../src/mockData';

export default describe('PatchClass route', () => {
    it('should not patch class because of unauthorized', () =>
        request(app)
            .patch(`/user/${'SomeUserId'}`)
            .send({})
            .expect(401));

    it('should not patch class, because teacher cant patch teacher', (done) =>
        createAuthenticatedRequestAdmin(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/class`)
                .send(MOCK_NEW_CLASS)
                .set('Authorization', token)
                .expect(200)
                .end((err, { body }) => {
                    if (err) {
                        done(err);
                        return;
                    }
                    createAuthenticatedRequestTeacher(request(app), (req: SuperTest<Test>, token: string) => {
                        req
                            .patch(`/class/${body.classId}`)
                            .send({ name: 'Klacek' })
                            .set('Authorization', token)
                            .expect(403)
                            .end(done);
                    });
                });
        }));


    it('should patch new class', (done) =>
        createAuthenticatedRequestAdmin(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_CLASS)
                .set('Authorization', token)
                .expect(200)
                .end((err, { body }) => {
                    if (err) {
                        done(err);
                        return;
                    }
                    req
                        .patch(`/user/${body.classId}`)
                        .send({ name: 'Klacek' })
                        .set('Authorization', token)
                        .expect(200)
                        .end((err) => {
                            if (err) {
                                done(err);
                                return;
                            }
                            req
                                .get(`/user/${body.classId}`)
                                .set('Authorization', token)
                                .expect({ ...MOCK_NEW_CLASS, classId: body.classId, name: 'Klacek' })
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