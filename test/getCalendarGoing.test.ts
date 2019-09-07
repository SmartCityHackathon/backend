import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { app } from '../src/app';
import { createAuthenticatedRequest } from './testUtils/createAuthenticatedRequest';
import { MOCK_PARENT_KIDS_CALENDAR_2019_09 } from '../src/mockData';

export default describe('getCalendarGoing route', () => {
    it('should not get user calendar because of unauthorized', () =>
        request(app)
            .get(`/calendar/going`)
            .expect(401));

    it('should get user calendar going info', () =>
        createAuthenticatedRequest((req: SuperTest<Test>) => {
            req
                .get(`/calendar/going`)
                .expect(200)
                .expect({
                    kids: MOCK_PARENT_KIDS_CALENDAR_2019_09,
                });
        }));
});