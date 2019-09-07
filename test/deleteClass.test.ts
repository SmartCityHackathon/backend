import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { app } from '../src/app';
import {
    createAuthenticatedRequest,
    createAuthenticatedRequestAdmin,
    createAuthenticatedRequestTeacher,
} from './testUtils/createAuthenticatedRequest';
import { MOCK_NEW_CLASS } from '../src/mockData';

export default describe('DeleteClass route', () => {
    it('should not delete class because of unauthorized', () =>
        request(app)
            .delete(`/class/${'SomeClassId'}`)
            .expect(401));

    it('should not delete class, because teacher cant delete class', (done) =>
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
                            .delete(`/class/${body.classId}`)
                            .set('Authorization', token)
                            .expect(403)
                            .end(done);
                    });
                });
        }));

    it('should not delete class, because parent cant delete class', (done) =>
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
                    createAuthenticatedRequest(request(app), (req: SuperTest<Test>, token: string) => {
                        req
                            .delete(`/class/${body.classId}`)
                            .set('Authorization', token)
                            .expect(403)
                            .end(done);
                    });
                });
        }));


    it('should delete new class', (done) =>
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
                    req
                        .delete(`/class/${body.classId}`)
                        .set('Authorization', token)
                        .expect(200)
                        .end((err) => {
                            if (err) {
                                done(err);
                                return;
                            }
                            req
                                .get(`/class/${body.classId}`)
                                .set('Authorization', token)
                                .expect(404)
                                .end(done);
                        });
                });
        }));
});