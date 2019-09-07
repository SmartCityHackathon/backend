import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { app } from '../src/app';
import { createAuthenticatedRequest, createAuthenticatedRequestAdmin } from './testUtils/createAuthenticatedRequest';
import { MOCK_NEW_CHILD, MOCK_NEW_PARENT_DATA, MOCK_NEW_TEACHER_DATA } from '../src/mockData';

export default describe('PutChildren route', () => {
    it('should not add child because of unauthorized', () =>
        request(app)
            .put(`/child`)
            .send(MOCK_NEW_TEACHER_DATA)
            .expect(401));

    it('should add child', (done) =>
        createAuthenticatedRequestAdmin(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_PARENT_DATA)
                .set('Authorization', token)
                .expect(200)
                .end((err, { body }) => {
                    if (err) {
                        done(err);
                        return;
                    }
                    req
                        .put(`/child`)
                        .send({ ...MOCK_NEW_CHILD, parent: body.childId })
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
                                .expect(200)
                                .expect((resp) => !!resp.body.kids.filter(
                                    (kid: any) => kid == { ...MOCK_NEW_CHILD, childId: body.childId }))
                                .end(done);
                        });
                });
        }));

    it('should fail, because parent cant add new teacher', (done) =>
        createAuthenticatedRequest(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .put(`/child`)
                .set('Authorization', token)
                .send(MOCK_NEW_CHILD)
                .expect(403)
                .end(done);
        }));
});