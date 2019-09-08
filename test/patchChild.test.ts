import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { app } from '../src/app';
import {
    createAuthenticatedRequestAdmin,
    createAuthenticatedRequestTeacher,
} from './testUtils/createAuthenticatedRequest';
import { MOCK_NEW_CHILD } from '../src/mockData';

export default describe('PatchChild route', () => {
    it('should not patch child because of unauthorized', () =>
        request(app)
            .patch(`/user/${'SomeUserId'}`)
            .send({})
            .expect(401));

    it('should not patch child, because parent cant patch child', (done) =>
        createAuthenticatedRequestAdmin(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/child`)
                .send(MOCK_NEW_CHILD)
                .set('Authorization', token)
                .expect(200)
                .end((err, { body }) => {
                    if (err) {
                        done(err);
                        return;
                    }
                    createAuthenticatedRequestTeacher(request(app), (req: SuperTest<Test>, token: string) => {
                        req
                            .put(`/child/${body.childId}`)
                            .set('Authorization', token)
                            .expect(403)
                            .end(done);
                    });
                });
        }));


    it('should patch new child', (done) =>
        createAuthenticatedRequestAdmin(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/child`)
                .send(MOCK_NEW_CHILD)
                .set('Authorization', token)
                .expect(200)
                .end((err, { body }) => {
                    if (err) {
                        done(err);
                        return;
                    }
                    req
                        .patch(`/child/${body.childId}`)
                        .send({ ...MOCK_NEW_CHILD, fullname: 'Ahoj', class: '3h' })
                        .set('Authorization', token)
                        .expect(200)
                        .end((err) => {
                            if (err) {
                                done(err);
                                return;
                            }
                            req
                                .get(`/child/${body.childId}`)
                                .set('Authorization', token)
                                .expect({ ...MOCK_NEW_CHILD, fullname: 'Ahoj', class: '3h' })
                                .end(done);
                        });
                });
        }));

    it('should patch new child', (done) =>
        createAuthenticatedRequestTeacher(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/child`)
                .send(MOCK_NEW_CHILD)
                .set('Authorization', token)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        done(err);
                        return;
                    }
                    req
                        .patch(`/child/${res.body.childId}`)
                        .send({ ...MOCK_NEW_CHILD, fullname: 'Ahoj', class: '3h' })
                        .set('Authorization', token)
                        .expect(200)
                        .end((err, res) => {
                            if (err) {
                                done(err);
                                return;
                            }
                            req
                                .get(`/child/${res.body.childId}`)
                                .set('Authorization', token)
                                .expect({ ...MOCK_NEW_CHILD, fullname: 'Ahoj', class: '3h' })
                                .end(done);
                        });
                });
        }));
});