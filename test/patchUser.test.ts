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

    it('should not delete user, because teacher cant delete teacher', () =>
        createAuthenticatedRequestAdmin((req: SuperTest<Test>) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_TEACHER_DATA)
                .expect(200)
                .end((err, res) => {
                    createAuthenticatedRequestTeacher((req: SuperTest<Test>) => {
                        req
                            .put(`/user/${res.body.userId}`)
                            .expect(403);
                    });
                });
        }));


    it('should edit new teacher user', () =>
        createAuthenticatedRequestAdmin((req: SuperTest<Test>) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_TEACHER_DATA)
                .expect(200)
                .end((err, res) => {
                    req
                        .patch(`/user/${res.body.userId}`)
                        .send(MOCK_NEW_TEACHER_DATA_EDIT_REQUEST)
                        .expect(200)
                        .end((err, res) => {
                            req
                                .get(`/user/${res.body.userId}`)
                                .expect(MOCK_NEW_TEACHER_DATA_EDITED);
                        });
                });
        }));

    it('should edit new parent user', () =>
        createAuthenticatedRequestTeacher((req: SuperTest<Test>) => {
            req
                .put(`/user`)
                .send(MOCK_NEW_PARENT_DATA)
                .expect(200)
                .end((err, res) => {
                    req
                        .patch(`/user/${res.body.userId}`)
                        .send(MOCK_NEW_PARENT_DATA_EDIT_REQUEST)
                        .expect(200)
                        .end((err, res) => {
                            req
                                .get(`/user/${res.body.userId}`)
                                .expect(MOCK_NEW_PARENT_DATA_EDITED);
                        });
                });
        }));
});