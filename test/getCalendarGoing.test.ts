import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { app } from '../src/app';
import { createAuthenticatedRequest } from './testUtils/createAuthenticatedRequest';
import { MOCK_PARENT_CHILDREN_CALENDAR_2019_09 } from '../src/mockData';

export default describe('getCalendarGoing route', () => {
    it('should not get user calendar because of unauthorized', () =>
        request(app)
            .get(`/calendar/going`)
            .expect(401));

    it('should get user calendar going info', (done) =>
        createAuthenticatedRequest(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .get(`/calendar/going`)
                .set('Authorization', token)
                .expect(200)
                .expect({
                    children: MOCK_PARENT_CHILDREN_CALENDAR_2019_09,
                })
                .end(done);
        }));
});