import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { app } from '../src/app';
import {
    createAuthenticatedRequest,
    createAuthenticatedRequestAdmin,
    createAuthenticatedRequestTeacher,
} from './testUtils/createAuthenticatedRequest';
import { MOCK_NEW_CLASS } from '../src/mockData';

export default describe('PutClass route', () => {
    it('should fail, because of unauthorized', () =>
        request(app)
            .put(`/class`)
            .send(MOCK_NEW_CLASS)
            .expect(401));

    it('should fail, because parent cant add new class', (done) =>
        createAuthenticatedRequest(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/class`)
                .set('Authorization', token)
                .send(MOCK_NEW_CLASS)
                .expect(403)
                .end(done);
        }));

    it('should fail, because teacher cant add new class', (done) =>
        createAuthenticatedRequestTeacher(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/class`)
                .set('Authorization', token)
                .send(MOCK_NEW_CLASS)
                .expect(403)
                .end(done);
        }));


    it('should add class', (done) =>
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
                        .get(`/class/${body.classId}`)
                        .set('Authorization', token)
                        .expect(200)
                        .expect((resp) => !!resp.body.kids.filter(
                            (kid: any) => kid == { ...MOCK_NEW_CLASS, classId: body.classId }))
                        .end(done);
                });
        }));
});