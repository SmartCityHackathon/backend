import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { app } from '../src/app';
import { createAuthenticatedRequest, createAuthenticatedRequestAdmin } from './testUtils/createAuthenticatedRequest';
import { MOCK_NEW_CHILD } from '../src/mockData';

export default describe('DeleteChild route', () => {
    it('should not delete user because of unauthorized', () =>
        request(app)
            .delete(`/child/${'SomeChildId'}`)
            .expect(401));

    it('should delete new child user', (done) =>
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
                        .delete(`/child/${body.childId}`)
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
                                .expect(404)
                                .end(done);
                        });
                });
        }));

    it('should not delete child, because parent cant delete child', (done) =>
        createAuthenticatedRequestAdmin(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_CHILD)
                .set('Authorization', token)
                .expect(200)
                .end((err, { body }) => {
                    if (err) {
                        done(err);
                        return;
                    }
                    createAuthenticatedRequest(request(app), (req: SuperTest<Test>, token: string) => {
                        req
                            .delete(`/user/${body.userId}`)
                            .set('Authorization', token)
                            .expect(403)
                            .end(done);
                    });
                });
        }));
});